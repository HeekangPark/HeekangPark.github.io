---
title: "벡터와 행렬"
order: 1
date_created: "2021-09-13"
date_modified: "2021-10-15"
---

# 벡터(vector)란?

<ul>

<li><div markdown="block">

여러 개의 값(또는 수식)을 하나의 순서 있는 덩어리(ordered list)로 묶어놓은 것. $n$-tuple 벡터, 혹은 그냥 줄여서 $n$-벡터라 하면 다음처럼 $n$개의 값들을 묶어놓은 벡터를 의미한다.

$$\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}$$

벡터는 일반적으로 위와 같이 세로 형태로 표현하지만, 표기의 편의를 위해 다음과 같이 가로 형태로 쓰기도 한다(가로로 작성되어 있어도 위와 같은 형태로 작성되어 있는 것이라 이해해야 한다).

$$\mathbf{x} = (x_1,\,x_2,\,\cdots,\,x_n)$$

이때 $x\_i$ ($i = 1,\,2,\,\cdots,\,n$)을 벡터의 $i$번째 **요소(element)**, **성분(component)**, 혹은 **항목(entry)**이라 한다.

</div></li>

<li><div markdown="block">

모든 $n$-벡터들의 집합을 $\mathbb{R}^n$이라 표기한다.

</div></li>

<li><div markdown="block">

두 벡터가 **같다(equal)**는 것은 같은 위치에 있는 성분들이 각각 모두 같다는 뜻이다.

</div></li>

<li><div markdown="block">

특수한 벡터

- $\mathbf{0}$ (영벡터, zero vector) : 모든 성분이 0인 벡터. $x\_i = 0$ ($i = 1,\,2,\,\cdots,\,n$)
- $\mathbf{e}\_i$ ($i$번째 단위 벡터, $i$<sup>th</sup> unit vector, $i$<sup>th</sup> basis vector) : $x\_i = 1$, $x\_k = 0$ ($i \neq k$)

</div></li>

</ul>

# 행렬(matrix)이란?

<ul>

<li><div markdown="block">

여러 개의 값(또는 수식)을 직사각형 모양으로 배열해 놓은 것. $m \times n$ 행렬이라 하면 다음처럼 $m$개의 행과 $n$개의 열을 가진 행렬을 의미한다.

$$A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}$$

이때 $a\_{ij}$ ($i = 1,\,2,\,\cdots,\,m$, $j = 1,\,2,\,\cdots,\,n$)를 행렬의 $i$행, $j$열의  **요소(element)**, **성분(component)**, 혹은 **항목(entry)**이라 한다.

</div></li>

<li><div markdown="block">

모든 $m \times n$ 행렬들의 집합을 $\mathbb{R}^{m \times n}$이라 표기한다.

</div></li>

<li><div markdown="block">

두 행렬이 **같다(equal)**는 것은 같은 위치에 있는 성분들이 각각 모두 같다는 뜻이다.

</div></li>

<li><div markdown="block">

**정사각행렬(square matrix)**은 행렬의 가로와 세로의 크기가 같은 행렬을 의미한다.

**triangular matrix**는 정사각행렬 중 대각선 아래 또는 위가 모두 0인 행렬을 의미한다. **lower triangular matrix**는 대각선 위가 모두 0인 정사각행렬을, **upper triangular matrix**는 대각선 아래가 모두 0인 정사각행렬을 의미한다.

</div></li>

<li><div markdown="block">

$n$-벡터는 $n \times 1$ 행렬이라 이해할 수 있다. 이를 강조하기 위해 벡터를 **열 백터(column vector)**라 표현하기도 한다.

$$\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}$$

비슷하게, $1 \times n$ 행렬은 **행 벡터(row vector)**라 부르고, 일반적인 벡터(열 벡터)가 전치(transpose)되어 있는 것이라 이해한다.

$$\mathbf{x}^\intercal =
\begin{bmatrix}
x_1 & x_2 & \cdots & x_n
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

$m \times n$ 행렬은 $m \times 1$ 열 벡터 $\mathbf{c}\_i$들이 $n$개 있는 것이라 이해할 수 있다($i = 1,\,2,\,\cdots,\,n$).

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}

A = \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{c}_{1} & \mathbf{c}_{2} & \cdots & \mathbf{c}_{n} \\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix}$$

