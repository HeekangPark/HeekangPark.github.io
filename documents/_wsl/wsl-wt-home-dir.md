---
title: "Windows Terminal에서 WSL2 터미널을 열 때 홈 디렉토리가 윈도우 홈 디렉토리로 표시되는 문제 해결"
date_created: "2021-07-25"
date_modified: "2022-01-10"
tags: ["windows_terminal", "wt"]
---

# 문제상황

WSL2를 설치하고 Windows Terminal에서 WSL2 터미널을 열면 기본값으로 윈도우 홈 디렉토리[^1]에서 쉘이 시작되게 된다.

[^1]: `%USERPROFILE%`. 시스템이 C드라이브에 설치되어 있다고 하면, WSL2에서 `/mnt/c/Users/[USERNAME]`으로 표시된다.

# 해결법 [2022.01.10. 수정]

Windows Terminal 설정에 보면 다음과 같이 WSL 쉘의 시작 디렉토리를 설정하는 항목이 있다.

{% include caption-img.html src="wsl-wt-home-dir-wt-settings.png" title="Windows Terminal 설정" description="Windows Terminal 설정에 보면 다음과 같이 WSL 쉘의 시작 디렉토리를 설정하는 항목이 있다." %}

이 항목에 리눅스에서의 홈 디렉토리 경로를 입력하면 된다.

{% highlight text %}
/home/[USERNAME]
{% endhighlight %}

예를 들어, 리눅스에서 사용자 `test`의 홈 디렉토리 경로는 (일반적으로) `/home/test`이므로, WSL 시작 디렉토리 항목에 다음과 같이 입력하면 된다.

{% highlight text %}
/home/test
{% endhighlight %}

<div class="outdated" markdown="block">

# 해결법 [Outdated]

Windows Terminal 설정에 보면 다음과 같이 WSL 쉘의 시작 디렉토리를 설정하는 항목이 있다.

{% include caption-img.html src="wsl-wt-home-dir-wt-settings.png" title="Windows Terminal 설정" description="Windows Terminal 설정에 보면 다음과 같이 WSL 쉘의 시작 디렉토리를 설정하는 항목이 있다." %}

이 항목의 값을

{% highlight text %}
//wsl$/[DISTRO]/home/[USERNAME]
{% endhighlight %}

과 같이 입력한다. 예를 들어 `Ubuntu` 배포판을 사용 중이고, 사용자 이름이 `test`인 경우

{% highlight text %}
//wsl$/ubuntu/home/test
{% endhighlight %}

와 같이 하면 된다.

</div>