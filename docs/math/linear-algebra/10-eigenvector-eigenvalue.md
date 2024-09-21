---
title: "Eigenvector, Eigenvalue"
order: 10
date_created: "2021-10-20"
date_modified: "2024-09-21"
---

<style src="./styles.scss"></style>

# eigenvector, eigenvalue

- $n \times n$ 행렬 $A$에 대해, 선형연립방정식 

  $$A \mathbf{x} = \lambda \mathbf{x}$$

  이 [nontrivial solution](/math/linear-algebra/02-linear-system)을 갖게 만드는 스칼라 $\lambda \in \mathbb{R}$를 $A$의 **eigenvalue**라 한다. 그리고 그 때의 nontrivial solution $\mathbf{x}$를 $\lambda$와 상응하는 $A$의 **eigenvector**(eigenvector of $A$ corresponding to $\lambda$)라 한다. 

- [선형변환](/math/linear-algebra/05-linear-transformation) $\mathbf{x} \mapsto A\mathbf{x}$에 대해, eigenvector는 변환해도 그 크기만 $\lambda$배 변할 뿐($\lambda \mathbf{x}$) 방향은 전혀 바뀌지 않는 특수한 벡터들을 의미한다. eigenvector, eigenvalue라는 이름은 여기서 나왔다(독일어로 "eigen"은 "고유한", "특징적인"이라는 뜻이다).

- 행렬 $A$의 eigenvalue들의 집합을 $A$의 **spectrum**이라 한다.

- $\lambda$가 정사각행렬 행렬 $A$의 eigenvalue라면, 식

  $$(A - \lambda I)\mathbf{x} = \mathbf{0}$$

  은 항상 nontrivial solution을 가진다(그리고 그 nontrivial solution은 $\lambda$와 상응하는 $A$의 eigenvector이다). 역으로, 위 식이 nontrivial solution을 가진다면, $\lambda$는 행렬 $A$의 eigenvalue이다.

  즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.{.mt-1}

  - $\lambda$는 $A$의 eigenvalue이다.
  - 식 $(A - \lambda I)\mathbf{x} = \mathbf{0}$은 nontrivial solution을 가진다(그리고 그 nontrivial solution은 $\lambda$와 상응하는 $A$의 eigenvector이다).
  {.equivalent}

  이 성질을 이용하면 주어진 $\lambda$가 eigenvalue가 맞는지를 검증할 수 있다. 만약 주어진 $\lambda$에 대해 식 $(A - \lambda I)\mathbf{x} = \mathbf{0}$가 nontrivial solution을 가진다면, $\lambda$는 eigenvalue가 맞다.

- 한 eigenvalue는 여러 개의 상응하는 eigenvector를 가질 수 있다. 이때, 정사각행렬 $A$의 eigenvalue $\lambda$와 상응하는 모든 eigenvector들의 집합을 $\lambda$에 상응하는 $A$의 **eigenspace**(eigenspace of $A$ corresponding to $\lambda$)라 한다. 다시말해, $\lambda$에 상응하는 $A$의 eigenspace는 다음 식의 nontrivial solution들의 집합이다.

  $$(A - \lambda I)\mathbf{x} = \mathbf{0}$$

- $\lambda$에 상응하는 $A$의 eigenspace는 행렬 $(A - \lambda I)$의 [null space](/math/linear-algebra/08-vector-space)이다.

- 정사각행렬 $A$의 서로 다른(distinct) eigenvalue $\lambda_1,\,\lambda_2,\,\cdots,\,\lambda_r$와 이에 상응하는 eigenvector $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_r$에 대해(즉, $A \mathbf{v}_i = \lambda_i \mathbf{v}_i$), eigenvector들의 집합 $\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_r\}$은 [linearly independent](/math/linear-algebra/04-linear-combination)하다.

# eigenvalue, eigenvector 구하기

