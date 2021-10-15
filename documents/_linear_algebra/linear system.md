---
title: "선형연립방정식 (Linear System)"
order: 2
date_created: "2021-09-16"
date_modified: "2021-10-15"
---

# 선형연립방정식(linear system)이란?

<ul>

<li><div markdown="block">

변수 $x\_1$, $x\_2$, ..., $x\_n$에 대해 다음과 같은 형태로 기술되는 식을 **선형방정식(linear equation)**이라 한다.

$$a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b$$

이때 $a\_1$, $a\_2$, ..., $a\_n$을 **계수(coefficient)**라 부른다.

</div></li>

<li><div markdown="block">

같은 변수를 공유하는 하나 이상의 선형방정식들의 모임을 **선형연립방정식(system of linear equation, linear system)**이라 부른다.

</div></li>

<li><div markdown="block">

선형연립방정식의 변수 $x\_1$, $x\_2$, ..., $x\_n$에 각각 대입했을 때 선형연립방정식의 모든 방정식들을 참으로 만드는 수들의 쌍 $(s\_1,\,s\_2,\,\cdots,\,s\_n)$을 선형연립방적식의 **해(solution)**라 부른다.

선형연립방정식의 해는 여러 개일 수 있다. 선형연립방정식의 모든 해들의 집합을 **해 집합(solution set)**이라 부른다.

두 선형연립방정식이 동일한 해 집합을 가지는 경우, 두 선형연립방정식은 **동등하다(equivalent)**고 한다.

</div></li>

<li><div markdown="block">

모든 선형연립방정식은 다음 세 가지 중 하나로 분류할 수 있다.

1. 해가 존재하지 않는다(불능).
2. 단 하나의 해가 존재한다.
3. 무수히 많은 해가 존재한다(부정).

해가 존재하는 선형연립방정식(2, 3번 경우)을 **consistent**하다고 한다. 해가 존재하지 않는 선형연립방정식(1번 경우)을 **inconsistent**하다고 한다.

</div></li>

<li><div markdown="block">

consistent한 선형연립방정식에 대해, 일반적인 형태로 나타낸 해를 **일반해(general soultion)**라 한다. 한편 해 하나하나를 **특성해(particular solution)**라 한다.

예를 들어, 다음과 같은 선형연립방정식이 있을 때,

$$\begin{array} {r c r c r c r}
 x_1 & {}+{} & 2x_2 & {}+{} & 3x_3 & = & 4 \\[0.5em]
 x_1 &       &      & {}+{} &  x_3 & = & 2 \\[0.5em]
3x_1 & {}-{} &  x_2 & {}+{} & 2x_3 & = & 5 \\[0.5em]
\end{array}$$

다음과 같이 매개변수 $t$를 사용해 일반적인 형태로 나타낸 해를 일반해라 하고,

$$\begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
-t + 2\\[0.5em]
-t + 1\\[0.5em]
t\\[0.5em]
\end{bmatrix}$$

$(1, 0, 1)$, $(-1, -2, 3)$과 같은 해 하나하나를 특성해라 한다.

</div></li>

<li><div markdown="block">

다음과 같은 선형연립방정식이 주어졌다고 하자.

$$\begin{array} {r c r c c c r c r}
a_{11} x_{1} & {}+{} & a_{12} x_{2} & {}+{} & \cdots & {}+{} & a_{1n} x_{n} & = & b_{1}\\[0.5em]
a_{21} x_{1} & {}+{} & a_{22} x_{2} & {}+{} & \cdots & {}+{} & a_{2n} x_{n} & = & b_{2}\\[0.5em]
{}           & {}    & {}           & {}    & \vdots\\[0.5em]
a_{m1} x_{1} & {}+{} & a_{m2} x_{2} & {}+{} & \cdots & {}+{} & a_{mn} x_{n} & = & b_{m}\\[0.5em]
\end{array}$$

선형연립방정식의 계수를 모으면 다음과 같은 행렬을 얻을 수 있다.

$$\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\[0.5em]
a_{21} & a_{22} & \cdots & a_{2n}\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
a_{m1} & a_{m2} & \cdots & a_{mn}\\[0.5em]
\end{bmatrix}$$

이를 **coefficient matrix** 혹은 **matrix of coefficient**라 한다.

