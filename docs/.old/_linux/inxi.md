---
title: "inxi"
date_created: "2021-07-22"
date_modified: "2021-12-18"
tags: ["command"]
---

# Quick Start

{:.code-header}
기본적인 시스템 정보만 짧게 요약하여 출력

{% highlight bash %}
inxi -b
{% endhighlight %}


# 이름

inxi - Command line system information script for console and IRC

# 위치

- `/usr/bin/inxi`
- `/bin/inxi`

만약 시스템에 `inxi`가 설치되어 있지 않다면 다음과 같이 `apt`를 이용해 설치할 수 있다.

{% highlight bash %}
sudo apt install -y inxi
{% endhighlight %}

# 명령어 형식

{% highlight bash %}
inxi [OPTION]...
{% endhighlight %}

# 설명

`inxi`는 시스템 정보를 보여주는 명령행 도구이다. (실행 결과는 필자의 구형 노트북에서 실행한 결과이다.)

# 옵션

## -A, --audio : 오디오/사운드카드 정보 보기

{% highlight bash %}
inxi -A
{% endhighlight %}

{:.code-result}
{% highlight text %}
Audio:     Device-1: Intel Xeon E3-1200 v3/4th Gen Core Processor HD Audio driver: snd_hda_intel
           Device-2: Intel 8 Series/C220 Series High Definition Audio driver: snd_hda_intel
           Sound Server: ALSA v: k5.8.0-59-generic
{% endhighlight %}

오디오/사운드카드 및 사운드 드라이버 정보(디바이스명(device-x), 드라이버명(driver) 등)를 출력한다.

## -b, --basic : 시스템 정보 요약 보기

{% highlight bash %}
inxi -b
{% endhighlight %}

{:.code-result}
{% highlight text %}
System:    Host: phk-home-server Kernel: 5.8.0-59-generic x86_64 bits: 64 Console: tty 3
           Distro: Ubuntu 20.04.2 LTS (Focal Fossa)
Machine:   Type: Laptop System: Notebook product: WA50SBQ v: N/A serial: <superuser/root required>
           Mobo: Notebook model: WA50SBQ serial: <superuser/root required> UEFI: American Megatrends v: 1.03.06RHAf4
           date: 06/26/2015
Battery:   ID-1: BAT0 charge: 23.9 Wh condition: 23.9/44.5 Wh (54%)
CPU:       Dual Core: Intel Core i5-4210M type: MT MCP speed: 896 MHz min/max: 800/3200 MHz
Graphics:  Device-1: Intel 4th Gen Core Processor Integrated Graphics driver: i915 v: kernel
           Device-2: NVIDIA GM108M [GeForce 940M] driver: nvidia v: 460.73.01
           Display: server: X.org 1.20.9 driver: modesetting,nvidia unloaded: fbdev,nouveau,vesa tty: 209x52
           Message: Advanced graphics data unavailable in console. Try -G --display
Network:   Device-1: Intel Wireless 3160 driver: iwlwifi
           Device-2: Realtek RTL8111/8168/8411 PCI Express Gigabit Ethernet driver: r8169
Drives:    Local Storage: total: 5.12 TiB used: 901.39 GiB (17.2%)
Info:      Processes: 292 Uptime: 19d 21h 11m Memory: 11.59 GiB used: 3.50 GiB (30.2%) Init: systemd runlevel: 5 Shell: bash
           inxi: 3.0.38
{% endhighlight %}

`-v 2`랑 동일. 기본적인 시스템 정보만 짧게 요약하여 출력한다.

## -B, --battery : 배터리 정보 보기

{% highlight bash %}
inxi -B
{% endhighlight %}

{:.code-result}
{% highlight text %}
Battery:   ID-1: BAT0 charge: 23.9 Wh condition: 23.9/44.5 Wh (54%)
{% endhighlight %}

(시스템에 베터리가 존재한다면) 베터리 정보(ID-x, 전력(charge), 상태(condition) 등)를 출력한다. 만약 배터리가 존재하지 않는 시스템이면 `No battery data found`가 뜬다.

## -C, --cpu : CPU 정보 보기

