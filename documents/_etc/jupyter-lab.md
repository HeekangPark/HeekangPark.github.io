---
title: "주피터 랩(Jupyter Lab) 설치하기"
tags: ["jupyterlab", "python", "framework"]
date_created: "2020-08-31"
date_modified: "2021-07-15"
---

# 주피터 랩(Jupyter Lab)이란?

시스템에 파이썬을 설치하면 다음과 같은 파이썬 쉘(REPL)[^1]을 사용할 수 있다. 파이썬 쉘은 파이썬 인터프리터를 대화형 모드(interactive mode)로 사용할 수 있도록 해 주는 프로그램이다.

[^1]: Fig.01과 같이 사용자와 마치 문답을 주고받듯이 동작하는 프로그램을 REPL(Read-Evaluate-Print-Loop)라 한다. REPL의 예로 크롬 개발자 도구의 콘솔(Console), Node.js 등이 있다(둘 다 자바스크립트 REPL이다). 인터넷 조사 결과 Fig.01의 프로그램을 칭할 때 "파이썬 쉘"과 "파이썬 REPL"을 혼용해 사용하는 것으로 보인다(비슷하게 Node.js도 "Node 쉘"과 "Node REPL"을 혼용해 사용하는 것으로 보인다). 일반적으로 초보자들을 위한 문서에서는 (이해하기 쉬운) 파이썬 쉘이라는 표현을 더 자주 쓰고, 고급 사용자를 위한 문서에는 파이썬 REPL이라는 표현을 더 자주 쓰는 것 같다. 일단 이 문서에서는 파이썬 쉘이라는 표현을 쓸 것이다.

{% include caption-img.html src="jupyterlab-python-shell-windows.png" title="Fig.01 파이썬 쉘(REPL)" description="Windows 10에 파이썬 3.8을 설치했을 때 볼 수 있는 파이썬 쉘(REPL)" %}

파이썬 쉘에서는 코드를 입력하면 코드의 실행 결과를 바로 확인할 수 있고, 이전 코드의 실행 결과를 모두 기억하고 있어 간단히 파이썬 코드를 돌려보기에 좋다. 하지만 실행한 코드를 문서화하기 어렵고, 복잡한 코드를 실행하는데는 불편함이 많아 깊이있는 사용에는 무리가 따른다.

이를 개선한 것이 IPython(Interactive Python)이다. IPython은 파이썬 쉘에 자동완성(Tab Completion), 코드 하이라이팅(Code Highlighting), 객체 정보 보기, 단축키, Magic Command 등의 다양한 부가기능을 추가해 사용성을 개선했다.

{% include caption-img.html src="jupyterlab-ipython.png" title="Fig.02 IPython" description="IPython 사용 예시" %}

그리고 이 IPython을 이용해 만들어진 웹 어플리케이션이 주피터 노트북(Jupyter Notebook)이다.

{% include caption-img.html src="jupyterlab-jupyter-notebook.png" title="Fig.03 주피터 노트북(Jupyter Notebook)" description="주피터 노트북 사용 예시" %}

주피터 노트북은 코드 작성과 실행을 서버-클라이언트 모델로 분리하였다. 즉, 사용자가 웹 브라우저(클라이언트)에서 코드를 작성하면, 코드는 서버로 전송되어 실행되고, 그 결과가 다시 웹 브라우저로 전달되어 사용자에게 보여지는 것이다. 이때 서버에서 실제로 코드를 실행하는 핵심 컴포넌트를 '커널(Kernel)'이라 한다. 주피터 노트북은 IPython을 커널로 사용한다.[^2]

[^2]: 초창기 주피터 노트북은 IPython만 커널로 사용가능했었다. 그래서 이름도 원래는 IPython Notebook이었다. 그런데 IPython 이외에도 C++, C#, Ruby, Typescript 등과 같은 다양한 커널을 지원하게 되면서 주피터 노트북으로 이름을 바꿨다.

