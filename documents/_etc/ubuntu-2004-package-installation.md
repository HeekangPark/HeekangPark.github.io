---
title: "Ubuntu 20.04 사용기 - 패키지 설치"
tags: ["ubuntu", "ubuntu20.04", "vscode", "mailspring", "chrome", "google_chrome", "크롬", "구글_크롬", "한컴오피스_한글_뷰어", "한글_뷰어", "아래아한글_뷰어", "hancomeoffice_hwp_viewer", "hwp_viewer", "virbualbox"]
date_created: "2021-02-19"
date_modified: "2021-02-19"
---

이번에 데스크탑에 Ubuntu 20.04를 설치하게 되었다. 필자는 주로 Windows를 사용했기에 Ubuntu에서 프로그램을 설치하는 것이 많이 낯설었다. 특히 2021년 2월 현재 많은 프로그램들이 아직 Ubuntu 20.04를 위한 공식 버전을 내놓지 않은 경우가 많아 이들을 설치하기 위해 꽤 골머리를 썩혔다.~~정보 : Ubuntu 20.04는 2020년 4월 릴리즈되었다. 출시된지 10개월이 다 됐는데도 아직까지 20.04를 공식적으로 지원하지 않는 프로그램들이 이렇게 많은 것을 보면 안습한 Ubuntu 환경에 눈물이 앞을 가린다ㅠ~~ 본 문서는 필자가 Ubuntu 20.04 환경에서 패키지들을 설치한 경험을 정리한 것이다. 필자와 유사한 상황의 사용자가 있다면 부디 이 문서가 도움이 되길 바란다.

# 들어가기 전에

## apt 서버 카카오 서버로 변경하기

프로그램을 설치하기 전에, 한국 사용자의 경우 `apt` 서버를 속도 빠른 카카오 서버로 바꾸는게 좋다.

`apt`가 사용하는 서버 정보는 `/etc/apt/sources.list` 파일에 저장되어 있다. 한국 사용자의 경우 다음과 같이 `http://kr.archive.ubuntu.com/ubuntu` 서버를 사용하도록 되어 있을 것이다.

{:.code-header}
/etc/apt/sources.list  (주석은 생략함)

{% highlight bash %}
deb http://kr.archive.ubuntu.com/ubuntu/ focal main restricted
deb http://kr.archive.ubuntu.com/ubuntu/ focal-updates main restricted
deb http://kr.archive.ubuntu.com/ubuntu/ focal universe
deb http://kr.archive.ubuntu.com/ubuntu/ focal-updates universe
deb http://kr.archive.ubuntu.com/ubuntu/ focal multiverse
deb http://kr.archive.ubuntu.com/ubuntu/ focal-updates multiverse
deb http://kr.archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu focal-security main restricted
deb http://security.ubuntu.com/ubuntu focal-security universe
deb http://security.ubuntu.com/ubuntu focal-security multiverse
{% endhighlight %}

이를 `sed` 명령어를 이용해 카카오 서버(`http://mirror.kakao.com/ubuntu/`)로 바꾸도록 하자.

{% highlight bash %}
$ sudo cp /etc/apt/sources.list /etc/apt/sources.list.old  # /etc/apt/sources.list 백업
$ sudo sed -i 's/kr.archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
$ sudo sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
$ sudo sed -i 's/extras.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
{% endhighlight %}

## 한글 디렉토리 제거

Ubuntu를 한국어로 설치한 경우 바탕화면 디렉토리의 경로는 `~/바탕화면`, 문서 디렉토리의 경로는 `~/문서`, 사진 디렉토리의 경로는 `~/사진`이 되는 등 경로명에 한글이 들어가게 된다. 이렇게 경로에 한글이 들어가면 프로그램에 따라 오류가 날 수도 있고, 또 무엇보다 터미널에서 디렉토리를 이동할 때 한/영 키를 계속 눌러야 하므로 귀찮다. 이를 바꾸어 보자.

필자는 바탕화면 디렉토리, 문서 디렉토리, 사진 디렉토리 등 Ubuntu 데스크탑이 사용하는 모든 디렉토리를 홈 디렉토리(`~`)로 설정했다. 이를 위해서는 다음 명령어를 입력하면 된다.

