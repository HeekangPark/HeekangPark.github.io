---
title: "판별식 (Determinant)"
date_created: "2021-10-14"
date_modified: "2021-11-04"
---

# 판별식(determinant)이란?

<ul>

<li><div markdown="block">

$n \times n$ 행렬 $A$가 주어졌다고 해 보자(단, $n \ge 2$).

$$A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\[0.5em]
a_{21} & a_{22} & \cdots & a_{2n}\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
a_{n1} & a_{n2} & \cdots & a_{nn}\\[0.5em]
\end{bmatrix}$$

이때, $A\_{ij}$를 $A$에서 $i$행과 $j$열을 제거하고 만들어지는 $(n-1) \times (n-1)$ 행렬이라 하자.

그리고 $A$의 **($i$, $j$)-cofactor** $C\_{ij}$를 다음과 같이 정의하자.

$$C_{ij} = (-1)^{i + j} \text{det}\,A_{ij}$$

</div></li>

<li><div markdown="block">

$n \ge 2$일 때, $A$의 **판별식(determinant)** $\text{det}\,A$는 다음과 같이 정의된다.

$$\begin{align}
\text{det}\,A &= a_{i1}\text{det}\,A_{i1} + a_{i2}\text{det}\,A_{i2} + \cdots + a_{in}\text{det}\,A_{in} = \sum_{j = 1} ^n a_{ij} \text{det}\,A_{ij}\\[0.5em]
&= a_{1j}\text{det}\,A_{1j} + a_{2j}\text{det}\,A_{2j} + \cdots + a_{nj}\text{det}\,A_{nj} = \sum_{i = 1} ^n a_{ij} \text{det}\,A_{ij}\\[0.5em]
\end{align}$$

$n = 1$일 때(= 원소가 하나만 있을 때), 행렬 $A = [\,a\_{11}\,]$의 판별식 $\text{det}\,A$은 그 유일한 원소의 값으로 정의된다.

$$\text{det}\,A = a_{11}$$

</div></li>

<li><div markdown="block">

행렬의 판별식은 다음과 같이 절대값 기호를 사용해 나타내기도 한다.

$$\text{det}\,A = \begin{vmatrix}
a_{11} & \cdots & a_{1n}\\[0.5em]
\vdots & \ddots & \vdots\\[0.5em]
a_{n1} & \cdots & a_{nn}\\[0.5em]
\end{vmatrix}$$

</div></li>

</ul>

# 판별식의 성질

정사각행렬 $A$에 대해, 다음이 성립한다.

<ul>

<li><div markdown="block">

만약 행렬 $A$가 [triangular matrix](/linear_algebra/vector-matrix)라면, $\text{det}\,A$는 $A$의 주 대각선(main diagonal)상 성분들의 곱이 된다.

</div></li>

<li><div markdown="block">

만약 행렬 $A$에 [zero 행](/linear_algebra/echelon-form) 또는 [zero 열](/linear_algebra/echelon-form)이 있으면, $\text{det}\,A$는 0이 된다.

</div></li>

<li><div markdown="block">

[elementary row operation](/linear_algebra/echelon-form)에 대해 다음이 성립한다.

- replacement : 행렬 $A$에 replacement 연산을 적용해 행렬 $B$를 얻었다면,
    
  $$\text{det}\,B = \text{det}\,A$$
    
  이다.

- interchange : 행렬 $A$에 interchange 연산을 적용해 행렬 $B$를 얻었다면,
  
  $$\text{det}\,B = -\text{det}\,A$$
  
  이다.

- scaling : 행렬 $A$에 $k$배 scaling 연산을 적용해 행렬 $B$를 얻었다면,
  
  $$\text{det}\,B = k \cdot \text{det}\,A$$
  
  이다.

</div></li>

<li><div markdown="block">

$\text{det}\,A \neq 0$이면 $A$의 역행렬이 존재한다(invertible). 역으로, $A$의 역행렬이 존재하면 $\text{det}\,A \neq 0$이다.

즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$의 역행렬이 존재한다(invertible).
- $\text{det}\,A \neq 0$

</div></li>

<li><div markdown="block">

$\text{det}\,A^T = \text{det}\,A$

</div></li>

<li><div markdown="block">

$n \times n$ 행렬 $A$, $B$에 대해,

$$\text{det}\,AB = (\text{det}\,A)(\text{det}\,B)$$

이다.

</div></li>

</ul>

# Cramer's rule

<ul>

<li><div markdown="block">

$n \times n$ 행렬 $A = [\, \mathbf{a}\_1 \quad \mathbf{a}\_2 \quad \cdots \quad \mathbf{a}\_n \,]$과 벡터 $\mathbf{b} \in \mathbb{R}^n$에 대해, $A$의 $i$번째 열 $\mathbf{a}_i$를 $\mathbf{b}$로 교체한 행렬을 $A\_i (\mathbf{b})$라 하자.

$$A_{i}(\mathbf{b}) = [\,\mathbf{a}_1 \quad \cdots \quad \mathbf{a}_{i-1} \,\,\, \bbox[{{ site.data.mathjax.highlightColor1 }}, {{ site.data.mathjax.highlightPadding }}]{\,\,\mathbf{b}\,\,} \,\,\, \mathbf{a}_{i+1} \quad \cdots \quad \mathbf{a}_n \,]$$

</div></li>

<li><div markdown="block">

역행렬이 존재하는 $n \times n$ 행렬 $A$가 주어졌다고 해 보자. 임의의 벡터 $\mathbf{b} \in \mathbb{R}^n$에 대해, 식 $A \mathbf{x} = \mathbf{b}$는 항상 유일한 해를 가지고, 그 해는 다음과 같다.

$$\mathbf{x} = \begin{bmatrix}
\displaystyle\frac{\text{det}\,A_1 (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\displaystyle\frac{\text{det}\,A_2 (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\vdots\\[0.5em]
\displaystyle\frac{\text{det}\,A_n (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\end{bmatrix}$$

이를 **Crammer's rule**이라 한다.

</div></li>

</ul>