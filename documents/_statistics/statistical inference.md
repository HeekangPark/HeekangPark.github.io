---
title: "통계적 추정(statistical inference)"
date_created: "2021-10-24"
date_modified: "2021-10-24"
---

# 통계적 추정(statistical inference)

우리가 알고싶은 값은 모집단(population)의 통계값(평균, 표준편차 등)이다. 참고로 모집단의 통계값을 모수(parameter)라 한다.

하지만 모집단을 전수조사하면 시간, 비용 등이 너무 많이 발생한다.

따라서 표본(sample)을 추출해, 표본의 통계값을 바탕으로 모수를 추정한다.

이를 통계적 추정(statistical inference)이라 한다.

## 점 추정(point estimate) vs. 구간 추정(interval estimate)

통계적 추정에는 두 가지 종류가 있다.

하나는 점 추정(point estimate)으로, 표본의 통계값을 이용해 모수를 하나의 값으로 추정하는 것이다.

예를 들어, 표본조사 후 A 후보의 당선 확률을 40%라 말하는 것은 점 추정이다.

다른 하나는 구간 추정(interval estimate)으로, 표본의 통계값을 이용해 모수가 어느 범위 안에 있다고 추정하는 것이다.

예를 들어, 표본조사 후 A 후보의 당선 확률을 37 ~ 43%라 말하는 것은 구간 추정이다.

이때 구간 추정으로 제시되는 구간을 신뢰구간(confidence interval)이라 한다.

# 중심극한정리(central limit theory, clt)

모집단에서 크기 $n$짜리 표본을 $k$번 추출한다.

그리고 $n$개의 값에 대한 표본의 평균을 구한다.

그러면 총 $k$개의 표본 평균(sample mean) $\bar{x}$을 얻을 수 있다.

이때, 표본 평균은 평균이 $\mu$이고 표준편차가 $\frac{\sigma}{\sqrt{n}}$인 정규분포를 따른다.

$$\bar {x} \sim N(\mu,\,\frac{\sigma}{\sqrt{n}})$$

이를 중심극한정리(central limit theory, clt)라 한다.

clt는 통계적 추정의 근간이 되는 정리이다.

clt는 모집단의 분포가 어떤 분포이든 상관없이, 표본 평균의 분포는 정규분포라는 것을 말하고 있다.

표본의 크기 $n$이 클수록 표본 평균들의 표준 편차 $\frac{\sigma}{\sqrt{n}}$은 작아진다. 다시말해, 표본의 크기가 클수록 표본 평균들이 들쭉날쭉해지지 않고 비슷해진다(표본 평균들의 편차가 줄어든다).

## 중심극한정리가 성립할 조건

clt는 다음 두 가지 조건이 맞아야 성립한다.

- 독립(independence) : 표본을 만들 때, $n$번의 추출은 독립적이어야 한다. 단순 무작위 추출(simple random sampling)을 수행하면 이 조건을 충족시킬 수 있다.
- 충분히 큰 표본의 크기 $n$ : $n$이 충분히 커야 한다. 구체적으로, 표본비율(sample proportion)이 $p$라 하면, $np \ge 10$, $n(1-p) \ge 10$이면 일반적으로 이 조건을 충족시켰다고 본다.