{% highlight bash %}
$ sed -i 's/\"$HOME\/.*\"/\"$HOME\"/g' ~/.config/user-dirs.dirs
$ rm -r ~/공개
$ rm -r ~/다운로드
$ rm -r ~/문서
$ rm -r ~/바탕화면
$ rm -r ~/비디오
$ rm -r ~/사진
$ rm -r ~/음악
$ rm -r ~/템플릿
{% endhighlight %}

# 패키지 설치

## VSCode (텍스트 편집기)

VSCode를 설치하는 자세한 방법은 [해당 문서](/vscode/installation#kramdown_linuxubuntu에-vscode-설치하기)를 참고하자.

여담으로, `snap`을 이용하면 VSCode를 아주 간편하게 설치할 수 있지만 한글이 입력되지 않는 치명적인 버그가 있다. 인터넷 조사 결과 이 문제는 VSCode 뿐만 아니라 `snap`으로 설치한 많은 패키지들에서 발견되는 문제로, `snap`으로 설치한 패키지와 Ubuntu의 IME(ex. IBus)가 충돌하는 것이 원인이라 한다. [관련 Github Issue](https://github.com/snapcrafters/vscode/issues/47), [Ubuntu 버그 리포트](https://bugs.launchpad.net/ubuntu/+source/snapd/+bug/1580463)

그래서 필자는 `snap`으로 설치된 VSCode를 제거하고 `apt`를 이용한 설치를 진행하여 VSCode를 잘 사용하...려 했는데, 이번에는 VSCode를 실행하면 몇초 뒤에 죽어버리는 현상이 발생하였다. VSCode를 `sudo`로 실행하면 안 죽지만 `sudo` 없이 일반 사용자 권한으로 실행하면 계속 죽었다. `snap` 버전이 만든 잔여 파일들 때문에 어디선가 충돌이 발생해 죽는 것으로 추정되지만 결국 제대로 된 원인을 찾지 못했다. 할 수 없이 그냥 Ubuntu를 재설치하고 처음부터 `apt`를 이용해 VSCode를 설치하니 다행히 아무 오류없이 설치 및 실행이 잘 되었다(한글도 잘 입력되었다!).

## Mailspring (메일 클라이언트)

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

## Google Chrome (웹 브라우저)

Ubuntu는 Firefox를 기본 브라우저로 밀고 있지만, 개인적으로 Chrome이 더 익숙하기에 Chrome을 설치했다. Chrome은 다음 명령어로 설치할 수 있다.

{% highlight bash %}
$ wget -q -O- "https://dl.google.com/linux/linux_signing_key.pub" | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main"
$ sudo apt update
$ sudo apt install -y google-chrome-stable
{% endhighlight %}

## MS Office (오피스 프로그램)

오피스 프로그램은 Microsoft에서 만든 MS Office가 최고다. 하지만 MS Office는 Ubuntu 20.04에 설치하지 못한다. Wine을 사용해 .exe 버전을 설치하거나 LibreOffice같은 대체품을 쓰는 방법이 있긴 한데, Wine으로 설치하는 것은 속도와 안정성 문제가 있고, MS Office 대체품들은 MS Office에 비해 압도적으로 편리성/기능성이 낮다는 문제가 있다.~~돈받고 파는건데 그정도는 해 줘야지~~

인터넷 조사 결과 Ubuntu 20.04에서 MS Office를 쓰는 가장 그럴듯한 방법은 Office 365를 이용해 웹 브라우저에서 MS Office를 사용하는 것이다. 이때 귀찮은게 매번 OneDrive에 읽고 수정할 MS Office 파일을 올리는 것인데, 이는 [OneDrive 클라이언트](#kramdown_onedrive-client-for-linux-onedrive-클라이언트)를 사용하면 조금 편해진다. OneDrive와 동기화되고 있는 디렉토리에 파일을 던져놓으면 OneDrive Client가 이를 OneDrive로 동기화시켜주고, 이를 웹 브라우저에서 Office 365를 이용해 읽고 편집할 수 있게 되는 식이다.

## OneDrive Client for Linux (OneDrive 클라이언트)

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

## 한컴오피스 한글 뷰어 (hwp 뷰어)

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

## VirtualBox (가상화 프로그램)

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

## 카카오톡 (메신저 프로그램)

일단 공식적으로 카카오톡은 Ubuntu를 지원하지 않는다. Ubuntu 20.04에서 카카오톡을 사용하려면 Wine을 이용하는 방법밖에 없다.

우선 다음 명령어를 입력해 32비트 환경을 활성화한다.

{% highlight bash %}
$ sudo dpkg --add-architecture i386
{% endhighlight %}

그리고 다음 명령어를 입력해 Wine과 PlayOnLinux를 설치하고 카카오톡 설치 파일(`KakaoTalk_Setup.exe`)을 다운로드한다.

{% highlight bash %}
$ sudo apt install -y wine playonlinux
$ wget -q https://app-pc.kakaocdn.net/talk/win32/KakaoTalk_Setup.exe
{% endhighlight %}

설치 및 다운로드가 완료되었으면 앱 목록에서 PlayOnLinux를 클릭하여 PlayOnLinux를 실행한다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-01.png" title="PlayOnLinux 실행" %}

우선 시스템에 Wine 환경을 만들어야 한다. 위 "도구" 메뉴에서 "Wine 버전 관리" 메뉴를 클릭하면 PlayOnLinux wine 버전 관리자 대화창이 뜬다. 2021년 현재 가장 최신의 안정 버전은 6.0 버전이므로 이를 설치하자. 왼쪽 패널(사용 가능한 Wine 버전)에서 "6.0"을 찾아 선택한 후, 가운데의 `>` 버튼을 클릭하면 Wine 6.0 버전 설치를 위한 대화창이 뜬다. "다음" 버튼을 누르면 설치가 자동으로 된다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-02.png" title="PlayOnLinux wine 버전 관리자 대화창" description="Wine 6.0 버전 설치 중..." %}

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-03.png" title="PlayOnLinux wine 버전 관리자 대화창" description="Wine 6.0 버전 설치 완료" %}

Wine 6.0 버전의 설치가 완료되었으면 PlayOnLinux wine 버전 관리자 대화창을 닫고, "파일" 메뉴에서 "설치" 메뉴를 클릭하거나 "설치" 메뉴 버튼(더하기 아이콘)을 클릭하여 PlayOnLinux install menu 대화창을 띄운다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-04.png" title="PlayOnLinux install menu 대화창" description="왼쪽 하단의 \"Install a non-listed program\"을 클릭한다." %}

PlayOnLinux install menu 대화창 왼쪽 하단의 "Install a non-listed program"을 클릭한다. 그러면 PlayOnLinux를 사용할 때의 주의사항 등을 알려주는 대화창이 뜨는데, 계속 "다음" 버튼을 누르다 보면 다음과 같은 창이 뜬다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-05.png" title="PlayOnLinux manual installation 대화창" description="\"Install a program in a new virtual drive\"를 선택한다." %}

"Install a program in a new virtual drive"를 선택한 후 "다음" 버튼을 누른다. 그러면 다음과 같이 설치할 어플리케이션이 사용할 가상 드라이브의 이름을 입력하라는 대화창이 뜬다. 공백 없는 아무 이름이나 입력해 넣고 "다음"을 누른다. 필자는 "KakaoTalk"을 입력했다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-06.png" title="PlayOnLinux manual installation 대화창 - 가상 드라이브 이름 입력" description="공백 없는 아무 이름이나 입력해 넣고 \"다음\" 버튼을 누른다." %}

