---
title: "역행렬 (Inverse)"
order: 6
date_created: "2021-09-26"
date_modified: "2022-01-28"
---

<style src="./styles.scss"></style>

# 역행렬(inverse)이란?

- $n \times n$ 정사각행렬 $A$에 대해, 다음을 만족하는 $n \times n$ 정사각행렬 $C$가 존재한다면,

  $$CA = AC = I$$

  행렬 $A$는 **역행렬이 존재한다(invertible)**, 또는 **non-singular하다**고 한다(반대로, 역행렬이 존재하지 않는 행렬은 **singular**하다고 한다). 그리고 행렬 $C$를 행렬 $A$의 **역행렬(inverse)** 이라 하고 기호로 다음과 같이 나타낸다.

  $$C = A^{-1}$$

- 행렬의 역행렬이 존재한다면, 그 역행렬은 유일하다.

  ::: details 증명 : 역행렬의 유일성

  (귀류법) invertible한 행렬 $A \in \mathbb{R}^{n \times n}$의 역행렬이 유일하지 않아, $A$의 역행렬이 $B$, $C$(단, $B \neq C$), 이렇게 두 개 있다고 해 보자.

  그럼 다음 식이 성립해야 한다.

  $$B = BI = B(AC) = (BA)C = IC = C$$

  이는 전제 $B \neq C$에 모순이므로, 귀류법에 의해 invertible한 행렬의 역행렬은 유일하다는 것을 알 수 있다.

  :::

- 역행렬은 다음과 같은 성질이 있다.

  - 행렬 $A$의 역행렬이 존재하면, 행렬 $A^{-1}$의 역행렬도 존재하며, 그 값은 $A$이다 : $(A^{-1})^{-1} = A$
  - 역행렬이 존재하는 행렬 $A \in \mathbb{R}^{n \times n}$, $B \in \mathbb{R}^{n \times n}$에 대해, $AB$, $BA$도 역행렬이 존재하며, 각각 다음과 같이 계산된다 : $(AB)^{-1} = B^{-1} A^{-1}$, $(BA)^{-1} = A^{-1} B^{-1}$
  - 행렬 $A$의 역행렬이 존재하면, 행렬 $A^{T}$의 역행렬도 존재하며, 다음과 같이 계산된다 : $(A^{T})^{-1} = (A^{-1})^{T}$
  - 행렬 $A$, $B$에 대해, 만약 $AB = I$라면 $A$와 $B$는 모두 역행렬이 존재하며, 각각 다음과 같이 계산된다 : $A^{-1} = B$, $B^{-1} = A$
  {.border}

- 정사각행렬 $A \in \mathbb{R}^{n \times n}$에 대해, 다음은 모두 동치이다.

  - $A$의 역행렬이 존재한다(invertible).
  - $CA = I$를 만족시키는 $C \in \mathbb{R}^{n \times n}$가 존재한다.
  - $AD = I$를 만족시키는 $D \in \mathbb{R}^{n \times n}$가 존재한다.
  - $A$는 $I_n$과 [row equivalent](/math/linear-algebra/03-echelon-form)하다.
  - $A$는 $n$개의 [pivot position](/math/linear-algebra/03-echelon-form)을 가진다.
  - $A \mathbf{x} = \mathbf{0}$은 오직 [trivial solution](/math/linear-algebra/02-linear-system)만을 가진다.
  - $A$의 열들은 [linearly independent](/math/linear-algebra/04-linear-combination)한 집합을 이룬다.
  - $A$의 열들은 $\mathbb{R}^n$을 [span](/math/linear-algebra/04-linear-combination)한다.
  - 모든 $\mathbf{b} \in \mathbb{R}^n$에 대해, $A \mathbf{x} = \mathbf{b}$는 [consistent](/math/linear-algebra/02-linear-system)하다.
  - 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$은 $\mathbb{R}^n$을 $\mathbb{R}^n$로 [매핑(mapping)](/math/linear-algebra/05-linear-transformation)한다.
  - 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$은 [일대일(one-to-one)](/math/linear-algebra/05-linear-transformation)이다.
  - $A^T$의 역행렬이 존재한다.
  - $A$의 열들의 집합은 $\mathbb{R}^n$의 [basis](/math/linear-algebra/08-vector-space)이다.
  - $\textrm{Col}\,A = \textrm{Col}\,A^T = \textrm{Row}\,A = \textrm{Row}\,A^T = (\textrm{Nul}\,A)^\perp = (\textrm{Nul}\,A^T)^\perp = \mathbb{R}^n$
  - [$\textrm{dim}(\textrm{Col}\,A) = n$](/math/linear-algebra/08-vector-space)
  - [$\textrm{Rank}(A) = n$](/math/linear-algebra/08-vector-space)
  - $\textrm{Nul}\,A = \textrm{Nul}\,A^T = (\textrm{Col}\,A)^\perp = (\textrm{Col}\,A^T)^\perp = (\textrm{Row}\,A)^\perp = (\textrm{Row}\,A^T)^\perp = \\{\mathbf{0}\\}$
  - [$\textrm{dim}(\textrm{Nul}\,A) = 0$](/math/linear-algebra/08-vector-space)
  - [$\textrm{det}\,A \neq 0$](/math/linear-algebra/09-determinant)
  - 0은 $A$의 [eigenvalue](/math/linear-algebra/10-eigenvector-eigenvalue)가 아니다.
  - $A$는 $n$개의 0이 아닌 [singular value](/math/linear-algebra/12-symmetric-matrix)를 가진다.
  - $A$는 0인 [singular value](/math/linear-algebra/12-symmetric-matrix)를 가지지 않는다.
  {.equivalent}