{% highlight bash %}
inxi -C
{% endhighlight %}

{:.code-result}
{% highlight text %}
CPU:       Topology: Dual Core model: Intel Core i5-4210M bits: 64 type: MT MCP L2 cache: 3072 KiB
           Speed: 798 MHz min/max: 800/3200 MHz Core speeds (MHz): 1: 892 2: 838 3: 799 4: 799
{% endhighlight %}

CPU 정보(모델명(model), 구조(topology), 비트 수(bits), 종류(type), 클럭 속도(speed), 최고/최저 속도(min/max), 각 코어별 속도(core speed), L2 캐시 크기(L2 cache)) 등)를 보여준다.

참고로 CPU의 종류(type)는 다음 약어들을 사용해 나타낸다.

{:no-guide-line}
- MT, HT (Multi/Hyper Threaded CPU) : 하이퍼쓰레드 기술이 적용된 코어. 코어(core) 당 2개 이상의 쓰레드(thread)가 있다.
- MCM (Multi Chip Model) : CPU당 2개 이상의 다이(die)가 있다.
- MCP (Multi Core Processor) : CPU당 2개 이상의 코어(core)가 있다.
- SMP (Symmetric Multi Processing) : 2개 이상의 물리적 CPU가 있다.
- UP (Uni Processor) : 싱글코어 프로세서

## -D, --disk : 디스크 정보 보기

{% highlight bash %}
inxi -D
{% endhighlight %}

{:.code-result}
{% highlight text %}
Drives:    Local Storage: total: 5.12 TiB used: 901.39 GiB (17.2%)
           ID-1: /dev/sda vendor: Samsung model: MZMTE128HMGR-00000 size: 119.24 GiB
           ID-2: /dev/sdb type: USB vendor: Seagate model: BUP Portable size: 4.55 TiB
           ID-3: /dev/sdc vendor: HGST (Hitachi) model: HTS545050A7E680 size: 465.76 GiB
{% endhighlight %}

디스크 정보(전체 디스크 용량(total), 디스크 사용량(used), 각 디스크별 ID-x, 모델명(model), 제조사(vendor), 종류(type), 크기(size))를 출력한다.

디스크 사용량(used)에는 스왑 파티션(swap partition) 용량이 포함되어 있다.

## -f, --flags : CPU flag 보기

{% highlight bash %}
inxi -f
{% endhighlight %}

{:.code-result}
{% highlight text %}
CPU:       Topology: Dual Core model: Intel Core i5-4210M bits: 64 type: MT MCP L2 cache: 3072 KiB
           Speed: 898 MHz min/max: 800/3200 MHz Core speeds (MHz): 1: 898 2: 942 3: 979 4: 992
           Flags: abm acpi aes aperfmperf apic arat arch_perfmon avx avx2 bmi1 bmi2 bts clflush cmov constant_tsc cpuid
           cpuid_fault cx16 cx8 de ds_cpl dtes64 dtherm dts epb ept ept_ad erms est f16c flexpriority flush_l1d fma fpu
           fsgsbase fxsr ht ibpb ibrs ida invpcid invpcid_single lahf_lm lm mca mce md_clear mmx monitor movbe msr mtrr
           nonstop_tsc nopl nx pae pat pbe pcid pclmulqdq pdcm pdpe1gb pebs pge pln pni popcnt pse pse36 pti pts rdrand rdtscp
           rep_good sdbg sep smep ss ssbd sse sse2 sse4_1 sse4_2 ssse3 stibp syscall tm tm2 tpr_shadow tsc tsc_adjust
           tsc_deadline_timer vme vmx vnmi vpid xsave xsaveopt xtopology xtpr
{% endhighlight %}

모든 CPU 플래그(flag)를 출력한다. 

## -F, --full : 시스템 정보 보기

{% highlight bash %}
inxi -F
{% endhighlight %}

{:.code-result}
{% highlight text %}
System:    Host: ********** Kernel: 5.8.0-59-generic x86_64 bits: 64 Console: tty 3
           Distro: Ubuntu 20.04.2 LTS (Focal Fossa)
