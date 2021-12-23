---
title: "Symmetric Matrix"
date_created: "2021-09-15"
date_modified: "2021-12-24"
---

# symmetric matrix

<ul>

<li><div markdown="block">

$A = A^T$인 정사각행렬 $A$를 **symmetric**하다고 한다.

$A = -A^T$인 정사각행렬 $A$를 **anti-symmetric**하다고 한다.

</div></li>

<li><div markdown="block">

모든 $n \times n$ symmetric matrix들의 집합을 $\mathbf{S}^n$이라 표기한다.

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $A$에 대해, 

$$(A^T A)^T = A^T A^{TT} = A^T A$$

이므로, $A^T A$는 항상 symmetric matrix이다.

</div></li>

<li><div markdown="block">

임의의 정사각행렬 $A \in \mathbb{R}^{n \times n}$가 있을 때,

- $A + A^T$은 항상 symmetric하다.
- $A - A^T$은 항상 anti-symmetric하다.

다시 말해, 임의의 정사각행렬은 항상 symmetric한 행렬과 anti-symmetric한 행렬의 합으로 분해할 수 있다.

$$A = \frac{1}{2} (A + A^T) + \frac{1}{2} (A - A^T)$$

</div></li>

</ul>

# orthogonal diagonalization

<ul>

<li><div markdown="block">

symmetric힌 정사각행렬 $A$의 서로 다른 [eigenvalue](/linear_algebra/eigenvector-eigenvalue)와 상응하는 [eigenvector](/linear_algebra/eigenvector-eigenvalue)들은 서로 [orthogonal](/linear_algebra/orthogonality)하다.

<div class="proof-folder" markdown="block">

symmetric한 정사각행렬 $A$의 서로 다른 eigenvalue $\lambda\_1$, $\lambda\_2$와($\lambda\_1 \neq \lambda\_2$) 이에 각각 상응하는 $\mathbf{v}\_1$, $\mathbf{v}\_2$에 대해, 다음이 성립한다.

$$\begin{align}
\lambda_1 \mathbf{v}_1 \cdot \mathbf{v}_2
&= (\lambda_1 \mathbf{v}_1)^T \mathbf{v}_2 = (A \mathbf{v}_1)^T \mathbf{v}_2\\[0.5em]
&= (\mathbf{v}_1^T A^T) \mathbf{v}_2 = \mathbf{v}_1^T A \mathbf{v}_2\\[0.5em]
&= \mathbf{v}_1^T (A \mathbf{v}_2) = \mathbf{v}_1^T (\lambda_2 \mathbf{v}_2 )\\[0.5em]
&= \lambda_2 \mathbf{v}_1^T \mathbf{v}_2\\[0.5em]
&= \lambda_2 \mathbf{v}_1 \cdot \mathbf{v}_2\\[0.5em]
\end{align}$$

따라서,

$$(\lambda_1 - \lambda_2 ) \mathbf{v}_1 \cdot \mathbf{v}_2 = 0$$

이 성립한다.

이때, $\lambda\_1 \neq \lambda\_2$이므로

$$\mathbf{v}_1 \cdot \mathbf{v}_2 = 0$$

이다.

∴ $\mathbf{v}\_1$와 $\mathbf{v}\_2$는 서로 orthogonal하다.

</div>

</div></li>

<li><div markdown="block">

$n \times n$ 정사각행렬 $A$에 대해, $A$를 $n \times n$ [orthonormal matrix](/linear_algebra/orthogonality) $P$와 $n \times n$ [대각 행렬](/linear_algebra/vector-matrix) $D$로 다음과 같이 나타내는 것을 **orthogonal diagonalization**이라 한다.

$$A = PDP^T = PDP^{-1}$$

orthogonal diagonalization이 가능한 행렬 $A$를 **orthogonally diagonalizable**하다고 한다.

눈치챘겠지만, orthogonal diagonalization은 [(eigenvalue) diagonalization](/linear_algebra/eigenvector-eigenvalue)의 특별한 경우(부분집합)이다. diagonalization에서는 역행렬을 구하는 연산을 수행해야 했지만, orthogonal diagonalization에서는 훨씬 간단한 전치(transpose) 연산만으로 diagonalization 할 수 있어 계산 난이도가 급감한다.

