---
title: "adduser"
date_created: "2021-07-14"
date_modified: "2021-10-14"
tags: ["command"]
---

# Quick Start

**주의 : 다음 명령어들은 모두 관리자 권한으로 실행되어야 한다.**

{:.code-header}
(일반(normal)) 사용자 "asdf" 추가

{:.show-admin-prompt}
{% highlight bash %}
adduser "asdf"
{% endhighlight %}

{:.code-header}
(일반(normal)) 사용자 "asdf" 추가, 사용자 정보(GECOS Information) 생략

{:.show-admin-prompt}
{% highlight bash %}
adduser --gecos "" "asdf"
{% endhighlight %}

{:.code-header}
(이미 존재하는) 사용자 "user-asdf"를 (이미 존재하는) 그룹 "group-good"에 넣기

{:.show-admin-prompt}
{% highlight bash %}
adduser "user-asdf" "group-good"
{% endhighlight %}

# 이름

adduser

# 위치

- `/usr/sbin/adduser`

# 명령어 형식

{:.show-admin-prompt}
{% highlight bash %}
adduser [OPTION]... [*USER] # MODE 1
adduser --system [OPTION]... [*USER] # MODE 2
adduser [OPTION]... [*USER] [*GROUP] # MODE 3
{% endhighlight %}

MODE 1에서 쓸 수 있는 옵션의 종류는 다음과 같다.

- `--quiet`
- `--debug`
- `--help` 또는 `-h`
- `--conf FILE`
- `--home DIR`
- `--shell SHELL`
- `--no-create-home`
- `--uid ID`
- `--firstuid ID`
- `--lastuid ID`
- `--ingroup GROUP` 또는 `--gid ID`
- `--disabled-login`
- `--disabled-password`
- `--gecos GECOS`

MODE 2에서 쓸 수 있는 옵션의 종류는 다음과 같다.

- `--quiet`
- `--debug`
- `--help` 또는 `-h`
- `--conf FILE`
- `--home DIR`
- `--shell SHELL`
- `--no-create-home`
- `--uid ID`
- `--group` 또는 `--ingroup GROUP` 또는 `--gid ID`
- `--disabled-login`
- `--disabled-password`
- `--gecos GECOS`

MODE 3에서 쓸 수 있는 옵션의 종류는 다음과 같다.

- `--quiet`
- `--debug`
- `--help` 또는 `-h`
- `--conf FILE`


# 설명

`adduser`는 새로운 계정을 시스템에 추가하는 명령어이다(반드시 관리자 권한으로 실행되어야 한다). `adduser` 명령어는 세 가지 모드로 사용할 수 있다.

## MODE 1 : 일반 사용자(normal user) 추가

첫 번째 모드는 일반 사용자(normal user)를 추가하는 모드이다. `adduser`가 실행되면 `adduser`는 우선 관리자에게 새로운 사용자 `[USER]`가 사용할 암호와 사용자의 정보(GECOS Information)[^1]를 묻는다. 관리자가 암호와 사용자 정보를 입력하면 `adduser`는 다음 작업들을 수행한다.

[^1]: Finger Information이라고도 한다. 이름(Full Name), 방 번호(Room Number), 직장 전화번호(Work Phone), 집 전화번호(Home Phone), 기타(Other) 정보를 의미한다. 참고로 이들 정보들은 `/etc/passwd` 파일의 GECOS Field라 부르는 열에 저장된다.

- 새로운 일반 사용자를 생성한다.
  - UID : 일반 사용자를 위한 UID 값[^2] 중 사용 가능한 가장 작은 값
  - 사용자 명 : `[USER]`
  - 그룹 명 : `[USER]` (사용자 명과 같은 그룹을 생성한다)
  - 기본 쉘 : `/bin/bash`[^3]
  - 홈 디렉토리 : `/home/[USER]`[^4]
- 새로운 사용자를 위한 홈 디렉토리(`/home/[USER]`)를 만든다.
  - 만약 해당 디렉토리가 존재하지 않았다면, 새로 만들고, `/etc/skel/`[^5] 디렉토리에 있는 항목들을 홈 디렉토리로 복사한다.
  - 만약 해당 디렉토리가 존재한다면, 아무런 작업을 하지 않는다.

