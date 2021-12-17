---
title: "nvm"
date_created: "2021-12-16"
date_modified: "2021-12-18"
---

nvm은 Node.js 버전 관리 스크립트로, nvm을 이용하면 (POSIX-compliant) bash 쉘에서 명령어 한 줄로 다양한 버전의 Node.js와 npm을 설치 및 관리할 수 있어 편리하다. 쉽게 말해, Node.js 버전 conda라 생각하면 된다.

# nvm 설치하기

2021년 12월 현재 nvm의 가장 최신 버전은 v0.39.0이다. `curl` 혹은 `wget`을 이용해 nvm을 설치할 수 있다(두 명령어는 완벽히 동일한 역할을 하는 명령어이니 어느 것을 사용해도 상관없다).

{:.code-header}
nvm 설치하기(curl 사용)

{% highlight bash %}
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
{% endhighlight %}

{:.code-header}
nvm 설치하기(wget 사용)

{% highlight bash %}
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
{% endhighlight %}

설치 스크립트가 다 실행되고 나면 `source ~/.bashrc`를 실행하거나 터미널을 한번 종료했다 다시 열어 설치를 완료한다.

# nvm 삭제하기

nvm을 삭제하고 싶다면 `$NVM_DIR` 디렉토리를 삭제하고[^1] `~/.bashrc` 파일에서 nvm 관련 코드를 모두 제거하기만 하면 된다.

[^1]: 일반적으로 `~/.nvm` 디렉토리이다.

# nvm 사용법

## ls-remote : 설치 가능한 모든 Node.js 버전 보기

`nvm ls-remote` 명령어로 설치 가능한 모든 Node.js 버전을 볼 수 있다.

{:.code-header}
설치 가능한 모든 Node.js 버전 보기

{% highlight bash %}
nvm ls-remote | less
{% endhighlight %}

nvm으로 설치 가능한 Node.js 버전은 매우 많으니[^21] 위처럼 `less` 명령어와 함께 쓰는 것을 추천한다.

[^21]: 2021년 12월 현재 v0.1.14부터 v17.2.0까지 총 653개

## install : Node.js 특정 버전 설치하기

`nvm install` 명령어로 Node.js와 npm 특정 버전을 설치할 수 있다.

{:.code-header}
Node.js, npm 특정 버전 설치하기

{% highlight bash %}
nvm install node             # 가장 최신 버전의 Node.js 및 npm 설치
nvm install --lts            # 가장 최신 LTS 버전의 Node.js 및 npm 설치
nvm install <node_version>   # <node_version> 버전의 Node.js 설치  ex) nvm install 10.10.0
{% endhighlight %}

- `<node_version>` : Node.js 버전. ex) `10.10.0`, `6.14.4`, `8.9.1` 등

2021년 12월 현재 `nvm install node` 명령어로는 Node.js v17.2.0, npm v8.1.4가 설치되고, `nvm install --lts` 명령어로는 Node.js v16.13.1, npm v8.1.2가 설치된다.

`<node_version>`은 아주 똑똑해서 적당히 입력해도 알아서 인식해 주기에 풀 버전을 모두 명시할 필요가 없다. 예를 들어, `nvm install 10`이라 하면 Node.js v10.x 버전 중 가장 최신 버전(2021년 12월 현재 v10.24.1)을 설치한다.

`nvm install`로 특정 Node.js, npm을 설치하면 설치 이후 설치된 그 버전이 자동으로 *사용(use)*된다.

## ls : 설치된 Node.js 버전 보기

시스템에 (`nvm install` 명령어로) 설치된 Node.js의 버전들은 `nvm ls` 명령어로 확인 가능하다.

{:.code-header}
(nvm을 이용해) 설치된 모든 Node.js 버전 보기

{% highlight bash %}
nvm ls
{% endhighlight %}

현재 *사용(use)* 중인 버전 옆에는 화살표(`->`)가 표시된다.

## current : 현재 사용 중인 Node.js 버전 확인하기

시스템에 `nvm install` 명령어로 설치된 Node.js, npm 버전이 여러 개 있을 경우, `node`, `npm` 명령어로는 어떤 버전의 Node.js, npm이 실행될까? 정답은, 현재 *사용(use)* 중인 버전이 실행된다.

현재 *사용(use)* 중인 Node.js 버전을 확인하고 싶으면 `nvm current` 명령어를 사용하면 된다.

{:.code-header}
현재 사용 중인 Node.js 버전 확인하기

{% highlight bash %}
nvm current
{% endhighlight %}

## use : 다른 Node.js 버전 사용하기

다른 Node.js 버전을 *사용(use)*하고 싶으면 어떻게 해야 할까? `nvm use` 명령어를 이용하면 (시스템에 `nvm install` 명령어로 설치된) 다른 Node.js 버전을 *사용(use)*할 수 있다.

{:.code-header}
(nvm으로 설치된) 다른 Node.js 버전 사용하기

{% highlight bash %}
nvm use node              # (설치된) 가장 최신 버전의 Node.js 및 npm 버전 사용
nvm use --lts             # (설치된) 가장 최신 LTS 버전의 Node.js 및 npm 사용
nvm use <node_version>    # (설치된) <node_version> 버전의 Node.js 및 npm 사용  ex) nvm use 16.3.1
{% endhighlight %}

- `<node_version>` : Node.js 버전. ex) `10.10.0`, `6.14.4`, `8.9.1` 등

`nvm install`에서와 마찬가지로, `<node_version>`은 아주 똑똑해서 적당히 입력해도 알아서 인식해 주기에 풀 버전을 모두 명시할 필요가 없다. 예를 들어, `nvm use 17`만 입력해도 현재 시스템에 설치된 Node.js v17.x 버전 중 가장 최신 버전을 *사용(use)*한다.

