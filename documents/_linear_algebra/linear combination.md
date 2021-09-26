---
title: "Linear Combination"
date_created: "2021-09-20"
date_modified: "2021-09-27"
---

# linear combination

<ul class="no-guide-line">

<li><div markdown="block">

벡터 $\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p \in \mathbb{R}^n$, $\boldsymbol{y} \in \mathbb{R}^n$와 적당한 $c\_1,\,c\_2,\,\cdots,\,c\_p \in \mathbb{R}$에 대해 다음이 성립한다면,

$$\boldsymbol{y} = c_1 \boldsymbol{x}_1 + c_2 \boldsymbol{x}_2 + \cdots + c_p \boldsymbol{x}_p = \sum_{i=1} ^p c_i \boldsymbol{x}_i$$

벡터 $\boldsymbol{y}$는 벡터 $\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p$들의 **linear combination**이라 부른다. 그리고 $c\_1,\,c\_2,\,\cdots,\,c\_p$를 **가중치(weight)**라 부른다.

</div></li>

</ul>

# span

<ul class="no-guide-line">

<li><div markdown="block">

벡터 $\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p \in \mathbb{R}^n$가 주어졌을 때, 이들 벡터들의 linear combination으로 만들 수 있는 모든 벡터들의 집합을 $\text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$이라 쓰고, "$\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p$에 의해 **span**된 집합"이라 읽는다.

$$\text{Span}\{\boldsymbol{x}_1,\,\boldsymbol{x}_2,\,\cdots,\,\boldsymbol{x}_p\} = \{c_1 \boldsymbol{x}_1 + c_2 \boldsymbol{x}_2 + \cdots + c_p \boldsymbol{x}_p \,|\, c_i \in \mathbb{R}\,(i = 1,\,2,\,\cdots,\,p)\}$$

</div></li>

<li><div markdown="block">

span은 다음과 같은 성질이 있다.

{:.no-guide-line}
- $\text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\} \subset \mathbb{R}^n$

  $\text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$는 항상 $\mathbb{R}^n$의 부분집합이 된다.

{:.mt-1}
- $c \boldsymbol{x}_i \in \text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$ ($i = 1,\,2,\,\cdots,\,p$)

  $\text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$는 항상 각 벡터의 모든 스칼라 배 벡터들을 원소로 가진다.

{:.mt-1}
- $\boldsymbol{0} \in \text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$

  영벡터 $\boldsymbol{0}$는 $\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p$의 종류에 상관없이 언제나 $\text{Span}\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$의 원소가 된다.

</div></li>

<li><div markdown="block">

만약 벡터 $\boldsymbol{x}\_i \in \mathbb{R}^m$($i = 1,\,2,\,\cdots,\,p$)들에 대해

$$\text{Span}\{\boldsymbol{x}_1,\,\boldsymbol{x}_2,\,\cdots,\,\boldsymbol{x}_p\} = \mathbb{R}^m$$

가 성립한다면, 즉 벡터 $\boldsymbol{x}\_i \in \mathbb{R}^m$들의 linear combination으로 $\mathbb{R}^m$ 안의 모든 벡터들을 다 만들어낼 수 있다면, 이를

{:.text-align-center .mb-0}
"벡터 $\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$들은 $\mathbb{R}^m$을 span한다"

{:.text-align-center}
A set of vectors $\\{\boldsymbol{x}\_1,\,\boldsymbol{x}\_2,\,\cdots,\,\boldsymbol{x}\_p\\}$ spans(generates) $\mathbb{R}^m$

고 한다.

</div></li>

</ul>

# linear independence

<ul class="no-guide-line">

<li><div markdown="block">

$\mathbb{R}^n$ 안의 벡터들의 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$가 주어졌다고 하자. 이때 벡터 식

$$x_1 \boldsymbol{v}_1 + x_2 \boldsymbol{v}_2 + \cdots + x_p \boldsymbol{v}_p = \boldsymbol{0}$$

을 만족시키는 해가 오직 trivial solution($(x\_1,\,x\_2,\,\cdots,\,x\_p) = (0,\,0,\,\cdots,\,0)$)밖에 없다면, 벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$는 **linearly independent**하다고 한다.

반면 trivial solution 이외에도 위 벡터 식을 만족시키는 해가 있다면(= nontrivial solution이 있다면),

{:.mathjax-mb-0}
$$c_1 \boldsymbol{v}_1 + c_2 \boldsymbol{v}_2 + \cdots + c_p \boldsymbol{v}_p = \boldsymbol{0}$$

{:.text-align-center}
(단, $c\_1,\,c\_2,\,\cdots,\,c\_p$는 동시에 0이 아닌 실수)

벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$는 **linearly dependent**하다고 한다.

</div></li>

<li><div markdown="block">

벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$가 linearly dependent하다는 말은, 어떤 벡터를 다른 벡터들의 linear combination으로 나타낼 수 있다는 뜻이다.

{:.mathjax-mb-0}
$$\boldsymbol{v}_t = \sum_{i \neq t} \left ( -\frac{c_i}{c_t} \right ) \boldsymbol{v}_i$$

{:.text-align-center}
(단, $c\_t \neq 0$)

단 이 말은 벡터 집합 내 *모든* 벡터들을 다른 벡터들의 linear combination으로 나타낼 수 있다는 말이 아니다. linearly dependent한 벡터 집합일지라도 다른 벡터들의 linear combination으로 나타내지 못하는 벡터가 있을 수도 있다.

반대로 벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$가 linearly independent하다는 말은, 어떤 벡터를 나머지 벡터들의 linear combination으로 나타낼 수 없다는 뜻이다.

</div></li>

<li><div markdown="block">

행렬 $A$의 열들이 linearly independent하다는 것은, 방정식 $A\boldsymbol{x} = \boldsymbol{0}$가 오직 trivial solution만 가진다는 것과 동치이다.

</div></li>

<li><div markdown="block">

벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2 \\}$에 대해, 만약 한 벡터가 다른 한 벡터의 스칼라 배이면 이 벡터 집합은 linearly dependent하다.

만약 두 벡터가 각각 서로 다른 벡터의 스칼라 배가 아니라면, 이 벡터 집합은 linearly independent하다.

</div></li>

<li><div markdown="block">

$\mathbb{R}^n$ 안의 벡터 집합 $\\{ \boldsymbol{v}\_1,\,\boldsymbol{v}\_2,\,\cdots,\,\boldsymbol{v}\_p \\}$에 대해, 만약 각 벡터의 항목의 수 $n$보다 벡터의 수 $p$가 더 크면($p > n$), 이 벡터 집합은 항상 linearly dependent하다.

</div></li>

<li><div markdown="block">

영벡터를 원소로 가지고 있는 벡터 집합은 항상 linearly dependent하다.

</div></li>

</ul>