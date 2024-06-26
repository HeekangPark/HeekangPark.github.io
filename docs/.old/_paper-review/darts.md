---
title: "DARTS (Differentiable Architecture Search)"
date_created: "2020-10-05"
date_modified: "2022-08-15"
---

# 논문 분석

[Hanxiao Liu, Karen Simonyan, Yiming Yang, \<DARTS: Differentiable Architecture Search\>, ICLR 2019](https://arxiv.org/abs/1806.09055)

## Introduction

{:.guide-line}
- Automatically Searched Architecture(NAS)는 Image Classification과 Object Detection에서 높은 성능을 보임
- 하지만 NAS는 연산 비용이 너무 큼 → 이를 보완할 수 있는 다양한 방법이 제안됨
  - 그러나 본질적인 확장성(scalability) 문제가 남아있음
  - 강화학습, 유전 알고리즘(Evolution), MCTS, SMBO, Bayesian Optimazation 등 (NAS를 위한) 주요한 접근법들이 태생적으로 가지고 있는 비효율성(inefficiency)은 Architecture Search 과정을 불연속적인 도메인(discrete domain)에 대한 Black-Box 최적화 문제로 만듦 → 다수의 (만들어진) Architecture 평가가 요구됨

- 이에 저자는 DARTS(Differentiable Architecture Search)를 제안함
  - 후보 구조(Candidate Architecture)들의 불연속적인 집합(discrete set)을 탐색하는 대신, 저자들은 탐색 공간을 연속이 되게(continuous) 완화(relax)하여 Architecture들이 경사하강법(Gradient Descent)으로 그들의 Validation Set Performance에 대해 최적화될 수 있도록 함
  - 비효율적인 Black-Box 탐색에 비해, 그라디언트 기반 최적화(Gradient-based Optimization)의 데이터 효율성(Data Efficiency)은 적은 양의 컴퓨팅 자원만을 가지고도 SOTA를 달성하게 해 줌
- 저자에 의하면 DARTS는 ENAS보다 높은 성능을 보임
- 저자에 의하면 DARTS는 Controller를 사용하지 않는 방법, Hypernetwork를 사용하지 않는 방법, Performance Predictor를 사용하지 않는 방법보다 훨씬 간단하면서 CNN, RNN 둘 다 만드는데 사용할 수 있을 정도로 일반적(Generic)이다.
- 연속 도메인(Continuous Domain)에서 Architecture를 탐색하는 발상은 이전에도 있었지만, 이전 연구들은 CNN에서의 필터 모양 혹은 Branching 패턴 등 Architecture의 특정 부분을 fine-tuning하는데만 사용됨
- 하지만 DARTS는 풍부한 탐색 공간에서 복잡한 그래프 topology로 고성능의 Architecture Building Block을 학습할 수 있음

- 저자들의 실험에 의하면, DARTS를 이용하면 Image Classification 문제에서 CIFAR-10 데이터에 대해 2.76 ± 0.09%의 test error를 가지는 파라미터 3.3M개의 Convolutional Cell을 만들 수 있음
  - 현재 SOTA인 Regularized Evolution으로 만든 모델과 견줄만함
    - 3배 더 많은 컴퓨팅 자원을 사용
- 위 모델을 ImageNet(mobile setting)에 전이시켰을(transfer) 때 26.7%의 Top-1 Error Rate를 보임
  - 강화학습으로 만든 최고 모델과 견줄만함
- 언어 모델링(Language Modeling) 문제에서, DARTS는 Penn Treebank 데이터에 대해 55.7 text perplexity를 보이는 Recurrent Cell을 성공적으로 찾음
  - extensively tuned LSTM과 NAS, ENAS를 능가

## Differentiable Architecture Search

### Search Space

{:.guide-line}
- Objective : Computation Cell 찾기
  - 최종 Architecture의 Building Block
  - Computation Cell은 여러 층 쌓여서(stack) Convolutional Network를 구성하거나, 재귀적으로 연결되어(Recursively connected) Recurrent Network를 구성

- Cell은 $N$개 node의 Ordered Sequence로 이루어진 Directed Acyclic Graph이다. 
  - $x^{(i)}$ : $i$번째 node. Latent Representation(ex. CNN의 feature map)을 의미
  - $(i, j)$ : $x^{(i)}$ → $x^{(j)}$ 방향으로의 directed edge. $x^{(i)}$에 연산 $o^{(i, j)}$를 적용함을 의미.
- 한 Cell은 두 개의 입력 node와 한 개의 출력 node를 가짐
  - Convolutional Cell에서, 입력 node는 이전 두 레이어의 출력값
  - Recurrent Cell에서, 입력 node는 현재 단계(step)의 입력값과 이전 단계로부터 넘어온 상태(state)
  - 출력값은 모든 중간 node들에 Reduction Operation(ex. Concatenation)을 적용한 값
- 각 중간 node $x^{(j)}$들은 다음 연산을 수행 : $x^{(i)} = \sum _{i < j} o^{(i, j)} (x^{(i)})$
  - $o^{(i, j)}$에는 "zero operation"이 존재 : 두 node $x^{(i)}$, $x^{(j)}$ 간 연결이 되어있지 않음을 표현
- Cell을 학습시키는 것은 각 edge에서 어떤 연산을 할지를 학습하는 것

### Continuous Relaxation and Optimization

{:.guide-line}
- Continuous Relaxation : 탐색 공간을 연속적으로 만들기 위해, (한 edge에서) 가능한 모든 연산에 대해 단정적으로 선택하지 않고 softmax를 적용함
  - Terminology
    - $\mathcal{O}$ : (한 edge에서 가능한 모든) 후보 연산(ex. convolution, max pooling, zero 등)들의 집합
    - $\alpha^{(i, j)}$ : node $i$, $j$ 사이의 Operation Mixing Weights를 나타내는 $\|\mathcal{O}\|$차원의 벡터
  - $\bar{o}^{(i, j)}(x) = \sum \_{o \in \mathcal{O}} \frac{\exp (\alpha\_o ^{(i, j)})}{\sum\_{o' \in \mathcal{O}} \exp (\alpha\_{o'} ^{(i, j)}) } o(x)$