또는 $1 \times n$ 행 벡터 $\mathbf{r}\_j^\intercal$들이 $m$개 있는 것이라 이해할 수 있다($j = 1,\,2,\,\cdots,\,m$).

$$\newcommand{\horzbar}{\rule[.5ex]{4ex}{0.5pt}}

A = \begin{bmatrix}
\horzbar & \mathbf{r}_{1}^\intercal & \horzbar \\
\horzbar & \mathbf{r}_{2}^\intercal & \horzbar \\
{} & \vdots & {} \\
\horzbar & \mathbf{r}_{m}^\intercal & \horzbar \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

특수한 행렬

- $O_{m \times n}$ (영행렬, zero matrix) : 모든 성분이 0인 행렬. $a\_{ij} = 0$ ($i = 1,\,2,\,\cdots,\,m$, $j = 1,\,2,\,\cdots,\,n$)
- $D_{n \times n}$ (대각 행렬, diagonal matrix) : 주대각선 성분을 제외한 나머지 성분은 모두 0인 정사각행렬. $a\_{ik} = 0$ ($k \neq i$)
- $E_{n \times n}$, $I_{n \times n}$ (단위 행렬, unit matrix) : 주대각선 성분만 1이고 나머지 성분은 모두 0인 정사각행렬. 즉 단위행렬은 대각행렬의 일종이다. $a\_{ii} = 1$, $a\_{ik} = 0$ ($k \neq i$).

대부분의 경우 행렬의 크기는 명시적으로 표시할 필요가 없을 정도로 명백하므로, $O$, $D$, $E$, $I$ 등과 같이 아래첨자는 생략해 쓴다.

</div></li>

<li><div markdown="block">

행렬은 여러 개의 작은 행렬들이 모여 구성된 것으로 이해할 수 있다.

예를 들어, 다음과 같은 3 × 6 행렬은

$$A = \left[ \begin{array} {cccccc}
3 & 0 & -1 & 5 & 9 & -2\\[0.5em]
-5 & 2 & 4 & 0 & -3 & 1\\[0.5em]
-8 & -6 & 3 & 1 & 7 & -4\\[0.5em]
\end{array} \right]$$

다음과 같이 작은 행렬들이 모여 만들어진 2 × 3 행렬이라 이해할 수 있다.

$$A = \left[ \begin{array} {ccc|cc|c}
3 & 0 & -1 & 5 & 9 & -2\\[0.5em]
-5 & 2 & 4 & 0 & -3 & 1\\[0.5em]
\hline
-8 & -6 & 3 & 1 & 7 & -4\\[0.5em]
\end{array} \right] = \begin{bmatrix}
A_{11} & A_{12} & A_{13}\\[0.5em]
A_{21} & A_{22} & A_{23}\\[0.5em]
\end{bmatrix}$$

$$\begin{array}{c c c c c c c c c}
A_{11} & {}={} & \begin{bmatrix}
3 & 0 & -1\\[0.5em]
-5 & 2 & 4\\[0.5em]
\end{bmatrix},\,
&A_{12} & {}={} & \begin{bmatrix}
5 & 9\\[0.5em]
0 & -3\\[0.5em]
\end{bmatrix},\,
&A_{13} & {}={} & \begin{bmatrix}
-2\\[0.5em]
1\\[0.5em]
\end{bmatrix}\\[0.5em]
A_{21} & {}={} & \begin{bmatrix}
-8 & -6 & 3\\[0.5em]
\end{bmatrix},\,
&A_{22} & {}={} & \begin{bmatrix}
1 & 7\\[0.5em]
\end{bmatrix},\,
&A_{23} & {}={} & \begin{bmatrix}
-4\\[0.5em]
\end{bmatrix}\\[0.5em]
\end{array}$$

이때 작은 행렬들을 **partitioned matrix** 또는 **block matrix**라 부른다.

행렬의 합, 차는 같은 위치에 있는 partitioned matrix끼리 수행하면 된다. 행렬과 스칼라의 곱 역시 각 partitioned matrix에 스칼라를 곱하면 된다. 행렬과 행렬의 곱도 우리가 아는 행렬곱 연산 방식 그대로 각 partitioned matrix에 대해 수행하면 된다.

</div></li>

</ul>

# 벡터와 행렬의 연산

## 행렬의 합과 차

<ul>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times n}$, $B \in \mathbb{R}^{m \times n}$가 주어졌다고 할 때,