Machine:   Type: Laptop System: Notebook product: WA50SBQ v: N/A serial: <superuser/root required>
           Mobo: Notebook model: WA50SBQ serial: <superuser/root required> UEFI: American Megatrends v: 1.03.06RHAf4
           date: 06/26/2015
Battery:   ID-1: BAT0 charge: 23.9 Wh condition: 23.9/44.5 Wh (54%)
CPU:       Topology: Dual Core model: Intel Core i5-4210M bits: 64 type: MT MCP L2 cache: 3072 KiB
           Speed: 813 MHz min/max: 800/3200 MHz Core speeds (MHz): 1: 863 2: 869 3: 899 4: 880
Graphics:  Device-1: Intel 4th Gen Core Processor Integrated Graphics driver: i915 v: kernel
           Device-2: NVIDIA GM108M [GeForce 940M] driver: nvidia v: 460.73.01
           Display: server: X.org 1.20.9 driver: modesetting,nvidia unloaded: fbdev,nouveau,vesa tty: 209x52
           Message: Advanced graphics data unavailable in console. Try -G --display
Audio:     Device-1: Intel Xeon E3-1200 v3/4th Gen Core Processor HD Audio driver: snd_hda_intel
           Device-2: Intel 8 Series/C220 Series High Definition Audio driver: snd_hda_intel
           Sound Server: ALSA v: k5.8.0-59-generic
Network:   Device-1: Intel Wireless 3160 driver: iwlwifi
           IF: wlp3s0 state: down mac: **********
           Device-2: Realtek RTL8111/8168/8411 PCI Express Gigabit Ethernet driver: r8169
           IF: enp4s0f1 state: up speed: 100 Mbps duplex: full mac: **********
           IF-ID-1: br-87bc18694ecf state: up speed: 10000 Mbps duplex: unknown mac: **********
           IF-ID-2: docker0 state: down mac: **********
           IF-ID-3: veth0878262 state: up speed: 10000 Mbps duplex: full mac: **********
           IF-ID-4: ztuku2ofxl state: unknown speed: 10 Mbps duplex: full mac: **********
Drives:    Local Storage: total: 5.12 TiB used: 901.39 GiB (17.2%)
           ID-1: /dev/sda vendor: Samsung model: MZMTE128HMGR-00000 size: 119.24 GiB
           ID-2: /dev/sdb type: USB vendor: Seagate model: BUP Portable size: 4.55 TiB
           ID-3: /dev/sdc vendor: HGST (Hitachi) model: HTS545050A7E680 size: 465.76 GiB
Partition: ID-1: / size: 109.37 GiB used: 14.23 GiB (13.0%) fs: ext4 dev: /dev/sda1
           ID-2: /home size: 457.45 GiB used: 8.55 GiB (1.9%) fs: ext4 dev: /dev/sdc1
           ID-3: swap-1 size: 7.15 GiB used: 622.5 MiB (8.5%) fs: swap dev: /dev/sda3
Sensors:   System Temperatures: cpu: 60.0 C mobo: N/A
           Fan Speeds (RPM): N/A
Info:      Processes: 287 Uptime: 19d 21h 14m Memory: 11.59 GiB used: 3.48 GiB (30.1%) Init: systemd runlevel: 5 Shell: bash
           inxi: 3.0.38
{% endhighlight %}

`inxi`가 출력할 수 있는 (거의) 모든 정보를 다 출력한다. 몇몇 보안성이 높은 정보를 보기 위해서는 `sudo`로 실행해야 한다.

## -G, --graphics : 그래픽 카드 정보 보기

{% highlight bash %}
inxi -G
{% endhighlight %}

{:.code-result}
{% highlight text %}
Graphics:  Device-1: Intel 4th Gen Core Processor Integrated Graphics driver: i915 v: kernel
           Device-2: NVIDIA GM108M [GeForce 940M] driver: nvidia v: 460.73.01
           Display: server: X.org 1.20.9 driver: modesetting,nvidia unloaded: fbdev,nouveau,vesa tty: 209x52
           Message: Advanced graphics data unavailable in console. Try -G --display
{% endhighlight %}

그래픽 카드 정보(카드 정보(device-x), 드라이버(driver), 해상도(tty) 등)를 출력한다.

