---
title: "Hadoop 설치하기"
date_created: "2021-07-28"
date_modified: "2022-06-02"
---

# 시스템 구성

사용하지 않는 연구실 우분투 서버 4대를 받아 다음과 같이 하둡 클러스터를 구성해 보기로 했다.

dl14 서버를 가장 먼저 받았기에 이 서버를 네임노드로, 나머지 서버를 데이터노드로 하는 구성을 하였다.

|       dl13        |       dl14       |   dl15    |   dl16    |
| :---------------: | :--------------: | :-------: | :-------: |
|     10.0.1.13     |    10.0.1.14     | 10.0.1.15 | 10.0.1.16 |
| SecondaryNameNode |     NameNode     |           |           |
|     DataNode      |   NodeManager    | DataNode  | DataNode  |
|                   | ResourceManager  |           |           |
|                   | JobHistoryServer |           |           |

<style>
  table th, table td {
    width: 25%;
  }
</style>

> 지금부터 별다른 언급 없이 나오는 모든 코드들은 서버 4개에서 모두 실행해야 하는 코드이다.
{:.info}

> sudo를 사용할 수 있는 계정에서 진행해야 한다.
{:.info}

# 클러스터 이름 지어주기

`/etc/hosts` 파일에 다음 내용을 추가해 각 클러스터에 이름을 붙여준다.

{:.code-header}
클러스터 이름 붙이기

{% highlight bash %}
sudo vi /etc/hosts
{% endhighlight %}

{% highlight text %}
10.0.1.13 dl13
10.0.1.14 dl14
10.0.1.15 dl15
10.0.1.16 dl16
{% endhighlight %}

<blockquote markdown="block" class="warning">

원래 필자의 dl14 `/etc/hosts` 파일에는 다음과 같은 행이 있었다.

{% highlight text %}
127.0.1.1 dl14
{% endhighlight %}

이런 식으로 `/etc/hosts` 파일에 클러스터 이름으로 루프백이 지정되어 있는 경우, 네임노드가 `10.0.1.14:9870`이 아닌 `127.0.1.1:9870`에서 실행되게 된다. 이렇게 되면 데이터노드가 네임노드를 볼 수가 없어 오류가 발생한다.

이를 방지하기 위해 (모든 클러스터에서) 다음과 같이 루프백을 주석처리해준다. (아래는 dl14에서의 예시이다.)

{:.code-header}
/etc/hosts (dl14)

{% highlight text %}
10.0.1.13 dl13
10.0.1.14 dl14
10.0.1.15 dl15
10.0.1.16 dl16

127.0.0.1 localhost
#127.0.1.1 dl14
{% endhighlight %}

</blockquote>

# 하둡 다운로드하기

2022년 6월 현재 가장 최신버전은 3.3.3이다.

{:.code-header}
하둡 다운로드

{% highlight bash %}
wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.3/hadoop-3.3.3.tar.gz
{% endhighlight %}

# 자바 설치하기

하둡 버전 3과 에러없이 호환되는 자바 버전은 8이다.

{:.code-header}
자바 설치

{% highlight bash %}
sudo apt install openjdk-8-jdk-headless
{% endhighlight %}

# 하둡 설치하기

`/usr/local` 디렉토리 밑에 하둡을 설치한다.

{:.code-header}
하둡 설치

{% highlight bash %}
tar -xzf hadoop-3.3.3.tar.gz
sudo mv hadoop-3.3.3 /usr/local
sudo ln -s /usr/local/hadoop-3.3.3 /usr/local/hadoop
rm hadoop-3.3.3.tar.gz
{% endhighlight %}

# 하둡용 계정 만들기

일반적으로 하둡은 독립된 계정에서 실행하는 경우가 많다. 하둡을 위한 계정을 만들자.

> 4개의 서버 모두 동일한 계정명을 사용해야 한다.
{:.warning}

> 비밀번호는 달라도 된다.
{:.info}

{:.code-header}
하둡용 계정 만들기

{% highlight bash %}
sudo adduser --gecos "" hadoop
{% endhighlight %}

설치한 하둡을 하둡용 계정 권한으로 수정한다.

{:.code-header}
하둡 권한 수정

{% highlight bash %}
sudo chown -R hadoop:hadoop /usr/local/hadoop-3.3.3
sudo chown hadoop:hadoop /usr/local/hadoop
{% endhighlight %}

