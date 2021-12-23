---
title: "Orthogonality"
date_created: "2021-10-31"
date_modified: "2021-12-24"
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

$m \times n$ 행렬 $A$에 대해, $A$의 [row space](/linear_algebra/vector-space) $\textrm{Row}\, A$의 orthogonal complement는 $A$의 null space $\textrm{Nul}\, A$이다. 또한, $A$의 column space $\textrm{Col}\, A$의 orthogonal complement는 $A^T$의 null space $\textrm{Nul}\, A^T$이다.

$$\begin{align}
(\textrm{Row}\, A)^\perp = \textrm{Nul}\, A\\[0.5em]
(\textrm{Col}\, A)^\perp = \textrm{Nul}\, A^T\\[0.5em]
\end{align}$$

</div></li>

<li><div markdown="block">

[역행렬](/linear_algebra/inverse)이 존재하는 $n \times n$ 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$의 역행렬이 존재한다.
- [$(\textrm{Col}\,A)^\perp = \\{ \mathbf{0} \\}$](/linear_algebra/vector-space)
- [$(\textrm{Nul}\,A)^\perp = \mathbb{R}^n$](/linear_algebra/vector-space)

</div></li>

</ul>

# orthogonal set

<ul>

<li><div markdown="block">

집합 $S = \\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\} \subset \mathbb{R}^n$의 서로 다른 두 원소들이 항상 orthogonal하면(즉, $\mathbf{u}\_i \cdot \mathbf{u}\_j = 0$이면(단, $i \neq j$)), 집합 $S$를 **orthogonal set**이라 한다.

</div></li>

<li><div markdown="block">

(nonzero 벡터들로 구성된) orthogonal set은 linearly independent하다. 즉, (nonzero 벡터들로 구성된) orthogonal set은 해당 집합으로 [span](/linear_algebra/linear-combination)된 [subspace](/linear_algebra/vector-space)의 [basis](/linear_algebra/vector-space)가 된다. 이렇게 basis가 된 orthogonal set을 **orthogonal basis**라 한다.

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

[단위벡터(unit vector)](/linear_algebra/vector-matrix)로 이루어진 orthogonal set을 **orthonormal set**이라 한다.

다시 말해, 집합 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\} \subset \mathbb{R}^n$의 서로 다른 두 원소들이 항상 orthogonal한 동시에($\mathbf{u}\_i \cdot \mathbf{u}\_j = 0$) 각 원소들의 크기가 모두 1이면($\lVert \mathbf{u}\_i \rVert=1$)이면, 이 집합을 orthonormal set이라 한다.

</div></li>

<li><div markdown="block">

(orthogonal set과 마찬가지로) orthonormal set은 linearly independent하다. 즉, orthonormal set은 해당 집합으로 [span](/linear_algebra/linear-combination)된 [subspace](/linear_algebra/vector-space)의 [basis](/linear_algebra/vector-space)가 된다. 이렇게 basis가 된 orthonormal set을 **orthonormal basis**라 한다.

</div></li>

<li><div markdown="block">

$\mathbb{R}^n$의 subspace $W$의 orthonormal basis $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$가 있다고 해 보자. 그러면 임의의 벡터 $\mathbf{y} \in W$는 다음과 같이 orthonormal basis의 원소들의 [linear combination](/linear_algebra/linear-combination)으로 나타낼 수 있다.

$$\mathbf{y} = c_1 \mathbf{u}_1 + c_2 \mathbf{u}_2 + \cdots + c_p \mathbf{u}_p$$

이때, 가중치 $c\_i$는 다음과 같이 계산된다(단, $i = 1,\,2,\,\cdots,\,p$).

$$c_i = \mathbf{y} \cdot \mathbf{u}_i$$

(위에서 봤던 orthogonal set의 성질과 동일하다. 다만, orthonormal set의 원소들은 $\lVert \mathbf{u}\_i \rVert = 1$이므로, 위와 같이 분모가 사라진다.)

</div></li>

<li><div markdown="block">

orthogonal set의 각 원소를 각각의 크기로 나누어주면 orthonormal set이 된다.

즉, orthogonal set $\\{\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_p\\}$가 주어졌을 때, 다음과 같이 하면 orthonormal set을 구할 수 있다.