## -h, --help : 도움말 보기

도움말 보기

## -i, --ip : 네트워크 정보 보기

{% highlight bash %}
inxi -G
{% endhighlight %}

{:.code-result}
{% highlight text %}
Network:   Device-1: Intel Wireless 3160 driver: iwlwifi
           IF: wlp3s0 state: down mac: ************
           Device-2: Realtek RTL8111/8168/8411 PCI Express Gigabit Ethernet driver: r8169
           IF: enp4s0f1 state: up speed: 100 Mbps duplex: full mac: ************
           IP v4: ************ type: noprefixroute scope: global
           IP v6: ************ type: noprefixroute scope: link
           IF-ID-1: br-87bc18694ecf state: up speed: 10000 Mbps duplex: unknown mac: ************
           IP v4: ************ scope: global
           IP v6: ************ scope: link
           IF-ID-2: docker0 state: down mac: ************
           IP v4: ************ scope: global
           IF-ID-3: veth0878262 state: up speed: 10000 Mbps duplex: full mac: ************
           IF-ID-4: ztuku2ofxl state: unknown speed: 10 Mbps duplex: full mac: ************
           IP v4: ************ scope: global
           IP v6: ************ scope: link
           WAN IP: ************
{% endhighlight %}

네트워크 정보(WAN IP, 랜카드 정보(Device-x, IP주소, MAC주소, 속도(speed), duplex 등))를 출력한다. 랜카드 정보 출력을 위해서는 시스템에 `ifconfig` 또는 `ip` 명령어가 설치되어 있어야 한다.

## -I, --info : 시스템 실행 정보 보기

{% highlight bash %}
inxi -I
{% endhighlight %}

{:.code-result}
{% highlight text %}
Info:      Processes: 290 Uptime: 19d 21h 32m Memory: 11.59 GiB used: 3.55 GiB (30.6%) Init: systemd runlevel: 5 Shell: bash
           inxi: 3.0.38
{% endhighlight %}

시스템 및 `inxi` 실행 정보(현재 실행중인 프로세스 수(processes), 업타임(uptime), RAM 용량(memory), 메모리 사용량(used) 등)를 출력한다.

## -l, --label : 파티션 정보 보기

{% highlight bash %}
inxi -l
{% endhighlight %}

{:.code-result}
{% highlight text %}
Partition: ID-1: / size: 109.37 GiB used: 14.23 GiB (13.0%) fs: ext4 dev: /dev/sda1 label: N/A
           ID-2: /home size: 457.45 GiB used: 8.55 GiB (1.9%) fs: ext4 dev: /dev/sdc1 label: N/A
           ID-3: swap-1 size: 7.15 GiB used: 622.5 MiB (8.5%) fs: swap dev: /dev/sda3 label: N/A
{% endhighlight %}

파티션 정보(ID-x, 크기(size), 사용 용량(used), 파일시스템(fs), 위치(dev))를 출력한다. `-p` 옵션을 주면 모든 파티션(loop, snap, tmpfs 등)을 다 출력한다.

## -m, --memory : 메모리(RAM) 정보 보기

{% highlight bash %}
sudo inxi -m
{% endhighlight %}

{:.code-result}
{% highlight text %}
Memory:    RAM: total: 15.56 GiB used: 416.5 MiB (2.6%)
           Array-1: capacity: 64 GiB slots: 4 EC: None
           Device-1: DIMMA1 size: No Module Installed
           Device-2: DIMMA2 size: 8 GiB speed: 2400 MT/s
           Device-3: DIMMB1 size: No Module Installed
           Device-4: DIMMB2 size: 8 GiB speed: 2400 MT/s
{% endhighlight %}

메모리(RAM) 정보(전체 메모리 용량, 현재 메모리 사용량, 메모리 Array 별 용량, 슬롯(Slot) 수, Error Correction(EC) 여부, 실제 물리적 메모리(`Device`) 별 장착 위치, 크기, 속도, 종류 등)를 출력한다. 참고로 이 메모리 정보는 명시적으로 `-m` 옵션을 주지 않으면 `-F` 옵션 혹은 `-b` 옵션에서 보이지 않는다.