{% include caption-img.html src="jupyterlab-jupyter-notebook-architecture.png" title="Fig.04 주피터 노트북 구조" description="사용자가 웹 브라우저(클라이언트)에서 코드를 작성하면, 코드는 서버로 전송되어 실행되고, 그 결과가 다시 웹 브라우저로 전달되어 사용자에게 보여진다." %}

참고로 주피터 노트북의 "노트북(Notebook)"은 노트북 컴퓨터 할 때의 노트북이 아니라 "공책"을 의미한다.[^3] 마치 공책에 글, 그래프, 그림 등 다양한 것들을 필기할 수 있듯이, 주피터 노트북을 이용하면 텍스트, 코드, 수식, 그래프, 이미지 등을 한 화면에 띄우고 조작할 수 있다.

[^3]: 한국에서 노트북이라 하면 일반적으로 노트북 컴퓨터를 떠올리나, 노트북은 사실 콩글리쉬다. 노트북 컴퓨터는 영어로 laptop이라 한다. 미국에서 notebook은 공책을 의미하는 단어이다.

그리고 다시, 이 주피터 노트북을 개선한 형태가 주피터 랩(Jupyter Lab)이다. 주피터 랩은 기존 주피터 노트북에 다중 탭 지원, 수려한 UI, 다양한 확장 기능 등을 추가해 만든 웹 어플리케이션이다.

{% include caption-img.html src="jupyterlab-jupyter-lab.png" title="Fig.05 주피터 랩(Jupyter Lab)" description="주피터 랩 사용 예시" %}

## 주피터 랩의 장점

주피터 랩은 다음과 같은 장점을 가진다.

- 셀(Cell) 단위 코드 실행 : 주피터 랩에서는 전체 코드를 한 번에 실행하는 것이 아니라, 셀(Cell)이라 부르는 작은 코드 조각들을 단위로 코드를 실행할 수 있다. 코드 작성 중 80번째 줄에 오류가 있어 약간의 수정을 가하는 상황을 생각해 보자. 셀 단위 코드 실행이 지원되지 않는 시스템에서는 수정이 올바르게 되었는지 확인하기 위해서는 전체 코드를 다 실행해야 한다.[^4] 하지만 주피터 랩에서는 셀 단위로 코드를 실행할 수 있어, 80번째 줄을 담고 있는 셀만 다시 실행해 보면 된다.[^5]
- 대화형(interactive) 개발 환경[^6] : 비(非)대화형 개발 환경에서는 전체 코드를 작성하기 전까지는 변수에 어떤 값이 할당되어 있는지, 중간중간 실행 결과가 어떻게 되는지 알 수 없다. 그 결과 일반적으로 "전체 코드 작성 - 실행 - 디버깅 - 최종 완성" 순으로 개발이 이루어진다. 하지만 대화형 개발 환경에서는 마치 시스템과 대화하듯이 개발을 할 수 있다. 즉 "코드 작성 - 중간 실행 - 중간 점검 - 코드 작성 - 중간 실행 - 중간 점검 - 최종 완성" 순으로 개발할 수 있다.
- 문서화의 용이성 : 주피터 랩에서는 노트북 문서(`.ipynb`) 포멧으로 텍스트, 코드[^7], 코드 실행 결과, 수식, 이미지, 그래프 등을 하나의 문서로 한 번에 저장할 수 있다. 이 포멧은 사실상 표준으로서 구글 Colab, 깃허브 등에서 바로 사용가능하다. 실제로 많은 기계학습 관련 문서 혹은 실습 예제들이 `.ipynb` 포멧의 문서로 웹 상에 배포되어 있다.
- 웹 기반의 개발 환경 : 주피터 랩은 웹 브라우저에서 작동한다. 주피터 랩을 사용하면 무거운 IDE를 쓰지 않고, 가볍고 친숙한 환경의 웹 브라우저에서 개발할 수 있다. 또한 서버에 주피터 랩을 설치해 놓으면, 복잡한 ssh 설정 등을 할 필요 없이 바로 웹 브라우저의 주피터 랩을 이용해 서버에 접속해 개발을 할 수 있다.