coefficient matrix를 이용하면 선형연립방정식을 행렬과 벡터의 곱 형태로 표현할 수 있다.

$$A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\[0.5em]
a_{21} & a_{22} & \cdots & a_{2n}\\[0.5em]
\vdots & \vdots & \ddots & \vdots\\[0.5em]
a_{m1} & a_{m2} & \cdots & a_{mn}\\[0.5em]
\end{bmatrix},\,
\mathbf{x} = \begin{bmatrix}
x_{1}\\[0.5em]
x_{2}\\[0.5em]
\vdots\\[0.5em]
x_{n}\\[0.5em]
\end{bmatrix},\,
\mathbf{b} = \begin{bmatrix}
b_{1}\\[0.5em]
b_{2}\\[0.5em]
\vdots\\[0.5em]
b_{m}\\[0.5em]
\end{bmatrix}$$

라 하면, 주어진 선형연립방정식은

$$A\mathbf{x} = \mathbf{b}$$

이라 표현할 수 있다.

</div></li>

<li><div markdown="block">

한편, coefficient matrix에 각 선형방정식의 우변을 모은 열을 추가하면 다음과 같은 행렬을 얻을 수 있다.

$$\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_{1}\\[0.5em]
a_{21} & a_{22} & \cdots & a_{2n} & b_{2}\\[0.5em]
\vdots & \vdots & \ddots & \vdots & \vdots\\[0.5em]
a_{m1} & a_{m2} & \cdots & a_{mn} & b_{m}\\[0.5em]
\end{bmatrix}$$

이렇게 만든 행렬을 **augmented matrix**라 부른다.

</div></li>

</ul>

# 선형연립방정식 풀기

선형연립방정식의 해 집합을 구하는 다양한 방법을 알아보자.

## reduced echelon form을 이용한 방법

<ul>

<li><div markdown="block">

주어진 선형연립방정식의 augmented matrix을 [reduced echelon form](/linear_algebra/echelon-form)으로 변형하면 선형연립방정식의 해를 알 수 있다.

</div></li>

<li><div markdown="block">

예제 : 단 하나의 해가 존재하는 경우

다음 선형연립방정식을 풀어보자.

$$\begin{array} {r c r c r c r}
 x_1 & {}-{} & 2x_2 & {}+{} &  x_3 & = & 0  \\[0.5em]
     &       & 2x_2 & {}-{} & 8x_3 & = & 8  \\[0.5em]
5x_1 &       &      & {}-{} & 5x_3 & = & 10 \\[0.5em]
\end{array}$$

우선 augmented matrix를 만든다.

$$\begin{bmatrix}
1 & -2 &  1 &  0\\[0.5em]
0 &  2 & -8 &  8\\[0.5em]
5 &  0 & -5 & 10\\[0.5em]
\end{bmatrix}$$

이를 reduced echelon form으로 바꾸면 다음과 같이 된다.

$$\begin{bmatrix}
1 & 0 & 0 &  1\\[0.5em]
0 & 1 & 0 &  0\\[0.5em]
0 & 0 & 1 & -1\\[0.5em]
\end{bmatrix}$$

이 행렬을 다시 선형연립방정식으로 바꾸면 다음과 같이 된다.

$$\begin{array} {r c r c r c r}
 x_1 &  &     &  &     & = &  1 \\[0.5em]
     &  & x_2 &  &     & = &  0 \\[0.5em]
     &  &     &  & x_3 & = & -1 \\[0.5em]
\end{array}$$

이 선형연립방정식은 원래 주어졌던 선형연립방정식과 동등하다(equivalent). 따라서 주어진 선형연립방정식의 해는 $(1,\,0,\,-1)$가 된다.

</div></li>

<li><div markdown="block">

예제 : 해가 존재하지 않는 경우

다음 선형연립방정식을 풀어보자.

$$\begin{array} {r c r c r c r}
     &       &  x_2 & {}-{} &  4x_3 & = & 8 \\[0.5em]
2x_1 & {}-{} & 3x_2 & {}+{} &  2x_3 & = & 1 \\[0.5em]
4x_1 & {}-{} & 8x_2 & {}+{} & 12x_3 & = & 1 \\[0.5em]
\end{array}$$

