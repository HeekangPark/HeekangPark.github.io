---
title: "WSL - Windows Subsystem for Linux"
date_created: "2021-07-26"
date_modified: "2021-07-27"
tags: ["wsl"]
---

# WSL이란?

WSL(Windows Subsystem for Linux)은 Windows 10에서 GNU/Linux의 명령행 도구, 유틸리티, 어플리케이션을 (거의) 네이티브로 사용할 수 있게 해 주는 시스템이다.

# WSL 설치하기

## 시스템 요구사항

WSL1은 특별한 시스템 요구사항이 없다.

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