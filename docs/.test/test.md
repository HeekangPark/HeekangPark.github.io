---
title: test
date_created: "2024-04-14"
date_modified: "2024-04-14"
---

line before codeblock

<v-codeblock title="test">

```python:line-numbers
print("removed") # [!code --]
print("added") # [!code ++]
print("error") # [!code error]
print("warning") # [!code warning]
print("highlgiht") # [!code highlight]
print("focus") # [!code focus]
```

```result
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
# another line
```

```python
print("removed") # [!code --]
print("added") # [!code ++]
print("error") # [!code error]
print("warning") # [!code warning]
```

line after `codeblock`