이 옵션은 `dmidcode` 명령어를 이용하기 때문에 `sudo`로 실행해야 한다.

## --memory-short : 메모리(RAM) 정보 보기

{% highlight bash %}
sudo inxi --memory-short
{% endhighlight %}

{:.code-result}
{% highlight text %}
Memory:    RAM: total: 62.74 GiB used: 782.5 MiB (1.2%)
           Report: arrays: 1 slots: 4 modules: 4 type: DDR4
{% endhighlight %}

메모리(RAM) 정보를 짧게 출력한다. 더 자세한 정보를 보고 싶으면 `-m` 옵션을 이용한다.

`-m` 옵션과 마찬가지로 이 옵션도 `dmidcode` 명령어를 이용하기 때문에 `sudo`로 실행해야 한다.

## -M : 머신 정보 보기

{% highlight bash %}
inxi -M
{% endhighlight %}

{:.code-result}
{% highlight text %}
Machine:   Type: Server System: ******** product: ******** v: ******** serial: ********
           Mobo: ******** model: ******** v: ******** serial: ******** UEFI: ******** v: ********
           date: ********
{% endhighlight %}

시스템 머신 정보(시스템 타입, 시스템 제조사, 시스템 모델, 시스템 시리얼 번호, 메인보드 제조사, 메인보드 모델, 메인보드 시리얼 번호, UEFI 버전 등)을 출력한다.

시리얼 번호 등과 같이 보안성이 있는 정보를 모두 보기 위해서는 `sudo`로 실행해야 한다.

## -N, --network : 네트워크 정보 보기

{% highlight bash %}
inxi -N
{% endhighlight %}

{:.code-result}
{% highlight text %}
Network:   Device-1: Intel Ethernet I219-V driver: ********
{% endhighlight %}

시스템에 장착된 네트워크 카드 및 네트워크 드라이버 정보를 출력한다. 더 자세한 정보를 보고 싶으면 `-n` 옵션을 이용한다.

{% highlight bash %}
inxi -Nx
{% endhighlight %}

{:.code-result}
{% highlight text %}
Network:   Device-1: Intel Ethernet I219-V vendor: Super Micro driver: ******** v: ********
           port: ******** bus ID: ********
{% endhighlight %}

`-x` 옵션과 함께 사용하면 PCI Bus ID와 포트 번호까지도 볼 수 있다.

## -n, --network-advanced : 네트워크 정보 보기

{% highlight bash %}
inxi -n
{% endhighlight %}

{:.code-result}
{% highlight text %}
Network:   Device-1: Intel Ethernet I219-V driver: ********
           IF: eno1 state: up speed: 1000 Mbps duplex: full mac: ********
           IF-ID-1: docker0 state: down mac: ********
{% endhighlight %}

시스템에 장착된 네트워크 카드 및 네트워크 드라이버에 대해 `-N` 옵션보다 훨씬 자세한 정보를 출력한다.

## -P, --partitions : 파티션 정보 보기

{% highlight bash %}
inxi -P
{% endhighlight %}

{:.code-result}
{% highlight text %}
Partition: ID-1: / size: 250.98 GiB used: 9.58 GiB (3.8%) fs: ext4 dev: /dev/nvme0n1p2
           ID-2: /home size: 685.42 GiB used: 25.92 GiB (3.8%) fs: ext4 dev: /dev/nvme0n1p3
{% endhighlight %}

시스템에 마운트된 파티션 정보를 간략하게 출력한다.

구체적으로, `/`, `/boot`, `/home`, `/opt`, `/tmp`, `/usr`, `/usr/home`, `/var`, `/var/tmp`, `/var/log`에 마운드된 파티션을 (존재한다면) 출력한다. 더 자세한 피티션 정보를 보고 싶으면 `-p` 옵션을 이용한다.

## -p, --partitions-full : 파티션 정보 보기

{% highlight bash %}
inxi -p
{% endhighlight %}