$$A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix},\,
B =
\begin{bmatrix}
b_{11} & b_{12} & \cdots & b_{1n} \\
b_{21} & b_{22} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{m1} & b_{m2} & \cdots & b_{mn} \\
\end{bmatrix}$$

두 행렬의 합(차) $A \pm B$는 다음과 같이 계산된다.

$$A \pm B = \begin{bmatrix}
a_{11} \pm b_{11} & a_{12} \pm b_{12} & \cdots & a_{1n} \pm b_{1n} \\
a_{21} \pm b_{21} & a_{22} \pm b_{22} & \cdots & a_{2n} \pm b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} \pm b_{m1} & a_{m2} \pm b_{m2} & \cdots & a_{mn} \pm b_{mn} \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

같은 위치에 있는 성분끼리 더하거나 뺀다.

</div></li>

<li><div markdown="block">

**크기가 같은 행렬끼리만 더하거나 뺄 수 있다.** 계산 결과 $A \pm B$는 $m \times n$ 행렬이 된다($A$, $B$와 크기가 같다).

</div></li>

<li><div markdown="block">

행렬의 합과 차는 다음과 같은 성질이 있다.

- 교환법칙은 성립한다 : $A \pm B = B \pm A$
- 결합법칙이 성립한다 : $(A \pm B) \pm C = A \pm (B \pm C)$
- 영행렬은 합 연산의 항등원이다 : $A + O = O + A = A$

</div></li>

</ul>

## 행렬의 곱

### 행렬과 스칼라의 곱

<ul>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times n}$, 실수 $\alpha \in \mathbb{R}$가 주어졌다고 할 때,

$$A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}$$

행렬 $A$와 스칼라 $\alpha$의 곱 $\alpha A$는 다음과 같이 계산된다.

$$\alpha A = \begin{bmatrix}
\alpha a_{11} & \alpha a_{12} & \cdots & \alpha a_{1n} \\
\alpha a_{21} & \alpha a_{22} & \cdots & \alpha a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
\alpha a_{m1} & \alpha a_{m2} & \cdots & \alpha a_{mn} \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

모든 성분들에 스칼라를 곱하면 된다.

</div></li>

<li><div markdown="block">

계산 결과 $\alpha A$는 $m \times n$ 행렬이 된다($A$와 크기가 같다).

</div></li>

<li><div markdown="block">

행렬과 스칼라의 곱은 다음과 같은 성질이 있다.

- $\alpha (A \pm B) = \alpha A \pm \alpha B$
- $(\alpha + \beta) A = \alpha A + \beta A$
- $(\alpha \beta)A = \alpha (\beta A)$

</div></li>

</ul>

### 행렬과 행렬의 곱 

<ul>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times p}$, $B \in \mathbb{R}^{p \times n}$가 주어졌다고 할 때,

$$A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mp} \\
\end{bmatrix},\,
B =
\begin{bmatrix}
b_{11} & b_{12} & \cdots & b_{1n} \\
b_{21} & b_{22} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{p1} & b_{p2} & \cdots & b_{pn} \\
\end{bmatrix}$$

두 행렬의 곱 $C$는 다음과 같이 계산된다.

$$C = AB = \begin{bmatrix}
\rowcolor{{{ site.data.color.mathjaxHighlight }}} a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mp} \\
\end{bmatrix} \begin{bmatrix}
b_{11} & b_{12} \columncolor{{{ site.data.color.mathjaxHighlight }}} & \cdots & b_{1n} \\
b_{21} & b_{22} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{p1} & b_{p2} & \cdots & b_{pn} \\
\end{bmatrix} = \begin{bmatrix}
\displaystyle\sum_{k=1} ^p a_{1k} \cdot b_{k1} & \cellcolor{{{ site.data.color.mathjaxHighlight }}} \displaystyle\sum_{k=1} ^p a_{1k} \cdot b_{k2} & \cdots & \displaystyle\sum_{k=1} ^p a_{1k} \cdot b_{kn} \\
\displaystyle\sum_{k=1} ^p a_{2k} \cdot b_{k1} & \displaystyle\sum_{k=1} ^p a_{2k} \cdot b_{k2} & \cdots & \displaystyle\sum_{k=1} ^p a_{2k} \cdot b_{kn} \\
\vdots & \vdots & \ddots & \vdots \\
\displaystyle\sum_{k=1} ^p a_{mk} \cdot b_{k1} & \displaystyle\sum_{k=1} ^p a_{mk} \cdot b_{k2} & \cdots & \displaystyle\sum_{k=1} ^p a_{mk} \cdot b_{kn} \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

