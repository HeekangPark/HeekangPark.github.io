---
layout: default
title: test
---

```
{{ x | default: "Not Defined!" }}
{{ false | default: 1234 }}

{% assign text = "" %}
{{ x | default: "Empty String" }}
```
    