---
title: "변수값 출력하기"
tags: ["c", "javascript", "python"]
date: "2020-12-30"
---

프로그래밍을 하다 보면 로그 등을 표시하기 위해 문자열 안에 변수값을 포함시켜 출력해야 하는 경우가 생긴다. 각 언어별로 어떻게 하는지를 정리해 보았다.

# C

## printf() 함수와 형식 문자(format string)를 이용하는 방법

C언어에서는 다음과 같이 `printf()` 함수와 형식 문자(format string)을 이용해 문자열 안에 변수값을 포함시켜 출력할 수 있다.

{% highlight C %}
#include <stdio.h>

int main() {
    int a = 5;
    int b = 3;

    printf("a = %d, b = %d\n", a, b);

    return 0;
}
{% endhighlight %}

{: .code-result }
{% highlight text %}
a = 5, b = 3
{% endhighlight %}

`printf()` 함수는 (첫 번째 인자로 전달받은) 문자열 안의 형식 문자들을 인자로 전달받은 변수로 앞에서부터 하나씩 대치하여 출력한다.

이 방법은 다음과 같은 특징이 있다.

- `printf()` 함수는 문자열 끝에 개행 문자(`\n`)를 자동으로 붙여 주지 않는다. 만약 개행되길 원한다면 위 코드와 같이 수동으로 붙여주어야 한다.
- 인자의 개수를 잘못 맞추거나 인자의 위치를 잘못 설정하거나, 잘못된 형식 문자를 사용한다면 원하는 대로 출력되지 않는다.
- 인자들을 죽 나열하는 방식이다 보니 코드가 (옆으로) 길어진다.
- 비직관적이다. 출력 문자열(`printf()` 함수의 첫 번째 인자)만 봐서는 어떤 변수가 어느 위치에 나오는지 한눈에 보기 힘들다.

# C++

## std::cout 객체를 이용하는 방법

C++에서는 `std::cout` 객체를 이용하면 문자열 안에 변수를 넣어 출력할 수 있다.

{% highlight cpp %}
#include <iostream>

using namespace std;

int main() {
    int a = 5;
    int b = 3;

    cout << "a = " << a << ", b = " << b << endl;

    return 0;
}
{% endhighlight %}

{: .code-result }
{% highlight text %}
a = 5, b = 3
{% endhighlight %}

`std::cout` 객체는 `<<` 연산자로 전달된 변수, 상수 등을 출력해준다.

이 방법은 다음과 같은 특징이 있다.

- 형식 문자를 사용하지 않는다. 변수만 전달하면 자동으로 해당 변수의 타입을 인식해 출력해준다.
- (C언어의 `printf()`를 쓰는 것 보다는) 직관적이다. `"a = " << a << ", b = " << b << endl`를 보면 대충 어떤 값이 어떤 순서로 출력될지가 눈에 잘 보인다.
- `<<` 연산자, 따옴표(`"`) 등을 계속 사용해야 해 코드가 옆으로 길어지고 가독성이 떨어진다.
- 소숫점 자릿수, 왼쪽/오른쪽 정렬과 같은 포멧팅이 번거롭다. 예를 들어 C언어의 `printf()` 함수에서는 실수 값을 출력할 떄 형식 문자 `%.2f`를 사용하면 손쉽게 소숫점 둘째 자리까지만 출력하게 할 수 있다. `std::cout`를 사용해 소숫점 둘째 자리까지만 출력하게 하고 싶으면 추가적인 처리가 필요하다(아래 코드 참조). 형식 문자를 쓰지 않는 대신 생기는 일종의 패널티인 셈인데, 만약 한 문장에서 어떤 실수형 변수는 소숫점 둘째 자리까지, 또 다른 실수형 변수는 소숫점 넷째 자리까지 출력하는 등 출력 포멧이 달라진다면 `std::cout`으로 이를 출력하기는 아주 번거롭다(문장을 한 번에 출력할 수 없고, 출력 포멧이 달라질 때마다 `std::cout` 객체를 다시 설정한 다음 사용해야 한다). 하지만 로그 메시지를 출력하는 등 일반적인 경우 동일한 설정값을 계속 사용할 수 있으므로 이 패널티는 크게 체감되지 않는다.

{% highlight cpp %}
#include <iostream>

using namespace std;

int main() {
    double pi = 3.14159265;

    // 아무런 설정을 하지 않고 출력
    cout << "pi = " << pi << endl;

    // 소숫점 둘째 자리까지만 출력되게 설정하고 출력
    cout << fixed;
    cout.precision(2);
    cout << "pi = " << pi << endl;

    return 0;
}
{% endhighlight %}

{: .code-result }
{% highlight text %}
pi = 3.14159
pi = 3.14
{% endhighlight %}

# java

# javascript

# python