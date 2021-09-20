---
title: "선형연립방정식 (Linear System)"
date_created: "2021-09-16"
date_modified: "2021-09-20"
---

# 선형연립방정식(Linear System)이란?

<ul class="no-guide-line">

<li><div markdown="block">

변수 $x\_1$, $x\_2$, ..., $x\_n$에 대해 다음과 같은 형태로 기술되는 식을 **선형방정식(linear equation)**이라 부른다.

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

선형연립방정식은 다음 세 가지 중 하나로 분류할 수 있다.

1. 해가 존재하지 않는다(불능).
2. 단 하나의 해가 존재한다.
3. 무수히 많은 해가 존재한다(부정).

해가 존재하는 선형연립방정식(2, 3)을 **consistent**하다고 한다. 해가 존재하지 않는 선형연립방정식(1)을 **inconsistent**하다고 한다.

</div></li>

<li><div markdown="block">

선형연립방정식은 행렬을 이용해 쉽게 표현할 수 있다.

예를 들어, 다음과 같은 연립방정식이 주어졌다고 하자.

$$\begin{array} {r c r c r c r}
 x_1 & {}-{} & 2x_2 & {}+{} &  x_3 & = & 0  \\[0.5em]
     &       & 2x_2 & {}-{} & 8x_3 & = & 8  \\[0.5em]
5x_1 &       &      & {}-{} & 5x_3 & = & 10 \\[0.5em]
\end{array}$$

이는 다음과 같이 행렬과 벡터의 곱 형태로 표현할 수 있다.

$$\begin{bmatrix}
1 & -2 &  1\\[0.5em]
0 &  2 & -8\\[0.5em]
5 &  0 & -5\\[0.5em]
\end{bmatrix} \begin{bmatrix}
x_{1}\\[0.5em]
x_{2}\\[0.5em]
x_{3}\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
0\\[0.5em]
8\\[0.5em]
10\\[0.5em]
\end{bmatrix}$$

이때, 행렬

$$\begin{bmatrix}
1 & -2 &  1\\[0.5em]
0 &  2 & -8\\[0.5em]
5 &  0 & -5\\[0.5em]
\end{bmatrix}$$

처럼 선형연립방정식의 계수를 모아 만든 행렬을 **coefficient matrix**(혹은 **matrix of coefficient**)라 부른다.

한편 등호 너머이 있는 방정식의 값까지 모두 모으면 다음과 같은 행렬을 얻을 수 있다. 이처럼 coefficient matrix에 방정식의 값까지 모두 모아 만든 행렬을 **augmented matrix**라 부른다.

$$\begin{bmatrix}
1 & -2 &  1 &  0\\[0.5em]
0 &  2 & -8 &  8\\[0.5em]
5 &  0 & -5 & 10\\[0.5em]
\end{bmatrix}$$

</div></li>

</ul>

# 선형연립방정식 풀기

선형연립방정식의 해 집합을 구하는 다양한 방법을 알아보자.

## Reduced Echelon Form을 이용한 방법

<ul class="no-guide-line">

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
\rowcolor{#FAE19C} 0 & 1 & 0 &  0\\[0.5em]
0 & 0 & 1 & -1\\[0.5em]
\end{bmatrix}$$

이 행렬을 다시 선형연립방정식으로 바꾸면 다음과 같이 된다.

$$\begin{array} {r c r c r c r}
 x_1 &  &     &  &     & = &  1 \\[0.5em]
     &  & x_2 &  &     & = &  0 \\[0.5em]
     &  &     &  & x_3 & = & -1 \\[0.5em]
\end{array}$$

이 선형연립방정식은 원래 주어졌던 선형연립방정식과 동등하다(equivalent). 따라서 주어진 선형연립방정식의 해는 $(x\_1,\,x\_2,\,x\_3) = (1,\,0,\,-1)$가 된다.

</div></li>

<li><div markdown="block">

예제 : 해가 존지하지 않는 경우

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

이때 세 번째 식은 항상 거짓(모순)이므로, 위 세 선형방정식을 동시에 만족시키는 $x\_1$, $x\_2$, $x\_3$는 존재하지 않는다. 따라서 주어진 원래의 선형연립방정식은 해가 존재하지 않는다(inconsistent).

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

$(x\_1,\,x\_2,\,x\_3 ) = (-t + 2,\,-t + 1,\,t)$ 꼴의 $(x\_1,\,x\_2,\,x\_3 )$ 쌍은 위 선형연립방정식을 항상 만족시킨다. 따라서 주어진 원래의 선형연립방정식은 해가 무수히 많다.

</div></li>

</ul>

# 선형연립방정식의 해의 존재성 및 유일성 분석

선형연립방정식의 해의 존재성(existence) 및 유일성(uniqueness)을 분석하는 다양한 방법을 알아보자.

사실 위 문단에서 소개한 방법을 이용해 선형연립방정식의 해를 직접 구해 보면 해의 존재성 및 유일성을 분석할 수 있다. 하지만 아래 방법들을 사용하면 해를 직접 구하는 것보다 훨씬 빠르고 간단하게 해의 존재성 및 유일성을 분석할 수 있다.

## Echelon Form을 이용한 방법

<ul class="no-guide-line">

<li><div markdown="block">

선형연립방정식의 augmented matrix의 가장 오른쪽 열이 pivot column이 아니면 주어진 선형연립방정식은 consistent하다(= 해가 존재한다). 역으로, consistent한 선형연립방정식의 augmented matrix의 가장 오른쪽 열은 pivot column이 아니다.

</div></li>

<li><div markdown="block">

따라서, echelon form까지만 구해도 선형연립방정식의 해의 존재성(존재하는지(consistent) 혹은 존재하지 않는지(inconsistent))을 판단할 수 있다.

</div></li>

<li><div markdown="block">

하지만 이 방법으로는 해의 유일성(해가 무수히 많은지(부정) 혹은 단 하나만 존재하는지)은 판단할 수 없다. 이를 판단하려면 reduced echelon form까지 구해야 한다.

</div></li>

</ul>