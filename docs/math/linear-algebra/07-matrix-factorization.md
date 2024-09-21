---
title: "Matrix Factorization"
order: 7
date_created: "2021-09-27"
date_modified: "2024-09-21"
---

<style src="./styles.scss"></style>

# matrix factorization이란?

- 주어진 행렬을 둘 이상의 행렬의 곱으로 나타내는 것을 **matrix factorization** 혹은 **matrix decomposition**이라 한다.

  쉽게 생각해, (대수학에서의) 인수분해의 선형대수 버전이 matrix factorization이라 생각하면 된다.

  matrix factorization과 행렬곱(matrix multiplication)의 관계는 인수분해와 곱셈공식의 관계와 같다.

- 모든 다항식이 인수분해 가능한 것은 아니듯, 모든 행렬이 factorization 가능하진 않다.

# 다양한 matrix factorization 기법들

## LU factorization

- **정의**

  $m \times n$ 행렬 $A$를 다음과 같이 나누는 것을 **LU factorization**이라 한다.

  $$A = LU$$

  - $L$ : [$m \times m$ 행렬] unit lower triangular matrix (대각 성분이 모두 1이고 대각선 위는 모두 0인 정사각행렬)
  - $U$ : [$m \times n$ 행렬] $A$의 [echelon form](/math/linear-algebra/03-echelon-form)

  LU factorization에서 "L"은 lower triangular matrix의 l을, "U"는 upper triangular matrix(echelon matrix)의 u를 의미한다(원래 triangular matrix는 정사각행렬에서 정의되지만, 넓게 보면 echelon matrix도 upper triangular matrix라 생각할 수 있다). {.mt-1}

- **판별법**

  row replacement operation만을 사용하여 행렬 $A$를 echelon form으로 만들 수 있다면, $A$는 LU factorization할 수 있는 행렬이다.

- **구하는 방법**

  LU Factorization은 다음과 같은 순서로 찾을 수 있다.

  1. row replacement operation만을 사용하여 $m \times n$ 행렬 $A$를 echelon form $U$로 변환한다.
  2. $I_m$에 1번 과정에서 적용한 row replacement operation을 역순으로 적용하여 $L$을 만든다.
  {.border}

::: details 예제 : LU factorization

다음 행렬에 LU factorization을 적용해 보자.

$$A = \begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
-4 & -5 & 3 & -8 & 1\\[0.5em]
2 & -5 & -4 & 1 & 8\\[0.5em]
-6 & 0 & 7 & -3 & 1\\[0.5em]
\end{bmatrix}$$

