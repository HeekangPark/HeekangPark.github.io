---
title: "LVM (Logical Volume Manager)"
date_created: "2021-12-27"
date_modified: "2021-12-29"
---

# LVM(Logical Volume Manager)이란?

컴퓨터공학을 관통하는 핵심 개념 중 하나는 추상화(abstraction)이다. 여러 요소들이 복잡하게 상호작용하는 시스템에서 적절한 추상화는 시스템 전체의 복잡성은 낮추면서 각 요소별 자유도는 높일 수 있다.

LVM은 리눅스 커널이 제공하는, 저장 장치에 대한 추상화 기능이다. LVM을 사용하지 않으면 사용자는 저장 장치에 직접 접근해 작업을 수행해야 했다. 하지만 LVM을 사용하면 사용자는 LVM이 만든 추상화된 '가상'의 저장 장치에 접근해 작업을 수행하게 된다.

LVM을 이용하면 사용자는 훨씬 유연하게 저장 장치를 구성해 사용할 수 있다. 예를 들어, 물리적으로 분리된 여러 개의 저장 장치가 마치 하나의 저장 장치인 것처럼 사용할 수도 있고, 반대로 하나의 저장 장치를 여러 개의 장치인 양 분리해 사용할 수도 있다! 온갖 복잡한 처리는 LVM이 대신 해 주기에 사용자는 실제 저장 장치가 어떻게 구성되어 있는지 생각할 필요 없이 읽기/쓰기에만 집중할 수 있고, 반대로 LVM은 다양한 설정을 자유롭게 할 수 있어 아주 편리하다.

## LVM vs. RAID

LVM과 비슷하게 RAID(Redundant Array of Independent Disks)도 여러 저장 장치를 통합하는 기술이어서 헷갈릴 수 있다. 하지만 LVM과 RAID는 완전 별개의 기술이다. RAID는 저장장치의 신뢰성을 높이고(mirroring) 데이터 처리 속도를 높이기 위한(stripping) 기술이다. 하지만 LVM은 저 두 가지 목적뿐만 아니라 저장 장치 통합, 분할, 확장 등 훨씬 다양한 목적을 위해서 사용할 수 있는, 훨씬 더 진보된 기술이다. 또한 RAID는 관리 주체가 하드웨어(하드웨어 RAID) 또는 프로세스(소프트웨어 RAID)이지만, LVM은 커널이 직접 관리한다.

하드웨어 RAID의 경우, 하드웨어 단에서 제공하는 기능이기 때문에 커널이 맛이 가더라도 데이터를 유지할 수 있다는 장점이 있다. 그래서 데이터 안정성이 중요한 서버 등에서는 하드웨어 RAID를 사용한다. 그러나 2021년 현재 적어도 소프트웨어 RAID의 경우, 소프트웨어 RAID로 할 수 있는 모든 일은 LVM으로도 할 수 있다. 인터넷 옛 글들을 뒤지다 보면 LVM 위에 소프트웨어 RAID 올리기(RAID on LVM), 소프트웨어 RAID 위에 LVM 올리기(LVM on RAID) 등의 방법을 설명하는 글들이 있는데, 2021년 현재 굳이 그런 식으로 구성할 이유는 없을 것 같다.

# LVM 기본 개념

LVM을 사용하기 위한 기초 개념들을 알아보자.

## PV (Physical Volume)

LVM을 사용하려면 가장 먼저 물리적 저장 장치[^2]를(조금 더 정확히는, 파티션(Partition)을) **PV(Physical Volume)**로 초기화해야 한다. 물리적 저장 장치를 PV로 초기화하면 LVM은 물리적 저장 장치를 **PE(Physical Extent)**라 불리는, 일정한 크기(4MB)의 작은 저장 공간들로 쪼갠다.

[^2]: HDD, SSD 등

{% include caption-img.html src="lvm-pv.png" title="Fig.01 PV(Physical Volume)" description="2개의 물리적 저장 장치를 3개의 PV(<code class='language-plaintext highlighter-rouge'>PV-1-1</code>, <code class='language-plaintext highlighter-rouge'>PV-1-2</code>, <code class='language-plaintext highlighter-rouge'>PV-2-1</code>)로 나누었다. LVM은 PV가 PE라 불리는, 일정한 크기의 작은 저장 공간들의 집합으로 구성되어 있다고 이해한다." %}

