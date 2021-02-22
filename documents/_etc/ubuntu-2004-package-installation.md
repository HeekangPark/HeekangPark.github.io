---
title: "Ubuntu 20.04 사용기 - 패키지 설치"
date: "2021-02-19"
tags: ["ubuntu", "ubuntu20.04", "vscode", "mailspring", "chrome", "google_chrome", "크롬", "구글_크롬", "한컴오피스_한글_뷰어", "한글_뷰어", "아래아한글_뷰어", "hancomeoffice_hwp_viewer", "hwp_viewer", "virbualbox"]
---

이번에 데스크탑에 Ubuntu 20.04를 설치하게 되었다. 필자는 주로 Windows를 사용했기에 Ubuntu에서 프로그램을 설치하는 것이 많이 낯설었다. 특히 2021년 2월 현재 많은 프로그램들이 아직 Ubuntu 20.04를 위한 공식 버전을 내놓지 않은 경우가 많아 이들을 설치하기 위해 꽤 골머리를 썩혔다.~~정보 : Ubuntu 20.04는 2020년 4월 릴리즈되었다. 출시된지 10개월이 다 됐는데도 아직까지 20.04를 공식적으로 지원하지 않는 프로그램들이 이렇게 많은 것을 보면 안습한 Ubuntu 환경에 눈물이 앞을 가린다ㅠ~~ 본 문서는 필자가 Ubuntu 20.04 환경에서 패키지들을 설치한 경험을 정리한 것이다. 필자와 유사한 상황의 사용자가 있다면 부디 이 문서가 도움이 되길 바란다.

# VSCode (텍스트 편집기)

