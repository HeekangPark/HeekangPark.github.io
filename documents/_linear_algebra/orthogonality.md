---
title: "Orthogonality"
date_created: "2021-10-31"
date_modified: "2021-11-04"
---

# orthogonality

<ul>

<li><div markdown="block">

두 벡터 $\mathbf{u} \in \mathbb{R}^n$, $\mathbf{v} \in \mathbb{R}^n$에 대해, 두 벡터의 [내적](/linear_algebra/vector-matrix) $\mathbf{u} \cdot \mathbf{v} = 0$이라면, $\mathbf{u}$와 $\mathbf{v}$는 서로 **orthogonal**하다고 한다.

</div></li>

<li><div markdown="block">

영벡터는 모든 벡터들과 orthogonal하다.

</div></li>

<li><div markdown="block">

두 벡터 $\mathbf{u} \in \mathbb{R}^n$, $\mathbf{v} \in \mathbb{R}^n$에 대해, $\mathbf{u}$와 $\mathbf{v}$의 [$l\_2$ Norm](/linear_algebra/vector-matrix) 사이에 다음 식이 성립하면 $\mathbf{u}$와 $\mathbf{v}$는 서로 orthogonal하다.

$$\lVert \mathbf{u} + \mathbf{v} \rVert^2 = \lVert \mathbf{u} \rVert^2 + \lVert \mathbf{v} \rVert^2$$

역으로, $\mathbf{u}$와 $\mathbf{v}$가 서로 orthogonal하면 위 식이 성립한다.

즉, 두 벡터 $\mathbf{u} \in \mathbb{R}^n$, $\mathbf{v} \in \mathbb{R}^n$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $\mathbf{u}$와 $\mathbf{v}$는 orthogonal하다.
- $\lVert \mathbf{u} + \mathbf{v} \rVert^2 = \lVert \mathbf{u} \rVert^2 + \lVert \mathbf{v} \rVert^2$

</div></li>

<li><div markdown="block">

$\mathbf{R}^n$의 [subspace](/linear_algebra/vector-space) $W$의 모든 벡터들과 벡터 $\mathbf{z} \in \mathbb{R}^n$가 orthogonal하다면, $\mathbf{z}$는 $W$에 대해 **orthogonal**하다($\mathbf{z}$ is orthogonal to $W$)고 말한다.

또한, $W$에 대해 orthogonal한 모든 $\mathbf{z}$들의 집합을 $W$의 **orthogonal complement**라 하고, 기호로 $W^\perp$라 나타낸다.

</div></li>

<li><div markdown="block">

벡터 $\mathbf{x} \in \mathbb{R}^n$과 $\mathbb{R}^n$의 subspace $W$에 대해, 만약 $\mathbf{x} \in W^\perp$라면 $\mathbf{x}$는 $W$를 [span](/linear_algebra/linear-combination)하는 모든 벡터 집합의 원소들과 orthogonal하다. 역으로, $\mathbf{x}$가 $W$를 span하는 모든 벡터 집합의 원소들과 orthogonal하다면, $\mathbf{x} \in W^\perp$이다.

즉, 벡터 $\mathbf{x} \in \mathbb{R}^n$과 $\mathbb{R}^n$의 subspace $W$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $\mathbf{x} \in W^\perp$
- $\mathbf{x}$는 $W$를 span하는 모든 벡터 집합의 원소들과 orthogonal하다.

</div></li>

<li><div markdown="block">

$\mathbb{R}^n$의 subspace $W$에 대해, $W^\perp$은 $\mathbb{R}^n$의 subspace이다.

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $A$에 대해, $A$의 [row space](/linear_algebra/vector-space) $\text{Row}\, A$의 orthogonal complement는 $A$의 null space $\text{Nul}\, A$이다. 또한, $A$의 column space $\text{Col}\, A$의 orthogonal complement는 $A^T$의 null space $\text{Nul}\, A^T$이다.

$$\begin{align}
(\text{Row}\, A)^\perp = \text{Nul}\, A\\[0.5em]
(\text{Col}\, A)^\perp = \text{Nul}\, A^T\\[0.5em]
\end{align}$$

</div></li>

</ul>