$$\left\{ \frac{1}{\lVert \mathbf{v}_1 \rVert}\mathbf{v}_1,\,\frac{1}{\lVert \mathbf{v}_2 \rVert}\mathbf{v}_2,\,\cdots,\,\frac{1}{\lVert \mathbf{v}_p \rVert}\mathbf{v}_p \right\}$$

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $U$에 대해, 만약 $U$의 열들의 집합 $C = \\{\mathbf{c}\_1,\,\mathbf{c}\_2,\,\cdots,\,\mathbf{c}\_n\\}$가 orthornormal set이라면 다음과 같이 말한다(모두 같은 말이다).

- 행렬 $U$는 **orthonormal column**들을 가진다($U$ has orthonormal columns).
- 행렬 $U$는 orthogonal하다($U$ is orthogonal).
- 행렬 $U$는 orthonormal하다($U$ is orthonormal).
- 행렬 $U$는 **orthogonal matrix**이다.
- 행렬 $U$는 **orthonormal matrix**이다.

orthogonal matrix가 열들의 집합이 orthogonal set인 행렬을 의미하는 것이 아님에 주의하자! orthogonal matrix는 열들의 집합의 orthonormal set인 행렬을 의미하는 말로, orthonormal matrix와 동의어이다!

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $U$에 대해, 만약 $U$의 행들의 집합 $R = \\{\mathbf{r}\_1,\,\mathbf{r}\_2,\,\cdots,\,\mathbf{r}\_m\\}$이 orthonormal set이라면, "$U$는 **orthonormal row**들을 가진다($U$ has orthonormal rows)"고 한다.

</div></li>

<li><div markdown="block">

행렬 $U$에 대해, $U^T U = I$라면 $U$는 orthonormal matrix이다. 역으로, $U$가 orthonormal matrix이면 $U^T U = I$가 성립한다.

즉, orthonormal matrix $U$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $U^T U = I$
- $U$는 orthonormal matrix이다.

</div></li>

<li><div markdown="block">

$n \times n$ 정사각행렬 $U$가 orthonormal matrix라면, $U$는 항상 [역행렬](/linear_algebra/inverse)을 가지고, 항상 다음이 성립한다.

$$U^{-1} = U^T$$

</div></li>

<li><div markdown="block">

$m \times n$ orthonormal matrix $U$와, 벡터 $\mathbf{x} \in \mathbb{R}^n$, $\mathbf{y} \in \mathbb{R}^n$에 대해, 다음이 성립한다.

- orthonormal matrix에 임의의 벡터를 곱해도 벡터의 크기는 변하지 않는다.

    $$\lVert U \mathbf{x} \rVert = \lVert \mathbf{x} \rVert$$

- $(U \mathbf{x}) \cdot (U \mathbf{y}) = \mathbf{x} \cdot \mathbf{y}$

</div></li>

</ul>

# orthogonal decomposition

<ul>

<li><div markdown="block">

$\mathbb{R}^n$의 subspace $W$의 orthogonal basis $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$가 주어졌다고 해 보자.

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

이런 식으로 벡터 $\mathbf{y}$를 orthogonal한 두 개의 벡터 $\hat{\mathbf{y}}$와 $\mathbf{z}$의 합으로 나타내는 것을 **orthogonal decomposition**이라 한다. 또한, $\hat{\mathbf{y}}$를 $W$ 위로의 $\mathbf{y}$의 **orthogonal projection**이라 하고(orthogonal projection of $\mathbf{y}$ onto $W$), $\textrm{proj}\_{ {}\_W} \mathbf{y}$라 쓴다.

</div></li>

<li><div markdown="block">

만약 $\mathbf{y} \in W$라면, $\textrm{proj}\_{ {}\_W} \mathbf{y} = \mathbf{y}$가 된다.

</div></li>

<li><div markdown="block">

임의의 벡터 $\mathbf{v} \in W$에 대해(단, $\mathbf{v} \neq \textrm{proj}\_{ {}\_W} \mathbf{y}$) 다음이 성립한다.

$$\lVert \mathbf{y} - \textrm{proj}_{ {}_W} \mathbf{y} \rVert < \lVert \mathbf{y} - \mathbf{v} \rVert$$

기하학적으로, 위 부등식은 $\textrm{proj}\_{ {}\_W} \mathbf{y}$가 $W$에서 $\mathbf{y}$와 가장 가까운 점임을 의미한다.

또한 대수적으로, 위 부등식은 $\textrm{proj}\_{ {}\_W} \mathbf{y}$가 $W$의 원소 중 $\mathbf{y}$에 대한 최고의 근사(the best approximation to $\mathbf{y}$ by elements of $W$)임을 의미한다.

</div></li>

<li><div markdown="block">