## VG (Volume Group)

**VG(Volume Group)**은 한 개 혹은 여러 개의 PV들의 집합을 의미한다. VG를 사용함으로서 개별 물리적 저장 장치는 숨겨지고, PE들의 풀(pool)인 VG만 보이게 되는 것이다. LVM은 필요한 만큼 필요한 구성의 PE들을 적당히 가져가 (아래 후술할) LV를 만들게 된다.

{% include caption-img.html src="lvm-vg.png" title="Fig.02 VG(Volume Group)" description="세 개의 PV를 두 개의 VG(<code class='language-plaintext highlighter-rouge'>VG-OS</code>, <code class='language-plaintext highlighter-rouge'>VG-Data</code>)로 나누었다. 이처럼 VG는 물리적 저장 장치를 넘어 여러 PV들을 하나로 모을 수도 있고, 한 물리적 장치를 나누어 여러 개의 VG를 구성할 수도 있다. 일반적으로 VG부터 semantic한 의미를 가질 수 있으므로 위 그림처럼 사용 목적 등을 쉽게 구분할 수 있는 이름을 붙인다." %}

## LV (Logical Volume)

사용자가 실제로 다룰 수 있는, 눈에 보이는 최종적인 저장 장치를 **LV(Logical Volume)**라 한다. 사용자는 이렇게 만들어진 LV를 (마치 일반 저장 장치를 사용할 때처럼) 마운트(mount) 해 사용하면 된다. PV → VG → LV로 이어지는 과정 속에서 실제 물리적 장치(PV)는 숨겨지고, 사용자는 추상화된 논리적 장치(LV)만을 다룰 수 있게 되는 것이다.

{% include caption-img.html src="lvm-lv.png" title="Fig.03 LV(Logical Volume)" description="<code class='language-plaintext highlighter-rouge'>VG-OS</code>, <code class='language-plaintext highlighter-rouge'>VG-Data</code>를 각각 한 개(<code class='language-plaintext highlighter-rouge'>LV-OS-1</code>), 두 개(<code class='language-plaintext highlighter-rouge'>LV-Data-1</code>, <code class='language-plaintext highlighter-rouge'>LV-Data-2</code>)의 LV로 나누었다. 이처럼 한 VG 안에 한 개의 LVM을 만들 수도 있고, 여러 LV를 만들 수도 있다. 또 반드시 VG 안의 모든 PE들을 다 배정해야 하는 것은 아니다. 이렇게 남은 PE들은 추후 다른 LV에 자유롭게 붙였다 뗄 수도 있다(자유롭게 LV의 용량을 바꿀 수 있다)." %}

LV는 **LE(Logical Extent)**라 불리는, 일정한 크기(4MB)의 작은 저장 공간들로 구성되어 있다.[^3] LE와 PE는 같은 크기를 가지고, 서로 매핑된다. LE와 PE를 어떻게 매핑하느냐에 따라 다양한 기능을 사용할 수 있다. 예를 들어 두 개의 PE를 한 LE에 매핑한다면 미러링(mirroring)을 달성할 수 있다.[^4] 여러 개의 PV의 PE들에 LE를 번갈아가며 매핑시키면 스트라이핑(stripping)을 달성할 수 있다.[^5]

[^3]: 따라서 LE보다 작은 크기의 LV를 만들 수는 없다.
[^4]: 이런 식으로 매핑된 LV를 mirrored LV라 한다.
[^5]: 이런 식으로 매핑된 LV를 striped LV라 한다.

{% include caption-img.html src="lvm-pe-le.png" title="Fig.04 PE와 LE의 매핑" description="LE와 PE를 어떻게 매핑하느냐에 따라 다양한 기능을 사용할 수 있다. Fig.03에서는 linear LV를 보여주고 있다. linear LV는 아무런 기능이 없는 가장 기본적인 형태의 LV이다. Fig.04의 왼쪽 LV는 mirrored LV를 보여주고 있다. mirrored LV를 사용하면 데이터 안정성을 높일 수 있다(RAID 1과 유사). Fig.04의 왼쪽 LV는 striped LV를 나타낸다. striped LV를 사용하면 더 빠른 속도로 데이터를 읽고 쓸 수 있다(RAID 0과 유사)" %}

# 만들어 보기

