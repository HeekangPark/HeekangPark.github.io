---
layout: default
title: debug
---

```
{{ "pneumonoultramicroscopicsilicovolcanoconiosis" | slice: 0 }}
{{ "pneumonoultramicroscopicsilicovolcanoconiosis" | slice: 3 }}
{{ "pneumonoultramicroscopicsilicovolcanoconiosis" | slice: -2 }}
{{ "pneumonoultramicroscopicsilicovolcanoconiosis" | slice: 3, 15 }}

{% assign string = "pneumonoultramicroscopicsilicovolcanoconiosis" | slice: -10, 7 %}
{{ string }}
```