[^4]: 만약 앞의 코드가 실행 시간이 아주 많이 걸리는 코드이고(ex. 기계학습), 오류가 아주 단순한 오탈자라면 이 작은 실수를 고치기 위해서 너무 많은 시간을 들여야 한다.~~덤으로 깊은 빡침까지 얻을 수 있다.~~
[^5]: 물론 이런 식의 사용이 가능하려면 트랜잭션(transaction) 단위로 셀을 짜야 할 것이다. 기존 시스템은 얄짤없이 무조건 전체를 실행할 때, 주피터 셀에서는 그렇게 하지 않을 수도 있다 정도로 이해하면 되겠다.
[^6]: 엄밀히 말하면 이는 IPython의 장점이다.
[^7]: 이 코드는 노트북 문서를 읽으면서 실시간으로 "실행 가능"하다. 이를 강조하기 위해 "라이브 코드(live code)"라는 표현으로 부르기도 한다.

이러한 장점들로 인해 파이썬으로 코드를 작성할 때, 특히 기계 학습 코드를 작성할 때는 주피터 랩(주피터 노트북)을 쓰는 것이 일반적이다.

# 주피터 랩 설치 및 실행하기

## 아나콘다 설치하기

주피터 랩은 그냥 시스템에 글로벌하게 설치된 파이썬에 대해 설치해도 되지만, 일반적으로 가상환경에 대해 설치한다.[^8] 가상환경을 이용하기 위해선 파이썬 가상환경 관리자를 설치해야 하는데, 일반적으로 많이 사용하는 아나콘다를 이용하자.[^9] 설치 방법은 [해당 문서](/etc/anaconda)를 참조하자.

[^8]: 시스템에 글로벌하게 설치된 파이썬에 대해 주피터 랩을 설치하면 패키지 설치 등의 과정에서 오류가 날 수 있어 그렇다.
[^9]: virtualenv, venv, miniconda 등 다른 가상환경 관리자를 사용해도 되지만, 아나콘다를 사용하면 자동으로 기계학습에 필요한 다양한 라이브러리를 설치해 주어 편리하다.

## 주피터 랩 설치하기

우선 다음 명령어로 새로운 가상환경을 생성한다. 가상환경의 이름은 `jupyter`[^10], 파이썬 버전은 3.8을 사용했다.

[^10]: 이름은 맘대로 정해도 된다.

{% highlight bash %}
conda create -n jupyter python=3.8
{% endhighlight %}

생성한 가상환경을 활성화한다.

{% highlight bash %}
conda activate jupyter
{% endhighlight %}

pip을 이용해 가상환경에 주피터 랩을 설치한다.

{% highlight bash %}
pip install jupyterlab
{% endhighlight %}

## 주피터 랩 실행하기

설치가 정상적으로 완료되었으면 다음 명령어로 주피터 랩을 실행할 수 있다.

{% highlight bash %}
jupyter lab
{% endhighlight %}

위 명령어를 실행하면 주피터 랩 서버가 실행되고 자동으로 브라우저가 실행되면서 주피터 랩이 열린다.

주피터 랩을 종료하려면 우선 주피터 랩이 실행 중인 브라우저를 닫고, 주피터 랩 서버가 실행 중인 콘솔에서 Ctrl + C를 두 번 누른다.[^11]

[^11]: 실수로 서버가 닫히는 것을 막기 위해서 주피터 랩 서버는 Ctrl + C가 한번 입력된 경우 정말 종료할 것인지 y/n으로 종료 확인(Confirm)을 받는다. 이 상태에서 몇 초간 아무런 입력을 하지 않거나 n을 입력하면 종료가 취소된다. 종료 확인 상태에서 다시 Ctrl + C를 누르거나(즉 Ctrl + C를 두 번 누르거나) y를 입력하면 주피터 랩 서버가 종료된다.