# left inverse, right inverse

- $m \times n$ 행렬 $A$에 대해, 다음을 만족하는 $n \times m$ 행렬 $C$를 $A$의 **left inverse (matrix)** 라 한다.

  $$CA = I$$

  하나 이상의 left inverse를 가지는 행렬을 **left-invertible**하다고 한다.

- $m \times n$ 행렬 $A$에 대해, 다음을 만족하는 $n \times m$ 행렬 $B$를 $A$의 **right inverse (matrix)** 라 한다.

  $$AB = I$$

  하나 이상의 right inverse를 가지는 행렬을 **right-invertible**하다고 한다.

- 역행렬과는 다르게, left inverse와 right inverse는 유일하지 않다.

- 역행렬은 left inverse와 right inverse가 둘 다 존재하는 경우로 이해할 수 있다. left inverse와 right inverse가 둘 다 존재하면 이 둘은 항상 같다.

  행렬 $A$의 left inverse를 $C$, right inverse를 $B$라고 하면,

  $$C = CI = C(AB) = (CA)B = IB = B$$

- $m \times n$ 행렬 $A$에 대해, 다음이 성립한다.

  - $m \ge n$인 경우에만 $A$는 left-invertible하다.
  - $m \le n$인 경우에만 $A$는 right-invertible하다.
  {.border}

- $m \times n$ 행렬 $A$에 대해, 만약 $A$가 left-invertible하면 $\textrm{Nul}\,A = \\{ \mathbf{0} \\}$이다. 역으로, $\textrm{Nul}\,A = \\{ \mathbf{0} \\}$이면 $A$는 left-invertible하다.

  즉, $m \times n$ 행렬 $A$에 대해 다음은 모두 동치이다. {.mt-1}

  - $A$는 left-invertible하다.
  - $\textrm{Nul}\,A = \\{ \mathbf{0} \\}$
  {.equivalent}

- $m \times n$ 행렬 $A$에 대해, 만약 $A$가 right-invertible하면 $\textrm{Col}\,A = \mathbb{R}^n$이다. 역으로, $\textrm{Col}\,A = \mathbb{R}^n$이면 $A$는 right-invertible하다.

  즉, $m \times n$ 행렬 $A$에 대해 다음은 모두 동치이다. {.mt-1}

  - $A$는 right-invertible하다.
  - $\textrm{Col}\,A = \mathbb{R}^n$
  {.equivalent}

# 역행렬 계산하기

## 2 × 2 행렬

- $2 \times 2$ 행렬의 역행렬은 쉽게 찾을 수 있다.

  $A = \displaystyle \begin{bmatrix} a & b \\[0.5em] c & d \end{bmatrix}$에 대해, $ad-bc \neq 0$이면 역행렬 $A^{-1}$는 다음과 같이 계산된다.

  $$A^{-1} = \frac {1}{ad-bc} \begin{bmatrix}
  d & -b \\[0.5em]
  -c & a \\[0.5em]
  \end{bmatrix}$$

  $ad-bc = 0$이면 역행렬이 존재하지 않는다.

