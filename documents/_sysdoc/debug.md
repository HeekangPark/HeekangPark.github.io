---
icon: "fas fa-bug"
layout: document
date_modified: "2021-10-09"
---

<ul class="no-guide-line">

<li><div markdown="block">

**벡터공간(vector space)** $V$란 집합의 임의의 원소 $\mathbf{u} ,\, \mathbf{v} ,\, \mathbf{w} \in V$과 임의의 실수 $c ,\, d \in \mathbb{R}$에 대해 다음 10가지 공리(axiom)를 만족하는 집합을 말한다.

{:.no-guide-line}
- 덧셈(addition)에 대해 닫혀있다. 즉, 임의의 두 원소 $\mathbf{u} ,\, \mathbf{v} \in V$에 대해, 두 원소의 덧셈 $\mathbf{u} + \mathbf{v}$도 $V$의 원소이다.
- $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$
- $\mathbf{u} + (\mathbf{v} + \mathbf{w}) = (\mathbf{u} + \mathbf{v}) + \mathbf{w}$
- $\mathbf{u} + \mathbf{0} = \mathbf{u}$을 성립시키는 $\mathbf{0}$라는 원소가 존재한다. 이때, $\mathbf{0}$을 **영벡터(zero vector)**라 한다.
- 임의의 원소 $\mathbf{u} \in V$에 대해, $\mathbf{u} + (-\mathbf{u}) = \mathbf{0}$이 성립시키는 $-\mathbf{u}$라는 원소가 존재한다. 이때, $-\mathbf{u}$를 $\mathbf{u}$의 **negative**라 부른다.
- 스칼라곱(scalar multiplication)에 대해 닫혀있다. 즉, 임의의 원소 $\mathbf{u} \in V$와 임의의 스칼라(실수) $c$에 대해, $\mathbf{u}$의 스칼라곱 $c\mathbf{u}$도 $V$의 원소이다.
- $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$
- $(c + d)\mathbf{u} = c\mathbf{u} + d\mathbf{u}$
- $c(d\mathbf{u}) = (cd)\mathbf{u}$
- $1\mathbf{u} = \mathbf{u}$

</div></li>

</ul>