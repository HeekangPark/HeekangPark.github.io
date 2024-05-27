---
title: test
date_created: "2024-04-14"
date_modified: "2024-04-14"
---

line before codeblock

<v-codeblock>

```python
print("Hello, World!")
```

```text
Hello, World!
```

</v-codeblock>

```python
print("Without Line numbers")
```

```python:line-numbers
print("Line numbers")
```

```python{1}
print("Highlight line 1")
```

```python
print("Focuesed line 1") # [!code focus]
```

```python
print("removed") # [!code --]
print("added") # [!code ++]
print("error") # [!code error]
print("warning") # [!code warning]
```

line after codeblock