- 이때 $ad-bc$를 $2 \times 2$ 행렬 $A$의 **판별식(determinant)** 이라 한다. 판별식에 관한 자세한 내용은 [해당 문서](/math/linear-algebra/09-determinant)를 참조하기 바란다.

- $2 \times 2$ 행렬의 판별식이 0이 아니면, 역행렬이 존재한다(invertible). 역으로, $2 \times 2$ 행렬의 역행렬이 존재하면, 판별식이 0이 아니다.

  즉, $2 \times 2$ 행렬 $A$에 대해, 다음은 모두 동치이다. {.mt-1}

  - $A$의 판별식이 0이 아니다.
  - $A$의 역행렬이 존재한다.
  {.equivalent}


## elementary row operation을 이용한 방법

- 정사각행렬 $A \in \mathbb{R}^{n \times n}$는 $I_n$과 [row equivalent](/math/linear-algebra/03-echelon-form)한 경우에만 역행렬이 존재한다. 역으로, 역행렬이 존재하면 정사각행렬 $A \in \mathbb{R}^{n \times n}$은 $I_n$과 row equivalent하다.

  즉, 정사각행렬 $A \in \mathbb{R}^{n \times n}$에 대해, 다음은 모두 동치이다.{.mt-1}

  - $A$는 $I_n$과 row equivalent하다.
  - $A$의 역행렬이 존재한다.
  {.equivalent}

- 이때, (역행렬이 존재하는) $A \in \mathbb{R}^{n \times n}$를 $I_n$으로 바꾸는 [elementary row operation](/math/linear-algebra/03-echelon-form)은 $I_n$을 $A^{-1}$로 바꾸는 elementary row operation과 동일하다.

  다시 말해, augmented matrix $[\,A \quad I_n\,]$을 row reduce하면 $[\,I_n \quad A^{-1}\,]$이 된다. 이를 이용해 역행렬을 구할 수 있다.{.mt-1}

  ::: details 예제 : elementary row operation을 이용한 역행렬 계산

  $$A = \begin{bmatrix}
  0 & 1 & 2\\[0.5em]
  1 & 0 & 3\\[0.5em]
  4 & -3 & 8\\[0.5em]
  \end{bmatrix}$$

  의 역행렬을 구해보자.

  $$\begin{align}
  [\,A \quad I_n\,]
  &= \begin{bmatrix}
  0 & 1 & 2 & 1 & 0 & 0\\[0.5em]
  1 & 0 & 3 & 0 & 1 & 0\\[0.5em]
  4 & -3 & 8 & 0 & 0 & 1\\[0.5em]
  \end{bmatrix}
  \sim \begin{bmatrix}
  1 & 0 & 3 & 0 & 1 & 0\\[0.5em]
  0 & 1 & 2 & 1 & 0 & 0\\[0.5em]
  4 & -3 & 8 & 0 & 0 & 1\\[0.5em]
  \end{bmatrix}\\[0.5em]
  &\sim \begin{bmatrix}
  1 & 0 & 3 & 0 & 1 & 0\\[0.5em]
  0 & 1 & 2 & 1 & 0 & 0\\[0.5em]
  0 & -3 & -4 & 0 & -4 & 1\\[0.5em]
  \end{bmatrix}
  \sim \begin{bmatrix}
  1 & 0 & 3 & 0 & 1 & 0\\[0.5em]
  0 & 1 & 2 & 1 & 0 & 0\\[0.5em]
  0 & 0 & 2 & 3 & -4 & 1\\[0.5em]
  \end{bmatrix}\\[0.5em]
  &\sim \begin{bmatrix}
  1 & 0 & 3 & 0 & 1 & 0\\[0.5em]
  0 & 1 & 2 & 1 & 0 & 0\\[0.5em]
  0 & 0 & 1 & 3/2 & -2 & 1/2\\[0.5em]
  \end{bmatrix}
  \sim \begin{bmatrix}
  1 & 0 & 0 & -9/2 & 7 & -3/2\\[0.5em]
  0 & 1 & 0 & -2 & 4 & -1\\[0.5em]
  0 & 0 & 1 & 3/2 & -2 & 1/2\\[0.5em]
  \end{bmatrix}
  = [\,I_n \quad A^{-1}\,]
  \end{align}$$

  따라서 $A^{-1}$은 다음과 같이 된다.

  $$A^{-1} = \begin{bmatrix}
  -9/2 & 7 & -3/2\\[0.5em]
  -2 & 4 & -1\\[0.5em]
  3/2 & -2 & 1/2\\[0.5em]
  \end{bmatrix}$$

  :::

