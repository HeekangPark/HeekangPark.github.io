---
title: "Git Cheat Sheet"
order: 1
date_created: "2021-01-08"
date_modified: "2021-07-15"
---

Git 명령어 Cheat Sheet

# 로컬 저장소 새로 만들기 : git init

{% highlight bash %}
git init
{% endhighlight %}

# 원격 저장소 복제하기 : git clone

{% highlight bash %}
git clone "<url>"                # 원격 저장소의 이름을 딴 디렉토리가 생성되고 그 밑에 원격 저장소의 파일들이 복제된다.
git clone "<url>" "<dir_name>"   # dir_name이라는 이름의 디렉토리가 생성되고 그 밑에 원격 저장소의 파일들이 복제된다.
{% endhighlight %}

# Git 설정하기 : git config

{% highlight bash %}
git config --global user.name "<user_name>"       # 사용자 이름 설정
git config --global user.email "<user_email>"     # 사용자 이메일 설정
git config --global core.editor "<editor_name>"   # 기본 텍스트 편집기 설정
git config --list                                 # 모든 설정값 읽기
git config "<key>"                                # 특정 설정값 읽기
git config --show-origin "<key>"                  # 특정 설정값이 있는 config 파일 위치 보기
{% endhighlight %}