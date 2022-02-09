---
title: "MotD (Message of the Day)"
date_created: "2021-12-17"
date_modified: "2022-02-09"
---

# MotD란?

MotD(Message of the Day)란 ssh로 서버에 접속 시 사용자에게 뜨는 welcome 메시지를 의미한다. 원래는 서버에 접속한 사용자에게 공지사항 등을 전파하기 위해 만들어진 기능이지만, 서버에 접속했을 때 현재 서버의 상황을 한 눈에 볼 수 있도록 서버 정보를 요약해서 보여주는 식으로도 많이 사용된다.

# MotD 작성법

Ubuntu 20.04 LTS 기준, MotD는 `/etc/update-motd.d/` 디렉토리 밑에서 설정할 수 있다. ssh 로그인 시 이 디렉토리 밑에 있는 실행 파일(executable file)들이 실행되며 MotD가 출력되는 방식인 것이다. 즉 MotD 메시지를 추가/수정/삭제하고 싶으면 이 디렉토리 밑에 (root 권한으로) 실행 파일을 추가/수정/삭제하면 되는 것이다. 파일 추가/수정/삭제 후에는 `chmod`를 통해 실행 가능하게(executable) 만드는 것을 잊지 말자!

MotD 파일들의 실행 순서는 파일명 순서대로이다. 그래서 일반적으로 MotD 파일명 앞에 출력되기를 원하는 순서대로 숫자를 붙인다.

# MotD 작성 예

{:.code-header}
/etc/update-motd.d/00-header

{:.no-prompt}
{% highlight bash %}
#!/bin/bash

PPID1=`cat /proc/$PPID/status | grep PPid | awk '{ print $2 }'`
PPID2=`cat /proc/$PPID1/status | grep PPid | awk '{ print $2 }'`
USERNAME=`ps -x | grep $PPID2 | awk '{ print $6 }' |  sed "s/[[:digit:].-]//g"`

HOSTNAME=$(hostname)
NOW=$(date +"%F %T")

printf "\033[32mWelcome,\033[0m %s\033[32m! This is\033[0m %s\033[32m.\033[0m\n" "$USERNAME" "$HOSTNAME"
printf "\033[32mCurrent time is\033[0m %s\033[32m.\033[0m\n" "$NOW"
printf "\n"
{% endhighlight %}


{:.code-header}
/etc/update-motd.d/01-sysinfo

{:.no-prompt}
{% highlight bash %}
#!/bin/bash

printf "\033[32m[SYSTEM INFO]\033[0m\n"

################################################################################

LAST_REBOOT=$(who -b | sed -e 's/^[[:space:]]*system[[:space:]]*boot[[:space:]]*//')
LAST_REBOOT_ISO=$(date --date="$LAST_REBOOT" +"%F %T")

UPTIME_DAYS=$(expr `cat /proc/uptime | cut -d '.' -f1` % 31556926 / 86400)
UPTIME_HOURS=$(expr `cat /proc/uptime | cut -d '.' -f1` % 31556926 % 86400 / 3600)
UPTIME_MINUTES=$(expr `cat /proc/uptime | cut -d '.' -f1` % 31556926 % 86400 % 3600 / 60)

printf "  \033[32mLast Reboot\033[0m: %s (\033[32mUptime\033[0m: %sD %sH %sM)\n" "$LAST_REBOOT_ISO" "$UPTIME_DAYS" "$UPTIME_HOURS" "$UPTIME_MINUTES"
printf "\n"

################################################################################

OS_DISTRIB=$(lsb_release -s -d)
OS_OS=$(uname -o)
OS_KERNEL=$(uname -r)
OS_MACHINE=$(uname -m)

printf "  \033[32mOS\033[0m: %s (%s %s %s)\n" "$OS_DISTRIB" "$OS_OS" "$OS_KERNEL" "$OS_MACHINE"

################################################################################

CPU=$(cat /proc/cpuinfo | grep 'model name' | head -1 | cut -d ':' -f2 | sed -e 's/^[[:space:]]*//')
CPU_SOCKET_NUM=$(lscpu | grep -E '^Socket' | cut -d ':' -f2 | sed -e 's/^[[:space:]]*//')
CPU_CORE_PER_SOCKET=$(lscpu | grep -E '^Core\(s\) per socket' | cut -d ':' -f2 | sed -e 's/^[[:space:]]*//')
CPU_CORE_NUM=$(( $CPU_SOCKET_NUM * $CPU_CORE_PER_SOCKET ))
CPU_THREAD_PER_CORE=$(lscpu | grep -E '^Thread\(s\) per core' | cut -d ':' -f2 | sed -e 's/^[[:space:]]*//')
CPU_THREAD_NUM=$(( $CPU_CORE_NUM * $CPU_THREAD_PER_CORE ))

