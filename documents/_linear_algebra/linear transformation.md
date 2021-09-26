---
title: "선형변환 (Linear Transformation)"
date_created: "2021-09-26"
date_modified: "2021-09-27"
---

# 변환(transformation)이란?

<ul class="no-guide-line">

<li><div markdown="block">

집합 $\mathbb{R}^n$에서 집합 $\mathbb{R}^m$으로의 **변환(transformation)** $T$는 $\mathbb{R}^n$ 안의 벡터 $\boldsymbol{x}$를 $\mathbb{R}^m$ 안의 벡터 $T(\boldsymbol{x})$로 배정하는 규칙을 의미한다. 이를 기호로 나타내면 다음과 같다.

$$T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$$

</div></li>

<li><div markdown="block">

변환은 **함수(function)**, **mapping** 등으로도 불린다.

</div></li>

<li><div markdown="block">

집합 $\mathbb{R}^n$은 **정의역(domain)**이라 부른다. 집합 $\mathbb{R}^m$은 변환 $T$의 **공역(codomain)**이라 부른다.

</div></li>

<li><div markdown="block">

정의역 $\mathbb{R}^n$ 안의 벡터 $\boldsymbol{x}$에 대해, 공역 $\mathbb{R}^m$ 안의 벡터 $T(\boldsymbol{x})$를 (변환 $T$에 의한) $\boldsymbol{x}$의 **상(image)**이라 부른다. 이를 기호로 다음과 같이 쓴다.

$$\boldsymbol{x} \mapsto T(\boldsymbol{x}) $$

</div></li>

<li><div markdown="block">

모든 상 $T(\boldsymbol{x})$들의 집합을 **치역(range)**이라 부른다.

</div></li>

<li><div markdown="block">

변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$에 대해, 만약 모든 $\boldsymbol{b} \in \mathbb{R}^m$가 최소 하나 이상의 $\boldsymbol{x} \in \mathbb{R}^n$의 상이면, 변환 $T$는 $\mathbb{R}^n$을 $\mathbb{R}^m$ 위로 보낸다고 한다($T$ maps $\mathbb{R}^n$ **onto** $\mathbb{R}^m$).

다시 말해, 치역과 공역이 같으면, 변환 $T$는 $\mathbb{R}^n$을 $\mathbb{R}^m$ 위로 보낸다.

(화살을 쐈는데, 과녘이 다 덮히면 onto이다.)

</div></li>

<li><div markdown="block">

변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$에 대해, 만약 $\boldsymbol{b} \in \mathbb{R}^m$가 최대 하나 이하의 $\boldsymbol{x} \in \mathbb{R}^n$의 상이면, 변환 $T$는 one-to-one하다고 한다($T$ is **one-to-one**).

다시 말해, 서로 다른 어떠한 정의역 안의 두 벡터 $\boldsymbol{x}\_1$, $\boldsymbol{x}\_2$에 대해서도 $T(\boldsymbol{x}\_1) \neq T(\boldsymbol{x}\_2)$이면, 변환 $T$는 one-to-one하다.

(화살을 쐈는데, 어떠한 화살도 같은 곳을 찍지 않으면 one-to-one이다.)

</div></li>

</ul>

# 선형변환(linear transformation)이란?

<ul class="no-guide-line">

<li><div markdown="block">

만약 변환 $T$가 정의역의 모든 원소 $\boldsymbol{u}$, $\boldsymbol{v}$, 모든 스칼라 $c$에 대해 다음이 성립한다면, 이 변환을 **선형변환(linear transformation)**이라 한다.

{:.mathjax-mb-0}
$$T(\boldsymbol{u} + \boldsymbol{v}) = T(\boldsymbol{u}) + T(\boldsymbol{v})$$

{:.mathjax-mt-0}
$$T(c\boldsymbol{u}) = cT(\boldsymbol{u})$$

</div></li>

<li><div markdown="block">

선형변환 $T$는 다음과 같은 성질이 있다.

{:.no-guide-line}
- $T(\boldsymbol{0}) = \boldsymbol{0}$
- $T(c\_1 \boldsymbol{v}\_1 + c\_2 \boldsymbol{v}\_2 + \cdots + c\_p \boldsymbol{v}\_p) = c\_1 T(\boldsymbol{v}\_1 ) + c\_2 T(\boldsymbol{v}\_2 ) + \cdots + c\_p T(\boldsymbol{v}\_p )$

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$에 대해, 모든 $\boldsymbol{x} \in \mathbb{R}^n$에서 다음을 만족시키는 유일한 행렬 $A$가 반드시 존재한다.

$$T(\boldsymbol{x}) = A \boldsymbol{x}$$

이 행렬 $A$를 선형변환 $T$의 **standard matrix**라 한다.