3개의 1TB HDD를 LVM으로 묶어 RAID 5가 구성된 2TB짜리 단일 저장 장치로 만들어 보자.

## step 0 : 사전 준비

가장 먼저 각 저장 장치의 이름을 알아야 한다. `fdisk` 등의 명령어를 이용해 각 저장 장치의 이름을 확인한다.

{:.code-header}
저장 장치 이름 확인하기

{% highlight bash %}
sudo fdisk -l
{% endhighlight %}

{:.code-result}
{% highlight text %}
(전략)

Disk /dev/sda: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xb041de8d

Disk /dev/sdb: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xc387f2e6


Disk /dev/sdc: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xa3055233

(후략)
{% endhighlight %}

각 HDD의 이름이 `/dev/sda`, `/dev/sdb`, `/dev/sdc`인 것을 확인할 수 있다.[^10]

[^10]: 컴퓨터마다 다를 것이다.

이제 각 저장 장치에 대해 `fdisk` 프롬프트를 연다.[^11]

[^11]: 4TB 이상의 고용량 저장 장치의 경우 `fdisk`를 이용해 아래처럼 파티션을 만들 수 없다. 고용량 저장 장치를 사용하는 경우 아래 문단을 참고하자.

{:.code-header}
fdisk 프롬프트 열기 (/dev/sda)

{% highlight bash %}
sudo fdisk /dev/sda
{% endhighlight %}

`fdisk` 프롬프트에서, 현재 파티션 정보는 `p`를 입력하면 볼 수 있다.

<p class="pseudo-code-header"><span class="subtitle">[fdisk 프롬프트]</span> 현재 파티션 정보 보기</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">Command (m for help):</span> <span class="input">p</span>

<pre>Disk /dev/sda: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xb041de8d</pre>

</div>

만약 위와 같이 아무런 파티션이 없다면 `n`을 입력해 하나 만들어준다.[^12]

[^12]: 파티션보다 LVM이 더 상위호환의 기술이다. 기존에 잘 작동하던 파티션을 밀고 LVM이 모두 관리하도록 할 것 까진 없지만(OS가 설치된 저장 장치의 파티션을 잘못 수정했다간 부팅이 안될 수도 있다!), 이처럼 새로운 디스크에 파티션을 새로 만들어야 하는 상황이라면, 파티션을 나누기보단 그냥 한 덩어리 전체(기본 설정값)를 통째로 한 파티션으로 만들고, LVM에서 나누는 것이 훨씬 좋다.

<p class="pseudo-code-header"><span class="subtitle">[fdisk 프롬프트]</span> 새 파티션 만들기</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">Command (m for help):</span> <span class="input">n</span>

<pre>Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)</pre>

<span class="prompt">Select (default p):</span> <span class="input">(Enter)</span>

<span class="prompt">Partition number (1-4, default 1):</span> <span class="input">(Enter)</span>

<span class="prompt">First sector (2048-1953525167, default 2048):</span> <span class="input">(Enter)</span>

<span class="prompt">Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-1953525167, default 1953525167):</span> <span class="input">(Enter)</span>

<pre>Created a new partition 1 of type 'Linux' and of size 931.5 GiB.</pre>

{:.mt-2}
<span class="prompt">Command (m for help):</span> <span class="input">p</span>

<pre>Disk /dev/sda: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xb041de8d

Device     Boot Start        End    Sectors   Size Id Type
/dev/sda1        2048 1953525167 1953523120 931.5G 83 Linux</pre>

</div>

이제 `t`를 입력해 파티션을 `Linux LVM` 포멧으로 포멧팅한다.

<p class="pseudo-code-header"><span class="subtitle">[fdisk 프롬프트]</span> Linux LVM 포멧으로 포멧팅하기</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">Command (m for help):</span> <span class="input">t</span>

<span>Selected partition 1</span>[^13]

<span class="prompt">Hex code (type L to list all codes):</span> <span class="input">L</span>

