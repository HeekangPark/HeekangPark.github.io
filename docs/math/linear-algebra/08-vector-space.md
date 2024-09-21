---
title: "벡터공간 (Vector Space)"
order: 8
date_created: "2021-09-28"
date_modified: "2022-01-28"
---

<style src="./styles.scss"></style>

# 벡터공간(vector space)

- **벡터공간(vector space)** $V$란 집합의 임의의 원소 $\mathbf{u} ,\, \mathbf{v} ,\, \mathbf{w} \in V$과 임의의 실수 $c ,\, d \in \mathbb{R}$에 대해 다음 10가지 공리(axiom)를 만족하는 집합을 말한다.

  - 덧셈(addition)에 대해 닫혀있다. 즉, 임의의 두 원소 $\mathbf{u} ,\, \mathbf{v} \in V$에 대해, 두 원소의 덧셈 $\mathbf{u} + \mathbf{v}$도 $V$의 원소이다.
  - $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$
  - $\mathbf{u} + (\mathbf{v} + \mathbf{w}) = (\mathbf{u} + \mathbf{v}) + \mathbf{w}$
  - $\mathbf{u} + \mathbf{0} = \mathbf{u}$을 성립시키는 $\mathbf{0}$라는 원소가 존재한다. 이때, $\mathbf{0}$을 **영벡터(zero vector)** 라 한다.
  - 임의의 원소 $\mathbf{u} \in V$에 대해, $\mathbf{u} + (-\mathbf{u}) = \mathbf{0}$이 성립시키는 $-\mathbf{u}$라는 원소가 존재한다. 이때, $-\mathbf{u}$를 $\mathbf{u}$의 **negative**라 부른다.
  - 스칼라곱(scalar multiplication)에 대해 닫혀있다. 즉, 임의의 원소 $\mathbf{u} \in V$와 임의의 스칼라(실수) $c$에 대해, $\mathbf{u}$의 스칼라곱 $c\mathbf{u}$도 $V$의 원소이다.
  - $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$
  - $(c + d)\mathbf{u} = c\mathbf{u} + d\mathbf{u}$
  - $c(d\mathbf{u}) = (cd)\mathbf{u}$
  - $1\mathbf{u} = \mathbf{u}$
  {.border}

- 벡터공간 $V$는 다음과 같은 성질이 있다.

  - 임의의 원소 $\mathbf{u} \in V$에 대해, $0\mathbf{u} = \mathbf{0}$
  - 임의의 원소 $\mathbf{u} \in V$, 스칼라 $c \in \mathbb{R}$에 대해, $c\mathbf{0} = \mathbf{0}$
  - 임의의 원소 $\mathbf{u} \in V$에 대해, $-\mathbf{u} = (-1)\mathbf{u}$
  {.border}

- 벡터공간의 원소를 **벡터(vector)** 라 한다.

  우리가 통상적으로 생각하는 벡터("여러 개의 값을 하나의 순서 있는 덩어리로 묶어놓은 것")는 벡터의 한 가지 종류일 뿐이다. 이외에도 다양한 종류의 벡터들이 있을 수 있다. 예를 들면, 모든 2×3 행렬들의 집합은 벡터공간이고(임의의 2×3 행렬들에 대해 위 10가지 공리가 모두 성립한다), 이 집합의 한 원소(3×3 행렬)는 벡터이다. {.mt-1}

- 벡터공간의 예

  - 모든 [$n$-벡터](/math/linear-algebra/01-vector-matrix)들의 집합 : $\mathbb{R}^n$
  - 모든 [$m \times n$ 행렬](/math/linear-algebra/01-vector-matrix)들의 집합 : $\mathbb{R}^{m \times n}$
  - 모든 $n$차 다항식들의 집합 : $\mathbb{P}_n$
  {.border}


# subspace

- 벡터공간(vector space) $V$의 **subspace** $H$란 다음 3가지 조건을 만족하는 $V$의 부분집합을 의미한다.

  - $\mathbf{0} \in H$
  - $H$는 덧셈(addition)에 대해 닫혀있다. 즉, 임의의 두 원소 $\mathbf{u} ,\, \mathbf{v} \in H$에 대해, 두 원소의 덧셈 $\mathbf{u} + \mathbf{v}$도 $H$의 원소이다.
  - $H$는 스칼라곱(scalar multiplication)에 대해 닫혀있다. 즉, 임의의 원소 $\mathbf{u} \in H$와 임의의 스칼라(실수) $c$에 대해, $\mathbf{u}$의 스칼라곱 $c\mathbf{u}$도 $H$의 원소이다.
  {.border}

