---
title: "f-string (formatted string literals)"
date_created: "2024-11-09"
date_modified: "2024-11-09"
tags: []
---

<style lang="scss">
@import "@/styles/mixins";
@import "@/styles/variables";

ul.border,
ol.border {
  border-radius: 0.5em;
  border: 1px solid var(--site-text);

  margin: {
    top: calc(0.5 * $gap_size) !important;
    bottom: $gap_size !important;
  }

  >li {
    margin: {
      left: 0.5em;
    }
  }
}
</style>

# f-string(formatted string literal)이란?

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

f-string에서는 중괄호 안 표현식 뒤에 특수한 명령어들을 덧붙여서 값이 출력되는 모양 혹은 방식을 지정해 줄 수 있다.

명령어는 크게 3개의 필드로 구분할 수 있다.

> 1. SELF-DOCUMENTING EXPRESSION 필드 : [`=`] 디버깅 용도로 사용되는 필드.
> 2. CONVERSION 필드 : [`s`, `r`, `a`] 표현식을 어떤 방식으로 문자열로 변환할지 지정하는 필드. 느낌표(`!`) 뒤에 입력된다.
> 3. FORMAT_SPECIFIER 필드 : 서식 지정자 필드. 콜론(`:`) 뒤에 입력된다.

각 필드는 필요에 따라 사용하거나 생략할 수 있다. 다만 위 순서대로 사용해야 한다.

## Self-documenting expressions 필드

::: tip

파이썬 3.8부터 추가됨

:::

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

표현식 뒤에 `=` 기호를 붙이면 표현식을 `(표현식)=(값)` 형태로 출력한다.

여기서 `(값)`은 표현식에 대해 `repr()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력)이다.

또한 `(표현식)` 부분은 정말 정직하게 표현식을 입력한 그대로 출력한다. 표현식에서 함수를 호출했다면 호출한 그 모양 그대로, 심지어 띄어쓰기를 썼다면 띄어쓰기를 쓴 그대로 출력한다.

이 기능을 쓰면 디버깅 시 표현식의 값을 쉽게 확인할 수 있다.

## CONVERSION 필드

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

CONVERSION 필드는 표현식을 문자열로 변환하기 위해 어떤 방법을 쓸지를 지정한다. 느낌표(`!`) 뒤에 다음 세 가지 옵션 중 하나를 붙여 사용한다.

- `s` : `str()` 함수를 호출한 결과(= 객체의 `__str__()` 메소드의 출력)를 출력한다. (아무것도 명시하지 않았을 때와 동일)
- `r` : `repr()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력)를 출력한다.
- `a` : `ascii()` 함수를 호출한 결과(= 객체의 `__repr__()` 메소드의 출력에서 non-ASCII 문자를 이스케이프한 문자열)를 출력한다.

## FORMAT_SPECIFIER 필드

FORMAT_SPECIFIER 필드는 출력 형식을 지정하는데 사용한다. 콜론(`:`) 뒤에 아래 서식 지정자들을 아래 순서에 맞춰 나열해 주면 된다.

> 1. FILL 필드 : [`(any single character)`] ALIGN 시 빈 영역을 채우는데 사용 (ALIGN 서식 지정자가 명시되었을 때만 유효함)
> 2. ALIGN 필드 : [`<`, `>`, `^`, `=`] 정렬 방향 관련 서식 지정자
> 3. SIGN 필드: [`+`, `-`, ` `(공백 문자)] 부호 관련 서식 지정자
> 4. `z`
> 5. `#`
> 6. `0`
> 7. WIDTH 필드 : [`(number)`] 출력할 (최소) 길이를 지정하는 서식 지정자
> 8. GROUPING_OPTION 필드 : [`_`, `,`] 구분자를 추가하는 서식 지정자
> 9. PRECISION 필드 : [`.(number)`] 정밀도를 지정하는 서식 지정자
> 10. TYPE 필드 : [`b`, `c`, `d`, `e`, `E`, `f`, `F`, `g`, `G`, `n`, `o`, `s`, `x`, `X`, `%`] 데이터가 출력되는 방식을 지정하는 서식 지정자

