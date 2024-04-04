---
title: "VSCode 설치하기"
order: 1
date_created: "2021-02-18"
date_modified: "2021-07-25"
---

# Windows에 VSCode 설치하기

Windows용 VSCode 설치파일은 User Installer 버전과 System Installer 버전, 이렇게 두 가지가 있다.[^1] System Installer 버전은 시스템에 전역적으로 설치하는 버전으로, 설치 시 관리자 권한이 요구되고 한번 설치되면 시스템에 설치된 모든 사용자가 쓸 수 있다. 하지만 확장 설치, 업데이트 등을 할 때 관리자 권한을 요구할 수 있다.[^2] 하지만 User Installer 버전은 관리자 권한을 요구하지 않는다. 대신 VSCode를 설치한, 현재 로그인한 사용자만 사용할 수 있고, 다른 사용자가 VSCode를 사용하려면 직접 깔아야 한다.

[^1]: [VSCode 공식 홈페이지](https://code.visualstudio.com/)에서 .zip 버전도 다운받을 수 있지만 일반적으로는 설치파일을 이용해 VSCode를 설치한다.
[^2]: VSCode가 시스템 디렉토리(`%ProgramFiles%`)에 설치되기 때문에 그렇다.

User Installer 버전을 사용하면 복잡한 권한 문제, 충돌 문제 등을 피할 수 있어 대부분의 경우 User Installer 버전을 사용하는 것이 좋다. 이 때문에 [VSCode 공식 홈페이지](https://code.visualstudio.com/)에서 "Download for Windows" 버튼을 누르면 자동으로 User Installer 버전이 다운로드된다.[^3] 본 문서에서도 User Installer 버전을 사용하도록 하겠다.

[^3]: System Installer 버전을 받으려면 굳이 "Other downloads"에 들어가 받아야 한다.

[VSCode 공식 홈페이지](https://code.visualstudio.com/) 혹은 아래 링크를 이용해 Windows용 VSCode 설치파일(User Installer)을 다운로드한다.

[Windows x64용 User Installer](https://aka.ms/win32-x64-user-stable)
{: .text-align-center }

다운로드가 완료되면 설치파일을 실행한다.

{% include caption-img.html src="installation-vscode-windows-1.png" title="Fig.01 VSCode Windows 설치 (1)" description="\"I accept the agreement\" 라디오 옵션을 선택하고 \"Next\" 버튼을 누른다." %}

VSCode를 사용하는 라이선스에 동의하겠냐는 창이 나온다. "I accept the agreement" 버튼을 선택하고 "Next" 버튼을 누른다.

{% include caption-img.html src="installation-vscode-windows-2.png" title="Fig.02 VSCode Windows 설치 (2)" description="\"Next\" 버튼을 누른다." %}

VSCode가 설치될 위치를 설정하는 창이 나온다. 만약 특정 디렉토리에 설치해야 한다면 "Browse..." 버튼을 눌러 경로를 설정해주면 되지만, 웬만하면 기본값[^4]을 수정하지 말고 그냥 "Next" 버튼을 누르자.

[^4]: `%LocalAppData%\Programs\Microsoft VS Code\`

{% include caption-img.html src="installation-vscode-windows-3.png" title="Fig.03 VSCode Windows 설치 (3)" description="\"Next\" 버튼을 누른다." %}

시작 메뉴 폴더를 지정하는 창이 나온다. 기본값을 수정하지 말고 그냥 "Next" 버튼을 누른다.

{% include caption-img.html src="installation-vscode-windows-4.png" title="Fig.04 VSCode Windows 설치 (4)" description="\"Next\" 버튼을 누른다." %}

추가적인 작업을 할 수 있는 창이 나온다.

- `Create a desktop icon` : 바탕화면에 VSCode 바로가기를 만들길 원한다면 해당 체크박스에 체크한다.
- `Add "Open with Code" action to Windows Explorer file context menu` : 파일에 마우스 우클릭했을 때 "Code로 열기" 메뉴를 보고 싶다면 해당 체크박스에 체크한다.
- `Add "Open with Code" action to Windows Explorer file context menu` : 폴더에서 마우스 우클릭했을 때 "Code로 열기" 메뉴를 보고 싶다면 해당 체크박스에 체크한다.
- `Register Code as an editor for supported file types` : VSCode가 열 수 있는 파일들에 대한 기본 프로그램으로 설정되길 원한다면 해당 체크박스에 체크한다.
- `Add to PATH (requires shell restart)` : 명령줄(cmd, powershell 등) 어디에서도 `code` 명령어로 VSCode를 열 수 있게 하고싶다면 해당 체크박스에 체크한다.

잘 모르겠다면 기본값을 수정하지 말고 그냥 "Next" 버튼을 누른다.

{% include caption-img.html src="installation-vscode-windows-5.png" title="Fig.05 VSCode Windows 설치 (5)" description="\"Install\" 버튼을 누른다." %}

본인이 설정한 설정값을 모두 확인하고, "Install" 버튼을 눌러 설치를 시작한다.

{% include caption-img.html src="installation-vscode-windows-6.png" title="Fig.06 VSCode Windows 설치 (6)" description="설치 중..." %}

{% include caption-img.html src="installation-vscode-windows-7.png" title="Fig.07 VSCode Windows 설치 (7)" description="설치 완료" %}

설치가 모두 완료되었다면 "Finish" 버튼을 눌러 설치 프로그램을 종료한다.

# Linux(Ubuntu)에 VSCode 설치하기

## snap 이용하기

Ubuntu에 VSCode를 설치하는 다양한 방법이 있지만, 가장 단순한 방법은 `snap`을 이용하는 것이다. 웬만한 Ubuntu 배포판에는 `snap`이 기본적을 깔려있을 테지만, 만약 설치되어 있지 않다면 다음 명령어를 이용해 `snap`을 설치할 수 있다.

{% highlight bash %}
sudo apt install -y snapd
{% endhighlight %}

이제 다음 명령어를 입력해 VSCode를 설치한다.

{% highlight bash %}
sudo snap install code --classic
{% endhighlight %}

설치가 완료되었다면 이제 프로그램 목록에서 "Visual Studio Code"를 찾아 실행하거나, 터미널에 다음을 입력하면 VSCode를 실행할 수 있다.

{% highlight bash %}
code
{% endhighlight %}

## apt 이용하기

다음 명령어를 입력해 VSCode 설치에 필요한 의존성 패키지들을 설치한다.

{% highlight bash %}
sudo apt update
sudo apt install -y software-properties-common apt-transport-https wget
{% endhighlight %}

다음 명령어를 입력해 Microsoft GPG 키와 Visual Studio Code 저장소를 시스템에 추가한다.

{% highlight bash %}
wget -q -O- "https://packages.microsoft.com/keys/microsoft.asc" | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
{% endhighlight %}

이제 다음 명령어를 입력해 VSCode를 설치하자.

{% highlight bash %}
sudo apt update
sudo apt install -y code
{% endhighlight %}