{:.code-result}
{% highlight text %}
Partition: ID-1: / size: 250.98 GiB used: 9.58 GiB (3.8%) fs: ext4 dev: /dev/nvme0n1p2
           ID-2: /boot/efi size: 511.0 MiB used: 5.2 MiB (1.0%) fs: vfat dev: /dev/nvme0n1p1
           ID-3: /home size: 685.42 GiB used: 25.92 GiB (3.8%) fs: ext4 dev: /dev/nvme0n1p3
           ID-4: /snap/bpytop/249 raw size: 360 KiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop7
           ID-5: /snap/core18/2128 raw size: 55.4 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop0
           ID-6: /snap/core18/2253 raw size: 55.5 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop3
           ID-7: /snap/core20/1242 raw size: 61.8 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop1
           ID-8: /snap/lxd/21029 raw size: 70.3 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop4
           ID-9: /snap/lxd/21835 raw size: 67.2 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop2
           ID-10: /snap/snapd/12704 raw size: 32.3 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop5
           ID-11: /snap/snapd/14066 raw size: 42.2 MiB size: N/A (hidden?) used: N/A (hidden?)
           fs: squashfs dev: /dev/loop6
{% endhighlight %}

(시스템에 마운트된) 파티션 정보를 `-P` 옵션보다 훨씬 자세히 출력한다.

loop, snap, tmpfs 등의 파티션 정보를 전부 보려면 `sudo`로 실행해야 한다.

## -o, --unmounted : 마운트되지 않은 파티션 정보 보기

{% highlight bash %}
inxi -o
{% endhighlight %}

{:.code-result}
{% highlight text %}
Unmounted: ID-1: /dev/sda1 size: 931.51 GiB fs: ntfs label: N/A uuid: B2FEA058FEA0171F
           ID-2: /dev/sdb1 size: 931.51 GiB fs: ntfs label: N/A uuid: 0C72B0C972B0B932
           ID-3: /dev/sdc1 size: 931.51 GiB fs: ntfs label: N/A uuid: 60FC3B54FC3B2426
{% endhighlight %}

시스템에 마운트되지 않은 파티션 정보를 보여준다.

## -r, --repos : 설치된 저장소 정보 보기

{% highlight bash %}
inxi -r
{% endhighlight %}

{:.code-result}
{% highlight text %}
Repos:     Active apt repos in: /etc/apt/sources.list
           1: deb http://mirror.kakao.com/ubuntu focal main restricted
           2: deb http://mirror.kakao.com/ubuntu focal-updates main restricted
           3: deb http://mirror.kakao.com/ubuntu focal universe
           4: deb http://mirror.kakao.com/ubuntu focal-updates universe
           5: deb http://mirror.kakao.com/ubuntu focal multiverse
           6: deb http://mirror.kakao.com/ubuntu focal-updates multiverse
           7: deb http://mirror.kakao.com/ubuntu focal-backports main restricted universe multiverse
           8: deb http://mirror.kakao.com/ubuntu focal-security main restricted
           9: deb http://mirror.kakao.com/ubuntu focal-security universe
           10: deb http://mirror.kakao.com/ubuntu focal-security multiverse
           11: deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable
{% endhighlight %}

설치된 저장소(distro repository) 정보를 출력한다. 2021년 11월 현재 `inxi`가 지원하는 저장소 종류는 다음과 같다.

- APK
- APT
- CARDS
- EOPKG
- PACMAN
- PACMAN-G2
- PISI
- PORTAGE
- PORTS
- SLACKPKG
- TCE
- URPMQ
- XBPS
- YUM/ZYPP

## -R, --raid : RAID 정보 보기

{% highlight bash %}
inxi -R
{% endhighlight %}

{:.code-result}
{% highlight text %}
RAID:      Message: No RAID data was found.
{% endhighlight %}

시스템에 구성된 RAID 정보를 출력한다. `-x` 혹은 `-xx` 옵션을 붙이면 더 자세한 정보를 볼 수 있다.

## -S, --system : 시스템 정보 보기

{% highlight bash %}
inxi -S
{% endhighlight %}

{:.code-result}
{% highlight text %}
System:    Host: ******** Kernel: 5.4.0-90-generic x86_64 bits: 64 Console: tty 0
           Distro: Ubuntu 20.04.3 LTS (Focal Fossa)
{% endhighlight %}