- Architecture Search는 연속변수들의 집합 $\alpha = \\{ \alpha^{(i, j)} \\}$를 학습하는 것
- 탐색이 완료된 후에는(= $\alpha$가 모두 학습된 후에는) 각 mixed operation $\bar{o}^{(i, j)}(x)$를 가장 그럴듯한 operation $o^{(i, j)} = \textrm{argmax} _{o \in \mathcal{O} } \alpha _{o} ^{(i, j)}$으로 대치
- 이후 글에서 $\alpha$를 (encoding of the) architecture라 부름

- 최종 목표는 architecture $\alpha$와 mixed operation의 가중치 $w$(ex. Convolution Filter의 가중치)를 학습하는 것
- DARTS는 경사하강법을 이용해 validation loss를 최적화(최소화)하는 것을 목표로 함
  - Terminology
    - $\mathcal{L}_{train}$ : train loss
    - $\mathcal{L}_{val}$ : validation loss
  - $\mathcal{L}\_{train}(w, \alpha^{\*})$를 최소화하는 $w^{\*} = \textrm{argmin}\_w \mathcal{L}\_{train}(w, \alpha^{\*})$에 대해, $\mathcal{L}\_{val}(w^{\*}, \alpha^{\*})$를 최소화하는 $\alpha^{\*}$를 찾는 것이 목표 → Bilevel Optimization Problem, Gradient-based Hyperparameter Optimization
    - 위 최적화 문제는 $\alpha$가 upper-level variable, $w$가 lower-level variable인 Bilevel Optimization Problem
    - $\min \_{\alpha} \mathcal{L}\_{val}(w^{\*}(\alpha), \alpha)$ s.t. $w^{\*}(\alpha) = \textrm{argmin}\_{w} \mathcal{L}\_{train} (w, \alpha)$
    - architecture $\alpha$를 특별한 형태의 hyperparameter로 본다면, 위 최적화 문제는 Gradient-based Hyperparameter Optimization이라 해석할 수 있음
      - 대신, $\alpha$는 스칼라 값을 가지는 hyperparameter(ex. 학습률)들보다 높은 차원을 가짐 → 최적화하기 어려움