- subspace는 그 자체로 벡터공간이다.

- 특수한 subspace

  - zero subspace $\{\mathbf{0}\}$ : 영벡터만을 원소로 가지는 subspace
  {.border}

- 벡터공간 $V$의 원소 $\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \in V$에 대해, 이들의 [span](/math/linear-algebra/04-linear-combination) $H$는 $V$의 subspace이다.

  $$H = \textrm{Span}\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p\} \subset V$$

  이때, 집합 $\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p \}$을 $H$의 **spanning set** 또는 **generating set**이라 부른다.


# null space, column space, row space

## null space

- $m \times n$ 행렬 $A$에 대해, [homogeneous equation](/math/linear-algebra/02-linear-system) $A\mathbf{x} = \mathbf{0}$의 해 집합을 $A$의 **null space**라 하고, 기호로 $\textrm{Nul}\,A$라 쓴다. 즉,

  $$\textrm{Nul}\,A = \{\mathbf{x} \,|\, \mathbf{x} \in \mathbb{R}^{n},\,A\mathbf{x} = \mathbf{0}\}$$

  이다.

- $\textrm{Nul}\,A$는 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$에 의해 $\mathbb{R}^m$의 영벡터 $\mathbf{0}$으로 [매핑(mapping)](/math/linear-algebra/05-linear-transformation)되는 $\mathbb{R}^m$의 모든 원소들의 집합을 의미한다.

  <v-image src="08-vector-space-null-space.png"/>

  선형변환에서는 null space를 **커널(kernel)** 이라 부른다. 즉, 커널은 선형변환 $T: V \rightarrow W$에 대해 $T(\mathbf{u}) = \mathbf{0}$을 만족하는 모든 $\mathbf{u} \in V$의 집합을 의미한다.

- $m \times n$ 행렬 $A$의 null space $\textrm{Nul}\,A$는 $\mathbb{R}^n$의 subspace이다.

- $m \times n$ 행렬 $A$에 대해, [homogeneous linear system](/math/linear-algebra/02-linear-system) $A\mathbf{x} = \mathbf{0}$가 trivial solution만 가진다면, $\textrm{Nul}\,A = \{ \mathbf{0} \}$가 된다. 역으로, $\textrm{Nul}\,A = \{ \mathbf{0} \}$이면, homogeneous linear system $A\mathbf{x} = \mathbf{0}$은 trivial solution만 가진다.

  즉, $m \times n$ 행렬 $A$에 대해, 다음은 모두 동치이다.

  - $\textrm{Nul}\,A = \{ \mathbf{0} \}$
  - $A\mathbf{x} = \mathbf{0}$는 trivial solution만 가진다.
  - 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$는 [one-to-one](/math/linear-algebra/05-linear-transformation)이다.
  {.equivalent}

::: details 예제 : null space 구하기

행렬 $A$의 null space를 구해보자.

$$A = \begin{bmatrix}
-3 & 6 & -1 & 1 & -7\\[0.5em]
1 & -2 & 2 & 3 & -1\\[0.5em]
2 & -4 & 5 & 8 & -4\\[0.5em]
\end{bmatrix}$$

[augmented matrix](/math/linear-algebra/02-linear-system)를 이용해 $A\mathbf{x} = \mathbf{0}$의 해 집합을 구하면 된다.

$$[\,A \quad \mathbf{0}\,] = \begin{bmatrix}
-3 & 6 & -1 & 1 & -7 & 0\\[0.5em]
1 & -2 & 2 & 3 & -1 & 0\\[0.5em]
2 & -4 & 5 & 8 & -4 & 0\\[0.5em]
\end{bmatrix} \sim \begin{bmatrix}
1 & -2 & 0 & -1 & 3 & 0\\[0.5em]
0 & 0 & 1 & 2 & -2 & 0\\[0.5em]
0 & 0 & 0 & 0 & 0 & 0\\[0.5em]
\end{bmatrix}$$

