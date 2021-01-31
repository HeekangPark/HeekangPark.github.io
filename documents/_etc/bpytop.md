---
title: "bpytop"
tags: ["bpytop", "ubuntu", "snap"]
date: "2021-02-01"
---

Windows의 경우 작업 관리자를 이용하면 시스템 상태를 빠르게 확인할 수 있다. 작업 관리자는 현재 실행중인 프로세스, CPU 점유율, 메모리 사용량, HDD/SSD 읽기/쓰기 속도 등을 GUI로 보여주어 시스템의 현재 상태를 빠르게 파악할 수 있게 해 준다.

[`bpytop`](https://github.com/aristocratos/bpytop)은 리눅스(우분투) 환경에서 시스템 상태를 빠르게 확인해볼 수 있는 유틸리티이다. Python 3을 이용해 제작되었다고 한다. 레트로 게임같은 UI가 인상적이다.

{% include caption-img.html src="https://github.com/aristocratos/bpytop/raw/master/Imgs/main.png" outside_img="true" description="Main UI(theme: default)" %}

{% include caption-img.html src="https://github.com/aristocratos/bpytop/raw/master/Imgs/menu.png" outside_img="true" description="Menu" %}

# 설치

Ubuntu에서는 snap을 이용하면 아주 쉽게 설치할 수 있다.

{% highlight bash %}
# 패키지 설치
$ sudo snap install bpytop

# 권한 부여
$ sudo snap connect bpytop:mount-observe
$ sudo snap connect bpytop:network-control
$ sudo snap connect bpytop:hardware-observe
$ sudo snap connect bpytop:system-observe
$ sudo snap connect bpytop:process-control
$ sudo snap connect bpytop:physical-memory-observe

# 실행
$ bpytop
{% endhighlight %}