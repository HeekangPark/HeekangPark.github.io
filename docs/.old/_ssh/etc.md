---
title: "기타"
order: 1000
date_created: "2021-12-16"
date_modified: "2021-12-18"
---

SSH를 이용하면 여러 가지 재미있는 일들을 할 수 있다.

# SSH를 이용하여 Visual Studio Code와 원격 컴퓨터 연결하기

SSH는 개방된 네트워크에서 손쉽게 보안 채널을 구축할 수 있는 효과적인 방법이다. VS Code에서는 SSH를 연결해서 원격지에 있는 컴퓨터에 연결하여 개발을 할 수 있는 `Remote - SSH`라는 확장 기능이 있다. 이를 사용하면 마치 로컬 디렉토리에서 작업하는 것처럼 VS Code를 통해 원격 컴퓨터의 파일들을 관리, 수정할 수 있어 아주 편리하다.

VS Code 마켓플레이스에서 `Remote - SSH` 확장을 검색해 설치하자.

{% include caption-img.html src="ssh-advanced-vscode-remote-ssh.png" title="Fig.01 Remote - SSH" description="VS Code 마켓플레이스에서 Remote - SSH 확장을 검색해 설치하자." %}

설치가 완료되면 "원격 탐색기(Remote Explorer)"라는 새로운 사이드바 항목이 생긴다. 이를 클릭해보면 다음과 같이 뜬다.

{% include caption-img.html src="ssh-advanced-vscode-remote-explorer.png" class="no-max-height" title="Fig.02 원격 탐색기 (Remote Explorer)" description="Remote - SSH 확장의 설치가 완료되면 원격 탐색기라는 새로운 사이드바 항목이 나타난다." %}

새로운 SSH 연결을 추가하려면 우선 톱니바퀴 버튼을 누른다. 그럼 다음과 같이 SSH 클라이언트 config 파일을 지정하는 대화창이 뜬다.

{% include caption-img.html src="ssh-advanced-vscode-select-ssh-config.png" title="Fig.03 Select SSH configuration file to update" description="SSH 클라이언트 config 파일을 지정하는 대화창" %}

만약 `Remote - SSH`만을 위한 새 독립적인 config 파일을 작성하고 싶다면 "Settings"를 클릭해 설정을 연 다음, 새로운 config 파일의 절대경로를 입력하면 된다.

{% include caption-img.html src="ssh-advanced-vscode-ssh-config-settings.png" title="Fig.04 SSH config 파일 설정" description="config 파일의 절대경로를 입력하자." %}

또는 Fig.03의 첫 번째 항목인 시스템의 홈 디렉토리 밑에 있는 디폴트 config 파일(`.ssh/config`)을 사용할 수도 있다. 만약 잘 모르겠다면 그냥 Fig.03의 첫 번째 항목을 클릭하자.

이후 SSH config 파일[^1]을 작성하면 다음과 같이 SSH 연결이 등록된다.