이를 선형연립방정식으로 바꾸면 다음과 같고,

$$\begin{array} {r c r c r c r}
  x_1 & {}-{} & 2x_2 &       &     & {}-{} &  x_4 & {}+{} & 3x_5 & = & 0  \\[0.5em]
      &       &      &       & x_3 & {}+{} & 2x_4 & {}-{} & 2x_5 & = & 0  \\[0.5em]
      &       &      &       &     &       &      &       &    0 & = & 0  \\[0.5em]
\end{array}$$

$\mathbf{x}$는 다음과 같이 정리할 수 있다.

$$\mathbf{x} = \begin{bmatrix}
x_1\\[0.5em]
x_2\\[0.5em]
x_3\\[0.5em]
x_4\\[0.5em]
x_5\\[0.5em]
\end{bmatrix} = \begin{bmatrix}
2x_2 + x_4 - 3x_5\\[0.5em]
x_2\\[0.5em]
-2x_4 + 2x_5\\[0.5em]
x_4\\[0.5em]
x_5\\[0.5em]
\end{bmatrix} = x_2 \begin{bmatrix}
2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
0\\[0.5em]
0\\[0.5em]
\end{bmatrix} + x_4 \begin{bmatrix}
1\\[0.5em]
0\\[0.5em]
-2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
\end{bmatrix} + x_5 \begin{bmatrix}
-3\\[0.5em]
0\\[0.5em]
2\\[0.5em]
0\\[0.5em]
1\\[0.5em]
\end{bmatrix}$$

따라서, 집합 $\left \{\begin{bmatrix} 2\\[0.5em] 1\\[0.5em] 0\\[0.5em] 0\\[0.5em] 0\\[0.5em] \end {bmatrix},\,\begin{bmatrix} 1\\[0.5em] 0\\[0.5em] -2\\[0.5em] 1\\[0.5em] 0\\[0.5em] \end{bmatrix},\,\begin{bmatrix} -3\\[0.5em] 0\\[0.5em] 2\\[0.5em] 0\\[0.5em] 1\\[0.5em] \end{bmatrix} \right \}$은 $\textrm{Nul}\,A$의 spanning set이 된다.

$$\textrm{Nul}\,A = \textrm{Span} \left \{ \begin{bmatrix}
2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
0\\[0.5em]
0\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
1\\[0.5em]
0\\[0.5em]
-2\\[0.5em]
1\\[0.5em]
0\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
-3\\[0.5em]
0\\[0.5em]
2\\[0.5em]
0\\[0.5em]
1\\[0.5em]
\end{bmatrix} \right \}$$

:::

## column space

- $m \times n$ 행렬 $A$에 대해, $A$의 열(column)들로 만들 수 있는 모든 linear combination들의 집합을 $A$의 **column space**라 하고, 기호로 $\textrm{Col}\,A$라 쓴다. 즉, $A = [\,\mathbf{a}_1\quad\mathbf{a}_2\quad\cdots\quad\mathbf{a}_n\,]$이라 하면,

  $$\textrm{Col}\,A = \textrm{Span}\{ \mathbf{a}_1,\,\mathbf{a}_2,\,\cdots,\,\mathbf{a}_n \}$$

  이다.

- $m \times n$ 행렬 $A$의 column space $\textrm{Col}\,A$는 다음과 같이 쓸 수도 있다.

  $$\textrm{Col}\,A = \{ \mathbf{b} \,|\, \mathbf{x} \in \mathbb{R}^n,\,A\mathbf{x} = \mathbf{b} \}$$

  다시말해, $\textrm{Col}\,A$는 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$의 [치역(range)](/math/linear-algebra/05-linear-transformation)을 의미한다.

- $m \times n$ 행렬 $A$의 column space $\textrm{Col}\,A$는 $\mathbb{R}^m$의 subspace이다.

