---
title: "[scikit-learn] pip install sklearn vs. scikit-learn"
date_created: "2022-05-24"
date_modified: "2022-05-24"
---

사이킷런은 다음과 같이 pip을 이용해 간단하게 설치할 수 있다.

{:.code-header}
사이킷런 설치

{% highlight bash %}
pip install scikit-learn
{% endhighlight %}

그런데 다음 명령어로도 사이킷런을 설치할 수 있다.

{:.code-header}
사이킷런 설치 2 (추천하지 않음!)

{% highlight bash %}
pip install sklearn
{% endhighlight %}

두 방법의 차이는 무엇일까?

# pip install sklearn vs. scikit-learn

결론부터 말하자면, `pip install scikit-learn`과 `pip install sklearn` **둘 중 어느 방법으로 해도 동일한 버전의 사이킷런이 설치된다**.

그런데 사실 두 명령어는 같은 명령어가 아니다. `pip install scikit-learn`은 사이킷런 패키지를 설치하라는 명령어지만, `pip install sklearn`은 "sklearn"라는 이름의 패키지를 설치하라는 명령어이다. "sklearn" 패키지는 사이킷런 패키지에 의존성이 있는, 버전 0.0의 아무 의미 없는 더미 패키지이다. 그래서 `pip install sklearn`를 수행하면 pip이 의존 패키지들을 설치해 주는 과정에서 (`pip install scikit-learn`으로 했을 때와 동일한) 사이킷런 패키지가 설치되게 되는 것이다. 실제로 `pip install sklearn` 후 `pip list`를 찍어보면 버전 0.0의 sklearn 더미 패키지가 설치되어 있는 것을 볼 수 있다.

{% highlight bash %}
pip install sklearn
pip list
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
Package              Version
-------------------- -----------
...(전략)...
scikit-learn         1.1.1
...(중략)...
sklearn              0.0
...(후략)...
{% endhighlight %}

그러나 `pip install sklearn`으로 설치된 사이킷런은 의존성을 통한 설치이기에, `pip uninstall sklearn`을 수행하면 "sklearn" 더미 패키지만 삭제되고 사이킷런 패키지는 삭제되지 않는 문제가 발생한다. 물론 직접 `pip uninstall scikit-learn`을 수행하면 삭제할 수 있다...만 아무래도 번거롭다.

따라서 둘 중 `pip install scikit-learn` 방식의 설치를 더 추천한다.

# 여담

`scikit-learn` 패키지를 설치했더라도 사용할 땐 `sklearn`이라는 이름으로 import해야 한다는 점에 유의하자.

{:.code-header}
사이킷런 사용하기

{% highlight python linenos %}
import sklearn
{% endhighlight %}