만약 $\\{ \mathbf{u}\_1,\,\mathbf{u}\_2,\,\cdots,\,\mathbf{u}\_p\\}$가 orthonormal basis라면, $\textrm{proj}\_{ {}\_W} \mathbf{y}$은 다음과 같이 나타낼 수 있다.

$$\textrm{proj}_{ {}_W} \mathbf{y}
= \sum_{i=1} ^p {(\mathbf{y} \cdot \mathbf{u}_i )\mathbf{u}_i }
= (\mathbf{y} \cdot \mathbf{u}_1 ) \mathbf{u}_1 + (\mathbf{y} \cdot \mathbf{u}_2 ) \mathbf{u}_2 + \cdots + (\mathbf{y} \cdot \mathbf{u}_p ) \mathbf{u}_p$$

행렬 $U = [\, \mathbf{u}\_1\quad\mathbf{u}\_2\quad\cdots\quad\mathbf{u}\_p \,]$를 이용하면 $\textrm{proj}\_{ {}\_W} \mathbf{y}$를 더 간단하게 표현할 수 있다.

$$\textrm{proj}_{ {}_W} \mathbf{y} = U U^T \mathbf{y}$$

</div></li>

</ul>

# Gram-Schmidt process

<ul>

<li><div markdown="block">

$\mathbb{R}^n$의 nonzero [subspace](/linear_algebra/subspace) $W$의 basis $\\{\mathbf{x}\_1,\,\mathbf{x}\_2,\,\cdots,\,\mathbf{x}\_p\\}$가 주어졌다고 해 보자.

이때, $W$의 orthogonal basis $\\{\mathbf{v}\_1,\,\mathbf{v}\_2,\,\cdots,\,\mathbf{v}\_p\\}$는 다음 과정을 이용해 찾을 수 있다.

$$\begin{align}
\mathbf{v}_1 &= \mathbf{x}_1\\[0.5em]
\mathbf{v}_2 &= \mathbf{x}_2 - \frac{\mathbf{x}_2 \cdot \mathbf{v}_1 }{\lVert \mathbf{v}_1 \rVert ^2} \mathbf{v}_1\\[0.5em]
\mathbf{v}_3 &= \mathbf{x}_3 - \frac{\mathbf{x}_3 \cdot \mathbf{v}_1 }{\lVert \mathbf{v}_1 \rVert ^2} \mathbf{v}_1 - \frac{\mathbf{x}_3 \cdot \mathbf{v}_2 }{\lVert \mathbf{v}_2 \rVert ^2} \mathbf{v}_2\\[0.5em]
&\vdots\\[0.5em]
\mathbf{v}_p &= \mathbf{x}_p - \frac{\mathbf{x}_p \cdot \mathbf{v}_1 }{\lVert \mathbf{v}_1 \rVert ^2} \mathbf{v}_1 - \frac{\mathbf{x}_p \cdot \mathbf{v}_2 }{\lVert \mathbf{v}_2 \rVert ^2} \mathbf{v}_2 - \cdots - \frac{\mathbf{x}_p \cdot \mathbf{v}_{p-1} }{\lVert \mathbf{v}_{p-1} \rVert ^2} \mathbf{v}_{p-1}\\[0.5em]
\end{align}$$

이 과정을 **Gram-Schmidt process**라고 한다.

</div></li>

</ul>

# QR factorization

<ul>

<li><div markdown="block">

$m \times n$ 행렬 $A$의 열들의 집합이 linearly independent하다면, $A$는 다음과 같이 [factorize](/linear_algebra/matrix-factorization)할 수 있다.

$$A = QR$$

이때, $Q$는 $\textrm{Col}\,A$의 orthonormal basis의 원소들로 이루어진 $m \times n$ 크기의 행렬로, Gram-Schmidt process 등의 방법을 이용해 구할 수 있다. 그리고 $R$은 대각 성분이 모두 양수인 $n \times n$ 크기의 [upper triangular matrix](/linear_algebra/vector-matrix)로, 다음 식을 이용해 구한다.

$$R = Q^T A$$

이렇게 하는 matrix factorization 기법을 **QR factorization**이라 한다.

</div></li>

</ul>

# least-squares problem

<ul>

<li><div markdown="block">

