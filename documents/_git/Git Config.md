---
title: "Git 설정하기 : git config"
order: 5
date: "2021-01-08"
---

Git은 다음과 같이 세 종류의 config 파일을 사용한다.

- `.git/config` : Git 저장소 안의 `.git` 디렉토리 밑에 저장되는 config 파일로, 해당 Git 저장소에만 적용된다. 이를 이용하면 서로 다른 Git 저장소 간에 서로 다른 설정을 할 수 있다. 가장 우선순위가 높다. 즉, 다른 config 파일에 동일한 설정 항목이 있을 경우 `.git/config` 파일의 설정이 우선된다.
- `~/.gitconfig` 혹은 `~/.config/git/config` : 사용자의 홈 디렉토리 밑에 저장되는 config 파일로, 해당 사용자에만 적용된다. 이를 이용하면 서로 다른 사용자 간에 서로 다른 설정을 할 수 있다. 두 번째로 우선순위가 높다.
- `/etc/gitconfig` : 시스템 폴더인 `/etc/` 폴더 밑에 저장되는 설정으로, 시스템의 모든 사용자와 모든 Git 저장소에 적용된다. 이곳에 설정값을 저장하기 위해서는 관리자 권한이 필요하다. 가장 우선순위가 낮다.

config 파일에 설정값을 저장하기 위해서는 `git config` 명령어를 사용한다. `.git/config` 파일에 설정값을 저장하려면 아무런 옵션을 주지 않거나 `--local` 옵션을 주면 된다. `~/.gitconfig` 파일에 설정값을 저장하려면 `--global` 옵션을 주면 된다. `/etc/gitconfig` 파일에 설정값을 저장하려면 `--system` 옵션을 주면 된다.

# 사용자 정보 설정하기

협업에서 중요한 일 중 하나는 누가 어떠한 변경을 했는지를 명확히 하는 것이다. Git에서 변경사항을 저장(commit)하기 위해서는(새로운 버전을 만들기 위해서는) 사용자의 정보(이름과 이메일 주소[^1])가 필요하다. Git은 config 파일로부터 사용자의 정보를 읽어 변경사항을 저장한다.

[^1]: 이메일 주소를 요구하는 이유는, 내가 만든 버전(변경 사항)에 오류가 발생했을 시 연락을 할 수단이 필요하기 때문이다. 거짓 정보를 입력해도 로컬에서의 Git 사용에 문제는 없지만, 오픈 소스 등에 기여할 때 거짓 정보를 입력하면 문제가 발생할 수 있으므로 되도록이면 사실대로 입력하자.~~자신의 코드에 책임을 질 줄 알아야 한다.~~

사용자 정보는 다음과 같이 등록할 수 있다.

{% highlight bash %}
$ git config user.name "<user_name>"
$ git config user.email "<user_email>"
{% endhighlight %}

- `<user_name>` : 사용자 이름
- `<user_email>` : 사용자 이메일

ex)

{% highlight bash %}
$ git config user.name "Heekang Park"                              # .git/config에 저장됨
$ git config user.email "park.heekang33@gmail.com"                 # .git/config에 저장됨

$ git config --local user.name "Heekang Park"                      # .git/config에 저장됨
$ git config --local user.email "park.heekang33@gmail.com"         # .git/config에 저장됨

$ git config --global user.name "Heekang Park"                     # ~/.gitconfig에 저장됨
$ git config --global user.email "park.heekang33@gmail.com"        # ~/.gitconfig에 저장됨

$ sudo git config --system user.name "Heekang Park"                # /etc/gitconfig에 저장됨
$ sudo git config --system user.email "park.heekang33@gmail.com"   # /etc/gitconfig에 저장됨
{% endhighlight %}

# 기본 텍스트 편집기 설정하기

Git에서는 커밋, 병합 등에서 텍스트 편집기를 사용한다. 기본적으로 시스템 기본 편집기[^2]를 사용하나, 다음 명령어로 원하는 편집기를 사용하게 만들 수 있다.

[^2]: 우분투의 경우 nano가 시스템 기본 편집기이다. 

{% highlight bash %}
$ git config core.editor "<editor_name>"
{% endhighlight %}

- `<editor_name>` : 에디터 이름 

예를 들어, 다음과 같이 하면 vim을 기본 에디터로 설정할 수 있다.

{% highlight bash %}
$ git config --global core.editor vim
{% endhighlight %}

# 설정값 읽기

다음 명령어는 모든 설정값을 읽는 명령어이다.

{% highlight bash %}
$ git config --list
{% endhighlight %}

`.git/config`, `~/.gitconfig`, `/etc/gitconfig`에 동일한 설정값이 있다면 실제 적용되는 설정값(가장 우선순위가 높은 설정값)이 출력된다.

다음 명령어는 특정 설정값을 읽는 명령어이다.

{% highlight bash %}
$ git config "<key>"
{% endhighlight %}

- `<key>` : 옵션 이름 (ex. `user.name`, `user.email`, `core.editor`, etc.)

이 명령어 역시 `.git/config`, `~/.gitconfig`, `/etc/gitconfig`에 동일한 설정값이 있다면 실제 적용되는 설정값(가장 우선순위가 높은 설정값)이 출력된다. 다음과 같이 `--show-origin` 옵션을 주면 여러 config 파일 중 어디서 설정값을 읽어 왔는지(실제 어떤 설정값이 적용되고 있는지)를 보여준다.

{% highlight bash %}
$ git config --show-origin "<key>"
{% endhighlight %}