시스템 정보(호스트명, 커널 버전, 비트 수, 배포 버전 등)를 출력한다.

## -t, --processes : 프로세스 정보 보기

{% highlight bash %}
inxi -t
{% endhighlight %}

{:.code-result}
{% highlight text %}
Processes: CPU top: 5
           1: cpu: 0.2% command: containerd pid: 978
           2: cpu: 0.0% command: init pid: 1
           3: cpu: 0.0% command: [kthreadd] pid: 2
           4: cpu: 0.0% command: [rcu_gp] pid: 3
           5: cpu: 0.0% command: [rcu_par_gp] pid: 4
           System RAM: total: 62.74 GiB used: 782.6 MiB (1.2%)
           Memory top: 5
           1: mem: 74.5 MiB (0.1%) command: dockerd pid: 1060
           2: mem: 60.6 MiB (0.0%) command: jupyter-lab started by: python pid: 917
           3: mem: 45.5 MiB (0.0%) command: systemd-journald pid: 452
           4: mem: 41.0 MiB (0.0%) command: containerd pid: 978
           5: mem: 37.5 MiB (0.0%) command: snapd pid: 933
{% endhighlight %}

현재 실행중인 프로세스 정보를 출력한다. 아무런 옵션을 주지 않으면 CPU 사용량이 가장 높은 프로세스 상위 5개, 메모리 사용량이 가장 높은 프로세스 상위 5개를 출력한다.

{% highlight bash %}
inxi -t c
{% endhighlight %}

{:.code-result}
{% highlight text %}
Processes: CPU top: 5
           1: cpu: 0.2% command: containerd pid: 978
           2: cpu: 0.0% command: init pid: 1
           3: cpu: 0.0% command: [kthreadd] pid: 2
           4: cpu: 0.0% command: [rcu_gp] pid: 3
           5: cpu: 0.0% command: [rcu_par_gp] pid: 4
{% endhighlight %}

`c` 추가옵션을 주면 CPU 사용량이 가장 높은 프로세스 상위 5개만 출력한다. `c10`과 같이 하면 상위 10개의 프로세스를 출력한다.

{% highlight bash %}
inxi -t m
{% endhighlight %}

{:.code-result}
{% highlight text %}
Processes: System RAM: total: 62.74 GiB used: 782.6 MiB (1.2%)
           Memory top: 5
           1: mem: 74.5 MiB (0.1%) command: dockerd pid: 1060
           2: mem: 60.6 MiB (0.0%) command: jupyter-lab started by: python pid: 917
           3: mem: 45.5 MiB (0.0%) command: systemd-journald pid: 452
           4: mem: 41.0 MiB (0.0%) command: containerd pid: 978
           5: mem: 37.5 MiB (0.0%) command: snapd pid: 933
{% endhighlight %}

`m` 추가옵션을 주면 메모리 사용량이 가장 높은 프로세스 상위 5개만 출력한다. `m10`과 같이 하면 상위 10개의 프로세스를 출력한다.

{% highlight bash %}
inxi -t cm10
{% endhighlight %}

{:.code-result}
{% highlight text %}
Processes: CPU top: 10
           1: cpu: 0.2% command: containerd pid: 978
           2: cpu: 0.0% command: init pid: 1
           3: cpu: 0.0% command: [kthreadd] pid: 2
           4: cpu: 0.0% command: [rcu_gp] pid: 3
           5: cpu: 0.0% command: [rcu_par_gp] pid: 4
           6: cpu: 0.0% command: [kworker/0:0h-kblockd] pid: 6
           7: cpu: 0.0% command: [mm_percpu_wq] pid: 9
           8: cpu: 0.0% command: [ksoftirqd/0] pid: 10
           9: cpu: 0.0% command: [rcu_sched] pid: 11
           10: cpu: 0.0% command: [migration/0] pid: 12
           System RAM: total: 62.74 GiB used: 782.8 MiB (1.2%)
           Memory top: 10
           1: mem: 74.5 MiB (0.1%) command: dockerd pid: 1060
           2: mem: 60.6 MiB (0.0%) command: jupyter-lab started by: python pid: 917
           3: mem: 45.5 MiB (0.0%) command: systemd-journald pid: 452
           4: mem: 41.0 MiB (0.0%) command: containerd pid: 978
           5: mem: 37.5 MiB (0.0%) command: snapd pid: 933
           6: mem: 20.6 MiB (0.0%) command: unattended-upgrade-shutdown started by: python3 pid: 1297
           7: mem: 20.6 MiB (0.0%) command: networkmanager pid: 911
           8: mem: 17.8 MiB (0.0%) command: networkd-dispatcher started by: python3 pid: 920
           9: mem: 17.7 MiB (0.0%) command: multipathd pid: 797
           10: mem: 14.4 MiB (0.0%) command: udisksd pid: 936
{% endhighlight %}