어플리케이션 설치 전 할 작업을 선택하는 대화창이 뜬다. "Use another version of Wine", "Wine 설정", "Install some libraries" 세 개 모두 선택한 후 "다음" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-07.png" title="PlayOnLinux manual installation 대화창 - 어플리케이션 설치 전 작업 선택" description="모든 체크박스를 선택한 후 \"다음\" 버튼을 누른다." %}

사용할 Wine 버전을 선택하는 대화창이 뜬다. 조금 전 설치한 6.0 버전을 선택한 후 "다음" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-08.png" title="PlayOnLinux manual installation 대화창 - Wine 버전 선택" description="6.0 버전을 선택한다." %}

새로 생성되는 가상 드라이브의 아키텍처를 선택하는 대화창이 뜬다. "32 bits windows installation"을 선택한 후 "다음" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-09.png" title="PlayOnLinux manual installation 대화창 - 가상 드라이브 아키텍처 선택" description="\"32 bits windows installation\"을 선택한다." %}

이제 설치가 시작된다. 설치 중 다음과 같이 몇몇 패키지(ex. Wine Mono, Gecko 등)들을 추가로 설치해야 한다는 메시지가 나올 텐데, 시키는대로 모두 설치하면 된다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-10.png" title="PlayOnLinux manual installation 대화창 - 패키지 설치여부 확인" description="시키는 대로 모두 설치하자." %}

