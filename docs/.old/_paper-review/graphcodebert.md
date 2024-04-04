---
title: "GraphCodeBERT : Pre-Training Code Representations with Data Flow"
date_created: "2021-09-03"
date_modified: "2022-08-15"
---

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2009.08366>
- 코드/데이터셋 링크 : <https://github.com/microsoft/CodeBERT/tree/master/GraphCodeBERT>

{% include caption-img.html src="graphcodebert.png" title="GraphCodeBERT" description="src: <a href=\"https://arxiv.org/abs/2009.08366\">[2021] GraphCodeBERT: Pre-training Code Representations with Data Flow</a>" %}

{:.guide-line}
- ELMo, GPT, BERT 등의 사전학습 모델(pre-trained model)의 성공은 프로그래밍 언어에 대한 사전학습 모델의 발전을 촉진함
- 그러나 프로그래밍 언어에 대한 기존 사전학습 모델들(ex. CodeBERT)은 소스 코드의 semantic-level structure에 대한 고려 없이, 소스 코드를 그저 token들의 시퀸스로 대함
  - 예를 들어 코드 `v = max_value - min_value`에서, 기존 사전학습 모델들은 "max", "value", "min", "value" (sub)token들로부터 이 코드가 최대값과 최소값의 차를 구하는 코드임을 이해함
  - 만약 프로그래머가 변수명으로 `max_value`, `min_value`와 같은 이름을 사용하지 않는다면, 기존 사전학습 모델들은 이 코드가 어떤 의미(semantic)를 가지는지 이해하지 못함

- GraphCodeBERT는 Data Flow를 이용해 코드의 고유 구조(inherent structure)를 고려한다는 점에서 기존 사전학습 모델(ex. CodeBERT)과 다름
  - GraphCodeBERT는 syntactic-level의 정보를 담고 있는 AST(Abstract Syntax Tree)가 아닌 semantic-level의 정보를 담고 있는 Data Flow를 사용
  - Data Flow는 소스 코드의 semantic-level 정보를 담고 있는 그래프
    - node는 각 변수를 나타냄
    - edge는 변수(node)들 사이에서 값이 어떻게 움직이는지("where-the-value-comes-from")를 나태냄
  - AST와 다르게, 다른 추상 문법(abstract grammar)으로 작성된 동일한 소스 코드의 Data Flow는 같음
  - Data Flow는 모델이 장거리 의존 관계(long-range dependency)를 잘 고려하게 만들 수 있음
  - Data Flow는 AST에 비해 간단하고 불필요하게 깊은 계층구조를 가지지 않는다는 장점이 있어, 이를 이용하면 사전학습 모델을 더 효율적으로 만들 수 있음

- GraphCodeBERT는 BERT를 따라 multi-layer bidirectional Transformer를 기본 뼈대로 사용함

- [CodeSearchNet 데이터셋](/paper-review/papers-of-nlp-for-source-code#kramdown_codesearchnet-challenge--evaluating-the-state-of-semantic-code-search)을 이용해 GraphCodeBERT 학습

- 사전학습 과정
  1. 소스 코드 $C = \\{\, c\_1,\,c\_2,\,\cdots,\,c\_n \,\\}$와 이에 대한 주석 $W = \\{\, w\_1,\,w\_2,\,\cdots,\,w\_n \,\\}$가 주어졌을 때, 이를 이용해 Data Flow $\mathcal{G}(C) = (V,\,E)$를 만듦
    - $V$는 변수들의 집합 : $V = \\{\, v\_1,\,v\_2,\,\cdots,\,v\_k \,\\}$
    - $E$는 각 변수들이 어디로부터 왔는지를 나타내는 direct edge : $E = \\{\, \varepsilon\_1,\,\varepsilon\_2,\,\cdots,\,\varepsilon\_l \,\\}$
  
  2. $C$, $W$, $V$를 이어붙여 시퀸스 입력(sequence input) $X$를 만듦 : $X = \\{\, [CLS],\,W,\,[SEP],\,C,\,[SEP],\,V \,\\}$
    - $[CLS]$는 입력 시작을 알리는 특별 token
    - $[SEP]$는 각 항목들을 구분하는 특별 token
  
  3. $X$를 입력으로 받아 이를 입력 벡터(input vector)들 $H^0$으로 변환
    - 각 token들에 대해, 입력 벡터는 각 token들과 position embedding들을 합하여 만듦
    - 변수들에 대해서는 특별한 position embedding을 사용해 변수들이 Data Flow의 node임을 나타냄
  
  4. $N$개의 Transformer layer를 사용해 입력 벡터를 contextual representation $H^N$으로 변환 : $H^n = transformer\_n (H^{n-1})$ ($n \in [1,\,N]$)
       - Transformer layer는 동일한 구조의 multi-headed self-attention operation을 수행하는 transformer와, 뒤이은 Feed Forward Layer로 구성됨
       - $G^n = LN(\,MultiAttn(H^{n-1}) + H^{n-1}\,)$
       - $H^n = LN(\,FFN(G^n) + G^n\,)$
         
         - $MultiAttn()$ : Multi-headed self-attention 매커니즘
         - $FFN()$ : 2층의 Feed Forward Network
         - $LN()$ : Layer Normalization 연산
  
  5. Graph-guided masked attention function을 이용해 관련없는 신호들을 쳐냄

- 소스 코드와 코드 구조로부터 GraphCodeBERT를 pre-train시키기 위해, 저자들은 기존 Masked Language Modeling Task 이외에 다음 두 가지 structure-aware pre-train task를 만듦
  - Edge Prediction Task
    - Data Flow에서 몇몇 node(변수)들의 edge를 가린 후 이를 예측하게 하는 task
    - 이를 통해 모델은 Data Flow로부터 structure-aware representation을 배움
  
  - Node Alignment Task
    - 코드 token($c\_i$)과 변수($v\_j$)들 사이의 edge를 예측하게 하는 task
    - 이를 통해 모델은 Data Flow를 따라 소스 코드와 변수들의 representation을 일치시키게 됨

- Code Search, Clone Detection, Code Translation, Code Refinement 영역에서 GraphCodeBERT는 SotA를 달성