때때로 선형연립방정식 $A\mathbf{x} = \mathbf{b}$이 [inconsistent](/linear_algebra/linear-system)한데도 해를 구해야 하는 경우가 있다(ex. linear regression). 이 경우 선형연립방정식 $A\mathbf{x} = \mathbf{b}$를 푸는 문제를 $\mathbf{b}$와 최대한 가까운 $A\mathbf{x}$를 찾는 문제로 생각하면 inconsistent한 선형연립방정식이어도 '해'를 구할 수 있다(이렇게 얻어진 해는 근사해가 된다).

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $A$와 벡터 $\mathbf{b} \in \mathbb{R}^m$에 대해, $\lVert \mathbf{b} - A\mathbf{x} \rVert$의 값이 최소가 되게 하는 $\mathbf{x}$를 찾는 문제를 **least-squares problem**이라 한다. 그리고 이렇게 찾은 해 $\hat{\mathbf{x}}$를 선형연립방정식 $A\mathbf{x} = \mathbf{b}$의 **least-squares solution**이라 한다. 즉, 모든 $\mathbf{x} \in \mathbb{R}^n$에 대해, 다음 부등식을 항상 만족시키는 $\hat{\mathbf{x}}$를 least-squares solution이라 한다.

$$\lVert \mathbf{b} - A \hat{\mathbf{x}} \rVert \le \lVert \mathbf{b} - A \mathbf{x} \rVert$$

이때 $\lVert \mathbf{b} - A \hat{\mathbf{x}} \rVert$의 값을 **least-squares error**라 한다.

</div></li>

<li><div markdown="block">

선형연립방정식 $A\mathbf{x} = \mathbf{b}$의 least-squares solution들의 집합은 선형연립방정식 $A^T A \mathbf{x} = A^T \mathbf{b}$의 (공집합이 아닌) 해 집합과 같다.

<div class="proof-folder" markdown="block">

$\mathbf{x}$의 값이 어떻든 $A \mathbf{x}$는 $\textrm{Col}\,A$의 원소이다. 그러므로 least-square problem은 $\mathbf{b}$와 가장 가까운 $\textrm{Col}\,A$의 원소를 찾는 문제와 같다.

따라서, least-square problem은 다음 선형연립방정식을 푸는 것과 같다.

$$A \mathbf{x} = \textrm{proj}_{ {}_{\textrm{Col}\,A}} \mathbf{b}$$

$\textrm{proj}\_{ {}\_{\textrm{Col}\,A}} \mathbf{b} \in \textrm{Col}\,A$이므로, 위 선형연립방정식은 항상 consistent하다.

이때 $\mathbf{b} - A\hat{\mathbf{x}}$는 $A$의 각 열과 orthogonal하므로, $A$의 각 열 $\mathbf{a}\_j$와 다음 식이 성립한다.

$$\mathbf{a}_j \cdot (\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{a}_j^T (\mathbf{b} - A\hat{\mathbf{x}}) = 0$$

이를 모으면 다음 식을 얻을 수 있다.

$$A^T (\mathbf{b} - A\hat{\mathbf{x}}) = 0$$

이 식을 정리하면 다음 식을 얻을 수 있다.

$$A^T A \mathbf{x} = A^T \mathbf{b}$$

</div>

이때, 선형연립방정식 $A^T A \mathbf{x} = A^T \mathbf{b}$를 선형연립방정식 $A\mathbf{x} = \mathbf{b}$의 **normal equations**이라 한다.

</div></li>

<li><div markdown="block">

$m \times n$ 행렬 $A$에 대해, 다음은 모두 동치이다.

{:.equivalent}
- $A$의 열들의 집합은 [linearly independent](/linear_algebra/linear-combination)하다.
- 행렬 $A^T A$는 [역행렬](/linear_algebra/inverse)이 존재한다(invertible).
- 선형연립방정식 $A\mathbf{x} = \mathbf{b}$는 각 $\mathbf{b} \in \mathbb{R}^n$에 대해 유일한 least-square solution을 가지고, 그 값은 다음과 같다.
    
    {:.mathjax-mb-0 .mathjax-mt-0}
    $$\hat{\mathbf{x}} = (A^T A)^{-1} A^T \mathbf{b}$$

- 행렬 $A$가 $A = QR$로 QR factorization된다면, 선형연립방정식 $A\mathbf{x} = \mathbf{b}$의 least-square solution은 다음과 같다.

    {:.mathjax-mb-0 .mathjax-mt-0}
    $$\hat{\mathbf{x}} = R^{-1}Q^T \mathbf{b}$$

</div></li>

<li><div markdown="block">

선형연립방정식 $A\mathbf{x} = \mathbf{b}$가 consistent하고 행렬 $A$가 $A = QR$로 QR factorization된다면, 위 방법을 사용하려 $R^{-1}$을 계산하는 것보다 식 $R \mathbf{x} = Q^T \mathbf{b}$를 직접 푸는게 더 빨리 해를 구할 수 있다.

</div></li>

</ul>