[^1]: SSH config 파일 작성 방법은 [해당 항목](/web_server/04-ssh#kramdown_openssh-클라이언트-config-파일)을 참고하자.

{% include caption-img.html src="ssh-advanced-vscode-register-ssh-server.png" title="Fig.05 SSH 연결 등록" description="작성한 config 파일을 참조하여 VS Code가 'MyServer_user1', 'MyServer_user2'로의 SSH 연결을 등록하였다." %}

# SSH를 이용하여 VirtualBox 가상머신과 연결하기

학교에서 과제를 하다 보면 리눅스에서 작업해야 할 때가 종종 생긴다. 하지만 대부분 윈도우 컴퓨터를 사용하므로, 리눅스를 사용하기 위해선 VirtualBox와 같은 가상화 프로그램에 가상머신(VM, Virtual Machine)을 만들고 거기에 리눅스를 설치해 사용한다. 이때 컴퓨터 성능이 좋지 못하다면, 가상 머신에서 마우스 한 번 움직이는 것도 버벅거려 개발할 맛(?)이 나지 않는다.

이럴 경우 SSH를 이용하면 호스트(윈도우)의 VS Code 또는 터미널에 가상머신을 연결해, 쾌적한 환경에서 개발을 할 수 있다.

가상 환경 정보는 다음과 같다.

- 가상화 프로그램 : Oracle VM VirtualBox 6.1.12
- 호스트 운영체제 (Host OS) : Windows 10 Pro 버전 2004
- 게스트 운영체제 (Guest OS) : Ubuntu 20.04 LTS Desktop

우선 게스트 운영체제에 SSH 서버가 설치되어 있어야 한다. 만약 설치되어 있지 않다면 [문서](web_server/04-ssh#kramdown_ssh-서버-ssh-server--openssh-server)를 참조해 설치하자.

이제 포트 포워딩 설정을 해 주어야 한다. 가상머신 윈도우의 메뉴 표시줄에서 "머신" - "설정"을 클릭한다.[^2] 그럼 다음과 같은 창이 뜬다.

[^2]: 단축키 (호스트 키) + S

{% include caption-img.html src="ssh-advanced-virtualbox-setting-1.png" title="Fig.06 VirtualBox 머신 설정" description="가상머신 윈도우의 메뉴 표시줄에서 '머신' - '설정'을 클릭한다." %}

왼쪽의 네트워크 탭에 들어가면 다음과 같은 화면이 뜬다.

{% include caption-img.html src="ssh-advanced-virtualbox-setting-2.png" title="Fig.07 VirtualBox 머신 설정 - 네트워크" description="네트워크 탭을 클릭한다." %}

특별한 어뎁터 설정을 하지 않았다면~~특별한 어뎁터 설정을 했다면 이 문서를 볼 필요가 없는 사람일 것이다.~~, "어뎁터 1"이 현재 가상머신이 사용중인 유일한 네트워크 어뎁터일 것이다. "고급" 버튼을 누르고, 아래쪽 "포트 포워딩" 버튼을 클릭한다.

{% include caption-img.html src="ssh-advanced-virtualbox-setting-3.png" title="Fig.08 VirtualBox 머신 설정 - 포트 포워딩" description="네트워크 탭을 클릭한다." %}

오른쪽의 규칙 추가 버튼을 클릭하면 왼쪽의 표에 새로운 행이 추가된다. 표를 다음과 같이 채운다.

- 이름 : 아무런 이름을 사용해도 상관없다.
- 프로토콜 : "TCP"
- 호스트 IP : 공란으로 비워둔다.
- 호스트 포트 : 호스트에서 접속에 사용하고자 하는 포트 번호. 모르겠으면 "22"를 입력한다.
- 게스트 IP : 공란으로 비워둔다.
- 게스트 포트 : 게스트 운영체제에 설치된 SSH 서버가 사용하는 포트 번호. "22"[^3]

[^3]: 만약 게스트 운영체제에 설치된 SSH 서버가 다른 포트 번호를 사용한다면 해당 포트 번호를 입력하면 된다.

{% include caption-img.html src="ssh-advanced-virtualbox-setting-4.png" title="Fig.09 VirtualBox 머신 설정 - 포트 포워딩 (2)" description="새로운 포트 포워딩 규칙을 추가한다." %}

완료하였으면 "확인" 버튼을 눌러 창을 닫는다.

이때, 포트 포워딩 설정을 처음 한 것이라면 다음과 같은 보안 경고 창이 뜰 수 있다. 겁먹지 말고 "엑세스 허용" 버튼을 누르면 된다.

{% include caption-img.html src="ssh-advanced-virtualbox-security-warning.png" title="Fig.10 Windows 보안 경고" description="포트 포워딩 설정을 처음 한 것이라면 보안 경고 창이 뜰 수 있다." %}

이제, 호스트 컴퓨터에서 127.0.0.1:22[^4]로 접속하면 해당 가상머신에 SSH 연결을 할 수 있다. 이제 이렇게 만들어진 SSH 연결을 VS Code에서 사용할 수 있게 설정하면([항목 참조](#kramdown_ssh를-이용하여-visual-studio-code와-원격-컴퓨터-연결하기)) 호스트 운영체제의 쾌적한 VS Code에서 게스트 운영체제의 파일을 관리, 수정하며 작업할 수 있다.

[^4]: 만약 포트 포워딩 설정에서 호스트 포트를 22가 아닌 다른 값을 설정했다면, 예를 들어 8000이라 설정했다면, 127.0.0.1:8000으로 접속하면 된다.

- 당연하지만 가상머신을 종료하면 SSH 연결이 끊기기에 호스트 운영체제에서 더 이상 게스트 운영체제에 접속할 수 없다.
- 만약 접속이 되지 않는다면 호스트 운영체에 또는 게스트 운영체제에 방화벽 설정이 되어 있는지 확인해 보자.