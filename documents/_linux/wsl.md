---
title: "WSL - Windows Subsystem for Linux"
date_created: "2021-07-26"
date_modified: "2021-07-28"
tags: ["wsl"]
---

# WSL이란?

WSL(Windows Subsystem for Linux)은 Windows 10에서 GNU/Linux의 명령행 도구, 유틸리티, 어플리케이션을 (거의) 네이티브로 사용할 수 있게 해 주는 시스템이다.

## 시스템 요구사항

### WSL1

WSL1은 특별한 시스템 요구사항이 없다.

### WSL2

WSL2를 설치하기 위한 시스템 요구사항은 다음과 같다.

- 버전 1903, OS 빌드번호 18362 이상의 64-bit Windows 10

참고로 `Win + R`키를 눌러 실행 창을 띄운 후 `winver`를 입력하고 "확인" 버튼을 누르면 시스템의 버전과 OS 빌드번호를 확인할 수 있다.

- Hyper-V 설치를 위한 시스템 요구사항이 모두 만족되어야 한다.

Powershell에서 `Systeminfo.exe`를 실행하면 가장 아래 "Hyper-V 요구 사항" 항목에서 현재 시스템이 Hyper-V 설치를 위한 시스템 요구사항을 만족시키는지 확인할 수 있다.

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

만약 "펌웨어에 가상화 사용"이 "아니오"로 되어 있다면 BIOS에서 가상화 기술(Virtualization Technology)을 활성화해야 한다.[^1] 가상화 기술을 지원하지 않는 구형 시스템에서는 WSL2를 사용할 수 없다.

[^1]: 시스템에 따라 가상화 기술은 다양한 이름으로 불리므로(ex. VT-x, AMD-V, SVM, Vanderpool 등) 자세한 사항은 CPU 제조사 및 메인보드 제조사의 메뉴얼을 확인하자. 또한 만약 Intel VT-d, AMD IOMMU 등의 이름을 가진 옵션이 있다면 이것들 역시 활성화해주자.

# WSL1 vs. WSL2



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

[Microsoft Store](https://aka.ms/wslstore)에서 원하는 리눅스 배포판을 다운받자. 2021년 07월 현재 사용 가능한 리눅스 배포판의 종류는 다음과 같다.

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

Ubuntu의 경우 Microsoft Store에 보면 "Ubuntu 18.04 LTS", "Ubuntu 20.04 LTS", 이렇게 버전명이 정확히 명시된 패키지도 있지만, 버전명이 명시되지 않은, 그냥 ["Ubuntu"](https://www.microsoft.com/store/apps/9nblggh4msv6)로 되어 있는 패키지도 있다. "Ubuntu" 패키지를 설치할 경우 가장 최신 버전의 Ubuntu LTS(2021년 07월 현재, Ubuntu 20.04 LTS)가 설치되는 것으로 보인다. 참고로 필자는 "Ubuntu" 패키지를 다운받아 설치했다.

설치가 끝났으면 해당 리눅스 배포판을 실행한다. 최초실행 시 초기화 작업(몇 분 정도 걸린다) 후 사용자 계정을 등록하는 프롬프트가 뜬다. 적당한 사용자명과 암호를 등록하면 WSL을 사용하기 위한 모든 준비가 완료된 것이다.

# wsl 명령어

WSL이 설치되었으면 Powershell과 cmd에서 `wsl` 명령어를 사용할 수 있다.

## Linux 바이너리 실행

{% highlight powershell %}
wsl <OPTION>... <CMD>
{% endhighlight %}

명령행(`<CMD>`)과 옵션(`<OPTION>`)이 없으면 `wsl`은 현재 cmd/Powershell 경로에서 "기본 배포판(Default Distribution)"의 쉘을 실행한다.

명령행(`<CMD>`)이 있으면 `wsl`은 "기본 배포판(Default Distribution)"의 "기본 쉘(Default Shell)"을 실행한 후 해당 쉘에서 명령행을 바로 수행하고 그 결과를 반환한다.

예를 들어,

{% highlight powershell %}
wsl ls -la
{% endhighlight %}

라 하면 Powershell/cmd에서 `ls -la` 명령을 실행한다. 즉, 현재 디렉토리의 파일 목록을 보여준다.

이를 이용하면 배치 스크립트에서 리눅스 명령행을 사용할 수 있다.

### --exec, -e

{% highlight powershell %}
wsl --exec <CMD>
{% endhighlight %}

`--exec` 옵션은 "기본 배포판"에서, 쉘을 사용하지 않고 명령행 `<CMD>`를 바로 수행하고 그 결과를 반환한다.

사실 `--exec` 옵션은 `--exec` 을 사용하지 않았을 때와 (거의) 차이가 없다.

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
wsl --export <DISTRO> <INSTALL_PATH> <FILENAME> [--version <version>]
{% endhighlight %}

저장된 tar 파일 `<FILENAME>`를 새 배포판 `<DISTRO>`로 가져온다. 이때 새 배포판은 `<INSTALL_PATH>`에 설치된다. `--version` 옵션을 사용하면 사용할 WSL 버전 `<version>`을 명시할 수 있다.

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

## --set-default, -s

{% highlight powershell %}
wsl --set-default <DISTRO>
{% endhighlight %}

배포판 `<DISTRO>`를 기본 배포판(Default Distribution)으로 설정한다.

### --set-version

다음 명령어를 사용하면 설치된 리눅스 배포판이 사용하는 WSL 버전을 변경할 수 있다.

{:.code-header}
리눅스 배포판 WSL 버전 변경하기

{% highlight powershell %}
wsl --set-version <distribution_name> <version_number>
{% endhighlight %}

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

### --set-default-version

다음 명령어를 사용하면 기본 WSL 버전을 설정할 수 있다.

{:.code-header}
기본 WSL 버전 설정

{% highlight powershell %}
wsl --set-default-version <version_number>
{% endhighlight %}

즉 만약 `wsl --set-default-version 2`를 하면, 새로운 리눅스 배포판을 설치할 때 기본적으로 WSL 2을 사용하게 된다는 것이다.[^2] 참고로 WSL이 처음 설치되었을 때 기본 WSL 버전은 1이다.

[^2]: 상술한 `wsl --set-version`을 이용하면 리눅스 배포판이 사용하는 WSL 버전을 얼마든지 바꿀 수 있긴 하다.

## 