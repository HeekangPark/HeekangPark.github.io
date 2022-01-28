---
title: "SPOS(Single Path One Shot)"
date_created: "2020-10-08"
date_modified: "2022-01-28"
---

# 논문 분석

[Zichao Guo, Xiangyu Zhang, Haoyuan Mu, Wen Heng, Zechun Liu, Yichen Wei, Jian Sun, \<Single Path One-Shot Neural Architecture Search with Uniform Sampling\>, ICLR 2020](https://arxiv.org/abs/1904.00420)

## Introduction

{:.guide-line}
- NAS는 feature engineering, weight optimization problem, architecture design 문제를 풀어 architecture engineering을 자동화하는 기술
- 초창기 NAS는 다수의 architecture가 sample되어 바닥부터 학습해야 해, 데이터셋의 크기가 크면 비용이 너무 비싸다는 문제점이 있음
- 최근 접근법에서는 연산량을 줄이기 위해 weight sharing 전략이 사용됨
  - supernet은 모든 architecture가 단 한번 학습되도록 함
  - 각 architecture는 각자의 weight를 supernet에서부터 받음. Fine-Tuning만 하면 됨 → 연산량 감소
- 대부분의 weight sharing 접근법들은 탐색공간을 parametrize하기 위해 continuous relaxation을 사용
  - architecture distribution parameter들은 경사하강법으로 supernet이 학습되는동안 같이 최적화됨
  - 최고의 architectures는 최적화가 끝난 후 distribution에서 sample됨
  - 논란점 :
    - supernet의 가중치들은 깊게 연관(couple)되어있음
      - 왜 개별 architecture에서도 상속받은 가중치가 좋은 효과를 보이는지는 불분명함
    - architecture의 weight와 supernet의 weight는 최적화 과정에서 깊게 연관됨
      - gradient-based 방법의 greedy한 성질 때문에 최적화 과정에서 bias가 생김 → Architecture 탐색에 영향을 끼칠 수 있음
      - 이전 연구자들은 복잡한 최적화 기법들을 사용해 이 문제를 해결했음
- One-shot 패러다임은 두 번째 논란점을 해소함
  - supernet과 가중치 상속(weight inheritance)는 이전 방법들과 비슷하게 사용하지만, architecture relaxation이 없음.
  - supernet의 학습이 완료된 이후 architecture 탐색 문제를 해결 (supernet의 학습과 architecture 탐색 문제를 분리)
  - nested optimization과 joint optimization의 장점을 합친 것 → 효과적이고 유연한 방식
- 첫 번째 논란점은 여전히 문제가 됨
  - 기존 one-shot 접근법들은 여전히 supernet에 coupled weight를 가지고 있음
  - 기존 접근법들의 최적화 방법은 복잡하고 민감한 hyperparameter를 포함하고 있음
  - 큰 데이터 셋에 대해 경쟁력 있는 결과를 보여주지 못함

- 저자들은 다음을 주장
  - nested optimization과 joint optimization을 사용하는 기존 NAS 접근법들의 문제점을 지적
  - sequential optimization으로 nested optimization과 joint optimization의 장점을 결합한 one-shot paradigm에 대한 관심 재고
  - uniform sampling을 통한 single path one-shot 접근법을 제안
    - 기존 one-shot 접근법들의 문제점을 해결
    - 간단하기에, 큰 search space를 사용할 수 있음 (ex. channel 크기 변경, bit width)
    - architecture 탐색 과정이 효율적이고 유연함
    - 현실 세계의 제약(ex. low latency)을 지원하기 위해서 진화 알고리즘을 사용
  - 큰 데이터 셋(ImageNet)에 대한 실험 결과, 저자들의 접근법이 정확도, 메모리, 학습 시간, architecture 탐색 효율 및 유연성 측면에서 SOTA임을 확인

## Review of NAS Approach

{:.guide-line}
- $\mathcal{A}$ : architecture의 탐색 공간. DAG(Directed Acyclic Graph)
- $\mathcal{N}(a, w)$ : 탐색의 결과 얻는 최종 모델 
  - $a$ : $\mathcal{A}$의 부분 그래프(subgraph)($a \in \mathcal{A}$). 모델의 architecture
  - $w$ : 모델의 weight

- NAS는 다음 두 가지 최적화 문제를 푸는 것
  - weight optimization : $w\_{a} = \textrm{argmin} \_{w} \mathcal{L}\_{train}(\mathcal{N}(a, w))$  [식 1]
    - $\mathcal{L}\_{train}()$ : loss function of the training set
  - architecture optimization : $a^{\*} = \textrm{argmax} \_{a \in \mathcal{A}} \textrm{ACC}\_{val}(\mathcal{N}(a, w\_{a}))$  [식 2]
    - $\textrm{ACC}\_{val}()$ : accuracy of the validation set

- 초기 NAS 접근법들은 두 최적화 문제를 nested하게 풂 : nested optimization
  - 여러 개의 후보 모델들이 $\mathcal{A}$로부터 샘플링됨
  - 각 후보 모델들은 바닥부터 weight optimization을 수행
  - 비용이 많이 듦 → 작은 데이터 셋(ex. CIFAR-10)과 작은 탐색 공간(ex. 하나의 block 찾기)에서만 유의미하게 적용 가능

- 최근 NAS 접근법들은 weight sharing 전략을 도입
  - architecture들의 탐색 공간 $\mathcal{A}$를 supernet($\mathcal{N}(\mathcal{A}, W)$)로 변환하여 생각
    - $W$ : supernet의 weight
  - supernet은 단 한번만 학습함
  - 모든 (후보) architecture들은 $W$로부터 weight를 상속(inherit)받음 ⇔ 각 architecture들은 supernet(의 공통 node)에서 그들의 weight를 공유
  - 필요하다면 각 architecture마다 fine-tuning을 해야 하겠지만, (각 architecture를) 바닥부터 학습하는 일은 일어나지 않는다. → 탐색 속도 빠름. 큰 데이터 셋(ex. ImageNet)에서도 쓸 만함.

- 완화 (Relaxation) : discrete한 architecture 탐색 공간을 continuous하게 바꿈
  - $\mathcal{A}$ → $\mathcal{A}(\theta)$로 완화
    - $\theta$ : continuous 파라미터. 공간 상에 architecture의 분포(distribution)을 의미
    - $\mathcal{A} \subseteq \mathcal{A}(\theta)$
      - 즉, $\mathcal{A}(\theta)$에서 샘플링 된 architecture는 $\mathcal{A}$에서는 맞지 않을수도 있음
  - weight sharing하는 대부분의 접근법들이 사용
  - (continuous하므로) Gradient-based Method 사용 가능 : joint optimization
    - architecture의(= supernet의) weight와 architecture distribution이 같이(jointly) 최적화됨
    - $(\theta^{\*}, W\_{\theta^{\*}}) = \textrm{argmin}\_{\theta, W} \mathcal{L}\_{train}(\mathcal{N}(\mathcal{A}(\theta), W))$  [식 3]
    - 또는 bi-level optimization을 할 수도 있음 : $\theta^{\*} = \textrm{argmax} \_{\theta} \textrm{ACC}\_{val} (\mathcal{N}(\mathcal{A}(\theta), W^{\*} \_{\theta}))$ s.t. $W^{\*}\_{\theta} = \textrm{argmin}\_{W} \mathcal{L}\_{train} (\mathcal{N}(\mathcal{A}(\theta), W))$  [식 4]
    - 최적화 이후, 최고의 architecture $a^{\*}$가 $\mathcal{A}(\theta^{\*})$으로부터 선택됨
- [식 3]의 문제점
  - 문제점 1 : supernet의 각 node의 가중치는 서로 의존 관계가 생기고, 최적화 과정에서 깊게 연관됨(couple)
    - 특정 architecture를 샘플링하면, 이 architecture는 $W$에서 샘플링된 node들의 weight를 상속받음
    - 이렇게 뽑힌 weight들은 (supernet에서 연결되어 있던) 다른 node와 연관이 끊기는데(decouple), 왜 여전히 잘 작동하는지는 불분명함
  - 문제점 2 : architecture의 파리미터 $\theta$와 supernet의 weight $W$에 대한 joint optimization은 추가적인 복잡성을 야기함
    - [식 3]을 푸는 것은 $\theta$ 안의 특정 영역과 $W$ 안의 특정 node들에 편향(bias)이 생기게 만듦
    - 이 편향은 supernet의 일부 node들은 학습이 잘 되게, 일부 node들은 학습이 잘 안되게 만듦 → (샘플링된) architecture 간 정확한 비교가 어려움
    - 그러나 architecture들의 예측 정확도는 $\mathcal{A}(\theta)$를 샘플링하는 guidance로 사용됨 (ex. policy gradient에서 reward로 사용됨) → "Dilemma of Exploitation and Exploration" Problem
    - 기존 방법들은 이를 해결하기 위해 복잡한 최적화 기법들을 사용해야 했음

- 실제 문제들은 추가적인 제약조건이 있음 (ex. 메모리 사용량, FLOPs, 지연(latency), 에너지 사용량 등) : Task Constraints
  - architecture $a$에만 의존적 (supernet의 가중치 $w\_a$에는 의존적이지 않음) → Architecture Constraints라고도 부름
- 일반적으로 지연(latency)에 대한 제약이 있음 : $\textrm{Latency}(a^{\*}) \le \textrm{Lat}\_{\textrm{max}}$  [식 5]
  - 기존 접근법에서 이 제약조건은 [식 2]와 동시에 만족되기 어려움
  - 몇몇은 [식 3]의 손실 함수 $\mathcal{L}\_{train}$에 지연을 고려한 soft loss term을 사용할 것을 제안하기도 했으나, 잘 안됨

## Our Single Path One-Shot Approach

{:.guide-line}
- one-shot 접근법 : supernet을 학습하는 과정과 Architecture를 탐색하는 과정을 분리하여 순차적인 과정으로 만듦
  - 절차
    - supernet의 weight를 최적화 : $W\_{\mathcal{A}} = \textrm{argmin} \_{W} \mathcal{L}\_{train} (\mathcal{N}(\mathcal{A}, W))$  [식 6]
      - [식 3]과 비교했을 때, 탐색 공간에서의 연속적인 parameterization은 없음. 오직 (supernet의) weight만 학습됨.
    - architecture 탐색 : $a^{\*} = \textrm{argmax}\_{a \in \mathcal{A}} \textrm{ACC} \_{val} (\mathcal{N}(a, W\_{\mathcal{A}}(a)))$  [식 7]
      - $W\_{\mathcal{A}}(a)$ : architecture의 weight ($W\_{\mathcal{A}}$로부터 상속)
      - [식 1], [식 2]에서와는 다르게 architecture weight는 사용할 준비가 되어 있는 상태 (이전 단계에서 학습 완료)
        - $\textrm{ACC}\_{val}{}$에서는 inference만 하면 됨 (학습 x) → 효율적인 탐색 가능
  - [식 3]의 문제점 2를 해결
- 탐색 알고리즘으로 어떤 알고리즘을 써도 됨 → 유연함(flexible)
  - [식 5]와 같은 제약조건 쉽게 달성 가능
  - 한번 학습된 supernet에 대해, 다양한 제약조건을 적용해 다양한 탐색 가능
    - 이전 접근법들에서는 불가능
- 여전히 해결되지 않은 문제 : [식 6]에서 supernet 학습과정 중 supernet node의 weight들이 연관(couple)되는 문제 ([식 3]의 문제점 1)

- 최근 one-shot 접근법들은 "path dropout" 전략을 사용해 이 문제를 해결하려 함
  - [식 6]에서 SGD를 사용할 때, supernet의 각 edge들은 무작위로 drop됨
    - dropout rate parameter : 각 edge가 drop될 확률을 조절하는 파라미터
  - 이 방법을 사용하면, 학습 과정에서 supernet node의 weight들이 연관(co-adaptation)되는 문제를 일부 해소할 수 있음
  - 하지만 supernet의 학습을 어렵게 함 → 조심스러운 heat-up 전략이 사용됨
  - 저자들의 실험에 따르면, validation 정확도도 dropout rate parameter에 영향을 많이 받음

### Single Path Supernet and Uniform Sampling

{:.guide-line}
- weight sharing의 핵심 이론 : (추가적인 Fine-tuning 없이) $W\_{\mathcal{A}}(a)$로부터 상속받은 가중치를 사용하는 아무 architecture $a$의 validation set에 대한 정확도는, 완벽히 학습된(fully-trained) $a$의 (validation set에 대한) 정확도를 잘 예측한다.
  - 사실 $W\_{\mathcal{A}}(a)$가 [식 1]의 $w\_a$를 잘 근사할 때만 성립하는 이론
  - training loss $\mathcal{L} \_{train} (\mathcal{N}(a, W\_{\mathcal{A}}(a)))$가 얼마나 잘 최소화되었는지에 따라 근사(approximation)의 품질이 달라짐
- supernet의 가중치 $W\_{\mathcal{A}}$는 탐색 공간 안 모든 architecture들이 동시에 최적화되는 방향으로 최적화되어야 함 : $W\_{\mathcal{A}} = \textrm{argmin} \_{W} \mathbb{E} \_{a ~ \Gamma(\mathcal{A})} [\mathcal{L} \_{train} (\mathcal{N}(a, W(a)))$  [식 8]
  - $\Gamma(\mathcal{A})$ : $a \in \mathcal{A}$의 prior distribution
  - [식 6]의 implementation
- 최적화의 각 step에서, architecture $a$는 무작위로 샘플링됨
  - $W(a)$만 활성화되고 업데이트됨. → 효율적인 메모리 사용
  - 이렇게 하면, supernet은 더 이상 유효한 네트워크(valid network)가 아닌, stochastic supernet으로 작동함
- 각 (supernet의) node들의 weight 간 연관(co-adaptation)을 줄이기 위해, 저자들은 각 architecture가 single path가 되는 supernet 구조를 제안
  - path dropout 전략과 비교했을 때, single path 전략은 hyperparameter가 필요 없음
  - path dropout 전략에서는 block의 모든 operation을 drop해 identity connection을 만들어 버리는 경우도 있었음
  - 저자들의 single path 구현에서는 identity branch가 없기 때문에 항상 무작위의 path 하나가 선택됨
  - 저자들의 실험 결과 drop rate parameter는 validation 정확도에 많은 영향을 끼치고 있었음
  - single path는 drop rate를 1로 고정한 것과 같은 효과
- prior distribution $\Gamma(\mathcal{A})$는 중요함
  - 저자들은 경험적으로 uniform sampling이 좋다는 것을 확인함
    - 다른 연구 결과에 의하면 CIFAR-10에 대해 stochastic supernet을 기반으로 하는 완전 무작위 탐색이 꽤 경쟁력이 있음
  - uniform constraint sampling : constraint에 따라 architecture를 균등하게(uniform) 샘플링
    - 이 논문에서 기본으로 사용한 방식

- 최적화 과정에서 architecture distribution에 따라 path를 고르는 것은 이전 weight sharing 접근법에서 이미 사용된 방식
  - 이전 접근법들에서는 $\Gamma(\mathcal{A})$가 학습되고 업데이트되는 값
    - 이는 supernet의 weight와 architecture의 parameter를 아주 연관되게(corelate) 만들고 학습이 어렵게 함
  - 하지만 저자들의 방식에서 $\Gamma(\mathcal{A})$는 고정된 priori
- One-shot 모델에서 path를 random sampling하고, 최고의 architecture를 찾기 위해 무작위 탐색을 수행한 다른 논문도 있었음
  - CIFAR-10에 대해서는 SOTA를 달성
  - 하지만 큰 데이터셋(ex. ImageNet)에 대해서는 검증하지 않음
  - single path sampling이 path dropout 전략에 비해 효과적인지 증명하지 않음
  - 하지만 저자들은 이를 모두 증명하고, 큰 탐색 공간에서 최고의 architecture를 찾는데 무작위 탐색이 좋지 않다는 것도 실험적으로 증명함
- 저자들의 방식은 기존 SOTA보다 더 좋은 결과를 냄
  - 고정된 prior distribution($\Gamma(\mathcal{A})$)을 사용하는 것이 학습 과정에서 distribution을 최적화하는것보다 더 좋다는 이론적 보장은 없음
  - 저자들의 실험 결과는 [식 3]에서의 joint optimization이 기존 최적화 기법들을 사용하기엔 너무 어렵기 때문으로 생각됨

### Supernet Architecture and Novel Choice Block Design

{:.guide-line}
- Choice Block : 다양한 architecture 선택지들로 구성됨. Stochastic architecture를 만들기 위해 사용
- Single path supernet에서, 각 choice block은 한 시점에 하나의 선택지만 선택 가능
- Path는 모든 choice block을 샘플링하여 얻을 수 있음

- 저자들의 접근법의 단순함 덕분에, 다양한 architecture 변수들을 탐색하기 위한 다양한 종류의 choice block을 정의할 수 있음

#### Channel Number Search

{:.guide-line}
- weight sharing에 기반한 새로운 choice block을 제안
- main idea : 사전에 최대 채널 크기의 weight tensor를 할당해 놓고, 시스템은 무작위로 채널 수를 선택하여 상응하는 subtensor를 잘라내어 convolution을 수행
- 저자들의 실험 결과, supernet이 빠르게 수렴함

#### Mixed-Precision Quantization Search

{:.guide-line}
- weight와 feature map의 bit width를 탐색하는 새로운 choice block을 제안
- supernet 학습 과정에서 각 choice block의 feature bit width와 weight bit width는 무작위로 샘플링됨
- 위에서 얘기한 Channel Search Space와 결합할 수 있음

#### Evolutionary Architecture Search

{:.guide-line}
- [식 7]에서의 architecture 탐색을 위해, 기존 one-shot 관련 논문들은 무작위 탐색을 사용함
  - 하지만, 큰 탐색 공간에서는 비효율적
- 저자들은 Evolutionary Algorithm을 사용
  - 기존 Evolutionary Algorithm을 사용하는 접근법에서는 각 architecture가 바닥부터 학습해야 했기에 비용이 많이 듦
  - 하지만 저자들의 방법에서는 각 architecture가 inference만 수행하기에, 효율적
  - Evolutionary Algorithm 설정
    - population size $P = 50$
    - max iteration $\tau = 20$
    - 상위 10개만 살림 ($k = 10$)
    - Crossover 단계에서, 무작위로 선택된 2개의 후보 architecture들이 새로운 architecture를 만들기 위해 교배(cross)됨
    - Mutation 단계에서, 무작위로 선택된 후보 architecture가 확률 0.1로 모든 choice block에 돌연변이가 발생해 새로운 후보 architecture를 만듦
    - Crossover 단계와 Mutation 단계는 주어진 architecture constraints를 만족시키는 후보 architecture를 충분히 생성할 수 있게 반복됨
    - 각 (후보) architecture들이 inference 하기 전, 모든 Batch Normalization 연산들의 statistic(평균, 표준편차)이 training data(ImageNet의 20,000개 이미지)의 무작위 부분집합에 대해 다시 계산됨
      - 이 과정에서 몇 초의 시간이 소요됨
      - supernet의 Batch Normalization statistic이 후보 architecture에서 잘 적용할 수 없기 때문
  - 저자들의 실험 결과 무작위 탐색보다 evolutionary 탐색이 더 효과적임
  - Evolutionary Algorithm은 [식 5]에서의 다양한 constraint에 대응하기에 좋음
    - Mutation과 Crossover 과정을 잘 조절해서 constraint를 잘 만족하는 후보 architecture를 생성하면 됨
    - 기존 강화학습 또는 Gradient 기반 방법에서는 constraint에 대응하기 위해 복잡한 보상 함수 또는 손실 함수를 설계해야 했음
  
#### Summary

{:.guide-line}
- 저자들은 single path supernet, uniform sampling training 전략, evolutionary architecture 탐색, 다양한 탐색 공간을 조합하여 사용 → 간단하고 효율적이며 유연한 방법
- 저자들의 방법이 학습하기 가장 쉽고, 가장 적은 메모리를 사용하고, 제약조건을 가장 잘 만족시키며, 대규모 데이터 셋을 쉽게 지원함