### Approximate Architecture Gradient

{:.guide-line}
- inner optimization이 너무 비쌈 → architecture의 정확한 그라디언트를 구하는 것은 어려움
- 따라서 저자들은 다음 근사법을 제안함
  - $\nabla \_{\alpha} \mathcal{L}\_{val} (w^{\*}, \alpha) \approx \nabla \_{\alpha} \mathcal{L}\_{val} (w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha), \alpha)$
    - $w$ : 현재 weight
    - $\xi$ : inner optimization($\textrm{argmin}\_{w} \mathcal{L}\_{train} (w, \alpha)$) 과정에서 각 step마다 사용하는 학습률
  - $w^{\*}(\alpha)$ 대신 $w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha)$를 사용
    - $w^{\*}(\alpha)$를 구하려면 $\mathcal{L}\_{train} (w, \alpha)$가 수렴할 때까지 학습시켜야 함
    - 대신 한 번의 training step을 돌려(single training step) 얻은 $w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha)$를 사용
    - 만약 $w$가 local optimum이면 $\nabla \_{w} \mathcal{L}\_{train}(w, \alpha)$은 0이 되므로 $w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha) = w$
  - 다양한 논문에서 자주 사용되는 근사법

- chain rule을 적용하면 $\nabla \_{\alpha} \mathcal{L}\_{val} (w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha), \alpha) = \nabla \_{\alpha} \mathcal{L}\_{val} (w',\alpha) - \xi \nabla\_{\alpha, w} ^2 \mathcal{L}\_{train} (w, \alpha) \nabla\_{w'} \mathcal{L}\_{val}(w', \alpha)$이 됨
  - $w'$ : 한 step을 진행했을 때의 $w$ 값 (weights for a one-step forward model) ($= w - \xi \nabla \_{w} \mathcal{L}\_{train}(w, \alpha)$)
  - $\nabla\_{\alpha, w} ^2 \mathcal{L}\_{train} (w, \alpha) \nabla\_{w'} \mathcal{L}\_{val}(w', \alpha)$를 계산하는 비용이 너무 큼
  - Finite Difference Approximation으로 근사
    - $\nabla\_{\alpha, w} ^2 \mathcal{L}\_{train} (w, \alpha) \nabla\_{w'} \mathcal{L}\_{val}(w', \alpha) \approx \frac{\nabla \_{\alpha} \mathcal{L}\_{train} (w^+, \alpha) - \nabla \_{\alpha} \mathcal{L}_{train}(w^-, \alpha)}{2\epsilon}$
    - $w^+ = w + \epsilon \nabla \_{w'} \mathcal{L}\_{val} (w', \alpha)$
    - $w^- = w - \epsilon \nabla \_{w'} \mathcal{L}\_{val} (w', \alpha)$
  - 시간복잡도 $\mathcal{O}(\|\alpha\|\|w\|)$에서 $\mathcal{O}(\|\alpha\| + \|w\|)$으로 감소

- First-order Approximation : $\xi = 0$이라 놓고 최적화 문제를 푸는 것
  - 현재 $w$가 $w^{\*}$이라 가정한 것과 같음
  - 저자들의 실험에 의하면, 속도는 빨라지지만 성능은 감소함
- Second-order Approximation : $\xi > 0$이라 놓고 최적화 문제를 푸는 것

### Deriving Discrete Architectures

{:.guide-line}
- 각 node에서 모든 non-zero operation 중 상위 $k$개의 강한 operation을 선택
  - operation의 강함은 $\sum \_{o \in \mathcal{O}} \frac{\exp (\alpha\_o ^{(i, j)})}{\sum\_{o' \in \mathcal{O}} \exp (\alpha\_{o'} ^{(i, j)}) } o(x)$으로 정의