# orthogonal set

<ul>

<li><div markdown="block">

$\mathbb{R}^n$의 부분집합 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$에 대해, 서로 다른 두 원소들이 항상 orthogonal하면(즉, $\mathbf{u}\_i \cdot \mathbf{u}\_j = 0$이면(단, $i \neq j$)), 집합 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$를 **orthogonal set**이라 한다.

</div></li>

<li><div markdown="block">

(nonzero 벡터들로 구성된) orthogonal set은 linearly independent한 집합이 된다. 즉, (nonzero 벡터들로 구성된) orthogonal set은 해당 집합으로 [span](/linear_algebra/linear-combination)된 [subspace](/linear_algebra/vector-space)의 [basis](/linear_algebra/vector-space)가 된다. 이때, 이렇게 basis가 된 orthogonal set을 **orthogonal basis**라 한다.

</div></li>

<li><div markdown="block">

$\mathbb{R}^n$의 subspace $W$의 orthogonal basis $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$가 있다고 해 보자. 그러면 임의의 벡터 $\mathbf{y} \in W$는 다음과 같이 orthogonal basis의 원소들의 [linear combination](/linear_algebra/linear-combination)으로 나타낼 수 있다.

$$\mathbf{y} = c_1 \mathbf{u}_1 + c_2 \mathbf{u}_2 + \cdots + c_p \mathbf{u}_p$$

이때, 가중치 $c\_i$는 다음과 같이 계산된다(단, $i = 1,\,2,\,\cdots,\,p$).

$$c_i = \frac{\mathbf{y} \cdot \mathbf{u}_i}{\lVert \mathbf{u}_i \rVert ^2} = \frac{\mathbf{y} \cdot \mathbf{u}_i}{\mathbf{u}_i \cdot \mathbf{u}_i }$$

</div></li>

</ul>

# orthonormal set

<ul>

<li><div markdown="block">

$\mathbb{R}^n$의 부분집합 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$의 서로 다른 두 원소들이 항상 orthogonal한 동시에($\mathbf{u}\_i \cdot \mathbf{u}\_j = 0$) 각 원소들의 크기가 모두 1이면($\lVert \mathbf{u}\_i \rVert=1$)이면, 이 집합을 **orthonormal set**이라 한다.

다시말해, [단위벡터(unit vector)](/linear_algebra/vector-matrix)로 이루어진 orthogonal set을 orthonormal set이라 한다.

</div></li>

<li><div markdown="block">

orthonormal set은 orthogonal set과 마찬가지로 linearly independent한 집합이 된다. 즉, orthonormal set은 해당 집합으로 [span](/linear_algebra/linear-combination)된 [subspace](/linear_algebra/vector-space)의 [basis](/linear_algebra/vector-space)가 된다. 이때, 이렇게 basis가 된 orthonormal set을 **orthonormal basis**라 한다.

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $U$에 대해, 만약 $U$의 열들의 집합 $C = \\{\mathbf{c}\_1,\,\mathbf{c}\_2,\,\cdots,\,\mathbf{c}\_n\\}$이 orthornormal set이라면, "$U$는 **orthonormal column**들을 가진다($U$ has orthonormal columns)"고 한다.

마찬가지로, $U$의 행들의 집합 $R = \\{\mathbf{r}\_1,\,\mathbf{r}\_2,\,\cdots,\,\mathbf{r}\_m\\}$이 orthonormal set이라면, "$U$는 **orthonormal row**들을 가진다($U$ has orthonormal rows)"고 한다.

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $U$에 대해, $U^T U = I$라면, $U$는 orthonormal column들을 가진다. 역으로, $U$가 orthornormal column들을 가진다면, $U^T U = I$가 성립한다.

즉, $m \times n$ 행렬 $U$과, $U$의 열들의 집합 $C = \\{\mathbf{c}\_1,\,\mathbf{c}\_2,\,\cdots,\,\mathbf{c}\_n\\}$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $U^T U = I$
- $C$는 orthonormal set이다.
- $U$는 orthonormal column들을 가진다.

</div></li>

<li><div markdown="block">

