---
title: "f-string을 이용한 문자열 보간"
date_created: "2024-08-24"
date_modified: "2024-08-24"
tags: []
---

# f-string(formatted string literal) 이란?

파이썬에서는 단일 따옴표(`"` 또는 `'`) 또는 삼중 따옴표(`"""` 또는 `'''`)를 사용해 문자열(string literal)을 표현할 수 있다.

파이썬 3.6 이상부터는 이 문자열 앞에 `f` 또는 `F`를 붙여 f-string을 만들 수 있다.

f-string을 이용하면 문자열 보간(string interpolation) 및 포멧팅을 간편하게 할 수 있다.

:::info 문자열 보간 (string interpolation)

문자열(string literal) 안에 변수가 들어갈 자리(placeholder)를 넣어, 변수 값에 따라 문자열이 매번 달라지도록 만드는 것을 말한다.

*변수 보간(variable interpolation)*, *변수 치환(variable substitution)* 등의 이름으로도 불린다.

:::

# f-string 사용법

f-string의 사용법은 다음과 같다.

<v-codeblock>

```python:line-numbers {4}
name = 'Alice'
age = 20

print(f'Hello, {name}! You are {age} years old.')
```

```result
Hello, Alice! You are 20 years old.
```

</v-codeblock>

line 4에서처럼, 문자열 앞에 `f` 또는 `F`를 붙이고, 변수를 출력하고 싶은 위치에 중괄호를 `{변수명}`과 같은 형태로 넣어 주면 된다.

# f-string의 특징

