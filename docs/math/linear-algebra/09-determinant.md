---
title: "판별식 (Determinant)"
order: 9
date_created: "2021-10-14"
date_modified: "2022-01-28"
---

<style src="./styles.scss"></style>

# 판별식(determinant)이란?

- $n \times n$ 행렬 $A$가 주어졌다고 해 보자(단, $n \ge 2$).

  $$A = \begin{bmatrix}
  a_{11} & a_{12} & \cdots & a_{1n}\\[0.5em]
  a_{21} & a_{22} & \cdots & a_{2n}\\[0.5em]
  \vdots & \vdots & \ddots & \vdots\\[0.5em]
  a_{n1} & a_{n2} & \cdots & a_{nn}\\[0.5em]
  \end{bmatrix}$$

  이때, $A_{ij}$를 $A$에서 $i$행과 $j$열을 제거하고 만들어지는 $(n-1) \times (n-1)$ 행렬이라 하자.

  그리고 $A$의 **($i$, $j$)-cofactor** $C_{ij}$를 다음과 같이 정의하자.

  $$C_{ij} = (-1)^{i + j} \textrm{det}\,A_{ij}$$

- $n \ge 2$일 때, $A$의 **판별식(determinant)** $\textrm{det}\,A$는 다음과 같이 정의된다.

  $$\begin{align}
  \textrm{det}\,A &= a_{i1}\textrm{det}\,A_{i1} + a_{i2}\textrm{det}\,A_{i2} + \cdots + a_{in}\textrm{det}\,A_{in} = \sum_{j = 1} ^n a_{ij} \textrm{det}\,A_{ij}\\[0.5em]
  &= a_{1j}\textrm{det}\,A_{1j} + a_{2j}\textrm{det}\,A_{2j} + \cdots + a_{nj}\textrm{det}\,A_{nj} = \sum_{i = 1} ^n a_{ij} \textrm{det}\,A_{ij}\\[0.5em]
  \end{align}$$

  $n = 1$일 때(= 원소가 하나만 있을 때), 행렬 $A = [\,a_{11}\,]$의 판별식 $\textrm{det}\,A$은 그 유일한 원소의 값으로 정의된다.

  $$\textrm{det}\,A = a_{11}$$

- 행렬의 판별식은 다음과 같이 절대값 기호를 사용해 나타내기도 한다.

  $$\textrm{det}\,A = \begin{vmatrix}
  a_{11} & \cdots & a_{1n}\\[0.5em]
  \vdots & \ddots & \vdots\\[0.5em]
  a_{n1} & \cdots & a_{nn}\\[0.5em]
  \end{vmatrix}$$


# 판별식의 성질

정사각행렬 $A$에 대해, 다음이 성립한다.

- 만약 행렬 $A$가 [triangular matrix](/math/linear-algebra/01-vector-matrix)라면, $\textrm{det}\,A$는 $A$의 주 대각선(main diagonal)상 성분들의 곱이 된다.

- 만약 행렬 $A$에 [zero 행](/math/linear-algebra/03-echelon-form) 또는 [zero 열](/math/linear-algebra/03-echelon-form)이 있으면, $\textrm{det}\,A$는 0이 된다.

- [elementary row operation](/math/linear-algebra/03-echelon-form)에 대해 다음이 성립한다.

  - **replacement**
  
    행렬 $A$에 replacement 연산을 적용해 행렬 $B$를 얻었다면,
    
    $$\textrm{det}\,B = \textrm{det}\,A$$
    
    이다.

  - **interchange**
    
    행렬 $A$에 interchange 연산을 적용해 행렬 $B$를 얻었다면,
  
    $$\textrm{det}\,B = -\textrm{det}\,A$$
  
    이다.

  - **scaling**
  
    행렬 $A$에 $k$배 scaling 연산을 적용해 행렬 $B$를 얻었다면,
  
    $$\textrm{det}\,B = k \cdot \textrm{det}\,A$$
  
    이다.

- $\textrm{det}\,A \neq 0$이면 $A$의 역행렬이 존재한다(invertible). 역으로, $A$의 역행렬이 존재하면 $\textrm{det}\,A \neq 0$이다.

  즉, 정사각행렬 $A$에 대해, 다음은 모두 동치이다.

  - $A$의 역행렬이 존재한다(invertible).
  - $\textrm{det}\,A \neq 0$
  {.equivalent}

- $\textrm{det}\,A^T = \textrm{det}\,A$

- $n \times n$ 행렬 $A$, $B$에 대해,

  $$\textrm{det}\,AB = (\textrm{det}\,A)(\textrm{det}\,B)$$

  이다.

# Cramer's rule

- $n \times n$ 행렬 $A = [\, \mathbf{a}_1 \quad \mathbf{a}_2 \quad \cdots \quad \mathbf{a}_n \,]$과 벡터 $\mathbf{b} \in \mathbb{R}^n$에 대해, $A$의 $i$번째 열 $\mathbf{a}_i$를 $\mathbf{b}$로 교체한 행렬을 $A_i (\mathbf{b})$라 하자.

  $$A_{i}(\mathbf{b}) = [\,\mathbf{a}_1 \quad \cdots \quad \mathbf{a}_{i-1} \,\,\, \bbox[#e2e27a, 5px]{\,\,\mathbf{b}\,\,} \,\,\, \mathbf{a}_{i+1} \quad \cdots \quad \mathbf{a}_n \,]$$

- 역행렬이 존재하는 $n \times n$ 행렬 $A$가 주어졌다고 해 보자. 임의의 벡터 $\mathbf{b} \in \mathbb{R}^n$에 대해, 식 $A \mathbf{x} = \mathbf{b}$는 항상 유일한 해를 가지고, 그 해는 다음과 같다.

  $$\mathbf{x} = \begin{bmatrix}
  \displaystyle\frac{\textrm{det}\,A_1 (\mathbf{b})}{\textrm{det}\,A}\\[0.5em]
  \displaystyle\frac{\textrm{det}\,A_2 (\mathbf{b})}{\textrm{det}\,A}\\[0.5em]
  \vdots\\[0.5em]
  \displaystyle\frac{\textrm{det}\,A_n (\mathbf{b})}{\textrm{det}\,A}\\[0.5em]
  \end{bmatrix}$$

  이를 **Crammer's rule**이라 한다.
