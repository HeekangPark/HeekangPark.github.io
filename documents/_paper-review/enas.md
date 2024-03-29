---
title: "ENAS (Efficient Neural Architecture Search)"
date_created: "2020-09-24"
date_modified: "2022-08-15"
---

ENAS(Efficient Neural Architecture Search)는 의 논문 \<Efficient Neural Architecture Search via Parameter Sharing\>에 등장한 NAS 기술이다.

# 논문 분석

[Hieu Pham, Melody Y. Guan, Barret Zoph, Quoc V. Le, Jeff Dean, \<Efficient Neural Architecture Search via Parameter Sharing\>, PMLR 80:4095-4104, 2018](https://arxiv.org/abs/1802.03268)

## Introduction

{:.guide-line}
- NAS(Neural Architecture Search)는 이미지 분류(Image Classification)와 언어 모델(Language Model)을 위한 모델 구조 설계에 성공적으로 적용되어옴

- NAS의 "RNN Controller"는 다음을 반복하는 반복문 안에서 학습됨
  - Controller는 우선 Candidate Architecture를 뽑음 : 이를 Child Model이라 함
  - Controller는 뽑은 Child Model을 수렴(Convergence)할 때까지 학습시켜 풀고자 하는 task에 대한 성능을 확인
  - Controller는 확인한 성능을 유도 신호(Guiding Signal)로 사용하여 더 유망한 Architecture를 찾는데 사용
  
- **NAS는 놀라운 성과를 냈지만, Computation Cost가 너무 크다.**
- 저자들은 **Child Model의 성능을 확인하기 위해 수렴할 때까지 학습시키는 것이 NAS의 Computational Bottleneck**임을 관찰
  - 심지어 성능 확인 후에는 Child Model의 학습된 Weight는 모두 폐기한다. => Computational Cost 낭비

- 저자들은 **모든 Child Model들이 Weight를 공유(Share)하도록 강제**하여 NAS의 효율성을 증가시킴
  - 이렇게 하면 각 Child Model은 밑바닥(Scratch)부터 (수렴할 때까지) 학습하는 것을 피할 수 있다.
  - 누가 봐도 알 수 있는 한계점 : 각 Child Model은 각자의 Weight를 다르게 사용해야 하지 않을까?
  - Transfer Learning과 Multitask Learning에 대한 이전 연구들은, 특정 task를 위해 학습한 특정 모델의 파라미터는 다른 task를 위해 학습한 다른 모델에 거의 아무런 조작을 가하지 않고도 사용할 수 있다는 것을 보여줌
  - 이 방법을 "ENAS(Efficient Neural Architecture Search)"라 명명

- 저자들은 Child Model 간 파라미터를 "공유할 수 있다"는 사실 뿐만 아니라, 이렇게 함으로서 강력한 performance가 나옴을 실험적으로 보임
  - CIFAR-10에 대해, 저자들의 방법은 Test Error Rate 2.89%
    - 기존 NAS는 Test Error Rate 2.65% => 성능 차이가 거의 없다.
  - Penn Treebank에 대해, 저자들의 방법은 Test Perplexity 55.8
    - 기존 NAS는 Test Perplexity 62.4
    - Penn Treebank에 대해 Post-Training을 사용하지 않는 접근법 중 SOTA => 오히려 성능이 좋아짐
- Computational Cost 아주 크게 감소
  - 논문의 모든 실험은 Nvidia GTX 1080Ti GPU 한 장으로 진행됨
  - Architecture 탐색에는 16시간이 안걸림
    - 기존 NAS는 450장의 GPU를 사용해 3-4일 정도를 학습 : 1000배 이상의 GPU 사용시간 감소

## Methods

{:.guide-line}
- ENAS의 핵심 아이디어 : NAS가 반복하는 모든 그래프들은 Larger Graph의 Sub-Graph로 볼 수 있다.
  - 다시말해, NAS의 탐색공간(Search Space)을 *하나의* Directed Acyclic Graph(DAG, 유향 비순환 그래프)로 나타낼 수 있다. => 이를 ENAS DAG라 한다.
- ENAS DAG는 NAS의 탐색공간 내에 있는 모든 가능한 Child Model들의 중첩(Superposition)
  - node는 local computation을, edge는 정보의 흐름을 나타냄
  - 각 node는 각자의 파라미터를 가지고 있고, 이는 해당 node가 활성화됐을 때만 사용됨
  - ENAS DAG의 구조는 탐색공간에서 모든 Child Model 간 파라미터가 공유되게 만든다.

### Designing Recurrent Cells

{:.guide-line}
- Objective : 주어진 task를 수행하기 위한 최적의 RNN 모델(Child Model)의 Recurrent Cell 만들기
- 이를 위해 저자들은 N개의 node를 가진 DAG를 사용
  - 각 node는 Local Computation을 의미, 각 edge는 데이터의 흐름을 의미
  - 각 node는 인덱스(index)가 있음
  - 모든 node는 자기보다 큰 인덱스를 가진 node 방향으로만 edge를 가지고 있음 => directed, acyclic 달성
- ENAS의 Controller는 RNN으로서 다음 사항을 결정함
  - DAG 안의 어떤 edge가 활성화되었는지
  - 각 node에서 어떤 연산이 수행되는지
- NAS와 다른 방법을 사용
  - NAS : Binary Tree를 이용하여 (Child Model의) Architecture의 topology를 고정. Tree의 각 node가 어떤 연산(Operation)을 할 지만 학습함.
  - ENAS : ENAS가 RNN Cell의 topology와 연산(operation)을 모두 결정할 수 있게 함 => 더 유연해짐
- Recurrent Cell 생성 순서
  - Controller는 N개의 각 node에 대해 다음을 반복
    - 첫 node : Activation Function을 하나 뽑는다.
    - 나머지 node : 이전 node의 단계에서 뽑은 Activation Function을 입력으로 받아 이전 node(Previous Node)의 인덱스 중 하나와 새 Activation Function을 각각 뽑음
  - ex) $N=4$일 때의 예시 (논문 Fig. 01 참조)
    - Terminology
      - $\boldsymbol{x}\_t$ : Recurrent Cell로의 입력 신호 (ex. Word Embedding)
      - $\boldsymbol{h}\_{t-1}$ : 이전 time step에서의 출력값
      - $\boldsymbol{w}^{(x)}$ : Recurrent Cell이 입력값을 받아들일 때 사용하는 가중치
      - $\boldsymbol{w}^{(h)} _{j, i}$ : Recurrent Cell 내부에서, node $i$ → node $j$ 방향 edge의 가중치
      - $\boldsymbol{w}^{(h)} _{1}$ : 이전 Recurrent Cell로부터 현재 Recurrent Cell의 첫 번째 node 방향 edge의 가중치
    - Controller 동작 과정
      - node 1 : Controller는 Activation Function $\tanh$를 뽑음
        - $\boldsymbol{h}\_1 = \tanh (\boldsymbol{w}^{(x)} \cdot \boldsymbol{x}\_t + \boldsymbol{w}^{(h)} \_1 \cdot \boldsymbol{h}\_{t-1})$
      - node 2 : Controller는 이전 node의 인덱스 1과 Activation Function $\textrm{ReLU}$를 뽑음
        - $\boldsymbol{h}\_2 = \textrm{ReLU} (\boldsymbol{w}^{(h)} \_{2,1} \cdot \boldsymbol{h}\_{1})$
      - node 3 : Controller는 이전 node의 인덱스 2와 Activation Function $\textrm{ReLU}$를 뽑음
        - $\boldsymbol{h}\_3 = \textrm{ReLU} (\boldsymbol{w}^{(h)} \_{3,2} \cdot \boldsymbol{h}\_{2})$
      - node 4 : Controller는 이전 node의 인덱스 1과 Activation Function $\tanh$를 뽑음
        - $\boldsymbol{h}\_4 = \tanh (\boldsymbol{w}^{(h)} \_{4,1} \cdot \boldsymbol{h}\_{1})$
    - 출력값 : Loose End(다른 node들의 입력으로 선택되지 않은 node들)들을 평균
      - $\boldsymbol{h}\_t = (\boldsymbol{h}\_3 + \boldsymbol{h}\_4)/2$
