---
title: "Symmetric Matrix"
date_created: "2021-09-15"
date_modified: "2021-12-21"
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

$n \times n$ 정사각행렬 $A$에 대해, $A$를 $n \times n$ [orthonormal matrix](/linear_algebra/orthogonality) $P$와 $n \times n$ 대각 행렬 $D$로 다음과 같이 나타내는 것을 **orthogonal diagonalization**이라 한다.

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

$\mathbf{x} \in \mathbb{R}^n$와 적절한 $n \times n$ symmetric matrix $A$에 대해,

$$Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$$

형태로 정의되어 실수값을 반환하는, $\mathbf{R}^n$를 정의역으로 가지는 함수 $Q$를 **quadratic form**이라 한다. 그리고 이때의 $A$를 **quadratic form의 행렬(matrix of the quadratic form)**이라 한다.

ex) $Q(\mathbf{x}) = \mathbf{x}^T I \mathbf{x} = \lVert \mathbf{x} \rVert^2$

</div></li>

<li><div markdown="block">

벡터 $\mathbf{x} = \begin{bmatrix} x\_1 \\\\ x\_2 \\\\ \vdots \\\\ x\_n \end{bmatrix} \in \mathbb{R}^n$, $n \times n$ symmetric matrix $A = \begin{bmatrix}a\_{11} & a\_{12} & \cdots & a\_{1n} \\\\ a\_{12} & a\_{22} & \cdots & a\_{2n} \\\\ \vdots & \vdots & \ddots & \vdots \\\\ a\_{1n} & a\_{2n} & \cdots & a\_{nn} \end{bmatrix}$이라 할 때, quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$은 다음과 같이 정리할 수 있다.

$$Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} = \sum_{i=1} ^n a_{ii} x_i^2 + 2 \sum _{i < j} a_{ij}x_i x_j$$

이때 $\displaystyle\sum\_{i=1} ^n a\_{ii} x\_i^2$ 부분을 **(perfect) square term**, $\displaystyle\sum \_{i < j} a\_{ij}x\_i x\_j$ 부분을 **cross-product term**이라 한다.

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

주축정리(The Principle Axes Theorem)

$n \times n$ symmetric matrix $A$에 대해, quadratric form $\mathbf{x}^T A \mathbf{x}$를 cross-product term이 존재하지 않는 quadratic form $\mathbf{y}^T D \mathbf{y}$으로 바꾸는 적절한 change of variable $\mathbf{x} = P \mathbf{y}$가 존재한다.

이때 행렬 $P$의 열들을 quadratic form $\mathbf{x}^T A \mathbf{x}$의 **주축(principle axes)**이라 한다. 주축은 $\mathbb{R}^n$의 [orthonormal basis](/linear_algebra/orthogonality)이다(= $P$는 [orthonormal matrix](/linear_algebra/orthogonality)이다). 벡터 $\mathbf{y}$는 ($\mathbb{R}^n$의 orthonormal basis인) 주축 하에서의 $\mathbf{x}$의 [좌표 벡터(coordinate vector)](/linear_algebra/vector-space)이다. $D$는 

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
