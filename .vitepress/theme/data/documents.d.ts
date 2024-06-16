export type Document_raw = {
  frontmatter: {
    title: string | null;
    tags: string[] | null;
    date_created: string | null;
    date_modified: string | null;
    order: number | null;
    layout: string | null;
  },
  url: string;
  excerpt: string;
  src: string;
}

export type Collection_raw = {
  path: string;
  description: string | null;
  name: string | null;
  tags: string[] | null;
  layout: string | null;
  subcollections: Collection_raw[] | null;
  is_series: boolean | null;
}

export type Collection = {
  path: string;
  name: string;
  description: string | null;
  tag_paths: string[];
  layout: string;
  subcollection_paths: string[];
  parent_collection_paths: string[];
  document_paths: string[];
  is_series: boolean;
}

export type Document = {
  collection_path: string;
  collection_name: string;
  title: string;
  path: string;
  layout: string;
  excerpt: string | null;
  date_created: string | null;
  date_modified: string | null;
  order: number | null;
  tag_paths: string[];
  src: string;
}

export type Tag = {
  name: string;
  path: string;
  document_paths: string[];
}

export type Data = {
  collections: { [collection_path: string]: Collection };
  documents: { [document_path: string]: Document };
  tags: { [tag_path: string]: Tag };
}