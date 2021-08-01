---
title: "WSL - Windows Subsystem for Linux"
date_created: "2021-07-26"
date_modified: "2021-08-01"
tags: ["wsl"]
---

# WSL이란?

WSL(Windows Subsystem for Linux)은 Windows 10에서 GNU/Linux의 명령행 도구, 유틸리티, 어플리케이션을 (거의) 네이티브로 사용할 수 있게 해 주는 시스템이다.

2021년 08월 현재 WSL1과 WSL2, 이렇게 두 가지 버전을 사용할 수 있다.

## WSL의 원리

어떻게 Windows에서 Linux 바이너리를 실행할 수 있을까?

WSL1은 Linux의 시스템 콜을 Windows NT 시스템 콜로 번역해주는 계층을 제공함으로서 이를 가능케 했다. 즉 실제로 Linux 바이너리는 Windows NT 커널 위에서 돌아간다.

{% include caption-img.html src="wsl-wsl1-architecture.png" title="Fig.01 WSL1 Architecture" description="WSL1은 Linux 시스템 콜을 Windows NT 시스템 콜로 번역해주는 계층을 제공한다." %}

반면 WSL2는 Hyper-V 기술을 이용해 실제 Linux 커널을 제공함으로서 이를 가능케 했다.

{% include caption-img.html src="wsl-wsl2-architecture.png" title="Fig.02 WSL2 Architecture" description="WSL2는 Hyper-V 기술을 이용해 실제 Linux 커널을 제공한다." %}

## WSL1 vs. WSL2

거의 대부분의 경우 WSL2를 사용하는 것이 WSL1을 사용하는 것보다 유리하다. WSL1에서는 번역되지 않는 Linux 시스템 콜을 사용하는 Linux 바이너리를 사용할 수 없다. 하지만 WSL2에서는 Linux의 모든 기능을 다 사용할 수 있다. 또한 파일 시스템 성능을 포함한 전반적인 성능이 WSL1보다 WSL2에서 개선되었다.

다만 WSL1을 사용하는 것이 유리한 상황도 있다. WSL2는 가상화 기술(Hyper-V)을 이용해 구동되기 때문에, WSL2를 사용할 땐 VMWare, VirtualBox와 같은 가상화 프로그램을 사용할 수 없다. 자세한 내용은 [해당 문서](/linux/wsl-virtualbox)를 참조하자.

또한 WSL2에서는 운영체제간 파일 시스템을 넘나드는 조작이 느리다는 단점이 있다. 즉 WSL2을 통해 Windows 파일을 조작하거나 Windows에서 WSL2 파일 시스템에 저장된 파일을 조작하는 것이, WSL1을 통해 Windows 파일을 조작하거나 Windows에서 WSL1 파일 시스템에 저장된 파일을 조작하는 것보다 느리다. 일단 특별한 이유가 없다면 Windows 파일은 Windows에서, Linux 파일은 Linux에서 조작하는 것이 가장 좋다. 그러나 만약 운영체제간 파일 조작을 많이 해야 하는 경우(ex. WSL 프로젝트 파일을 반드시 Windows 파일 시스템에 저장해야 하는 경우) WSL2보다 WSL1을 사용하는 것이 더 낫다.

## 시스템 요구사항

### WSL1

WSL1은 특별한 시스템 요구사항이 없다.

### WSL2

WSL2를 설치하기 위한 시스템 요구사항은 다음과 같다.

{:.no-guide-line .mb-0}
- 버전 1903, OS 빌드번호 18362 이상의 64-bit Windows 10

cmd/Powershell에서 다음 명령어를 입력하면 시스템의 버전과 OS 빌드번호를 확인할 수 있다.

{% highlight powershell %}
winver
{% endhighlight %}

{:.no-guide-line .mb-0}
- Hyper-V 설치를 위한 시스템 요구사항이 모두 만족되어야 한다.