$C$의 각 성분은 $A$의 각 행과 $B$의 각 열의 성분들끼리 곱한 뒤 더하여 만들어진다.

$$C_{ij} = \sum_{k=1} ^p a_{ik} \cdot b_{kj}$$

</div></li>

<li><div markdown="block">

**$A(m \times \bbox[{{ site.data.color.mathjaxHighlight }}]{p})$의 열의 수와 $B(\bbox[{{ site.data.color.mathjaxHighlight }}]{p} \times n)$의 행의 수가 같을 때만 곱할 수 있다.** 계산 결과 $C$는 $m \times n$ 행렬이 된다($A$의 행의 수와 $B$의 열의 수의 곱을 크기로 갖는다).

</div></li>

<li><div markdown="block">

행렬과 행렬의 곱은 벡터적으로 이해할 수 있다. 구체적으로, 행렬 $A \in \mathbb{R}^{m \times p}$, $B \in \mathbb{R}^{p \times n}$가 다음과 같이 주어졌다고 해 보자.

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}
\newcommand{\horzbar}{\rule[.5ex]{4ex}{0.5pt}}

A = \begin{bmatrix}
\horzbar & \mathbf{a}_{1}^\intercal & \horzbar \\
\horzbar & \mathbf{a}_{2}^\intercal & \horzbar \\
{} & \vdots & {} \\
\horzbar & \mathbf{a}_{m}^\intercal & \horzbar \\
\end{bmatrix},\,
B = \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{b}_{1} & \mathbf{b}_{2} & \cdots & \mathbf{b}_{n} \\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix}$$

두 행렬의 곱 $C$는 다음과 같이 행렬과 벡터의 곱으로 이해할 수 있다.

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}
\newcommand{\horzbar}{\rule[.5ex]{4ex}{0.5pt}}

C = AB = A \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{b}_{1} & \mathbf{b}_{2} & \cdots & \mathbf{b}_{n} \\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix}
= \begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
A \mathbf{b}_{1} & A \mathbf{b}_{2} & \cdots & A \mathbf{b}_{n} \\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix}$$

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}
\newcommand{\horzbar}{\rule[.5ex]{4ex}{0.5pt}}

C = AB = \begin{bmatrix}
\horzbar & \mathbf{a}_{1}^\intercal & \horzbar \\
\horzbar & \mathbf{a}_{2}^\intercal & \horzbar \\
{} & \vdots & {} \\
\horzbar & \mathbf{a}_{m}^\intercal & \horzbar \\
\end{bmatrix} B
= \begin{bmatrix}
\horzbar & \mathbf{a}_{1}^\intercal B & \horzbar \\
\horzbar & \mathbf{a}_{2}^\intercal B & \horzbar \\
{} & \vdots & {} \\
\horzbar & \mathbf{a}_{m}^\intercal B & \horzbar \\
\end{bmatrix}$$

또한 다음과 같이 벡터의 내적으로 이해할 수도 있다.

$$\newcommand{\vertbar}{\rule[-1ex]{0.5pt}{3ex}}
\newcommand{\horzbar}{\rule[.5ex]{4ex}{0.5pt}}

C = AB
= \begin{bmatrix}
\horzbar & \mathbf{a}_{1}^\intercal & \horzbar \\
\horzbar & \mathbf{a}_{2}^\intercal & \horzbar \\
{} & \vdots & {} \\
\horzbar & \mathbf{a}_{m}^\intercal & \horzbar \\
\end{bmatrix}
\begin{bmatrix}
\vertbar & \vertbar & {} & \vertbar \\
\mathbf{b}_{1} & \mathbf{b}_{2} & \cdots & \mathbf{b}_{n} \\
\vertbar & \vertbar & {} & \vertbar \\
\end{bmatrix}
= \begin{bmatrix}
\mathbf{a}_{1}^\intercal \mathbf{b}_{1} & \mathbf{a}_{1}^\intercal \mathbf{b}_{2} & \cdots & \mathbf{a}_{1}^\intercal \mathbf{b}_{n} \\
\mathbf{a}_{2}^\intercal \mathbf{b}_{1} & \mathbf{a}_{2}^\intercal \mathbf{b}_{2} & \cdots & \mathbf{a}_{2}^\intercal \mathbf{b}_{n} \\
\vdots & \vdots & \ddots & \vdots \\
\mathbf{a}_{m}^\intercal \mathbf{b}_{1} & \mathbf{a}_{m}^\intercal \mathbf{b}_{2} & \cdots & \mathbf{a}_{m}^\intercal \mathbf{b}_{n} \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

