---
title: "[VirtualBox] WSL2로 인한 VirtualBox VM 실행 불가 문제 해결"
tags: ["virtualbox", "wsl"]
date_created: "2020-09-02"
date_modified: "2020-09-02"
---

WSL2는 Hyper-V 기술을 사용한다. Oracle VM VirtualBox는 Hyper-V와 함께 사용할 수 없기에, WSL2가 설치된 컴퓨터에서 VirtualBox는 정상적으로 작동하지 않는다.[^1]

[^1]: Oracle VM VirtualBox 6.0부터 Hyper-V가 설치된 시스템에서도 Oracle VM VirtualBox를 정상적으로 실행할 수 있는 실험적 기능이 추가되었다고 하나, 필자의 컴퓨터에서 실험해본 결과 가상머신이 아예 실행이 안되거나, 실행이 되도 내부적으로 많은 오류가 발생하는 것을 확인하였다. 2020년 9월 현재까지는 Oracle VM VirtualBox와 Hyper-V는 동시에 사용할 수 없는 것으로 보인다. Oracle이 Hyper-V와 VirtualBox를 같이 쓸 수 있도록 업데이트를 진행할 예정이라고 하니 조금 더 기다려 보자.

VirtualBox를 정상적으로 사용하기 위해서는

- WSL을 제거하거나
- WSL2를 WSL1으로 다운그레이드하거나
- Hyper-V를 꺼야 한다.

# WSL 제거

Windows 기능 켜기/끄기에서 "Linux용 Windows 하위 시스템"의 체크를 해제하면 된다.

재설치 시에는 다시 체크를 해 주면 된다.

# WSL2를 WSL1으로 다운그레이드하기

관리자 권한으로 PowerShell을 열고 다음 명령어를 입력하여 설치된 리눅스 배포의 종류와 WSL 버전을 확인한다.

{% highlight powershell %}
wsl --list --verbose
{% endhighlight %}

다음 명령어를 입력하면 특정 배포의 WSL 버전을 1로 낮출 수 있다.

{% highlight powershell %}
wsl --set-version <distribution name> 1
{% endhighlight %}

VirtualBox를 모두 사용하고 난 후 다시 WSL2로 버전을 올리고 싶다면 다음 명령어를 입력한다.

{% highlight powershell %}
wsl --set-version <distribution name> 2
{% endhighlight %}

# Hyper-V 끄기

관리자 권한으로 PowerShell을 열고 다음 명령어를 입력한다.

{% highlight powershell %}
bcdedit
{% endhighlight %}

위 명령어를 입력하면 다양한 항목이 나오는데, 그 중 "hypervisorlaunchtype" 항목이 "Auto"로 되어 있으면 Hyper-V가 켜져 있는 것이다.

Hyper-V를 끄기 위해선 다음 명령어를 입력한다.

{% highlight powershell %}
bcdedit /set hypervisorlaunchtype off
{% endhighlight %}

위 명령어를 입력한 후 다시 `bcdedit`을 입력하면 "hypervisorlaunchtype" 항목이 "Off"로 나오는 것을 확인할 수 있다. 이제 시스템을 **재부팅**하면 Hyper-V가 종료된다.

VirtualBox를 모두 사용하고 난 후 다시 Hyper-V를 켜려면 다음 명령어를 입력한다.

{% highlight powershell %}
bcdedit /set hypervisorlaunchtype auto
{% endhighlight %}