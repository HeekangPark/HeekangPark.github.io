import _ from 'lodash';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import DOMPurify from "isomorphic-dompurify";
import { createContentLoader } from 'vitepress';
import type { Collection_raw, Document_raw, Collection, Document, Tag, Data } from '@/data/documents.d.ts';

declare const data: Data;
export { data };

import { slugify } from "@mdit-vue/shared";

const buildCollection = (
  collections: { [collection_path: string]: Collection },
  collection_raw: Collection_raw,
  parent_collection: Collection | null
) => {
  const collection: Collection = {
    path: (parent_collection?.path || "") + "/" + collection_raw.path,
    name: collection_raw.name || collection_raw.path,
    description: collection_raw.description || null,
    tag_paths: _.chain(collection_raw.tags || [])
                .map((tag_raw) => `/tag/${slugify(tag_raw)}`)
                .concat(parent_collection ? parent_collection.tag_paths : [])
                .uniq()
                .value(),
    layout: collection_raw.layout || 'document',
    is_series: (collection_raw.is_series === false ? false : true),
    subcollection_paths: [],
    parent_collection_paths: parent_collection ? [...parent_collection.parent_collection_paths, parent_collection.path] : [],
    document_paths: []
  }

  for (const subcollection_raw of collection_raw.subcollections || []) {
    buildCollection(collections, subcollection_raw, collection);
  }

  if (parent_collection !== null) {
    parent_collection.subcollection_paths.push(collection.path);
  }

  collections[collection.path] = collection;
}

export default {
  watch: ["docs/collections.yaml"],
  async load(watchedFiles): Promise<Data> {
    /* build collections */
    const collections_raw = yaml.load(fs.readFileSync(watchedFiles[0], 'utf-8')) as Collection_raw[];

    const collections: { [collection_path: string]: Collection } = {};
    for (const collection_raw of collections_raw) {
      buildCollection(collections, collection_raw, null);
    }

    /* build documents, tags */
    const documents_raw = await createContentLoader("**/*.md", {
      includeSrc: false,
      render: true,
      excerpt: false, 
      transform: (rawData) => {
        return _.chain(rawData)
                .map((document) => {
                  const content = _.replace(DOMPurify.sanitize(
                    document.html || "", 
                    { USE_PROFILES: { html: false } }
                  ), /\s+/g, " ").trim();

                  document.excerpt = content.slice(0, 200) + (content.length > 200 ? "..." : "");
                  document.src = content;
                  document.html = undefined;

                  return document;
                })
                .sortBy([
                  (document) => document.frontmatter.date_modified,
                  (document) => document.frontmatter.date_created,
                ])
                .value()
      }
    }).load() as unknown as Document_raw[];

    const documents: { [document_path: string]: Document } = {};
    const tags: { [tag_path: string]: Tag } = {};
    for (const document_raw of documents_raw) {
      const collection_path = "/" + _.chain(document_raw.url)
                                     .split("/")
                                     .compact()
                                     .dropRight()
                                     .join("/")
                                     .value();
      
      if (!Object.keys(collections).includes(collection_path)) continue; // if the collection is not found, skip the document
      const collection = collections[collection_path];
      
      const tag_paths = _.chain(document_raw.frontmatter.tags || [])
                         .map((tag_raw) => `/tag/${slugify(tag_raw)}`)
                         .concat(collection.tag_paths)
                         .uniq()
                         .value();

      const document: Document = {
        collection_path: collection.path,
        collection_name: collection.name,
        title: document_raw.frontmatter.title || _.chain(document_raw.url)
                                                  .split("/")
                                                  .compact()
                                                  .last()
                                                  .value(),
        path: document_raw.url,
        layout: document_raw.frontmatter.layout || collection.layout,
        excerpt: document_raw.excerpt,
        date_created: document_raw.frontmatter.date_created || null,
        date_modified: document_raw.frontmatter.date_modified || null,
        order: document_raw.frontmatter.order || null,
        views: 0,
        tag_paths: tag_paths,
        src: document_raw.src,
      }

      for (const tag_path of tag_paths) {
        if (Object.keys(tags).includes(tag_path)) {
          tags[tag_path].document_paths.push(document.path);
        } else {
          tags[tag_path] = {
            name: _.chain(tag_path).split("/").last().value(),
            path: tag_path,
            document_paths: [document.path]
          };
        }
      }
      
      documents[document.path] = document;
      collection.document_paths.push(document.path);
    }

    // remove empty collections
    while(true) {
      const empty_collection_paths = _.chain(collections)
                                     .filter((collection) => collection.subcollection_paths.length === 0 && collection.document_paths.length === 0)
                                     .map((collection) => collection.path)
                                     .value();
      
      if (empty_collection_paths.length === 0) break;
      
      for (const empty_collection_path of empty_collection_paths) {
        for (const collection of Object.values(collections)) {
          collection.subcollection_paths = _.without(collection.subcollection_paths, empty_collection_path);
        }
        
        delete collections[empty_collection_path];
      }
    }

    // sort documents in each collection
    for (const collection of Object.values(collections)) {
      collection.document_paths = _.chain(collection.document_paths)
                                   .sortBy([
                                     (document_path) => documents[document_path].order,
                                     (document_path) => documents[document_path].title
                                   ])
                                   .value();
    }

    // sort tag_paths in each document
    for (const document of Object.values(documents)) {
      document.tag_paths = _.chain(document.tag_paths)
                           .sortBy([
                             (tag_path) => tag_path
                           ])
                           .value();
    }

    return {
      collections,
      documents,
      tags,
    }
  }
}