설치 중 Wine 환경설정을 하는 대화창이 뜬다. 다른 건 굳이 건드릴 필요 없고, "프로그램" 탭 하단의 "Windows 버전"을 "Windows 10"으로 선택하고 "확인" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-11.png" title="PlayOnLinux manual installation 대화창 - Wine 환경설정" description="Windows 버전을 \"Windows 10\"으로 선택한다." %}

설치 중 Wine에 추가로 설치할 프로그램들을 선택하는 대화창이 뜬다. "POL_Install_gdiplus", "POL_Install_gecko", "POL_Install_mono28"을 선택하고 "다음" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-12.png" title="PlayOnLinux manual installation 대화창 - 추가 프로그램 설치" description="\"POL_Install_gdiplus\", \"POL_Install_gecko\", \"POL_Install_mono28\"을 선택하고 \"다음\" 버튼을 누른다" %}

설치 중 어플리케이션 설치 파일을 등록하는 대화창이 뜬다. "찾아보기" 버튼을 눌러 조금 전 다운로드한 `KakaoTalk_Setup.exe` 파일을 넣고 "다음" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-13.png" title="PlayOnLinux manual installation 대화창 - 어플리케이션 설치 파일 등록" description="조금 전 다운로드한 <code>KakaoTalk_Setup.exe</code> 파일을 넣고 \"다음\" 버튼을 누른다." %}

이제 ~~익숙한~~ Windows 카카오톡 설치 대화창이 뜬다. Windows에서 카카오톡을 설치할 때처럼 진행하면 된다. 참고로 설치 과정에서 "Daum을 시작 페이지로"와 같은 것들을 제외하고 대부분의 설정값(ex. 설치 위치 등)들은 기본값을 사용하는 것이 좋다. 기본값을 사용하지 않으면 Wine이 어플리케이션을 잘 인식하지 못할 수도 있기 때문이다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-14.png" title="PlayOnLinux manual installation 대화창 - 카카오톡 설치" description="되도록이면 기본값을 사용하자." %}

설치가 완료되었으면 "카카오톡 실행" 체크박스를 체크 해제하고 "마침" 버튼을 누른다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-15.png" title="PlayOnLinux manual installation 대화창 - 카카오톡 설치 완료" description="\"카카오톡 실행\" 체크박스를 체크 해제하고 마침 버튼을 누른다." %}

그러면 PlayOnLinux가 카카오톡 실행을 위한 단축 아이콘을 생성해 줄지를 묻는 대화창이 뜨는데, 그냥 "I don't want to make another shortcut"을 선택하고 "다음" 버튼을 누르면 모든 설치가 완료된다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-16.png" title="PlayOnLinux manual installation 대화창 - 단축 아이콘 생성" description="단축 아이콘은 굳이 생성하지 않아도 되므로 \"I don't want to make another shortcut\"을 선택하자." %}

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-playonlinux-17.png" title="카카오톡 설치 완료" %}

화면의 KakaoTalk을 선택한 후 "파일" 메뉴에서 "실행" 메뉴를 클릭하거나 "실행" 메뉴 버튼(재생 아이콘)을 클릭하면 카카오톡이 정상적으로 실행된다.

