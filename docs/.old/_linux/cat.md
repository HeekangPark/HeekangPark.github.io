---
title: "cat"
date_created: "2021-07-18"
date_modified: "2021-10-14"
tags: ["command"]
---

# Quick Start

{:.code-header}
/etc/passwd 파일 출력하기

{% highlight bash %}
cat /etc/passwd
{% endhighlight %}

{:.code-header}
text1.txt, text2.txt 합쳐서 text3.txt 파일에 쓰기

{% highlight bash %}
cat text1.txt text2.txt > text3.txt
{% endhighlight %}

{:.code-header}
표준 입력에서 입력을 받아 text.txt 파일에 쓰기 (ctrl + d 키를 눌러 입력 종료)

{% highlight bash %}
cat > text.txt
{% endhighlight %}

# 이름

cat - concatenate files and print on the standard output

# 위치

- `/usr/bin/cat`

# 명령어 형식

{% highlight bash %}
cat [OPTION]... [FILE]...
{% endhighlight %}

# 설명

다음과 같은 텍스트가 있다고 해 보자.

{:.code-header}
text1.txt

{% highlight text linenos %}
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.



Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
{% endhighlight %}

{:.code-header}
text2.txt

{% highlight text linenos %}
Vivamus a malesuada sem, eget dapibus nisl.


Duis tristique euismod odio in interdum.
Aliquam tincidunt semper justo, id ornare tortor cursus luctus.
In mattis nisl ex.

Phasellus viverra odio sit amet quam cursus consequat.
Vestibulum ut turpis ac elit tempor scelerisque.

Phasellus sed mollis eros.

Curabitur diam libero, tempor et magna sit amet, pretium fermentum tortor.
{% endhighlight %}

`cat`은 입력된 `[FILE]`들을 합쳐 표준 출력(standard output)으로 출력하는 명령어이다.

{% highlight bash %}
cat text1.txt text2.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.



Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
Vivamus a malesuada sem, eget dapibus nisl.


Duis tristique euismod odio in interdum.
Aliquam tincidunt semper justo, id ornare tortor cursus luctus.
In mattis nisl ex.

Phasellus viverra odio sit amet quam cursus consequat.
Vestibulum ut turpis ac elit tempor scelerisque.

Phasellus sed mollis eros.

Curabitur diam libero, tempor et magna sit amet, pretium fermentum tortor.
{% endhighlight %}

만약 `[FILE]`이 하나만 입력되면 (합칠 것이 없으므로) 표준 출력으로 출력만 한다. 파일 내용을 빠르게 확인하기 위해 이런 식으로 많이 사용한다. 파이프라이닝을 이용하면 표준 입력을 받아들이는 명령어에 파일 내용을 입력할 수 있다.

{% highlight bash %}
cat text1.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.



Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
{% endhighlight %}

만약 `[FILE]`이 입력되지 않거나 `-`가 입력되면 표준 입력(standard input)을 받아들여 표준 출력으로 출력한다. 이를 이용해 다음과 같이 하면 파일을 작성할 수 있다.[^1]

[^1]: `Ctrl + d` 키를 눌러 저장하고 입력을 종료, `Ctrl + c` 키를 눌러 저장 안하고 입력을 종료할 수 있다.

{% highlight bash %}
cat > text.txt # text.txt 없으면 새로 생성. 있으면 덮어쓰기.
cat >> text.txt # text.txt 없으면 새로 생성. 있으면 뒤에 추가하기(append).
{% endhighlight %}

참고로 이 속성 때문에 다음 두 명령어는 완벽히 같은 역할을 한다.

{% highlight bash %}
cat text1.txt # text1.txt 출력
cat < text1.txt # (표준 입력으로 text1.txt를 받아) text1.txt 출력
{% endhighlight %}

# 옵션

## -A, --show-all

`-vET` 옵션과 동일.

## -b, --number-nonblank

{% highlight bash %}
cat -b text1.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
     1	Lorem ipsum dolor sit amet,
     2	consectetur adipisicing elit,
     3	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

     4	Ut enim ad minim veniam,
     5	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


     6	Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.



     7	Excepteur sint occaecat cupidatat non proident,
     8	sunt in culpa qui officia deserunt mollit anim id est laborum.
{% endhighlight %}

공백이 아닌 각 줄의 앞에 번호를 붙여 출력한다.

## -e

`-vE` 옵션과 동일.

## -E, --show-ends

{% highlight bash %}
cat -E text1.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
Lorem ipsum dolor sit amet,$
consectetur adipisicing elit,$
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.$
$
Ut enim ad minim veniam,$
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.$
$
$
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.$
$
$
$
Excepteur sint occaecat cupidatat non proident,$
sunt in culpa qui officia deserunt mollit anim id est laborum.$
{% endhighlight %}

각 줄의 끝에 `$` 기호를 출력한다.

## -n ,--number

{% highlight bash %}
cat -E text1.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
     1  Lorem ipsum dolor sit amet,
     2  consectetur adipisicing elit,
     3  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
     4
     5  Ut enim ad minim veniam,
     6  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     7
     8
     9  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    10
    11
    12
    13  Excepteur sint occaecat cupidatat non proident,
    14  sunt in culpa qui officia deserunt mollit anim id est laborum.
{% endhighlight %}

각 줄의 앞에 줄 번호를 붙여 출력한다.

## -s, --squeeze-blank

{% highlight bash %}
cat -s text1.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
{% endhighlight %}

빈 줄이 여러 개 있으면 붙여서 한 줄로 출력한다.

## -t

`-vT`와 동일.

## -T

탭을 `^I`로 표시.

## -v, --show-nonprinting

LF(LFD, Line Feed)와 탭(TAB)을 제외한 나머지 제어 문자를 ^-notation 또는 M-notation을 이용해 출력.

Windows에서 작성된 파일의 경우 줄바꿈 문자가 "CR LF"로 되어 있는데, `-v` 옵션을 줘 출력하면 CR(`^M`)을 볼 수 있다.

{:.code-header}
text3.txt (Windows에서 작성됨)

{% highlight text linenos %}
Hello
World!
{% endhighlight %}

{% highlight bash %}
cat -v text3.txt
{% endhighlight %}

{:.code-result}
{% highlight text linenos %}
Hello^M
World!^M
{% endhighlight %}

## --help

도움말 보기

## --version

버전 보기