참고로 `nvm install`로 Node.js, npm을 설치하면 설치 이후 그 버전이 자동으로 *사용(use)*된다.

## uninstall : Node.js 특정 버전 제거하기

설치된 Node.js, npm 특정 버전을 제거하고 싶으면 `nvm uninstall` 명령어를 사용한다.

{:.code-header}
Node.js, npm 특정 버전 제거하기

{% highlight bash %}
nvm uninstall node             # (설치된) 가장 최신 버전의 Node.js 및 npm 제거
nvm uninstall --lts            # (설치된) 가장 최신 LTS 버전의 Node.js 및 npm 제거
nvm uninstall <node_version>   # (설치된) <node_version> 버전의 Node.js 및 npm 제거  ex) nvm uninstall 10.10.0
{% endhighlight %}

- `<node_version>` : Node.js 버전. ex) `10.10.0`, `6.14.4`, `8.9.1` 등

`nvm install`에서와 마찬가지로, `<node_version>`은 아주 똑똑해서 적당히 입력해도 알아서 인식해 주기에 풀 버전을 모두 명시할 필요가 없다. 예를 들어, `nvm uninstall 17`만 입력해도 현재 시스템에 설치된 Node.js v17.x 버전 중 가장 최신 버전을 제거한다.

참고로, 현재 *사용(use)* 중인 Node.js 버전은 제거할 수 없다. 이 경우, `nvm use` 명령어로 다른 Node.js를 *사용(use)*하게 한 후 제거하거나, `nvm deactivate` 명령어로 현재 *사용(use)* 중인 Node.js를 내린 후 제거해야 한다.

## run, exec : 특정 버전의 Node.js로 명령어 실행하기

`nvm use`를 이용해 특정 버전의 Node.js를 *사용(use)*하게 한 상태에서 명령어를 실행할 수도 있지만, 한 줄의 명령어만 실행하는 경우 번거롭다. 이 경우 `nvm run`, `nvm exec` 명령어를 이용하면 특정 버전의 Node.js로 명령어를 실행하게 할 수 있다.

예를 들어, `app.js` 파일이 있고, 이를 Node.js v6.14.4 버전으로 실행하려고 한다면, 다음과 같이 하면 된다.

{:.code-header}
Node.js v6.14.4로 app.js 실행하기

{% highlight bash %}
nvm run 6.14.4 app.js
nvm exec 6.14.4 node app.js
{% endhighlight %}

`nvm run`은 명시된 버전의 Node.js를 *사용(use)*해 `node`를 실행하는 명령어이다. 한편 `nvm exec`은 명시된 버전의 Node.js를 *사용(use)*까지만 하는 명령어로, 이 상태에서 사용할 구체적인 명령어를 입력해 줘야 한다.

## 기타

### --help

다음 명령어로 nvm의 도움말을 볼 수 있다.

{:.code-header}
nvm 도움말 보기

{% highlight bash %}
nvm --help
{% endhighlight %}

### --version

다음 명령어로 현재 설치된 nvm 버전을 볼 수 있다.

{:.code-header}
nvm 버전 보기

{% highlight bash %}
nvm --version
{% endhighlight %}

### which

Node.js 파일(`node`)의 경로를 보고 싶으면 다음 명령어를 입력한다.

{:.code-header}
Node.js 경로 보기

{% highlight bash %}
nvm which current          # 현재 사용 중인 Node.js 경로 보기
nvm which <node_version>   # (설치된) <node_version> 버전의 Node.js 경로
{% endhighlight %}

- `<node_version>` : Node.js 버전. ex) `10.10.0`, `6.14.4`, `8.9.1` 등

`nvm install`에서와 마찬가지로, `<node_version>`은 아주 똑똑해서 적당히 입력해도 알아서 인식해 주기에 풀 버전을 모두 명시할 필요가 없다. 예를 들어, `nvm which 17`만 입력해도 현재 시스템에 설치된 Node.js v17.x 버전 중 가장 최신 버전 Node.js 파일의 경로를 반환한다.

### deactivate

다음 명령어를 사용하면 현재 *사용(use)* 중인 Node.js를 내릴 수 있다.

{:.code-header}
현재 사용 중인 Node.js 내리기

{% highlight bash %}
nvm deactivate
{% endhighlight %}

이 상태에서 `nvm current`를 하면 `none`이라 뜬다.

이렇게 Node.js를 내리고 나면 nvm은 `node`, `npm` 명령어를 덮어쓰지(overwrite) 않는다. 만약 (`apt` 등을 이용해) 시스템에 전역적으로 설치된 Node.js가 있다면 `node` 명령어 입력 시 해당 Node.js가 사용된다. 시스템에 전역적으로 설치된 Node.js가 없다면 `node` 명령어 입력 시 명령어를 찾을 수 없다고 나온다.

`nvm uninstall` 명령어를 이용해 현재 *사용(use)* 중인 Node.js를 제거해야 한다면, `nvm deactivate` 명령어를 이용해 Node.js를 내리고 제거를 진행하면 된다.

### unload

현재 쉘에서 (명령어 충돌 등의 이유로) nvm을 사용하고 싶지 않다면 다음 명령어를 입력하면 된다.

{:.code-header}
현재 쉘에서 nvm 사용하지 않기

{% highlight bash %}
nvm unload
{% endhighlight %}

쉘을 다시 켜거나 `source ~/.bashrc`를 하면 nvm을 다시 사용할 수 있다.