- 정사각행렬 $A$와 스칼라 $\lambda$에 대해, 다음은 모두 동치이다.

  - $\lambda$는 $A$의 eigenvalue이다.
  - $\textrm{det}(A-\lambda I) = 0$ (characteristic equation)
  {.equivalent}

  이때 식 $\textrm{det}(A-\lambda I) = 0$을 **특성식(characteristic equation)** 이라 한다. 또한 $n \times n$ 정사각행렬 $A$에 대해, characteristic equation의 좌변 $\textrm{det}(A-\lambda I)$은 $\lambda$에 대한 $n$차 다항식이므로, $\textrm{det}(A-\lambda I)$을 **characteristic polynomial**이라 한다.

  즉 $n \times n$ 정사각행렬 $A$의 characteristic equation의 해는 모두 eigenvalue이다. {.mt-1}
  
  따라서 정사각행렬 $A$의 eigenvalue, eigenvector는 다음 순서로 구할 수 있다.{.mt-1}

  1. $A$의 characteristic equation을 구한다.
  2. characteristic equation의 해를 구한다. 이때 해가 eigenvalue가 된다.
  3. 각 eigenvalue $\lambda$에 대해, $(A - \lambda I)\mathbf{x} = \mathbf{0}$의 nontrivial solution을 구한다. 이때 nontrivial solution이 ($\lambda$에 상응하는) eigenvector가 된다.
  {.border}

- [triangular matrix](/math/linear-algebra/01-vector-matrix)의 [determinant](/math/linear-algebra/09-determinant)는 대각 성분의 곱이므로, triangular matrix의 eigenvalue는 대각선의 성분들이다.

- 0을 eigenvalue로 갖는 정사각행렬은 [역행렬](/math/linear-algebra/06-inverse)이 존재하지 않는다(not invertible). 역으로, 역행렬이 존재하지 않는 정사각행렬은 항상 0을 eigenvalue로 갖는다.

  즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.{.mt-1}

  - eigenvalue로 0을 갖는다.
  - $A$의 역행렬이 존재하지 않는다.
  {.equivalent}

- 정사각행렬 $A$의 eigenvalue $\lambda$가 $A$의 characteristic equation의 해로 등장한 횟수를 $\lambda$의 **(algebraic) multiplicity**라 한다. 예를 들어, $A$의 characteristic equation이 $(\lambda - 5)^2 (\lambda - 3) (\lambda - 1) = 0$이라면, eigenvalue $\lambda = 5$의 multiplicity는 2이고, $\lambda = 3$, $\lambda = 1$의 multiplicity는 각각 1이다.

  multiplicity가 $k$인 eigenvalue의 eigenspace을 $\mathcal{B}$라 할 때, $\mathcal{B}$의 [차원](/math/linear-algebra/08-vector-space) $\textrm{dim}(\mathcal{B})$은 다음과 같은 성질이 있다. {.mt-1}

  $$1 \le \textrm{dim}(\mathcal{B}) \le k$$

  예를 들어, 위 예제에서 eigenvalue $\lambda = 5$의 eigenspace의 차원은 1로, $\lambda = 5$의 multiplicity 2보다 작거나 같다. 또 eigenvalue $\lambda = 3$의 eigenspace의 차원은 1로, $\lambda = 3$의 multiplicity 1보다 작거나 같다.

::: details 예제 : eigenvalue, eigenvector 구하기

다음 행렬의 eigenvalue, eigenvector를 구해보자.

$$A = \begin{bmatrix}
5 & -2 & 6 & -1\\[0.5em]
0 & 3 & -8 & 0\\[0.5em]
0 & 0 & 5 & 4\\[0.5em]
0 & 0 & 0 & 1\\[0.5em]
\end{bmatrix}$$

우선 eigenvalue를 구해 보자. eigenvalue를 구하려면 characteristic equation의 해를 구하면 된다. $A$는 triangular matrix이므로, $A$의 characteristic equation은 다음과 같이 된다. (triangular matrix의 [determinant](/math/linear-algebra/09-determinant)는 대각 성분의 곱이라는 성질 활용)

$$\begin{align}
\textrm{det}\,(A - \lambda I) &= \begin{vmatrix}
5 - \lambda & -2 & 6 & -1\\[0.5em]
0 & 3 - \lambda & -8 & 0\\[0.5em]
0 & 0 & 5 - \lambda & 4\\[0.5em]
0 & 0 & 0 & 1 - \lambda\\[0.5em]
\end{vmatrix}\\[0.5em]
& = (5 - \lambda)(3 - \lambda)(5 - \lambda)(1- \lambda)\\[0.5em]
& = (\lambda - 5)^2 (\lambda - 3) (\lambda - 1) = 0
\end{align}$$