- $m \times n$ 행렬 $A$에 대해, 식 $A\mathbf{x} = \mathbf{b}$가 모든 $\mathbf{b} \in \mathbb{R}^m$에 대해 해가 존재한다면, $\textrm{Col}\,A = \mathbb{R}^m$이 된다(= $A$의 열들이 $\mathbb{R}^m$을 [span](/math/linear-algebra/04-linear-combination)한다). 역으로, $\textrm{Col}\,A = \mathbb{R}^m$이면(= $A$의 열들이 $\mathbb{R}^m$을 [span](/math/linear-algebra/04-linear-combination)하면), 식 $A\mathbf{x} = \mathbf{b}$는 모든 $\mathbf{b} \in \mathbb{R}^m$에 대해 해가 존재한다.

  즉, $m \times n$ 행렬 $A$에 대해, 다음은 모두 동치이다.

  - $A\mathbf{x} = \mathbf{b}$가 모든 $\mathbf{b} \in \mathbb{R}^m$에 대해 해가 존재한다.
  - $\textrm{Col}\,A = \mathbb{R}^m$
  - $A$의 열들이 $\mathbb{R}^m$을 [span](/math/linear-algebra/04-linear-combination)한다.
  {.equivalent}

::: details 예제 : column space 구하기

행렬 $A$의 column space를 구해보자.

$$A = \begin{bmatrix}
-3 & 6 & -1 & 1 & -7\\[0.5em]
1 & -2 & 2 & 3 & -1\\[0.5em]
2 & -4 & 5 & 8 & -4\\[0.5em]
\end{bmatrix}$$

위의 null space를 구할 때와 다르게, column space의 spanning set은 $A$의 열들 그 자체로 쉽게 구할 수 있다.

$$\textrm{Col}\,A = \textrm{Span} \left \{ \begin{bmatrix}
-3\\[0.5em]
1\\[0.5em]
2\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
6\\[0.5em]
-2\\[0.5em]
-4\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
-1\\[0.5em]
2\\[0.5em]
5\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
1\\[0.5em]
3\\[0.5em]
8\\[0.5em]
\end{bmatrix},\,\begin{bmatrix}
-7\\[0.5em]
-1\\[0.5em]
-4\\[0.5em]
\end{bmatrix} \right \}$$

:::

## row space

- $m \times n$ 행렬 $A$에 대해, $A$의 행(row)들로 만들 수 있는 모든 linear combination들의 집합을 $A$의 **row space**라 하고, 기호로 $\textrm{Row}\,A$라 쓴다. 즉, $A = \begin{bmatrix}\mathbf{r}_1\\\mathbf{r}_2\\\vdots\\\mathbf{r}_n\end{bmatrix}$이라 하면,

  $$\textrm{Row}\,A = \textrm{Span}\{ \mathbf{r}_1,\,\mathbf{r}_2,\,\cdots,\,\mathbf{r}_n \}$$

  이다.

- $A$의 행들은 $A^T$의 열이므로, 다음이 성립한다.

  $$\textrm{Row}\,A = \textrm{Col}\,A^T$$

- $m \times n$ 행렬 $A$의 row space $\textrm{Row}\,A$는 $\mathbb{R}^n$의 subspace이다.

- 행렬 $A$, $B$가 [행 동등하다면(row equivalent)](/math/linear-algebra/03-echelon-form) $\textrm{Row}\,A = \textrm{Row}\,B$이다.

- 행렬 $A$가 echelon form이면, $A$의 [nonzero 행](/math/linear-algebra/03-echelon-form)들의 집합은 $\textrm{Row}\,A$의 basis가 된다.

## null space vs. column space