우선 augmented matrix를 만든다.

$$\begin{bmatrix}
0 &  1 & -4 &  8\\[0.5em]
2 & -3 &  2 &  1\\[0.5em]
4 & -8 & 12 &  1\\[0.5em]
\end{bmatrix}$$

이를 reduced echelon form으로 바꾸면 다음과 같이 된다.

$$\begin{bmatrix}
1 &  0 & -5 & 25/2\\[0.5em]
0 &  1 & -4 &    8\\[0.5em]
0 &  0 &  0 &   15\\[0.5em]
\end{bmatrix}$$

이 행렬을 다시 선형연립방정식으로 바꾸면 다음과 같이 된다.

$$\begin{array} {r c r c r c r}
 x_1 &  &     & {}-{} & 5x_3 & = &  25/2 \\[0.5em]
     &  & x_2 & {}-{} & 4x_3 & = &  8 \\[0.5em]
     &  &     &       &    0 & = & 15 \\[0.5em]
\end{array}$$

이때 세 번째 식은 항상 거짓(모순)이므로, 위 세 선형방정식을 동시에 만족시키는 $(x\_1,\,x\_2,\,x\_3 )$ 쌍은 존재하지 않는다. 따라서 주어진 원래의 선형연립방정식은 해가 존재하지 않는다(inconsistent).

</div></li>

<li><div markdown="block">

예제 : 무수히 많은 해가 존재하는 경우

다음 선형연립방정식을 풀어보자.

$$\begin{array} {r c r c r c r}
 x_1 & {}+{} & 2x_2 & {}+{} & 3x_3 & = & 4 \\[0.5em]
 x_1 &       &      & {}+{} &  x_3 & = & 2 \\[0.5em]
3x_1 & {}-{} &  x_2 & {}+{} & 2x_3 & = & 5 \\[0.5em]
\end{array}$$

우선 augmented matrix를 만든다.

$$\begin{bmatrix}
1 &  2 & 3 & 4\\[0.5em]
1 &  0 & 1 & 2\\[0.5em]
3 & -1 & 2 & 5\\[0.5em]
\end{bmatrix}$$

이를 reduced echelon form으로 바꾸면 다음과 같이 된다.

$$\begin{bmatrix}
1 & 0 & 1 & 2\\[0.5em]
0 & 1 & 1 & 1\\[0.5em]
0 & 0 & 0 & 0\\[0.5em]
\end{bmatrix}$$

이 행렬을 다시 선형연립방정식으로 바꾸면 다음과 같이 된다.

$$\begin{array} {r c r c r c r}
 x_1 &  &     & {}+{} & x_3 & = & 2 \\[0.5em]
     &  & x_2 & {}+{} & x_3 & = & 1 \\[0.5em]
     &  &     &       &   0 & = & 0 \\[0.5em]
\end{array}$$

다음과 같은 꼴의 $(x\_1,\,x\_2,\,x\_3 )$ 쌍은 위 선형연립방정식을 항상 참으로 만든다.

$$\begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
-t + 2\\[0.5em]
-t + 1\\[0.5em]
t\\[0.5em]
\end{bmatrix}$$

따라서 주어진 원래의 선형연립방정식은 해가 무수히 많고, 그 일반형은 위와 같다.

참고로 위 해는 다음과 같이 쓸 수도 있다.

$$\begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
-1\\[0.5em]
-1\\[0.5em]
1\\[0.5em]
\end{bmatrix} t + \begin{bmatrix}
2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
\end{bmatrix}$$

이때 $t$는 아무런 제약 없이 움직이면서 수많은 해를 만들어낸다. 이처럼 선형연립방정식의 해에서 아무런 제약 없이 자유롭게 움직일 수 있는 변수를 **free variable**이라 한다. 해가 단 하나만 존재하는 경우는 free variable이 하나도 없는 경우라 이해할 수 있다.

</div></li>

</ul>

## homogeneous-nonhomogeneous linear system간의 관계를 이용한 방법

<ul>

<li><div markdown="block">

선형연립방정식 $A\mathbf{x} = \mathbf{b}$에 대해, $\mathbf{b}$가 영벡터인 경우, 즉 $A\mathbf{x} = \mathbf{0}$인 경우 이를 **homogeneous linear system**이라 한다.