따라서 $A$의 eigenvalue는 5(multiplicity = 2), 3(multiplicity = 1), 1(multiplicity = 1)이다. (혹은 triangular matrix의 대각 성분들이 eigenvalue라는 성질을 이용해 determinant를 굳이 계산하지 않고도 eigenvalue 5, 3, 1을 구할 수도 있다.)

이제 eigenvector를 구해보자. eigenvector를 구하려면 각 $\lambda$를 $(A - \lambda I)\mathbf{x} = 0$에 대입한 후, 그때의 nontrivial solution을 구하면 된다.

- $\lambda = 5$일 때:

    $$(A - 5I)\mathbf{x} = \begin{bmatrix}
    0 & -2 & 6 & -1\\[0.5em]
    0 & -2 & -8 & 0\\[0.5em]
    0 & 0 & 0 & 4\\[0.5em]
    0 & 0 & 0 & -4\\[0.5em]
    \end{bmatrix}\mathbf{x} = \mathbf{0}$$

    이므로, augmented matrix를 만들어 nontrivial solution을 구하면 $\lambda = 5$에 상응하는 $A$의 eigenvector를 구할 수 있다.

    $$\begin{bmatrix}
    0 & -2 & 6 & -1 & 0\\[0.5em]
    0 & -2 & -8 & 0 & 0\\[0.5em]
    0 & 0 & 0 & 4 & 0\\[0.5em]
    0 & 0 & 0 & -4 & 0\\[0.5em]
    \end{bmatrix} \sim \begin{bmatrix}
    0 & 1 & 0 & 0 & 0\\[0.5em]
    0 & 0 & 1 & 0 & 0\\[0.5em]
    0 & 0 & 0 & 1 & 0\\[0.5em]
    0 & 0 & 0 & 0 & 0\\[0.5em]
    \end{bmatrix} \Rightarrow \mathbf{x} = \begin{bmatrix}
    1\\[0.5em]
    0\\[0.5em]
    0\\[0.5em]
    0\\[0.5em]
    \end{bmatrix} x_1$$

- $\lambda = 3$일 때:

    $$(A - 3I)\mathbf{x} = \begin{bmatrix}
    2 & -2 & 6 & -1\\[0.5em]
    0 & 0 & -8 & 0\\[0.5em]
    0 & 0 & 2 & 4\\[0.5em]
    0 & 0 & 0 & -2\\[0.5em]
    \end{bmatrix}\mathbf{x} = \mathbf{0}$$

    이므로, augmented matrix를 만들어 nontrivial solution을 구하면 $\lambda = 3$에 상응하는 $A$의 eigenvector를 구할 수 있다.

    $$\begin{bmatrix}
    2 & -2 & 6 & -1 & 0\\[0.5em]
    0 & 0 & -8 & 0 & 0\\[0.5em]
    0 & 0 & 2 & 4 & 0\\[0.5em]
    0 & 0 & 0 & -2 & 0\\[0.5em]
    \end{bmatrix} \sim \begin{bmatrix}
    1 & -1 & 0 & 0 & 0\\[0.5em]
    0 & 0 & 1 & 0 & 0\\[0.5em]
    0 & 0 & 0 & 1 & 0\\[0.5em]
    0 & 0 & 0 & 0 & 0\\[0.5em]
    \end{bmatrix} \Rightarrow \mathbf{x} = \begin{bmatrix}
    1\\[0.5em]
    1\\[0.5em]
    0\\[0.5em]
    0\\[0.5em]
    \end{bmatrix} x_1$$

- $\lambda = 1$일 때:

    $$(A - I)\mathbf{x} = \begin{bmatrix}
    4 & -2 & 6 & -1\\[0.5em]
    0 & 2 & -8 & 0\\[0.5em]
    0 & 0 & 4 & 4\\[0.5em]
    0 & 0 & 0 & 0\\[0.5em]
    \end{bmatrix}\mathbf{x} = \mathbf{0}$$

    이므로, augmented matrix를 만들어 nontrivial solution을 구하면 $\lambda = 1$에 상응하는 $A$의 eigenvector를 구할 수 있다.

    $$\begin{bmatrix}
    4 & -2 & 6 & -1 & 0\\[0.5em]
    0 & 2 & -8 & 0 & 0\\[0.5em]
    0 & 0 & 4 & 4 & 0\\[0.5em]
    0 & 0 & 0 & 0 & 0\\[0.5em]
    \end{bmatrix} \sim \begin{bmatrix}
    1 & 0 & 0 & 1/4 & 0\\[0.5em]
    0 & 1 & 0 & 4 & 0\\[0.5em]
    0 & 0 & 1 & 1 & 0\\[0.5em]
    0 & 0 & 0 & 0 & 0\\[0.5em]
    \end{bmatrix} \Rightarrow \mathbf{x} = \begin{bmatrix}
    1\\[0.5em]
    16\\[0.5em]
    4\\[0.5em]
    -4\\[0.5em]
    \end{bmatrix} x_4$$