|             |                                                                                                null space                                                                                                 |                                                                                                                                 column space                                                                                                                                 |
| :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    정의     |                                                    $\textrm{Nul}\,A = \{\mathbf{x} \,\|\, \mathbf{x} \in \mathbb{R}^{n},\,A\mathbf{x} = \mathbf{0}\}$                                                     |                                                                                      $\textrm{Col}\,A = \{ \mathbf{b} \,\|\, \mathbf{x} \in \mathbb{R}^n,\,A\mathbf{x} = \mathbf{b} \}$                                                                                      |
| subspace of |                                                                                              $\mathbb{R}^n$                                                                                               |                                                                                                                                $\mathbb{R}^m$                                                                                                                                |
| 원소의 성질 |                                                              벡터 $\mathbf{v} \in \textrm{Nul}\,A$는 항상 $A\mathbf{v} = \mathbf{0}$을 만족함                                                               |                                                                  벡터 $\mathbf{v} \in \textrm{Col}\,A$는 항상 $A\mathbf{x} = \mathbf{v}$를 [consistent](/math/linear-algebra/02-linear-system)하게 만드는 성질이 있음                                                                  |
|  집합 식별  |                                                      $\textrm{Nul}\,A$가 어떤 집합인지를 보는 것은 어려움 :<br/>$A\mathbf{x} = \mathbf{0}$을 풀어야 함                                                      |                                                                                      $\textrm{Col}\,A$가 어떤 집합인지를 보는 것은 쉬움 :<br/>$A$의 열들의 linear combination을 구하면 됨                                                                                      |
|  원소 식별  |                                    임의의 벡터 $\mathbf{v}$ 가 $\textrm{Nul}\,A$의 원소인지 판단하는 것은 쉬움 :<br/>$A\mathbf{v} = \mathbf{0}$를 만족하는지 확인하면 됨                                    |                                                                  임의의 벡터 $\mathbf{v}$ 가 $\textrm{Col}\,A$의 원소인지 판단하는 것은 어려움 :<br/>$A\mathbf{x} = \mathbf{v}$가 consistent한지 확인해야 함                                                                   |
|  선형변환   |                                                                                               커널(kernel)                                                                                                |                                                                                                                                 치역(range)                                                                                                                                  |
| 특수한 경우 | $\textrm{Nul}\,A = \{ \mathbf{0} \}$<br/>⇔ $A\mathbf{x} = \mathbf{0}$는 trivial solution만 가진다<br/>⇔ 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$는 [one-to-one](/math/linear-algebra/05-linear-transformation)임 | $\textrm{Col}\,A = \mathbb{R}^m$<br/>⇔ $\mathbb{R}^m$의 모든 원소 $\mathbf{b}$에 대해, $A\mathbf{x} = \mathbf{b}$는 consistent함<br/>⇔ 선형변환 $\mathbf{x} \mapsto A\mathbf{x}$는 $\mathbb{R}^n$을 $\mathbb{R}^m$ [위로 보낸다(onto)](/math/linear-algebra/05-linear-transformation). |


# basis

- 벡터공간 $V$의 한 subspace $H$에 대해, 다음 조건을 만족하는 벡터들의 집합 $\mathcal{B} = \{ \mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_p\} \subset V$를 $H$의 **basis**라 한다.

  - $\mathcal{B}$는 [linearly independent](/math/linear-algebra/04-linear-combination)한 집합이다.
  - $\{ \mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_p\}$는 $H$의 spanning set이다. 즉, $H = \textrm{Span}\{\mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_p\}$
  {.border}

  즉, basis는 $H$의 linearly independent한 spanning set이다.

- 벡터공간 $V$의 부분집합 $S = \{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p\}$에 대해, $H = \textrm{Span}\,\{\mathbf{v}_1,\,\mathbf{v}_2,\,\cdots,\,\mathbf{v}_p\}$라 하자. 이때, 다음이 성립한다.

  - 만약 $\mathbf{v}_k \in S$가 $S$의 나머지 원소들의 linear combination이라면, $S$에서 $\mathbf{v}_k$를 제거한 집합 $S' = S - \{\mathbf{v}_k\}$은 여전히 $H$를 [span](/math/linear-algebra/04-linear-combination)한다. 즉,
  
    $$H = \textrm{Span}\,S'$$

  - 만약 $H \neq \{\mathbf{0}\}$라면, $H$의 basis는 $S$의 부분집합 중 하나이다.
  {.border}

  즉, 임의의 spanning set에서 '불필요한(= 다른 벡터들의 linear combination으로 만들 수 있는)' 벡터들을 제거하다 보면 basis를 만들 수 있다.

- 벡터공간 $V$의 basis는 유일하지 않다. 하지만 언제나 원소의 수는 같다. basis의 원소의 수를 $V$의 **차원(dimension)** 이라 한다.

  조금 더 구체적으로, 어떤 벡터공간이 유한집합에 의해 span된다면, $V$는 **finite-dimensional**하다고 하고, $V$의 차원(dimension) $\textrm{dim}(V)$는 $V$의 basis의 원소의 개수로 정의된다. 만약 $V$가 유한집합에 의해 span되지 않는다면, $V$는 **infinite-dimensional**하다고 한다.{.mt-1}

