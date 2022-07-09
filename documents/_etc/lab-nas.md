---
title: "연구실 NAS 구축기 (feat. Docker, Nextcloud, Nginx Proxy Manager)"
date_created: "2022-07-07"
date_modified: "2022-07-09"
tags: ["nas", "docker", "nextcloud", "nginx-proxy-manager"]
---

본 문서는 연구실에서 사용할 NAS를 구축했던 필자의 경험을 정리한 문서이다. 결론부터 말하자면, 필자는 Ubuntu 20.04 LTS 시스템에서 docker로 구동되는 Nextcloud를 설치한 후, (마찬가지로 docker로 구동되는) Nginx Proxy Manager와 학교에서 발급받은 SSL 인증서를 이용, 443번 포트가 아닌 다른 포트에서 Nextcloud가 https로 서비스되도록 구축하였다. 만약 최종 구축하는 방법만 보고 싶다면 마지막 [결론](#kramdown_결론) 문단을 참고하자.

# 발단

연구실에서 서버를 한 대 받아 NAS를 구축하게 되었다. 요구사항은 두 가지였다.

- 신뢰성이 높을 것 : 하드가 망가지더라도 저장된 데이터가 망가지지 않을 것
- 관리가 쉬울 것 : 내가 졸업한 이후에도 계속해서 관리가 될 수 있도록, 관리가 쉬울 것

# 첫 번째 요구사항 : 신뢰성이 높을 것

첫 번째 요구사항을 충족시키기 위해, NAS 데이터 저장용으로 신뢰성이 높은(= 비싼) HDD를 구매해, 이들을 HDD들을 RAID 6으로 묶었다. 우선 비싼 HDD이기에 잘 고장이 나지 않을 것이며, 만약 고장이 난다 하더라도 한 번에 모든 HDD가 고장날 확률은 매우 낮을 것이다. 이때 RAID 6는 HDD가 2개까지 손상되더라도 복구할 수 있으므로 이 정도면 첫 번째 요구사항을 충족시키기에 충분하다고 판단했다.

**결론 : 비싼 HDD + RAID 6**

# 두 번째 요구사항 : 관리가 쉬울 것

## NAS 전용 운영체제 vs. NAS 프로그램, 둘 중 뭐가 더 좋을까?

NAS 전용 운영체제를 올리는 방법과 NAS 프로그램을 올리는 방법 중 고민하다가, 

- 서버 사양이 꽤 좋아 NAS 말고 다른 것도 돌릴 수 있고,
- 많이 사용해 익숙한 Linux 운영체제(Ubuntu)를 사용할 수 있고,
- 또 구축 및 사용 경험이 있는

Nextcloud라는 오픈소스 NAS 프로그램을 올리는 것이 더 좋다고 판단했다.

**결론 : Nextcloud 사용하기로 결정**

## Nextcloud를 어떻게 올릴까?

예전에 개인 서버에서 NAS를 구축할 때 Nextcloud를 시스템에 직접설치하니 환경설정 등 자잘한 이슈가 많아 이를 해결하느라 고생했던 기억이 있다. 그런데 찾아보니 Nextcloud에서 직접 관리하는 Nextcloud 공식 docker 이미지가 있었다. docker를 사용하면 복잡한 환경설정 따위를 신경쓰지 않아도 되고, 켜고 끄기, 업데이트 등 관리도 매우 쉽기에 이를 사용하기로 했다.

**결론 : docker를 사용해 Nextcloud를 구동하기로 결정**

## Nextcloud docker에는 DB가 포함되어 있지 않네?

Nextcloud의 구동을 위해서는 DB가 필요하다(실제로 기억을 되짚어보면 개인 서버에서 NAS를 구축할 때 DB와 Nextcloud를 연결하는 과정에서 많은 고생을 했었다). 그런데 Nextcloud docker 이미지에는 DB가 포함되어 있지 않다. 아마 사용자에게 DB 선택에 대한 자유를 주기 위함이리라. 

다행히 Nextcloud docker의 github repository에 가니 README에 (조금 불친절하지만) DB docker 컨테이너와 Nextcloud를 어떻게 연결해야 하는지 설명되어 있었다. 이를 참조해 MariaDB을 Nextcloud와 연결하였다.

그런데 여기까지 하고 Nextcloud를 구동해 보니 뭔가 알 수 없는 오류가 계속 발견되었다. 열심히 Nextcloud 포럼을 뒤진 결과 docker로 MariaDB를 실행할 땐 추가적인 명령어를 줘야 오류가 발생하지 않는다는 것을 알게 되었다. 그래서 docker compose에 이를 추가하였고, 다행히 문제가 해결되었다.

**결론 : MySQL을 Nextcloud의 DB로 사용하기로 결정 + 추가적인 설정**

# https에서 서비스하고 싶은데... : 모든 문제의 서막

보안 등의 이유로 되도록이면 NAS 서비스가 https에서 동작하도록 하고 싶었다.

## 도메인 및 SSL 인증서 신청

https 접속을 위해 `*.snu.ac.kr` 도메인과 SSL 인증서를 발급신청했다. 약간의 귀찮은 서류 작성과 여러 번의 이메일이 오고간 후 도메인과 SSL 인증서를 받을 수 있었다.

**결론 : 도메인 및 SSL 인증서를 발급함**

## Nextcloud docker는 http로만 열 수 있네?

Nextcloud docker는 80번 포트로 http 연결만 할 수 있게 되어 있었다. https를 사용하려면 nginx 등을 이용해 리버스 프록시(reverse proxy) 설정을 해 줘야 했다. 찾아보니 Nginx Proxy Manager라는, 웹 UI에서 간편하게 nginx 리버스 프록시를 설정할 수 있는 툴이 있었다. Nginx Proxy Manager 역시 docker로 구동되어 설치하기도 매우 쉬웠다. 그래서 이를 사용하기로 했다. 

**결론 : (docker를 사용해) Nginx Proxy Manager를 구동하기로 결정**

## 학교 방화벽 정책이 X판인데?

서울대학교 교내 네트워크 안에 위치한 연구실 서버로 접속하기 위해서는 서울대학교 교내 네트워크의 방화벽을 관리하는 중앙전산원에 포트 개방 신청을 해야 했다. 443번 포트를 열어달라고 중앙전산원에 메일을 보내고 며칠 기다리니 드디어 443번 포트를 사용할 수 있게 되었다. 그래서 Nginx Proxy Manager와 Nextcloud를 구동해 봤는데...

계속 알 수 없는 오류가 발생했다. 구체적으로, 파일을 삭제해도 삭제가 되지 않았고, Nextcloud가 계속해서 알 수 없는 오류가 발생했다며 경고를 띄웠다. 알고보니 학교 방화벽에는 443 포트에 대해 GET, POST를 제외한 모든 http 메소드를 막는 충격적인 방화벽 정책이 설정되어 있었다. REST API가 나온지가 몇 년이 됐는데... 왜 이런 정책이 설정되어 있냐고 문의해 봤지만 중앙전산원 측에서도 잘 모르겠다는 어이없는 대답만 돌아왔다(당연히 해제해 줄 수도 없다고 했다).

그래서 하는 수 없이 443번 포트가 아닌 (이상한 방화벽 정책이 없을) 10,000대의 포트를 사용하기로 했다.

**결론 : 10,000대의 포트를 사용하기로 결정**

## Nginx Proxy Manager는 80번, 443번 포트만 디폴트로 쓰는데?

10,000대의 포트를 쓰려고 하니 또 예상치 못한 문제가 발생했다. 상술했듯이 Nginx Proxy Manager를 사용하면 웹 UI로 Nginx 리버스 프록시 설정을 쉽게 할 수 있는데, 이때 웹 UI에서 선택 가능한 포트는 80번, 443번 포트 두 종류밖에 없었다. 만약 다른 포트를 사용하고 싶으면 Advanced 설정에서 수동으로 잡아 줘야 했다. 열심히 검색한 끝에, 결국 설정에 성공했다.

**결론 : 10,000대의 포트를 사용할 수 있도록 Nginx Proxy Manager에서 수동으로 설정을 잡아줌**

## Nextcloud는 리버스 프록시도, https도 못알아듣는데?

Nginx Proxy Manager를 설정하고 보니 Nextcloud가 리버스 프록시도, https도 인식을 제대로 못하는 것을 확인했다. 열심히 포럼을 뒤져보니 Nextcloud의 `config.php` 파일에 추가적인 설정을 잡아줘야 하는 것을 알게 되었다.

**결론 : Nextcloud의 `config.php` 파일에 추가적인 설정을 잡아줌**

# 기타 문제들

## docker에서는 Nextcloud 배경 작업을 돌릴 수 없는데?

Nextcloud에서는 주기적으로 배경 작업(background jobs)을 돌려 줘야 쾌적하게 아무 문제 없이 Nextcloud를 사용할 수 있다. Nextcloud는 AJAX, Webcron, Cron 세 가지 중 하나를 이용해 배경 작업이 주기적으로 실행되게 설정할 수 있는데, 이 중 가장 좋은 방법은 Cron을 이용한 방식이다. 그런데 Cron 작업은 `www-data` 사용자 명의로 `cron.php` 파일을 실행해야 하는데 Nextcloud docker에는 이런 설정이 (당연히) 들어 있지 않았다. 그래서 호스트 시스템에서 직접 Cron에 등록하는 방식으로 배경 작업이 주기적으로 실행될 수 있도록 했다.

**결론 : 호스트 시스템에서 직접 Cron 작업을 등록**

## Nextcloud 이메일 서버 설정

Gmail의 SMTP 메일 서버를 사용하면 손쉽게 Nextcloud에 이메일 기능을 추가할 수 있다. 옛날에는 구글 계정과 비밀번호만으로도 Gmail SMTP 메일 서버를 쉽게 쓸 수 있었으나, 2022년 5월 30일부로 보안 설정이 빡빡해짐에 따라 2단계 인증을 한 기기에서만 사용 가능하게 되었다. 2단계 인증을 한 후 앱 비밀번호를 발급해 Nextcloud에서 Gmail SMTP 메일 서버를 사용할 수 있도록 했다.

**결론 : Nextcloud에서 Gmail SMTP 메일 서버를 사용할 수 있도록 함**

# 결론

최종적으로, 다음과 같이 구축하였다.

## 도메인, 포트, SSL 인증서 신청

중앙전산원에 다음과 같이 신청하였다(정확한 값은 아니다).

- 도메인 : `xxx.snu.ac.kr`
- SSL 인증서 : `*.snu.ac.kr`
  - 인증서 파일(`.pem`)과 키 파일(`.key`)로 구성
- 포트
  - 10000 : Nextcloud로의 접속을 위한 포트
  - 10001 : Nginx Proxy Manager 관리자 페이지로의 https 접속을 위한 포트
  - 10002 : Nginx Proxy Manager 관리자 페이지로의 http 접속을 위한 임시 포트

## OS, docker, docker compose 설치

- OS : Ubuntu 20.04 LTS
- docker : v20.10.17
- docker compose : v2.6.1

docker 및 docker compose 설치법은 [해당 문서](/docker/01-installation)를 참조하자.

## 새 Linux 계정 생성

Nextcloud를 실행/관리할 `nas`라는 새로운 계정을 만들자.

{:.code-header}
새 Linux 계정 생성

{% highlight bash %}
sudo adduser nas
{% endhighlight %}

그리고 nas에 관리자 권한을 부여하자.

{:.code-header}
nas 계정에 관리자 권한 부여

{% highlight bash %}
sudo adduser nas sudo
{% endhighlight %}

지금부터 아래의 모든 작업은 nas 계정에서 진행하도록 한다.

{:.code-header}
nas 계정으로 전환

{% highlight bash %}
su nas
{% endhighlight %}

## docker network 생성

Nginx Proxy Manager 컨테이너와 Nextcloud 컨테이너가 서로를 볼 수 있도록 `nas`라는 이름의 docker network(bridge)를 생성한다.

{:.code-header}
docker network 생성

{% highlight bash %}
docker network create nas
{% endhighlight %}

## Nextcloud 컨테이너 생성

Nextcloud를 위한 디렉토리 `~/nextcloud` 를 만들고,

{:.code-header}
~/nextcloud 디렉토리 생성

{% highlight bash %}
mkdir -p ~/nextcloud
{% endhighlight %}

디렉토리 안에 `docker-compose.yml` 파일을 다음과 같이 작성한다.

{:.code-header}
~/nextcloud/docker-compose.yml 생성

{% highlight yaml linenos %}
version: '3.2'

services:
    db:
        image: mariadb
        restart: always
        command: "--transaction-isolation=READ-COMMITTED --binlog-format=ROW --innodb-read-only-compressed=OFF"
        volumes:
            - ./db:/var/lib/mysql
        environment:
            - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_root_password
            - MYSQL_PASSWORD_FILE=/run/secrets/mysql_nextcloud_password
            - MYSQL_USER=nextcloud
            - MYSQL_DATABASE=nextcloud
        secrets:
            - mysql_root_password
            - mysql_nextcloud_password
    app:
        image: nextcloud
        restart: always
        volumes:
            - ./app:/var/www/html
        environment:
            - MYSQL_HOST=db
            - MYSQL_USER=nextcloud
            - MYSQL_PASSWORD_FILE=/run/secrets/mysql_nextcloud_password
            - NEXTCLOUD_ADMIN_PASSWORD_FILE=/run/secrets/nextcloud_admin_password
            - NEXTCLOUD_ADMIN_USER=admin
        secrets:
            - mysql_nextcloud_password
            - nextcloud_admin_password
        depends_on:
            - db
        links:
            - db
        ports:
            - '10000:80'

networks:
    default:
        name: nas

volumes:
    db:
    app:

secrets:
    mysql_root_password:
        file: ./mysql_root_password.secret
    mysql_nextcloud_password:
        file: ./mysql_nextcloud_password.secret
    nextcloud_admin_password:
        file: ./nextcloud_admin_password.secret
{% endhighlight %}

그리고 동일한 디렉토리(`~/nextcloud/`)에 다음 파일들을 만들어준다.

- `mysql_root_password.secret` : MariaDB의 root password를 저장하는 텍스트 파일
- `mysql_nextcloud_password.secret` : MariaDB에서 Nextcloud 계정이 사용할 password를 저장하는 텍스트 파일
- `nextcloud_admin_password.secret` : Nextcloud 관리자 계정이 사용할 password를 저장하는 텍스트 파일

보안을 위해 위 3개 파일은 권한을 600으로 제한했다.

{:.code-header}
~/nextcloud/*.secret 파일 권한 설정

{% highlight bash %}
chmod 600 ~/nextcloud/*.secret
{% endhighlight %}

그리고 docker compose를 이용해 Nextcloud 컨테이너를 실행한다.

{:.code-header}
Nextcloud 컨테이너 실행

{% highlight bash %}
cd ~/nextcloud
docker compose up -d
{% endhighlight %}

## Nextcloud 최초접속

`http://xxx.snu.ac.kr:10000`에 접속하면 Nextcloud 초기화 페이지가 뜬다(주소가 http인 점에 유의하자).

{% include caption-img.html src="lab-nas-nextcloud-init-1.png" title="Nextcloud : 최초접속 (1)" %}

"사용자 이름"과 "암호" 항목에 각각 다음과 같이 입력한다.

- 사용자 이름 : "admin" (`~/nextcloud/docker-compose.yml`에 작성한 `services.nextcloud.environment.NEXTCLOUD_ADMIN_USER` 값)
- 암호 : `~/nextcloud/nextcloud_admin_password.secret`에 작성한 pw

그리고 아래의 "저장소 및 데이터베이스"를 클릭한 후, 각각 다음과 같이 선택/입력한다.

- 데이터 폴더 : "/var/www/html/data"
- 데이터베이스 설정 : "MySQL/MariaDB"
- 데이터베이스 사용자 : "nextcloud" (`~/nextcloud/docker-compose.yml`에 작성한 `services.db.environment.MYSQL_USER` 값)
- 데이터베이스 암호 : `~/nextcloud/mysql_nextcloud_password.secret`에 작성한 pw
- 데이터베이스 이름 : "nextcloud" (`~/nextcloud/docker-compose.yml`에 작성한 `services.db.environment.MYSQL_DATABASE` 값)
- 데이터베이스 호스트 : "db" (`~/nextcloud/docker-compose.yml`에 작성한 DB 컨테이너의 이름)

{% include caption-img.html src="lab-nas-nextcloud-init-2.png" title="Nextcloud : 최초접속 (2)" %}

그리고 아래 "설치" 버튼을 누른다. 잠시 기다리면 다음과 같이 추천 앱을 설치할지 여부를 묻는데

{% include caption-img.html src="lab-nas-nextcloud-init-3.png" title="Nextcloud : 최초접속 (3)" %}

개인 재량으로 설치할지 말지를 선택하면 된다. 이렇게까지 하면 Nextcloud 최초실행 및 설치가 완료된 것이다.

이제 다음 명령어를 입력해 Nextcloud 컨테이너를 잠시 종료해 두자.

{:.code-header}
Nextcloud 컨테이너 종료

{% highlight bash %}
cd ~/nextcloud
docker compose down
{% endhighlight %}

그리고 `~/nextcloud/docker-compose.yml` 파일에서 다음과 같이 포트 연결을 제거해, Nextcloud 컨테이너로의 직접 접속을 막는다.

{:.code-header}
~/nextcloud/docker-compose.yml 수정 : 포트 제거

{% highlight yaml linenos %}
version: '3.2'

services:
    db:
        image: mariadb
        restart: always
        command: "--transaction-isolation=READ-COMMITTED --binlog-format=ROW --innodb-read-only-compressed=OFF"
        volumes:
            - ./db:/var/lib/mysql
        environment:
            - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_root_password
            - MYSQL_PASSWORD_FILE=/run/secrets/mysql_nextcloud_password
            - MYSQL_USER=nextcloud
            - MYSQL_DATABASE=nextcloud
        secrets:
            - mysql_root_password
            - mysql_nextcloud_password
    app:
        image: nextcloud
        restart: always
        volumes:
            - ./app:/var/www/html
        environment:
            - MYSQL_HOST=db
            - MYSQL_USER=nextcloud
            - MYSQL_PASSWORD_FILE=/run/secrets/mysql_nextcloud_password
            - NEXTCLOUD_ADMIN_PASSWORD_FILE=/run/secrets/nextcloud_admin_password
            - NEXTCLOUD_ADMIN_USER=admin
        secrets:
            - mysql_nextcloud_password
            - nextcloud_admin_password
        depends_on:
            - db
        links:
            - db
#       ports: <- 제거
#           - '10000:80' <- 제거

networks:
    default:
        name: nas

volumes:
    db:
    app:

secrets:
    mysql_root_password:
        file: ./mysql_root_password.secret
    mysql_nextcloud_password:
        file: ./mysql_nextcloud_password.secret
    nextcloud_admin_password:
        file: ./nextcloud_admin_password.secret
{% endhighlight %}

## Nginx Proxy Manager 컨테이너 생성

Nginx Proxy Manager를 위한 디렉토리 `~/nginx-proxy-manager` 를 만들고,

{:.code-header}
~/nginx-proxy-manager 디렉토리 생성

{% highlight bash %}
mkdir -p ~/nginx-proxy-manager
{% endhighlight %}

디렉토리 안에 `docker-compose.yml` 파일을 다음과 같이 작성한다.

{:.code-header}
~/nginx-proxy-manager/docker-compose.yml 생성

{% highlight yaml linenos %}
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '10000:10000'
      - '10001:10001'
      - '10002:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

networks:
  default:
    name: nas
{% endhighlight %}

그리고 docker compose를 이용해 Nginx Proxy Manager 컨테이너를 실행한다.

{:.code-header}
Nginx Proxy Manager 컨테이너 실행

{% highlight bash %}
cd ~/nginx-proxy-manager
docker compose up -d
{% endhighlight %}

## Nginx Proxy Manager 최초접속

`http://xxx.snu.ac.kr:10002`에 접속하면 로그인 페이지가 뜬다(주소가 http인 점에 유의하자).

{% include caption-img.html src="lab-nas-npm-login-page.png" title="Nginx Proxy Manager : 로그인 페이지" %}

최초접속 시 id와 pw는 다음과 같다.

- id : `admin@example.com`
- pw : `changeme`
 
이 id/pw로 로그인을 하면 관리자 계정과 pw를 설정하라는 팝업이 뜨는데,

{% include caption-img.html src="lab-nas-npm-initial-1.png" title="Nginx Proxy Manager : 최초접속 (1)" %}

{% include caption-img.html src="lab-nas-npm-initial-2.png" title="Nginx Proxy Manager : 최초접속 (2)" %}

시키는 대로 적당히 잘 만들면 된다.

## Nginx Proxy Manager SSL 인증서 등록

상단의 메뉴 바에서 "SSL Certificates"를 클릭하면 다음과 같은 창이 뜬다.

{% include caption-img.html src="lab-nas-npm-ssl-1.png" title="Nginx Proxy Manager : SSL Certificate 등록 (1)" %}

우측 상단의 "Add SSL Certificate" 버튼을 누른 후, "Custom"을 선택한다.

{% include caption-img.html src="lab-nas-npm-ssl-2.png" title="Nginx Proxy Manager : SSL Certificate 등록 (2)" %}

그럼 다음과 같은 팝업이 뜨는데

{% include caption-img.html src="lab-nas-npm-ssl-3.png" title="Nginx Proxy Manager : SSL Certificate 등록 (3)" %}

각 항목에 다음과 같이 입력한 후,

- Name : "*.snu.ac.kr"
- Certificate Key : SSL Cerficiate의 키 파일(`.key`)
- Certificate : SSL Cerficiate의 인증서 파일(`.pem`)

"Save" 버튼을 누른다("Intermediate Certificate" 항목에는 값을 입력할 필요 없다).

이때 주의할 것이, Nginx Proxy Manager는 passphrase가 적용된 키 파일을 인식하지 못한다. 따라서 만약 가지고 있는 키 파일이 passphrase로 보호된 파일이라면 다음 명령어로 passphrase를 없애자.

{:.code-header}
키 파일 passphrase 제거

{% highlight bash %}
openssl rsa -in <passphrase가 적용된 원본 키 파일> -out <passphrase가 제거된 키 파일>
{% endhighlight %}

## Nginx Proxy Manager Proxy Host 추가

상단의 메뉴 바에서 "Hosts"를 클릭한 후 "Proxy Hosts"를 클릭하면 다음과 같은 창이 뜬다.

{% include caption-img.html src="lab-nas-npm-proxy-1.png" title="Nginx Proxy Manager : Proxy Host 등록 (1)" %}

우측 상단의 "Add Proxy Host" 버튼을 클릭하면 다음과 같은 팝업이 뜬다.

{% include caption-img.html src="lab-nas-npm-proxy-2.png" title="Nginx Proxy Manager : Proxy Host 등록 (2)" %}

우선 Nginx Proxy Manager 관리자 페이지에 10001 포트로 https 접속이 가능하도록 설정해 보자. 각 항목을 다음과 같이 채운 후 "Save" 버튼을 누른다.

- Details 탭
  - Domain Name : `xxx.snu.ac.kr:10001`
  - Scheme : `http`
  - Forward Hostname / IP : `nginx-proxy-manager-app-1`
  - Forward Port : `81`
  - Cache Assets : `True`
  - Block Common Exploits : `True`
- SSL 탭
  - SSL Certificate : `*.snu.ac.kr`
  - Force SSL : `True`
  - HTTP/2 Support : `True`
  - HSTS Enabled : `True`
- Advanced 탭
  - 다음 행을 추가한다 : `listen 10001 ssl http2;`

이번엔 Nextcloud에 10000번 포트로 https 접속이 가능하도록 설정해 보자. 다시 "Add Proxy Host" 버튼을 클릭하고, 각 항목을 다음과 같이 채운 후 "Save" 버튼을 누른다.

- Details 탭
  - Domain Name : `xxx.snu.ac.kr:10000`
  - Scheme : `http`
  - Forward Hostname / IP : `nextcloud-app-1`
  - Forward Port : `80`
  - Cache Assets : `True`
  - Block Common Exploits : `True`
- SSL 탭
  - SSL Certificate : `*.snu.ac.kr`
  - Force SSL : `True`
  - HTTP/2 Support : `True`
  - HSTS Enabled : `True`
- Advanced 탭
  - 다음 행을 추가한다 : `listen 10000 ssl http2;`
  - 다음 행을 추가한다 : `rewrite ^/\.well-known/carddav https://$server_name/remote.php/dav/ redirect;`
  - 다음 행을 추가한다 : `rewrite ^/\.well-known/caldav https://$server_name/remote.php/dav/ redirect;`

이렇게 두 개의 Proxy Host를 추가한 후, `https://xxx.snu.ac.kr:10001`으로 https 접속을 테스트해 보자. 정상적으로 Nginx Proxy Manager 관리자 로그인 페이지가 뜨면 된 것이다.

여기까지 확인이 되었으면, 임시로 사용했던 10002번 포트의 연결을 끊자. 다음 명령어로 Nginx Proxy Manager 컨테이너를 종료한 후,

{:.code-header}
Nginx Proxy Manager 컨테이너 종료

{% highlight bash %}
cd ~/nginx-proxy-manager
docker compose down
{% endhighlight %}

`~/nginx-proxy-manager/docker-compose.yml` 파일에서 다음과 같이 호스트의 10002번 포트로의 연결을 제거한다.

{:.code-header}
~/nginx-proxy-manager/docker-compose.yml 수정 : 포트 제거

{% highlight yaml linenos %}
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '10000:10000'
      - '10001:10001'
#     - '10002:81'  <- 제거
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

networks:
  default:
    name: nas
{% endhighlight %}

완료되었으면 다시 Nginx Proxy Manager 컨테이너를 실행한다.

{:.code-header}
Nginx Proxy Manager 컨테이너 실행

{% highlight bash %}
cd ~/nginx-proxy-manager
docker compose up -d
{% endhighlight %}

## Nextcloud 설정파일 편집

리버스 프록시로 https 접속이 가능하도록 하기 위해서는 Nextcloud 설정파일을 편집해야 한다. `~/nextcloud/app/config/config.php` 파일을 다음과 같이 수정한다. 참고로 이 파일을 호스트 운영체제에서 수정하려면 관리자 권한이 필요하다.

{:.code-header}
~/nextcloud/app/config/config.php 수정

{% highlight php linenos %}
<?php
$CONFIG = array (
  'htaccess.RewriteBase' => '/',
  'memcache.local' => '\\OC\\Memcache\\APCu',
  'apps_paths' =>
  array (
    0 =>
    array (
      'path' => '/var/www/html/apps',
      'url' => '/apps',
      'writable' => false,
    ),
    1 =>
    array (
      'path' => '/var/www/html/custom_apps',
      'url' => '/custom_apps',
      'writable' => true,
    ),
  ),
  'instanceid' => '****************', // 인스턴스마다 다름
  'passwordsalt' => '****************', // 인스턴스마다 다름
  'secret' => '****************', // 인스턴스마다 다름
  'trusted_domains' =>
  array (
    0 => 'xxx.snu.ac.kr:10000',
  ),
  'datadirectory' => '/var/www/html/data',
  'dbtype' => 'mysql',
  'version' => '24.0.2.1',
  'overwrite.cli.url' => 'https://xxx.snu.ac.kr:10000', // 수정 필요! (http -> https)
  'dbname' => 'nextcloud',
  'dbhost' => 'db',
  'dbport' => '',
  'dbtableprefix' => 'oc_',
  'mysql.utf8mb4' => true,
  'dbuser' => 'nextcloud',
  'dbpassword' => '**************', // 설정값(~/nextcloud/mysql_nextcloud_password.secret)에 따라 다름
  'installed' => true,
  // 아래 항목들은 새로 추가 필요!
  'skeletondirectory' => '', 
  'overwritehost' => 'xxx.snu.ac.kr:10000',
  'overwriteprotocol' => 'https',
  'trusted_proxies' =>
  array (
    0 => 'nginx-proxy-manager-app-1',
  ),
  'default_language' => 'ko',
  'default_locale' => 'ko_KR',
);
{% endhighlight %}

이렇게 한 후 Nextcloud 컨테이너를 실행하자.

{:.code-header}
Nextcloud 컨테이너 실행

{% highlight bash %}
cd ~/nextcloud
docker compose up -d
{% endhighlight %}

이제 `https://xxx.snu.ac.kr:10000`으로 접속해 보자. 위 과정대로 잘 수행했으면 https가 적용되어 Nextcloud가 열릴 것이다.

## Nextcloud 배경 작업 설정

우선 Nextcloud에 접속해(`https://xxx.snu.ac.kr:10000`) 관리자 계정으로 로그인한 후, 우측 상단의 관리자 아이콘을 클릭한 후 "설정" > "기본 설정"에 들어간다. 그리고 다음과 같이 배경 작업을 "Cron"으로 설정한다.

{% include caption-img.html src="lab-nas-nextcloud-setting-1.png" title="Nextcloud : 배경 작업 설정" %}

그리고 적당한 곳(ex. `~/nextcloud/nextcloud_cron.sh`)에 다음과 같은 스크립트를 작성한 후,

{:.code-header}
~/nextcloud/nextcloud_cron.sh 생성

{% highlight shell %}
#!/bin/bash
docker exec -u www-data nextcloud-app-1 php cron.php
{% endhighlight %}

실행 권한을 부여한다.

{:.code-header}
~/nextcloud/nextcloud_cron.sh 실행 권한 부여

{% highlight bash %}
chmod +x ~/nextcloud/nextcloud_cron.sh
{% endhighlight %}

그리고 관리자 권한으로 다음과 같이 Cron 작업을 등록한다.

{:.code-header}
Cron 작업 등록

{% highlight bash %}
sudo crontab -e
{% endhighlight %}

{:.code-header}
Cron 작업 내용

{% highlight text %}
*/5 * * * * /home/nas/nextcloud/nextcloud_cron.sh
{% endhighlight %}

이제 매 5분마다 Nextcloud 배경 작업이 실행되게 된다.

## Nextcloud 이메일 서버 설정

우선 Google 계정에서 2단계 인증을 활성화한 후, 앱 비밀번호를 발급한다.

그리고 Nextcloud에 접속해(`https://xxx.snu.ac.kr:10000`) 관리자 계정으로 로그인한 후, 우측 상단의 관리자 아이콘을 클릭하고 "설정" > "기본 설정"에 들어가면 이메일 서버를 설정할 수 있다.

{% include caption-img.html src="lab-nas-nextcloud-setting-1.png" title="Nextcloud : 이메일 서버 설정" %}

각 항목의 입력값은 다음과 같이 하면 된다.

- 보내기 모드 : `SMTP`
- 암호화 : `STARTTLS`
- 보낸 사람 주소 : `(Google 계정명)@gmail.com`
- 인증 방법 : `로그인`
- 인증 필요함 : `True`
- 서버 주소 : `smtp.gmail.com:587`
- 인증 정보
  - SMTP 사용자 이름 : `(Google 계정명)@gmail.com`
  - SMTP 암호 : 발급받은 앱 비밀번호

"저장" 버튼을 클릭한 후, "이메일 보내기" 버튼을 클릭해 보자. 모든 설정이 잘 되었다면 Nextcloud에서 전송한 메일을 확인할 수 있을 것이다.