</div></li>

<li><div markdown="block">

symmetric한 정사각행렬 $A$는 orthogonally diagonalizable하다. 역으로, 정사각행렬 $A$가 orthogonally diagonalizable하다면 $A$는 symmetric하다.

즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$는 symmetric하다.
- $A$는 orthogonally diagonalizable하다.
  
$n \times n$ 정사각행렬 $A$가 [diagonalizable](/linear_algebra/eigenvector-eigenvalue)한지 아닌지 판별하기 꽤 복잡하다($n$개의 linearly independent한 eigenvector를 가지는지를 확인해야 한다). 하지만 $A$가 symmetric하다면 (복잡한 것들을 생각할 필요 없이) 바로 (orthogonally) diagonalizable함을 알 수 있다.

</div></li>

<li><div markdown="block">

symmetric한 $n \times n$ 정사각행렬 $A$에 대해, 다음 성질이 성립한다. 이를 **Spectral Theorem**이라 한다.

- $A$는 (multiplicity를 모두 세었을 때) $n$개의 [eigenvalue](/linear_algebra/eigenvector-eigenvalue)를 가진다.
- $A$의 모든 eigenvalue $\lambda$의 eigenspace의 차원은 $\lambda$의 multiplicity와 같고, 각 eigenvalue들은 [characteristic equation](/linear_algebra/eigenvector-eigenvalue)의 해이다.
- $A$의 eigenspace들은 서로 [orthogonal](/linear_algebra/orthogonality)하다. 즉, 다른 eigenspace로부터의 eigenvector들은 서로 orthogonal하다.
- $A$는 orthogonally diagonalizable하다.

</div></li>

<li><div markdown="block">

symmetric matrix $A$를 다음과 같이 orthogonal diagonalization한 후, 다음과 같이 정리할 수 있다.

$$\begin{align}
A &= PDP^T = \begin{bmatrix}
\mathbf{u}_1  & \cdots & \mathbf{u}_n
\end{bmatrix} \begin{bmatrix}
\lambda _1 & {} & 0\\
{} & \ddots & {}\\
0 & {} & \lambda_n\\
\end{bmatrix} \begin{bmatrix}
\mathbf{u}_1^T \\
\vdots\\
\mathbf{u}_n^T\\
\end{bmatrix}\\[0.5em]
&= \begin{bmatrix}
\lambda_1 \mathbf{u}_1 & \cdots & \lambda_n \mathbf{u}_n
\end{bmatrix} \begin{bmatrix}
\mathbf{u}_1^T \\
\vdots\\
\mathbf{u}_n^T\\
\end{bmatrix}\\[0.5em]
&= \lambda_1 \mathbf{u}_1\mathbf{u}_1^T + \lambda_2 \mathbf{u}_2\mathbf{u}_2^T + \cdots + \lambda_n \mathbf{u}_n\mathbf{u}_n^T
\end{align}$$

이렇게 $A$를 $n \times n$ 행렬 $\lambda\_i \mathbf{u}\_i \mathbf{u}\_i^T$들의 합으로 표현하는 것을 **spectral decomposition**이라 한다. 참고로 행렬 $\lambda\_i \mathbf{u}\_i \mathbf{u}\_i^T$은 다음과 같은 성질이 있다.

- [$\textrm{Rank}(\lambda\_i \mathbf{u}\_i \mathbf{u}\_i^T) = 1$](/linear_algebra/vector-space)
- 임의의 벡터 $\mathbf{x} \in \mathbb{R}^n$에 대해, $(\mathbf{u}\_i \mathbf{u}\_i^T) \mathbf{x}$는 $\textrm{Span}\\{ \mathbf{u}\_i \\}$ 위로의 $\mathbf{x}$의 [orthogonal projection](/linear_algebra/orthogonality)이다.

</div></li>

</ul>

# quadratic forms

<ul>

<li><div markdown="block">

$\mathbf{x} \in \mathbb{R}^n$와 적절한 $n \times n$ symmetric matrix $A$에 대해, $\mathbf{x}$를 입력으로 받아 실수값을 반환하는

$$Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$$

형태로 정의되는 함수 $Q$를 **quadratic form**이라 한다. 그리고 이때의 $A$를 **quadratic form의 행렬(matrix of the quadratic form)**이라 한다.