- 영벡터로만 구성된 subspace $\{\mathbf{0}\}$의 차원은 0이다.

  $$\textrm{dim}(\{\mathbf{0}\}) = 0$$

- finite-dimensional한 벡터공간 $V$의 차원은 다음과 같은 성질이 있다.

  - 벡터공간 $V$의 차원보다 더 많은 벡터로 구성된 $V$의 부분집합은 항상 linearly dependent하다.
  - linearly independent한 $V$의 부분집합의 원소의 개수는 항상 $\textrm{dim}(V)$보다 작거나 같다.
  - $\textrm{dim}(V)$개의 원소로 이루어진 linearly independent한 $V$의 부분집합은 항상 $V$의 basis이다.
  - $\textrm{dim}(V)$개의 원소로 이루어진, $V$를 span하는 $V$의 부분집합은 항상 $V$의 basis이다.
  - $V$의 subspace $H$ 역시 finite-dimensional이고, $\textrm{dim}(H)$은 항상 $\textrm{dim}(V)$보다 작거나 같다 : $\textrm{dim}(H) \le \textrm{dim}(V)$
  {.border}

- 단위 행렬 $I_n$의 각 열들

  $$\mathbf{e}_1 = \begin{bmatrix}
  1\\[0.5em]
  0\\[0.5em]
  \vdots\\[0.5em]
  0\\[0.5em]
  \end{bmatrix},
  \quad
  \mathbf{e}_2 = \begin{bmatrix}
  0\\[0.5em]
  1\\[0.5em]
  \vdots\\[0.5em]
  0\\[0.5em]
  \end{bmatrix},
  \quad \cdots, \quad
  \mathbf{e}_n = \begin{bmatrix}
  0\\[0.5em]
  0\\[0.5em]
  \vdots\\[0.5em]
  1\\[0.5em]
  \end{bmatrix}$$

  의 집합 $\{\mathbf{e}_1,\,\mathbf{e}_2,\,\cdots,\,\mathbf{e}_n\}$은 $\mathbb{R}^n$의 basis이다.

  이때 집합 $\{\mathbf{e}_1,\,\mathbf{e}_2,\,\cdots,\,\mathbf{e}_n\}$을 $\mathbb{R}^n$의 **standard basis**라 한다.

- 행렬 $A$의 null space, column space와 basis 간에는 다음과 같은 관계가 있다. 

  - $\textrm{dim}(\textrm{Nul}\,A )$는 homogeneous linear system $A\mathbf{x} = \mathbf{0}$의 [free variable](/math/linear-algebra/02-linear-system)의 수와 같다.
  - $A$의 [pivot column](/math/linear-algebra/03-echelon-form)들의 집합은 $\textrm{Col}\,A$의 basis이다. 즉, $\textrm{dim}(\textrm{Col}\,A )$는 $A$의 pivot column의 수이다.
  {.border}

# rank

- 행렬 $A$의 column space $\textrm{Col}\,A$의 차원을 **rank**라 하고, 기호로 $\textrm{Rank}(A)$라 쓴다.

  $$\textrm{Rank}(A) = \textrm{dim}(\textrm{Col}\,A)$$

- $\textrm{Nul}\,A$의 차원을 $A$의 **nullity**라 한다.

- $m \times n$ 행렬 $A$에 대해, 다음 값들은 모두 같다.
 
  - $\textrm{Rank}(A)$
  - $\textrm{dim}(\textrm{Col}\,A)$
  - $\textrm{dim}(\textrm{Row}\,A)$
  - $\textrm{Rank}(A^T)$
  - $A$의 pivot position의 개수
  {.same}

- $m \times n$ 행렬 $A$에 대해, 다음이 성립한다.

  $$\textrm{Rank}(A) + \textrm{dim}(\textrm{Nul}\,A) = n$$

  다시말해,

  $$\textrm{dim}(\textrm{Col}\,A) + \textrm{dim}(\textrm{Nul}\,A) = n$$

  이다.

# 좌표(coordinate)

