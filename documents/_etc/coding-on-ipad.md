---
title: "iPad에서 개발환경 구축하기"
tags: ["ipad", "code-server", "termius"]
date_created: "2021-03-27"
date_modified: "2021-03-27"
---

iPad를 구매한지 어연 3년이 되어간다. iPad 구매 전에는 어딜 가도 항상 무거운 노트북을 들고 다녀야 했지만, iPad 구매 후에는 노트북으로 하던 상당히 많은 일을 iPad로 대체하게 되어 노트북을 들고 다니지 않는 경우가 많아졌다. 그러나 코딩을 할 땐 어쩔 수 없이 노트북을 써야 했다. 만약 iPad에서 코딩마저 가능하다면 무거운 노트북을 안 들고 다녀도 될 거란 기대에, 필자는 iPad에서 코딩을 할 수 있는 방법을 정말 다각도로 연구해 보았다.

본 문서는 필자의 연구 결과(?)를 정리한 문서이다. 그러나 결론부터 말하자면, 필자가 찾은 방법들은 모두 아쉬운 부분들이 있다. 제대로 된 코딩을 해야 한다면 적어도 아직까진 노트북을 들고 다녀야 할 것 같다. 만약 개선할 아이디어나 다른 좋은 방법이 있다면 댓글로 알려주기 바란다.

# 네이티브 환경에서 코딩하기