- Convolutional Cell을 만들기 위해서 $k=2$를, Recurrent Cell을 만들기 위해서 $k=1$을 사용
- Operation 선택 과정에서 zero operation은 제외하고 진행
  - 기존 NAS 모델들과 비교하기 위해, 각 node 당 정확히 $k$개의 non-zero incoming edge가 필요
  - zero operation의 logit의 증가는 단순히 영향받은 node representation의 scale을 키우는 역할밖에 못하고, batch normalization 때문에 최종 분류 결과에 영향을 끼치지 못한다.

## Experiments and Results

{:.guide-line}
- 실험은 두 Stage로 진행
  - Stage 1 : DARTS를 사용한 Architecture Search. Validation Performance를 바탕으로 최고의 Cell을 찾음.
  - Stage 2 : Stage 1에서 찾은 Cell을 이용해 큰 모델 제작. 만들어진 모델을 바닥부터 학습시켜 성능 확인.
- CIFAR-10과 PTB에 대해 실험 진행
  - CIFAR-10으로 학습된 Cell이 ImageNet에 얼마나 잘 전이되는지, PTB로 학습된 Cell이 WikiText-2에 얼마나 잘 전이되는지도 확인

### Architecture Search

#### Searching for Convolutional Cells on CIFAR-10

{:.guide-line}
- $\mathcal{O}$ = { 3×3 Separable Convolution, 5×5 Separable Convolution, 3×3 Dilated Separable Convolution, 5×5 Dilated Separable Convolution, 3×3 Max Pooling, 3×3 Average Pooling, Identity, Zero }
  - 모든 연산은 stride=1, 원래의 이미지 크기가 유지될 수 있도록 적당한 padding 사용
- ReLU-Conv-BN 순으로 연산 적용
- 각 Separable Convolution은 항상 두 번씩 적용

- 저자들은 $N = 7$로 놓고 실험 진행
- Output Node는 Input Node를 제외한 모든 node들의 depthwise concatenation한 것
- 최종 모델은 Cell을 여러 번 쌓아 만들어짐
- $k$번째 Cell의 첫 번째와 두 번째 node의 입력은 각각 $k-2$번째와 $k-1$번째 node의 출력값
- 1×1 Convolution은 필수적으로 들어감
- 최종 모델의 1/3, 2/3 깊이에 위치한 Cell은 Reduction Cell
  - Input Node와 맞닿은 모든 Operation은 stride=2를 사용

#### Searching for Recurrent Cells on Penn Treebank

{:.guide-line}
- $\mathcal{O}$ = { tanh, ReLU, sigmoid, identity, zero }
- Linear Transformation 이후 $\mathcal{O}$의 한 원소 연산을 실행

- 저자들은 $N = 12$로 놓고 실험 진행
- 가장 첫 번째 중간 node는 두 개의 input node에 각각 linear transformation을 적용한 후, 둘을 더해, tanh를 적용한 값을 전달받음
  - ENAS에서 했던 것과 동일
- Cell의 나머지 부분들은 학습을 통해 결정
- Output Node는 모든 중간 노드들의 평균값
- Architecture Search 과정에서 Gradient Explosion을 막기 위해 각 node마다 batch normalization을 적용
- 저자들의 Recurrent Network는 한 종류의 Cell로만 구성됨

### Architecture Evaluation

{:.guide-line}
- 최종 성능 평가를 위해, 저자들은 DARTS를 다른 random seed에 대해 4회 돌린 후, validation performance가 가장 높은 최고의 cell을 선정
  - CIFAR-10에 대해서는 100 epoch 학습, PTB에 대해서는 300 epoch 학습
- Architecture Search 중 학습된 weight는 버리고, weight를 random하게 초기화한 후 다시 처음부터 학습하여 test set에 대한 performance를 측정
  - test set은 Architecture Search 혹은 Architecture Selection 과정에서 전혀 사용되지 않음
  - 마지막 최종 모델 성능 평가에서만 사용

### Result Analysis

{:.guide-line}
- DARTS는 기존 SOTA에 비해 1/3 정도의 연산력만 사용하면서 비슷한 성능을 냄
- 약간 더 오래 탐색하면 ENAS보다 성능이 좋아짐

## Concolusion

{:.guide-line}
- DARTS를 사용하면 기존 SOTA와 성능은 비슷하거나 더 좋은데, 연산력은 오히려 적게 사용함