# 주피터 랩 설정하기

## 명령줄 인자(Command-Line Parameter) 이용하기

주피터 랩을 실행하면 디폴트로 브라우저가 열린다. `--no-browser` 옵션을 주면 브라우저가 자동으로 열리지 않는다(주피터 랩 서버만 실행된다).

{% highlight bash %}
jupyter lab --no-browser
{% endhighlight %}

`--no-browser` 옵션으로 주피터 랩을 실행한 경우, 혹은 실수로 주피터 랩이 실행 중인 브라우저를 닫아버린 경우 콘솔 창에서 주피터 랩에 접속할 수 있는 URL을 확인할 수 있다.[^12]

[^12]: 만약 실행 로그가 너무 많이 있어 접속 URL이 밀려 올라간 경우, Ctrl + C를 입력해 보자. 주피터 랩 URL이 뜬다.

{% include caption-img.html src="jupyterlab-jupyter-server.png" title="Fig.06 주피터 랩 서버 예시" description="주피터 랩 서버가 실행 중인 콘솔 창에서 주피터 랩에 접속할 수 있는 URL을 확인할 수 있다." %}

주피터 랩은 디폴트로 `http://127.0.0.1:8888/`에서 열린다. 만약 다른 IP 주소나 포트 번호를 사용하고 싶다면 각각 `--ip` 옵션과 `--port` 옵션을 사용하면 된다.

{% highlight bash %}
jupyter lab --ip=<ip_addr> --port=<port>
{% endhighlight %}

- `<ip_addr>` : IP 주소. "0.0.0.0"을 입력하면 컴퓨터에 연결된 모든 IP 주소를 listen한다.[^13]
- `<port>` : 포트 번호

[^13]: 컴퓨터에 두 개의 IP 주소(`192.168.0.1`, `172.26.0.1`)가 할당되었다 하자. `jupyter lab --ip=192.168.0.1`로 주피터 랩 서버를 실행하면 주피터 랩 서버는 `192.168.0.1:8888`으로 들어오는 접속을 listen한다. 즉 `192.168.0.1:8888`으로는 접속 가능하지만 `172.26.0.1:8888`로는 접속할 수 없다. 한편, `jupyter lab --ip=0.0.0.0`으로 주피터 랩 서버를 실행하면 주피터 랩 서버는 컴퓨터에 할당된 모든 IP주소로부터의 접속을 listen한다. 즉 `192.168.0.1:8888`으로도 `172.26.0.1:8888`으로도 접속 가능하게 된다.

ex)
{% highlight bash %}
jupyter lab --ip=192.168.0.1 --port=8000
jupyter lab --ip=0.0.0.0
jupyter lab --port=9999
{% endhighlight %}

이외에도 다양한 옵션들이 있다.

## config 파일 이용하기

그런데 이렇게 명령줄 인자로 옵션을 주는 방법은 매번 주피터 랩을 실행할 때마다 옵션값을 입력해야 하기 때문에 불편하다. 옵션값을 자동으로 주고 싶으면 config 파일을 이용할 수 있다.

config 파일은 다음 명령어로 생성할 수 있다.

{% highlight bash %}
jupyter lab --generate-config
{% endhighlight %}

이 명령어는 `~/.jupyter/` 디렉토리에 `jupyter_notebook_config.py` 파일을 생성한다.[^14] 주피터 랩은 실행될 때 자동으로 `~/.jupyter/` 디렉토리에 `jupyter_notebook_config.py` 파일이 존재하는지 확인해, 만약 파일이 존재한다면 파일을 읽어 옵션값을 적용한다.

[^14]: 생성된 `jupyter_notebook_config.py` 파일은 디폴트로 모든 내용이 주석 처리되어 있다(그래서 디폴트 설정이 적용되는 것이다).

만약 다른 경로에 있는 config을 사용하고 싶으면 다음과 같이 주피터 랩 실행 시 `--config` 옵션을 줄 수 있다.