행렬과 행렬의 곱은 다음과 같은 성질이 있다.

- 결합법칙이 성립한다 : $(AB)C = A(BC)$
- 분배법칙이 성립한다 : $A(B + C) = AB + AC$, $(A + B)C = AC + BC$
- 교환법칙은 성립하지 **않는다** : $AB \neq BA$
- 단위 행렬은 행렬곱 연산의 항등원이다 : $A \in \mathbb{R}^{n \times n}$, $I \in \mathbb{R}^{n \times n}$에 대해, $AI = IA = A$

</div></li>

</ul>

### 행렬의 거듭제곱

<ul>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times n}$, 양의 정수 $k \in \mathbf{N}$에 대해, $A^k$는 다음과 같이 $A$를 $k$번 곱한 것이다.

$$A^k = \underbrace {A A \cdots A}_k$$

</div></li>

<li><div markdown="block">

정사각 행렬 $A \in \mathbb{R}^{n \times n}$에 대해, $A^0$은 단위 행렬 $I\_{n \times n}$이라 정의한다.

</div></li>

</ul>

## 행렬의 전치(transpose)

<ul>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times n}$가 주어졌다고 할 때,

$$A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}$$

행렬 $A$의 전치(transpose) $A^\intercal$은 다음과 같이 계산된다.

$$A^\intercal = \begin{bmatrix}
a_{11} & a_{21} & \cdots & a_{m1} \\
a_{12} & a_{22} & \cdots & a_{m2} \\
\vdots & \vdots & \ddots & \vdots \\
a_{1n} & a_{2n} & \cdots & a_{mn} \\
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

행렬의 행과 열을 바꾼다.

$$(A^\intercal)_{ij} = A_{ji}$$

</div></li>

<li><div markdown="block">

계산 결과 $A^\intercal$는 $n \times m$ 행렬이 된다($A$의 행과 열의 크기가 바뀐다).

</div></li>

<li><div markdown="block">

행렬의 전치는 다음과 같은 성질이 있다.

- $(A^\intercal)^\intercal = A$
- $A \in \mathbb{R}^{m \times n}$, $B \in \mathbb{R}^{m \times n}$에 대해, $(A + B)^\intercal = A^\intercal + B^\intercal$
- $A \in \mathbb{R}^{m \times p}$, $B \in \mathbb{R}^{p \times n}$에 대해, $(AB)^\intercal = B^\intercal A^\intercal$
- $A \in \mathbb{R}^{m \times n}$, $\alpha \in \mathbb{R}$에 대해, $(\alpha A)^\intercal = \alpha A^\intercal$
- 역행렬이 존재하는 행렬 $A$에 대해, $(A^{-1})^\intercal = (A^\intercal)^{-1}$

</div></li>

</ul>

## 행렬의 대각합(trace)

<ul>

<li><div markdown="block">

정사각행렬 $A \in \mathbb{R}^{n \times n}$가 주어졌다고 할 때,

$$A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn} \\
\end{bmatrix}$$

행렬 $A$의 대각합(trace) $tr(A)$는 다음과 같이 계산된다.

$$tr(A) = \sum_{i=1} ^n a_{ii} = a_{11} + a_{22} + \cdots + a_{nn}$$

</div></li>

<li><div markdown="block">

행렬의 주대각선의 성분들의 합을 구한다.

</div></li>

<li><div markdown="block">

계산 결과 $tr(A)$는 스칼라가 된다.

</div></li>

<li><div markdown="block">

행렬의 대각합은 다음과 같은 성질이 있다.

- $A \in \mathbb{R}^{n \times n}$에 대해, $tr(A) = tr(A^\intercal)$
- $A \in \mathbb{R}^{n \times n}$, $B \in \mathbb{R}^{n \times n}$에 대해, $tr(A + B) = tr(A) + tr(B)$
- $A \in \mathbb{R}^{n \times n}$, 실수 $\alpha \in \mathbb{R}$에 대해, $tr(\alpha A) = \alpha tr(A)$
- $A \in \mathbb{R}^{n \times p}$, $B \in \mathbb{R}^{p \times n}$에 대해, $tr(AB) = tr(BA)$
- $A \in \mathbb{R}^{n \times p}$, $B \in \mathbb{R}^{p \times q}$, $C \in \mathbb{R}^{q \times n}$에 대해, $tr(ABC) = tr(BCA) = tr(CAB)$