- 이전 node의 인덱스를 뽑는 과정에서 어떤 $\boldsymbol{w}^{(h)} _{j, i}$을 사용할 지를 결정
  - ENAS에서 탐색 공간 내 모든 Recurrent Cell은 같은 파라미터 집합을 사용
- 하나의 Recurrent Cell 안에서 $N$개의 node를 사용하고, $k$개의 Activation Function 후보를 사용한다면, 탐색 공간은 $k^N \times N!$개의 configuration 가짓수를 가짐

### Training ENAS and Deriving Architectures

{:.guide-line}
- Controller는 100개의 hidden unit을 가진 LSTM으로 만들어짐
  - Softmax Classifier를 이용하여 autoregressive하게 decision을 뽑음
    - 이전 단계의 decision(출력)은 다음 단계의 입력(input embedding)으로 들어감
    - 처음 단계에서는 빈 임베딩(empty embedding)을 입력값으로 받음
- ENAS에서는 두 가지 학습되는 파라미터가 존재 : $\theta$, $\omega$
  - $\theta$ : Controller(LSTM)의 파라미터
  - $\omega$ : Child Model 간 공유되는 파라미터(shared parameter)

- ENAS의 학습 과정은 다음 페이즈를 번갈아가며 구성됨
  - Phase 1 : 데이터 전체를 이용해 $\omega$ 학습
    - Controller의 정책 $\pi (\textbf{m};\;\theta)$는 고정한 상태에서 $\omega$에 대해 SGD를 사용해 손실 함수 $\mathbb{E}_{\textbf{m} \sim \pi}[\mathcal{L}(\textbf{m};\omega)]$를 최소화하는 방향으로 학습
      - $\mathcal{L}(\textbf{m};\omega)$ : 학습 데이터의 각 미니배치에 대해 계산되는 일반적인 Cross-Entropy Loss
      - $\textbf{m}$ : $\pi (\textbf{m};\;\theta)$에서 샘플링된 모델(Child Model)
    - 그라디언트는 Monte Carlo 추정을 이용해 계산
      - $\nabla\_\omega \mathbb{E}\_{\textbf{m} \sim \pi}[\mathcal{L}(\textbf{m};\omega)] \approx \frac{1}{M} \sum\_{i=1} ^M \nabla\_\omega \mathcal{L}(\textbf{m}\_i , \omega )$
      - 이 방법은 $\nabla\_\omega \mathbb{E}\_{\textbf{m} \sim \pi}[\mathcal{L}(\textbf{m};\omega)]$을 추정함에 있어 bias되지 않은 추정값을 제공하지만, $\textbf{m}$이 고정되어 일반적인 SGD 그라디언트에 비해 variance가 높다.
      - 하지만 논문에 의하면 놀랍게도, $M=1$로 놓으면 아무 문제 없이 작동한다.
        - $\pi (\textbf{m};\;\theta)$에서 샘플링한 아무 모델 $\textbf{m}$ 하나(any single model)에 대해 그라디언트를 계산해 $\omega$를 업데이트
  - Phase 2 : 고정된 횟수(2000)의 step을 돌며 $\theta$ 학습
    - $\omega$를 고정한 상태에서 보상(Reward)의 기댓값 $\mathbb{E}_{\textbf{m} \sim \pi}[\mathcal{R}(\textbf{m};\omega)]$를 최대화하는 방향으로 policy parameter $\theta$를 갱신
    - Adam Optimizer를 이용
    - $\mathcal{R}(\textbf{m};\omega)$ : validation set에서 계산된 보상(Reward)
      - training set이 아닌 validation set을 사용하여 ENAS가 training set에 overfit된 모델이 아닌, 일반화된 모델을 선택하도록 만듦
      - 논문의 Language Model Experiment에서는 $\mathcal{R}(\textbf{m};\omega)$으로  $\frac{c}{\textrm{valid\_ppl}}$을 사용
        - perplexity는 validation data의 미니배치에 대해서 계산됨
      - 논문의 Image Classification Experiment에서는 $\mathcal{R}(\textbf{m};\omega)$으로 validation image들의 미니배치에 대해 계산된 정확도(Accuracy)를 사용

