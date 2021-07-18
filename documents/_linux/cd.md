---
title: "cd"
date_created: "2021-07-18"
date_modified: "2021-07-18"
tags: ["command"]
---

# Quick Start

{:.code-header}
/etc 디렉토리로 이동

{% highlight bash %}
cd /etc
{% endhighlight %}

{:.code-header}
이전 디렉토리로 이동

{% highlight bash %}
cd -
{% endhighlight %}


# 이름

cd - change directory

# 위치

`cd`는 쉘 빌트인 명령어(shell builtin command)이다.

# 명령어 형식

{% highlight bash %}
cd [-P] [DIR]
{% endhighlight %}

# 설명

`cd`는 쉘의 현재 작업 디렉토리(working directory)를 `[DIR]`로 바꾸는 명령어이다.

# 옵션

## -P

`[DIR]`이 Symbolic Link인 경우 원본 디렉토리로 이동한다.

예를 들어 `/bin` 디렉토리는 `/usr/bin`에 대한 Symbolic Link인데, `cd /bin`을 하면 `/bin` 디렉토리로 이동하지만, `cd -P /bin`을 하면 `/usr/bin` 디렉토리로 이동하게 된다. 어차피 `/bin` 디렉토리나 `/usr/bin` 디렉토리는 같은 곳이기 때문에, 어느 쪽 명령어를 사용해도 결과적으론 같다. 다만 `PWD` 환경변수가 달라지게 된다.