반면 $\mathbf{b}$가 영벡터가 아닌 경우, 이를 **nonhomogeneous linear system**이라 한다.

</div></li>

<li><div markdown="block">

homogeneous linear system은 $A$에 상관없이 항상 **trivial solution**라 부르는, $\mathbf{x} = \mathbf{0}$을 해로 갖는다. 다시말해, homogeneous linear system은 항상 하나 이상의 해를 가진다(= consistent하다).

한편 homogeneous linear system에서 $\mathbf{x} = \mathbf{0}$ 이외의 해는 **nontrivial solution**이라 부른다.

</div></li>

<li><div markdown="block">

homogeneous linear system의 일반해와 nonhomogeneous linear system의 특성해를 하나 알고 있다면 nonhomogeneous linear system의 일반해를 쉽게 구할 수 있다.

구체적으로, homogeneous linear system $A \mathbf{x} = \mathbf{0}$의 일반해 $\mathbf{v}\_h$와 nonhomogeneous linear system $A \mathbf{x} = \mathbf{b}$의 특성해 $\mathbf{p}$를 안다면, nonhomogeneous linear system $A \mathbf{x} = \mathbf{b}$의 일반해는 다음과 같은 형태가 된다.

$$\mathbf{w} = \mathbf{p} + \mathbf{v}_h $$

</div></li>

<li><div markdown="block">

예를 들어, 다음 nonhomogeneous linear system의 일반해를 구하는 상황을 생각해 보자.

$$\begin{bmatrix}
1 &  2 & 3\\[0.5em]
1 &  0 & 1\\[0.5em]
3 & -1 & 2\\[0.5em]
\end{bmatrix} \begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
4\\[0.5em]
2\\[0.5em]
5\\[0.5em]
\end{bmatrix}$$

우리가 이미 위 nonhomogeneous linear system의 특성해 

$$\mathbf{p} = \begin{bmatrix}
2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
\end{bmatrix}$$

와, homogeneous linear system

$$\begin{bmatrix}
1 &  2 & 3\\[0.5em]
1 &  0 & 1\\[0.5em]
3 & -1 & 2\\[0.5em]
\end{bmatrix} \begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
0\\[0.5em]
0\\[0.5em]
0\\[0.5em]
\end{bmatrix}$$

의 일반해

$$\mathbf{v}_h = \begin{bmatrix}
-1\\[0.5em]
-1\\[0.5em]
1\\[0.5em]
\end{bmatrix}t$$

를 알고 있다면, 주어진 nonhomogeneous linear system의 일반해 $\mathbf{w}$는 다음과 같이 쉽게 구할 수 있다.

$$\mathbf{w} = \mathbf{p} + \mathbf{v}_h = \begin{bmatrix}
2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
\end{bmatrix} + \begin{bmatrix}
-1\\[0.5em]
-1\\[0.5em]
1\\[0.5em]
\end{bmatrix}t = \begin{bmatrix}
-t + 2\\[0.5em]
-t + 1\\[0.5em]
t\\[0.5em]
\end{bmatrix}$$

</div></li>

</ul>

## 역행렬을 이용한 방법

<ul>

<li><div markdown="block">

[역행렬](/linear_algebra/inverse)이 존재하는 정사각행렬 $A \in \mathbb{R}^{n \times n}$에 대해, 선형연립방정식 $A \mathbf{x} = \mathbf{b}$의 해는 유일하며 다음과 같이 계산할 수 있다.

$$\mathbf{x} = A^{-1} \mathbf{b}$$

</div></li>

</ul>

## Cramer's rule을 이용한 방법

<ul>

<li><div markdown="block">

