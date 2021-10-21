---
title: "Eigenvector, Eigenvalue"
date_created: "2021-10-20"
date_modified: "2021-10-22"
---

# eigenvector, eigenvalue

<ul>

<li><div markdown="block">

$n \times n$ 행렬 $A$에 대해, 선형연립방정식 

$$A \mathbf{x} = \lambda \mathbf{x}$$

이 [nontrivial solution](/linear_algebra/linear-system)을 갖게 만드는 스칼라 $\lambda \in \mathbb{R}$를 $A$의 **eigenvalue**라 한다. 그리고 그 때의 nontrivial solution $\mathbf{x}$를 $\lambda$에 대한 $A$의 **eigenvector**(eigenvector of $A$ corresponding to $\lambda$)라 한다. 

</div></li>

<li><div markdown="block">

[선형변환](/linear_algebra/linear-transformation) $\mathbf{x} \mapsto A\mathbf{x}$에 대해, eigenvector는 변환해도 그 크기만 $\lambda$배 변할 뿐($\lambda \mathbf{x}$) 방향은 전혀 바뀌지 않는 특수한 벡터들을 의미한다. eigenvector, eigenvalue라는 이름은 여기서 나왔다(독일어로 "eigen"은 "고유한", "특징적인"이라는 뜻이다).

</div></li>

<li><div markdown="block">

$\lambda$가 정사각행렬 행렬 $A$의 eigenvalue라면, 식

$$(A - \lambda I)\mathbf{x} = \mathbf{0}$$

은 항상 nontrivial solution을 가진다. 역으로, 위 식이 nontrivial solution을 가진다면, $\lambda$는 행렬 $A$의 eigenvalue이다.

즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $\lambda$는 $A$의 eigenvalue이다.
- 식 $(A - \lambda I)\mathbf{x} = \mathbf{0}$은 nontrivial solution을 가진다.

이 성질을 이용하면 주어진 $\lambda$가 eigenvalue가 맞는지를 검증할 수 있다. 만약 주어진 $\lambda$에 대해 식 $(A - \lambda I)\mathbf{x} = \mathbf{0}$가 nontrivial solution을 가진다면, $\lambda$는 eigenvalue가 맞다.

</div></li>

<li><div markdown="block">

정사각행렬 $A$의 eigenvalue $\lambda$에 대해, 식

$$(A - \lambda I)\mathbf{x} = \mathbf{0}$$

의 해들의 집합을 $\lambda$에 대한 $A$의 **eigenspace**(eigenspace of $A$ corresponding to $\lambda$)라 한다.

즉, $\lambda$에 대한 $A$의 eigenspace는 행렬 $(A - \lambda I)$의 [null space](/linear_algebra/vector-space)이다.

</div></li>

<li><div markdown="block">

정사각행렬 $A$의 서로 다른(distinct) eigenvalue $\lambda\_1,\,\lambda\_2,\,\cdots,\,\lambda\_r$와, 이에 상응하는 eigenvector $\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_r$에 대해(즉, $A \mathbf{v}\_i = \lambda\_i \mathbf{v}\_i$), eigenvector들의 집합 $\\{\,\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_r\,\\}$은 [linearly independent](/linear_algebra/linear-combination)하다.

</div></li>

</ul>

# eigenvalue, eigenvector 구하기

<ul>

<li><div markdown="block">

[triangular matrix](/linear_algebra/vector-matrix)의 eigenvalue는 대각선의 성분들이다.

</div></li>

<li><div markdown="block">

0을 eigenvalue로 갖는 정사각행렬은 [역행렬](/linear_algebra/inverse)이 존재하지 않는다(not invertible). 역으로, 역행렬이 존재하지 않는 정사각행렬은 항상 0을 eigenvalue로 갖는다.

즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- eigenvalue로 0을 갖는다.
- $A$의 역행렬이 존재하지 않는다.

</div></li>

<li><div markdown="block">

**characteristic equation**

정사각행렬 $A$에 대해, 스칼라 $\lambda \in \mathbb{R}$가 다음 식을 만족시키면 $\lambda$는 $A$의 eigenvalue이다.

$$\text{det}(A-\lambda I) = 0$$

위 식을 **characteristic equation**라 한다. 역으로, $\lambda$가 $A$의 eigenvalue이면 characteristic equation은 항상 성립한다.

즉, 정사각행렬 $A$와 스칼라 $\lambda$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $\text{det}(A-\lambda I) = 0$ (characteristic equation)
- $\lambda$는 $A$의 eigenvalue이다.

이때 $n \times n$ 정사각행렬 $A$에 대해 식 $\text{det}(A-\lambda I) = 0$은 $\lambda$에 대한 $n$차 다항식이 되므로, characteristic equation을 **characteristic polynomial**이라고도 부른다.

이 성질을 이용하면 주어진 행렬 $A$의 eigenvalue를 구할 수 있다. $\text{det}(A-\lambda I) = 0$의 해 $\lambda$는 $A$의 eigenvalue가 된다.