ex) $Q(\mathbf{x}) = \mathbf{x}^T I \mathbf{x} = \lVert \mathbf{x} \rVert^2$

</div></li>

<li><div markdown="block">

벡터 $\mathbf{x} = \begin{bmatrix} x\_1 \\\\ x\_2 \\\\ \vdots \\\\ x\_n \end{bmatrix} \in \mathbb{R}^n$, $n \times n$ symmetric matrix $A = \begin{bmatrix}a\_{11} & a\_{12} & \cdots & a\_{1n} \\\\ a\_{12} & a\_{22} & \cdots & a\_{2n} \\\\ \vdots & \vdots & \ddots & \vdots \\\\ a\_{1n} & a\_{2n} & \cdots & a\_{nn} \end{bmatrix}$이라 할 때, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$은 다음과 같이 정리할 수 있다.

$$Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} = \sum_{i=1} ^n a_{ii} x_i^2 + 2 \sum _{i < j} a_{ij}x_i x_j$$

이때 $\displaystyle\sum\_{i=1} ^n a\_{ii} x\_i^2$ 부분을 **(perfect) square term**, $\displaystyle\sum \_{i < j} a\_{ij}x\_i x\_j$ 부분을 **cross-product term**이라 한다.

</div></li>

<li><div markdown="block">

만약 $A$가 [대각 행렬](/linear_algebra/vector-matrix)이면 quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$는 cross-product term이 없다. 역으로, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$가 cross-product term을 가지지 않으면 $A$는 대각 행렬이다.

즉, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $Q$는 cross-product term이 없다.
- $A$는 대각 행렬이다.

</div></li>

<li><div markdown="block">

벡터 $\mathbf{x},\,\mathbf{y} \in \mathbb{R}^n$과, [역행렬](/linear_algebra/inverse)이 존재하는 $n \times n$ 행렬 $P$에 대해,

$$\mathbf{x} = P \mathbf{y},\qquad\qquad\mathbf{y} = P^{-1} \mathbf{x}$$

라 하면, quadratic form $\mathbf{x}^T A \mathbf{x}$는 다음과 같이 변환할 수 있다.

$$\begin{align}
\mathbf{x}^T A \mathbf{x}
&= (P \mathbf{y})^T A (P \mathbf{y})\\[0.5em]
&= \mathbf{y}^T P^T A P \mathbf{y}\\[0.5em]
&= \mathbf{y}^T (P^T A P) \mathbf{y}\\[0.5em]
&= \mathbf{y}^T D \mathbf{y} \qquad (D = P^T A P)\\[0.5em]
\end{align}$$

이때, $A$는 symmetric matrix이므로, $D = P^T A P$ 역시 symmetric matrix이다(orthogonally diagonalizable하므로). 즉, 위 과정을 거치면 ($\mathbf{x}$에 대한) quadratic form을 ($\mathbf{y}$에 대한) quadratic form으로 바꿀 수 있다. 이렇게 주어진 quadratic form을 다른 변수에 대한 quadratic form으로 바꾸는 과정을 **change of variable**이라 한다.

</div></li>

<li><div markdown="block">

**주축정리(The Principle Axes Theorem)**

$n \times n$ symmetric matrix $A$에 대해, quadratric form $\mathbf{x}^T A \mathbf{x}$를 cross-product term이 존재하지 않는 quadratic form $\mathbf{y}^T D \mathbf{y}$으로 바꾸는 적절한 change of variable $\mathbf{x} = P \mathbf{y}$가 존재한다.

이때, 행렬 $P$의 열들을 quadratic form $\mathbf{x}^T A \mathbf{x}$의 **주축(principle axes)**이라 한다. 주축은 $\mathbb{R}^n$의 [orthonormal basis](/linear_algebra/orthogonality)이다(= $P$는 [orthonormal matrix](/linear_algebra/orthogonality)이다). 벡터 $\mathbf{y}$는 ($\mathbb{R}^n$의 orthonormal basis인) 주축 하에서의 $\mathbf{x}$의 [좌표 벡터(coordinate vector)](/linear_algebra/vector-space)이다. $D$는 [대각 행렬](/linear_algebra/vector-matrix)이다.

