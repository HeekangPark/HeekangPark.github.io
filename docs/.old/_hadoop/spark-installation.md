---
title: "Spark 설치하기"
date_created: "2022-06-03"
date_modified: "2022-06-19"
---

이 문서는 [Hadoop 설치하기](/hadoop/hadoop-installation) 문서에서 이어지는 문서이다. Spark 설치를 위해서는 Hadoop이 설치되어 있어야 하므로 해당 문서를 먼저 읽어보고 오는 것을 추천한다.

# 시스템 구성

<table>
    <thead>
        <tr>
            <th>dl13</th>
            <th>dl14</th>
            <th>dl15</th>
            <th>dl16</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>10.0.1.13</td>
            <td>10.0.1.14</td>
            <td>10.0.1.15</td>
            <td>10.0.1.16</td>
        </tr>
        <tr class="top-border">
            <td>DataNode</td>
            <td>NameNode</td>
            <td>DataNode</td>
            <td>DataNode</td>
        </tr>
        <tr>
            <td>SecondaryNameNode</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>NodeManager</td>
            <td>ResourceManager</td>
            <td>NodeManager</td>
            <td>NodeManager</td>
        </tr>
        <tr>
            <td></td>
            <td>JobHistoryServer</td>
            <td></td>
            <td></td>
        </tr>
        <tr class="top-border">
            <td>Worker</td>
            <td>Master</td>
            <td>Worker</td>
            <td>Worker</td>
        </tr>
        <tr>
            <td></td>
            <td>HistoryServer</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

> 지금부터 별다른 언급 없이 나오는 모든 코드들은 서버 4개에서 모두 실행해야 하는 코드이다.
{:.info}

> 언급이 있기 전까진, 지난 [Hadoop 설치하기](/hadoop/hadoop-installation) 문서에서 만든 hadoop 계정이 아닌, sudo를 사용할 수 있는 계정에서 진행해야 한다.
{:.info}

# Spark 다운로드하기

Spark는 설치되어 있는 Hadoop 버전과 호환되는 버전을 설치해야 한다. 지난 [Hadoop 설치하기](/hadoop/hadoop-installation) 문서에서 설치한 Hadoop 버전은 3.3.3이므로, 이와 호환되는 버전을 다운받아야 한다.

{:.code-header}
Spark 다운로드

{% highlight bash %}
wget https://dlcdn.apache.org/spark/spark-3.3.0/spark-3.3.0-bin-hadoop3.tgz
{% endhighlight %}

# Spark 설치하기

`/usr/local` 디렉토리 밑에 Spark를 설치한다.

{:.code-header}
Spark 설치

{% highlight bash %}
tar -xzf spark-3.3.0-bin-hadoop3.tgz
sudo mv spark-3.3.0-bin-hadoop3 /usr/local
sudo ln -s /usr/local/spark-3.3.0-bin-hadoop3 /usr/local/spark
rm spark-3.3.0-bin-hadoop3.tgz
{% endhighlight %}

설치한 Spark 디렉토리의 권한을 hadoop 계정으로 변경한다.

{:.code-header}
Spark 권한 수정

{% highlight bash %}
sudo chown -R hadoop:hadoop /usr/local/spark-3.3.0-bin-hadoop3
sudo chown -h hadoop:hadoop /usr/local/spark
{% endhighlight %}

이제부터 모든 작업은 hadoop 계정에서 진행한다.

{:.code-header}
계정 전환

{% highlight bash %}
su hadoop
{% endhighlight %}

# 환경변수 추가하기

`~/.bashrc` 파일을 수정해 환경변수를 추가한다.

{:.code-header}
환경변수 추가

{% highlight bash %}
echo 'export SPARK_HOME=/usr/local/spark' >> ~/.bashrc
echo 'export PATH=$SPARK_HOME/bin:$SPARK_HOME/sbin:$PATH' >> ~/.bashrc

source ~/.bashrc
{% endhighlight %}

# Spark 환경설정하기

`$SPARK_HOME/conf` 디렉토리 밑의 다음 파일들을 수정해 Spark 환경설정을 진행한다.

{:.code-header}
$SPARK_HOME/conf/workers

{% highlight text %}
dl13
dl15
dl16
{% endhighlight %}

{:.code-header}
$SPARK_HOME/conf/spark-env.sh

{% highlight text %}
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export SPARK_MASTER_HOST=dl14
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
{% endhighlight %}

{:.code-header}
$SPARK_HOME/conf/spark-defaults.conf

{% highlight text %}
spark.master yarn
spark.eventLog.enabled true
spark.eventLog.dir file:///usr/local/spark/eventLog
spark.history.fs.logDirectory file:///usr/local/spark/eventLog
{% endhighlight %}

# Spark 이벤트로그 저장용 디렉토리 만들기

{:.code-header}
이벤트로그 디렉토리 만들기

{% highlight bash %}
mkdir -p $SPARK_HOME/eventLog
{% endhighlight %}

> 만약 이벤트로그가 저장되는 위치를 바꾸고 싶다면, `$SPARK_HOME/conf/spark-defaults.conf`에서 `spark.eventLog.dir` 및 `spark.history.fs.logDirectory` 항목을 수정하면 된다.
{:.info}

# PySpark 설치하기

PySpark는 `pip` 명령어를 통해 간단하게 설치할 수 있다.

{:.code-header}
PySpark 설치

{% highlight bash %}
pip install findspark pyspark
{% endhighlight %}

# Spark 실행하기

우선 네임노드에서 다음 명령어를 실행해 Hadoop을 실행한다.