orthonormal column들을 가지는 $m \times n$ 행렬 $U$와, 벡터 $\mathbf{x} \in \mathbb{R}^n$, $\mathbf{y} \in \mathbb{R}^n$에 대해, 다음이 성립한다.

- orthonormal column들을 가지는 행렬에 벡터를 곱해도 벡터의 크기는 변하지 않는다.

    $$\lVert U \mathbf{x} \rVert = \lVert x \rVert$$

- $(U \mathbf{x}) \cdot (U \mathbf{y}) = \mathbf{x} \cdot \mathbf{y}$

</div></li>

</ul>

# orthogonal decomposition

<ul>

<li><div markdown="block">

$\mathbb{R}^n$의 subspace $W$가 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$를 orthogonal basis로 가진다고 해 보자.

이때, 임의의 벡터 $\mathbf{y} \in \mathbb{R}^n$은 다음과 같이 벡터 $\hat{\mathbf{y}} \in W$와 $\mathbf{z} \in W^{\perp}$의 합으로 유일하게 나타낼 수 있고,

$$\mathbf{y} = \hat{\mathbf{y}} + \mathbf{z}$$

그 값은 다음과 같다.

$$\begin{align}
\hat{\mathbf{y}}
&= \sum_{i=1} ^p {\frac{\mathbf{y} \cdot \mathbf{u}_i}{\lVert \mathbf{u}_i \rVert^2} \mathbf{u}_i}
= \sum_{i=1} ^p {\frac{\mathbf{y} \cdot \mathbf{u}_i}{\mathbf{u}_i \cdot \mathbf{u}_i} \mathbf{u}_i}\\[0.5em]
&= \frac{\mathbf{y} \cdot \mathbf{u}_1}{\lVert \mathbf{u}_1 \rVert^2} \mathbf{u}_1 + \frac{\mathbf{y} \cdot \mathbf{u}_2}{\lVert \mathbf{u}_2 \rVert^2} \mathbf{u}_2 + \cdots + \frac{\mathbf{y} \cdot \mathbf{u}_p}{\lVert \mathbf{u}_p \rVert^2} \mathbf{u}_p\\[0.5em]
&= \frac{\mathbf{y} \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1} \mathbf{u}_1 + \frac{\mathbf{y} \cdot \mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2} \mathbf{u}_2 + \cdots + \frac{\mathbf{y} \cdot \mathbf{u}_p}{\mathbf{u}_p \cdot \mathbf{u}_p} \mathbf{u}_p
\end{align}$$

$$\mathbf{z} = \mathbf{y} - \hat{\mathbf{y}}$$

이런 식으로 $\mathbf{y}$를 orthogonal한 두 개의 벡터 $\hat{\mathbf{y}}$와 $\mathbf{z}$의 합으로 나타내는 것을 **orthogonal decomposition**이라 한다. 또한, $\hat{\mathbf{y}}$를 $W$ 위로의 $\mathbf{y}$의 **orthogonal projection**이라 하고(orthogonal projection of $\mathbf{y}$ onto $W$), $\text{proj}\_{ {}\_W} \mathbf{y}$라 쓴다.

</div></li>

<li><div markdown="block">

만약 $\mathbf{y} \in W$라면, $\text{proj}\_{ {}\_W} \mathbf{y} = \mathbf{y}$가 된다.

</div></li>

<li><div markdown="block">

임의의 벡터 $\mathbf{v} \in W$에 대해(단, $\mathbf{v} \neq \text{proj}\_{ {}\_W} \mathbf{y}$) 다음이 성립한다.

$$\lVert \mathbf{y} - \text{proj}_{ {}_W} \mathbf{y} \rVert < \lVert \mathbf{y} - \mathbf{v} \rVert$$

기하학적으로, 위 부등식은 $\text{proj}\_{ {}\_W} \mathbf{y}$가 $W$에서 $\mathbf{y}$와 가장 가까운 점임을 의미한다.

또한 대수적으로, 위 부등식은 $\text{proj}\_{ {}\_W} \mathbf{y}$가 $W$의 원소 중 $\mathbf{y}$에 대한 최고의 근사(the best approximation to $\mathbf{y}$ by elements of $W$)임을 의미한다.

</div></li>

</ul>