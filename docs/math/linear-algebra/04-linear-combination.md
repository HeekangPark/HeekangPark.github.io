---
title: "Linear Combination"
order: 4
date_created: "2021-09-20"
date_modified: "2024-09-21"
---

<style src="./styles.scss"></style>

# linear combination

- 벡터 $\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p \in \mathbb{R}^n$, $\mathbf{y} \in \mathbb{R}^n$와 적당한 $c_1,\,c_2,\,\cdots,\,c_p \in \mathbb{R}$에 대해 다음이 성립한다면,

  $$\mathbf{y} = c_1 \mathbf{x}_1 + c_2 \mathbf{x}_2 + \cdots + c_p \mathbf{x}_p = \sum_{i=1} ^p c_i \mathbf{x}_i$$

  벡터 $\mathbf{y}$는 벡터 $\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p$들의 **linear combination**이라 부른다. 그리고 $c_1,\,c_2,\,\cdots,\,c_p$를 **가중치(weight)** 라 부른다.

# span

- 벡터 $\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p \in \mathbb{R}^n$가 주어졌을 때, 이들 벡터들의 linear combination으로 만들 수 있는 모든 벡터들의 집합을 $\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$이라 쓰고, "$\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p$에 의해 **span**된 집합"이라 읽는다.

  $$\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\} = \{c_1 \mathbf{x}_1 + c_2 \mathbf{x}_2 + \cdots + c_p \mathbf{x}_p \,|\, c_i \in \mathbb{R}\,(i = 1,\,2,\,\cdots,\,p)\}$$

- span은 다음과 같은 성질이 있다.

  - $\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\} \subset \mathbb{R}^n$ : 

    : $\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$는 항상 $\mathbb{R}^n$의 부분집합이 된다.

  - $c \mathbf{x}_i \in \textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$ ($i = 1,\,2,\,\cdots,\,p$)

    : $\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$는 항상 각 벡터의 모든 스칼라 배 벡터들을 원소로 가진다.

  - $\mathbf{0} \in \textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$

    : 영벡터 $\mathbf{0}$는 $\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p$의 종류에 상관없이 언제나 $\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$의 원소가 된다.

  {.border}

- 만약 벡터 $\mathbf{x}_i \in \mathbb{R}^m$($i = 1,\,2,\,\cdots,\,p$)들에 대해

  $$\textrm{Span}\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\} = \mathbb{R}^m$$

  가 성립한다면, 즉 벡터 $\mathbf{x}_i \in \mathbb{R}^m$들의 linear combination으로 $\mathbb{R}^m$ 안의 모든 벡터들을 다 만들어낼 수 있다면, 이를

  "벡터 $\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$들은 $\mathbb{R}^m$을 span한다" {.text-align-center .mt-1}

  A set of vectors $\{\mathbf{x}_1,\,\mathbf{x}_2,\,\cdots,\,\mathbf{x}_p\}$ spans(generates) $\mathbb{R}^m$ {.text-align-center .mb-1}

  고 한다.


# linear independence

- $\mathbb{R}^n$ 안의 벡터들의 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$가 주어졌다고 하자. 이때 벡터 식

  $$x_1 \mathbf{v}_1 + x_2 \mathbf{v}_2 + \cdots + x_p \mathbf{v}_p = \mathbf{0}$$

  을 만족시키는 해가 오직 trivial solution($(x_1,\,x_2,\,\cdots,\,x_p) = (0,\,0,\,\cdots,\,0)$)밖에 없다면, 벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$는 **linearly independent**하다고 한다.

  반면 trivial solution 이외에도 위 벡터 식을 만족시키는 해가 있다면(= nontrivial solution이 있다면), {.mt-1}

  $c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_p \mathbf{v}_p = \mathbf{0}$ {.text-align-center .mt-1}

  (단, $c_1,\,c_2,\,\cdots,\,c_p$는 동시에 0이 아닌 실수){.text-align-center .mb-1}

  벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$는 **linearly dependent**하다고 한다.

- 벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$가 linearly dependent하다는 말은, 집합 안의 몇몇 벡터를 다른 벡터들의 linear combination으로 나타낼 수 있다는 뜻이다.

  $\mathbf{v}_t = \displaystyle\sum_{i \neq t} \left ( -\frac{c_i}{c_t} \right ) \mathbf{v}_i$ {.text-align-center .mt-1}

  (단, $c_t \neq 0$) {.text-align-center .mb-1}

  단 이 말은 벡터 집합 내 *모든* 벡터들을 다른 벡터들의 linear combination으로 나타낼 수 있다는 말이 아니다. linearly dependent한 벡터 집합일지라도 다른 벡터들의 linear combination으로 나타내지 못하는 벡터가 있을 수도 있다.

  반대로 벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$가 linearly independent하다는 말은, 어떤 벡터를 나머지 벡터들의 linear combination으로 나타낼 수 없다는 뜻이다. {.mt-1}

- 행렬 $A$의 열들이 linearly independent하다는 것은, 방정식 $A\mathbf{x} = \mathbf{0}$가 오직 trivial solution만 가진다는 것과 동치이다.

- 벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2 \}$에 대해, 만약 한 벡터가 다른 한 벡터의 스칼라 배이면 이 벡터 집합은 linearly dependent하다.

  만약 두 벡터가 각각 서로 다른 벡터의 스칼라 배가 아니라면, 이 벡터 집합은 linearly independent하다.

- $\mathbb{R}^n$ 안의 벡터 집합 $\{ \mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$에 대해, 만약 각 벡터의 항목의 수 $n$보다 벡터의 수 $p$가 더 크면($p > n$), 이 벡터 집합은 항상 linearly dependent하다.

- 영벡터를 원소로 가지고 있는 벡터 집합은 항상 linearly dependent하다.

- 벡터 집합 $\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p\}$가 주어졌다고 해 보자(단, $p \ge 2$, $\mathbf{v}_1 \neq \mathbf{0}$). 이 벡터 집합이 linearly dependent하다면, 이전 벡터들 $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_{j-1}$의 linear combination으로 나타낼 수 있는 어떤 벡터 $\mathbf{v}_j$가 존재한다(단, $j>1$).

  역으로, 벡터 집합의 적당한 한 벡터 $\mathbf{v}_j$를 이전 벡터들 $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_{j-1}$의 linear combination으로 나타낼 수 있다면(단, $j>1$), 이 벡터 집합은 linearly dependent하다.{.mt-1}

  즉, 벡터 집합 $\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p\}$에 대해, 다음은 모두 동치이다. (단, $p \ge 2$, $\mathbf{v}_1 \neq \mathbf{0}$) {.mt-1}

  - 주어진 벡터 집합은 linearly independent하다.
  - 주어진 벡터 집합의 적당한 한 벡터 $\mathbf{v}_j$를 이전 벡터들 $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_{j-1}$의 linear combination으로 나타낼 수 있다. (단, $j>1$)
  {.equivalent}