- 학습된 ENAS로부터 (최고의) 모델을 만드는 방법
  - 학습된 $\pi (\textbf{m};\;\theta)$로부터 몇 개의 모델(Child Model)을 샘플링함
  - 각 모델에 대해, validation set로부터 만들어진 한 번의 미니배치에 대해 Reward를 계산
  - 가장 높은 Reward가 나온 모델을 밑바닥부터 (training data에 대해) 학습
    - 다른 논문들에서 한 것처럼, 샘플링된 모든 모델들에 대해 (training data에 대해) 밑바닥부터 학습시킨 후, validation set에 대해 최고의 성능을 내는 모델을 선택한다면 더 정확한 결과를 얻을 수 있을 것임
    - 하지만 저자들의 방법을 사용하면 아주 경제적으로 (모든 모델을 학습해 성능을 비교하는 방법과) 비슷한 결과를 얻을 수 있다.

### Designing Convolutional Networks

{:.guide-line}
- Objective : 주어진 task를 수행하기 위한 최적의 CNN 모델(Child Model) 만들기
- Controller는 각 decision block에서 다음 사항을 결정함
  - 연결할 이전 node(들)
    - 바로 직전 node가 아닌, 훨씬 이전의 node도 선택할 수 있게 허용(skip connection)
    - 여러 개 선택 가능
    - ($k$번째 layer를 결정하는) 인덱스 $k$인 node는 $1$ ~ $k-1$까지의 인덱스 중 선택할 수 있음 : $2^{k-1}$가지 경우의 수 가능
  - 해당 node에서 사용할 연산(Computation Operation)의 종류
    - 다음 6가지 중 택1
      - 3×3 Convolution
      - 5×5 Convolution
      - 3×3 Depthwise-separable Convolution
      - 5×5 Depthwise-separable Convolution
      - 3×3 Average Pooing
      - 3×3 Max Pooling
    - 각 node는 고유한 파라미터를 가짐
