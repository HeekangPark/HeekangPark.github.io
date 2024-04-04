import {
  createHooks
} from "./chunk-TL5QK2B5.js";
import {
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  unref,
  version,
  watch,
  watchEffect
} from "./chunk-Z6B2QTD3.js";
import "./chunk-Y2F7D3TJ.js";

// node_modules/@unhead/shared/dist/index.mjs
function asArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
var SelfClosingTags = ["meta", "link", "base"];
var TagsWithInnerContent = ["title", "titleTemplate", "script", "style", "noscript"];
var HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var ValidHeadTags = [
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"];
var TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "children", "innerHTML", "textContent", "processTemplateParams"];
var IsBrowser = typeof window !== "undefined";
var composableNames = [
  "getActiveHead",
  "useHead",
  "useSeoMeta",
  "useHeadSafe",
  "useServerHead",
  "useServerSeoMeta",
  "useServerHeadSafe"
];
function defineHeadPlugin(plugin) {
  return plugin;
}
function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  return tag._h || hashCode(tag._d ? tag._d : `${tag.tag}:${tag.textContent || tag.innerHTML || ""}:${Object.entries(tag.props).map(([key, value]) => `${key}:${String(value)}`).join(",")}`);
}
function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}
function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k2, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k2, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}
function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (typeof resolved !== "undefined")
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}
var p = (p2) => ({ keyValue: p2, metaKey: "property" });
var k = (p2) => ({ keyValue: p2 });
var MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)}=${value}`;
      }
    }
  },
  articleExpirationTime: p("article:expiration_time"),
  articleModifiedTime: p("article:modified_time"),
  articlePublishedTime: p("article:published_time"),
  bookReleaseDate: p("book:release_date"),
  charset: {
    metaKey: "charset"
  },
  contentSecurityPolicy: {
    unpack: {
      entrySeparator: "; ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)} ${value}`;
      }
    },
    metaKey: "http-equiv"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  fbAppId: p("fb:app_id"),
  msapplicationConfig: k("msapplication-Config"),
  msapplicationTileColor: k("msapplication-TileColor"),
  msapplicationTileImage: k("msapplication-TileImage"),
  ogAudioSecureUrl: p("og:audio:secure_url"),
  ogAudioUrl: p("og:audio"),
  ogImageSecureUrl: p("og:image:secure_url"),
  ogImageUrl: p("og:image"),
  ogSiteName: p("og:site_name"),
  ogVideoSecureUrl: p("og:video:secure_url"),
  ogVideoUrl: p("og:video"),
  profileFirstName: p("profile:first_name"),
  profileLastName: p("profile:last_name"),
  profileUsername: p("profile:username"),
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      resolve({ key, value }) {
        if (key === "seconds")
          return `${value}`;
      }
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        if (typeof value === "boolean")
          return `${fixKeyCase(key)}`;
        else
          return `${fixKeyCase(key)}:${value}`;
      }
    }
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  }
};
var openGraphNamespaces = [
  "og",
  "book",
  "article",
  "profile"
];
function resolveMetaKeyType(key) {
  var _a;
  const fKey = fixKeyCase(key).split(":")[0];
  if (openGraphNamespaces.includes(fKey))
    return "property";
  return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.metaKey) || "name";
}
function resolveMetaKeyValue(key) {
  var _a;
  return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.keyValue) || fixKeyCase(key);
}
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const fKey = updated.split("-")[0];
  if (openGraphNamespaces.includes(fKey) || fKey === "twitter")
    return key.replace(/([A-Z])/g, ":$1").toLowerCase();
  return updated;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry) => changeKeyCasingDeep(entry));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const [key, value] of Object.entries(input))
    output[fixKeyCase(key)] = changeKeyCasingDeep(value);
  return output;
}
function resolvePackedMetaObjectValue(value, key) {
  const definition = MetaPackingSchema[key];
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(
    changeKeyCasingDeep(value),
    {
      keyValueSeparator: "=",
      entrySeparator: ", ",
      resolve({ value: value2, key: key2 }) {
        if (value2 === null)
          return "";
        if (typeof value2 === "boolean")
          return `${key2}`;
      },
      ...definition == null ? void 0 : definition.unpack
    }
  );
}
var ObjectArrayEntries = ["og:image", "og:video", "og:audio", "twitter:image"];
function sanitize(input) {
  const out = {};
  Object.entries(input).forEach(([k2, v]) => {
    if (String(v) !== "false" && k2)
      out[k2] = v;
  });
  return out;
}
function handleObjectEntry(key, v) {
  const value = sanitize(v);
  const fKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fKey);
  if (ObjectArrayEntries.includes(fKey)) {
    const input = {};
    Object.entries(value).forEach(([k2, v2]) => {
      input[`${key}${k2 === "url" ? "" : `${k2.charAt(0).toUpperCase()}${k2.slice(1)}`}`] = v2;
    });
    return unpackMeta(input).sort((a, b) => {
      var _a, _b;
      return (((_a = a[attr]) == null ? void 0 : _a.length) || 0) - (((_b = b[attr]) == null ? void 0 : _b.length) || 0);
    });
  }
  return [{ [attr]: fKey, ...value }];
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  Object.entries(input).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      if (typeof value === "object" && value) {
        if (ObjectArrayEntries.includes(fixKeyCase(key))) {
          extras.push(...handleObjectEntry(key, value));
          return;
        }
        primitives[key] = sanitize(value);
      } else {
        primitives[key] = value;
      }
      return;
    }
    value.forEach((v) => {
      extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
    });
  });
  const meta = unpackToArray(primitives, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      return resolveMetaKeyValue(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object")
        return resolvePackedMetaObjectValue(value, key);
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].map((m) => {
    if (m.content === "_null")
      m.content = null;
    return m;
  });
}
var WhitelistAttributes = {
  htmlAttrs: ["id", "class", "lang", "dir"],
  bodyAttrs: ["id", "class"],
  meta: ["id", "name", "property", "charset", "content"],
  noscript: ["id", "textContent"],
  script: ["id", "type", "textContent"],
  link: ["id", "color", "crossorigin", "fetchpriority", "href", "hreflang", "imagesrcset", "imagesizes", "integrity", "media", "referrerpolicy", "rel", "sizes", "type"]
};
function acceptDataAttrs(value) {
  const filtered = {};
  Object.keys(value || {}).filter((a) => a.startsWith("data-")).forEach((a) => {
    filtered[a] = value[a];
  });
  return filtered;
}
function whitelistSafeInput(input) {
  const filtered = {};
  Object.keys(input).forEach((key) => {
    const tagValue = input[key];
    if (!tagValue)
      return;
    switch (key) {
      case "title":
      case "titleTemplate":
      case "templateParams":
        filtered[key] = tagValue;
        break;
      case "htmlAttrs":
      case "bodyAttrs":
        filtered[key] = acceptDataAttrs(tagValue);
        WhitelistAttributes[key].forEach((a) => {
          if (tagValue[a])
            filtered[key][a] = tagValue[a];
        });
        break;
      case "meta":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const safeMeta = acceptDataAttrs(meta);
            WhitelistAttributes.meta.forEach((key2) => {
              if (meta[key2])
                safeMeta[key2] = meta[key2];
            });
            return safeMeta;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "link":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const link = acceptDataAttrs(meta);
            WhitelistAttributes.link.forEach((key2) => {
              const val = meta[key2];
              if (key2 === "rel" && ["stylesheet", "canonical", "modulepreload", "prerender", "preload", "prefetch"].includes(val))
                return;
              if (key2 === "href") {
                if (val.includes("javascript:") || val.includes("data:"))
                  return;
                link[key2] = val;
              } else if (val) {
                link[key2] = val;
              }
            });
            return link;
          }).filter((link) => Object.keys(link).length > 1 && !!link.rel);
        }
        break;
      case "noscript":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const noscript = acceptDataAttrs(meta);
            WhitelistAttributes.noscript.forEach((key2) => {
              if (meta[key2])
                noscript[key2] = meta[key2];
            });
            return noscript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "script":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((script) => {
            const safeScript = acceptDataAttrs(script);
            WhitelistAttributes.script.forEach((s) => {
              if (script[s]) {
                if (s === "textContent") {
                  try {
                    const jsonVal = typeof script[s] === "string" ? JSON.parse(script[s]) : script[s];
                    safeScript[s] = JSON.stringify(jsonVal, null, 0);
                  } catch (e) {
                  }
                } else {
                  safeScript[s] = script[s];
                }
              }
            });
            return safeScript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
    }
  });
  return filtered;
}
async function normaliseTag(tagName, input, e) {
  const tag = {
    tag: tagName,
    props: await normaliseProps(
      // explicitly check for an object
      // @ts-expect-error untyped
      typeof input === "object" && typeof input !== "function" && !(input instanceof Promise) ? { ...input } : { [["script", "noscript", "style"].includes(tagName) ? "innerHTML" : "textContent"]: input },
      ["templateParams", "titleTemplate"].includes(tagName)
    )
  };
  TagConfigKeys.forEach((k2) => {
    const val = typeof tag.props[k2] !== "undefined" ? tag.props[k2] : e[k2];
    if (typeof val !== "undefined") {
      if (!["innerHTML", "textContent", "children"].includes(k2) || TagsWithInnerContent.includes(tag.tag)) {
        tag[k2 === "children" ? "innerHTML" : k2] = val;
      }
      delete tag.props[k2];
    }
  });
  if (tag.props.body) {
    tag.tagPosition = "bodyClose";
    delete tag.props.body;
  }
  if (tag.tag === "script") {
    if (typeof tag.innerHTML === "object") {
      tag.innerHTML = JSON.stringify(tag.innerHTML);
      tag.props.type = tag.props.type || "application/json";
    }
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normaliseStyleClassProps(key, v) {
  const sep = key === "class" ? " " : ";";
  if (typeof v === "object" && !Array.isArray(v)) {
    v = Object.entries(v).filter(([, v2]) => v2).map(([k2, v2]) => key === "style" ? `${k2}:${v2}` : k2);
  }
  return (Array.isArray(v) ? v.join(sep) : v).split(sep).filter((c) => c.trim()).filter(Boolean).join(sep);
}
async function normaliseProps(props, virtual) {
  for (const k2 of Object.keys(props)) {
    if (["class", "style"].includes(k2)) {
      props[k2] = normaliseStyleClassProps(k2, props[k2]);
      continue;
    }
    if (props[k2] instanceof Promise)
      props[k2] = await props[k2];
    if (!virtual && !TagConfigKeys.includes(k2)) {
      const v = String(props[k2]);
      const isDataKey = k2.startsWith("data-");
      if (v === "true" || v === "") {
        props[k2] = isDataKey ? "true" : true;
      } else if (!props[k2]) {
        if (isDataKey && v === "false")
          props[k2] = "false";
        else
          delete props[k2];
      }
    }
  }
  return props;
}
var TagEntityBits = 10;
async function normaliseEntryTags(e) {
  const tagPromises = [];
  Object.entries(e.resolvedInput).filter(([k2, v]) => typeof v !== "undefined" && ValidHeadTags.includes(k2)).forEach(([k2, value]) => {
    const v = asArray$1(value);
    tagPromises.push(...v.map((props) => normaliseTag(k2, props, e)).flat());
  });
  return (await Promise.all(tagPromises)).flat().filter(Boolean).map((t, i) => {
    t._e = e._i;
    e.mode && (t._m = e.mode);
    t._p = (e._i << TagEntityBits) + i;
    return t;
  });
}
var TAG_WEIGHTS = {
  // tags
  base: -10,
  title: 10
};
var TAG_ALIASES = {
  // relative scores to their default values
  critical: -80,
  high: -10,
  low: 20
};
function tagWeight(tag) {
  let weight = 100;
  const priority = tag.tagPriority;
  if (typeof priority === "number")
    return priority;
  if (tag.tag === "meta") {
    if (tag.props["http-equiv"] === "content-security-policy")
      weight = -30;
    if (tag.props.charset)
      weight = -20;
    if (tag.props.name === "viewport")
      weight = -15;
  } else if (tag.tag === "link" && tag.props.rel === "preconnect") {
    weight = 20;
  } else if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  }
  if (typeof priority === "string" && priority in TAG_ALIASES) {
    return weight + TAG_ALIASES[priority];
  }
  return weight;
}
var SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
var NetworkEvents = ["onload", "onerror", "onabort", "onprogress", "onloadstart"];
var sepSub = "%separator";
function processTemplateParams(s, p2, sep) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  function sub(token) {
    let val;
    if (["s", "pageTitle"].includes(token)) {
      val = p2.pageTitle;
    } else if (token.includes(".")) {
      val = token.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, p2);
    } else {
      val = p2[token];
    }
    return typeof val !== "undefined" ? (val || "").replace(/"/g, '\\"') : false;
  }
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token) => {
    const re = sub(token.slice(1));
    if (typeof re === "string") {
      s = s.replace(new RegExp(`\\${token}(\\W|$)`, "g"), (_, args) => `${re}${args}`).trim();
    }
  });
  if (s.includes(sepSub)) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length).trim();
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length).trim();
    s = s.replace(new RegExp(`\\${sepSub}\\s*\\${sepSub}`, "g"), sepSub);
    s = processTemplateParams(s, { separator: sep }, sep);
  }
  return s;
}

