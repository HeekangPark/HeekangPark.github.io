---
layout: default
title: debug
---

```
color_to_rgb : {{ '#7ab55c' | color_to_rgb }}
color_to_hsl : {{ '#7ab55c' | color_to_hsl }}
color_to_hex : {{ 'rgb(122, 181, 92)' | color_to_hex }}
color_extract : {{ '#7ab55c' | color_extract: 'red' }}
color_brightness : {{ '#7ab55c' | color_brightness }}
color_modify : {{ '#7ab55c' | color_modify: 'red', 255 }}
color_lighten : {{ '#7ab55c' | color_lighten: 30 }}
color_darken : {{ '#7ab55c' | color_darken: 30 }}
color_saturate : {{ '#7ab55c' | color_saturate: 30 }}
color_desaturate : {{ '#7ab55c' | color_desaturate: 30 }}
color_mix : {{ '#7ab55c' | color_mix: '#ffc0cb', 50 }}
color_contrast : {{ '#495859' | color_contrast: '#fffffb' }}
color_difference : {{ '#ff0000' | color_difference: '#abcdef' }}
brightness_difference : {{ '#fff00f' | brightness_difference: '#0b72ab' }}
{{ 3 | pluralize: "item", "items" }}
```