- 한 decision block의 결정 결과는 CNN의 한 layer를 만듦
  - $L$층의 layer를 만드려면 $L$개의 node가 필요함 : $6^L \times 2^{L(L-1)/2}$가지 경우의 수 가능

### Designing Convolutional Cells

{:.guide-line}
- 전체 CNN을 제작하지 않고, 작은 모듈(Cell)을 여러 개 제작해 하나의 네트워크를 만들도록 연결할 수도 있음
  - ex. Convolutional Cell, Reduction Cell (NAS에 나오는 개념)

- Convolutional Cell 만들기
  - $B$개의 node를 가지는 DAG를 만듦
    - 한 node는 *셀 안에서* 지역적으로 일어나는 연산을 의미
    - node 1, 2 : Cell로 들어오는 입력값(이전 Cell의 출력값)을 그대로 출력
      - Controller는 이 두 셀에 대해서는 결정을 할 필요가 없다.
    - 나머지 $B-2$개 node : Controller가 다음 두 개의 결정을 해서 만듦
      - 현재 node의 입력값으로 쓸 이전 node 2개
      - 위에서 선택된 이전 node 2개의 출력값에 적용할 연산 2개
        - 다음 5개 중 택2(중복 가능)
          - Identity
          - 3×3 Separable Convolution
          - 5×5 Separable Convolution
          - 3×3 Average Pooling
          - 3×3 Max Pooling
      - 샘플링된 이전 node 2개에 샘플링된 연산 2개를 각각 적용한 후, 그 값을 더하여 출력
    - ex) $B=4$일 때의 예시 (논문 Fig. 05 참조)
      - Terminology
        - $h_i$ : 인덱스 $i$인 node의 출력값
      - node 1, 2 : Controller는 결정을 할 필요가 없다.
        - $h\_1$, $h\_2$
      - node 3 : Controller는 인덱스 2, 2와 연산 5×5 Separable Convolution, Identity를 뽑는다.
        - $h\_3 = sep_conv_55(h\_2) + id(h\_2)$
      - node 4 : Controller는 인덱스 3, 1와 연산 3×3 Average Pooling, 3×3 Separable Convolution을 뽑는다.
        - $h\_4 = avg_pool_33(h\_3) + sep_conv_33(h\_1)$
      - Cell의 출력값은 Loose End(다른 node들의 입력으로 선택되지 않은 node들)들을 Depth Dimension 방향으로 concatenate하여 구한다.
        - Loose End가 하나만 있으면 그 하나가 Cell의 출력값이 된다 : $h\_4$
- Reduction Cell 만들기
  - Convolutional Cell을 만들 때와 같은 탐색 공간에서 계산 그래프(Computational Graph)를 샘플링한 후, stride=2로 연산을 적용
    - 따라서, Controller는 Convolutional Cell에서 $(B-2)$번, Reduction Cell에서 $(B-2)$번, 총 $2(B-2)$번의 결정을 한다((Decision Block을 만든다).
- Convolutional Cell, Reduction Cell을 만들 수 있는 경우의 수는 각각 $(5 \times (B-2)!)^2$이므로, CNN을 완성하는데 필요한 탐색공간의 크기는 $(5 \times (B-2)!)^4$

