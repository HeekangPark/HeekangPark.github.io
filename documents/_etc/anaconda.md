---
title: "아나콘다(Anaconda) 리눅스(Ubuntu)에 설치하기"
tags: ["anaconda", "python", "framework", "linux", "ubuntu"]
date: "2020-08-31"
---

# 파이썬 가상환경 (Python Virtual Environment)

일반적으로 우분투 환경에서 파이썬을 설치하려면 다음과 같이 `apt` 명령어를 이용한다.

{% highlight bash %}
$ sudo apt install python3
{% endhighlight %}

그리고 pip를 이용해 

이렇게 되면 파이썬은 `/usr/local/lib/pythonX.Y` 디렉토리에 설치된다.



시스템에 설치된 파이썬에서 pip를 이용해 패키지를 설치하게 되면                                                  

> 파이썬 프로그래머 A는 프로젝트 P, Q를 동시에 진행하고 있다. P와 Q는 둘 다 패키지 X를 사용해야 한다. 그런데 P에서는 패키지 X의 1.3 버전을 사용해야 하고, Q에서는 X의 2.1 버전을 사용해야 한다.
> 파이썬 프로그래머 B는 패키지 X를 사용해 성공적으로 


아나콘다(Anaconda)란?

아나콘다란 무엇일까? [아나콘다 공식 문서](https://docs.anaconda.com/anaconda/)에서는 아나콘다를

- 패키지 매니저 (Package Manager)
- 가상환경 관리자 (Environment Manager)
- 파이썬/R 데이터 사이언스 배포판 (Python/R data science distribution)
- 7,500개 이상의 오픈 소스 패키지들의 모임 (collection of over 7,500+ open-source packages)

라 소개하고 있다. 