</div></li>

</ul>

# diagonalization

<ul>

<li><div markdown="block">

$n\times n$ 행렬 $A$와 $B$에 대해, 역행렬이 존재하는 적당한 $n \times n$ 행렬 $P$가 있어 다음이 성립한다면,

$$A = PBP^{-1}$$

$A$는 $B$와 **similar**하다($A$ is similar to $B$)고 한다. 이때 $Q = P^{-1}$이라 하면

$$B = (P^{-1})A(P^{-1})^{-1} = QAQ^{-1}$$

가 되므로, $A$가 $B$와 similar하면 $B$도 $A$와 similar하다. 따라서 이를 그냥 $A$와 $B$는 similar하다($A$ and $B$ are similar)고 한다.

</div></li>

<li><div markdown="block">

$n\times n$ 행렬 $A$와 $B$가 similar하다면, 두 행렬은 같은 characteristic equation을 가진다. 다시말해, 두 행렬은 같은 eigenvalue를 가진다.

단 역은 성립하지 않는다. 즉 두 행렬이 같은 characteristic equation을 가져도 similar하지 않을 수 있다.

</div></li>

<li><div markdown="block">

참고로 similar하다는 것과 [row equivalent](/linear_algebra/echelon-form)하다는 것은 전혀 관계없는 이야기이다. 일반적으로 elementary row operation은 행렬의 eigenvalue를 바꾼다.

</div></li>

<li><div markdown="block">

$n \times n$ 정사각행렬 $A$와 $n \times n$ [대각 행렬](/linear_algebra/vector-matrix) $D$가 similar한 경우, 행렬 $A$는 **diagonalizable**하다고 한다. 다시말해, diagonalizable한 $n \times n$ 정사각행렬 $A$는 적당한 $n \times n$ 대각 행렬 $D$와 역행렬이 존재하는 $n \times n$ 행렬 $P$를 이용해 다음과 같이 나타낼 수 있다.

$$A = PDP^{-1}$$

</div></li>

<li><div markdown="block">

$n \times n$ 정사각행렬 $A$는 $n$개의 linearly independent한 eigenvector를 가질 때만 diagonalizable하다. 역으로, diagonalizable한 정사각행렬 $A$는 $n$개의 eigenvector를 가진다.

즉, $n \times n$ 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$는 diagonalizable하다.
- $A$는 $n$개의 linearly independent한 eigenvector를 가진다.
- $A$의 eigenvector들의 집합은 $\mathbb{R}^n$의 basis가 된다.

참고로 이렇게 행렬의 eigenvector들로 만들어지는 $\mathbb{R}^n$의 basis를 **eigenvector basis**라 한다.

</div></li>

<li><div markdown="block">

diagonalizable한 행렬 $A = PDP^{-1}$에서, $P$의 각 열들은 $A$의 eigenvector들이다. 그리고 $D$의 대각 성분들은 $P$의 각 열들을 이루고 있는 $A$의 eigenvector와 상응하는 eigenvalue들이다. 즉, diagonalizable한 행렬 $A$의 eigenvalue $\lambda\_1,\,\lambda\_2,\,\cdots,\,\lambda\_n$과 이에 상응하는 eigenvector $\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_n$에 대해(즉, $A \mathbf{v}\_i = \lambda\_i \mathbf{v}\_i$), 다음과 같이 된다.

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}

A = PDP^{-1} = \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{v_1} & \mathbf{v_2} & \cdots & \mathbf{v_n}\\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix} \begin{bmatrix}
\lambda_1 & 0 & \cdots & 0\\[0.5em]
0 & \lambda_2 & \cdots & 0\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
0 & 0 & \cdots & \lambda_n\\[0.5em]
\end{bmatrix} \left( \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{v_1} & \mathbf{v_2} & \cdots & \mathbf{v_n}\\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix} \right)^{-1}$$

</div></li>

<li><div markdown="block">

diagonalizable한 행렬 $A$의 거듭제곱 $A^k$는 다음과 같이 쉽게 구할 수 있다.

$$A^k = (PDP^{-1})^n = PD^k P^{-1}$$

참고로 대각 행렬 $D$의 거듭제곱 $D^k$은 다음과 같이 대각 성분의 $k$제곱으로 쉽게 구할 수 있다.

$$D^k = \begin{bmatrix}
\lambda_1 & 0 & \cdots & 0\\[0.5em]
0 & \lambda_2 & \cdots & 0\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
0 & 0 & \cdots & \lambda_n\\[0.5em]
\end{bmatrix}^k = \begin{bmatrix}
\lambda_1^k & 0 & \cdots & 0\\[0.5em]
0 & \lambda_2^k & \cdots & 0\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
0 & 0 & \cdots & \lambda_n^k\\[0.5em]
\end{bmatrix}$$

</div></li>

</ul>