</div></li>

<li><div markdown="block">

quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$는 다음과 같이 분류할 수 있다.

- **positive definite** : 모든 $\mathbf{x} \neq 0$에 대해, $Q(\mathbf{x}) > 0$. 이때의 $A$를 **positive definite matrix**라 한다.
- **negative definite** : 모든 $\mathbf{x} \neq 0$에 대해, $Q(\mathbf{x}) < 0$. 이때의 $A$를 **negative definite matrix**라 한다.
- **positive semidefinite** : 모든 $\mathbf{x}$에 대해, $Q(\mathbf{x}) \ge 0$. 이때의 $A$를 **positive semidefinite matrix**라 한다.
- **negative semidefinite** : 모든 $\mathbf{x}$에 대해, $Q(\mathbf{x}) \le 0$. 이때의 $A$를 **negative semidefinite matrix**라 한다.
- **indefinite** : $Q(\mathbf{x})$는 양수도 음수도 모두 가질 수 있다. 이때의 $A$를 **indefinite matrix**라 한다.

모든 positive definite quadratic form은 positive semidefinite quadratic form이다. 또 모든 negative definite quadratic form은 negative semidefinite quadratic form이다.

</div></li>

<li><div markdown="block">

$n \times n$ symmetric matrix $A$에 대해, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$는 다음과 같은 성질이 있다.

- $Q$가 positive definite라면 $A$의 모든 [eigenvalue](/linear_algebra/eigenvector-eigenvalue)는 양수이다. 역으로, $A$의 모든 eigenvalue가 양수이면 $Q$는 positive definite이다.
- $Q$가 negative definite라면 $A$의 모든 eigenvalue는 음수이다. 역으로, $A$의 모든 eigenvalue가 음수이면 $Q$는 negative definite이다.
- $Q$가 indefinite라면 $A$는 양수 eigenvalue, 음수 eigenvalue를 모두 가진다. 역으로, $A$가 양수 eigenvalue, 음수 eigenvalue를 모두 가지면 $Q$는 indefinite이다.

</div></li>

</ul>

# constrained optimization

<ul>

<li><div markdown="block">

symmetric matrix $A$에 대해, 다음과 같이 정의하자.

- $\lambda\_{ {}\_M}$ : $A$의 가장 큰 [eigenvalue](/linear_algebra/eigenvector-eigenvalue)
- $\lambda\_{ {}\_m}$ : $A$의 가장 작은 eigenvalue
- $\mathbf{u}\_{ {}\_M}$ : $\lambda\_{ {}\_M}$과 상응하는, 크기가 1인 $A$의 [eigenvector](/linear_algebra/eigenvector-eigenvalue) (즉, $\lVert \mathbf{u}\_{ {}\_M} \rVert ^2 = 1$)
- $\mathbf{u}\_{ {}\_m}$ : $\lambda\_m$과 상응하는, 크기가 1인 $A$의 eigenvector (즉, $\lVert \mathbf{u}\_{ {}\_m} \rVert ^2 = 1$)

이때, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$는 제약조건 $\lVert \mathbf{x} \rVert^2 = 1$ 하에서 다음 성질이 성립한다.

- $\mathbf{x} = \mathbf{u}\_{ {}\_M}$일 때, $Q(\mathbf{x})$는 최댓값 $\lambda\_{ {}\_M}$을 갖는다.
- $\mathbf{x} = \mathbf{u}\_{ {}\_m}$일 때, $Q(\mathbf{x})$는 최솟값 $\lambda\_m$을 갖는다.

</div></li>

<li><div markdown="block">

위를 일반화하면 다음과 같은 정리를 얻을 수 있다.

$n \times n$ symmetric matrix $A$은 $n$개의 eigenvalue를 가진다. 이를 크기 순으로 각각 $\lambda\_1$, $\lambda\_2$, ..., $\lambda\_n$이라 하자(즉, $\lambda\_1 \ge \lambda\_2 \ge \cdots \ge \lambda\_n$). 그리고 각각의 $\lambda\_i$와 상응하는, 크기 1인 eigenvector를 $\mathbf{u}\_i$라 하자(즉, $A\mathbf{u}\_i = \lambda\_i \mathbf{u}\_i$, $\lVert \mathbf{u} \rVert ^2 = 1$).

