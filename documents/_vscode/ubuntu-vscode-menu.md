---
title: "우분투에서 Visual Studio Code 메뉴 바 색 바꾸기"
date: "2021-02-20"
tags: ["ubuntu", "ubuntu20.04"]
---

Ubuntu 20.04에 VSCode를 설치하면 다음과 같이 된다.

{% include caption-img.html src="ubuntu-vscode-menu-default.png" title="Fig.01 Ubuntu에 VSCode를 최초설치했을 때의 모습" description="저 못생긴 메뉴 바 모양을 보라." %}

뭔가 하나가 엄청 거슬리지 않는가? 다른 항목들은 다 검은색인데 메뉴 바만 흰색이니까 엄청 거슬린다. 이는 설정값 하나만 변경하면 엄청 간단하게 바꿀 수 있다.

메뉴 바에서 파일(File)-기본 설정(Preferences)-설정(Settings)을 클릭하거나 단축키 `ctrl + ,`를 입력해 설정에 들어간다. 그리고 "window.titleBarStyle" 설정 항목을 검색한다.

{% include caption-img.html src="ubuntu-vscode-menu-titlebarstyle.png" title="Fig.02 window.titleBarStyle" description="설정(Settings)에서 window.titleBarStyle을 검색한다." %}

해당 설정 항목은 "native"로 되어 있을 것이다. 이 값을 "custom"으로 변경한다. 그럼 VSCode를 재시작할지를 묻는 창이 뜨는데, 여기서 재시작(Restart)을 누르면 다음과 같이 일관된 디자인을 가진 VSCode가 된다.

{% include caption-img.html src="ubuntu-vscode-menu-modified.png" title="Fig.03 최종 결과" description="디자인적으로 일관된 멋진 VSCode" %}