printf "  \033[32mCPU\033[0m: %s (%s core(s), %s thread(s))\n" "$CPU" "$CPU_CORE_NUM" "$CPU_THREAD_NUM"

################################################################################

MEM=$(lsmem | grep -E '^Total online memory' | cut -d ':' -f2 | sed -e 's/^[[:space:]]*//')
MEM_IN_USE=$(free | {
        read
        read TITLE MEM_TOTAL MEM_USED REST
        echo "$(( 100 * $MEM_USED / $MEM_TOTAL ))%"
})
PROCESS_NUM=$(ps -ef | wc -l)
ZOMBIE_PROCESS_NUM=$(ps -ef | grep defunct | grep -v grep | wc -l)

printf "  \033[32mMem\033[0m: %s (\033[32mUsage\033[0m: %s, \033[32mProcesses\033[0m: %s" "$MEM" "$MEM_IN_USE" "$PROCESS_NUM"

if [ "$ZOMBIE_PROCESS_NUM" -eq "0" ]; then
    printf ")\n"
else
    printf ", \033[31m%s zombies!\033[0m)\n" "$ZOMBIE_PROCESS_NUM"
fi

################################################################################

GPUS=$(lspci | grep VGA | cut -d ':' -f3 | sed -e 's/^[[:space:]]*//' | sed -e 's/(.*)$//')

printf "  \033[32mGPU(s)\033[0m:\n"
IFS=$'\n'
for GPU in $GPUS
do
        printf "    %s\n" "$GPU"
done
unset IFS

################################################################################

DISK_INFOS=$(df -x squashfs -x tmpfs -x devtmpfs -x overlay -h | sed 1d)

printf "  \033[32mDisk(s)\033[0m:\n"
IFS=$'\n'
for line in $DISK_INFOS
do
        DISK_FILESYSTEM=$(echo $line | awk '{ print $1 }')
        DISK_SIZE=$(echo $line | awk '{ print $2 }')
        DISK_USED=$(echo $line | awk '{ print $3 }')
        DISK_AVAIL=$(echo $line | awk '{ print $4 }')
        DISK_USED_RATE=$(echo $line | awk '{ print $5 }')
        DISK_MOUNTED_ON=$(echo $line | awk '{ print $6 }')

        printf "    %s [ %-16s ]: %s/%s (%s used, %s free)\n" "$DISK_FILESYSTEM" "$DISK_MOUNTED_ON" "$DISK_USED" "$DISK_SIZE" "$DISK_USED_RATE" "$DISK_AVAIL"
done
unset IFS

################################################################################

NETWORK_DEVICES=$(nmcli -f DEVICE connection show --active | sed 1d | sed -e 's/[[:space:]]*$//')

printf "  \033[32mIP Address(es)\033[0m:\n"
IFS=$'\n'
for NETWORK_DEVICE in $NETWORK_DEVICES
do
        NETWORK_IP_ADDR=$(ifconfig $NETWORK_DEVICE | grep -E "^[[:space:]]*inet " | sed -e 's/^[[:space:]]*//' | awk '{ print $2 }')

        printf "    %-16s: %s\n" "$NETWORK_DEVICE" "$NETWORK_IP_ADDR"
done
unset IFS

################################################################################

USERS=$(w -h)

printf "  \033[32mLogin User(s)\033[0m:\n"
IFS=$'\n'
for line in $USERS
do
        USER_NAME=$(echo $line | awk '{ print $1 }')
        USER_TTY=$(echo $line | awk '{ print $2 }')
        USER_IP=$(echo $line | awk '{ print $3 }')
        USER_LOGIN_TIME=$(echo $line | awk '{ print $4 }')
        USER_LOGIN_TIME_ISO=$(date --date="$USER_LOGIN_TIME" +"%F %T")
        printf "    %-10s [ %5s ]    from %15s    since %s\n" "$USER_NAME" "$USER_TTY" "$USER_IP" "$USER_LOGIN_TIME_ISO"
done
unset IFS
printf "\n"
{% endhighlight %}