이때, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$은 $\lVert \mathbf{x} \rVert ^2 = 1$, $\mathbf{x} \cdot \mathbf{u}\_1 = 0$, $\mathbf{x} \cdot \mathbf{u}\_2 = 0$, ..., $\mathbf{x} \cdot \mathbf{u}\_{k-1} = 0$ 제약조건 하에서, $\mathbf{x} = \mathbf{u}\_k$일 때 최댓값 $\lambda\_k$를 갖는다.

참고로 symmetric matrix $A$는 $A = PDP^{-1} = PDP^T$로 [orthogonal diagonalization](/linear_algebra/orthogonality)할 수 있다. 이때 $\lambda\_i$는 $D$의 주대각선 성분들이고, $\mathbf{u}\_i$는 $P$의 열들이다. 즉, orthogonal diagonalization을 수행하면 위 제약조건 하에서의 최댓값을 구할 수 있게 된다.

</div></li>

</ul>

# SVD (singular value decomposition)

<ul>

<li><div markdown="block">

$m \times n$ 행렬 $A$에 대해, $A^T A$의 [orthonormal basis](/linear_algebra/orthogonality) $\\{\mathbf{v}\_1, \mathbf{v}\_2, \cdots, \mathbf{v}\_{n}\\}$의 각 원소 $\mathbf{v}\_i$에 대응되는 $A^T A$의 [eigenvalue](/linear_algebra/eigenvector-eigenvalue)를 $\lambda\_i$라 하자(단, $\lambda\_1 \ge \lambda\_2 \ge \cdots \ge \lambda\_n$).

이때,

$$\begin{align}
\lVert A \mathbf{v}_i \rVert^2 &= (A \mathbf{v}_i)^T (A \mathbf{v}_i)\\[0.5em]
&= \mathbf{v}_i^T A^T A \mathbf{v}_i\\[0.5em]
&= \mathbf{v}_i^T \left ( (A^T A) \mathbf{v}_i \right )\\[0.5em]
&= \mathbf{v}_i^T (\lambda_i \mathbf{v}_i)\\[0.5em]
&= \lambda_i \mathbf{v}_i^T \mathbf{v}_i\\[0.5em]
&= \lambda_i\\[0.5em]
\end{align}$$

인데, $\lVert A \mathbf{v}\_i \rVert^2 \ge 0$이므로, $\lambda\_i \ge 0$이다. 즉, $A^T A$의 eigenvalue들은 모두 0보다 크거나 같다.

</div></li>

<li><div markdown="block">

$\sigma\_i = \lVert A \mathbf{v}\_i \rVert = \sqrt{\lambda\_i }$를 $A$의 **singular value**라 한다. 즉, $A$의 singular value는 $A \mathbf{v}\_i$의 크기와 같다. 따라서 singular value는 항상 양수이다.

</div></li>

<li><div markdown="block">

$A$가 $r$개의 0이 아닌(nonzero) singular value를 가지고 있다고 하자. 이때, 집합 $\\{A \mathbf{v}\_1,\, A \mathbf{v}\_2,\, \cdots,\, A \mathbf{v}\_{r}\\}$는 [$\textrm{Col}\,A$](/linear_algebra/vector-space)의 orthogonal basis이고, [$\textrm{Rank}(A) = r$](/linear_algebra/vector-space)이다.

</div></li>

<li><div markdown="block">

**SVD (singular value decomposition)**

$\textrm{Rank}(A) = r$인 $m \times n$ 행렬 $A$는 다음과 같이 분해할 수 있다.

$$A = U \Sigma V^T$$

- $U$ : [$m \times m$ 행렬] orthonormal matrix. $U$의 각 열들을 **left singular vector**라 한다. $U$의 첫 $r$개의 열들은 $\mathbf{u}\_i = \displaystyle\frac{1}{\sigma\_i} A \mathbf{v}\_i$로 계산하고, 나머지 열들은 orthonormal matrix가 되도록 적당히 맞춰준다.

