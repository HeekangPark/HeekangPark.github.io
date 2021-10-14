---
title: "apt"
date_created: "2021-07-17"
date_modified: "2021-10-14"
tags: ["command"]
---

# Quick Start

{:.code-header}
패키지 정보 업데이트

{:.show-admin-prompt}
{% highlight bash %}
apt update
{% endhighlight %}

{:.code-header}
설치된 모든 패키지 업그레이드

{:.show-admin-prompt}
{% highlight bash %}
apt -y full-upgrade
{% endhighlight %}

{:.code-header}
gcc, vim 설치

{:.show-admin-prompt}
{% highlight bash %}
apt -y install gcc vim
{% endhighlight %}

{:.code-header}
gcc 완전삭제

{:.show-admin-prompt}
{% highlight bash %}
apt -y purge gcc
{% endhighlight %}

# 이름

apt

# 위치

- `/usr/bin/apt`

# 설명

`apt`는 시스템에 설치된 패키지들을 관리할 수 있는 고수준(high-level) 명령어이다.

## 패키지 정보 업데이트 : apt update

{:.show-admin-prompt}
{% highlight bash %}
apt update
{% endhighlight %}

시스템에 설치된 패키지 정보들을 업데이트한다.

`apt upgrade`, `apt install`, `apt search` 등 다른 `apt` 명령어들은 모두 `apt update` 명령어가 업데이트한 패키지 정보들을 바탕으로 작동한다.

## 패키지 업그레이드 : apt upgrade, apt full-upgrade

{:.show-admin-prompt}
{% highlight bash %}
apt upgrade
{% endhighlight %}

`sources.list` 파일에 작성된 설정에 따라 시스템에 설치된 **모든** 업그레이드 가능한 패키지를 업그레이드한다.

`apt upgrade`는 업그레이드 과정 중 필요한 패키지가 있으면 자동으로 설치하지만, 필요없어진 패키지를 자동으로 삭제하진 않는다. 만약 어떤 패키지를 업그레이드할 때 설치된 패키지를 삭제해야 한다면 `apt upgrade`는 그 패키지를 업그레이드하지 않는다.

{:.show-admin-prompt}
{% highlight bash %}
apt full-upgrade
{% endhighlight %}

만약 업그레이드 시 필요없어진 패키지를 자동으로 삭제하고 싶으면 `apt full-upgrade`를 사용하면 된다.

{:.show-admin-prompt}
{% highlight bash %}
apt -y upgrade
apt -y full-upgrade
{% endhighlight %}

`apt upgrade` 또는 `apt full-upgrade` 시 업그레이드를 할 지 확인하는 프롬프트가 뜨는데, 위와 같이 `-y` 옵션을 주면 프롬프트가 뜨지 않고 바로 업그레이드가 진행된다.

## 패키지 설치 : apt install

{:.show-admin-prompt}
{% highlight bash %}
apt install [PACKAGE_NAME]...
{% endhighlight %}

`[PACKAGE_NAME]` 패키지를 설치한다. 만약 여러 패키지들을 명시하면 이들을 모두 설치할 수 있다. `[PACKAGE_NAME]`에는 패키지의 정확한 이름을 쓸 수도 있고, 정규표현식을 사용할 수도 있다.[^1]

[^1]: 시스템이 가지고 있는 패키지 정보들을 바탕으로(`apt update`), 정규표현식에 맞는 패키지들이 모두 설치된다.

만약 패키지의 특정 버전을 설치하고 싶으면 `PACKAGE_NAME=VERSION`과 같이 등호(`=`) 뒤에 버전을 명시하면 된다.

## 패키지 제거 : apt remove, apt purge

{:.show-admin-prompt}
{% highlight bash %}
apt remove [PACKAGE_NAME]...
{% endhighlight %}

`apt remove`는 `[PACKAGE_NAME]` 패키지를 제거한다. `apt remove`를 수행하면 약간의 사용자 설정 파일을 제외한 전체 패키지 파일이 제거된다. 사용자 설정 파일을 남기는 이유는 실수로 패키지를 제거한 경우를 위함이다. 설정 파일이 남아 있으므로, 실수로 삭제한 패키지를 `apt install`을 이용해 다시 설치하면 제거하기 전으로 돌릴 수 있다.

{:.show-admin-prompt}
{% highlight bash %}
apt purge [PACKAGE_NAME]...
{% endhighlight %}

`apt purge`는 `apt remove`와 유사하게 `[PACKAGE_NAME]` 패키지를 제거하지만, 이번에는 사용자 설정 파일을 포함한 패키지의 모든 파일을 제거한다.[^2] 참고로 `apt remove`로 이미 패키지를 삭제했더라도, `apt purge`를 이용해 `apt remove`가 제거하지 않은 사용자 설정 파일까지 모두 삭제할 수 있다.

[^2]: 단, 사용자의 홈 디렉토리에 저장된 데이터 파일 및 설정 파일은 삭제하지 않는다.

## 사용하지 않는 의존성 패키지 제거 : apt autoremove

{:.show-admin-prompt}
{% highlight bash %}
apt autoremove
{% endhighlight %}

패키지들을 설치할 때 의존성(dependency)으로 인해 설치되었지만, 업데이트 등으로 의존성이 변해 더이상 사용하지 않게 된 패키지들을 모두 삭제한다. 

## 패키지 검색 : apt search

{% highlight bash %}
apt search [REGEX]
{% endhighlight %}

시스템이 가지고 있는 패키지 정보들을 바탕으로(`apt update`), 주어진 정규표현식 `[REGEX]`에 맞는 패키지들을 검색해 보여준다.

## 패키지 정보 보기 : apt show

{% highlight bash %}
apt show [PACKAGE_NAME]...
{% endhighlight %}

패키지 정보를 보여준다.