cmd/Powershell에서 다음 명령어를 실행하면 가장 아래 "Hyper-V 요구 사항" 항목에서 현재 시스템이 Hyper-V 설치를 위한 시스템 요구사항을 만족시키는지 확인할 수 있다.

{% highlight powershell %}
Systeminfo.exe
{% endhighlight %}

{:.code-result}
{% highlight text %}
...(전략)
Hyper-V 요구 사항:       VM 모니터 모드 확장: 예
                         펌웨어에 가상화 사용: 예
                         두 번째 수준 주소 변환: 예
                         데이터 실행 방지 사용 가능: 예
{% endhighlight %}

만약 "펌웨어에 가상화 사용"이 "아니오"로 되어 있다면 BIOS에서 가상화 기술(Virtualization Technology)을 활성화해야 한다.[^1] 만약 "Hyper-V 요구 사항"이 "하이퍼바이저가 검색되었습니다. Hyper-V에 필요한 기능이 표시되지 않습니다."으로 뜬다면 해당 시스템에선 이미 Hyper-V를 사용하고 있다는(= Hyper-V 요구 사항이 충족되었다는) 것이다. 가상화 기술을 지원하지 않는 구형 시스템에서는 WSL2를 사용할 수 없다.

[^1]: 시스템에 따라 가상화 기술은 다양한 이름으로 불리므로(ex. VT-x, AMD-V, SVM, Vanderpool 등) 자세한 사항은 CPU 제조사 및 메인보드 제조사의 메뉴얼을 확인하자. 또한 만약 Intel VT-d, AMD IOMMU 등의 이름을 가진 옵션이 있다면 이것들 역시 활성화해주자.

# WSL 설치하기

## Step 1. WSL 활성화하기

관리자 권한으로 Powershell을 실행하고 다음 명령어를 입력한다.

{% highlight powershell %}
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
{% endhighlight %}

그리고 시스템을 재부팅한다.

