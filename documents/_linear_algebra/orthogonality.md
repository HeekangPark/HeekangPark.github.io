---
title: "Orthogonality"
date_created: "2021-10-31"
date_modified: "2021-10-31"
---

# orthogonality

<ul>

<li><div markdown="block">

두 벡터 $\mathbf{u} \in \mathbb{R}^n$, $\mathbf{v} \in \mathbb{R}^n$에 대해, 두 벡터의 [내적](/linear_algebra/vector-matrix) $\mathbf{u} \cdot \mathbf{v} = 0$이라면, $\mathbf{u}$와 $\mathbf{v}$는 서로 **orthogonal**하다고 한다.

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

$m \times n$ 행렬 $A$에 대해, $A$의 [row space](/linear_algebra/vector-space) $\text{Row}\, A$의 orthogonal complement는 $A$의 null space $\text{Nul}\, A$이다. 또한, $A$의 column space $\text{Col}\, A$의 orthogonal complement는 $A^\intercal$의 null space $\text{Nul}\, A^\intercal$이다.

$$\begin{align}
(\text{Row}\, A)^\perp = \text{Nul}\, A\\[0.5em]
(\text{Col}\, A)^\perp = \text{Nul}\, A^\intercal\\[0.5em]
\end{align}$$

</div></li>

</ul>