[^2]: 일반 사용자(normal user)가 사용하는 UID 값의 범위는 `/etc/adduser.conf` 파일에서 설정하거나(`FIRST_UID`, `LAST_UID`) `--firstuid`, `--lastuid` 옵션을 이용해 줄 수 있다.
[^3]: Ubuntu 기준. `/etc/adduser.conf` 파일에서 디폴트 기본 쉘을 설정할 수 있다.
[^4]: 디폴트 홈 디렉토리의 경로를 다른 곳으로 지정하고 싶다면(ex. `/home/[group]/[user]` 형식, `/somewhere/else/[user]` 등) `/etc/adduser.conf` 파일을 수정하면 된다.
[^5]: `adduser`를 할 때 복사되는 디렉토리를 변경하고 싶다면 `/etc/adduser.conf` 파일을 수정하면 된다.

## MODE 2 : 시스템 사용자(system user) 추가

두 번째 모드는 시스템 사용자(system user)를 추가하는 모드이다. `adduser`가 실행되면 `adduser`는 우선 관리자에게 새로운 사용자 `[USER]`가 사용할 암호와 사용자의 정보(GECOS Information)를 묻는다. 관리자가 암호와 사용자 정보를 입력하면 `adduser`는 다음 작업들을 수행한다.

- 새로운 시스템 사용자를 생성한다.
  - UID : 시스템 사용자를 위한 UID 값[^6] 중 사용 가능한 가장 작은 값
  - 사용자 명 : `[USER]`
  - 그룹 명 : nogroup (gid = 65534)
  - 기본 쉘 : `/bin/bash`[^3]
  - 홈 디렉토리 : `/home/[USER]`[^4]
- 새로운 사용자를 위한 홈 디렉토리(`/home/[USER]`)를 만든다.
  - 만약 해당 디렉토리가 존재하지 않았다면, 새로 만들고, `/etc/skel/`[^5] 디렉토리에 있는 항목들을 홈 디렉토리로 복사한다.
  - 만약 해당 디렉토리가 존재한다면, 아무런 작업을 하지 않는다.

[^6]: 시스템 사용자(system user)가 사용하는 UID 값의 범위는 `/etc/adduser.conf` 파일에서 설정할 수 있다(`FIRST_SYSTEM_UID`, `LAST_SYSTEM_UID`).

## MODE 3 : 사용자를 그룹에 추가하기

세 번째 모드는 (이미 존재하는) 사용자 `[USER]`를 (이미 존재하는) 그룹 `[GROUP]`에 추가하는 모드이다. 존재하지 않는 사용자 또는 그룹이 인자로 주어지면 `adduser` 명령어는 실패한다.

# 옵션

## --quiet

> MODE 1, MODE 2, MODE 3에서 사용 가능

정보(information) 수준 메시지들은 모두 무시. 경고(warning) 또는 오류(error) 수준 메시지만 출력.

## --debug

> MODE 1, MODE 2, MODE 3에서 사용 가능

디버그 모드

## --system

> MODE 2에서 사용 가능

MODE 2로 전환

## --conf [FILE]

> MODE 1, MODE 2, MODE 3에서 사용 가능

`/etc/adduser.conf` 파일 대신 `[FILE]`을 설정 파일로 사용한다.

## -h, --help

> MODE 1, MODE 2, MODE 3에서 사용 가능

도움말 보기

## --version

버전 보기

## --home [DIR]

> MODE 1, MODE 2에서 사용 가능

새로운 사용자의 홈 디렉토리를 명시적으로 설정한다. 만약 `[DIR]`이 존재하지 않는다면, 해당 디렉토리를 만들고, `/etc/skel/`[^5] 디렉토리에 있는 항목들을 홈 디렉토리로 복사한다.

## --shell [SHELL]

> MODE 1, MODE 2에서 사용 가능

새로운 사용자의 기본 쉘을 명시적으로 설정한다.

## --no-create-home

> MODE 1, MODE 2에서 사용 가능

홈 디렉토리를 만들지 않는다. `/etc/passwd` 상에 홈 디렉토리가 설정은 되나,[^7] 해당 디렉토리를 실제로 생성하지 않는 것이다. 만약 홈 디렉토리가 존재한다면, 아무런 작업을 하지 않는다.