따라서, $A$의 eigenvector는 $\begin{bmatrix}1\\0\\0\\0\\\end{bmatrix} x_1$ ($\lambda = 5$일 때), $\begin{bmatrix}1\\1\\0\\0\\\end{bmatrix} x_1$ ($\lambda = 3$일 때), $\begin{bmatrix}1\\16\\4\\-4\\\end{bmatrix} x_1$ ($\lambda = 1$일 때)가 된다.

:::

# similarity

- $n\times n$ 행렬 $A$와 $B$에 대해, 역행렬이 존재하는 적당한 $n \times n$ 행렬 $P$가 있어 다음이 성립한다면,

  $$A = PBP^{-1}$$

  $A$는 $B$와 **similar**하다($A$ is similar to $B$)고 한다. 이때 $Q = P^{-1}$이라 하면 $B = (P^{-1})A(P^{-1})^{-1} = QAQ^{-1}$가 되므로, $A$가 $B$와 similar하면 $B$도 $A$와 similar하다. 따라서 이를 그냥 $A$와 $B$는 similar하다($A$ and $B$ are similar)고 한다.

- 행렬 $B$에 역행렬이 존재하는 행렬 $P$를 이용해 $B$와 similar한 행렬 $A = PBP^{-1}$를 만드는 과정을 **similar transformation**이라 한다.

- $n\times n$ 행렬 $A$와 $B$가 similar하다면, 두 행렬은 같은 characteristic equation을 가진다. 다시말해, 두 행렬은 같은 eigenvalue를 가진다.

  단, 역은 성립하지 않는다. 즉 두 행렬이 같은 characteristic equation을 가져도 similar하지 않을 수 있다.

- similar하다는 것과 [row equivalent](/math/linear-algebra/03-echelon-form)하다는 것은 전혀 관계없는 이야기이다. 일반적으로 elementary row operation은 행렬의 eigenvalue를 바꾼다.

# diagonalization

- $n \times n$ 정사각행렬 $A$와 $n \times n$ [대각 행렬](/math/linear-algebra/01-vector-matrix) $D$가 similar한 경우, 행렬 $A$는 **diagonalizable**하다고 한다. 다시말해, diagonalizable한 $n \times n$ 정사각행렬 $A$는 적당한 $n \times n$ 대각 행렬 $D$와 역행렬이 존재하는 $n \times n$ 행렬 $P$를 이용해 다음과 같이 나타낼 수 있다.

  $$A = PDP^{-1}$$

  diagonalizable한 행렬 $A$를 위와 같이 나누는 것을 **diagonalization** 또는 **eigenvalue decomposition**이라 한다.

- 모든 정사각행렬이 diagonalizable하진 않다. 어떤 행렬이 diagonalizable한지를 따지려면 다음 두 가지 방법을 사용할 수 있다.

  - eigenvector를 이용한 방법

      $n \times n$ 정사각행렬 $A$는 $n$개의 linearly independent한 eigenvector를 가질 때만 diagonalizable하다. 역으로, diagonalizable한 정사각행렬 $A$는 $n$개의 eigenvector를 가진다.

      [이때 $n$개의 linearly independent한 eigenvector들의 집합은 $\mathbb{R}^n$의 basis가 되는데,](/math/linear-algebra/08-vector-space) 이렇게 만들어진 $\mathbb{R}^n$의 basis를 **eigenvector basis**라 한다.

  - eigenvalue를 이용한 방법

      $A$는 $A$의 모든 eigenvalue들의 eigenspace의 [차원](/math/linear-algebra/08-vector-space)의 총합이 $n$일 때만 diagonalizable하다. 역으로, diagonalizable한 정사각행렬 $A$의 모든 eigenvalue들의 eigenspace의 차원의 총합은 $n$이다. 이때, eigenspace들의 차원의 총합이 $n$이라는 말은 characteristic polynomial이 일차식들로만 완전히 인수분해되고, 동시에 각 eigenvalue들의 eigenspace의 차원이 eigenvalue들의 multiplicity와 같다는 말이다.

  즉, $n \times n$ 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

  - $A$는 diagonalizable하다.
  - $A$는 $n$개의 linearly independent한 eigenvector를 가진다.
  - $A$의 모든 eigenvalue들의 eigenspace의 차원의 총합은 $n$이다.
  - characteristic polynomial은 일차식들로만 완전히 인수분해되고, 동시에 각 eigenvalue들의 eigenspace의 차원은 eigenvalue들의 multiplicity와 같다.
  {.equivalent}

