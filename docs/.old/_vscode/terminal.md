---
title: "VSCode Integrated Terminal 설정하기"
date_created: "2022-03-05"
date_modified: "2022-03-06"
---

# VSCode Integrated Terminal

VSCode는 VSCode Integrated Terminal라 불리는, 자체 내장 터미널을 가지고 있다. 자동으로 현재 작업 영역(workspace)의 루트 디렉토리에서 시작하는 VSCode Integrated Terminal를 이용하면 사용자는 VSCode를 벗어나지 않고도 손쉽게 작성한 코드를 실행해 볼 수 있어 아주 편리하다.

VSCode 내장 터미널은 메뉴의 '보기(View)' - '터미널(Terminal)'을 클릭하거나 단축키 `` Ctrl + ` `` 을 이용해 켜고 끌 수 있다.

VSCode Integrated Terminal에서는 시스템에 설치된 다양한 쉘들을 모두 사용할 수 있는데, 아무런 설정을 하지 않으면 Windows에서는 PowerShell이, Linux에서는 Bash가 기본값으로 사용된다. 다른 쉘을 사용하고 싶다면 VSCode Integrated Terminal 우측 상단의 "+(New Terminal)" 버튼 옆 "∨(Launch Profile)" 버튼을 눌러 사용할 쉘을 선택하면 된다.

{% include caption-img.html src="https://code.visualstudio.com/assets/docs/editor/integrated-terminal/select-shell-dropdown.png" outside_img="true" title="Fig.01 VSCode Integrated Terminal에서 다른 쉘 사용하기" description="VSCode Integrated Terminal 우측 상단의 \"+\" 버튼 옆 \"∨\" 버튼을 누르면 다른 종류의 쉘을 선택할 수 있다.<br/>(image from <a href=\"https://code.visualstudio.com/docs\">https://code.visualstudio.com/docs</a>)" %}

# VSCode Integrated Terminal 설정하기

VSCode Integrated Terminal에 대한 설정은 `settings.json` 파일을 수정해 할 수 있다. 

만약 이 설정값이 전역적으로 적용되길 원한다면 전역 `settings.json` 파일을 수정한다. 전역 `settings.json` 파일은 `F1` 키를 누르고 "기본 설정: 설정 열기(JSON)"("Preferences: Open Settings (JSON)")을 선택해 열 수 있다.[^11]

만약 이 설정값이 현재 작업 영역(workspace)에 대해서만 적용되길 원한다면 작업 영역 `settings.json` 파일을 수정한다. 작업 영역 `settings.json` 파일은 `F1` 키를 누르고 "기본 설정: 작업 영역 설정 열기(JSON)"("Preferences: Open Workspace Settings (JSON)")을 선택해 열 수 있다.[^12]

[^11]: 또는 `%AppData%\Roaming\Code\User\settings.json`(Windows), `~/Library/Application Support/Code/User/settings.json`(macOS), `~/.config/Code/User/settings.json`(linux)에서 직접 수정할 수도 있다.
[^12]: 또는 `<workspace dir>/.vscode/settings.json`에서 직접 수정할 수도 있다.

기본적으로 VSCode Integrated Terminal 설정은 원하는 설정 내용을 담은 터미널 프로필(profile)을 만드는 방식으로 이루어진다. 또한 원한다면 이들 중 하나를 기본 프로필(default profile)로 설정해 "+" 버튼을 눌렀을 때 자동으로 특정 터미널 프로필이 선택되게 할 수도 있다.

터미널 프로필은 다음과 같은 형태로 설정할 수 있다.

{:.code-header}
터미널 프로필의 예

{% highlight json linenos %}
{
  "terminal.integrated.profiles.windows": {
    "node command prompt": {
      "path": "${env:windir}\\System32\\cmd.exe",
      "args": ["/k", "C:\\Program Files\\nodejs\\nodevars.bat"],
      "icon": "terminal-cmd",
      "color": "terminal.ansiYellow",
    }
  }
}
{% endhighlight %}

- line 2 : 이 프로필이 적용될 플랫폼을 명시한다. 즉 위 설정은 Windows 플랫폼에서 사용될 프로필을 만드는 설정임을 알 수 있다. 각 플랫폼별 키 이름은 다음과 같다.

  - Windows 플랫폼 : `terminal.integrated.profiles.windows`
  - Linux 플랫폼 : `terminal.integrated.profiles.linux`
  - macOS 플랫폼 : `terminal.integrated.profiles.osx`

- line 3 : 이 프로필의 이름을 명시한다. 즉 위 설정은 "node command prompt"라는 이름의 프로필을 만드는 설정임을 알 수 있다. 프로필 이름은 프로필들을 식별하는 키 역할을 하므로 겹치면 안 된다.

- line 4 ~ 5 : 프로필에 대한 세부 항목들을 설정한다. 각 항목의 의미는 다음과 같다.

  - `path` : 쉘의 경로를 지정한다.
  - `args` : 쉘 실행 시 사용할 인자를 지정한다.
  - `icon` : 터미널 아이콘의 모양을 지정한다. 사용할 수 있는 값들은 다음과 같다.
    
    <details markdown="block">
    
    <summary>열기/접기</summary>

    {:.no-break-word}
    `add`, `plus`, `gist-new`, `repo-create`, `lightbulb`, `light-bulb`, `repo`, `repo-delete`, `gist-fork`, `repo-forked`, `git-pull-request`, `git-pull-request-abandoned`, `record-keys`, `keyboard`, `tag`, `tag-add`, `tag-remove`, `person`, `person-follow`, `person-outline`, `person-filled`, `git-branch`, `git-branch-create`, `git-branch-delete`, `source-control`, `mirror`, `mirror-public`, `star`, `star-add`, `star-delete`, `star-empty`, `comment`, `comment-add`, `alert`, `warning`, `search`, `search-save`, `log-out`, `sign-out`, `log-in`, `sign-in`, `eye`, `eye-unwatch`, `eye-watch`, `circle-filled`, `primitive-dot`, `close-dirty`, `debug-breakpoint`, `debug-breakpoint-disabled`, `debug-hint`, `primitive-square`, `edit`, `pencil`, `info`, `issue-opened`, `gist-private`, `git-fork-private`, `lock`, `mirror-private`, `close`, `remove-close`, `x`, `repo-sync`, `sync`, `clone`, `desktop-download`, `beaker`, `microscope`, `vm`, `device-desktop`, `file`, `file-text`, `more`, `ellipsis`, `kebab-horizontal`, `mail-reply`, `reply`, `organization`, `organization-filled`, `organization-outline`, `new-file`, `file-add`, `new-folder`, `file-directory-create`, `trash`, `trashcan`, `history`, `clock`, `folder`, `file-directory`, `symbol-folder`, `logo-github`, `mark-github`, `github`, `terminal`, `console`, `repl`, `zap`, `symbol-event`, `error`, `stop`, `variable`, `symbol-variable`, `array`, `symbol-array`, `symbol-module`, `symbol-package`, `symbol-namespace`, `symbol-object`, `symbol-method`, `symbol-function`, `symbol-constructor`, `symbol-boolean`, `symbol-null`, `symbol-numeric`, `symbol-number`, `symbol-structure`, `symbol-struct`, `symbol-parameter`, `symbol-type-parameter`, `symbol-key`, `symbol-text`, `symbol-reference`, `go-to-file`, `symbol-enum`, `symbol-value`, `symbol-ruler`, `symbol-unit`, `activate-breakpoints`, `archive`, `arrow-both`, `arrow-down`, `arrow-left`, `arrow-right`, `arrow-small-down`, `arrow-small-left`, `arrow-small-right`, `arrow-small-up`, `arrow-up`, `bell`, `bold`, `book`, `bookmark`, `debug-breakpoint-conditional-unverified`, `debug-breakpoint-conditional`, `debug-breakpoint-conditional-disabled`, `debug-breakpoint-data-unverified`, `debug-breakpoint-data`, `debug-breakpoint-data-disabled`, `debug-breakpoint-log-unverified`, `debug-breakpoint-log`, `debug-breakpoint-log-disabled`, `briefcase`, `broadcast`, `browser`, `bug`, `calendar`, `case-sensitive`, `check`, `checklist`, `chevron-down`, `drop-down-button`, `chevron-left`, `chevron-right`, `chevron-up`, `chrome-close`, `chrome-maximize`, `chrome-minimize`, `chrome-restore`, `circle-outline`, `debug-breakpoint-unverified`, `circle-slash`, `circuit-board`, `clear-all`, `clippy`, `close-all`, `cloud-download`, `cloud-upload`, `code`, `collapse-all`, `color-mode`, `comment-discussion`, `compare-changes`, `credit-card`, `dash`, `dashboard`, `database`, `debug-continue`, `debug-disconnect`, `debug-pause`, `debug-restart`, `debug-start`, `debug-step-into`, `debug-step-out`, `debug-step-over`, `debug-stop`, `debug`, `device-camera-video`, `device-camera`, `device-mobile`, `diff-added`, `diff-ignored`, `diff-modified`, `diff-removed`, `diff-renamed`, `diff`, `discard`, `editor-layout`, `empty-window`, `exclude`, `extensions`, `eye-closed`, `file-binary`, `file-code`, `file-media`, `file-pdf`, `file-submodule`, `file-symlink-directory`, `file-symlink-file`, `file-zip`, `files`, `filter`, `flame`, `fold-down`, `fold-up`, `fold`, `folder-active`, `folder-opened`, `gear`, `gift`, `gist-secret`, `gist`, `git-commit`, `git-compare`, `git-merge`, `github-action`, `github-alt`, `globe`, `grabber`, `graph`, `gripper`, `heart`, `home`, `horizontal-rule`, `hubot`, `inbox`, `issue-closed`, `issue-reopened`, `issues`, `italic`, `jersey`, `json`, `kebab-vertical`, `key`, `law`, `lightbulb-autofix`, `link-external`, `link`, `list-ordered`, `list-unordered`, `live-share`, `loading`, `location`, `mail-read`, `mail`, `markdown`, `megaphone`, `mention`, `milestone`, `mortar-board`, `move`, `multiple-windows`, `mute`, `no-newline`, `note`, `octoface`, `open-preview`, `package`, `paintcan`, `pin`, `play`, `run`, `plug`, `preserve-case`, `preview`, `project`, `pulse`, `question`, `quote`, `radio-tower`, `reactions`, `references`, `refresh`, `regex`, `remote-explorer`, `remote`, `remove`, `replace-all`, `replace`, `repo-clone`, `repo-force-push`, `repo-pull`, `repo-push`, `report`, `request-changes`, `rocket`, `root-folder-opened`, `root-folder`, `rss`, `ruby`, `save-all`, `save-as`, `save`, `screen-full`, `screen-normal`, `search-stop`, `server`, `settings-gear`, `settings`, `shield`, `smiley`, `sort-precedence`, `split-horizontal`, `split-vertical`, `squirrel`, `star-full`, `star-half`, `symbol-class`, `symbol-color`, `symbol-customcolor`, `symbol-constant`, `symbol-enum-member`, `symbol-field`, `symbol-file`, `symbol-interface`, `symbol-keyword`, `symbol-misc`, `symbol-operator`, `symbol-property`, `wrench`, `wrench-subaction`, `symbol-snippet`, `tasklist`, `telescope`, `text-size`, `three-bars`, `thumbsdown`, `thumbsup`, `tools`, `triangle-down`, `triangle-left`, `triangle-right`, `triangle-up`, `twitter`, `unfold`, `unlock`, `unmute`, `unverified`, `verified`, `versions`, `vm-active`, `vm-outline`, `vm-running`, `watch`, `whitespace`, `whole-word`, `window`, `word-wrap`, `zoom-in`, `zoom-out`, `list-filter`, `list-flat`, `list-selection`, `selection`, `list-tree`, `debug-breakpoint-function-unverified`, `debug-breakpoint-function`, `debug-breakpoint-function-disabled`, `debug-stackframe-active`, `debug-stackframe-dot`, `debug-stackframe`, `debug-stackframe-focused`, `debug-breakpoint-unsupported`, `symbol-string`, `debug-reverse-continue`, `debug-step-back`, `debug-restart-frame`, `call-incoming`, `call-outgoing`, `menu`, `expand-all`, `feedback`, `group-by-ref-type`, `ungroup-by-ref-type`, `account`, `bell-dot`, `debug-console`, `library`, `output`, `run-all`, `sync-ignored`, `pinned`, `github-inverted`, `debug-alt`, `server-process`, `server-environment`, `pass`, `stop-circle`, `play-circle`, `record`, `debug-alt-small`, `vm-connect`, `cloud`, `merge`, `export`, `graph-left`, `magnet`, `notebook`, `redo`, `check-all`, `pinned-dirty`, `pass-filled`, `circle-large-filled`, `circle-large-outline`, `combine`, `gather`, `table`, `variable-group`, `type-hierarchy`, `type-hierarchy-sub`, `type-hierarchy-super`, `git-pull-request-create`, `run-above`, `run-below`, `notebook-template`, `debug-rerun`, `workspace-trusted`, `workspace-untrusted`, `workspace-unspecified`, `terminal-cmd`, `terminal-debian`, `terminal-linux`, `terminal-powershell`, `terminal-tmux`, `terminal-ubuntu`, `terminal-bash`, `arrow-swap`, `copy`, `person-add`, `filter-filled`, `wand`, `debug-line-by-line`, `inspect`, `layers`, `layers-dot`, `layers-active`, `compass`, `compass-dot`, `compass-active`, `azure`, `issue-draft`, `git-pull-request-closed`, `git-pull-request-draft`, `debug-all`, `debug-coverage`, `run-errors`, `folder-library`, `debug-continue-small`, `beaker-stop`, `graph-line`, `graph-scatter`, `pie-chart`, `bracket`, `bracket-dot`, `bracket-error`, `lock-small`, `azure-devops`, `verified-filled`, `newline`, `layout`, `layout-activitybar-left`, `layout-activitybar-right`, `layout-panel-left`, `layout-panel-center`, `layout-panel-justify`, `layout-panel-right`, `layout-panel`, `layout-sidebar-left`, `layout-sidebar-right`, `layout-statusbar`, `layout-menubar`, `layout-centered`, `target`, `indent`, `record-small`, `error-small`, `arrow-circle-down`, `arrow-circle-left`, `arrow-circle-right`, `arrow-circle-up`, `dialog-error`, `dialog-warning`, `dialog-info`, `dialog-close`, `tree-item-expanded`, `tree-filter-on-type-on`, `tree-filter-on-type-off`, `tree-filter-clear`, `tree-item-loading`, `menu-selection`, `menu-submenu`, `menubar-more`, `scrollbar-button-left`, `scrollbar-button-right`, `scrollbar-button-up`, `scrollbar-button-down`, `toolbar-more`, `quick-input-back`

    </details>

  - `color` : 터미널 아이콘의 색상을 지정한다. 사용할 수 있는 값들은 다음과 같다.
    
    <details markdown="block">
    
    <summary>열기/접기</summary>
    
    `terminal.ansiBlack`, `terminal.ansiBlue`, `terminal.ansiCyan`, `terminal.ansiGreen`, `terminal.ansiMagenta`, `terminal.ansiRed`, `terminal.ansiWhite`, `terminal.ansiYellow`
    
    </details>

각 항목들을 작성할 때 이스케이핑에 주의해서 입력하도록 하자. 또한 각 항목에선 `${env:windir}`에서와 같이 `${}` 형태로 변수들을 사용할 수 있다. 사용할 수 있는 변수들의 종류는 [여기](https://code.visualstudio.com/docs/editor/variables-reference)를 참조하자.

빌트인 프로필(built-in profiles)을 제거하고 싶다면 다음과 같이 빌트인 프로필을 `null`로 덮어쓰면 된다. 예를 들어, 다음은 linux 플랫폼의 빌트인 프로필 중 하나인 "bash" 프로필을 제거하는 설정이다.

{:.code-header}
빌트인 프로필 제거

{% highlight json linenos %}
{
  "terminal.integrated.profiles.linux": {
    "bash": null,
  }
}
{% endhighlight %}

특정 프로필을 기본 프로필(default profile)로 사용하고 싶다면 `terminal.integrated.defaultProfile.*`에 해당 프로필 이름을 설정하면 된다. 각 플랫폼별 키 이름은 다음과 같다.

- Windows 플랫폼 : `terminal.integrated.defaultProfile.windows`
- Linux 플랫폼 : `terminal.integrated.defaultProfile.linux`
- macOS 플랫폼 : `terminal.integrated.defaultProfile.osx`

예를 들어 windows 플랫폼에서 (위에서 만들었던) "node command prompt"를 기본 프로필로 사용하고 싶다면 다음과 같이 하면 된다.

{:.code-header}
기본 프로필 설정

{% highlight json linenos %}
{
  "terminal.integrated.defaultProfile.windows": "node command prompt"
}
{% endhighlight %}

# 사용 예

## Windows에서 Node.js를 사용할 때

[Node.js 공식 홈페이지](https://nodejs.org/)에서 Windows용 Node.js를 다운받은 경우, 빌트인 프로필 cmd에서는 `node`, `npm` 같은 명령어를 바로 사용할 수 없다. cmd에서 Node.js 명령어를 사용하려면 다음과 같이 cmd를 열어야 한다.[^31]

[^31]: 기본 설치 경로를 변경하지 않았다고 가정하였다.

{% highlight cmd %}
%windir%\System32\cmd.exe /k "C:\Program Files\nodejs\nodevars.bat"
{% endhighlight %}

따라서 다음과 같이 "node command prompt" 프로필을 만들고 Windows 기본 프로필로 설정해 두면 편리하다.

{:.code-header}
[Windows] VSCode Integrated Terminal에서 Node.js Command Prompt 사용하기

{% highlight json %}
{
  "terminal.integrated.profiles.windows": {
    "node command prompt": {
      "path": "${env:windir}\\System32\\cmd.exe",
      "icon": "terminal-cmd",
      "args": [
        "/k", 
        "C:\\Program Files\\nodejs\\nodevars.bat"
      ]
    }
  },
  "terminal.integrated.defaultProfile.windows": "node command prompt"
}
{% endhighlight %}

## Windows에서 conda를 사용할 때

Windows용 [Anaconda](https://www.anaconda.com/products/individual#Downloads) 혹은 [Miniconda](https://docs.conda.io/en/latest/miniconda.html)를 다운받은 경우, 빌트인 프로필 cmd에서는 `conda`, `python`, `pip` 같은 명령어를 바로 사용할 수 없다. cmd에서 Conda 및 Python 명령어를 사용하려면 다음과 같이 cmd를 열어야 한다.[^32]

[^32]: 기본 설치 경로를 변경하지 않았다고 가정하였다.

{% highlight cmd %}
%windir%\System32\cmd.exe /K %userprofile%\miniconda3\Scripts\activate.bat %userprofile%\miniconda3
{% endhighlight %}

따라서 다음과 같이 "conda command prompt" 프로필을 만들고 Windows 기본 프로필로 설정해 두면 편리하다.

{:.code-header}
[Windows] VSCode Integrated Terminal에서 conda command prompt 사용하기

{% highlight json %}
{
  "terminal.integrated.profiles.windows": {
    "conda command prompt": {
      "path": "${env:windir}\\System32\\cmd.exe",
      "icon": "terminal-cmd",
      "args": [
        "/k", 
        "${env:userprofile}\\miniconda3\\Scripts\\activate.bat",
        "${env:userprofile}\\miniconda3"
      ]
    }
  },
  "terminal.integrated.defaultProfile.windows": "conda command prompt"
}
{% endhighlight %}

## Linux에서 Bash 로그인 쉘을 실행해야 할 때

Linux 플랫폼의 빌트인 프로필인 "bash"는 비 로그인 쉘(non-login shell)이다. Bash 로그인 쉘은 다음과 같이 `-l` 옵션을 주어 열 수 있다.

{% highlight bash %}
/bin/bash -l
{% endhighlight %}

상황에 따라 Bash 로그인 쉘이 필요한 경우가 있는데, 이때 다음과 같이 빌트인 "bash" 프로필이 Bash 로그인 쉘이 열리도록 덮어써 놓으면 편리하다.

{:.code-header}
[Linux] VSCode Integrated Terminal에서 Bash 로그인 쉘 사용하기

{% highlight json %}
{
  "terminal.integrated.profiles.linux": {
    "bash": {
      "path": "/bin/bash",
      "icon": "terminal-bash",
      "args": ["-l"]
    }
  }
}
{% endhighlight %}