<pre>
 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden or  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi ea  Rufus alignment
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         eb  BeOS fs
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ee  GPT
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        ef  EFI (FAT-12/16/
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f0  Linux/PA-RISC b
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f1  SpeedStor
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f4  SpeedStor
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      f2  DOS secondary
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fb  VMware VMFS
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fc  VMware VMKCORE
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fd  Linux raid auto
1c  Hidden W95 FAT3 75  PC/IX           bc  Acronis FAT32 L fe  LANstep
1e  Hidden W95 FAT1 80  Old Minix       be  Solaris boot    ff  BBT
</pre>

<span class="prompt">Hex code (type L to list all codes):</span> <span class="input">8e</span>[^14]

<pre>Changed type of partition 'Linux' to 'Linux LVM'.</pre>

{:.mt-2}
<span class="prompt">Command (m for help):</span> <span class="input">p</span>

<pre>Disk /dev/sda: 931.53 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: **************
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0xb041de8d

Device     Boot Start        End    Sectors   Size Id Type
/dev/sda1        2048 1953525167 1953523120 931.5G 8e Linux LVM</pre>

</div>

[^13]: 이 예시에서는 저장 장치에 파티션이 하나만 있기에 자동으로 첫 번째 파티션이 선택된 것이다. 만약 파티션이 여러 개 있다면 어떤 파티션을 포멧팅할 건지 선택하는 프롬프트가 추가로 나온다.
[^14]: 필자의 컴퓨터에선 `Linux LVM`의 Hex Code가 `8e`였기에 이렇게 입력했지만, `fdisk` 버전에 따라 다른 값(`31`)이 사용되는 경우도 있다. `L`을 입력해 `fdisk`가 사용하는 Hex Code를 확인하고 입력하자.

포멧팅을 완료했으면 `w`를 입력해 파티션을 저장하고 `fdisk` 프롬프트를 종료한다.

<p class="pseudo-code-header"><span class="subtitle">[fdisk 프롬프트]</span> 저장 및 종료</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">Command (m for help):</span> <span class="input">w</span>

<pre>The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.</pre>

</div>

이 과정을 나머지 두 장치(`/dev/sdb`, `/dev/sdc`)에 대해서도 수행한다.

### 고용량 저장 장치의 경우

4TB 이상의 고용량 저장 장치의 경우 `fdisk`를 이용해 위처럼 파티션을 만들 수 없다. 이 경우 `fdisk -l`을 이용해 저장 장치의 이름을 확인한 후, 다음과 같이 `parted` 명령어를 이용해 파티션을 만든다.

{:.code-header}
parted 프롬프트 열기 (/dev/sda)

{% highlight bash %}
sudo parted /dev/sda
{% endhighlight %}

<p class="pseudo-code-header"><span class="subtitle">[parted 프롬프트]</span> 현재 파티션 정보 보기</p>

<div class="pseudo-code" markdown="block">

<pre>GNU Parted 3.3
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.</pre>

<span class="prompt">(parted)</span> <span class="input">print</span>

<pre>Model: ATA ST1000DM003-1CH1 (scsi)
Disk /dev/sda: 1000GB
Sector size (logical/physical): 512B/4096B
Partition Table: msdos
Disk Flags:

Number  Start  End  Size  File system  Name  Flags
</pre>

</div>

만약 `Partition Table` 항목이 `gpt`로 되어 있지 않다면 `mklabel` 명령어를 실행해 `gpt` 파티션 테이블을 사용하도록 변경한다.[^15]

[^15]: 이 과정에서 디스크에 저장된 모든 정보가 다 삭제된다! 만약 백업해야 할 자료가 있다면 백업해 놓고 아래 명령어를 실행하도록 하자.

<p class="pseudo-code-header"><span class="subtitle">[parted 프롬프트]</span> gpt 파티션 테이블을 사용하도록 설정</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">(parted)</span> <span class="input">mklabel gpt</span>

<pre>Warning: The existing disk label on /dev/sda will be destroyed and all data on this disk will be lost. Do you want to continue?</pre>

<span class="prompt">Yes/No?</span> <span class="input">Yes</span>

{:.mt-2}
<span class="prompt">(parted)</span> <span class="input">print</span>

<pre>Model: ATA ST1000DM003-1CH1 (scsi)
Disk /dev/sda: 1000GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start  End  Size  File system  Name  Flags
</pre>

</div>

`mkpart` 명령어를 이용해 새 파티션을 만든다.

<p class="pseudo-code-header"><span class="subtitle">[parted 프롬프트]</span> 새 파티션 만들기</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">(parted)</span> <span class="input">mkpart primary 1 100%</span>

{:.mt-2}
<span class="prompt">(parted)</span> <span class="input">print</span>

<pre>Model: ATA ST1000DM003-1CH1 (scsi)
Disk /dev/sda: 1000GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      1049kB  1000GB  1000GB               primary
</pre>

</div>

`set` 명령어를 이용해 만들어진 (1번) 파티션에 LVM 플래그를 켜 주자.

<p class="pseudo-code-header"><span class="subtitle">[parted 프롬프트]</span> 1번 파티션에 LVM 플래그 켜기</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">(parted)</span> <span class="input">set 1 lvm on</span>

{:.mt-2}
<span class="prompt">(parted)</span> <span class="input">print</span>

<pre>Model: ATA ST1000DM003-1CH1 (scsi)
Disk /dev/sda: 1000GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      1049kB  1000GB  1000GB               primary  lvm
</pre>

</div>

여기까지 완료했으면 `q`를 이용해 프롬프트를 종료하자.[^16]

[^16]: `fdisk`는 `w`를 눌러 저장했을 때 실제로 파티션 테이블이 변경되지만, `parted`는 명령어를 입력하는 즉시 파티션 테이블이 변경되기에(즉, 데이터가 정말로 유실된다!) '저장'을 굳이 하지 않아도 된다. `parted`를 사용할 땐 항상 조심해서 사용하자.

<p class="pseudo-code-header"><span class="subtitle">[parted 프롬프트]</span> 종료</p>

<div class="pseudo-code" markdown="block">

<span class="prompt">(parted)</span> <span class="input">q</span>

<pre>Information: You may need to update /etc/fstab.</pre>

</div>

## step 1: PV 만들기

`pvcreate` 명령어를 이용하면 새 PV를 만들 수 있다. step 0에서 만든 모든 파티션들에 대해 PV를 만들자.

{:.code-header}
새 PV 만들기

{% highlight bash %}
sudo pvcreate /dev/sda1  # pvcreate [장치 이름]
sudo pvcreate /dev/sdb1
sudo pvcreate /dev/sdc1
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Physical volume "/dev/sda1" successfully created.
  Physical volume "/dev/sdb1" successfully created.
  Physical volume "/dev/sdc1" successfully created.
{% endhighlight %}

시스템에 만들어져 있는 PV들의 정보를 보려면 `pvdisplay` 명령어를 이용하면 된다.

{:.code-header}
PV 정보 보기

{% highlight bash %}
sudo pvdisplay
{% endhighlight %}

{:.code-result}
{% highlight text %}
  "/dev/sda1" is a new physical volume of "931.51 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sda1
  VG Name
  PV Size               931.51 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               ************************************

  "/dev/sdb1" is a new physical volume of "931.51 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb1
  VG Name
  PV Size               931.51 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               ************************************

  "/dev/sdc1" is a new physical volume of "931.51 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdc1
  VG Name
  PV Size               931.51 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               ************************************
{% endhighlight %}

잘못 만들어진 PV가 있다면 `pvremove` 명령어를 이용해 지울 수 있다.

{:.code-header}
PV 제거하기 (/dev/sda1)

{% highlight bash %}
sudo pvremove /dev/sda1  # pvremove [PV 이름]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Labels on physical volume "/dev/sda1" successfully wiped.
{% endhighlight %}

## step 2 : VG 만들기

`vgcreate` 명령어를 이용하면 새 VG를 만들 수 있다. step 1에서 만든 PV들을 모아 `vg-test`라는 이름의 새 VG를 만들자.

{:.code-header}
새 VG 만들기 (vg-test)

{% highlight bash %}
sudo vgcreate vg-test /dev/sda1 /dev/sdb1 /dev/sdc1  # vgcreate [VG 이름] [PV 이름(= 장치 이름)...]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Volume group "vg-test" successfully created
{% endhighlight %}

시스템에 만들어져 있는 VG들의 정보를 보려면 `vgdisplay` 명령어를 이용하면 된다.

{:.code-header}
VG 정보 보기

{% highlight bash %}
sudo vgdisplay
{% endhighlight %}

{:.code-result}
{% highlight text %}
  --- Volume group ---
  VG Name               vg-test
  System ID
  Format                lvm2
  Metadata Areas        3
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                3
  Act PV                3
  VG Size               <2.73 TiB
  PE Size               4.00 MiB
  Total PE              715398
  Alloc PE / Size       0 / 0
  Free  PE / Size       715398 / <2.73 TiB
  VG UUID               ************************************
{% endhighlight %}

잘못 만들어진 VG가 있다면 `vgremove` 명령어를 이용해 지울 수 있다.

{:.code-header}
VG 제거하기

{% highlight bash %}
sudo vgremove vg-test  # vgremove [VG 이름]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Volume group "vg-test" successfully removed
{% endhighlight %}

이미 만들어진 VG에 새로운 PV를 추가하고 싶으면 `vgextend` 명령어를 이용하면 된다.

{:.code-header}
VG(vg-test)에 새로운 PV(/dev/sdd1) 추가하기

{% highlight bash %}
sudo vgextend vg-test /dev/sdd1  # vgextend [VG 이름] [PV 이름(= 장치 이름)...]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Volume group "vg-test" successfully extended
{% endhighlight %}

VG에서 특정 PV를 제거하고 싶으면 `vgreduce` 명령어를 이용하면 된다.

{:.code-header}
VG(vg-test)에서 특정 PV(/dev/sdd1) 제거하기

{% highlight bash %}
sudo vgreduce vg-test /dev/sdd1  # vgreduce [VG 이름] [PV 이름(= 장치 이름)...]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Removed "/dev/sdd1" from volume group "vg-test"
{% endhighlight %}

VG 이름을 바꾸고 싶으면 `vgrename` 명령어를 이용한다.

{:.code-header}
VG 이름 바꾸기 (vg-test → vg-test2)

{% highlight bash %}
sudo vgrename vg-test vg-test2  # vgrename [기존 VG 이름] [새 VG 이름]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Volume group "vg-test" successfully renamed to "vg-test2"
{% endhighlight %}

## step 3 : LV 만들기

`lvcreate` 명령어를 이용하면 새 LV를 만들 수 있다. step 2에서 만든 VG `vg-test`에 대해 전체 100% 용량의 `lv-test`라는 이름의 새 LV를 만들자.

{:.code-header}
새 LV 만들기 (lv-test)

{% highlight bash %}
sudo lvcreate -l 100%FREE -n lv-test vg-test  # lvcreate -l [LV 크기] -n [LV 이름] [VG 이름]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Logical volume "lv-test" created.
{% endhighlight %}

LV 크기를 명시할 때에는 `-L` 또는 `-l` 옵션을 사용할 수 있다. 절대 용량을 명시할 때는 `-L` 옵션을, 전체 용량에 대한 상대 용량을 명시할 때는 `-l` 옵션을 사용한다. 다음은 `-L` 옵션과 `-l` 옵션을 사용하는 몇 가지 예이다.

- `-L 100G` : 100GB을 사용한다.
- `-L 1T` : 1TB을 사용한다.
- `-l 100%VG` : 전체 VG 공간을 모두 사용한다.
- `-l 100%FREE` : 사용 가능한 VG 여유 공간을 모두 사용한다.
- `-l 12%VG` : 전체 VG 공간의 12%를 사용한다.
- `-l 34%FREE` : 사용 가능한 VG 여유 공간의 34%를 사용한다.

RAID를 적용하고 싶다면 다음과 같이 `--type` 옵션을 사용한다.

{:.code-header}
새 RAID LV 만들기 (lv-test, RAID5)

{% highlight bash %}
sudo lvcreate --type raid5 -l 100%FREE -n lv-test vg-test  # lvcreate --type [raid0 | raid1 | raid4 | raid5 | raid6 | raid10] -l [LV 크기] -n [LV 이름] [VG 이름]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Using default stripesize 64.00 KiB.
  Logical volume "lv-test" created.
{% endhighlight %}

시스템에 만들어져 있는 LV들의 정보를 보려면 `lvdisplay` 명령어를 이용하면 된다.

{:.code-header}
LV 정보 보기

{% highlight bash %}
sudo lvdisplay
{% endhighlight %}

{:.code-result}
{% highlight text %}
  --- Logical volume ---
  LV Path                /dev/vg-test/lv-test
  LV Name                lv-test
  VG Name                vg-test
  LV UUID                ************************************
  LV Write Access        read/write
  LV Creation host, time ************************************
  LV Status              available
  # open                 0
  LV Size                <2.73 TiB
  Current LE             715398
  Segments               3
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
{% endhighlight %}

`lvdisplay`와 비슷한 명령어로 `lvs` 명령어가 있다. `lvs`는 LV에 대해 포멧팅된 정보를 제공한다. 만약 RAID LV를 사용한다면 이 명령어를 사용해 현재 RAID 동기화 퍼센트를 확인할 수 있다(`Cpy%Sync` 컬럼).

{:.code-header}
lvs로 LV 정보 보기

{% highlight bash %}
sudo lvs
{% endhighlight %}

{:.code-result}
{% highlight text %}
  LV      VG      Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv-test vg-test rwi-aor--- <1.82t                                    4.90
{% endhighlight %}

잘못 만들어진 LV가 있다면 `lvremove` 명령어를 이용해 지울 수 있다.[^20][^21][^22]

[^20]: `pvremove`, `vgremove` 명령어들은 각각 PV 이름, VG 이름을 이용해 PV, VG를 삭제할 수 있었다. 그런데 LV는 VG 밑에 만들어지는 개념이므로, 다른 VG 밑에 있는 LV는 같은 이름을 가질 수도 있다. 이 때문에 `lvremove`는 LV 이름이 아닌 LV 경로를 이용해 지운다는 점에 주의하자.
[^21]: 지울 때는 정말 삭제할 건지를 묻는 프롬프트가 뜨는데, `-f` 옵션을 주면 이를 묻지 않고 바로 삭제한다.
[^22]: 마운트되어 사용 중인 LV는 바로 삭제할 수 없다. 먼저 마운트를 해제하고 삭제해야 한다.

{:.code-header}
LV 제거하기

{% highlight bash %}
sudo lvremove /dev/vg-test/lv-test  # lvremove (-f) [LV 경로]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Logical volume "lv-test" successfully removed
{% endhighlight %}

LV 이름을 바꾸고 싶으면 `lvrename` 명령어를 이용한다.

{:.code-header}
LV 이름 바꾸기 (lv-test → lv-test2)

{% highlight bash %}
sudo lvrename /dev/vg-test/lv-test /dev/vg-test/lv-test2  # lvrename [기존 LV 경로] [새 LV 경로]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Renamed "lv-test" to "lv-test2" in volume group "vg-test"
{% endhighlight %}

LV 크기를 바꾸고 싶다면 `lvresize` 명령어를 사용한다.[^23]

[^23]: 만약 마운트되어 있다면 마운트를 해제하고 시행해야 한다.

{:.code-header}
LV 크기 변경하기

{% highlight bash %}
sudo lvresize -L +100G /dev/vg-test/lv-test  # lvresize [-l | -L] [확장/축소할 용량] [LV 경로]
{% endhighlight %}

{:.code-result}
{% highlight text %}
  Size of logical volume vg-test/lv-test changed from 5.00 GiB (1280 extents) to 100.00 GiB (25600 extents).
  Logical volume vg-test/lv-test successfully resized.
{% endhighlight %}

`lvresize`에서는 `lvcreate`와 마찬가지로 `-L` 또는 `-l` 옵션을 사용할 수 있다. 용량을 늘리려면 `+`를 붙여주고, 용량을 줄이려면 `-`를 붙여준다. 부호를 붙이지 않으면 입력한 용량이 되도록 확장/축소된다. 다음은 몇 가지 사용 예이다.

- `-L +100G` : LV에 100GB을 추가 확장한다.
- `-L -1T` : LV에 1TB를 축소한다.
- `-L 2T` : LV가 2TB가 되도록 확장 혹은 축소한다(원래 LV의 용량이 2TB보다 작았으면 확장될 것이고, 2TB보다 컸으면 축소될 것이다).
- `-l 100%VG` : LV가 전체 VG 공간을 모두 사용하도록 확장한다.
- `-l 50%LV` : LV를 현재 용량의 50% 크기로 축소한다.
- `-l +50%LV` : LV에 현재 용량의 50% 크기만큼 추가 확장한다(즉 기존 용량보다 1.5배 커진다).
- `-l 150%LV` : LV가 현재 용량의 150% 크기가 되도록 확장한다(즉 기존 용량보다 1.5배 커진다).
- `-l +100%FREE` : LV에 사용 가능한 VG 여유 공간 만큼 추가 확장한다.

LV를 축소했다면 데이터 및 파일시스템이 거의 확실히 깨진다. 데이터가 깨져도 상관없는 경우가 아니라면 절대 함부로 시행하지 말자. 또, (step 4을 이미 수행해) 파일시스템이 올라가 있는 상태에서 LV를 확장한 경우 파일시스템을 업데이트 해 줘야 한다.

{:.code-header}
파일시스템 검사

{% highlight bash %}
sudo e2fsck -f /dev/vg-test/lv-test  # e2fsck -f [LV 경로]
{% endhighlight %}

{:.code-result}
{% highlight text %}
e2fsck 1.45.5 (07-Jan-2020)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
/dev/vg-test/lv-test: 11/655360 files (0.0% non-contiguous), 66753/2621440 blocks
{% endhighlight %}

{:.code-header}
파일시스템 업데이트

{% highlight bash %}
sudo resize2fs /dev/vg-test/lv-test  # resize2fs [LV 경로]
{% endhighlight %}

{:.code-result}
{% highlight text %}
resize2fs 1.45.5 (07-Jan-2020)
Resizing the filesystem on /dev/vg-test/lv-test to 5242880 (4k) blocks.
The filesystem on /dev/vg-test/lv-test is now 5242880 (4k) blocks long.
{% endhighlight %}

## step 4 : 마무리

LV를 만든 것은 공장에서 갓 나온, 새로운 저장 장치를 연결한 것과 같은 것이다. 따라서 1. 파일 시스템을 올리고, 2. 시스템에 마운트 해 줘야 실제로 사용할 수 있다.

`mkfs.ext4` 명령어를 이용해 만들어진 LV를 ext4 파일 시스템으로 포멧하자.

{:.code-header}
LV(/dev/vg-test/lv-test)를 ext4 파일 시스템으로 포멧하기

{% highlight bash %}
sudo mkfs.ext4 /dev/vg-test/lv-test  # mkfs.ext4 [LV 경로]
{% endhighlight %}

이제 적절한 위치에 마운트 포인트를 만들고 마운트 해 주자.

{:.code-header}
LV(/dev/vg-test/lv-test)를 /mnt/test에 마운트하기

{% highlight bash %}
sudo mkdir -p /mnt/test
sudo mount /dev/vg-test/lv-test /mnt/test  # mount [LV 경로] [마운트 경로]
{% endhighlight %}

`df` 명령어로 성공적으로 마운트되었는지 확인한다.

{:.code-header}
마운트 확인

{% highlight bash %}
df -h
{% endhighlight %}

{:.code-result}
{% highlight text %}
(전략)
/dev/mapper/vg--test-lv--test  1.8T   77M  1.7T   1% /mnt/test
(후략)
{% endhighlight %}

`/etc/fstab` 파일을 수정해 재부팅해도 자동으로 마운트 되게 해 주자. 우선 `/dev/mapper` 디렉토리를 탐색해 LV가 어떤 장치 이름으로 인식되고 있는지를 확인한다.

{:.code-header}
LV 장치 이름 확인

{% highlight bash %}
ls /dev/mapper
{% endhighlight %}

{:.code-result}
{% highlight text %}
(전략)  /dev/mapper/vg--test-lv--test  (후략)
{% endhighlight %}

필자의 컴퓨터에서는 `/dev/mapper/vg--test-lv--test`라는 이름으로 인식되고 있는 것을 확인할 수 있다.[^40] 이제 이를 이용해 fstab 파일에 다음 줄을 추가한다.

[^40]: 일반적으로 필자처럼 `[VG 이름]-[LV 이름]` 형태로 인식될 것이다.

{:.code-header}
/etc/fstab 파일 업데이트하기

{% highlight bash %}
sudo vim /etc/fstab
{% endhighlight %}

{:.code-header}
<p class="code-header"><span class="subtitle">[/etc/fstab 파일 수정]</span> 재부팅해도 자동으로 마운트 되게 하기</p>


{% highlight text %}
/dev/mapper/vg--test-lv--test  /mnt/test  ext4  defaults  0  0
{% endhighlight %}

이제 다음 명령어를 실행해 `/etc/fstab` 파일 업데이트를 시스템에 알린 후, 재부팅해보자. 마운트가 잘 되는 것을 확인할 수 있다.

{:.code-header}
/etc/fstab 파일 업데이트 시스템에 고지하기

{% highlight bash %}
sudo update-initramfs -u
{% endhighlight %}


