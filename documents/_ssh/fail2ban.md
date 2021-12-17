---
title: "fail2ban"
order: 100
date_created: "2021-12-17"
date_modified: "2021-12-18"
---

# fail2ban이란?

공개 IP 주소를 갖는 컴퓨터에 ssh 서버를 열어 놓고 기다리고 있으면 놀랍게도 전 세계에서 접속 시도가 들어오는 것을 볼 수 있다. 이는 전 세계 곳곳의 해커(!)들이나 할일없는 사람들이 접속 가능한 서버가 있는지를 탐색하고 있는 것이다! 단순한 비밀번호를 사용하는 등 서버 보안이 취약하다면, 서버의 관리자 권한이 탈취당하거나 심지어 DOS 공격 등을 받을 수도 있다(물론 개인 서버가 이 정도 공격을 받을 일은 거의 없긴 하지만 말이다).

이를 막기 위해 사용할 수 있는 한 가지 프로그램 중 하나가 바로 **fail2ban**이다. fail2ban은 서비스의 로그 파일을 읽어, 특정 IP에서 정해진 시간(`findtime`) 동안 정해진 횟수(`maxretry`)를 초과하여 접속에 실패했다면 정해진 시간(`bantime`) 동안 그 IP를 차단하는 간단한 서비스이다. 즉 ssh 서비스에 대해 fail2ban을 설정하면 비정상적인 ssh 접속을 차단할 수 있고, apache 웹 서버에 대해 fail2ban을 설정하면 비정상적인 로그인 시도 등을 차단할 수 있다.

이번 글에서는 fail2ban을 이용해 비정상적은 ssh 접속 시도를 차단하는 방법을 알아보도록 보자.

# Ubuntu에 설치하기

Ubuntu에서는 `apt`를 이용해 쉽게 fail2ban을 설치할 수 있다.

{:.code-header}
fail2ban 설치하기

{% highlight bash %}
sudo apt install fail2ban
{% endhighlight %}

2021년 12월 현재 fail2ban v0.11.1이 설치된다.

설치가 완료되었으면 다음 명령어를 실행해 fail2ban을 활성화한다.

{:.code-header}
fail2ban 활성화하기

{% highlight bash %}
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban
{% endhighlight %}

만약 fail2ban을 더이상 사용하지 않으려면 다음 명령어를 입력해 비활성화시킬 수 있다.

{:.code-header}
fail2ban 비활성화하기

{% highlight bash %}
sudo systemctl stop fail2ban
sudo systemctl disable fail2ban
{% endhighlight %}

# fail2ban 설정하기

fail2ban 설정 파일은 `/etc/fail2ban/` 디렉토리에서 찾을 수 있다. `/etc/fail2ban/jail.conf` 파일이 fail2ban 기본 설정 파일이지만, 일반적으로 사용자 설정은 이 파일을 직접 건드리기보단 `/etc/fail2ban/jail.d` 디렉토리 밑에 개인 설정 파일을 만들어 한다.[^1]

[^1]: `/etc/fail2ban/jail.d` 디렉토리 안의 설정은 `/etc/fail2ban/jail.conf`의 설정을 덮어씌운다(overwrite).

fail2ban v0.11.1 기준, Ubuntu에 설치하면 기본적으로 `/etc/fail2ban/jail.d/defaults-debian.conf` 파일이 만들어져 있다. 이를 삭제하고 `/etc/fail2ban/jail.d/custom.local` 파일을 만든 후, 다음과 같이 작성한다.

{:.code-header}
/etc/fail2ban/jail.d/custom.local

{% highlight text linenos %}
[DEFAULT]
# ignoreip = 127.0.0.1/8 192.168.1.0/24

# findtime 초 동안 maxretry 번 이상 실패 시, bantime 초 동안 차단
findtime = 60
maxretry = 3  
bantime = 10800

[sshd]
enabled = true
# port = 12222
# logpath = /ssh/log/path
{% endhighlight %}

