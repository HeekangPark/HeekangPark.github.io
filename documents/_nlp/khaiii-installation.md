---
title: "Ubuntu 20.04에 khaiii 설치하기"
date_created: "2022-02-18"
date_modified: "2022-03-06"
tags: ["ubuntu", "nlp", "khaiii", "installation", "ubuntu20.04"]
---

# khaiii란?

khaiii(Kakao Hangul Analyzer III)는 카카오에서 개발한, 데이터 기반(기계학습 기반)의 한글 형태소분석기이다.

> {:.title}
> Github
> 
> <https://github.com/kakao/khaiii>
> 
> 설치방법 : <https://github.com/kakao/khaiii/wiki/%EB%B9%8C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98>

# 문제상황 : Ubuntu 20.04에서 설치가 안됨

그런데 문제는 khaiii가 나온지 좀 오래되었다 보니 Ubuntu 20.04에서는 공식 설치방법대로 할 시 `cmake ..` 단계에서 다음과 같은 오류메시지와 함께 진행이 되지 않는다.

{:.code-header}
Ubuntu 20.04에 khaiii를 설치하면 나오는 오류 메시지

{% highlight text %}
(전략)
[hunter ** FATAL ERROR **] Build step failed (dir: /home/(username)/.hunter/_Base/70287b1/4f6fd75/dffbc08/Build/GTest
[hunter ** FATAL ERROR **] [Directory:/home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/projects/GTest]

------------------------------ WIKI -------------------------------
    https://github.com/ruslo/hunter/wiki/error.external.build.failed
-------------------------------------------------------------------

CMake Error at /home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_wiki.cmake:12 (message):
Call Stack (most recent call first):
  /home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_fatal_error.cmake:20 (hunter_wiki)
  /home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_download.cmake:613 (hunter_fatal_error)
  /home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/projects/GTest/hunter.cmake:244 (hunter_download)
  /home/(username)/.hunter/_Base/Download/Hunter/0.23.34/70287b1/Unpacked/cmake/modules/hunter_add_package.cmake:62 (include)
  CMakeLists.txt:63 (hunter_add_package)


-- Configuring incomplete, errors occurred!
See also "/home/(username)/workspace/khaiii/build/CMakeFiles/CMakeOutput.log".
{% endhighlight %}

# 해결법

`cmake ..` 대신 `cmake -E env CXXFLAGS="-w" cmake ..`를 사용하면 Ubuntu 20.04에서도 khaiii를 설치할 수 있다.

전체 과정을 코드로 나타내면 다음과 같다.

{:.code-header}
Ubuntu 20.04에서 khaiii 설치하기

{% highlight bash %}
# 의존성 설치
sudo apt install gcc g++ make 
pip install cmake

# khaiii 다운로드
git clone https://github.com/kakao/khaiii.git
mkdir -p khaiii/build
cd khaiii/build

# 프로그램 빌드
cmake -E env CXXFLAGS="-w" cmake ..  # 기존 cmake .. 대신 이 명령어를 사용한다.
make all 

# 리소스 빌드
make resource # base 모델 빌드. large 모델을 빌드하려면 make large_resource

# khaiii 설치
sudo make install

# python 바인딩
make package_python 
cd package_python
pip install .
{% endhighlight %}