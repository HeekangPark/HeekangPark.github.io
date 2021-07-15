---
title: "ls"
date_created: "2021-07-14"
date_modified: "2021-07-15"
tags: ["command"]
---

# 이름

ls - list directory contents

# 위치

{:.no-guide-line}
- `/usr/bin/ls`
- `/bin/ls`

# 명령어 형식

{% highlight bash %}
ls [OPTION]... [FILE]...
{% endhighlight %}

# Quick Start

{:.code-header}
디렉토리 알파벳순으로 먼저 출력, 이후 파일 알파벳순으로 출력

{% highlight bash %}
ls -alF --group-directories-first
{% endhighlight %}

{:.code-header}
사람이 이해하기 쉬운 형태로 파일/디렉토리 크기 출력

{% highlight bash %}
ls -alFh
{% endhighlight %}

{:.code-header}
파일 크기 역순 정렬 (프롬프트 바로 위가 가장 큰 파일/디렉토리)

{% highlight bash %}
ls -AlFhSr
{% endhighlight %}

{:.code-header}
마지막 편집시간 역순 정렬 (프롬프트 바로 위가 가장 최근에 편집된 파일/디렉토리)

{% highlight bash %}
ls -alFtr
{% endhighlight %}

# 설명

`ls`는 디렉토리 안에 있는 파일과 폴더들을 나열하는 명령어이다.

- 탐색할 디렉토리(`[FILE]`)를 명시하지 않는 경우 현재 디렉토리의 내용을 출력한다.
- 아무른 옵션(`[OPTION]`)을 주지 않을 경우,
  - 파일/디렉토리명만 출력한다.
  - 숨김 파일 및 폴더는 출력하지 않는다.
  - 출력 결과는 알파벳 순으로 정렬된다.

# 옵션

## -a, --all

현재 디렉토리 내 모든 파일 및 폴더, 그러니까 숨김 파일 및 폴더[^1]도 모두 출력한다.

[^1]: `.`으로 시작하는 파일 및 디렉토리

## -A, --almost-all

`-a` 옵션과 유사. 다만 현재 디렉토리를 의미하는 `.`과 상위 디렉토리를 의미하는 `..`은 출력하지 않는다.

## -B, --ignore-backups

백업 파일[^2]은 출력하지 않는다.

[^2]: `~`으로 끝나는 파일 및 디렉토리

## -c, --time=ctime, --time=status

파일/디렉토리가 마지막으로 수정된 시간(ctime, change time)[^3] 순으로 정렬한다. 최근 순으로 정렬된다.

{:.no-guide-line}
- `-l` 옵션과 함께 쓸 경우 : 파일/디렉토리가 마지막으로 편집된 시간(mtime, modify time)이 아닌, ctime이 출력된다. 정렬은 기본값(이름 알파벳 순)으로 된다.
- `-lt` 옵션과 함께 쓸 경우 : 파일/디렉토리의 mtime이 아닌 ctime이 출력되고, ctime 순으로 정렬된다.

[^3]: mtime은 파일의 내용(content)가 편집된 시간을 의미한다. 반면 ctime은 파일의 inode가 수정된(ex. 이름 바꾸기, 파일의 권한 바꾸기, Hard Link 개수 바꾸기 등) 시간을 의미한다.

## --color[=never/always/auto]

{:.no-guide-line}
- `never` : `ls` 명령어는 파일 타입의 구분을 위해 색을 쓰지 않는다. (기본값)
- `always` : `ls` 명령어는 파일 타입의 구분을 위해 (항상) 색을 사용한다.
- `auto` : `ls` 명령어는 표준 출력이 터미널에 연결되어 있을 때만 파일 타입의 구분을 위해 색을 사용한다.[^4]

[^4]: Ubuntu의 경우 `~/.bashrc` 파일에 `alias ls='ls --color=auto'`가 설정되어 있어 기본값으로 색이 출력된다.

`LS_COLORS` 환경변수를 변경하면 `ls` 명령어가 사용하는 색을 바꿀 수 있다. `LS_COLORS` 환경변수는 `dircolors` 명령어를 이용해 바꿀 수 있다.

## -F, --classify

`ls` 명령어는 파일 타입의 구분을 위해 기호를 사용한다. 각 기호의 의미는 다음과 같다.

{:.no-guide-line}
- `*` : 실행 가능(executable)[^5]
- `/` : 디렉토리
- `=` : 소켓
- `>` : doors
- `@` : Symbolic Link[^6]
- `|` : Named Pipe[^7]

[^5]: executable bit이 활성화되어 있는 파일/디렉토리
[^6]: `ln -s` 명령어로 생성할 수 있다.
[^7]: `mkfifo` 명령어로 생성할 수 있다.

## --full-time

`-l --time-style=full-iso` 옵션과 동일

## -g

`-l` 옵션과 유사. 다만 소유자(owner)를 나타내는 열이 빠진다(그룹 정보만 출력한다).

## --group-directories-first

디렉토리를 먼저 출력하고 파일을 출력한다.

## -h, --human-readable

파일 용량을 바이트 단위가 아닌, 사람이 읽기 쉬운 형태(ex. 3GB, 2.5KB 등)로 출력한다. 반드시 `-l` 옵션과 함께 써야 한다.

## --hide, -I, --ignore[=PATTERN]

`[PATTERN]`과 일치하는 항목은 출력하지 않는다.