- $\Sigma$ : [$m \times n$ 행렬] 첫 $r$개의 대각성분은 $A$의 0이 아닌 singular value $\sigma\_1 \ge \sigma\_2 \ge \cdots \ge \sigma\_r$들의 크기 순서대로, 나머지 대각성분 및 다른 위치의 값들은 모두 0으로 채워진 행렬 ([대각 행렬](/linear_algebra/vector-matrix)과 유사)

    $$\Sigma = \begin{bmatrix}
    \sigma_1 & 0 & \cdots & 0 & \cdots & 0 \\
    0 & \sigma_2 & \cdots & 0 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots & {} & \vdots \\
    0 & 0 & \cdots & \sigma_r & \cdots & 0\\
    \vdots & \vdots & {} & \vdots & \ddots & \vdots \\
    0 & 0 & \cdots & 0 & \cdots & 0\\
    \end{bmatrix}$$

- $V$ : [$n \times n$ 행렬] orthonormal matrix. $V$의 각 열들을 **right singular vector**라 한다. $V$의 첫 $r$개의 열들은 $\mathbf{v}\_i$이고, 나머지 열들은 orthonormal matrix가 되도록 적당히 맞춰준다.

$U$, $V$는 유일하게 결정되지 않지만, $\Sigma$는 $A$에 대해 유일하게 결정된다.

</div></li>

<li><div markdown="block">

예제

다음 행렬을 SVD해보자.

$$A = \begin{bmatrix}
4 & 11 & 14\\
8 & 7 & -2\\
\end{bmatrix}$$

우선 $A^T A$의 eigenvalue와 이에 상응하는 eigenvector들의 orthonormal set을 구한다.

$$A^T A = \begin{bmatrix}
80 & 100 & 40\\
100 & 170 & 140\\
40 & 140 & 200\\
\end{bmatrix}$$

이 행렬의 eigenvalue는 $\lambda\_1 = 360$, $\lambda\_2 = 90$, $\lambda\_3 = 0$이고, 각각 상응하는 eigenvector는 다음과 같다.

$$\mathbf{v}_1 = \begin{bmatrix}
\frac{1}{3}\\
\frac{2}{3}\\
\frac{2}{3}\\
\end{bmatrix},\qquad
\mathbf{v}_2 = \begin{bmatrix}
-\frac{2}{3}\\
-\frac{1}{3}\\
\frac{2}{3}\\
\end{bmatrix},\qquad
\mathbf{v}_3 = \begin{bmatrix}
\frac{2}{3}\\
-\frac{2}{3}\\
\frac{1}{3}\\
\end{bmatrix}$$

이를 이용해 $\Sigma$, $V$, $U$를 만든다. $\sigma\_1 = \sqrt{\lambda\_1} = 6 \sqrt{10}$, $\sigma\_2 = \sqrt{\lambda\_2} = 3 \sqrt{10}$, $\sigma\_3 = \sqrt{\lambda\_3} = 0$이므로,

$$\Sigma = \begin{bmatrix}
6 \sqrt{10} & 0 & 0\\
0 & 3 \sqrt{10} & 0\\
\end{bmatrix}$$

$$V = \begin{bmatrix}
\mathbf{v}_1 & \mathbf{v}_2 & (*) \\
\end{bmatrix} = \begin{bmatrix}
\mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3\\
\end{bmatrix} = \begin{bmatrix}
\frac{1}{3} & -\frac{2}{3} & \frac{2}{3}\\
\frac{2}{3} & -\frac{1}{3} & -\frac{2}{3}\\
\frac{2}{3} & \frac{2}{3} & \frac{1}{3}\\
\end{bmatrix}$$

($(*)$에는 $V$를 orthonormal matrix로 만들기 위하여 아무 값이나 사용해도 되기에, $\mathbf{v}\_3$의 값을 사용했다.)

$$U = \begin{bmatrix}
\displaystyle\frac{1}{\sigma_1} A \mathbf{v}_1 & \displaystyle\frac{1}{\sigma_2} A \mathbf{v}_2\\
\end{bmatrix} = \begin{bmatrix}
\frac{3}{\sqrt{10}} & \frac{1}{\sqrt{10}}\\
\frac{1}{\sqrt{10}} & -\frac{3}{\sqrt{10}}\\
\end{bmatrix}$$

따라서 다음과 같이 된다.