// node_modules/@unhead/dom/dist/index.mjs
async function renderDOMHead(head, options = {}) {
  var _a;
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  const tags = (await head.resolveTags()).map((tag) => ({
    tag,
    id: HasElementTags.includes(tag.tag) ? hashTag(tag) : tag.tag,
    shouldRender: true
  }));
  let state = head._dom;
  if (!state) {
    state = {
      elMap: { htmlAttrs: dom.documentElement, bodyAttrs: dom.body }
    };
    for (const key of ["body", "head"]) {
      const children = (_a = dom[key]) == null ? void 0 : _a.children;
      const tags2 = [];
      for (const c of [...children].filter((c2) => HasElementTags.includes(c2.tagName.toLowerCase()))) {
        const t = {
          tag: c.tagName.toLowerCase(),
          props: await normaliseProps(
            c.getAttributeNames().reduce((props, name) => ({ ...props, [name]: c.getAttribute(name) }), {})
          ),
          innerHTML: c.innerHTML
        };
        let i = 1;
        let d = tagDedupeKey(t);
        while (d && tags2.find((t2) => t2._d === d))
          d = `${d}:${i++}`;
        t._d = d || void 0;
        tags2.push(t);
        state.elMap[c.getAttribute("data-hid") || hashTag(t)] = c;
      }
    }
  }
  state.pendingSideEffects = { ...state.sideEffects || {} };
  state.sideEffects = {};
  function track(id, scope, fn) {
    const k2 = `${id}:${scope}`;
    state.sideEffects[k2] = fn;
    delete state.pendingSideEffects[k2];
  }
  function trackCtx({ id, $el, tag }) {
    const isAttrTag = tag.tag.endsWith("Attrs");
    state.elMap[id] = $el;
    if (!isAttrTag) {
      ["textContent", "innerHTML"].forEach((k2) => {
        tag[k2] && tag[k2] !== $el[k2] && ($el[k2] = tag[k2]);
      });
      track(id, "el", () => {
        var _a2;
        (_a2 = state.elMap[id]) == null ? void 0 : _a2.remove();
        delete state.elMap[id];
      });
    }
    for (const [k2, value] of Object.entries(tag._eventHandlers || {})) {
      if ($el.getAttribute(`data-${k2}`) !== "") {
        (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(k2.replace("on", ""), value.bind($el));
        $el.setAttribute(`data-${k2}`, "");
      }
    }
    Object.entries(tag.props).forEach(([k2, value]) => {
      const ck = `attr:${k2}`;
      if (k2 === "class") {
        for (const c of (value || "").split(" ").filter(Boolean)) {
          isAttrTag && track(id, `${ck}:${c}`, () => $el.classList.remove(c));
          !$el.classList.contains(c) && $el.classList.add(c);
        }
      } else if (k2 === "style") {
        for (const c of (value || "").split(";").filter(Boolean)) {
          const [k22, ...v] = c.split(":").map((s) => s.trim());
          track(id, `${ck}:${c}:${k22}`, () => {
            $el.style.removeProperty(k22);
          });
          $el.style.setProperty(k22, v.join(":"));
        }
      } else {
        $el.getAttribute(k2) !== value && $el.setAttribute(k2, value === true ? "" : String(value));
        isAttrTag && track(id, ck, () => $el.removeAttribute(k2));
      }
    });
  }
  const pending = [];
  const frag = {
    bodyClose: void 0,
    bodyOpen: void 0,
    head: void 0
  };
  for (const ctx of tags) {
    const { tag, shouldRender, id } = ctx;
    if (!shouldRender)
      continue;
    if (tag.tag === "title") {
      dom.title = tag.textContent;
      continue;
    }
    ctx.$el = ctx.$el || state.elMap[id];
    if (ctx.$el)
      trackCtx(ctx);
    else
      HasElementTags.includes(tag.tag) && pending.push(ctx);
  }
  for (const ctx of pending) {
    const pos = ctx.tag.tagPosition || "head";
    ctx.$el = dom.createElement(ctx.tag.tag);
    trackCtx(ctx);
    frag[pos] = frag[pos] || dom.createDocumentFragment();
    frag[pos].appendChild(ctx.$el);
  }
  for (const ctx of tags)
    await head.hooks.callHook("dom:renderTag", ctx, dom, track);
  frag.head && dom.head.appendChild(frag.head);
  frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
  frag.bodyClose && dom.body.appendChild(frag.bodyClose);
  Object.values(state.pendingSideEffects).forEach((fn) => fn());
  head._dom = state;
  head.dirty = false;
  await head.hooks.callHook("dom:rendered", { renders: tags });
}
async function debouncedRenderDOMHead(head, options = {}) {
  const fn = options.delayFn || ((fn2) => setTimeout(fn2, 10));
  return head._domUpdatePromise = head._domUpdatePromise || new Promise((resolve) => fn(async () => {
    await renderDOMHead(head, options);
    delete head._domUpdatePromise;
    resolve();
  }));
}
function DomPlugin(options) {
  return defineHeadPlugin((head) => {
    var _a, _b;
    const initialPayload = ((_b = (_a = head.resolvedOptions.document) == null ? void 0 : _a.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : _b.innerHTML) || false;
    initialPayload && head.push(JSON.parse(initialPayload));
    return {
      mode: "client",
      hooks: {
        "entries:updated": function(head2) {
          debouncedRenderDOMHead(head2, options);
        }
      }
    };
  });
}

// node_modules/unhead/dist/index.mjs
var UsesMergeStrategy = ["templateParams", "htmlAttrs", "bodyAttrs"];
var DedupePlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": function({ tag }) {
      ["hid", "vmid", "key"].forEach((key) => {
        if (tag.props[key]) {
          tag.key = tag.props[key];
          delete tag.props[key];
        }
      });
      const generatedKey = tagDedupeKey(tag);
      const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
      if (dedupe)
        tag._d = dedupe;
    },
    "tags:resolve": function(ctx) {
      const deduping = {};
      ctx.tags.forEach((tag) => {
        const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || tag._p;
        const dupedTag = deduping[dedupeKey];
        if (dupedTag) {
          let strategy = tag == null ? void 0 : tag.tagDuplicateStrategy;
          if (!strategy && UsesMergeStrategy.includes(tag.tag))
            strategy = "merge";
          if (strategy === "merge") {
            const oldProps = dupedTag.props;
            ["class", "style"].forEach((key) => {
              if (oldProps[key]) {
                if (tag.props[key]) {
                  if (key === "style" && !oldProps[key].endsWith(";"))
                    oldProps[key] += ";";
                  tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
                } else {
                  tag.props[key] = oldProps[key];
                }
              }
            });
            deduping[dedupeKey].props = {
              ...oldProps,
              ...tag.props
            };
            return;
          } else if (tag._e === dupedTag._e) {
            dupedTag._duped = dupedTag._duped || [];
            tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
            dupedTag._duped.push(tag);
            return;
          } else if (tagWeight(tag) > tagWeight(dupedTag)) {
            return;
          }
        }
        const propCount = Object.keys(tag.props).length + (tag.innerHTML ? 1 : 0) + (tag.textContent ? 1 : 0);
        if (HasElementTags.includes(tag.tag) && propCount === 0) {
          delete deduping[dedupeKey];
          return;
        }
        deduping[dedupeKey] = tag;
      });
      const newTags = [];
      Object.values(deduping).forEach((tag) => {
        const dupes = tag._duped;
        delete tag._duped;
        newTags.push(tag);
        if (dupes)
          newTags.push(...dupes);
      });
      ctx.tags = newTags;
      ctx.tags = ctx.tags.filter((t) => !(t.tag === "meta" && (t.props.name || t.props.property) && !t.props.content));
    }
  }
});
var PayloadPlugin = defineHeadPlugin({
  mode: "server",
  hooks: {
    "tags:resolve": function(ctx) {
      const payload = {};
      ctx.tags.filter((tag) => ["titleTemplate", "templateParams", "title"].includes(tag.tag) && tag._m === "server").forEach((tag) => {
        payload[tag.tag] = tag.tag.startsWith("title") ? tag.textContent : tag.props;
      });
      Object.keys(payload).length && ctx.tags.push({
        tag: "script",
        innerHTML: JSON.stringify(payload),
        props: { id: "unhead:payload", type: "application/json" }
      });
    }
  }
});
var ValidEventTags = ["script", "link", "bodyAttrs"];
var EventHandlersPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": function(ctx) {
      for (const tag of ctx.tags.filter((t) => ValidEventTags.includes(t.tag))) {
        Object.entries(tag.props).forEach(([key, value]) => {
          if (key.startsWith("on") && typeof value === "function") {
            if (head.ssr && NetworkEvents.includes(key))
              tag.props[key] = `this.dataset.${key}fired = true`;
            else
              delete tag.props[key];
            tag._eventHandlers = tag._eventHandlers || {};
            tag._eventHandlers[key] = value;
          }
        });
        if (head.ssr && tag._eventHandlers && (tag.props.src || tag.props.href))
          tag.key = tag.key || hashCode(tag.props.src || tag.props.href);
      }
    },
    "dom:renderTag": function({ $el, tag }) {
      var _a, _b;
      for (const k2 of Object.keys(($el == null ? void 0 : $el.dataset) || {}).filter((k22) => NetworkEvents.some((e) => `${e}fired` === k22))) {
        const ek = k2.replace("fired", "");
        (_b = (_a = tag._eventHandlers) == null ? void 0 : _a[ek]) == null ? void 0 : _b.call($el, new Event(ek.replace("on", "")));
      }
    }
  }
}));
var DupeableTags = ["link", "style", "script", "noscript"];
var HashKeyedPlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.key && DupeableTags.includes(tag.tag)) {
        tag.props["data-hid"] = tag._h = hashCode(tag.key);
      }
    }
  }
});
var SortPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const tagPositionForKey = (key) => {
        var _a;
        return (_a = ctx.tags.find((tag) => tag._d === key)) == null ? void 0 : _a._p;
      };
      for (const { prefix, offset } of SortModifiers) {
        for (const tag of ctx.tags.filter((tag2) => typeof tag2.tagPriority === "string" && tag2.tagPriority.startsWith(prefix))) {
          const position = tagPositionForKey(
            tag.tagPriority.replace(prefix, "")
          );
          if (typeof position !== "undefined")
            tag._p = position + offset;
        }
      }
      ctx.tags.sort((a, b) => a._p - b._p).sort((a, b) => tagWeight(a) - tagWeight(b));
    }
  }
});
var SupportedAttrs = {
  meta: "content",
  link: "href",
  htmlAttrs: "lang"
};
var TemplateParamsPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      var _a;
      const { tags } = ctx;
      const title = (_a = tags.find((tag) => tag.tag === "title")) == null ? void 0 : _a.textContent;
      const idx = tags.findIndex((tag) => tag.tag === "templateParams");
      const params = idx !== -1 ? tags[idx].props : {};
      const sep = params.separator || "|";
      delete params.separator;
      params.pageTitle = processTemplateParams(params.pageTitle || title || "", params, sep);
      for (const tag of tags.filter((t) => t.processTemplateParams !== false)) {
        const v = SupportedAttrs[tag.tag];
        if (v && typeof tag.props[v] === "string") {
          tag.props[v] = processTemplateParams(tag.props[v], params, sep);
        } else if (tag.processTemplateParams === true || ["titleTemplate", "title"].includes(tag.tag)) {
          ["innerHTML", "textContent"].forEach((p2) => {
            if (typeof tag[p2] === "string")
              tag[p2] = processTemplateParams(tag[p2], params, sep);
          });
        }
      }
      head._templateParams = params;
      head._separator = sep;
      ctx.tags = tags.filter((tag) => tag.tag !== "templateParams");
    }
  }
}));
var TitleTemplatePlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let titleTemplateIdx = tags.findIndex((i) => i.tag === "titleTemplate");
      const titleIdx = tags.findIndex((i) => i.tag === "title");
      if (titleIdx !== -1 && titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent,
          tags[titleIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleIdx].textContent = newTitle || tags[titleIdx].textContent;
        } else {
          delete tags[titleIdx];
        }
      } else if (titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleTemplateIdx].textContent = newTitle;
          tags[titleTemplateIdx].tag = "title";
          titleTemplateIdx = -1;
        }
      }
      if (titleTemplateIdx !== -1) {
        delete tags[titleTemplateIdx];
      }
      ctx.tags = tags.filter(Boolean);
    }
  }
});
var XSSPlugin = defineHeadPlugin({
  hooks: {
    "tags:afterResolve": function(ctx) {
      for (const tag of ctx.tags) {
        if (typeof tag.innerHTML === "string") {
          if (tag.innerHTML && ["application/ld+json", "application/json"].includes(tag.props.type)) {
            tag.innerHTML = tag.innerHTML.replace(/</g, "\\u003C");
          } else {
            tag.innerHTML = tag.innerHTML.replace(new RegExp(`</${tag.tag}`, "g"), `<\\/${tag.tag}`);
          }
        }
      }
    }
  }
});
var activeHead;
function createHead(options = {}) {
  const head = createHeadCore(options);
  head.use(DomPlugin());
  return activeHead = head;
}
function filterMode(mode, ssr) {
  return !mode || mode === "server" && ssr || mode === "client" && !ssr;
}
function createHeadCore(options = {}) {
  const hooks = createHooks();
  hooks.addHooks(options.hooks || {});
  options.document = options.document || (IsBrowser ? document : void 0);
  const ssr = !options.document;
  const updated = () => {
    head.dirty = true;
    hooks.callHook("entries:updated", head);
  };
  let entryCount = 0;
  let entries = [];
  const plugins = [];
  const head = {
    plugins,
    dirty: false,
    resolvedOptions: options,
    hooks,
    headEntries() {
      return entries;
    },
    use(p2) {
      const plugin = typeof p2 === "function" ? p2(head) : p2;
      if (!plugin.key || !plugins.some((p22) => p22.key === plugin.key)) {
        plugins.push(plugin);
        filterMode(plugin.mode, ssr) && hooks.addHooks(plugin.hooks || {});
      }
    },
    push(input, entryOptions) {
      entryOptions == null ? true : delete entryOptions.head;
      const entry = {
        _i: entryCount++,
        input,
        ...entryOptions
      };
      if (filterMode(entry.mode, ssr)) {
        entries.push(entry);
        updated();
      }
      return {
        dispose() {
          entries = entries.filter((e) => e._i !== entry._i);
          hooks.callHook("entries:updated", head);
          updated();
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          entries = entries.map((e) => {
            if (e._i === entry._i) {
              e.input = entry.input = input2;
            }
            return e;
          });
          updated();
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        const resolved = entry.resolvedInput || entry.input;
        entry.resolvedInput = await (entry.transform ? entry.transform(resolved) : resolved);
        if (entry.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry)) {
            const tagCtx = { tag, entry, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:beforeResolve", resolveCtx);
      await hooks.callHook("tags:resolve", resolveCtx);
      await hooks.callHook("tags:afterResolve", resolveCtx);
      return resolveCtx.tags;
    },
    ssr
  };
  [
    DedupePlugin,
    PayloadPlugin,
    EventHandlersPlugin,
    HashKeyedPlugin,
    SortPlugin,
    TemplateParamsPlugin,
    TitleTemplatePlugin,
    XSSPlugin,
    ...(options == null ? void 0 : options.plugins) || []
  ].forEach((p2) => head.use(p2));
  head.hooks.callHook("init", head);
  return head;
}
function getActiveHead() {
  return activeHead;
}

// node_modules/@unhead/vue/dist/shared/vue.cf295fb1.mjs
var Vue3 = version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k2, v]) => {
        if (k2 === "titleTemplate" || k2.startsWith("on"))
          return [k2, unref(v)];
        return [k2, resolveUnrefHeadInput(v, k2)];
      })
    );
  }
  return root;
}
var VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
var headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createHead2(options = {}) {
  options.domDelayFn = options.domDelayFn || ((fn) => nextTick(() => setTimeout(() => fn(), 0)));
  const head = createHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__unhead_injection_handler__";
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && true)
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}

