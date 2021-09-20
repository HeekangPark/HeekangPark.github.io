---
title: "Symmetric Matrix"
date_created: "2021-09-15"
date_modified: "2021-09-17"
---

<ul class="no-guide-line">

<li><div markdown="block">

$A = A^\intercal$인 행렬 $A$를 **symmetric**하다고 한다.

$A = -A^\intercal$인 행렬 $A$를 **anti-symmetric**하다고 한다.

</div></li>

<li><div markdown="block">

모든 $n \times n$ symmetric matrix들의 집합을 $\mathbb{S}^n$이라 표기한다.

</div></li>

<li><div markdown="block">

임의의 정사각행렬 $A \in \mathbb{R}^{n \times n}$가 있을 때,

{:.no-guide-line}
- $A + A^\intercal$은 항상 symmetric하다.
- $A - A^\intercal$은 항상 anti-symmetric하다.

다시 말해, 임의의 정사각행렬은 항상 symmetric한 행렬과 anti-symmetric한 행렬의 합으로 분해할 수 있다.

$$A = \frac{1}{2} (A + A^\intercal) + \frac{1}{2} (A - A^\intercal)$$

</div></li>

</ul>