</div></li>

</ul>

## 벡터의 내적(inner product, dot product)

<ul>

<li><div markdown="block">

벡터 $\mathbf{x} \in \mathbb{R}^{n}$, $\mathbf{y} \in \mathbb{R}^{n}$가 주어졌을 때,

$$\mathbf{x} =
\begin{bmatrix}
x_{1}\\
x_{2}\\
\vdots\\
x_{n}\\
\end{bmatrix},\,
\mathbf{y} =
\begin{bmatrix}
y_{1}\\
y_{2}\\
\vdots\\
y_{n}\\
\end{bmatrix}$$

두 벡터의 **내적(inner product, dot product)** $\mathbf{x} \cdot \mathbf{y}$는 다음과 같이 계산된다.

$$\mathbf{x} \cdot \mathbf{y} = \mathbf{x}^\intercal \mathbf{y} = \begin{bmatrix}
x_{1} & x_{2} & \cdots & x_{n}
\end{bmatrix} \begin{bmatrix}
y_{1}\\
y_{2}\\
\vdots\\
y_{n}\\
\end{bmatrix}
= x_1 y_1 + x_2 y_2 + \cdots + x_n y_n = \sum_{i = 1} ^n x_i y_i$$

</div></li>

<li><div markdown="block">

계산 결과 $\mathbf{x} \cdot \mathbf{y}$는 스칼라가 된다.

</div></li>

<li><div markdown="block">

벡터의 내적은 다음과 같은 성질이 있다.

- $\mathbf{x} \in \mathbb{R}^{n}$, $\mathbf{y} \in \mathbb{R}^{n}$, $\alpha \in \mathbb{R}$에 대해, $(\alpha \mathbf{x})^\intercal \mathbf{y} = \alpha (\mathbf{x}^\intercal \mathbf{y})$
- $\mathbf{x} \in \mathbb{R}^{n}$, $\mathbf{y} \in \mathbb{R}^{n}$, $\mathbf{z} \in \mathbb{R}^{n}$에 대해, $(\mathbf{x} + \mathbf{y})^\intercal \mathbf{z} = \mathbf{x}^\intercal \mathbf{z}  + \mathbf{y}^\intercal \mathbf{z}$
- $\mathbf{x} \in \mathbb{R}^{n}$, $\mathbf{y} \in \mathbb{R}^{n}$에 대해, $\mathbf{x}^\intercal \mathbf{y} = \mathbf{y}^\intercal \mathbf{x}$

</div></li>

</ul>

## 벡터의 Norm

<ul>

<li><div markdown="block">

벡터 $\mathbf{x} \in \mathbb{R}^{n}$이 주어졌을 때,

$$\mathbf{x} =
\begin{bmatrix}
x_{1}\\
x_{2}\\
\vdots\\
x_{n}\\
\end{bmatrix}$$

벡터의 Norm $\lVert \mathbf{x} \rVert \_{p}$는 다음과 같이 계산된다.

$$\lVert \mathbf{x} \rVert _{p} = \sqrt[p] {\sum_{i=1} ^n | x_i | ^p}$$

</div></li>

<li><div markdown="block">

Norm은 벡터의 '크기'를 계산하는 것이라 이해할 수 있다. 계산 결과 $\lVert \mathbf{x} \rVert \_{p}$는 스칼라가 된다.

</div></li>

<li><div markdown="block">

자주 사용되는 Norm으로는 다음이 있다.

- $l\_1$ Norm : $\lVert \mathbf{x} \rVert \_{1} = \displaystyle\sum_{i=1} ^n \| x\_i \| $
- $l\_2$ Norm : $\lVert \mathbf{x} \rVert \_{2} = \displaystyle\sum_{i=1} ^n x\_i ^2 $
- $l\_\infty$ Norm : $\lVert \mathbf{x} \rVert \_{\infty} = \max \| x\_i \|$

</div></li>

<li><div markdown="block">

$l\_2$ Norm은 다음과 같은 성질이 있다.

- $\lVert \mathbf{x} \rVert \_{2} ^2 = \mathbf{x}^\intercal \mathbf{x}$

</div></li>

</ul>