// node_modules/@unhead/vue/dist/shared/vue.f36acd1f.mjs
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

// node_modules/@unhead/vue/dist/index.mjs
var VueHeadMixin = {
  created() {
    let source = false;
    if (Vue3) {
      const instance = getCurrentInstance();
      if (!instance)
        return;
      const options = instance.type;
      if (!options || !("head" in options))
        return;
      source = typeof options.head === "function" ? () => options.head.call(instance.proxy) : options.head;
    } else {
      const head = this.$options.head;
      if (head) {
        source = typeof head === "function" ? () => head.call(this) : head;
      }
    }
    source && useHead(source);
  }
};
var Vue2ProvideUnheadPlugin = function(_Vue, head) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      const origProvide = options.provide;
      options.provide = function() {
        let origProvideResult;
        if (typeof origProvide === "function")
          origProvideResult = origProvide.call(this);
        else
          origProvideResult = origProvide || {};
        return {
          ...origProvideResult,
          [headSymbol]: head
        };
      };
    }
  });
};
var coreComposableNames = [
  "injectHead"
];
var unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...composableNames]
};
function useHeadSafe(input, options = {}) {
  return useHead(input, { ...options, transform: whitelistSafeInput });
}
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
function useServerHead(input, options = {}) {
  const head = options.head || injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
function useServerHeadSafe(input, options = {}) {
  return useHeadSafe(input, { ...options, mode: "server" });
}
function useServerSeoMeta(input, options) {
  return useSeoMeta(input, { ...options || {}, mode: "server" });
}

// node_modules/@unhead/vue/dist/polyfill.mjs
function polyfillAsVueUseHead(head) {
  const polyfilled = head;
  polyfilled.headTags = head.resolveTags;
  polyfilled.addEntry = head.push;
  polyfilled.addHeadObjs = head.push;
  polyfilled.addReactiveEntry = (input, options) => {
    const api = useHead(input, options);
    if (typeof api !== "undefined")
      return api.dispose;
    return () => {
    };
  };
  polyfilled.removeHeadObjs = () => {
  };
  polyfilled.updateDOM = () => {
    head.hooks.callHook("entries:updated", head);
  };
  polyfilled.unhead = head;
  return polyfilled;
}

// node_modules/@unhead/ssr/dist/index.mjs
function encodeAttribute(value) {
  return String(value).replace(/"/g, "&quot;");
}
function propsToString(props) {
  const attrs = [];
  for (const [key, value] of Object.entries(props)) {
    if (value !== false && value !== null)
      attrs.push(value === true ? key : `${key}="${encodeAttribute(value)}"`);
  }
  return `${attrs.length > 0 ? " " : ""}${attrs.join(" ")}`;
}
function escapeHtml(str) {
  return str.replace(/[&<>"'/]/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return char;
    }
  });
}
function tagToString(tag) {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  if (!TagsWithInnerContent.includes(tag.tag))
    return SelfClosingTags.includes(tag.tag) ? openTag : `${openTag}</${tag.tag}>`;
  let content = String(tag.innerHTML || "");
  if (tag.textContent)
    content = escapeHtml(String(tag.textContent));
  return SelfClosingTags.includes(tag.tag) ? openTag : `${openTag}${content}</${tag.tag}>`;
}
function ssrRenderTags(tags, options) {
  const schema = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: [], bodyClose: [], bodyOpen: [] } };
  for (const tag of tags) {
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      schema[tag.tag] = { ...schema[tag.tag], ...tag.props };
      continue;
    }
    schema.tags[tag.tagPosition || "head"].push(tagToString(tag));
  }
  const lineBreaks = !(options == null ? void 0 : options.omitLineBreaks) ? "\n" : "";
  return {
    headTags: schema.tags.head.join(lineBreaks),
    bodyTags: schema.tags.bodyClose.join(lineBreaks),
    bodyTagsOpen: schema.tags.bodyOpen.join(lineBreaks),
    htmlAttrs: propsToString(schema.htmlAttrs),
    bodyAttrs: propsToString(schema.bodyAttrs)
  };
}
async function renderSSRHead(head, options) {
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("ssr:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender) {
    return {
      headTags: "",
      bodyTags: "",
      bodyTagsOpen: "",
      htmlAttrs: "",
      bodyAttrs: ""
    };
  }
  const ctx = { tags: await head.resolveTags() };
  await head.hooks.callHook("ssr:render", ctx);
  const html = ssrRenderTags(ctx.tags, options);
  const renderCtx = { tags: ctx.tags, html };
  await head.hooks.callHook("ssr:rendered", renderCtx);
  return renderCtx.html;
}

