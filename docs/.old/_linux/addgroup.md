---
title: "addgroup"
date_created: "2021-07-16"
date_modified: "2021-10-14"
tags: ["command"]
---

# Quick Start

**주의 : 다음 명령어들은 모두 관리자 권한으로 실행되어야 한다.**

{:.code-header}
사용자 그룹(user group) "asdf" 추가

{:.show-admin-prompt}
{% highlight bash %}
addgroup "asdf"
{% endhighlight %}

# 이름

addgroup

# 위치

- `/usr/sbin/addgroup`

# 명령어 형식

{:.show-admin-prompt}
{% highlight bash %}
addgroup [OPTION]... [*GROUP] # MODE 1
addgroup --system [OPTION]... [*GROUP] # MODE 2
{% endhighlight %}

사용할 수 있는 옵션의 종류는 다음과 같다.

- `--quiet`
- `--debug`
- `--help` 또는 `-h`
- `--conf FILE`
- `--gid ID`

# 설명

`addgroup`는 새로운 그룹을 시스템에 추가하는 명령어이다(반드시 관리자 권한으로 실행되어야 한다). 생성된 그룹은 사용자가 아무도 없는 빈 그룹이 된다. `addgroup` 명령어는 두 가지 모드로 사용할 수 있다.

## MODE 1 : 사용자 그룹(user group) 추가

첫 번째 모드는 사용자 그룹(user group)을 시스템에 추가하는 명령어이다.

- 그룹 명 : `[GROUP]`
- GID : 사용자 그룹이 사용 가능한 GID[^1] 중 가장 작은 값

[^1]: 사용자 그룹이 사용하는 GID 값의 범위는 `/etc/adduser.conf` 파일에서 설정할 수 있다(`FIRST_GID`, `LAST_GID`).

## MODE 2 : 시스템 그룹(system group) 추가

두 번째 모드는 시스템 그룹(system group)을 시스템에 추가하는 명령어이다.

- 그룹 명 : `[GROUP]`
- GID : 시스템 그룹이 사용 가능한 GID[^2] 중 가장 작은 값

[^2]: 시스템 그룹이 사용하는 GID 값의 범위는 `/etc/adduser.conf` 파일에서 설정할 수 있다(`FIRST_SYSTEM_GID`, `LAST_SYSTEM_GID`).

# 옵션

## --quiet

정보(information) 수준 메시지들은 모두 무시. 경고(warning) 또는 오류(error) 수준 메시지만 출력.

## --debug

디버그 모드

## --system

MODE 2로 전환

## --conf [FILE]

`/etc/adduser.conf` 파일 대신 `[FILE]`을 설정 파일로 사용한다.

## -h, --help

도움말 보기

## --version

버전 보기

## --gid [ID]

기본값이 아닌, 주어진 `[ID]`를 GID로 사용하여 그룹을 생성한다.

# 기타

- 만들어진 그룹은 `/etc/group` 파일에서 확인할 수 있다.
- 만들어진 그룹에 사용자를 추가하려면 [`adduser`](/linux/adduser) 명령어를 사용하면 된다.