각 서식 지정자들에 대한 자세한 설명은 [공식 문서](https://docs.python.org/3/library/string.html#format-specification-mini-language)를 참조하자. 다음은 자주 사용하는 서식 지정자들을 cheat sheet 형태로 정리한 것이다.

### [SIGN 필드] 부호 표시하기

<v-codeblock>

```python:line-numbers
a = 10
b = -20

# 출력되는 모양을 보기 쉽게 하기 위해 `|`로 감싸서 출력
print(f'|{a:+}|') # 양수일 때도 부호를 표시
print(f'|{b:+}|')

print(f'|{a:-}|') # 양수일 때는 부호를 표시하지 않음
print(f'|{b:-}|')

print(f'|{a: }|') # 양수일 때는 공백을 표시(음수일 떄와 길이를 맞춤)
print(f'|{b: }|')
```

```result
|+10|
|-20|
|10|
|-20|
| 10|
|-20|
```

</v-codeblock>

숫자에 부호를 붙여 출력하려면 SIGN 필드를 사용한다. SIGN 필드에 사용할 수 있는 값은 다음과 같다.

- `+` : 양수일 때도 + 부호를 표시한다.
- `-` : 양수일 때는 부호를 표시하지 않는다. (기본값)
- ` `(공백 문자) : 양수일 때는 공백을 표시, 음수일 떄는 부호를 표시한다. (음수일 떄와 길이를 맞춤)

참고로 수 타입이 아닌 값에 대해 사용하면 문법 오류가 발생한다.

### [WIDTH, FILL, ALIGN 필드] 왼쪽 정렬, 오른쪽 정렬, 가운데 정렬하기

<v-codeblock>

```python:line-numbers
a = 10
b = "Hello"

# 출력되는 모양을 보기 쉽게 하기 위해 `|`로 감싸서 출력
print(f'|{a:<10}|')  # 왼쪽 정렬 (10자리, 남는 공간은 공백으로 채움)
print(f'|{a:>10}|')  # 오른쪽 정렬 (10자리, 남는 공간은 공백으로 채움)
print(f'|{a:^10}|')  # 가운데 정렬 (10자리, 남는 공간은 공백으로 채움)

print(f'|{b:<10}|')  # 왼쪽 정렬 (10자리, 남는 공간은 공백으로 채움)
print(f'|{b:>10}|')  # 오른쪽 정렬 (10자리, 남는 공간은 공백으로 채움)
print(f'|{b:^10}|')  # 가운데 정렬 (10자리, 남는 공간은 공백으로 채움)

print(f'|{a:%<10}|')  # 왼쪽 정렬 (10자리, 남는 공간은 '%'로 채움)
print(f'|{a:0>10}|')  # 오른쪽 정렬 (10자리, 남는 공간은 '0'으로 채움)
print(f'|{a:x^10}|')  # 가운데 정렬 (10자리, 남는 공간은 'x'로 채움)
```

```result
|10        |
|        10|
|    10    |
|Hello     |
|     Hello|
|  Hello   |
|10%%%%%%%%|
|0000000010|
|xxxx10xxxx|
```

</v-codeblock>

WIDTH 필드, FILL 필드, ALIGN 필드를 이용하면 출력 결과를 왼쪽 정렬, 오른쪽 정렬, 가운데 정렬할 수 있다.

f-string은 기본적으로 표현식을 (`str()`, `repr()`, `ascii()` 등의 함수를 사용해) 문자열로 바꾼 후, 이 문자열의 길이를 계산해 딱 맞게 출력해 준다. 하지만 WIDTH 필드의 값을 명시하면 이 길이를 조절할 수 있다. WIDTH 필드는 출력값의 최소 길이를 지정한다. WIDTH 필드의 값이 출력값의 길이보다 작으면 WIDTH 필드는 무시되지만, 만약 WIDTH 필드의 값이 출력값의 길이보다 크면 남는 공간에 FILL 필드에 입력된 문자를 채워 넣어 길이를 맞춰준다. FILL 필드는 문자 한 글자를 입력받을 수 있는 필드로서, 한 글자이기만 하면 아무 문자나 사용 가능하다. 만약 FILL 필드가 입력되지 않으면 디폴트로 공백 문자를 사용한다(= 공백 문자로 남는 공간을 채운다).[^4-1]

[^4-1]: WIDTH 필드가 명시되지 않은 경우 FILL 필드에 값을 채우면 문법 오류가 발생한다.

WIDTH 필드에 입력된 값이 출력값의 길이보다 큰 경우, ALIGN 필드를 이용해 출력값을 정렬할 수 있다. ALIGN 필드에 사용할 수 있는 값은 다음과 같다.

- `<` : 왼쪽 정렬

  참고로 문자열을 포함한 대부분의 객체는 ALIGN 필드에 아무런 서식 지정자를 입력하지 않으면 기본적으로 `<` 서식 지정자가 디폴트로 사용된다(= 왼쪽 정렬하여 출력된다).

- `>` : 오른쪽 정렬

  참고로 수 타입의 값(int, float, decimal, complex 등)은 ALIGN 필드에 아무런 서식 지정자를 입력하지 않으면 기본적으로 `>` 서식 지정자가 디폴트로 사용된다(= 오른쪽 정렬하여 출력된다).

- `^` : 가운데 정렬
  
  참고로 가운데 정렬 상황에서 좌우 패딩을 같게 만들 수 없다면 오른쪽에 패딩이 하나 더 붙는다.

- `=`[^4-2] : 수 타입의 값을 출력할 때, 부호를 왼쪽 정렬하고 숫자를 오른쪽 정렬한다.
  
  [^4-2]: self-documenting expressions 문자열와 동일하지만, self-documenting expressions 문자열로 사용되는 경우 `:` 앞에(변수 바로 뒤에) 위치하는 반면, SIGN 필드의 서식 지정자로 사용되는 경우 `:` 뒤에 위치한다는 차이가 있다.
  
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

  수 타입이 아닌 값에 대해 사용하면 문법 오류가 발생한다.

### [GROUPING_OPTION 필드] 1000 단위 구분자 넣기

<v-codeblock>

```python:line-numbers
number = 1234567890

print(f'{number:,}')
```

```result
1,234,567,890
```

</v-codeblock>

GROUPING_OPTION 필드에 `,`를 입력하면 숫자에 1000 단위 구분자(콤마)를 넣어 출력한다.

### [PRECISION, TYPE 필드] 소수점 이하 자릿수 지정하기

<v-codeblock>

```python:line-numbers
a = 3.141592
b = 1

print(f'{a:.2f}')
print(f'{b:.2f}')'
```

```result
3.14
1.00
```

</v-codeblock>

수 타입의 값을 출력할 때 소수점 이하 자릿수를 정확히 지정하려면 PRECISION 필드와 TYPE 필드를 사용한다.

PRECISION 필드는 `.(number)` 형태로 입력할 수 있는 필드로서[^4-3], TYPE 필드에 `f`(혹은 `F`)가 입력된 경우 소수점 이하 `(number)` 자리수의 수를 출력하도록 만든다. 만약 `(number)`가 출력값의 소수점 이하 자리수보다 큰 경우, 소수점 이하 자리수가 부족한 만큼 0으로 채워진다. 반면 `(number)`가 출력값의 소수점 이하 자리수보다 작은 경우, 그 이하 자리수는 잘린다(반올림). 만약 `(number)`가 0이면 소수점 이하 자리수를 출력하지 않는다(소수점도 출력되지 않는다).

[^4-3]: `(number)`는 0 이상의 정수여야 한다. 음수를 입력하면 문법 오류가 발생한다.

참고로 PRECISION 필드에 아무 값도 입력하지 않은 상태로 TYPE 필드에 `f`를 입력하면 소수점 이하 6자리까지 출력된다(기본값).

### [TYPE 필드] 진법 변환하기

<v-codeblock>

```python:line-numbers
number = 255

print(f'{number:b}')  # 2진수로 변환
print(f'{number:o}')  # 8진수로 변환
print(f'{number:x}')  # 16진수로 변환
print(f'{number:X}')  # 16진수로 변환 (대문자)
```

```result
11111111
377
ff
FF
```

</v-codeblock>

수 타입의 값을 출력할 때 진법을 변환하려면 TYPE 필드에 다음 중 하나를 입력한다.

- `b` : 2진수로 변환
- `o` : 8진수로 변환
- `x` : 16진수로 변환
- `X` : 16진수로 변환 (대문자)

### [TYPE 필드] 퍼센트로 표시하기

<v-codeblock>

```python:line-numbers
number = 0.123456

print(f'{number:%}')
```

```result
12.345600%
```

</v-codeblock>

수 타입의 값을 출력할 때 퍼센트로 표시하려면 TYPE 필드에 `%`를 입력한다. `%`를 입력하면 출력값을 100배한 값에 `%`를 붙여 출력한다. PRESICION 필드를 이용해 소수점 이하 자릿수를 지정할 수 있다.