이제부터 모든 작업은 hadoop 계정에서 진행한다.

{:.code-header}
계정 전환

{% highlight bash %}
su hadoop
{% endhighlight %}

# ssh 키 생성하기

4개의 클러스터들이 자유롭게 ssh를 통해 (비밀번호 없이) 연결될 수 있도록 `~/.ssh` 디렉토리 밑에 `id_rsa`라는 이름의 ssh 키를 생성한다. 이는 `ssh-keygen` 명령어의 디폴트 설정이므로, 다음 명령어를 실행한 후 엔터를 계속 누르면 된다.

> passphrase는 만들지 않는 것을 추천한다. passphrase를 만들면 우리의 목적인 비밀번호 없는 연결을 구현할 수 없기 때문이다. (`ssh-agent`를 이용하면 passpharse를 한 번만 입력해도 되지만, 서버를 재부팅할 때마다 passphrase를 다시 입력해 줘야 하므로 번거롭다.)
{:.warning}

{:.code-header}
ssh 키 생성

{% highlight bash %}
ssh-keygen
{% endhighlight %}

각 클러스터에서 만들어진 공개키(`id_rsa.pub`)들을 모두 모아 각 클러스터의 `~/.ssh/authorized_keys` 파일에 추가한다. 즉 각 클러스터의 `.ssh/authorized_keys` 파일들은 4개의 공개키들을 가지고 있어야 한다.

# 환경변수 추가하기

`~/.bashrc` 파일을 수정해 환경변수를 추가한다.

{:.code-header}
환경변수 추가

{% highlight bash %}
echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> ~/.bashrc
echo 'export HADOOP_HOME=/usr/local/hadoop' >> ~/.bashrc
echo 'export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop' >> ~/.bashrc
echo 'export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HADOOP_HOME/lib/native' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH' >> ~/.bashrc

source ~/.bashrc
{% endhighlight %}

# 하둡 환경설정하기

`$HADOOP_HOME/etc/hadoop` 디렉토리 밑의 다음 파일들을 수정해 하둡 환경설정을 진행한다.

{:.code-header}
$HADOOP_HOME/etc/hadoop/core-site.xml

{% highlight xml %}
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://dl14:9000</value>
    </property>
</configuration>
{% endhighlight %}

{:.code-header}
$HADOOP_HOME/etc/hadoop/hdfs-site.xml

{% highlight xml %}
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>3</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/usr/local/hadoop/data/namenode</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/usr/local/hadoop/data/datanode</value>
    </property>
    <property>
        <name>dfs.namenode.secondary.http-address</name>
        <value>dl13:50090</value>
    </property>
</configuration>
{% endhighlight %}

{:.code-header}
$HADOOP_HOME/etc/hadoop/yarn-site.xml

{% highlight xml %}
<configuration>
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>dl14</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
        <value>org.apache.hadoop.mapred.ShuffleHandler</value>
    </property>
    <property>
        <name>yarn.resourcemanager.webapp.address</name>
        <value>0.0.0.0:8088</value>
    </property>
</configuration>
{% endhighlight %}

{:.code-header}
$HADOOP_HOME/etc/hadoop/mapred-site.xml

{% highlight xml %}
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>yarn.app.mapreduce.am.env</name>
        <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
    </property>
    <property>
        <name>mapreduce.map.env</name>
        <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
    </property>
    <property>
        <name>mapreduce.reduce.env</name>
        <value>HADOOP_MAPRED_HOME=${HADOOP_HOME}</value>
    </property>
</configuration>
{% endhighlight %}

{:.code-header}
$HADOOP_HOME/etc/hadoop/hadoop-env.sh

{:.no-prompt}
{% highlight bash %}
export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
{% endhighlight %}

{:.code-header}
$HADOOP_HOME/etc/hadoop/workers

{% highlight text %}
dl13
dl15
dl16
{% endhighlight %}

# 하둡 데이터노드 데이터 디렉토리 만들기

데이터노드 클러스터(dl13, dl15, dl16)에서 다음 명령을 수행해 데이터 디렉토리를 만든다.

{:.code-header}
데이터 디렉토리 만들기(데이터노드에서만 실행)

{% highlight bash %}
mkdir -p /usr/local/hadoop/data/datanode
{% endhighlight %}

