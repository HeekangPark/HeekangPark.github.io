---
title: "Matrix Factorization"
order: 7
date_created: "2021-09-27"
date_modified: "2021-10-23"
---

# matrix factorization이란?

<ul>

<li><div markdown="block">

주어진 행렬을 둘 이상의 행렬의 곱으로 나타내는 것을 **matrix factorization** 혹은 **matrix decomposition**이라 한다.

쉽게 생각해, (대수학에서의) 인수분해의 선형대수 버전이 matrix factorization이라 생각하면 된다.

matrix factorization과 행렬곱(matrix multiplication)의 관계는 인수분해와 곱셈공식의 관계와 같다.

</div></li>

<li><div markdown="block">

모든 다항식이 인수분해 가능한 것은 아니듯, 모든 행렬이 factorization 가능하진 않다.

</div></li>

</ul>

# 다양한 matrix factorization 기법들

## LU factorization

<ul>

<li><div markdown="block">

$m \times n$ 행렬 $A$를 다음과 같이 나누는 것을 **LU factorization**이라 한다.

$$A = LU$$

- $L$ : (크기 $m \times m$) unit lower triangular matrix (대각 성분이 모두 1이고 대각선 위는 모두 0인 정사각행렬)
- $U$ : (크기 $m \times n$) $A$의 [echelon form](/linear_algebra/echelon-form)

LU factorization에서 "L"은 lower triangular matrix의 l을, "U"는 upper triangular matrix(echelon matrix)의 u를 의미한다(원래 triangular matrix는 정사각행렬에서 정의되지만, 넓게 보면 echelon matrix도 upper triangular matrix라 생각할 수 있다).

</div></li>

<li><div markdown="block">

LU Factorization은 다음과 같은 순서로 찾을 수 있다.

1. row replacement operation만을 사용하여 $m \times n$ 행렬 $A$를 echelon form $U$로 변환한다.
2. $I\_m$에 1번 과정에서 적용한 row replacement operation을 역순으로 적용하여 $L$을 만든다.

만약 row replacement operation만을 사용하여 행렬 $A$를 echelon form으로 만들 수 없다면, $A$는 LU factorization할 수 없는 행렬이다.

</div></li>

<li><div markdown="block">

예를 들어, 다음 행렬에 LU factorization을 적용해 보자.

$$A = \begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
-4 & -5 & 3 & -8 & 1\\[0.5em]
2 & -5 & -4 & 1 & 8\\[0.5em]
-6 & 0 & 7 & -3 & 1\\[0.5em]
\end{bmatrix}$$


$$A = \begin{bmatrix}
\columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 2 & 4 & -1 & 5 & -2\\[0.5em]
-4 & -5 & 3 & -8 & 1\\[0.5em]
2 & -5 & -4 & 1 & 8\\[0.5em]
-6 & 0 & 7 & -3 & 1\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
0 & \columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 3 & 1 & 2 & -3\\[0.5em]
0 & -9 & -3 & -4 & 10\\[0.5em]
0 & 12 & 4 & 12 & -5\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
0 & 3 & 1 & 2 & -3\\[0.5em]
0 & 0 & 0 & \columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 2 & 1\\[0.5em]
0 & 0 & 0 & 4 & 7\\[0.5em]
\end{bmatrix}
\sim
\begin{bmatrix}
2 & 4 & -1 & 5 & -2\\[0.5em]
0 & 3 & 1 & 2 & -3\\[0.5em]
0 & 0 & 0 & 2 & 1\\[0.5em]
0 & 0 & 0 & 0 & \columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 5\\[0.5em]
\end{bmatrix} = U$$

이제 위에서 적용한 row replacement operation을 $I\_m$에 역순으로 적용하면 $L$를 얻을 수 있다. 이때 이를 간단히 하는 방법이 있다. row replacement operation의 매 단계에서 pivot column(색칠한 열)들을 모으면 다음과 같다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 2\\[0.5em]
-4\\[0.5em]
2\\[0.5em]
6\\[0.5em]
\end{bmatrix}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 3\\[0.5em]
-9\\[0.5em]
12\\[0.5em]
\end{bmatrix}
\end{array}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 2\\[0.5em]
4\\[0.5em]
\end{bmatrix}
\end{array}
\quad
\begin{array}
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\vphantom{ }\\[0.5em]
\begin{bmatrix}
\columncolor{ {{ site.data.color.mathjaxHighlight }} } \cellcolor{#FFF29F} 5\\[0.5em]
\end{bmatrix}
\end{array}$$

이 pivot column들을 첫 번째 행이 1이 되게 scaling한 후 모으면 그게 바로 $L$이 된다(대각선 위쪽에는 0을 채운다).

$$L = \begin{bmatrix}
1 & 0 & 0 & 0\\[0.5em]
-2 & 1 & 0 & 0\\[0.5em]
1 & -3 & 1 & 0\\[0.5em]
3 & 4 & 2 & 1\\[0.5em]
\end{bmatrix}$$

{:.mathjax-left-align}
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

</div></li>

</ul>

## diagonalization (eigenvalue decomposition)

<ul>

<li><div markdown="block">

[diagonalizable](/linear_algebra/eigenvector-eigenvalue)한 $n \times n$ 정사각행렬 $A$의 [eigenvalue](/linear_algebra/eigenvector-eigenvalue) $\lambda\_1,\,\lambda\_2,\,\cdots,\,\lambda\_n$과 이에 상응하는 [eigenvector](/linear_algebra/eigenvector-eigenvalue) $\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_n$가 주어졌다고 하자($\lambda\_i$와 $\lambda\_j$는 같을 수도 있다. $A \mathbf{v}\_i = \lambda\_i \mathbf{v}\_i$). 이때 $A$를 다음과 같이 나누는 것을 **diagonalization** 또는 **eigenvalue decomposition**이라 한다.

$$A = PDP^{-1}$$

- $P$ : (크기 $n \times n$) $A$의 eigenvector들로 이루어진 행렬

    $$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}

    \begin{bmatrix}
    \vertbar & \vertbar & {} & \vertbar \\
    \mathbf{v_1} & \mathbf{v_2} & \cdots & \mathbf{v_n}\\
    \vertbar & \vertbar & {} & \vertbar \\
    \end{bmatrix}$$

- $D$ : (크기 $n \times n$) $A$의 eigenvalue들로 이루어진 대각 행렬

    $$\begin{bmatrix}
    \lambda_1 & 0 & \cdots & 0\\[0.5em]
    0 & \lambda_2 & \cdots & 0\\[0.5em]
    \vdots & \vdots & \ddots & \vdots\\[0.5em]
    0 & 0 & \cdots & \lambda_n\\[0.5em]
    \end{bmatrix}$$

좀더 자세한 얘기는 [해당 문서](/linear_algebra/eigenvector-eigenvalue)를 참고하자.

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