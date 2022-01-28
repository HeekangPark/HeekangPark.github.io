---
title: "[PyTorch] 두 텐서 간 교집합(Intersection) 구하기"
tags: ["pytorch"]
date_created: "2020-08-21"
date_modified: "2022-01-28"
---

다음과 같이 1차원 텐서 `a`, `b`가 주어졌다고 해 보자.

{% highlight python %}
import torch

a = torch.LongTensor([1, 2, 3])
b = torch.LongTensor([2, 3, 1, 5])
{% endhighlight %}

두 텐서 간 공통된 원소를 추출하려면(교집합) 어떻게 하면 될까?

# Method 1 : NumPy의 np.intersect1d() 메소드 이용

NumPy에서 제공하는 `np.intersect1d()` 메소드를 이용할 수 있다.

{% highlight python linenos %}
import torch
import numpy as np

def getIntersection_Method1(a, b):
    a = a.detach().cpu().numpy()
    b = b.detach().cpu().numpy()
    
    intersection = np.intersect1d(a, b)
    return torch.from_numpy(intersection)
{% endhighlight %}

- line 5, 6 : 전달받은 텐서 `a`, `b`를 `ndarray` NumPy 객체로 만든다.
- line 8 : `np.intersect1d()` 메소드를 이용해 교집합을 구한다.

이 방법의 단점은 다음과 같다.

- NumPy 라이브러리를 import해야 한다.
- 텐서를 CPU로 옮겨와야 한다. CUDA에서 작업 불가. 느리다.[^1]

# Method 2 : PyTorch만으로 구현

NumPy를 사용하지 않고 PyTorch와 순수 파이썬 문법만을 이용해 다음과 같이 구현할 수도 있다.

{% highlight python linenos %}
import torch

def getIntersection_Method2(a, b):
    indices = torch.zeros_like(a, dtype=torch.uint8)

    for elem in b:
        indices = indices | (a == elem).type(torch.uint8)

    intersection = a[indices.type(torch.bool)]
    return intersection
{% endhighlight %}

- line 4 : `a`와 같은 크기의 0으로 초기화된 1차원 텐서 `indices`를 선언한다.
- line 6~7 : 만약 `a[i]`가 `b`의 원소라면 `indices[i]`는 True(1)로 설정하고, 아니라면 False(0)으로 설정한다.
- line 9 : `indices[i] == True(1)`인 `i` 인덱스의 `a` 원소만 모아 `intersection` 텐서를 만든다.

이 방법의 단점은 다음과 같다.

- 파이썬의 반복문을 이용해 직접 모든 원소를 일일이 비교하는 방식이다 보니 느리다.[^1]
- 중복된 원소를 제거하지 않는다.(`np.intersect1d()`는 중복 원소를 자동으로 제거해준다.)

[^1]: 텐서를 CPU로 옮겨와야 하는 Method 1과 파이썬 for문을 일일이 다 돌아야 하는 Method 2 중 어느 방법이 더 느릴지는 시스템 환경과 텐서의 크기 등에 따라 그때그때 다르다.

{% highlight python linenos %}
import torch
import numpy as np

a = torch.LongTensor([1, 2, 3, 1])  # 원소 1이 중복된다.
b = torch.LongTensor([2, 3, 1, 5])

print(getIntersection_Method1(a, b))  # tensor([1, 2, 3])  <- 중복 원소 1이 제거되어 1이 하나만 나온다.
print(getIntersection_Method2(a, b))  # tensor([1, 2, 3, 1])  <- 중복 원소 1이 제거되지 않아 1이 두 개 나온다.
{% endhighlight %}