- 중괄호 영역[^3-1] 안은 파이썬 코드 영역으로 해석된다. 따라서 단순히 변수명 뿐만 아니라 연산, 함수 호출 등 다양한 표현식을 사용할 수 있다.[^3-2]

  [^3-1]: 중괄호 영역의 공식 명칭은 치환 영역(replacement field)이지...만, 이 이름으로 부르는 사람은 한 번도 못 봤다.
  [^3-2]: 중괄호 영역 안에서는 거의 대부분의 파이썬 표현식이 사용 가능하다. 다만 몇 가지 제약이 있는데, 1) 빈 표현식은 사용 불가 (문법 오류 발생), 2) lambda식, assignment expression(`:=`) 등을 사용할 떄는 반드시 괄호로 둘러싸야 하고, 3) (파이썬 3.6 이하에서는) `async for`, `await` 등의 키워드는 사용할 수 없고, 4) (파이썬 3.11 이하에서는) 주석(`#`)을 사용할 수 없다.

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = 20

  print(f'{a} + {b} = {a + b}') # OK!
  print(f'min({a}, {b}) = {min(a, b)}') # OK!
  ```

  ```result
  10 + 20 = 30
  min(10, 20) = 10
  ```

  </v-codeblock>

- 단일 따옴표 f-string(single-quoted f-string)[^3-3]의 중괄호 안에서 줄바꿈이 포함된 표현식은 사용할 수 없다.
  
  [^3-3]: `"` 또는 `'`으로 시작하는 f-string

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = 20

  print(f'{a} + {b} = {
    a + b
  }')  # error!

  print(f'min({a}, {b}) = {min(
    a, b
  )}')  # error!
  ```

  </v-codeblock>

  줄바꿈이 포함된 표현식을 사용하고 싶으면 다음과 같이 삼중 따옴표 f-string(triple-quoted f-string)[^3-4]을 사용해야 한다.

  [^3-4]: `"""` 또는 `'''`으로 시작하는 f-string

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = 20

  print(f"""{a} + {b} = {
    a + b
  }""") # OK!
  ```

  ```result
  10 + 20 = 30
  ```

  </v-codeblock>

  ::: tip f-string의 줄바꿈 지원 (파이썬 3.12 이상)

  파이썬 3.12부터는 단일 따옴표 f-string에서도 줄바꿈이 포함된 표현식을 사용할 수 있게 되었다.
  
  심지어 주석도 사용할 수 있다! `#` 뒤에 오는 내용은 모두 주석으로 인식된다. 닫는 중괄호나 따옴표가 나와도 말이다. 따라서 중괄호 내에서 주석을 사용한 경우 반드시 다른 줄에서 중괄호를 닫아줘야 한다.

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = 20

  print(f'{a} + {b} = {  # 이렇게 주석을 넣을 수도 있음. }' <- 뒤에 이런 것들이 와도 모두 주석으로 처리됨
    a + b }')
  ```

  ```result
  10 + 20 = 30
  ```

  </v-codeblock>

  :::
  
- 문자열을 시작할 때 썼던 따옴표는 (중괄호 밖은 물론이고) 중괄호 안에서 사용할 수 없다.

  <v-codeblock>

  ```python:line-numbers
  first_name = "John"
  last_name = "Doe"
  
  print(f'Your name is {' '.join([first_name, last_name])}.') # error!
  ```

  </v-codeblock>

  중괄호 안에서 따옴표를 사용하고 싶으면, 문자열을 열 때 사용한 것과는 다른 종류의 따옴표를 사용해야 한다.

  <v-codeblock>

  ```python:line-numbers
  first_name = "John"
  last_name = "Doe"
  
  print(f'Your name is {" ".join([first_name, last_name])}.') # OK!
  ```

  ```result
  Your name is John Doe.
  ```

  </v-codeblock>

- f-string의 중괄호에 객체를 입력하면(혹은 표현식의 계산 결과가 객체라면), 해당 객체의 `str()` 함수를 호출한 결과(= 객체의 `__str__()` 메서드)가 출력된다.

  <v-codeblock>

  ```python:line-numbers
  class Person:
      def __str__(self):
          return 'Alice (from __str__() method)'

  person = Person()
  print(f'Hello {person}')
  ```

  ```result
  Hello Alice (from __str__() method)
  ```

  </v-codeblock>

  만약 객체의 `__str__()` 메서드가 정의되어 있지 않다면 `__repr__()` 메서드가 호출된다(fallback).

  <v-codeblock>

  ```python:line-numbers
  class Person:
      def __repr__(self):
          return 'Alice (from __repr__() method)'

  person = Person()
  print(f'Hello {person}')
  ```

  ```result
  Hello Alice (from __repr__() method)
  ```

  </v-codeblock>

- f-string 안에서 중괄호를 출력하고 싶으면 중괄호를 두 번 사용하면 된다.

  <v-codeblock>

  ```python:line-numbers
  print(f'left: {{, right: }}')
  ```

  ```result
  left: {, right: }
  ```

  </v-codeblock>

# f-string을 활용한 포멧팅

f-string의 중괄호를 이용해 표현식의 값을 출력할 때, 표현식 뒤에 다음 기호들을 추가하여 표현식이 출력되는 방식을 지정할 수 있다. (아래 명기한 순서대로 사용 가능)

1. `=` : self-documenting expressions (파이썬 3.8부터 추가)
2. CONVERSION 필드 : [`!s`, `!r`, `!a`] 표현식을 어떤 방식으로 문자열로 변환할지 지정하는 필드
3. `:` FORMAT_SPECIFIER 필드 : 서식 지정자 필드. 콜론(`:`) 뒤에 입력된다.
   1. FILL 필드 : [`(any character)`] ALIGN 시 빈 영역을 채우는데 사용 (ALIGN 서식 지정자가 명시되었을 때만 유효함)
   2. ALIGN 필드 : [`<`, `>`, `^`, `=`] 정렬 방향 관련 서식 지정자
   3. SIGN 필드: [`+`, `-`, ` `(공백 문자)] 부호 관련 서식 지정자
   4. `z`
   5. `#`
   6. `0`
   7. WIDTH 필드 : [`(number)`] 출력할 (최소) 길이를 지정하는 서식 지정자
   8. GROUPING_OPTION 필드 : [`_`, `,`] 세 자리마다 구분자를 추가하는 서식 지정자
   9. PRECISION 필드 : [`.(number)`] 소수점 이하 자릿수(정밀도)를 지정하는 서식 지정자
   10. TYPE 필드 : [`b`, `c`, `d`, `e`, `E`, `f`, `F`, `g`, `G`, `n`, `o`, `s`, `x`, `X`, `%`] 출력 형식을 지정하는 서식 지정자

## `=` (self-documenting expressions)

::: tip

파이썬 3.8부터 추가됨

:::

표현식을 `(표현식)=(값)` 형태로 출력한다.

여기서 `(값)`은 표현식에 대해 `repr()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력)이다.

또한 `(표현식)` 부분은 정말 정직하게 표현식을 입력한 그대로 출력한다. 표현식에서 함수를 호출했다면 호출한 그 모양 그대로, 심지어 띄어쓰기를 썼다면 띄어쓰기를 쓴 그대로 출력한다.

짐작한 대로 디버깅 용도로 쓰라고 만들어진 기능이다.

<v-codeblock>

```python:line-numbers
a = 10
b = 20

print(f'{a = }, {b = }, {a + b = }')
print(f'{min(a, b)=}, {a              +b = }')
```

```result
a = 10, b = 20, a + b = 30
min(a, b)=10, a              +b = 30
```

</v-codeblock>

## CONVERSION 필드

CONVERSION 필드는 표현식을 문자열로 변환하기 위해 어떤 방법을 쓸지를 지정한다.

다음 세 가지 옵션 중 하나를 사용할 수 있다.

- `!s` : `str()` 함수를 호출한 결과(= 객체의 `__str__()` 메소드의 출력)를 출력한다. (아무것도 명시하지 않았을 때와 동일)
- `!r` : `repr()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력)를 출력한다.
- `!a` : `ascii()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력에서 non-ASCII 문자를 이스케이프한 문자열)를 출력한다.

<v-codeblock>

```python:line-numbers
class Person:
    def __str__(self):
        return 'Alice (from __str__() method)'
    
    def __repr__(self):
        return 'Alice (from __repr__() method / 이 문장은 non-ASCII 문자를 포함하고 있습니다)'

person = Person()
print(f'Hello {person!s}')
print(f'Hello {person!r}')
print(f'Hello {person!a}')
```

```result
Hello Alice (from __str__() method)
Hello Alice (from __repr__() method / 이 문장은 non-ASCII 문자를 포함하고 있습니다)
Hello Alice (from __repr__() method / \uc774 \ubb38\uc7a5\uc740 non-ASCII \ubb38\uc790\ub97c \ud3ec\ud568\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4)
```

</v-codeblock>

## FORMAT_SPECIFIER 필드

FORMAT_SPECIFIER 필드는 출력 형식을 지정하는데 사용한다. 콜론(`:`) 뒤에 아래 서식 지정자들을 아래 순서에 맞춰 나열해 주면 된다.

1. FILL 필드 : [`(any single character)`] ALIGN 시 빈 영역을 채우는데 사용 (ALIGN 서식 지정자가 명시되었을 때만 유효함)
2. ALIGN 필드 : [`<`, `>`, `^`, `=`] 정렬 방향 관련 서식 지정자
3. SIGN 필드: [`+`, `-`, ` `(공백 문자)] 부호 관련 서식 지정자
4. `z`
5. `#`
6. `0`
7. WIDTH 필드 : [`(number)`] 출력할 (최소) 길이를 지정하는 서식 지정자
8. GROUPING_OPTION 필드 : [`_`, `,`] 구분자를 추가하는 서식 지정자
9. PRECISION 필드 : [`.(number)`] 정밀도를 지정하는 서식 지정자
10. TYPE 필드 : [`b`, `c`, `d`, `e`, `E`, `f`, `F`, `g`, `G`, `n`, `o`, `s`, `x`, `X`, `%`] 데이터가 출력되는 방식을 지정하는 서식 지정자

### FILL 필드

FILL 필드는 ALIGN 필드가 명시되었고, 출력할 문자열의 길이가 WIDTH 필드에서 명시한 값보다 작을 때, 빈 영역을 채우는데 사용한다.

ALIGN 필드가 명시되었을 때만 유효한 필드이다(ALIGN 필드가 명시되지 않은 경우 문법 오류가 발생).

아무 문자(single character)나 사용 가능하다. 만약 생략하면 공백 문자를 사용한 것으로 간주한다.

<v-codeblock>

```python:line-numbers
a = 1
b = 21
c = 321

print(f'{a:a>5}') # 오른쪽 정렬하여 5자리로 출력하고, 남는 공간은 "a"로 채움
print(f'{b:%<5}') # 왼쪽 정렬하여 5자리로 출력하고, 남는 공간은 "%"로 채움
print(f'{c:1^5}') # 가운데 정렬하여 5자리로 출력하고, 남는 공간은 "1"로 채움
```

```result
aaaa1
21%%%
13211
```

</v-codeblock>

### ALIGN 필드

ALIGN 필드는 출력할 문자열을 어떻게 정렬할지를 지정하는데 사용한다.

다만 f-string은 기본적으로 출력할 문자열의 길이를 계산해 딱 맞게 출력하기 때문에, WIDTH 필드가 출력할 문자열의 길이보다 큰 값으로 입력된 경우에만 ALIGN 필드가 유효하다. WIDTH 필드가 입력되지 않았거나 출력할 문자열의 길이보다 작은 값으로 입력된 경우, 문법 오류가 발생하진 않지만 ALIGN 필드가 무시된다.

WIDTH 필드가 출력할 문자열의 길이보다 큰 값으로 입력된 경우, 위 FILL 필드에 명시된 값을 사용해(만약 FILL 필드가 명시되지 않았다면 공백 문자를 사용해) 빈 영역을 채우면서(padding) 정렬을 수행한다.

ALIGN 필드에는 다음 네 가지 옵션 중 하나를 사용할 수 있다.

- `<` : 왼쪽 정렬
  
  <v-codeblock>

  ```python:line-numbers
  a = 1
  b = 20

  print(f'|{a:<5}|') # 왼쪽 정렬하여 5자리로 출력
  print(f'|{b:<5}|') # 왼쪽 정렬하여 5자리로 출력
  ```

  ```result
  |1    |
  |20   |
  ```

  </v-codeblock>

  문자열을 포함한 대부분의 객체는 ALIGN 필드에 아무런 서식 지정자를 입력하지 않으면 기본적으로 `<` 서식 지정자가 디폴트로 사용된다(= 왼쪽 정렬하여 출력된다).

- `>` : 오른쪽 정렬

  <v-codeblock>

  ```python:line-numbers
  a = 1
  b = 20

  print(f'|{a:>5}|') # 오른쪽 정렬하여 5자리로 출력
  print(f'|{b:>5}|') # 오른쪽 정렬하여 5자리로 출력
  ```

  ```result
  |    1|
  |   20|
  ```

  </v-codeblock>

  수 타입의 값(int, float, decimal, complex 등)은 ALIGN 필드에 아무런 서식 지정자를 입력하지 않으면 기본적으로 `>` 서식 지정자가 디폴트로 사용된다(= 오른쪽 정렬하여 출력된다).

- `^` : 가운데 정렬

  <v-codeblock>

  ```python:line-numbers
  a = 1
  b = 20

  print(f'|{a:^5}|') # 가운데 정렬하여 5자리로 출력
  print(f'|{b:^5}|') # 가운데 정렬하여 5자리로 출력
  ```

  ```result
  |  1  |
  | 20  |
  ```

  </v-codeblock>

  위 실행 결과에서 볼 수 있듯이, 가운데 정렬 상황에서 좌우 패딩을 같게 만들 수 없다면 오른쪽에 패딩이 하나 더 붙는다.

- `=`[^4-1] : 수 타입의 값을 출력할 때, 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬한다. 수 타입이 아닌 값에 대해 사용하면 문법 오류가 발생한다.

  [^4-1]: 위 문단의 self-documenting expressions 기호와 동일하지만, self-documenting expressions 기호로 사용되는 경우 `:` 앞에(변수 바로 뒤에) 위치하는 반면, SIGN 필드의 서식 지정자로 사용되는 경우 `:` 뒤에 위치한다는 차이가 있다.

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'|{a:=5}|') # 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬하여 5자리로 출력
  print(f'|{b:=5}|') # 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬하여 5자리로 출력
  ```

  ```result
  |   10|
  |-  20|
  ```

  </v-codeblock>

  참고로 양수에 대해 + 부호도 출력하고 싶다면 SIGN 필드에 `+` 서식 지정자를 사용하면 된다.

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'|{a:=+5}|') # 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬하여 5자리로 출력
  print(f'|{b:=+5}|') # 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬하여 5자리로 출력
  ```

  ```result
  |+  10|
  |-  20|
  ```

  </v-codeblock>

### SIGN 필드

SIGN 필드의 서식 지정자는 표현식의 값이 수 타입(int, float, decimal, complex 등)일 때만 유효하다(수 타입이 아닌 경우 오류 발생). 다음과 같은 서식 지정자를 사용할 수 있다.

- `+` : 양수에도 부호를 붙인다.

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'{a:+}')
  print(f'{b:+}')
  ```

  ```result
  +10
  -20
  ```

  </v-codeblock>

- `-` : 음수에만 부호를 붙인다. (아무 것도 명시하지 않았을 때와 동일)

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'{a:-}')
  print(f'{b:-}')
  ```

  ```result
  10
  -20
  ```

  </v-codeblock>

- ` ` (공백 문자) : 양수에는 공백을, 음수에는 부호를 붙인다. 즉 양수 부호를 표시하지는 않지만(`-` 서식 지정자와 동일), 양수와 음수의 자리수가 동일하다면 그 길이를 동일하게 만든다(`+` 서식 지정자와 동일).

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'{a: }')
  print(f'{b: }')
  ```

  ```result
   10
  -20
  ```

  </v-codeblock>

### `z`, `#`, `0`

- `z` : (파이썬 3.11에서 추가) `z` 서식 지정자를 입력하면, 표현식의 값이 (PRECISION 필드에 의해 반올림된 후) -0.0(negative zero floating-point value)이 된 경우 이를 +0.0(positive zero floating-point value)로 바꿔준다. 이 서식 지정자는 실수형 값이 입력되거나 TYPE 필드에 실수형 값 표현 서식 지정자(`f`, `F`, `g`, `G`, `e`, `E`, `n`, `%` 중 하나)가 명시되어 있을 때만 유효하다(아닐 경우 오류 발생).

  <v-codeblock>

  ```python:line-numbers
  a = -0.0

  print(f'{a:z}')
  ```

  ```result
  0.0
  ```

  </v-codeblock>

- `#` : "alternate form"으로 출력. 수 타입의 값이 입력된 경우에만 유효하다.

  - 정수 타입의 값에 대해 TYPE 필드에 `b`(2진수), `o`(8진수), `x`, `X`(16진수) 서식 지정자가 입력된 경우, 각각 다음과 같이 `0b`, `0o`, `0x`, `0X` 접두사를 붙여 출력한다.

    <v-codeblock>

    ```python:line-numbers
    number = 123456

    print(f'{number:#b}') # 2진수
    print(f'{number:#o}') # 8진수
    print(f'{number:#x}') # 16진수
    print(f'{number:#X}') # 16진수 (대문자)
    ```

    ```result
    0b11110001001000000
    0o361100
    0x1e240
    0X1E240
    ```

    </v-codeblock>

  - 실수 타입 또는 complex 타입의 값이 입력된 경우, (소수점 이하 자리수가 PRECISION 필드에 의해 없어져도) 항상 소수점을 붙여 출력한다.

    <v-codeblock>

    ```python:line-numbers
    float_number = 123.456
    complex_number = 123.456 + 789.123j
    

    print(f'{float_number:.0f}') # PRECISION 필드에 0을 주어 소수부를 없앰. 따라서 소수점도 표시되지 않음
    print(f'{float_number:#.0f}') # `#` 서식 지정자를 사용하여 소수부가 없음에도 소수점을 출력

    print(f'{complex_number:.0f}') # PRECISION 필드에 0을 주어 소수부를 없앰. 따라서 소수점도 표시되지 않음
    print(f'{complex_number:#.0f}') # `#` 서식 지정자를 사용하여 소수부가 없음에도 소수점을 출력
    ```

    ```result
    123
    123.
    123+789j
    123.+789.j
    ```

    </v-codeblock>

- `0` : `0` 서식 지정자는 FILL 필드에 `0`을, ALIGN 필드에 `=` 서식 지정자를 입력한 것과 동일한 효과를 낸다. 즉 수 타입을 출력할 때, FILL 필드가 입력되지 않고 WIDTH 필드에 입력된 수가 출력되는 문자열의 길이보다 크다면, 0을 사용해 (부호가 있다면 부호와 숫자 사이의) 왼쪽 빈 영역을 채운다(padding).

  <v-codeblock>

  ```python:line-numbers
  a = 10
  b = -20

  print(f'|{a:+05}|') # WIDTH 필드에 5를 주어 5자리로 출력, 부호 표시, 빈 영역은 0으로 채움
  print(f'|{b:+05}|') # WIDTH 필드에 5를 주어 5자리로 출력, 부호 표시, 빈 영역은 0으로 채움

  print(f'|{a:0=+5}|') # 동일한 효과
  print(f'|{b:0=+5}|') # 동일한 효과
  ```

  ```result
  |+0010|
  |-0020|
  |+0010|
  |-0020|
  ```

  </v-codeblock>

### WIDTH 필드

WIDTH 필드는 출력할 문자열의 (최소) 길이를 지정하는데 사용한다. 만약 출력할 문자열의 길이가 입력된 수보다 작다면, FILL 필드에 명시된 문자로 빈 영역을 채운다(padding). FILL 문자가 명시되지 않았다면 공백으로 채운다. 만약 입력된 수보다 크다면 입력된 수는 무시된다.

이때 출력할 문자열의 길이 계산에는 접두사(`#` 서식 지정자 사용 시), 구분자(`,`, `_` 서식 지정자 사용 시), 부호(SIGN 필드 사용 시) 등도 모두 포함된다.

<v-codeblock>

```python:line-numbers
name = 'Alice'
age = 20

print(f'|{name:10}|') # ALIGN 필드를 명시하지 않으면 기본적으로 왼쪽 정렬
print(f'|{age:10}|') # ALIGN 필드를 명시하지 않으면 기본적으로 오른쪽 정렬
```

```result
|Alice     |
|        20|
```

</v-codeblock>

(ALIGN 필드에서 설명한 것처럼) 문자열을 포함한 대부분의 객체는 기본적으로 왼쪽 정렬되고 수 타입은 기본적으로 오른쪽 정렬되기에 위와 같이 출력된다.

### GROUPING_OPTION 필드

GROUPING_OPTION 필드를 사용하면 수 타입을 출력할 때 구분자를 출력할 수 있다. 다음 두 가지 옵션 중 하나를 사용할 수 있다.

- `,` : 세 자리마다 쉼표(,)를 추가한다.

  <v-codeblock>

  ```python:line-numbers
  number = 1234567890

  print(f'{number:,}')
  ```

  ```result
  1,234,567,890
  ```

  </v-codeblock>

- `_` : 파이썬 3.6부터 추가된 서식 지정자로, 다음과 같이 동작한다.

  - 정수 타입의 값을 아무런 서식 지정자 없이(또는 명시적으로 `d` 서식 지정자를 사용하여) 출력하거나 실수 타입의 값을 출력할 떄, 세 자리마다 밑줄(_)을 추가한다.
  
    <v-codeblock>

    ```python:line-numbers
    int_number = 1234567890
    float_number = 1234567890.123456

    print(f'{number:_}')
    print(f'{number:_d}')
    print(f'{float_number:_}')
    ```

    ```result
    1_234_567_890
    1_234_567_890
    1_234_567_890.123456
    ```

    </v-codeblock>
  
  - 정수 타입의 값을 `b`, `o`, `x`, `X` 서식 지정자를 사용하여 출력할 때, 네 자리마다 밑줄(_)을 추가한다.

    <v-codeblock>

    ```python:line-numbers
    number = 1234567890

    print(f'{number:_b}')
    print(f'{number:_o}')
    print(f'{number:_x}')
    print(f'{number:_X}')
    ```

    ```result
    100_1001_1001_0110_0000_0010_1101_0010
    111_4540_1322
    4996_02d2
    4996_02D2
    ```

    </v-codeblock>

### PRECISION 필드

PRECISION 필드는 `.(number)` 형태로 사용한다.

- `f` 서식 지정자를 이용해 실수형 수를 출력할 때, 소수부를 `(number)` 자리까지만 출력한다. 정수부는 아무런 제한이 없다(정수부를 제한하고 싶으면 WIDTH 필드를 조합해야 한다).
  
  `(number)` 자리 아래의 숫자는 반올림된다.
  
  만약 명시하지 않았다면 기본값 6이 적용된다.

  <v-codeblock>

  ```python:line-numbers
  number = 0.123456789

  print(f'{number:f}') # PRECISION 필드에 아무것도 명시하지 않은 경우 기본값(소수점 이하 6자리) 적용하여 출력
  print(f'{number:.2f}') # 소수점 이하 2자리까지 출력
  print(f'{number:.0f}') # 소수점 이하 0자리까지 출력 (= 정수 부분만 출력)
  print(f'{number:.12f}') # 소수점 이하 12자리까지 출력
  ```

  ```result
  0.123457
  0.12
  0
  0.123456789000
  ```

  </v-codeblock>