{% highlight bash %}
jupyter lab --config=<config_path>
{% endhighlight %}

- `<config_path>` : config 파일 경로. 파일명만 작성하게 되면 현재 디렉토리 혹은 `~/.jupyter/` 디렉토리에서 해당 파일을 찾는다.[^15] 만약 명시된 경로에서 config 파일을 읽을 수 없는 경우 주피터 랩은 디폴트 설정으로 열린다.

[^15]: 만약 현재 디렉토리와 `~/.jupyter/` 디렉토리에 동일한 이름의 config 파일이 존재할 경우 현재 디렉토리의 config 파일이 적용된다.

ex)
{% highlight bash %}
jupyter lab --config=my_config.py  # 현재 디렉토리 혹은 ~/.jupyter/ 디렉토리 밑에서 my_config.py 파일을 찾는다.
jupyter lab --config=~/config_dir/my_config.py
{% endhighlight %}

config 파일에서 설정 가능한 모든 옵션들을 다 나열하면 글이 너무 길어지기에, 필자가 현재 사용하고 있는 옵션들만 설명하도록 하겠다. 다른 옵션들은 [공식 문서](https://jupyter-notebook.readthedocs.io/en/stable/config.html)에서 확인 가능하다.

`c.NotebookApp.open_browser` 옵션은 주피터 랩 서버가 실행될 때 브라우저가 자동으로 실행되게 할 지를 결정하는 옵션이다. 디폴트는 `True`이다.

{% highlight python %}
c.NotebookApp.open_browser = False  # 주피터 랩 서버 실행 시 브라우저 자동으로 열리지 않음
c.NotebookApp.open_browser = True  # 주피터 랩 서버 실행 시 브라우저 자동으로 열림
{% endhighlight %}

`c.NotebookApp.ip` 옵션은 주피터 랩 서버에 접속하는데 사용할 IP주소를 결정하는 옵션이다.[^16] 디폴트는 `"localhost"`이다.

[^16]: 정확히 말하면, listen할 IP주소를 결정하는 옵션이다.

{% highlight python %}
c.NotebookApp.ip = "192.168.0.1"  # 주피터 랩 서버는 192.168.0.1를 listen한다(192.168.0.1로 주피터 랩에 접속할 수 있다).
c.NotebookApp.ip = "0.0.0.0"  # 주피터 랩 서버는 컴퓨터에 할당된 모든 IP 주소를 listen한다.
{% endhighlight %}

`c.NotebookApp.port` 옵션은 주피터 랩 서버에 접속하는데 사용할 포트 번호를 결정하는 옵션이다.[^17] 디폴트는 `8888`이다.

[^17]: 정확히 말하면, listen할 포트 번호를 결정하는 옵션이다.

{% highlight python %}
c.NotebookApp.port = 8000  # 주피터 랩 서버는 8000번 포트에서 실행된다.
{% endhighlight %}

`c.NotebookApp.allow_origin` 옵션은 주피터 랩 서버에 접속을 허용할 IP(origin IP)를 특정할 수 있다. 디폴트는 `""`으로, 주피터 랩이 실행된 컴퓨터에서의 접속만 허용한다(외부 접속을 허용하지 않는다)는 뜻이다.

{% highlight python %}
c.NotebookApp.allow_origin = "*"  # 모든 곳에서의 접속을 허용한다. 보안 상 취약할 수 있으므로 반드시 패스워드 등을 사용하자.
c.NotebookApp.allow_origin = "172.26.0.0/16"  # 172.26.0.0/16에서의 접속만 허용한다.
{% endhighlight %}

`c.NotebookApp.password` 옵션은 주피터 랩 서버에 접속하기 위해서 사용할 패스워드를 설정하는 옵션이다. 이 값이 설정되어 있지 않으면 주피터 랩은 디폴트로 서버가 새로 열릴 때마다 접속 토큰(access token)을 생성한다.[^18] 하지만 접속 토큰은 주피터 랩 서버를 새로 열 때마다 바뀌기에 불편하다.[^19] 그래서 패스워드 설정을 많이 하는 편이다.

[^18]: 주피터 랩 접속 URL(ex. `http://127.0.0.1:8888/?token=7259f0852bd13b16b4672243dc2b9ef6ac7863ed532677f7`)에서 확인할 수 있는 token값(7259f0852bd13b16b4672243dc2b9ef6ac7863ed532677f7)이 바로 접속 토큰이다. 접속 토큰이 있지 않은 사람은 주피터 랩에 접속할 수 없다.
[^19]: 대신 패스워드에 비해 보안적으로 더 안전하다(물론 패스워드 방식 역시 충분히 강력한 패스워드를 사용하고, 패스워드 관리를 잘 하면 안전하다).

패스워드는 파이썬 쉘 혹은 IPython 쉘을 열고, 다음 명령어를 실행해 생성할 수 있다.

{% highlight python %}
>>> from notebook.auth import passwd; passwd()
Enter password:  # 패스워드 입력
Verify password:  # 위와 동일한 패스워드 한번 더 입력
'argon2:$argon2id$v=19$m=10240,t=10,p=8$eXDpKZIvIil1ygBM7kX4sA$UAKpTU4SXi+/GmKeGjKvcA'  # 생성된 패스워드(예시)
{% endhighlight %}

위 명령을 실행하면 사용할 패스워드를 두 번 입력받은 후 패스워드의 해시 값을 리턴한다. 이 해시 값을 복사해 config 파일에 다음과 같이 넣는다.

{% highlight python %}
c.NotebookApp.password = 'argon2:$argon2id$v=19$m=10240,t=10,p=8$eXDpKZIvIil1ygBM7kX4sA$UAKpTU4SXi+/GmKeGjKvcA'
{% endhighlight %}

이렇게 하면 주피터 랩 서버를 열면 접속 토큰이 생기지 않는다. 그리고 접속 시 패스워드를 입력하는 창이 뜬다. 패스워드를 입력하면 정상적으로 주피터 랩을 사용할 수 있다.

{% include caption-img.html src="jupyterlab-password.png" title="Fig.07 주피터 랩 로그인" description="패스워드를 설정하면 주피터 랩 접속 시 패스워드를 묻는다." %}

# 주피터 랩 서비스로 등록하기

주피터 랩을 사용할 때마다 서버를 여는 것이 귀찮다면 시스템이 부팅될 때 자동으로 실행되도록 서비스를 만들면 된다.

우선 부팅 시 실행될 주피터 랩 서버를 위한 가상환경을 새로 만들고, 그 가상환경에 주피터 랩을 설치한다.[^20]

[^20]: 주피터 랩이 설치된 기존 가상환경을 사용해도 된다.

{% highlight bash %}
conda create -n jupyter-server python=3.8  # 가상환경 생성
conda activate jupyter-server  # 가상환경 활성화
pip install jupyterlab  # 주피터 랩 설치
{% endhighlight %}

그리고 `~/.jupyter/` 디렉토리 밑에 주피터 랩 서버가 사용할 config 파일 `jupyter_server_config.py`을 생성하고, 적당한 옵션값을 입력한다.

{% highlight bash %}
vim ~/.jupyter/jupyter_server_config.py  # config 파일 생성. 적당한 옵션값을 입력한다.
{% endhighlight %}

그리고 주피터 랩이 사용할 디렉토리 `~/jupyter-server-workspace/`를 생성한다.

{% highlight bash %}
mkdir ~/jupyter-server-workspace
{% endhighlight %}

우분투 20.04 기준 터미널에 다음 명령어를 실행해 `jupyter` 서비스를 생성한다.

{% highlight bash %}
sudo vim /etc/systemd/system/jupyter.service
{% endhighlight %}

그리고 다음 내용을 입력한다.

{% highlight text linenos %}
[Unit]
Description=Jupyter Lab Server

[Service]
Type=simple
PIDFile=/run/jupyter.pid
User=<user_name>
Environment="PATH=<anaconda_path>/envs/jupyter-server/bin:<anaconda_path>/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=<anaconda_path>/envs/jupyter-server/bin/jupyter-lab --config=<home_dir>/.jupyter/jupyter_server_config.py
WorkingDirectory=<home_dir>/jupyter-server-workspace
Restart=always
RestartSec=10
StandardOutput=file:<home_dir>/.jupyter/jupyter.service.log
StandardError=file:<home_dir>/.jupyter/jupyter.service.log

[Install]
WantedBy=multi-user.target
{% endhighlight %}

- `<user_name>` : 사용자 이름
- `<anaconda_path>` : 아나콘다가 설치된 경로
- `<home_dir>` : 사용자 홈 디렉토리 경로

각각의 옵션들을 설명하면 다음과 같다.

- `User`, `ExecStart`, `WorkingDirectory` : 서비스는 `User`의 권한으로 `WorkingDirectory`에서 `ExecStart` 명령어를 수행한다. 즉, 현재 사용자의 권한으로 `WorkingDirectory`에서 `jupyter-server` 가상환경에 설치된 주피터 랩을 `jupyter_server_config.py` 파일을 config 파일 삼아 실행하라는 뜻이다.
- `Environment` : 서비스는 환경 변수로 `Environment`에 주어진 값을 사용한다. 만약 추가적인 환경 변수를 사용해야 한다면 여기에 설정하면 된다.
- `Restart`, `RestartSec` : `Restart`가 `always`면 서비스가 실행되지(Running) 못했을 경우 `RestartSec` 시간마다 서비스가 실행될 때까지 서비스를 재시작(Restart)한다.
- `StandardOutput` : 서비스가 수행되면서 나오는 stdout이 저장될 파일
- `StandardError` : 서비스가 수행되면서 나오는 stderr가 저장될 파일

ex)
{% highlight text linenos %}
[Unit]
Description=Jupyter Lab Server