// node_modules/@unhead/vue/dist/components.mjs
function addVNodeToHeadObj(node, obj) {
  const nodeType = !Vue3 ? node.tag : node.type;
  const type = nodeType === "html" ? "htmlAttrs" : nodeType === "body" ? "bodyAttrs" : nodeType;
  if (typeof type !== "string" || !(type in obj))
    return;
  const nodeData = !Vue3 ? node.data : node;
  const props = (!Vue3 ? nodeData.attrs : node.props) || {};
  if (!Vue3) {
    if (nodeData.staticClass)
      props.class = nodeData.staticClass;
    if (nodeData.staticStyle)
      props.style = Object.entries(nodeData.staticStyle).map(([key, value]) => `${key}:${value}`).join(";");
  }
  if (node.children) {
    const childrenAttr = !Vue3 ? "text" : "children";
    props.children = Array.isArray(node.children) ? node.children[0][childrenAttr] : node[childrenAttr];
  }
  if (Array.isArray(obj[type]))
    obj[type].push(props);
  else if (type === "title")
    obj.title = props.children;
  else
    obj[type] = props;
}
function vnodesToHeadObj(nodes) {
  const obj = {
    title: void 0,
    htmlAttrs: void 0,
    bodyAttrs: void 0,
    base: void 0,
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: []
  };
  for (const node of nodes) {
    if (typeof node.type === "symbol" && Array.isArray(node.children)) {
      for (const childNode of node.children)
        addVNodeToHeadObj(childNode, obj);
    } else {
      addVNodeToHeadObj(node, obj);
    }
  }
  return obj;
}
var Head = defineComponent({
  name: "Head",
  setup(_, { slots }) {
    const head = injectHead();
    const obj = ref({});
    const entry = head.push(obj);
    onBeforeUnmount(() => {
      entry.dispose();
    });
    return () => {
      watchEffect(() => {
        if (!slots.default)
          return;
        entry.patch(vnodesToHeadObj(slots.default()));
      });
      return null;
    };
  }
});

// node_modules/@vueuse/head/dist/index.mjs
function createHead3(initHeadObject, options) {
  const unhead = createHead2(options || {});
  const legacyHead = polyfillAsVueUseHead(unhead);
  if (initHeadObject)
    legacyHead.push(initHeadObject);
  return legacyHead;
}
var HeadVuePlugin = Vue2ProvideUnheadPlugin;
var renderHeadToString = (head) => renderSSRHead(head.unhead);
export {
  Head,
  HeadVuePlugin,
  Vue2ProvideUnheadPlugin,
  VueHeadMixin,
  createHead3 as createHead,
  createHeadCore,
  injectHead,
  renderHeadToString,
  unheadVueComposablesImports,
  useHead,
  useHeadSafe,
  useSeoMeta,
  useServerHead,
  useServerHeadSafe,
  useServerSeoMeta
};
//# sourceMappingURL=@vueuse_head.js.map