$$A = \begin{bmatrix}
\columncolor{#e2e27a}\cellcolor{#c2ea9a}\color{black} 2 & 4 & -1 & 5 & -2\\[0.5em]
\color{black} -4 & -5 & 3 & -8 & 1\\[0.5em]
\color{black} 2 & -5 & -4 & 1 & 8\\[0.5em]
\color{black} -6 & 0 & 7 & -3 & 1\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & \columncolor{#e2e27a}\color{black} 4 & -1 & 5 & -2\\[0.5em]
0 & \cellcolor{#c2ea9a}\color{black} 3 & 1 & 2 & -3\\[0.5em]
0 & \color{black} -9 & -3 & -4 & 10\\[0.5em]
0 & \color{black} 12 & 4 & 12 & -5\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & 4 & -1 & \columncolor{#e2e27a}\color{black} 5 & -2\\[0.5em]
0 & 3 & 1 & \color{black} 2 & -3\\[0.5em]
0 & 0 & 0 & \cellcolor{#c2ea9a}\color{black} 2 & 1\\[0.5em]
0 & 0 & 0 & \color{black} 4 & 7\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & 4 & -1 & 5 & \columncolor{#e2e27a}\color{black} -2\\[0.5em]
0 & 3 & 1 & 2 & \color{black} -3\\[0.5em]
0 & 0 & 0 & 2 & \color{black} 1\\[0.5em]
0 & 0 & 0 & 0 & \cellcolor{#c2ea9a}\color{black} 5\\[0.5em]
\end{bmatrix} = U$$

이제 위에서 적용한 row replacement operation을 $I_m$에 역순으로 적용하면 $L$를 얻을 수 있다. 이때 이를 간단히 하는 방법이 있다. row replacement operation의 매 단계에서 pivot column(색칠한 열)들을 모으면 다음과 같다.

$$\begin{bmatrix}
\columncolor{#e2e27a}\cellcolor{#c2ea9a}\color{black} 2\\[0.5em]
\color{black} -4\\[0.5em]
\color{black} 2\\[0.5em]
\color{black} 6\\[0.5em]
\end{bmatrix}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{#e2e27a}\cellcolor{#c2ea9a}\color{black} 3\\[0.5em]
\color{black} -9\\[0.5em]
\color{black} 12\\[0.5em]
\end{bmatrix}
\end{array}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{#e2e27a}\cellcolor{#c2ea9a}\color{black} 2\\[0.5em]
\color{black} 4\\[0.5em]
\end{bmatrix}
\end{array}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{#e2e27a}\cellcolor{#c2ea9a}\color{black} 5\\[0.5em]
\end{bmatrix}
\end{array}$$

이 pivot column들을 첫 번째 행이 1이 되게 scaling한 후 모으면 그게 바로 $L$이 된다(대각선 위쪽에는 0을 채운다).

$$L = \begin{bmatrix}
1 & 0 & 0 & 0\\[0.5em]
-2 & 1 & 0 & 0\\[0.5em]
1 & -3 & 1 & 0\\[0.5em]
3 & 4 & 2 & 1\\[0.5em]
\end{bmatrix}$$

$$∴\,A = LU = \begin{bmatrix}
1 & 0 & 0 & 0\\[0.5em]
-2 & 1 & 0 & 0\\[0.5em]
1 & -3 & 1 & 0\\[0.5em]
3 & 4 & 2 & 1\\[0.5em]
\end{bmatrix} \begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
0 & 3 & 1 & 2 & -3\\[0.5em]
0 & 0 & 0 & 2 & 1\\[0.5em]
0 & 0 & 0 & 0 & 5\\[0.5em]
\end{bmatrix}$$

:::

## diagonalization (eigenvalue decomposition)

- **정의**

  [diagonalizable](/math/linear-algebra/10-eigenvector-eigenvalue)한 $n \times n$ 정사각행렬 $A$의 [eigenvalue](/math/linear-algebra/10-eigenvector-eigenvalue) $\lambda_1,\,\lambda_2,\,\cdots,\,\lambda_n$ ($\lambda_i$와 $\lambda_j$는 같을 수도 있다)과 이에 상응하는 [eigenvector](/math/linear-algebra/10-eigenvector-eigenvalue) $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_n$ ($A \mathbf{v}_i = \lambda_i \mathbf{v}_i$)가 주어졌다고 하자. 이때 $A$를 다음과 같이 나누는 것을 **diagonalization** 또는 **eigenvalue decomposition**이라 한다.

  $$A = PDP^{-1}$$

  - $P$ : [$n \times n$ 행렬] $A$의 eigenvector들로 이루어진 행렬

    $$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}

    \begin{bmatrix}
    \vertbar & \vertbar & {} & \vertbar \\
    \mathbf{v_1} & \mathbf{v_2} & \cdots & \mathbf{v_n}\\
    \vertbar & \vertbar & {} & \vertbar \\
    \end{bmatrix}$$

  - $D$ : [$n \times n$ 행렬] $A$의 eigenvalue들로 이루어진 대각 행렬

    $$\begin{bmatrix}
    \lambda_1 & 0 & \cdots & 0\\[0.5em]
    0 & \lambda_2 & \cdots & 0\\[0.5em]
    \vdots & \vdots & \ddots & \vdots\\[0.5em]
    0 & 0 & \cdots & \lambda_n\\[0.5em]
    \end{bmatrix}$$

- **판별법**

  diagonalization할 수 있는 행렬을 **diagonalizable**하다고 한다. 어떤 행렬이 diagonalizable한지를 따지려면 다음 두 가지 방법을 사용할 수 있다.

  - **eigenvector를 이용한 방법**

    $n \times n$ 정사각행렬 $A$는 $n$개의 linearly independent한 eigenvector를 가질 때만 diagonalizable하다. 역으로, diagonalizable한 정사각행렬 $A$는 $n$개의 eigenvector를 가진다.

    [이때 $n$개의 linearly independent한 eigenvector들의 집합은 $\mathbb{R}^n$의 basis가 되는데,](/math/linear-algebra/08-vector-space) 이렇게 만들어진 $\mathbb{R}^n$의 basis를 **eigenvector basis**라 한다.{.mt-1}

  - **eigenvalue를 이용한 방법**

    $A$는 $A$의 모든 eigenvalue들의 eigenspace의 [차원](/math/linear-algebra/08-vector-space)의 총합이 $n$일 때만 diagonalizable하다. 역으로, diagonalizable한 정사각행렬 $A$의 모든 eigenvalue들의 eigenspace의 차원의 총합은 $n$이다. 이때, eigenspace들의 차원의 총합이 $n$이라는 말은 characteristic polynomial이 일차식들로만 완전히 인수분해되고, 동시에 각 eigenvalue들의 eigenspace의 차원이 eigenvalue들의 multiplicity와 같다는 말이다.
    
  좀더 자세한 얘기는 [해당 문서](/math/linear-algebra/10-eigenvector-eigenvalue)를 참고하자.

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

- **참고**
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

  - 만약 $A$가 [symmetric](/math/linear-algebra/12-symmetric-matrix)하다면 $A$는 **항상** diagonalizable하고, 그 형태는 다음과 같다.

    $$A = PDP^{-1} = PDP^T$$

    - $P$ : [$n \times n$ 행렬] $A$의 eigenvector들로 이루어진 [orthogonal matrix](/math/linear-algebra/11-orthogonality)

      $$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}

      \begin{bmatrix}
      \vertbar & \vertbar & {} & \vertbar \\
      \mathbf{v_1} & \mathbf{v_2} & \cdots & \mathbf{v_n}\\
      \vertbar & \vertbar & {} & \vertbar \\
      \end{bmatrix}$$

    - $D$ : [$n \times n$ 행렬] $A$의 eigenvalue들로 이루어진 대각 행렬

      $$\begin{bmatrix}
      \lambda_1 & 0 & \cdots & 0\\[0.5em]
      0 & \lambda_2 & \cdots & 0\\[0.5em]
      \vdots & \vdots & \ddots & \vdots\\[0.5em]
      0 & 0 & \cdots & \lambda_n\\[0.5em]
      \end{bmatrix}$$

    symmetric한 행렬 $A$는 diagonalization할 때 역행렬을 구하는 연산을 할 필요가 없기에 계산 복잡도가 급감한다.

## QR factorization

- **정의**

  linearly independent한 열들을 가진 $m \times n$ 행렬 $A$를 다음과 같이 나누는 것을 **QR factorization**이라 한다.

  $$A = QR$$

  - $Q$ : [$m \times n$ 행렬] $\textrm{Col}\,A$의 [orthonormal basis](/math/linear-algebra/11-orthogonality)의 원소들로 이루어진 행렬
  - $R$ : [$n \times n$ 행렬] 대각 성분이 모두 양수인 [upper triangular matrix](/math/linear-algebra/01-vector-matrix)

- **판별법**

  $m \times n$ 행렬 $A$의 열들이 linearly independent하기만 하면 항상 QR factorization이 가능하다.

- **구하는 방법**

  - $Q$ : [Gram-Schmidt process](/math/linear-algebra/11-orthogonality) 등의 방법을 이용해 구한다.
  
  - $R$ : 다음 식을 이용해 구한다.
     
    $$R = Q^T A$$
  
  {.border}

# SVD (singular value decomposition)

- **정의**

  $\textrm{Rank}(A) = r$인 $m \times n$ 행렬 $A$는 다음과 같이 분해하는 것을 SVD(singular value decomposition)이라 한다.

  $$A = U \Sigma V^T$$

  - $U$ : [$m \times m$ 행렬] orthonormal matrix. $U$의 각 열들을 **left singular vector**라 한다. $U$의 첫 $r$개의 열들은 $\mathbf{u}_i = \displaystyle\frac{1}{\sigma_i} A \mathbf{v}_i$로 계산하고, 나머지 열들은 orthonormal matrix가 되도록 적당히 맞춰준다.

  - $\Sigma$ : [$m \times n$ 행렬] 첫 $r$개의 대각성분은 $A$의 0이 아닌 singular value $\sigma_1 \ge \sigma_2 \ge \cdots \ge \sigma_r$들의 크기 순서대로, 나머지 대각성분 및 다른 위치의 값들은 모두 0으로 채워진 행렬 ([대각 행렬](/math/linear-algebra/01-vector-matrix)과 유사)

    $$\Sigma = \begin{bmatrix}
    \sigma_1 & 0 & \cdots & 0 & \cdots & 0 \\
    0 & \sigma_2 & \cdots & 0 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots & {} & \vdots \\
    0 & 0 & \cdots & \sigma_r & \cdots & 0\\
    \vdots & \vdots & {} & \vdots & \ddots & \vdots \\
    0 & 0 & \cdots & 0 & \cdots & 0\\
    \end{bmatrix}$$

  - $V$ : [$n \times n$ 행렬] orthonormal matrix. $V$의 각 열들을 **right singular vector**라 한다. $V$의 첫 $r$개의 열들은 $\mathbf{v}_i$이고, 나머지 열들은 orthonormal matrix가 되도록 적당히 맞춰준다.

  $U$, $V$는 유일하게 결정되지 않지만, $\Sigma$는 $A$에 대해 유일하게 결정된다.

- **판별법**

  $m \times n$ 행렬 $A$에는 항상 SVD를 적용할 수 있다.

::: details 예제 : SVD

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

이 행렬의 eigenvalue는 $\lambda_1 = 360$, $\lambda_2 = 90$, $\lambda_3 = 0$이고, 각각 상응하는 eigenvector는 다음과 같다.

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

이를 이용해 $\Sigma$, $V$, $U$를 만든다. $\sigma_1 = \sqrt{\lambda_1} = 6 \sqrt{10}$, $\sigma_2 = \sqrt{\lambda_2} = 3 \sqrt{10}$, $\sigma_3 = \sqrt{\lambda_3} = 0$이므로,

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

($(*)$에는 $V$를 orthonormal matrix로 만들기 위하여 아무 값이나 사용해도 되기에, $\mathbf{v}_3$의 값을 사용했다.)

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

:::

# reduced SVD

- **정의**

  $\textrm{Rank}(A) = r$인 $m \times n$ 행렬 $A$는 다음과 같이 분해할 수도 있다.

  $$A = U_r D V_r^T$$

  - $U_r$ : [$m \times r$ 행렬] $U$의 앞 $r$개의 열들로만 구성된 행렬. 즉, 각 열이 $\mathbf{u}_i = \displaystyle\frac{1}{\sigma_i} A \mathbf{v}_i$로 계산되는 행렬.
  - $D$ : [$r \times r$ 행렬] $A$의 0이 아닌 singular value $\sigma_1 \ge \sigma_2 \ge \cdots \ge \sigma_r$들의 크기 순서대로 대각 성분이 구성된 채워진 대각 행렬

    $$D = \begin{bmatrix}
    \sigma_1 & 0 & \cdots & 0 \\
    0 & \sigma_2 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots\\
    0 & 0 & \cdots & \sigma_r\\
    \end{bmatrix}$$

  - $V_r$ : [$n \times r$ 행렬] $V$의 앞 $r$개의 열들로만 구성된 행렬. 즉, 각 열이 $\mathbf{v}_i$인 행렬.

- **판별법**

  $m \times n$ 행렬 $A$에는 항상 SVD를 적용할 수 있다.

::: details 예제 : reduced SVD

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

이 행렬의 eigenvalue는 $\lambda_1 = 360$, $\lambda_2 = 90$, $\lambda_3 = 0$이고, 각각 상응하는 eigenvector는 다음과 같다.

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

이를 이용해 $D$, $V_r$, $U_r$를 만든다. $\sigma_1 = \sqrt{\lambda_1} = 6 \sqrt{10}$, $\sigma_2 = \sqrt{\lambda_2} = 3 \sqrt{10}$, $\sigma_3 = \sqrt{\lambda_3} = 0$에서 $r = 2$이므로,

$$D = \begin{bmatrix}
6 \sqrt{10} & 0\\
0 & 3 \sqrt{10}\\
\end{bmatrix}$$

$$V_r = \begin{bmatrix}
\mathbf{v}_1 & \mathbf{v}_2\\
\end{bmatrix} = \begin{bmatrix}
\frac{1}{3} & -\frac{2}{3}\\
\frac{2}{3} & -\frac{1}{3}\\
\frac{2}{3} & \frac{2}{3}\\
\end{bmatrix}$$

$$U_r = \begin{bmatrix}
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
6 \sqrt{10} & 0\\
0 & 3 \sqrt{10}\\
\end{bmatrix} \begin{bmatrix}
\frac{1}{3} & -\frac{2}{3}\\
\frac{2}{3} & -\frac{1}{3}\\
\frac{2}{3} & \frac{2}{3}\\
\end{bmatrix}^T \\[0.5em]
&= \begin{bmatrix}
\frac{3}{\sqrt{10}} & \frac{1}{\sqrt{10}}\\
\frac{1}{\sqrt{10}} & -\frac{3}{\sqrt{10}}\\
\end{bmatrix} \begin{bmatrix}
6 \sqrt{10} & 0\\
0 & 3 \sqrt{10}\\
\end{bmatrix}  \begin{bmatrix}
\frac{1}{3} & \frac{2}{3} & \frac{2}{3}\\
-\frac{2}{3} & -\frac{1}{3} & \frac{2}{3}\\
\end{bmatrix}\\[0.5em]
\end{align}$$

:::