### 잡기술

#### 카카오톡 파일 다운로드

카카오톡 설정의 "채팅" 탭 하단에 있는 "다운로드 폴더" 항목에서 "변경" 버튼을 누르면 파일들을 다운로드할 폴더를 바꿀 수 있다. 이를 Ubuntu 홈 디렉토리 등으로 설정해 놓으면 Ubuntu 환경에 바로 파일들을 다운받을 수 있다.

#### 광고 제거

Wine에서 카카오톡을 사용하는 것은 당연히 Windows에서 네이티브로 카카오톡을 사용하는 것보다 느리다(컴퓨터 성능에 따라 체감하지 못할 수도 있다~~부럽다~~). 필자 역시 묘하게 0.1초 정도 딜레이되는 느낌을 계속 받는데, 광고까지 계속 정신없이 뜨니까 더 느려진 것 같이 느껴져 광고를 제거하기로 하였다.

PlayOnLinux에서 "KakaoTalk"을 선택하고 왼쪽 "Action" 탭에서 "Open the directory"를 선택하면 카카오톡이 설치된 가상 Windows 디렉토리를 열어볼 수 있다(필자의 경우 `~/.PlayOnLinux/wineprefix/KakaoTalk/drive_c/Program Files/Kakao/KakaoTalk`였다). 이제 이 가상 드라이브에서 host 파일을 변조하면 카카오톡의 광고를 제거할 수 있다. 실행 중인 카카오톡을 완전히 종료한 후(PlayOnLinux에서 "종료" 메뉴 버튼(정지 아이콘)을 클릭) 터미널을 열고 다음 명령어를 입력한다.

{% highlight bash %}
$ mkdir -p ~/.PlayOnLinux/wineprefix/KakaoTalk/drive_c/windows/system32/drivers/etc
$ echo "127.0.0.1 display.ad.daum.net" >> ~/.PlayOnLinux/wineprefix/KakaoTalk/drive_c/windows/system32/drivers/etc/hosts
{% endhighlight %}

한동안은 캐시된 광고가 조금 나오겠지만, 얼마 지나지 않으면 광고가 하나로만(카카오톡 기본 광고) 고정된 것을 확인할 수 있다.

#### Ubuntu 시스템 트레이와 Wine System Tray 통합하기

PlayOnLinux로 카카오톡을 실행하면 다음과 같이 Windows의 시스템 트레이를 흉내낸 Wine System Tray가 나오는 것을 확인할 수 있다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-wine-system-tray.png" title="Wine System Tray" description="귀엽다" %}

이를 Ubuntu의 시스템 트레이와 통합해보자.

터미널을 열고 다음 명령어를 입력해 Gnome 환경을 커스터마이징할 수 있는 Gnome Tweaks와 확장 "Topicons plus"를 설치한다.

{% highlight bash %}
$ sudo apt install -y gnome-shell-extension-top-icons-plus
{% endhighlight %}

설치가 완료되면 시스템을 재부팅한 후, 터미널을 열어 다음을 입력한다.

{% highlight bash %}
$ gnome-tweaks
{% endhighlight %}

그러면 Gnome 환경을 커스터마이징할 수 있는 기능 개선 대화창이 열린다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-gnome-tweaks-01.png" title="기능 개선" description="아래 \"확장\" 탭을 클릭한다." %}

"확장" 탭에 가면 다음과 같이 "Topicons plus" 확장이 설치되어 있는 것을 볼 수 있다. 해당 확장을 활성화하고, 설정 버튼을 클릭해 세부 설정을 하면 카카오톡 버튼이 Ubuntu 시스템 트레이로 통합된 것을 확인할 수 있다.

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-gnome-tweaks-02.png" title="기능 개선" description="\"Topicons plus\" 확장을 활성화하고 세부설정을 해 준다." %}

{% include caption-img.html src="ubuntu-2004-package-installation-kakaotalk-gnome-tweaks-03.png" title="완료" description="Ubuntu 시스템 트레이에서 카카오톡 아이콘을 볼 수 있다." %}