> 만약 데이터가 저장되는 위치를 바꾸고 싶다면, `$HADOOP_HOME/etc/hadoop/hdfs-site.xml`에서 `dfs.datanode.data.dir` property의 `<value>`를 원하는 디렉토리로 수정한다.
{:.info}

> 네임노드의 데이터 디렉토리(`$HADOOP_HOME/data/namenode`)는 hdfs 포멧 시 자동으로 생성되므로 굳이 만들 필요가 없다.
{:.info}

# hdfs 포멧

네임노드에서 다음 명령어를 실행한다.

{:.code-header}
hdfs 포멧(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/bin/hdfs namenode -format -force
{% endhighlight %}

# 하둡 실행

네임노드에서 다음 명령어를 실행한다.

{:.code-header}
하둡 실행(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh
$HADOOP_HOME/bin/mapred --daemon start historyserver
{% endhighlight %}

# 테스팅

하둡이 정상적으로 실행중인지 확인해보자.

## jps

현재 실행 중인 jvm 프로세스 목록을 보여주는 `jps` 명령어를 이용하면 현재 클러스터에 어떤 하둡 프로세스가 올라와 있는지 확인할 수 있다.

> 앞의 숫자와 각 항목의 순서는 다를 것이다. 어떤 항목이 실행중인지만 확인하자.
{:.warning}

{:.code-header}
jps

{% highlight bash %}
$JAVA_HOME/bin/jps
{% endhighlight %}

{:.code-result}
{% highlight text %}
# dl14
6661 Jps
3750 NameNode
4150 ResourceManager
4793 HistoryServer

# dl13
2962 SecondaryNameNode
2774 DataNode
4264 Jps
3133 NodeManager

# dl15
2738 Jps
1990 NodeManager
1791 DataNode

# dl16
2532 NodeManager
2328 DataNode
6890 Jps
{% endhighlight %}

## dfsadmin report

네임노드에서 `hdfs dfsadmin -report` 명령어를 수행해 hdfs의 상태를 확인할 수 있다.

{:.code-header}
dfsadmin report(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/bin/hdfs dfsadmin -report
{% endhighlight %}

{:.code-result}
{% highlight text %}
Configured Capacity: 1215238594560 (1.11 TB)
Present Capacity: 1094663401472 (1019.48 GB)
DFS Remaining: 1077895540736 (1003.87 GB)
DFS Used: 16767860736 (15.62 GB)
DFS Used%: 1.53%
Replicated Blocks:
        Under replicated blocks: 0
        Blocks with corrupt replicas: 0
        Missing blocks: 0
        Missing blocks (with replication factor 1): 0
        Low redundancy blocks with highest priority to recover: 0
        Pending deletion blocks: 0
Erasure Coded Block Groups:
        Low redundancy block groups: 0
        Block groups with corrupt internal blocks: 0
        Missing block groups: 0
        Low redundancy blocks with highest priority to recover: 0
        Pending deletion blocks: 0

-------------------------------------------------
Live datanodes (3):

Name: 10.0.1.13:9866 (dl13)
Hostname: dl13
Decommission Status : Normal
Configured Capacity: 210304475136 (195.86 GB)
DFS Used: 5589286912 (5.21 GB)
Non DFS Used: 16744996864 (15.59 GB)
DFS Remaining: 177215995904 (165.05 GB)
DFS Used%: 2.66%
DFS Remaining%: 84.27%
Configured Cache Capacity: 0 (0 B)
Cache Used: 0 (0 B)
Cache Remaining: 0 (0 B)
Cache Used%: 100.00%
Cache Remaining%: 0.00%
Xceivers: 0
Last contact: Fri Jun 03 06:18:46 KST 2022
Last Block Report: Fri Jun 03 05:22:16 KST 2022
Num of Blocks: 46


Name: 10.0.1.15:9866 (dl15)
Hostname: dl15
Decommission Status : Normal
Configured Capacity: 502467059712 (467.96 GB)
DFS Used: 5589286912 (5.21 GB)
Non DFS Used: 16056066048 (14.95 GB)
DFS Remaining: 455226388480 (423.96 GB)
DFS Used%: 1.11%
DFS Remaining%: 90.60%
Configured Cache Capacity: 0 (0 B)
Cache Used: 0 (0 B)
Cache Remaining: 0 (0 B)
Cache Used%: 100.00%
Cache Remaining%: 0.00%
Xceivers: 0
Last contact: Fri Jun 03 06:18:46 KST 2022
Last Block Report: Fri Jun 03 03:43:13 KST 2022
Num of Blocks: 46


Name: 10.0.1.16:9866 (dl16)
Hostname: dl16
Decommission Status : Normal
Configured Capacity: 502467059712 (467.96 GB)
DFS Used: 5589286912 (5.21 GB)
Non DFS Used: 25829298176 (24.06 GB)
DFS Remaining: 445453156352 (414.86 GB)
DFS Used%: 1.11%
DFS Remaining%: 88.65%
Configured Cache Capacity: 0 (0 B)
Cache Used: 0 (0 B)
Cache Remaining: 0 (0 B)
Cache Used%: 100.00%
Cache Remaining%: 0.00%
Xceivers: 0
Last contact: Fri Jun 03 06:18:46 KST 2022
Last Block Report: Fri Jun 03 03:43:13 KST 2022
Num of Blocks: 46  
{% endhighlight %}

## 웹 서버

다음 url로 접속하면 현재 하둡의 실행 상태를 확인할 수 있다.

- NameNode : [http://dl14:9870](http://dl14:9870)
- ResourceManager : [http://dl14:8088/](http://dl14:8088/)
- JobHistory : [http://dl14:19888/](http://dl14:19888/)

## 예제 : wordcount

하둡 설치를 검증하기 위해 간단한 예제를 수행해보자.

우선 업로드할 파일을 다운받자.

{:.code-header}
파일 다운로드 : Gutenberg 프로젝트에서 제공하는 성경 파일

{% highlight bash %}
wget https://www.gutenberg.org/cache/epub/10/pg10.txt
{% endhighlight %}

다운받은 파일을 hdfs로 업로드하자.

{:.code-header}
hdfs로 파일 업로드

{% highlight bash %}
hdfs dfs -mkdir -p /user/hadoop
hdfs dfs -put pg10.txt /user/hadoop/pg10.txt
{% endhighlight %}

파일이 잘 올라갔는지는 다음 명령어로 확인해 볼 수 있다.

{:.code-header}
파일 존재 여부 확인

{% highlight bash %}
hdfs dfs -ls /user/hadoop/
{% endhighlight %}

{:.code-result}
{% highlight text %}
Found 1 items
-rw-r--r--   3 hadoop supergroup    4457889 2022-06-03 06:49 /user/hadoop/pg10.txt
{% endhighlight %}

이 파일에 대해 하둡에서 제공하는 기본 예제 중 하나인 wordcount(단어 수 세기)를 수행해보자.

{:.code-header}
wordcount

{% highlight bash %}
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.3.3.jar wordcount /user/hadoop/pg10.txt /user/hadoop/output
{% endhighlight %}

실행이 완료되면 hdfs의 `/user/hadoop/output` 디렉토리에서 그 결과를 볼 수 있다.

{:.code-header}
실행 결과 확인

{% highlight bash %}
hdfs dfs -ls /user/hadoop/output # output 디렉토리 탐색
hdfs dfs -cat /user/hadoop/output/part-r-00000 # wordcount 결과 확인
hdfs dfs -get /user/hadoop/output/part-r-00000 # 결과 파일 (로컬로) 다운로드
{% endhighlight %}

위 명령어들이 아무 문제 없이 수행되었다면 하둡이 성공적으로 잘 설치되었다는 것이다.

# 하둡 종료

네임노드에서 다음 명령어를 실행한다.

{:.code-header}
하둡 종료(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/sbin/stop-dfs.sh
$HADOOP_HOME/sbin/stop-yarn.sh
$HADOOP_HOME/bin/mapred --daemon stop historyserver
{% endhighlight %}

# hdfs 초기화

하둡을 종료한 후, 네임노드에서는 다음 명령어를 실행한다.

{:.code-header}
hdfs 초기화(네임노드)

{% highlight bash %}
rm -rf $HADOOP_HOME/data/namenode/*
{% endhighlight %}

데이터노드에서는 다음 명령어를 실행한다.

{:.code-header}
hdfs 초기화(데이터노드)

{% highlight bash %}
rm -rf $HADOOP_HOME/data/datanode/*
{% endhighlight %}

필요하다면 재포멧한다.

{:.code-header}
hdfs 포멧(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/bin/hdfs namenode -format -force
{% endhighlight %}
