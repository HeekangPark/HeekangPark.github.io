---
title: "wslpath"
date_created: "2021-12-15"
date_modified: "2021-12-18"
tags: ["wslpath", "wsl_utility"]
---

# WSL에서의 Windows와 Linux 간 파일 공유

VMWare나 VirtualBox와 같은 가상화 프로그램으로 만든 Linux 가상머신에 비해 WSL이 가지는 가장 큰 장점은 무엇일까. 가상머신보다 WSL이 훨씬 빠르고 가볍다는 장점도 있지만, 개인적으론 Windows와 Linux에서 네이티브하게 동일한 파일을 사용할 수 있다는 것이 WSL이 가진 가장 큰 장점 같다.

WSL이 나오기 전에는 파일이라는 것은 운영체제 밑에 종속되는 개념이었다. 가상머신에서도 Windows, Linux간 동일한 파일을 사용할 수 있긴 했지만, 이건 공유 폴더를 이용해 Windows 파일을 Linux로, Linux 파일을 Windows로 "주고받는" 개념이었다. 하지만 WSL의 파일 시스템은 너무나도 네이티브해서, 마치 파일은 운영체제와 독립적으로 존재하고, 필요에 따라 적절한 운영체제를 "선택해" 파일을 조작하는 것 처럼 쓸 수 있다.

예를 들어, Windows의 바탕화면에 있는 `C:\Users\<user_account>\Desktop\target.txt` 파일이 있다고 해 보자. WSL에서는 (아무런 추가 설정을 하지 않은 경우) Windows의 C드라이브가 `/mnt/c`에 마운트되어 있기에, 마치 WSL 파일을 사용하듯이 `/mnt/c/Users/<user_account>/Desktop/target.txt` 경로로 바로 접근할 수 있다. 비슷하게, WSL의 홈 디렉토리에 있는 `/home/<user_account>/target.txt` 파일이 있다고 하자. Windows에서는 WSL이 `\\wsl$\` 네트워크 드라이브로 연결되어 있기에, 그냥 explorer에서 `\\wsl$\<distro>\home\<user_account>\target.txt` 경로로 바로 접근할 수 있다.

이 연속성은 너무나도 많은 것을 가능하게 한다. 예를 들어, 이를 이용하면 일련의 bash 쉘 스크립트들을 실행하는 cmd 쉘 스크립트 같은 것을 만들 수도 있다!

# wslpath

WSL에서는 위 문단에서 설명한 규칙을 이용하면 Windows와 Linux 간 경로를 쉽게 변환할 수 있다. 하지만 만약 사용자가 다른 마운트 포인트를 사용하도록 설정했으면[^1] 이 규칙은 변할 수 있다. 거기다, Windows와 Linux는 파일 디렉토리 구분자로 각각 `\`과 `/`을 쓴다는 작지만 귀찮은 차이점도 있다. 쉘 스크립트 작성시 이런 부분을 모두 고려해 코드를 짜는 것은 매우 귀찮은 일이 아닐 수 없다.

[^1]: `/etc/wsl.conf`에서 설정 가능하다.

이럴 때 쓰기 좋은 프로그램이 바로 `wslpath`이다. wslpath는 Windows Build 17046부터 포함된 WSL 유틸리티로, WSL 경로를 Windows 경로로, Windows 경로를 WSL 경로로 바꿔 준다. 사용법은 아주 단순하다. WSL을 실행하고 다음을 입력하면 된다.

{:.code-header}
Windows → WSL 경로 변환 : C:\Users\test\Desktop\target.txt

{% highlight bash %}
wslpath "C:\Users\test\Desktop\target.txt"
{% endhighlight %}

{:.code-result}
{% highlight text %}
/mnt/c/Users/test/Desktop/target.txt
{% endhighlight %}

WSL 경로를 Windows 경로로 바꾸고 싶다면 `w` 옵션을 주면 된다.

{:.code-header}
WSL → Windows 경로 변환 : /home/test/target.txt (WSL distro는 Ubuntu)

{% highlight bash %}
wslpath -w "/home/test/target.txt"
{% endhighlight %}

{:.code-result}
{% highlight text %}
\\wsl$\Ubuntu\home\test\target.txt
{% endhighlight %}

## 참고

### 경로 인자 전달

Windows 경로를 `wslpath` 인자로 전달할 때는 `\` 대신 `\\`를 사용하여 이스케이프 처리를 해 주거나, `\`를 사용하고 대신 따옴표로 감싸거나, `/`을 사용해 인자를 전달해야 한다.

{% highlight bash %}
wslpath "C:\Users\test\Desktop\target.txt"
wslpath C:\\Users\\test\\Desktop\\target.txt
wslpath C:/Users/test/Desktop/target.txt
{% endhighlight %}

{:.code-result}
{% highlight text %}
/mnt/c/Users/test/Desktop/target.txt
/mnt/c/Users/test/Desktop/target.txt
/mnt/c/Users/test/Desktop/target.txt
{% endhighlight %}

WSL 경로를 전달할 때는 이스케이프를 굳이 신경쓰지 않아도 된다. 다만 WSL 경로를 `wslpath` 인자로 전달할 때는 `~` 등의 단축어를 사용할 수 없다.

그러니 그냥 속 편하게, `wslpath`에 전달하는 경로는 반드시 따옴표로 감싸야 하고 또 반드시 절대 경로로 써야 한다고 생각하면 된다.

### 경로 존재 확인

`wslpath`의 인자로 넘어온 Windows 경로는 경로 존재 확인을 하지 않는다. Windows → WSL 경로 변환은 규칙 기반이기 때문인 것으로 보인다. 하지만 인자로 넘어온 WSL 경로는 경로 존재 확인을 한다. 따라서 존재하지 않는 WSL 경로는 Windows 경로로 변환할 수 없다.

### Windows에서의 실행

`wslpath`는 WSL 유틸리티이기 때문에 WSL에서만 실행 가능하다. 만약 Windows의 cmd 등에서 사용하고 싶다면 다음과 같이 `wsl`을 명령어 밑에서 `wslpath`를 사용해야 한다.

{% highlight powershell %}
wsl wslpath "C:\Users\test\Desktop\target.txt"
{% endhighlight %}

{:.code-result}
{% highlight text %}
/mnt/c/Users/test/Desktop/target.txt
{% endhighlight %}

## 옵션

### -m : WSL → Windows 경로 변환 시 \ 대신 / 출력

{% highlight bash %}
wslpath -m "/home/test/target.txt"
{% endhighlight %}

{:.code-result}
{% highlight text %}
//wsl$/Ubuntu/home/test/target.txt
{% endhighlight %}

`m` 옵션을 사용하여 WSL 경로를 Windows 경로를 변환하면, 디렉토리 구분자로 `\`가 아닌 `/`를 사용된다.