[역행렬](/linear_algebra/inverse)이 존재하는 정사각행렬 $A \in \mathbb{R}^{n \times n}$에 대해, 선형연립방정식 $A \mathbf{x} = \mathbf{b}$의 해는 유일하며 [Cramer's rule](/linear_algebra/determinant)을 이용해 다음과 같이 계산할 수 있다.

$$\mathbf{x} = \begin{bmatrix}
\displaystyle\frac{\text{det}\,A_1 (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\displaystyle\frac{\text{det}\,A_2 (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\vdots\\[0.5em]
\displaystyle\frac{\text{det}\,A_n (\mathbf{b})}{\text{det}\,A}\\[0.5em]
\end{bmatrix}$$

</div></li>

</ul>


# 선형연립방정식의 해의 존재성 및 유일성 분석

선형연립방정식의 해의 존재성(existence) 및 유일성(uniqueness)을 분석하는 다양한 방법을 알아보자.

사실 위 문단에서 소개한 방법을 이용해 선형연립방정식의 해를 직접 구해 보면 해의 존재성 및 유일성을 분석할 수 있다. 하지만 아래 방법들을 사용하면 해를 직접 구하는 것보다 훨씬 빠르고 간단하게 해의 존재성 및 유일성을 분석할 수 있다.

## echelon form을 이용한 방법

<ul>

<li><div markdown="block">

선형연립방정식의 augmented matrix의 가장 오른쪽 열이 pivot column이 아니면 주어진 선형연립방정식은 consistent하다(= 해가 존재한다). 역으로, consistent한 선형연립방정식의 augmented matrix의 가장 오른쪽 열은 pivot column이 아니다.

즉, 주어진 선형연립방정식에 대해, 다음은 모두 동치이다.

{:.equivalent}
- 선형연립방정식의 augmented matrix의 가장 오른쪽 열은 pivot column이 아니다.
- 선형연립방정식은 consistent하다.

</div></li>

<li><div markdown="block">

따라서, echelon form까지만 구해도 선형연립방정식의 해의 존재성(존재하는지(consistent) 혹은 존재하지 않는지(inconsistent))을 판단할 수 있다.

</div></li>

<li><div markdown="block">

하지만 이 방법으로는 해의 유일성(해가 무수히 많은지(부정) 혹은 단 하나만 존재하는지)은 판단할 수 없다. 이를 판단하려면 reduced echelon form까지 구해야 한다.

</div></li>

</ul>

## 역행렬을 이용한 방법

<ul>

<li><div markdown="block">

정사각행렬의 coefficient matrix $A \in \mathbb{R}^{n \times n}$를 가지는 선형연립방정식 $A\mathbf{x} = \mathbf{b}$에 대해, 만약 $A$의 [역행렬](/linear_algebra/inverse)이 존재하면(invertible) 선형연립방정식의 해는 존재하고(exist) 유일하다(unique).

</div></li>

</ul>

{% comment %}
## linear combination을 이용한 방법

<ul>

<li><div markdown="block">

선형연립방정식

$$A \mathbf{x} = \begin{bmatrix}
\mathbf{a}_1 & \mathbf{a}_2 & \cdots & \mathbf{a}_n \\[0.5em]
\end{bmatrix} \begin{bmatrix}
x_1 \\[0.5em]
x_2 \\[0.5em]
\vdots \\[0.5em]
x_n \\[0.5em]
\end{bmatrix} 
= \mathbf{b}$$

은 다음과 같이 $A$의 열 벡터 $\mathbf{a}_i$($i = 1,\,2\,\cdots,\,n$)들의 [linear combination](/linear_algebra/linear-combination)으로 이해할 수 있다.

$$x_1 \mathbf{a}_1 + x_2 \mathbf{a}_2 + \cdots + x_n \mathbf{a}_n = \mathbf{b}$$

</div></li>

<li><div markdown="block">

행렬 $A \in \mathbb{R}^{m \times n}$, 벡터 $\mathbf{x} \in \mathbb{R}^n$, $\mathbf{b} \in \mathbb{R}^m$에 대해, 다음 명제들은 모두 동치이다.

- 선형연립방정식 $A \mathbf{x} = \mathbf{b}$의 해가 존재한다(consistent).
- 벡터 $\mathbf{b}$는 $A$의 열 벡터 $\mathbf{a}_i$($i = 1,\,2\,\cdots,\,n$)들의 linear combination이다.
- $\text{Span}\\{\mathbf{x}\_1,\,\mathbf{x}\_2,\,\cdots,\,\mathbf{x}\_p\\} = \mathbb{R}^m$ (The columns of $A$ spans $\mathbb{R}^m$)
- $A$의 매 행에 pivot position이 존재한다.

</div></li>

</ul>
{% endcomment %}