iPad는 네이티브 환경에서 코드 컴파일 및 실행이 거의 불가능하다. iPadOS도 UNIX-like OS니까 GCC 같은 컴파일러를 깔 수 있을 법 한데, 보안 정책 때문에 컴파일러 설치는커녕 쉘 접근도 막혀있다. 그나마 실행이 되는게 [Pythonista 3](https://apps.apple.com/kr/app/pythonista-3/id1085978097)을 이용한 파이썬 코딩이다. 근데 iPad와 같은 모바일 장치는 성능이 별로 좋지 못하기 때문에, 이 앱을 이용해 코드 몇 줄 돌리는 수준이 아닌 제대로 된 코딩을 하는 것은 많이 힘들다.

일단 필자의 iPad에는 Pythonista 3이 설치되어 있긴 하다. 근데 사실 파이썬 코드는 원격 서버에 설치한 Jupyter Lab에서 돌리는게 훨씬 편하고 강력하기에 이 방법은 거의 안쓴다.

# 원격 데스크탑

[TeamViewer](https://www.teamviewer.com/ko/)나 [Chrome Remote Desktop](https://remotedesktop.google.com/support/), [Remote Desktop Mobile](https://apps.apple.com/us/app/remote-desktop-mobile/id714464092) 등의 프로그램을 사용하면 원격에 있는 PC에 접속하여 코딩을 할 수 있다. 진짜 PC에 접속하는 것이므로(iPad는 화면을 출력하고, 입력을 전송하는 터미널 역할만 한다) 이 문서에 있는 그 어떤 방법보다 강력한 방법일 것이다.

TeamViewer의 경우 사용자 층이 많고 강력하다는 장점이 있으나, PC에 별도의 프로그램을 깔아야 해 시스템이 조금 더러워지고, 기업의 경우 유료로 사용해야 하고, 개인 사용자의 경우에도 정해진 시간이 지나면 연결이 강제적으로 끊긴다는(물론 나갔다 다시 들어가면 되긴 한다) 단점이 있다. Chrome Remote Desktop은 Chrome만 설치되어 있으면 별도 프로그램이 없어도 사용 가능하고 무료라는 장점이 있으나, 시스템 설정같은 창은 이를 통해 조작할 수 없다는 단점이 있다(보안 문제 또는 권한 문제 때문으로 보인다). Remote Desktop Mobile은 Microsoft에서 만든 것으로, Windows Pro를 사용해야 사용할 수 있다는 단점이 있다.

필자가 제일 처음 시도한 방식이 이 방식이었다. 처음에는 TeamViewer를 사용하다가 나중에는 Chrome Remote Desktop을 사용했다. 사용해보니 이 방법에는 단점이 많았다. 

1. 사용성이 별로 안 좋다 : PC에서 사용하는 앱들은 PC용으로 나온 것이다 보니 글자 크기나 버튼 배열 등이 PC 환경에 알맞게 만들어져 있다. 이를 iPad 화면에서 보면 너무 작아 읽기가 힘들고 클릭하기도 힘들다. 물론 화면을 확대해 볼 수는 있지만 화면을 확대하는 동작 자체가 사용성을 해친다.
2. 안정적인 인터넷 연결이 필수적이다 : 인터넷 연결이 불안정하다면 버벅거리고, 비행기 같이 인터넷 연결을 할 수 없는 환경에서는 사용할 수 없다.
3. 데이터를 많이 쓴다 : 필자가 가지고 있는 iPad는 Wi-Fi 모델이어서 많은 경우 휴대폰 핫스팟을 이용해 온라인에 접속하는데, 이런 원격 접속 앱들은 데이터를 많이 써 오래 쓰기엔 부담이 크다.
4. 접속을 위해서는 항상 PC를 켜 놓아야 한다 : WOL 등을 구축하지 않는 한 이 기능을 쓰려면 항상 PC를 켜놔야 하는데, 필자는 집에 PC가 있어 전기세가 조금 부담되었다.
5. 보안 이슈 : 몇몇 회사의 경우 보안상의 이유로 TeamViewer를 막아놓는 경우가 있다. 또한 이들 프로그램이 사용하는 RDP라는 프로토콜에 BlueKeep이라는 보안 취약점이 있었다(물론 지금은 해결됐다).

그래서 필자는 안정적인 Wi-Fi 연결이 보장된 환경에서만 이 방식을 가끔 사용한다.

# Git

PC 또는 서버에서 작업하던 코드를 GitHub 등에 올린 후, Git Client 앱을 이용하면 iPad에서 코딩을 진행할 수 있다. 원래 Git이 이러라고 만들어 진 물건이 아니던가. 이 방법을 쓰면 심지어 오프라인에서도 코드 작업을 할 수 있다.

필자는 [Working Copy](https://apps.apple.com/us/app/remote-desktop-mobile/id714464092)라는 앱을 이용하고 있다. Working Copy는 무료 앱으로서 commit, push, pull, fetch 등 대부분의 Git 동작을 수행할 수 있는 좋은 Git Client이다. 몇몇 고급 기능들은 유로 업그레이드가 필요하나, GitHub Student Developer Pack에 가입되어 있다면 무료로 사용할 수 있다([Verify 링크](https://workingcopyapp.com/education/verify/)). 이 앱은 Git Client로도 훌륭하지만, 이때까지 사용해 본 iPad용 텍스트 편집기 중 가장 좋아 특히 추천한다.

그러나 이 방법에도 단점이 있다.

1. 코드를 실행할 수는 없다 : 이 방법으로 코딩하는 것은 사실상 메모장에 코딩하는 것과 같다.
2. 어쨌든 commit, push, pull 등 추가적인 조작이 필요하다 : 가끔 PC에서 commit/push 하는 것을 잊어버려 코딩을 할 수 없거나, iPad에서 push를 한 후 PC에서 pull하는 것을 잊어 충돌이 발생하곤 한다.
3. 만약 Git 이력 관리가 중요하다면 이 방법은 사용하기 어렵다 : PC에서 코딩하다가 갑자기 어딜 가야 해 iPad로 연속해 작업을 해야 한다면, PC에서 작업이 얼만큼 됐던 간에 일단 commit 후 push를 하고 이를 iPad에서 pull해야 한다. 개인 레포지토리에서야 이런 식으로 해도 상관이 없겠지만, 공동 레포지토리에서 iPad와의 동기화를 위해서 commit을 남발하긴 어렵다.

그래서 필자는 이 방식을 오프라인 환경일 때만 제한적으로 사용한다.

# SSH 터미널

원격 서버에 SSH로 접속한 후, vim 등을 이용해 코딩하는 방법이 있다. 어떻게 보면 가장 컴공스러운 방법이라 할 수 있겠다. 장점은 당연히 SSH를 사용하니 가볍고, 빠르고, 안전하다. 단점은 사용성이 개판이다. 만약 당신이 vim 마스터라면 고려해 볼 만한 방법이겠지만, 아쉽게도 필자는 vim에 그리 익숙하지 않아 이 방법은 사용하지 않는다.

개인적으로 iPad에서 가장 쓰기 좋은 SSH 터미널 앱은 [Termius](https://termius.com/)라 생각한다. Termius에서는 무료로 SSH 연결을 할 수 있다. 그러나 연결 유지(다른 앱을 실행해도 SSH 세션을 유지하는 기능), 다중 연결(여러 개의 SSH 세션을 만드는 기능), 포트 포워딩(LocalForwarding) 등의 기능을 쓰려면 유료 업그레이드가 필요하다. 그러나 이 역시 GitHub Student Developer Pack에 가입되어 있다면 무료로 사용할 수 있다([Verify 링크](https://termius.com/education)).

필자는 이 앱을 정말 자주 사용하고 있다! 이 앱으로 코딩을 하진 않지만, 코드 실행, 포트 포워딩 등 서버 관련 작업을 많이 하고 있다.

# SSH Text Editor

사실 필자가 최고로 치는 방법은 VSCode의 "Remote SSH"와 같은 방법이다. VSCode의 Remote SSH는 SSH 연결을 통해 안전하게 원격 서버에 접속해 마치 네이티브 환경에서 코딩하는 것처럼 코딩을 할 수 있게 해 준다. 이 방법은 Git처럼 중간 과정을 거칠 필요도 없고(내가 작업하던 코드에 바로 접근 가능하다), 충돌이 날 염려도 없고, 가볍고, 보안성도 좋고, 빠르다. 그러나 2021년 3월 현재 아무리 찾아도 SSH로 원격 접속해 사용할 수 있는 텍스트 에디터는 앱스토어에 없다. 딱 하나 [Buffer Editor](https://apps.apple.com/us/app/buffer-editor-code-editor/id502633252)라는 앱이 있긴 한데, 개인적으로 사용성이 많이 아쉬웠다. 코드 하이라이팅도 제대로 안되고, 글씨도 너무 작아 보기 불편했다. 일단 필자의 iPad에 이 앱이 설치되어있긴 하지만, 거의 한 번도 안 썼다.

# 웹 기반 Editor

원격 서버에 웹으로 접근 가능한 개발 환경을 구축하고, iPad에서 웹 브라우저를 통해 접근하는 방법이 있다. 2021년 3월 현재 가장 그럴 듯한 방법이다. 유명한 것으로는 Jupyter Lab, [Code-Server](https://github.com/cdr/code-server)가 있다.

## Jupyter Lab

Jupyter Lab은 파이썬 코드를 실행할 수 있는 일종의 웹 IDE이다. 필자는 원격 서버에 Jupyter Lab 서비스를 등록해 원격 서버가 켜지면 자동으로 Jupyter Lab이 켜지도록 해 놨다. 자세한 설정 방법 및 사용법은 [해당 문서](/etc/jupyter-lab)를 참고하기 바란다.

## Code-Server

Code-Server는 웹 상에서 VSCode를 실행하는 프로그램이다. [Github 링크](https://github.com/cdr/code-server)

Code-Server는 시스템에 바로 설치할 수도 있지만 Docker를 이용해 설치할 수도 있다. 필자는 Docker를 사용해 Code-Server를 설치하였다. Docker를 사용한 이유는 다음과 같다.

{:.no-guide-line}
- 원격 서버를 깨끗한 상태로 유지시킬 수 있다 : 격리된 컨테이너 안에 설치/실행되기에 호스트 운영체제를 깔끔하게 유지할 수 있다.
- 껏다 켰다가 아주 편하다 : 시스템에 설치되는 버전은 현재 열린 디렉토리를 바꾸고 하는게 꽤나 번거롭다. 하지만 Docker를 사용하면 마치 Jupyter Lab을 쓸 때처럼 원할 때 원하는 디렉토리에서 켜고, 원할 때 끌 수 있어 편리하다. 그리고 시스템에 바로 설치할 때는 보통 이를 서비스로 등록해 시스템이 켜질 때 자동으로 실행되게 하는데, 이렇게 되면 보안 문제가 발생할 수 있다. 하지만 Docker를 사용해 껏다 켰다가 편한 시스템으로 만들면 딱 사용할 때만 Code-Server를 실행하면 되므로 보안 문제가 많이 해소된다.

물론 Docker를 사용했을 때의 단점도 있다.

{:.no-guide-line}
- Docker에 대한 기본 지식이 필요하다.
- 내가 원하는 대로 Code-Server를 조작하는게 (비교적) 힘들다.
- Code-Server의 쉘이 가상환경이라 시스템에 설치되어 있는 프로그램을 바로 사용하지 못한다 : 이들을 사용하려면 직접 다시 설치하거나, 그런 것들이 모두 설치된 도커 이미지를 새로 만들어야 한다.

다행히 필자는 Docker에 대한 지식이 조금은 있고, 딱히 Code-Server를 열심히 조작해 쓸 것도 아니고, 쉘은 Code-Server의 것이 아닌 시스템의 쉘을 그냥 바로 사용하면 되기에(대신 웹 페이지(VSCode)에서 한 번에 할 수는 없다) 계속 진행했다.

### 설치법

Docker가 설치되어 있지 않다면 우선 Docker를 설치한다.

{% highlight bash %}
$ sudo apt update
$ sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt update
$ sudo apt install -y docker-ce docker-ce-cli containerd.io
$ sudo usermod -aG docker $USER
{% endhighlight %}

원하는 곳에서 바로 Code-Server를 실행할 수 있도록 적당한 디렉토리(필자는 `~/scripts` 디렉토리에 만들었다)에 다음과 같이 Code-Server 이미지를 실행하는 `run-code-server` 스크립트를 만들었다.

{:.code-header}
run-code-server

{% highlight bash %}
#!/bin/bash

docker run -it --rm --name code-server \
-p 5000:8080 \
-v "$HOME/.code-server/code-server-config/:/home/coder/.config/code-server/" \
-v "$HOME/.code-server/vscode-config/:/home/coder/.local/share/code-server/" \
-v "$PWD:/home/coder/project" \
-u "$(id -u):$(id -g)" \
-e "DOCKER_USER=$USER" \
-e TZ=Asia/Seoul \
-e LC_ALL=C.UTF-8 \
codercom/code-server:latest
{% endhighlight %}

이 스크립트에 실행 권한을 주고, 스크립트가 들어 있는 디렉토리(`~/scripts`)를 `PATH`에 추가하고(이렇게 하면 어디서든 `run-code-server`만 입력해도 위 스크립트를 바로 실행할 수 있다), Code-Server의 설정이 담길 디렉토리를 만든다(이 디렉토리가 있어야 Docker Container가 실행 시 변경한 설정 파일을 보존할 수 있다).

{% highlight bash %}
$ chmod +x run-code-server
$ echo "export PATH=\$HOME/scripts:\$PATH" >> ~/.bashrc
$ mkdir -p ~/.code-server
$ mkdir -p ~/.code-server/code-server-config
$ mkdir -p ~/.code-server/vscode-config
{% endhighlight %}
### 사용법

iPad에서, SSH Shell(ex. Termius)을 이용해 작업하고자 하는 디렉토리에 가서 위에서 만든 스크립트를 실행한다.

{% highlight bash %}
$ run-code-server
{% endhighlight %}

이제 다음 URL에 접속하면 웹 상에서 VSCode 환경을 띄우고 그 안에서 코딩을 할 수 있다.

{% highlight text %}
http://(원격 서버 ip 주소):5000/?folder=/home/coder/project
{% endhighlight %}

만약 코딩 중 코드를 실행해 보고 싶다면 SSH Shell에서 실행하면 된다(위에서 설명했듯이 Docker로 Code-Server를 설치했기 때문에 Code-Server의 터미널에는 시스템에 설치된 프로그램들이 없어 실행하기 어렵다). 실행 중인 Code-Server를 종료하고 싶다면 (마치 Jupyter Lab 처럼) 그냥 `Ctrl + C`를 누르면 된다.

Code-Server는 VSCode와 거의 동일한 환경이므로 텍스트 편집, 환경설정, 테마 설정 뿐만 아니라 심지어 확장 설치까지 가능하다! 근데 확장의 경우 라이선스 문제 때문에 VSCode의 확장들을 바로 가져올 수 없다고 한다. 그래서 Code-Server 개발진들은 같은 역할을 하는, 라이선스 문제 없는 확장들을 열심히 개발 중에 있다! 2021년 현재 상당히 많은 확장들이 사용 가능하므로, 아마 필요한 웬만한 확장은 사용할 수 있을 것이다(심지어 한국어 팩 확장까지 사용 가능하다).

### 문제점

이렇게 완벽해 보이는 Code-Server도 한 가지 문제점이 있다. 현재 한글을 입력하면 더듬더듬 입력되는 현상이 관찰되었다(예를 들어 "사랑"을 입력하면 "ㅅ사라랑랑" 이런 식으로 입력된다). Github Issues에 의하면 이 문제는 Code-Server의 문제가 아닌, VSCode가 가지고 있는 문제라 한다. 이것이 패치되려면 최소 다음 VSCode 패치가 나올 때까지 기다려야 할 것 같다. 즉 현재는 영어로만 코딩해야 한다.