- line 1 : `[DEFAULT]` 블록
  - line 2 : `ignoreip`

    차단하지 않을 IP를 설정한다. 단일 IP를 입력할 수도 있고(ex. `127.0.0.1`), mask를 이용해 IP 대역을 입력할 수도 있다(ex. `192.168.10.0/24`). 여러 개의 IP를 입력할 때는 공백으로 구분한다(ex. `127.0.0.1 192.168.10.0/24`).
    
    실수로 admin이 차단당했을 때 풀 수 있도록 일반적으로 내부망 IP를 주는 경우가 많다. 필자는 이 설정을 사용하지 않을 거라서 주석 처리(`#`)해 놓았다.

  - line 5, 6, 7 : `findtime`, `maxretry`, `bantime`
  
    fail2ban은 특정 IP가 `findtime`초 동안 `maxretry`번 이상 접속 실패 시 `bantime`초 동안 그 IP를 차단한다. `findtime`과 `bantime`의 단위는 모두 초(second)이다. 만약 `bantime = -1`이라 하면 해당 IP는 영구차단된다.

- line 9 : `[sshd]` 블록
  - line 10 : `enabled`

    sshd 서비스를 감시하도록 하는 설정이다.

  - line 11 : `port`
  
    만약 ssh로 22번 기본 포트가 아닌 다른 포트를 사용한다면 이 항목을 통해 fail2ban에 알려준다. 필자는 기본 설정을 사용하기에 주석 처리(`#`)해 놓았다.

  - line 12 : `logpath`
  
    만약 sshd 로그 파일이 `/var/log/auth.log`가 아닌 다른 경로에 위치해 있다면 이 항목을 통해 fail2ban에 알려준다. 필자는 기본 설정을 사용하기에 주석 처리(`#`)해 놓았다.

설정 파일을 추가/변경/삭제했으면 fail2ban 서비스를 재시작하자.

{:.code-header}
fail2ban 재시작

{% highlight bash %}
sudo systemctl restart fail2ban
{% endhighlight %}

# fail2ban 현재 상태 확인

fail2ban이 현재 실행 중인지 아닌지는 다음 명령어를 통해 확인할 수 있다.

{:.code-header}
fail2ban 실행 상태 확인

{% highlight bash %}
sudo systemctl status fail2ban
{% endhighlight %}

초록색 불과 함께 `Active: active (running)`이라 나오면 fail2ban이 실행 중이라는 의미이다.

fail2ban의 현재 얼마나 많은 ssh 접속 시도를 차단했는지 그 현황을 보고 싶으면 다음 명령어를 통해 확인할 수 있다.

{:.code-header}
fail2ban의 sshd 접속 시도 차단 현황 확인

{% highlight bash %}
sudo fail2ban-client status sshd
{% endhighlight %}

{:.code-result}
{% highlight text %}
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     11
|  `- File list:        /var/log/auth.log
`- Actions
   |- Currently banned: 1
   |- Total banned:     1
   `- Banned IP list:   8.218.30.70
{% endhighlight %}

# fail2ban 차단 해제

보안을 위해 이런 류의 차단 프로그램을 사용하다 보면 실수로 잘못 차단되어버리는 경우가 항상 발생한다. fail2ban으로 IP `xxx.xxx.xxx.xxx`가 잘못 차단된 경우 다음 명령어를 통해 차단 해제할 수 있다.

{:.code-header}
fail2ban 차단 해제 (sshd, IP xxx.xxx.xxx.xxx)

{% highlight bash %}
sudo fail2ban-client set sshd unbanip xxx.xxx.xxx.xxx
{% endhighlight %}

# 기타

fail2ban의 로그는 `/var/log/fail2ban.log`에서 볼 수 있다. 현재 어떤 설정이 로드됐는지, 어떤 IP의 차단이 진행되고 있는지 등을 볼 수 있다.