## -i, --inode

각 파일/디렉토리의 inode index를 출력한다.

## -l

파일에 대한 자세한 정보를 (리스트 형태로) 출력한다. 각 행의 의미는 다음과 같다.

ex) `-rwxr-xr-x 1 root root 142144 9월 5 2019 ls*`

{:.no-guide-line}
- `-rwxr-xr-x` : 파일의 유형 및 권한
- `1` : 하드링크의 개수[^8]
- `root` : 소유자(owner)
- `root` : 그룹(group)
- `142144` : 파일 크기(바이트 단위)
- `9월 5 2019` : 마지막 수정 시간(mtime, modify time)
- `ls` : 파일명
- `*` : 실행 가능한(executable) 파일/디렉토리 여부[^9]

[^8]: 디렉토리의 경우, "해당 디렉토리리에 접근할 수 있는 디렉토리의 수"를 나타낸다. 디렉토리를 처음 생성한 경우, 해당 디렉토리에 접근할 수 있는 디렉토리는 자기 자신(`./`)과 부모 디렉토리(`../`)밖에 없으므로, 이 값은 2가 된다. 하위 디렉토리를 만들면 해당 하위 디렉토리에서 이 디렉토리로 `../`을 이용해 접근할 수 있으므로 이 값은 커진다. 파일을 생성하는 것은 이 값에 영향을 미치지 않는다.
[^9]: 실행 가능하지 않은 파일/디렉토리는 `*` 기호가 나타나지 않는다.

## -L, --dereference

Symbolic Link들에 대해, Symbolic Link 파일 그 자체의 정보가 아닌, Symbolic Link가 참조하고 있는 파일의 정보를 출력한다.

## -m

파일/디렉토리 명을 쉼표(`,`)로 구분해 출력한다.

## -n, --numeric-uid-gid

`-l` 옵션과 유사. 다만 소유자와 그룹을 숫자로 나타낸다.

## -N, --literal

기본적으로 `ls` 명령어는 파일/디렉토리 명을 출력할 때 파이프라이닝 등에서 혼동의 여지가 없도록 필요하다면 따옴표(`'`)를 추가해 출력한다(ex. 띄어쓰기가 있는 파일 등). 이 옵션을 사용하면 파일/디렉토리 명을 출력할 때 항상 따옴표를 사용하지 않고 출력한다. 

## -o

`-l` 옵션과 유사. 다만 그룹(group)을 나타내는 열이 빠진다(소유자 정보만 출력한다).

## -p

디렉토리를 출력할 때 `/` 기호를 붙인다.

## -Q, --quote-name

파일/디렉토리명을 출력할 때 쌍따옴표(`"`)로 감싼다.

## -r

알파벳 역순으로 출력한다. 정렬 옵션(ex. `--sort`, `-S`, `-t`, `-X`)을 사용하는 경우, 정렬 결과의 역순으로 출력한다.

## -R, --recursive

하위 디렉토리도 재귀적으로 출력한다.

## -S, --sort=size

파일 크기가 큰 순으로 정렬한다.

## --time-style=[TIME_STYLE]

`-l` 옵션과 함께 사용해, 출력되는 시간의 형태를 조정한다. 사용할 수 있는 옵션은 다음과 같다.

{:.no-guide-line}
- `full-iso` : `2021-07-05 14:08:49.122804434 +0900`과 같은 형식
- `long-iso` : `2021-07-05 14:08`과 같은 형식
- `iso` : `07-05 14:08`과 같은 형식
- `locale` : `7월  5 14:08`과 같은 형식 (기본값)
- `+FORMAT` : `FORMAT` 문자열의 형식에 맞게 출력한다. 예를 들어, `--time-style=+'%Y.%m.%d %H:%M'` 옵션을 주면 `2021.07.14 14:08` 과 같이 출력된다. `FORMAT` 문자열 형식은 `date` 명령어에서 사용하는 것과 동일하다.

## -t, --sort=time

마지막으로 편집된 시간(mtime, modify time) 순서대로 정렬한다. 최근 순으로 정렬된다.

다음과 같이 추가적인 옵션을 주면 다른 종류의 시간에 대해 정렬할 수 있다.

{:.no-guide-line}
- `-tu` : 마지막으로 접근된 시간(atime, access time) 순서대로 정렬
- `-tc` : 마지막으로 수정된 시간(ctime, change time) 순서대로 정렬

## -u, --time=atime, --time=access, --time=use

파일/디렉토리가 마지막으로 접근된 시간(atime, access time) 순으로 정렬한다. 최근 순으로 정렬된다.

{:.no-guide-line}
- `-l` 옵션과 함께 쓸 경우 : 파일/디렉토리가 마지막으로 편집된 시간(mtime, modify time)이 아닌, atime이 출력된다. 정렬은 기본값(이름 알파벳 순)으로 된다.
- `-lt` 옵션과 함께 쓸 경우 : 파일/디렉토리의 mtime이 아닌 atime이 출력되고, atime 순으로 정렬된다.

## -X, --sort=extension

확장자(extension) 알파벳 순으로 정렬한다.

## --help

설명서 보기

# 기타

{:.no-guide-line}
- Ubuntu의 경우 `ls -alF`의 별칭(alias)으로 `ll`을 사용할 수 있다.[^10]

[^10]: `~/.bashrc` 파일에 `alias ll='ls-alF'`가 설정되어 있다.