{:.code-header}
Hadoop 실행(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh
$HADOOP_HOME/bin/mapred --daemon start historyserver
{% endhighlight %}

이후 마스터노드에서 다음 명령어를 실행해 Spark를 실행한다.

{:.code-header}
Spark 실행(마스터노드에서만 실행)

{% highlight bash %}
$SPARK_HOME/sbin/start-all.sh
$SPARK_HOME/sbin/start-history-server.sh
{% endhighlight %}

# 테스팅하기

Spark가 정상적으로 실행중인지 확인해보자.

## jps

현재 실행 중인 jvm 프로세스 목록을 보여주는 `jps` 명령어를 이용하면 현재 클러스터에 어떤 Hadoop/Spark 프로세스가 올라와 있는지 확인할 수 있다.

{% highlight bash %}
$JAVA_HOME/bin/jps
{% endhighlight %}

{:.code-result}
{% highlight text %}
# dl14
395557 NameNode
396322 JobHistoryServer
396659 Jps
395964 ResourceManager
396572 HistoryServer
396443 Master

# dl13
84257 Worker
83782 SecondaryNameNode
83590 DataNode
84374 Jps
83960 NodeManager

# dl15
108225 Jps
107826 NodeManager
107622 DataNode
108118 Worker

# dl16
219824 DataNode
220329 Worker
220031 NodeManager
220444 Jps
{% endhighlight %}

## 웹 서버

다음 url로 접속하면 현재 Spark의 실행 상태를 확인할 수 있다.

- Spark Context : [http://dl14:4040](http://dl14:4040)
- Spark Master : [http://dl14:8080/](http://dl14:8080/)
- Spark Worker : [http://dl13:8081/](http://dl13:8081/), [http://dl15:8081/](http://dl15:8081/), [http://dl16:8081/](http://dl16:8081/)
- Spark History Server : [http://dl14:18080/](http://dl14:18080/)

## 예제 : WordCount

지난 [Hadoop 설치하기](/hadoop/hadoop-installation) 문서에서 실습용으로 다운받았던 Gutenberg 프로젝트의 성경(pg10.txt) 문서를 이용해 간단한 예제를 수행해보자.

만약 파일이 존재하지 않는다면 터미널에서 다음 코드를 실행해 다운로드 받을 수 있다.

{:.code-header}
pg10.txt 다운로드, hdfs 업로드

{% highlight bash %}
wget https://www.gutenberg.org/cache/epub/10/pg10.txt
hdfs dfs -mkdir -p /user/hadoop
hdfs dfs -put pg10.txt /user/hadoop/pg10.txt
{% endhighlight %}

이제 Jupyter Notebook 또는 Jupyter Lab을 실행하고, 다음 코드를 실행해 보자.

> 아까 전 PySpark를 설치했던 파이썬 인터프리터에서 Jupyter Notebook/Lab을 실행해야 한다.
{:.warning}

> 마스터 노드와 워커 노드가 사용하는 파이썬 인터프리터 경로는 동일해야 한다. 즉 만약 파이썬 가상환경 등을 만들어 사용하고 싶다면, 모든 마스터 노드와 워커 노드가 동일한 이름의 가상환경을 만들어야 한다. 동일하게, 특정 패키지를 사용하고 싶다면 마스터 노드와 워커 노드의 파이썬에는 모두 해당 패키지가 설치되어 있어야 한다.
{:.warning}

{% highlight python %}
import findspark
from pyspark.sql import SparkSession

findspark.init()
spark = SparkSession.builder.master("yarn").appName("test1").getOrCreate()
sc = spark.sparkContext
{% endhighlight %}

{% highlight python %}
text_file = sc.textFile("pg10.txt")

counts = text_file.flatMap(lambda line: line.split(" ")) \
             .map(lambda word: (word, 1)) \
             .reduceByKey(lambda a, b: a + b)\
             .map(lambda x: (x[1], x[0])) \
             .sortByKey(False)

counts.saveAsTextFile("spark-wordcount-output")
{% endhighlight %}

> 참고로 위 명령어는 파일을 읽어들여서, 각 단어를 분리한 후(띄어쓰기 단위), 각 단어의 등장 빈도를 세고, 이를 내림차순으로 정렬해 저장하는 코드이다.
{:.info}

실행이 완료되면 hdfs의 `/user/hadoop/spark-wordcount-output` 디렉토리에서 그 결과를 볼 수 있다.

{:.code-header}
실행 결과 확인

{% highlight bash %}
# spark-wordcount-output 디렉토리 탐색
hdfs dfs -ls /user/hadoop/spark-wordcount-output 

# wordcount 결과 파일 확인
hdfs dfs -cat /user/hadoop/spark-wordcount-output/part-00000
hdfs dfs -cat /user/hadoop/spark-wordcount-output/part-00001

# 결과 파일 (로컬로) 다운로드
hdfs dfs -get /user/hadoop/spark-wordcount-output/part-00000
hdfs dfs -get /user/hadoop/spark-wordcount-output/part-00001
{% endhighlight %}

위 명령어들이 아무 문제 없이 수행되었다면 Spark가 성공적으로 잘 설치되었다는 것이다.

# Spark 종료하기

마스터노드에서 다음 명령어를 실행해 Spark를 종료한다.

{:.code-header}
Spark 종료(마스터노드에서만 실행)

{% highlight bash %}
$SPARK_HOME/sbin/stop-all.sh
$SPARK_HOME/sbin/stop-history-server.sh
{% endhighlight %}

만약 Hadoop도 종료하고 싶다면 네임노드에서 다음 명령어를 입력한다.

{:.code-header}
Hadoop 종료(네임노드에서만 실행)

{% highlight bash %}
$HADOOP_HOME/sbin/stop-dfs.sh
$HADOOP_HOME/sbin/stop-yarn.sh
$HADOOP_HOME/bin/mapred --daemon stop historyserver
{% endhighlight %}