[^7]: 아무런 손을 대지 않은 경우, `/home/[USER]`

## --uid [ID]

> MODE 1, MODE 2에서 사용 가능

새로운 사용자의 UID를 명시적으로 설정한다. 만약 다른 사용자가 이미 사용 중인 UID 값이 주어진 경우 `adduser`는 실패한다.

## --firstuid [ID], --lastuid [ID]

> MODE 1에서 사용 가능

`adduser`는 사용 가능한 UID 중 가장 작은 값을 새로운 사용자의 UID로 부여한다. 이때 사용 가능한 UID의 범위는 `/etc/adduser.conf` 파일에서 설정할 수 있다(`FIRST_UID`, `LAST_UID`).

`--firstuid`, `--lastuid` 옵션을 사용하면 `/etc/adduser.conf` 파일에 설정된 `FIRST_UID`, `LAST_UID` 설정을 각각 덮어씌울 수(override) 있다.

## --gid [ID], --ingroup [GROUP]

> MODE 1, MODE 2에서 사용 가능

새로운 그룹을 생성하지 않고, 새로운 사용자를 GID `[ID]`의 그룹 또는 그룹 `[GROUP]`에 추가한다.

## --group

> MODE 2에서 사용 가능

시스템 사용자를 생성할 때, 시스템 사용자의 이름과 같은 그룹을 생성하고, 시스템 사용자를 해당 그룹 안에 추가한다.

## --disabled-login

> MODE 1, MODE 2에서 사용 가능

새 계정에 암호를 부여하지 않는다. 이 옵션을 사용하면 계정을 만들 때 암호를 설정하는 프롬프트가 뜨지 않는다.

새로 만들어진 계정은 관리자가 `passwd` 명령어를 이용해 암호를 설정하기 전까진 비활성화된다(로그인이 안 된다).

## --disabled-password

> MODE 1, MODE 2에서 사용 가능

새 계정에 암호를 부여하지 않는다. 이 옵션을 사용하면 계정을 만들 때 암호를 설정하는 프롬프트가 뜨지 않는다(`--disabled-login`과 유사).

그러나 이 옵션으로 만들어진 계정은 로그인이 불가능하진 않다. 오직 암호를 이용한 로그인이 불가능해진다. 다른 방법(ex. SSH RSA 키)를 이용하면 로그인할 수 있다.

## --gecos [GECOS]

> MODE 1, MODE 2에서 사용 가능

사용자 정보(GECOS Information)를 `[GECOS]`로 설정한다. 이 옵션을 사용하면 계정을 만들 때 사용자 정보(GECOS Information)을 물어보지 않는다.

현실적으로 오늘날에는 사용자 정보를 거의 안 쓰기 때문에, 일반적으로 빈 문자열(`""`)을 주는 경우가 많다.

# 기타

## /usr/local/sbin/adduser.local

만약 `/usr/local/sbin/adduser.local` 파일이 존재하면, `adduser` 명령이 모두 실행되고 난 뒤에 실행된다. 이 파일을 이용하면 사용자 계정이 처음 만들어졌을 때 공통적으로 실행되어야 할 작업들을 실행할 수 있다. 참고로 `adduser`는 `/usr/local/sbin/adduser.local`에 다음 인자들을 넘긴다.

- 사용자 명 (`username`)
- uid (`uid`)
- gid (`gid`)
- 홈 디렉토리 (`home-directory`)

`adduser`는 또한 `VERBOSE`라는 환경변수 역시 넘긴다. `VERBOSE`는 다음 기준에 따라 설정된다.

- 0 : `--quiet` 옵션이 설정된 경우
- 1 : `--quiet`, `--debug` 옵션이 아무 것도 설정되지 않은 경우
- 2 : `--debug` 옵션이 설정된 경우

## /etc/passwd, /etc/group, /etc/shadow

- 사용자 정보는 `/etc/passwd` 파일에서 확인할 수 있다.
- 그룹 정보는 `/etc/group` 파일에서 확인할 수 있다.
- 사용자의 암호는 `/etc/shadow` 파일에 저장된다.