- diagonalizable한 $n \times n$ 정사각행렬 $A = PDP^{-1}$의 $P$와 $D$는 다음과 같이 아주 쉽게 구할 수 있다.

  - $P$ : 모든 eigenvalue의 eigenspace의 basis의 합집합의 원소(eigenvector)들이 각 열을 구성하는, $n \times n$ 크기의 정사각행렬
  - $D$ : $P$의 각 열에 있는 eigenvector들과 상응하는 eigenvalue들을 순서대로 대각 성분으로 가지는, $n \times n$ 크기의 대각 행렬

  다시말해, diagonalizable한 행렬 $A$에 대해, $A \mathbf{v}_i = \lambda_i \mathbf{v}_i$를 만족시키는 $n$개의 eigenvalue와 eigenvalue의 eigenspace의 basis의 각 원소(eigenvector)들의 쌍 $(\lambda_1,\,\mathbf{v}_1)$, $(\lambda_2,\,\mathbf{v}_2)$, …, $(\lambda_n,\,\mathbf{v}_n)$에 대해, 다음과 같이 된다. (즉, $\lambda_i$와 $\lambda_j$는 같을 수도 있다. $\mathbf{v}_i$는 서로 linearly independent하다.)

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

- diagonalizable한 행렬 $A$의 거듭제곱 $A^k$는 다음과 같이 쉽게 구할 수 있다.

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

::: details 예제 : diagonalization

다음 행렬을 diagonalize해보자.

$$A = \begin{bmatrix}
5 & 0 & 0 & 0\\[0.5em]
0 & 5 & 0 & 0\\[0.5em]
1 & 4 & -3 & 0\\[0.5em]
-1 & -2 & 0 & -3\\[0.5em]
\end{bmatrix}$$

이 행렬의 eigenvalue $\lambda$와 eigenspace $\mathcal{B}$를 구하면 다음과 같이 된다.

- $\lambda = 5$ : $\mathcal{B}_{\lambda = 5} = \textrm{Span}\, \left \{ \begin{bmatrix}-8\\4\\1\\0\\\end{bmatrix},\,\begin{bmatrix}-16\\4\\0\\1\\ \end{bmatrix} \right \}$
- $\lambda = -3$ : $\mathcal{B}_{\lambda = -3} = \textrm{Span}\, \left \{ \begin{bmatrix}0\\0\\1\\0\\\end{bmatrix},\,\begin{bmatrix}0\\0\\0\\1\\ \end{bmatrix} \right \}$

$A$는 4개의 linearly independent한 eigenvector를 가지므로 diagonalizable하다. (또는 $\lambda = 5$의 eigenspace의 차원(2)과 $\lambda = -3$의 eigenspace의 차원(2)의 총합이 4이므로 diagonalizable하다고 검증할 수도 있다).

따라서 $A$는 다음과 같이 diagonalize된다.

$$A = PDP^{-1} = \begin{bmatrix}
-8 & -16 & 0 & 0\\[0.5em]
4 & 4 & 0 & 0\\[0.5em]
1 & 0 & 1 & 0\\[0.5em]
0 & 1 & 0 & 1\\[0.5em]
\end{bmatrix} \begin{bmatrix}
5 & 0 & 0 & 0\\[0.5em]
0 & 5 & 0 & 0\\[0.5em]
0 & 0 & -3 & 0\\[0.5em]
0 & 0 & 0 & -3\\[0.5em]
\end{bmatrix} \left( \begin{bmatrix}
-8 & -16 & 0 & 0\\[0.5em]
4 & 4 & 0 & 0\\[0.5em]
1 & 0 & 1 & 0\\[0.5em]
0 & 1 & 0 & 1\\[0.5em]
\end{bmatrix} \right )^{-1}$$

:::