VSCode를 설치하는 자세한 방법은 [해당 문서](/vscode/01-installation#kramdown_linuxubuntu에-vscode-설치하기)를 참고하자.

여담으로, `snap`을 이용하면 VSCode를 아주 간편하게 설치할 수 있지만 한글이 입력되지 않는 치명적인 버그가 있다. 인터넷 조사 결과 이 문제는 VSCode 뿐만 아니라 `snap`으로 설치한 많은 패키지들에서 발견되는 문제로, `snap`으로 설치한 패키지와 Ubuntu의 IME(ex. IBus)가 충돌하는 것이 원인이라 한다. [관련 Github Issue](https://github.com/snapcrafters/vscode/issues/47), [Ubuntu 버그 리포트](https://bugs.launchpad.net/ubuntu/+source/snapd/+bug/1580463)

그래서 필자는 `snap`으로 설치된 VSCode를 제거하고 `apt`를 이용한 설치를 진행하여 VSCode를 잘 사용하...려 했는데, 이번에는 VSCode를 실행하면 몇초 뒤에 죽어버리는 현상이 발생하였다. VSCode를 `sudo`로 실행하면 안 죽지만 `sudo` 없이 일반 사용자 권한으로 실행하면 계속 죽었다. `snap` 버전이 만든 잔여 파일들 때문에 어디선가 충돌이 발생해 죽는 것으로 추정되지만 결국 제대로 된 원인을 찾지 못했다. 할 수 없이 그냥 Ubuntu를 재설치하고 처음부터 `apt`를 이용해 VSCode를 설치하니 다행히 아무 오류없이 설치 및 실행이 잘 되었다(한글도 잘 입력되었다!).

# Mailspring (메일 클라이언트)

Ubuntu에서는 사용하기 좋은 메일 클라이언트로 [Mailspring](https://getmailspring.com/)이 있다. Mailspring은 `snap`을 이용해 손쉽게 설치할 수 있다.[^1] 우선 `snap`이 설치되어 있지 않다면 다음 명령어를 입력해 `snap`을 설치한다.

[^1]: 위의 VSCode 설치를 설명한 [문단](#kramdown_vscode-텍스트-편집기)에서 `snap`으로 설치된 많은 패키지들에 한글 입력 문제가 발생한다고 서술했는데, 다행히 Mailspring는 `snap`으로 설치해도 정상적으로 한글 입력이 되는 것을 확인하였다.

{% highlight bash %}
$ sudo apt update
$ sudo apt install snapd
{% endhighlight %}

이후 snap을 이용해 Mailspring을 설치한다.

{% highlight bash %}
$ sudo snap install mailspring
{% endhighlight %}

# Google Chrome (웹 브라우저)

Ubuntu는 Firefox를 기본 브라우저로 밀고 있지만, 개인적으로 Chrome이 더 익숙하기에 Chrome을 설치했다. Chrome은 다음 명령어로 설치할 수 있다.

{% highlight bash %}
$ wget -q -O- "https://dl.google.com/linux/linux_signing_key.pub" | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main"
$ sudo apt update
$ sudo apt install -y google-chrome-stable
{% endhighlight %}

# MS Office (오피스 프로그램)

오피스 프로그램은 Microsoft에서 만든 MS Office가 최고다. 하지만 MS Office는 Ubuntu 20.04에 설치하지 못한다. Wine을 사용해 .exe 버전을 설치하거나 LibreOffice같은 대체품을 쓰는 방법이 있긴 한데, Wine으로 설치하는 것은 속도와 안정성 문제가 있고, MS Office 대체품들은 MS Office에 비해 압도적으로 편리성/기능성이 낮다는 문제가 있다.~~돈받고 파는건데 그정도는 해 줘야지~~

인터넷 조사 결과 Ubuntu 20.04에서 MS Office를 쓰는 가장 그럴듯한 방법은 Office 365를 이용해 웹 브라우저에서 MS Office를 사용하는 것이다. 이때 귀찮은게 매번 OneDrive에 읽고 수정할 MS Office 파일을 올리는 것인데, 이는 [OneDrive 클라이언트](#kramdown_onedrive-client-for-linux-onedrive-클라이언트)를 사용하면 조금 편해진다. OneDrive와 동기화되고 있는 디렉토리에 파일을 던져놓으면 OneDrive Client가 이를 OneDrive로 동기화시켜주고, 이를 웹 브라우저에서 Office 365를 이용해 읽고 편집할 수 있게 되는 식이다.

# OneDrive Client for Linux (OneDrive 클라이언트)

2021년 2월 현재 `apt`에 기본적으로 등록되어 있는 OneDrive는 버전이 너무 낮아 로그인이 되지 않는다. 다행히 한 개발자 분이 [OneDrive Client for Linux](https://abraunegg.github.io/)라는 Linux용 오픈소스 OneDrive 클라이언트를 배포했으므로 이를 설치하자. [Github Link](https://github.com/abraunegg/onedrive)

{% highlight bash %}
$ sudo add-apt-repository ppa:yann1ck/onedrive
$ sudo apt update
$ sudo apt install -y onedrive
{% endhighlight %}

OneDrive Client for Linux를 사용하려면 우선 Microsoft 계정으로 로그인해야 한다. OneDrive Client for Linux 설치 후 다음 명령어를 입력하면 로그인을 위한 URL이 뜬다.[^2]

[^2]: 로그인에 성공했다면 뜨지 않는다.

{% highlight bash %}
$ onedrive
{% endhighlight %}

{: .code-result .code-result-example}
{% highlight text %}
Configuring Global Azure AD Endpoints
Authorize this app visiting:

https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=a123-b456-c789-d0&scope=Files.ReadWrite%20Files.ReadWrite.all%20Sites.Read.All%20Sites.ReadWrite.All%20offline_access&response_type=code&redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient

Enter the response uri: 
{% endhighlight %}

`Authorize this app visiting:`의 URL을 복사해 웹 브라우저에서 접속하면 Microsoft 계정으로 로그인을 진행할 수 있다. 로그인 후 앱의 사용 권한을 허가해주면 빈 화면이 나오는데, 당황하지 말고 해당 빈 화면의 URL을 복사해 `Enter the response uri:`에 입력하면 로그인이 된다.

이제 OneDrive Client for Linux를 설정값들을 조정해보자. 현재 OneDrive Client for Linux가 사용중인 설정값은 `--display-config` 옵션으로 읽을 수 있다.

{% highlight bash %}
$ onedrive --display-config
{% endhighlight %}

{: .code-result .code-result-example}
{% highlight text %}
onedrive version                       = vX.Y.Z-A-bcdefghi
Config path                            = /home/alex/.config/onedrive
Config file found in config path       = false
Config option 'check_nosync'           = false
Config option 'sync_dir'               = /home/alex/OneDrive
Config option 'skip_dir'               = 
Config option 'skip_file'              = ~*|.~*|*.tmp
Config option 'skip_dotfiles'          = false
Config option 'skip_symlinks'          = false
Config option 'monitor_interval'       = 300
Config option 'min_notify_changes'     = 5
Config option 'log_dir'                = /var/log/onedrive/
Config option 'classify_as_big_delete' = 1000
Config option 'sync_root_files'        = false
Selective sync configured              = false
{% endhighlight %}

아무런 조작도 하지 않을 경우 OneDrive Client for Linux는 기본값을 사용한다.[^3] 만약 특별한 설정을 하고 싶다면 `~/.config/onedrive/config` 파일에 해당 설정값을 저장하면 된다.[^4] 예를 들어 동기화되는 디렉토리를 `~/clouds/OneDrive/`로 변경하고 싶은 경우[^5], 다음 명령어를 입력하면 된다.

[^3]: 기본값 목록은 [여기](https://raw.githubusercontent.com/abraunegg/onedrive/master/config)에서 볼 수 있다.
[^4]: `~/.config/onedrive/config` 파일은 기본적으로 존재하지 않으므로 직접 만들어야 한다.
[^5]: 기본값은 `~/OneDrive/`이다.

{% highlight bash %}
$ rm ~/.config/onedrive/config  # 기존 config 삭제
$ touch ~/.config/onedrive/config  # config 새로 생성
$ echo "sync_dir = \"~/clouds/OneDrive\"" >> ~/.config/onedrive/config  # sync_dir 설정 추가
{% endhighlight %}

이제부터 OneDrive와 동기화를 해 보자. OneDrive Client for Linux는 동기화를 위한 두 가지 옵션이 있다. 첫 번째는 `--synchronize` 옵션으로, 원격 OneDrive에서 로컬 OneDrive 디렉토리로 1회 동기화(다운로드)한다. 두 번째는 `--monitor` 옵션으로, 로컬 디렉토리가 변경되는 것을 감지하고 주기적으로 계속 동기화한다.

{% highlight bash %}
$ onedrive --synchronize
$ onedrive --monitor
{% endhighlight %}

# 한컴오피스 한글 뷰어 (hwp 뷰어)

학교에서 공문들을 보내줄 때 pdf 포멧으로 보내주면 참 좋으련만, hwp 포멧으로 보내는 일이 많아 한컴오피스 뷰어를 깔게 됐다.

일단 결론부터 말하자면 한컴오피스 한글 뷰어는 2021년 2월 현재 Ubuntu 20.04를 공식적으로 지원하지 않는다. 한글과컴퓨터 홈페이지에 올라와 있는 Ubuntu용 한컴오피스 한글 뷰어는 Ubuntu 14.04 LTS용이다.~~보아하니 앞으로도 Ubuntu 최신 버전을 공식 지원할 생각은 없어보인다~~ 하지만 다행히도 이를 Ubuntu 20.04에 설치해도 정상적으로 작동하는 것을 확인하였다.

한컴오피스 한글 뷰어를 설치하려면 우선 웹 브라우저로 [한컴오피스 다운로드 페이지](https://www.hancom.com/cs_center/csDownload.do)에 접속한 후 "Linux(Ubuntu) 한컴오피스 한글 Viewer 64bit"용 .deb 파일(`hancomoffice-hwpviewer-Ubuntu-amd64.deb`)을 다운로드해야 한다.~~이것도 스크립트로 만들고 싶었지만 불가능했다ㅠ~~

그리고 다음 명령어를 이용해 설치를 진행한다.

{% highlight bash %}
$ wget -q "http://archive.ubuntu.com/ubuntu/pool/main/i/icu/libicu60_60.2-3ubuntu3.1_amd64.deb" "http://archive.ubuntu.com/ubuntu/pool/universe/w/webkitgtk/libjavascriptcoregtk-3.0-0_2.4.11-3ubuntu3_amd64.deb" "http://archive.ubuntu.com/ubuntu/pool/universe/w/webkitgtk/libwebkitgtk-3.0-0_2.4.11-3ubuntu3_amd64.deb"
$ sudo dpkg -i libicu60_60.2-3ubuntu3.1_amd64.deb libjavascriptcoregtk-3.0-0_2.4.11-3ubuntu3_amd64.deb libwebkitgtk-3.0-0_2.4.11-3ubuntu3_amd64.deb hancomoffice-hwpviewer-Ubuntu-amd64.deb
$ sudo apt install -fy
$ sudo rm libicu60_60.2-3ubuntu3.1_amd64.deb libjavascriptcoregtk-3.0-0_2.4.11-3ubuntu3_amd64.deb libwebkitgtk-3.0-0_2.4.11-3ubuntu3_amd64.deb hancomoffice-hwpviewer-Ubuntu-amd64.deb
{% endhighlight %}

`dpkg` 명령어로 .deb 파일을 설치하는 중 아마 의존성 문제로 설치에 실패할 것이다. 하지만 `sudo apt install -f` 명령어로 모든 의존성 문제를 해결할 것이므로 걱정하지 말고 진행하자.

# VirtualBox (가상화 프로그램)

다음 명령어를 입력하면 VirtualBox를 설치할 수 있다.

{% highlight bash %}
$ sudo apt update
$ sudo apt install -y virtualbox virtualbox-ext-pack
{% endhighlight %}

2021년 2월 현재 `apt`로 VirtualBox를 설치하면 v6.1.16이 설치된다. 참고로 `virbualbox-ext-pack`은 설치 시 라이선스에 동의하는지를 묻는 창이 나온다. `<확인>`-`<예>`을 선택하면 된다.

{% highlight bash %}
$ sudo apt update
$ sudo apt install -y virtualbox virtualbox-ext-pack
{% endhighlight %}