- 벡터공간 $V$의 basis $\mathcal{B} = \{ \mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_n\}$에 대해, $V$의 모든 원소 $\mathbf{x}$는

  $$\mathbf{x} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2 + \cdots + c_n \mathbf{b}_n$$

  을 만족시키는 스칼라 가중치 $c_i$들의 집합 $\{c_1,\,c_2,\,\cdots,\,c_n\}$을 각각 항상 유일하게 가진다. 이 $c_i$들을 **$\mathbf{x}$의 basis $\mathcal{B}$ 하에서의 좌표(coordinates of $\mathbf{x}$ relative to the basis $\mathcal{B}$)**, 혹은 단순히 **$\mathbf{x}$의 $\mathcal{B}$-좌표($\mathcal{B}$-coordinate of $\mathbf{x}$)** 라 한다.

- $c_i$들을 다음과 같이 벡터 형태로 나타낸 것을 **(basis $\mathcal{B}$ 하에서의) $\mathbf{x}$의 좌표 벡터(coordinate vector of $\mathbf{x}$ relative to $\mathcal{B}$)** 또는 **$\mathbf{x}$의 $\mathcal{B}$-좌표 벡터($\mathcal{B}$-coordinate vector of $\mathbf{x}$)** 라 한다.

  $$\left [ \mathbf{x} \right ]_{\mathcal{B}} = \begin{bmatrix}
  c_1\\[0.5em]
  c_2\\[0.5em]
  \vdots\\[0.5em]
  c_n\\[0.5em]
  \end{bmatrix}$$

- 벡터공간 $V$의 basis $\mathcal{B} = \{ \mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_n\}$에 대해, 변환 $\mathbf{x} \mapsto \left [ \mathbf{x} \right ]_{\mathcal{B}}$은 $V$에서 $\mathbb{R}^n$으로의 [one-to-one 선형 변환](/math/linear-algebra/05-linear-transformation)이다. 이 변환을 **($\mathcal{B}$로의) 좌표 변환(coordinate mapping determined by $\mathcal{B}$)** 이라 부른다.

- 벡터공간 $V$의 basis $\mathcal{B} = \{ \mathbf{b}_1,\,\mathbf{b}_2,\,\cdots,\,\mathbf{b}_n\}$, $\mathcal{C} = \{ \mathbf{c}_1,\,\mathbf{c}_2,\,\cdots,\,\mathbf{c}_n\}$에 대해, 다음과 같이 $\mathcal{B}$-좌표를 $\mathcal{C}$-좌표로 변환하는 $n \times n$ 행렬 $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$는 항상 존재하고 또 유일하다.

  $$\left [ \mathbf{x} \right ] _{\mathcal{C}} = \underset{\mathcal{C} \leftarrow \mathcal{B}}{P} \left [ \mathbf{x} \right ] _{\mathcal{B}}$$

  이때 행렬 $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$을 **$\mathcal{B}$에서 $\mathcal{C}$로의 좌표 변환 행렬(change-of-coordinates matrix from $\mathcal{B}$ to $\mathcal{C}$)** 라 부른다.

- $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$는 $\mathcal{B}$의 각 벡터들의 $\mathcal{C}$-좌표 벡터로 구성된다.

  $$\underset{\mathcal{C} \leftarrow \mathcal{B}}{P} = \left[\, \left[\mathbf{b}_1 \right]_{\mathcal{C}} \quad \left[\mathbf{b}_2 \right]_{\mathcal{C}} \quad \cdots \quad \left[\mathbf{b}_n \right]_{\mathcal{C}} \, \right]$$

- $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$의 열들은 항상 [linearly independent](/math/linear-algebra/04-linear-combination)하고, $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$은 항상 [역행렬이 존재한다(invertible)](/math/linear-algebra/06-inverse). 또한 변환 $\left [ \mathbf{x} \right ] _{\mathcal{B}} \mapsto \left [ \mathbf{x} \right ] _{\mathcal{C}}$는 $V$에서 $V$로의 [one-to-one 선형 변환](/math/linear-algebra/05-linear-transformation)이다.

- $\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}$의 역행렬 $\left(\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}\right)^{-1}$는 $\mathcal{C}$에서 $\mathcal{B}$로의 좌표 변환 행렬 $\underset{\mathcal{B} \leftarrow \mathcal{C}}{P}$과 같다. 즉,

  $$\left(\underset{\mathcal{C} \leftarrow \mathcal{B}}{P}\right)^{-1} = \underset{\mathcal{B} \leftarrow \mathcal{C}}{P}$$

  이다.


