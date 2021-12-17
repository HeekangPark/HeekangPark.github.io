---
title: "Ubuntu Server가 절전 모드로 들어가는 것을 막는 방법"
date_created: "2021-11-26"
date_modified: "2021-12-18"
---

# 문제상황

이번에 데스크탑 컴퓨터에 Ubuntu Server(20.04.3 LTS)를 설치하게 되었다. 서버에 ssh server를 올린 후, 노트북에서 ssh를 이용해 서버에 접속해 열심히 서버 환경 설정을 하고 있는데, 갑자기 ssh 연결이 끊겼다. 알고보니 데스크탑 컴퓨터에 일정 시간동안 입력이 없자 절전 모드로 진입한 것이었다.

# 해결법

현재 서버에 절전 모드가 설정되어 있는지를 확인해 보고 싶다면 다음 명령어를 입력해 보면 된다.

{% highlight bash %}
systemctl status sleep.target suspend.target hibernate.target hybrid-sleep.target
{% endhighlight %}

{:.code-result}
{% highlight text %}
● sleep.target - Sleep
     Loaded: loaded (/lib/systemd/system/sleep.target; static; vendor preset: enabled)
     Active: inactive (dead)
       Docs: man:systemd.special(7)

● suspend.target - Suspend
     Loaded: loaded (/lib/systemd/system/suspend.target; static; vendor preset: enabled)
     Active: inactive (dead)
       Docs: man:systemd.special(7)

● hibernate.target - Hibernate
     Loaded: loaded (/lib/systemd/system/hibernate.target; static; vendor preset: enabled)
     Active: inactive (dead)
       Docs: man:systemd.special(7)

● hybrid-sleep.target - Hybrid Suspend+Hibernate
     Loaded: loaded (/lib/systemd/system/hybrid-sleep.target; static; vendor preset: enabled)
     Active: inactive (dead)
       Docs: man:systemd.special(7)
{% endhighlight %}

`Loaded`가 `loaded`로 되어 있다면 절전 모드 설정이 되어 있는 것이다. 서버 모드에 왜 디폴트로 절전 모드 설정이 되어 있는지는 도저히 이해가 되지 않지만, 해결법은 다음과 같다.

{% highlight bash %}
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
{% endhighlight %}

{:.code-result}
{% highlight text %}
Created symlink /etc/systemd/system/sleep.target → /dev/null.
Created symlink /etc/systemd/system/suspend.target → /dev/null.
Created symlink /etc/systemd/system/hibernate.target → /dev/null.
Created symlink /etc/systemd/system/hybrid-sleep.target → /dev/null.
{% endhighlight %}

이제 다시 `systemctl status` 명령어로 설정값을 확인해 보면 다음과 같이 나온다.

{% highlight bash %}
systemctl status sleep.target suspend.target hibernate.target hybrid-sleep.target
{% endhighlight %}

{:.code-result}
{% highlight text %}
● sleep.target
     Loaded: masked (Reason: Unit sleep.target is masked.)
     Active: inactive (dead)

● suspend.target
     Loaded: masked (Reason: Unit suspend.target is masked.)
     Active: inactive (dead)

● hibernate.target
     Loaded: masked (Reason: Unit hibernate.target is masked.)
     Active: inactive (dead)

● hybrid-sleep.target
     Loaded: masked (Reason: Unit hybrid-sleep.target is masked.)
     Active: inactive (dead)
{% endhighlight %}

만약 (이해할 순 없지만) 다시 절전모드 설정을 되돌리고 싶다면 다음 명령어를 입력하면 된다.

{% highlight bash %}
sudo systemctl unmask sleep.target suspend.target hibernate.target hybrid-sleep.target
{% endhighlight %}