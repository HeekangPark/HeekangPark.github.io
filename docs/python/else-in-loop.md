---
title: "반복문에서의 else"
date_created: "2024-11-27"
date_modified: "2024-11-27"
---

::: danger 사용하지 않는 것이 좋음

이 기능은 코드의 가독성을 떨어뜨리므로 되도록 사용하지 않는 것이 좋다.

:::

# 반복문에서의 else

파이썬에서는 반복문 뒤에 `else` 블록을 사용할 수 있다. `else` 블록은 반복문이 중간에 `break`나 `raise` 따위로 끊기지 않고 끝까지 실행되었을 때 실행된다.

<v-codeblock title="for-else 구문">

```python
for i in range(3):
    print(i)
else:
    print("Done!")
```

```result
0
1
2
Done!
```

</v-codeblock>

<v-codeblock title="while-else 구문">

```python
i = 0
while i < 3:
    print(i)
    i += 1
else:
    print("Done!")
```

```result
0
1
2
Done!
```

</v-codeblock>

반복문이 중간에 끊기면 `else` 블록은 실행되지 않는다.

<v-codeblock title="else가 실행되지 않는 예시">

```python
for i in range(3):
    if i == 2:
        break

    print(i)
else:
    print("Done!")
```

```result
0
1
```

</v-codeblock>

# 되도록 사용하지 말아야

반복문에서의 `else` 문법을 보고 뭔가 이상하다고 느끼는 사람이 많을 것이다. `if-else` 구문에서 `else` 블록은 `if` 블록이 실행되지 않았을 때 실행되는 블록이었다. 하지만 반복문에서의 `else`는 오히려 반복문이 정상적으로 실행되고 나면 실행된다. `if-else` 구문에 익숙한 사람이라면 자칫 반복문에서의 `else` 역시 반복문이 정상적으로 종료되지 않았을 때 실행되는 블록이라고 오해하기 너무 쉽다. 이러한 이유로 되도록 반복문에서의 `else`는 사용하지 않는 것이 좋다.

반복문이 정상적으로 실행되었는지, 중간에 끊겼는지 확인하고 싶다면 `else` 문법을 사용하기 보단 플래그 변수를 사용하는 방식을 추천한다. `else` 문법을 사용할 떄보다 다소 장황해질 수 있지만, 가독성이 훨씬 좋아진다.

<v-codeblock title="플래그 변수 사용하기">

```python
is_broken = False # 플래그 변수 생성 : 초기값은 False로 둔다.

for i in range(3):
    if i == 2:
        is_broken = True # break 직전 플래그 변수를 True로 설정
        break

    print(i)

if not is_broken:
    print("Done!") # 반복분이 정상적으로 종료되었을 때(= 플래그 변수가 True로 설정되지 않았을 때) 실행
```

```result
0
1
```

</v-codeblock>