$$\begin{align}
A &= \begin{bmatrix}
4 & 11 & 14\\
8 & 7 & -2\\
\end{bmatrix} = \begin{bmatrix}
\frac{3}{\sqrt{10}} & \frac{1}{\sqrt{10}}\\
\frac{1}{\sqrt{10}} & -\frac{3}{\sqrt{10}}\\
\end{bmatrix} \begin{bmatrix}
6 \sqrt{10} & 0 & 0\\
0 & 3 \sqrt{10} & 0\\
\end{bmatrix} \begin{bmatrix}
\frac{1}{3} & -\frac{2}{3} & \frac{2}{3}\\
\frac{2}{3} & -\frac{1}{3} & -\frac{2}{3}\\
\frac{2}{3} & \frac{2}{3} & \frac{1}{3}\\
\end{bmatrix}^T \\[0.5em]
&= \begin{bmatrix}
\frac{3}{\sqrt{10}} & \frac{1}{\sqrt{10}}\\
\frac{1}{\sqrt{10}} & -\frac{3}{\sqrt{10}}\\
\end{bmatrix} \begin{bmatrix}
6 \sqrt{10} & 0 & 0\\
0 & 3 \sqrt{10} & 0\\
\end{bmatrix} \begin{bmatrix}
\frac{1}{3} & \frac{2}{3} & \frac{2}{3}\\
-\frac{2}{3} & -\frac{1}{3} & \frac{2}{3}\\
\frac{2}{3} & -\frac{2}{3} & \frac{1}{3}\\
\end{bmatrix}\\[0.5em]
\end{align}$$

</div></li>

<li><div markdown="block">

[역행렬](/linear_algebra/inverse)이 존재하는 $n \times n$ 정사각행렬 $A$에 대해, $A$는 항상 $n$개의 0이 아닌(nonzero) singular value를 가진다. 역으로, $A$가 $n$개의 0이 아닌 singular value를 가진다면, $A$는 역행렬이 존재한다.

즉, $n \times n$ 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$의 역행렬이 존재한다.
- $A$는 $n$개의 0이 아닌 singular value를 가진다.
- $A$는 0인 singular value를 가지지 않는다.

</div></li>

<li><div markdown="block">

**reduced SVD**

$\textrm{Rank}(A) = r$인 $m \times n$ 행렬 $A$는 다음과 같이 분해할 수도 있다.

$$A = U_r D V_r^T$$

- $U_r$ : [$m \times r$ 행렬] $U$의 앞 $r$개의 열들로만 구성된 행렬. 즉, 각 열이 $\mathbf{u}\_i = \displaystyle\frac{1}{\sigma\_i} A \mathbf{v}\_i$로 계산되는 행렬.
- $D$ : [$r \times r$ 행렬] $A$의 0이 아닌 singular value $\sigma\_1 \ge \sigma\_2 \ge \cdots \ge \sigma\_r$들의 크기 순서대로 대각 성분이 구성된 채워진 대각 행렬

    $$D = \begin{bmatrix}
    \sigma_1 & 0 & \cdots & 0 \\
    0 & \sigma_2 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots\\
    0 & 0 & \cdots & \sigma_r\\
    \end{bmatrix}$$

- $V_r$ : [$n \times r$ 행렬] $V$의 앞 $r$개의 열들로만 구성된 행렬. 즉, 각 열이 $\mathbf{v}\_i$인 행렬.

</div></li>

<li><div markdown="block">

reduced SVD에서, $D$는 항상 [역행렬](/linear_algebra/inverse)이 존재한다. 이때, 다음과 같이 계산되는 행렬 $A^+$를 $A$의 **pseudoinverse** 또는 **Moore-Penrose inverse**라고 한다.

$$A^+ = V_r D^{-1 } U_r^T$$

</div></li>

<li><div markdown="block">

선형연립방정식 $A\mathbf{x} = \mathbf{b}$에 대해, $A$의 pseudoinverse로 정의되는

$$\hat{\mathbf{x}} = A^+ \mathbf{b} = V_r D^{-1 } U_r^T  \mathbf{b}$$

는 선형연립방정식 $A\mathbf{x} = \mathbf{b}$의 [least-square solution](/linear_algebra/orthogonality) 중 가장 크기가 작은 벡터이다.

</div></li>

</ul>