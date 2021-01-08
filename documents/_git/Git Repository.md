---
title: "Git 저장소 (Git Repository)"
order: 3
date: "2021-01-08"
---

Git 저장소(Repository)는 Git이 버전 관리를 하고 있는 폴더를 의미한다. Git에는 로컬 저장소(Local Repository)와 원격 저장소(Remote Repository), 이렇게 두 가지 종류의 저장소가 있다.

# 로컬 저장소 (Local Repository)

로컬 저장소는 사용자의 컴퓨터(로컬)에 저장된 Git 저장소이다. 로컬에 있기 때문에 오프라인 상태에서도 버전 관리가 가능하다.

로컬 저장소를 만드는 방법은 두 가지가 있다.

- 아직 버전 관리를 하지 않는 로컬 디렉토리를 새로운 Git 저장소로 만든다. → [`git init`](#kramdown_로컬-저장소-새로-만들기--git-init)
- 원격 저장소를 복제한다.

## 로컬 저장소 새로 만들기 : git init

특정 디렉토리를 로컬 저장소로 만들고 싶다면 해당 디렉토리로 이동한 후 다음 명령어를 입력하면 된다.

{% highlight bash %}
$ git init
{% endhighlight %}

이렇게 되면 해당 디렉토리는 로컬 저장소가 되고, 파일들의 버전을 관리할 준비가 된 것이다.

`git init`을 입력하면 디렉토리 밑에 `.git` 폴더를 만든다. Git은 이 폴더 안에 변경 이력 등 버전 관리를 위한 파일들을 모두 저장한다. 이 디렉토리를 지우면 Git은 더이상 버전 관리를 할 수가 없다. 만약 로컬 저장소를 더이상 로컬 저장소로 사용하고 싶지 않다면(버전 관리를 하고 싶지 않다면), 그냥 단순히 `.git` 디렉토리를 삭제하면 된다.

{% highlight bash %}
$ rm -rf .git
{% endhighlight %}

## 원격 저장소 복제하기 : git clone

`git clone` 명령어를 이용하면 원격 저장소를 로컬로 복제할 수 있다.

{% highlight bash %}
$ git clone <url> <dir_name>
{% endhighlight %}

- `<url>` : [필수] 원격 저장소 url
- `<dir_name>` : [생략 가능] 원격 저장소가 복제될 위치. 생략하면 원격 저장소의 이름을 딴 디렉토리 밑에 로컬 저장소가 생성된다.

예를 들어 VSCode의 원격 저장소 url은 `https://github.com/microsoft/vscode.git`이다. 다음 명령어를 입력하면 로컬에 `~/vscode/` 디렉토리가 생성되고 이 밑에 VSCode의 Git 로컬 저장소가 원격 저장소로부터 복제되어 생성된다.

{% highlight bash %}
$ git clone https://github.com/microsoft/vscode.git
{% endhighlight %}

다음과 같이 하면 `~/happy/` 디렉토리 밑에 로컬 저장소를 복제, 생성할 수 있다.

{% highlight bash %}
$ git clone https://github.com/microsoft/vscode.git happy
{% endhighlight %}

# 원격 저장소 (Remote Repository)

원격 저장소는 원격 컴퓨터(서버)에 저장된, 여러 사람들이 함게 공유하여 사용하는 Git 저장소이다.

원격 저장소는 Git 서버에 만들 수 있다. Git 서버는 직접 빌드할 수도 있지만, 일반적으로 깃허브(GitHub), BitBucket, GitLab 등과 같은 상용 Git 서버를 사용한다. 특히 깃허브는 "오픈소스의 성지"라 불릴 정도로 정말 많은 오픈소스 프로젝트들이 사용하는 Git 호스팅 서비스이다. 깃허브는 이외에도 편리한 UI, 이슈 관리, 개발 프로세스 관리, 위키 페이지 등의 다양한 기능을 제공한다.

본 컬렉션에서는 깃허브를 사용한다고 가정한다.

# Git을 이용한 일반적인 작업 패턴

Git을 이용한 일반적인 작업 패턴은 다음과 같다.

1. (로컬 저장소를 생성한다. 아직 버전 관리를 하지 않는 로컬 디렉토리를 새로운 Git 저장소로 만들 수도 있고, 원격 저장소를 복제(clone)해 올 수도 있다.)
2. 로컬 저장소의 파일들을 수정/편집한다.
3. 변경 내용을 저장[^1]해 로컬 저장소를 업데이트한다.
4. 로컬 저장소의 변경 내용을 원격 저장소로 업로드해[^2] 원격 저장소를 업데이트(동기화)한다.
5. 다른 사용자들은 (원격 저장소가 업데이트되었을 경우) 원격 저장소의 변경 내용을 로컬 저장소로 다운로드해[^3] 로컬 저장소를 업데이트(동기화)한다.

[^1]: 이를 커밋(commit)이라 한다.
[^2]: 이를 푸시(push)라 한다.
[^3]: 이를 풀(pull)이라 한다.