## Cramer's rule을 이용한 방법

- $n \times n$ 정사각행렬 $A$에 대해, 다음과 같은 [($i$-$j$)-cofactor](/math/linear-algebra/09-determinant)들의 행렬을 $A$의 **adjugate** 혹은 $A$의 **classical adjoint**라 하고, 기호로 $\textrm{adj}\,A$라 쓴다.

  $$\textrm{adj}\,A = \begin{bmatrix}
  C_{11} & C_{21} & \cdots & C_{n1}\\[0.5em]
  C_{12} & C_{22} & \cdots & C_{n2}\\[0.5em]
  \vdots & \vdots & \ddots & \vdots\\[0.5em]
  C_{1n} & C_{2n} & \cdots & C_{nn}\\[0.5em]
  \end{bmatrix}$$

  *(주의 : $C_{ij}$가 $i$열 $j$행에 있음에 유의하자!)* {.text-align-center}

- 역행렬이 존재하는 행렬 $A$의 역행렬 $A^{-1}$은 다음과 같이 구할 수 있다.

  $$A^{-1} = \frac{1}{\textrm{det}\,A} \textrm{adj}\,A$$

  ::: details 예제 : Cramer's rule을 이용한 역행렬 계산

  $$A = \begin{bmatrix}
  2 & 1 & 3\\[0.5em]
  1 & -1 & 1\\[0.5em]
  1 & 4 & -2\\[0.5em]
  \end{bmatrix}$$

  의 역행렬을 구해보자.

  우선 9개의 cofactor를 구해야 한다.

  $$\begin{array}{r l r l r l}
  C_{11} &= +\begin{vmatrix}
  -1 & 1\\[0.5em]
  4 & -2\\[0.5em]
  \end{vmatrix} = -2,\quad
  &C_{12} &= -\begin{vmatrix}
  1 & 1\\[0.5em]
  1 & -2\\[0.5em]
  \end{vmatrix} = 3,\quad
  &C_{13} &= +\begin{vmatrix}
  1 & -1\\[0.5em]
  1 & 4\\[0.5em]
  \end{vmatrix} = 5\\[0.5em]
  C_{21} &= -\begin{vmatrix}
  1 & 3\\[0.5em]
  4 & -2\\[0.5em]
  \end{vmatrix} = 14,\quad
  &C_{22} &= +\begin{vmatrix}
  2 & 3\\[0.5em]
  1 & -2\\[0.5em]
  \end{vmatrix} = -7,\quad
  &C_{23} &= -\begin{vmatrix}
  2 & 1\\[0.5em]
  1 & 4\\[0.5em]
  \end{vmatrix} = -7\\[0.5em]
  C_{31} &= +\begin{vmatrix}
  1 & 3\\[0.5em]
  -1 & 1\\[0.5em]
  \end{vmatrix} = 4,\quad
  &C_{32} &= -\begin{vmatrix}
  2 & 3\\[0.5em]
  1 & 1\\[0.5em]
  \end{vmatrix} = 1,\quad
  &C_{33} &= +\begin{vmatrix}
  2 & 1\\[0.5em]
  1 & -1\\[0.5em]
  \end{vmatrix} = -3\\[0.5em]
  \end{array}$$

  $$\begin{array}{cc}
  \Rightarrow &\textrm{det}\,A = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13} = 14,\\[0.5em]
  {} &\textrm{adj}\,A = \begin{bmatrix}
  -2 & 14 & 4\\[0.5em]
  3 & -7 & 1\\[0.5em]
  5 & -7 & -3\\[0.5em]
  \end{bmatrix}\\[0.5em]
  \end{array}$$

  따라서, $A^{-1}$은 다음과 같이 계산된다.

  $$A^{-1} = \frac{1}{\textrm{det}\,A} \textrm{adj}\,A = \frac{1}{14}\begin{bmatrix}
  -2 & 14 & 4\\[0.5em]
  3 & -7 & 1\\[0.5em]
  5 & -7 & -3\\[0.5em]
  \end{bmatrix}$$

  :::

## orthonormal column들을 가지는 행렬

- [orthonormal matrix](/math/linear-algebra/11-orthogonality) $U$의 역행렬 $U^{-1}$는 $U^T$와 같다.

  $$U^{-1} = U^T$$