[Service]
Type=simple
PIDFile=/run/jupyter.pid
User=ubuntu
Environment="PATH=/home/ubuntu/anaconda3/envs/jupyter-server/bin:/home/ubuntu/anaconda3/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/home/ubuntu/anaconda3/envs/jupyter-server/bin/jupyter-lab --config=/home/ubuntu/.jupyter/jupyter_server_config.py
WorkingDirectory=/home/ubuntu/jupyter-server-workspace
Restart=always
RestartSec=10
StandardOutput=file:/home/ubuntu/.jupyter/jupyter.service.log
StandardError=file:/home/ubuntu/.jupyter/jupyter.service.log

[Install]
WantedBy=multi-user.target
{% endhighlight %}

서비스 생성이 완료되었으면 서비스를 등록해야 한다. 다음 명령어를 수행하면 서비스를 등록할 수 있다.

{% highlight bash %}
sudo systemctl daemon-reload  # 데몬 리로드
sudo systemctl enable jupyter.service  # jupyter.service 등록
sudo systemctl start jupyter.service  # jupyter.service 시작
{% endhighlight %}

`jupyter.service` 서비스의 상태를 확인하려면 다음 명령어를 입력한다.

{% highlight bash %}
sudo systemctl status jupyter.service
{% endhighlight %}

초록색 불이 들어와 있으면 정상적으로 주피터 랩 서비스가 실행(Running)되고 있는 것이다.

{% include caption-img.html src="jupyterlab-jupyter-server-status.png" title="Fig.08 주피터 랩 서비스 상태" description="초록색 불이 들어와 있으면 정상적으로 주피터 랩 서비스가 실행(Running)되고 있는 것이다." %}

만약 다른 색 불이 들어와 있으면 오류가 발생한 것이다. 오류 로그 등을 확인해 문제를 해결하자.