`cm` 혹은 `mc` 추가옵션을 주면 CPU 사용량이 가장 높은 프로세스 상위 5개, 메모리 사용량이 가장 높은 프로세스 상위 5개를 모두 출력한다(즉, 아무 추가옵션을 주지 않았을 때와 같다). `cm10`과 같이 하면 CPU 사용량이 높음 프로세스 상위 10개와 메모리 사용량이 높은 프로세스 상위 10개를 출력한다.

{% highlight bash %}
inxi -t -x
{% endhighlight %}

{:.code-result}
{% highlight text %}
Processes: CPU top: 5
           1: cpu: 0.2% command: containerd pid: 978 mem: 41.0 MiB (0.0%)
           2: cpu: 0.0% command: init pid: 1 mem: 12.8 MiB (0.0%)
           3: cpu: 0.0% command: [kthreadd] pid: 2 mem: 0.00 MiB (0.0%)
           4: cpu: 0.0% command: [rcu_gp] pid: 3 mem: 0.00 MiB (0.0%)
           5: cpu: 0.0% command: [rcu_par_gp] pid: 4 mem: 0.00 MiB (0.0%)
           System RAM: total: 62.74 GiB used: 782.9 MiB (1.2%)
           Memory top: 5
           1: mem: 74.5 MiB (0.1%) command: dockerd pid: 1060 cpu: 0.0%
           2: mem: 60.6 MiB (0.0%) command: jupyter-lab started by: python pid: 917 cpu: 0.0%
           3: mem: 45.5 MiB (0.0%) command: systemd-journald pid: 452 cpu: 0.0%
           4: mem: 41.0 MiB (0.0%) command: containerd pid: 978 cpu: 0.2%
           5: mem: 37.5 MiB (0.0%) command: snapd pid: 933 cpu: 0.0%
{% endhighlight %}

`-x` 추가옵션을 주면 CPU 사용량이 가장 높은 프로세스들 옆에 각 프로세스들의 메모리 사용량을, 메모리 사용량이 가장 높은 프로세스들 옆에 각 프로세스들의 CPU 사용량을 함께 출력한다.

## --usb : USB 정보 보기

{% highlight bash %}
inxi --usb
{% endhighlight %}

{:.code-result}
{% highlight text %}
USB:       Hub: 1-0:1 info: Full speed (or root) Hub ports: 2 rev: 2.0
           Hub: 1-1:2 info: Intel ports: 6 rev: 2.0
           Hub: 2-0:1 info: Full speed (or root) Hub ports: 2 rev: 2.0
           Hub: 2-1:2 info: Intel ports: 8 rev: 2.0
           Hub: 3-0:1 info: Full speed (or root) Hub ports: 14 rev: 2.0
           Device-1: 3-7:2 info: Intel type: Bluetooth rev: 2.0
           Hub: 4-0:1 info: Full speed (or root) Hub ports: 4 rev: 3.0
           Device-2: 4-1:2 info: Seagate RSS LLC BUP Portable type: Mass Storage rev: 3.2
{% endhighlight %}

시스템에 있는 USB 허브들의 정보(포트 개수, USB 버전 등) 및 연결된 장치들의 정보를 출력한다. 단, 검색된 USB 포트들은 항상 external한 포트가 아닐 수도 있다(시스템 내부적으로 사용되는 포트일 수도 있다).

## -V, --version

버전 보기




