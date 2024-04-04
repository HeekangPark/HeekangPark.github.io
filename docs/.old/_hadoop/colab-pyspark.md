---
title: "Colab에서 PySpark 사용하기"
date_created: "2021-09-29"
date_modified: "2021-10-09"
---

다음과 같이 하면 Colab에서 PySpark를 사용할 수 있다.

# OpenJDK 8 설치

{% highlight python %}
!apt-get install openjdk-8-jdk-headless -qq > /dev/null

import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
{% endhighlight %}


# Hadoop 2.7, Spark 3.1.2, pyspark 설치

{% highlight python %}
!wget -q https://dlcdn.apache.org/spark/spark-3.1.2/spark-3.1.2-bin-hadoop2.7.tgz
!tar -xf spark-3.1.2-bin-hadoop2.7.tgz
!rm spark-3.1.2-bin-hadoop2.7.tgz

import os
os.environ["SPARK_HOME"] = "/content/spark-3.1.2-bin-hadoop2.7"

!pip install -q findspark

import findspark
findspark.init()
{% endhighlight %}


# spark 세션 만들기

{% highlight python %}
from pyspark.sql import SparkSession

spark = SparkSession.builder\
        .master("local")\
        .appName("Colab")\
        .config('spark.ui.port', '4050')\
        .getOrCreate()
{% endhighlight %}