이 단계에서 WSL1은 모두 설치되었다. 이제 [Step 5](#kramdown_step-5-리눅스-배포판-설치하기)로 넘어가 리눅스 배포판을 설치하자. WSL2를 설치한다면 [Step 2](#kramdown_step-2-가상머신-기능-활성화하기)로 넘어가자.

## Step 2. 가상머신 기능 활성화하기

관리자 권한으로 Powershell을 실행하고 다음 명령어를 입력한다.

{% highlight powershell %}
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
{% endhighlight %}

그리고 시스템을 재부팅한다.

## Step 3. WSL2로 리눅스 커널 업데이트하기

다음 링크에서 x64 머신을 위한 리눅스 커널 업데이트 패키지를 받아 실행한다.

{:.text-align-center}
<https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi>

## Step 4. WSL2를 기본 버전으로 설정하기

Powershell을 실행하고 다음 명령어를 입력해 WSL2를 WSL의 기본 버전으로 설정하자.

{% highlight powershell %}
wsl --set-default-version 2
{% endhighlight %}

## Step 5. 리눅스 배포판 설치하기

[Microsoft Store](https://aka.ms/wslstore)에서 원하는 리눅스 배포판을 다운받자. 2021년 08월 현재 사용 가능한 리눅스 배포판의 종류는 다음과 같다.

{:.no-guide-line}
- [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)
- [Ubuntu 20.04 LTS](https://www.microsoft.com/store/apps/9n6svws3rx71)
- [openSUSE Leap 15.1](https://www.microsoft.com/store/apps/9NJFZK00FGKV)
- [SUSE Linux Enterprise Server 12 SP5](https://www.microsoft.com/store/apps/9MZ3D1TRP8T1)
- [SUSE Linux Enterprise Server 15 SP1](https://www.microsoft.com/store/apps/9PN498VPMF3Z)
- [Kali Linux](https://www.microsoft.com/store/apps/9PKR34TNCV07)
- [Debian GNU/Linux](https://www.microsoft.com/store/apps/9MSVKQC78PK6)
- [Fedora Remix for WSL](https://www.microsoft.com/store/apps/9n6gdm4k2hnc)
- [Pengwin](https://www.microsoft.com/store/apps/9NV1GV1PXZ6P)
- [Pengwin Enterprise](https://www.microsoft.com/store/apps/9N8LP0X93VCP)
- [Alpine WSL](https://www.microsoft.com/store/apps/9p804crf0395)

Ubuntu의 경우 Microsoft Store에 보면 "Ubuntu 18.04 LTS", "Ubuntu 20.04 LTS", 이렇게 버전명이 정확히 명시된 패키지도 있지만, 버전명이 명시되지 않은, 그냥 ["Ubuntu"](https://www.microsoft.com/store/apps/9nblggh4msv6)로 되어 있는 패키지도 있다. "Ubuntu" 패키지를 설치할 경우 가장 최신 버전의 Ubuntu LTS(2021년 08월 현재, Ubuntu 20.04 LTS)가 설치되는 것으로 보인다. 참고로 필자는 "Ubuntu" 패키지를 다운받아 설치했다.

설치가 끝났으면 해당 리눅스 배포판을 실행한다. 최초실행 시 초기화 작업(몇 분 정도 걸린다) 후 사용자 계정을 등록하는 프롬프트가 뜬다. 적당한 사용자명과 암호를 등록하면 WSL을 사용하기 위한 모든 준비가 완료된 것이다.

# wsl 명령어

WSL이 설치되었으면 Powershell과 cmd에서 `wsl` 명령어를 사용할 수 있다.

## Linux 바이너리 실행

{% highlight powershell %}
wsl <OPTION>... <CMD>
{% endhighlight %}

명령행(`<CMD>`)과 옵션(`<OPTION>`)이 없으면 `wsl`은 현재 cmd/Powershell 경로에서 "기본 배포판(Default Distribution)"의 쉘을 실행한다.

명령행(`<CMD>`)이 있으면 `wsl`은 "기본 배포판(Default Distribution)"의 "기본 쉘(Default Shell)"에서 명령행을 바로 수행하고 그 결과를 반환한다.

예를 들어,

{% highlight powershell %}
wsl ls -la
{% endhighlight %}

라 하면 Powershell/cmd에서 `ls -la` 명령을 실행한다(현재 디렉토리의 파일 목록을 보여준다).

이를 이용하면 배치 스크립트에서 리눅스 명령행을 사용할 수 있다. 심지어 다음과 같이 Linux 명령어와 cmd/Powershell 명령들을 조합해 사용할 수도 있다.

{% highlight powershell %}
wsl ls -la | findstr "git"
dir | wsl grep git
{% endhighlight %}

### --exec, -e

{% highlight powershell %}
wsl --exec <CMD>
{% endhighlight %}

`--exec` 옵션은 "기본 배포판"에서, 쉘을 사용하지 않고 명령행 `<CMD>`를 바로 수행하고 그 결과를 반환한다. `--exec` 옵션은 `--exec` 을 사용하지 않았을 때와 (거의) 차이가 없다.

### --distribution, -d

{% highlight powershell %}
wsl --distribution <DISTRO> <CMD>
{% endhighlight %}

특정 리눅스 배포판 `<DISTRO>`에서 명령행 `<CMD>`를 수행한다.

### --user, -u

{% highlight powershell %}
wsl --user <USERNAME> <CMD>
{% endhighlight %}

특정 사용자 `<USERNAME>`로 명령행 `<CMD>`를 수행한다.

## WSL 관리

### --export

{% highlight powershell %}
wsl --export <DISTRO> <FILENAME>
{% endhighlight %}

시스템에 설치된 특정 리눅스 배포판 `<DISTRO>`를 tar 파일 `<FILENAME>`로 내보낸다.

### --import

{% highlight powershell %}
wsl --export <DISTRO> <INSTALL_PATH> <FILENAME> [--version <VERSION>]
{% endhighlight %}

`--export` 옵션을 이용해 저장된 tar 파일 `<FILENAME>`를 가져와 새 배포판 `<DISTRO>`를 만들고, 이를 시스템에 등록한다. 새 배포판은 `<INSTALL_PATH>`에 설치된다. `--version` 옵션을 사용하면 사용할 WSL 버전 `<VERSION>`을 명시할 수 있다. 2021년 08월 현재 `<VERSION>`으로는 1, 2, 이렇게 두 가지 값을 사용할 수 있다.

### --list, -l

{% highlight powershell %}
wsl --list <OPTION>
{% endhighlight %}

현재 시스템에 설치된 리눅스 배포판의 종류를 나열한다.

다음 옵션들을 사용할 수 있다.

{:.no-guide-line}
- `--all` : 현재 실행 또는 제거 중인 배포판들을 포함한 모든 배포판들을 나열한다.
- `--running` : 현재 실행 중(running)인 배포판만 나열한다.
- `--quiet`, `-q` : 배포판들의 이름만 나열한다.
- `--verbose`, `-v` : 모든 배포판들에 대한 자세한 정보(배포판들의 이름(name), 상태(state), 사용 중인 WSL 버전(version))를 나열한다. 참고로 `*` 표시는 "기본 배포판(Default Distribution)"을 의미한다.

### --set-default, -s

{% highlight powershell %}
wsl --set-default <DISTRO>
{% endhighlight %}

리눅스 배포판 `<DISTRO>`를 기본 배포판(Default Distribution)으로 설정한다. 기본 배포판은 `wsl` 명령어에 아무런 옵션 `<OPTION>`을 주지 않았을 때 기본으로 실행되는 배포판이다.

### --set-default-version

{% highlight powershell %}
wsl --set-default-version <VERSION>
{% endhighlight %}

기본 WSL 버전을 `<VERSION>`으로 설정한다. 2021년 08월 현재 `<VERSION>`으로는 1, 2, 이렇게 두 가지 값을 사용할 수 있다.

즉 만약 `wsl --set-default-version 2`를 하면, 새로운 리눅스 배포판을 설치할 때 기본적으로 WSL2를 사용하게 된다는 것이다.[^2] 참고로 WSL이 처음 설치되었을 때 기본 WSL 버전은 1로 설정되어 있다.

[^2]: `wsl --set-version`을 이용하면 특정 리눅스 배포판이 사용하는 WSL 버전을 얼마든지 바꿀 수 있긴 하다.

### --set-version

{% highlight powershell %}
wsl --set-version <DISTRO> <VERSION>
{% endhighlight %}

설치된 리눅스 배포판 `<DISTRO>`가 사용하는 WSL 버전을 `<VERSION>`로 변경한다.

예를 들어 "Ubuntu" 배포판의 WSL 버전을 2로 변경하고 싶으면 다음과 같이 입력하면 된다.

{% highlight powershell %}
wsl --set-version Ubuntu 2
{% endhighlight %}

{:.code-result}
{% highlight text %}
변환이 진행 중입니다. 몇 분 정도 걸릴 수 있습니다...
WSL 2와의 주요 차이점에 대한 자세한 내용은 https://aka.ms/wsl2를 참조하세요
변환이 완료되었습니다.
{% endhighlight %}

### --shutdown

{% highlight powershell %}
wsl --shutdown
{% endhighlight %}

실행 중인 모든 Linux 배포판을 종료하고 WSL을 종료한다.

### --terminate, -t

{% highlight powershell %}
wsl --terminate <DISTRO>
{% endhighlight %}

리눅스 배포판 `<DISTRO>`를 종료한다.

### --unregister

{% highlight powershell %}
wsl --unregister <DISTRO>
{% endhighlight %}

리눅스 배포판 `<DISTRO>`의 등록을 취소한다.

### --help

{% highlight powershell %}
wsl --help
{% endhighlight %}

도움말 보기