이때 $A$는 $j$번째 열이 $T(\boldsymbol{e}\_j)$인 $m \times n$ 행렬이다(단, $\boldsymbol{e}\_j$는 단위행렬 $I\_n$의 $j$번째 열을 의미한다).

$$A = [\,T(\boldsymbol{e}_1) \quad T(\boldsymbol{e}_2) \quad \cdots \quad T(\boldsymbol{e}_n) \,]$$

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$와 그 standard matrix $A$에 대해, 만약 식 $A \boldsymbol{x} = \boldsymbol{0}$의 해가 오직 trivial solution밖에 없으면 이 선형변환은 one-to-one이다.

역으로, 만약 이 선형변환이 one-to-one이면 식 $A \boldsymbol{x} = \boldsymbol{0}$의 해는 오직 trivial solution밖에 없다.

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$와 그 standard matrix $A$에 대해, 만약 $A$의 각 열이 $\mathbb{R}^m$을 span하면, $T$는 $\mathbb{R}^n$을 $\mathbb{R}^m$ 위로 보낸다(onto).

역으로, 만약 $T$가 $\mathbb{R}^n$을 $\mathbb{R}^m$ 위로 보낸다면, $A$의 각 열이 $\mathbb{R}^m$을 span한다.

($T$ maps $\mathbb{R}^n$ onto $\mathbb{R}^m$ if and only if the columns of $A$ spans $\mathbb{R}^m$.)

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$와 그 standard matrix $A$에 대해, 만약 $A$의 각 열이 linearly independent하면, $T$는 one-to-one이다.

역으로, 만약 $T$가 one-to-one이면, $A$의 각 열은 linearly independent하다.

($T$ is one-to-one if and only if the columns of $A$ are linearly independent.)

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^n$에 대해, 정의역 안의 모든 원소 $\boldsymbol{x}$에서 다음을 만족시키는 선형변환 $S\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^n$가 존재하면

{:.mathjax-mb-0}
$$S(T(\boldsymbol{x})) = \boldsymbol{x}$$

{:.mathjax-mt-0}
$$T(S(\boldsymbol{x})) = \boldsymbol{x}$$

$T$의 **역변환이 존재한다(invertible)**고 한다.

이때 $S$를 $T$의 **역변환(inverse)**이라 하고 기호로 다음과 같이 나타낸다.

$$S = T^{-1}$$

</div></li>

<li><div markdown="block">

선형변환 $T\,:\,\mathbb{R}^n \rightarrow \mathbb{R}^m$와 그 standard matrix $A$에 대해, 만약 $T$의 역변환이 존재한다면 $A$의 역행렬이 존재한다. 역으로, $A$의 역행렬이 존재하면 $T$의 역변환이 존재한다.

이때, $T^{-1}$의 standard matrix는 $A^{-1}$이 된다.

</div></li>

<li><div markdown="block">

2차원 상에서의 유명한 선형변환들의 standard matrix

{:.no-guide-line}
- 대칭(reflection)
  - $x$축 대칭 : $\displaystyle \begin{bmatrix}1 & 0\\\\0 & -1\end{bmatrix}$
  - $y$축 대칭 : $\displaystyle \begin{bmatrix}-1 & 0\\\\0 & 1\end{bmatrix}$
  - $y = x$ 대칭 : $\displaystyle \begin{bmatrix}0 & 1\\\\1 & 0\end{bmatrix}$
  - $y = -x$ 대칭 : $\displaystyle \begin{bmatrix}0 & -1\\\\-1 & 0\end{bmatrix}$
  - 원점 대칭 : $\displaystyle \begin{bmatrix}-1 & 0\\\\0 & -1\end{bmatrix}$
- 확대(expansion)/축소(contraction)
  - $x$축 방향 $k$배 확대/축소 : $\displaystyle \begin{bmatrix}k & 0\\\\0 & 1\end{bmatrix}$
  - $y$축 방향 $k$배 확대/축소 : $\displaystyle \begin{bmatrix}1 & 0\\\\0 & k\end{bmatrix}$
- 전단(shear)
  - $x$축 방향 $k$배 전단 : $\displaystyle \begin{bmatrix}1 & k\\\\0 & 1\end{bmatrix}$
  - $y$축 방향 $k$배 전단 : $\displaystyle \begin{bmatrix}1 & 0\\\\k & 1\end{bmatrix}$
- 사영(projection)
  - $x$축으로의 사영 : $\displaystyle \begin{bmatrix}1 & 0\\\\0 & 0\end{bmatrix}$
  - $y$축으로의 사영 : $\displaystyle \begin{bmatrix}0 & 0\\\\0 & 1\end{bmatrix}$

</div></li>

</ul>