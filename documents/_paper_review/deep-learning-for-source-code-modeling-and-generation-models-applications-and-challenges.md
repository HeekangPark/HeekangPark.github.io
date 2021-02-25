---
title: "Deep Learning for Source Code Modeling and Generation: Models, Applications and Challenges"
date: "2021-02-08"
tags: ["machine_learning", "deep_learning", "source_code_modeling", "source_code_generation", "review_paper"]
---

논문 [Triet H. M. Le, Hao Chen, Muhammad Ali Babar, 2020, "Deep Learning for Source Code Modeling and Generation: Models, Applications and Challenges"](https://arxiv.org/abs/2002.05442) 정리

# 서론 (Introduction)

- 컴퓨터 비전 분야와 자연어 처리 분야에서 기계 학습(ML, Machine Learning), 특히 딥러닝(DL, Deep Learning)은 아주 강력한 성능을 보이고 있음
- 소스 코드는 프로그래머들에 의해 작성된 특별한 타입의 구조화된 자연어(structured natural language)이므로, DL 모델로 분석 가능
- 만약 컴퓨터가 복잡한 구조의 소프트웨어를 이해하고 만들 수 있다면 소프트웨어 공학(SE, Software Engineering) 분야에서 아주 다양하게 응용이 가능함
  - Big Code : 소스 코드 모델링(Source Code Modeling)에 ML과 DL을 사용하는 연구 분야
  - 소스 코드 생성(Source Code Generation) : 불완전한 코드(incomplete code), 다른 언어로 작성된 코드, 자연어로 된 설명 혹은 실행 결과 예시 등과 같은 다중 모델 데이터 소스(multimodel data source)로부터 명시적인 코드(explicit code) 혹은 프로그램의 구조(program structure)를 예측하는 분야
- 하지만 전통적인 소스 코드 모델링 기법들은 유연하지 않거나(inflexible), 특정 언어/작업에 대해 디자인하기엔 시간이 너무 많이 소모되거나(time-consuming), 코드 구문들의 장거리 의존 관계(long-term dependencies of code statement)를 제대로 잡아내지 못하는 등의 문제가 있다.
- 이 논문은 소스 코드 모델링 및 생성 기법들에 관한 여러 실용적인 적용 방법, DL 모델과 인코더-디코더 구조(encoder-decoder framework)가 이러한 문제들을 어떻게 해결하는지 등에 초점이 맞춰져 있다.

# 전통적인 소스코드 모델링 방법과 그들의 한계 (Traditional Source Code Modeling Approaches and Their Limitations)

## Domain-specific language guided models

- DSL(Domain-specific Language)
- Program Induction에서 DSL은 후보 프로그램들의 공간(프로그램 템플릿)을 정의한다.
  - 입력-출력 예제들은 사양(Specification)이라 불린다.
- 이 문제는 ILP(Inductive Logic Programming)라 불린다.
- ILP를 푸는 두 가지 전통적인 방법
  - bottom-up 접근법 : 예제(example feature)로부터 프로그램을 직접 만드는 방법
  - top-down 접근법 : 생성된 프로그램(generation)에 대해 예제들을 테스트해보고 조건들을 이에 맞게 조정하는 방법
- Induction은 일반적으로 top-down 접근법의 일종인 CSP(Constraint Statisfaction Problem) 문제로 환원된다.
- CSP 문제는 Z3과 같은 constraint solver를 이용해 풀 수 있다.
- 하지만 이 방법은 다음과 같은 단점이 있다.
  - solver는 항상 휴리스틱(heuristic)하다.
  - 확장성(scalability)이 아주 구리다.
  - 노이즈가 심하거나(noisy), 잘못되었거나(erroneous), 불명확한(ambiguous) 데이터에 대해서는 적용할 수 없다.
- DSL guided model은 특정 프로그래밍 언어의 구조를 잡아낼 수 있다.
  - 그러나 자세한 syntactic 및 semantic 규칙들을 생성하기 위해선 깊은 도메인 관련지식(domain knowledge)이 필요하다.
  - DSL을 Probabilistic Model로 표현하면 유연성(flexibility)을 높일 수 있다.
  
## Probabilistic grammars

- 프로그래밍 언어의 구조는 일반적으로 CFG(Context-Free Grammar)로 정의됨. CFG로 작성된 형식 언어(formal language)는 AST(Abstract Syntax Tree)로 변환할 수 있다.
- PCFG(Probabilistic Context Free Grammar)
  - CFG의 확장형
  - Context-Free Language의 생성 규칙(production rule)이 Probabilistic Model과 결합된 것
  - 코드 완성(Code Completion) 과제에 잘 적용됨
- TSG(Tree Substitution Grammar)
  - CFG의 확장형
  - 생성 규칙(production rule)으로 기호들의 나열(sequence of symbol)이 아닌 트리 조각(tree fragment)을 사용
  - TSG의 규칙들은 Tree Adjoining Grammar으로 표현됨
    - 더 높은 유연성(flexibility)을 가지고, 복잡한 언어 구조(complex linguistic structure)를 잘 표현함
  - 패턴 마이닝(pattern mining)[^1]에 적합
  - 너무 느리고 확장성(scalability)이 낮음
- Probabilistic Grammar는 DSL에서 높은 성능을 보이지만, 코드를 모델링하고 재사용을 위해서는 여전히 수동으로 규칙들을 디자인하는 과정이 필요하다.

[^1]: 대규모의 데이터 집합 또는 데이터베이스로부터 숨겨진 유용한 패턴 정보를 추출하는 기법. [참고](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwik9rfN8unuAhWVad4KHaPLBKkQFjAAegQIAhAC&url=http%3A%2F%2Fwww.jics.or.kr%2Fdigital-library%2Fmanuscript%2Ffile%2F1136%2FJICS-2015-16-2-009.pdf&usg=AOvVaw3N91k9U7lktPgSu33ddj0L)

## $n$-gram language models

- 통계적 언어 모델(statistic language model)
  - 가정 : 각 단어/토큰들은 이전 $n-1$개의 단어/토큰들에 대해 조건부 종속(conditionally dependent)이라 가정 : $P(\boldsymbol{w}) = \Pi \_t P(w\_t \| w\_{t-(n-1),\,...,\,(t-1)})$
    - $P(w\_t \| w\_{t-(n-1),\,...,\,(t-1)})$는 학습 셋(training set)에서 $n$-gram의 등장 빈도를 세는 것으로 계산 가능
- Syntactic Model(ex. DSL guided model, Probabilistic grammars)에 비해 일반화(generalization)하기 쉬움
  - $n$-gram language model은 소스 코드로부터 프로그래밍 언어의 의존 관계(dependency)와 규칙(rule)들을 자동으로 학습하기 때문
- 코드 완성(Code Completion), 숙어 마이닝(Idiom Mining), 문법 오류 탐지(Syntax Error Detection), 소스 코드 분석(Source Code Analysis), 코드 난독화(Code Obfuscation) 등의 과제에 적용 가능
- $n$-gram의 단점
  - $n$-gram과 같이 간단한 언어 모델로는 고수준의 프로그래밍 패러다임(high-level programming paradigm)을 잡아낼 수 없음
    - 이를 해결하기 위해 다양한 기법들이 시도됨
      - DSL 기반 모델과 $n$-gram을 융합
        - 프로그래밍 언어 모델링(programming language modeling)에 좋은 결과를 보임
        - 신경망 기반 모델보다도 학습(training) 및 추론(inference) 과정에서 더 효율적임
      - 로컬 $n$-gram 캐시(local n-gram cache) 추가한 후, 로컬 모델과 글로벌 모델의 예측 결과를 융합
        - DL 모델(ex. RNN, LSTM)보다 publication 시간이 짧음
  - 장거리 의존 관계(long-term dependencies)를 모델링하는데는 적합하지 않음
    - $n$-gram은 장거리 위치 정보(long-term positional information)을 버림
    - $n$-gram 뿐만 아니라 다른 통계적 모델들도(ex. Hidden Markov Model) 장거리 히스토리(long-term history)를 잘 인코딩하지 못함
      - 한 상태(state)에 다수의 이전 히스토리 토큰(history token)을 인코딩하게 되면 상태 공간(state space)가 너무 커지기 때문
  - 단어 토큰(word token) 혹은 코드 토큰(code token)의 벡터 표현(vector representation)의 성김(sparsity) 문제
    - 너무 큰 단어장(vocabulary) 때문에 발생
    - 신경망 기반 언어 모델(neural language model)의 분산 표현(distributed representation)으로 해결 가능
  
## Simple neural program models

- Distributed Word Representation
  - 하나의 은닉층(hidden layer)을 가진 신경망 임베딩 모델(Neural Network Embedding Model)을 이용, one-hot encoding으로 표현되어 있는 단어들을 단어장(vocabulary) 크기보다 훨씬 작은 중간 워드 임베딩 벡터(intermediate word-embedding vector)로 변환한다.
  - 은닉층에서의 계산 비용이 너무 비싸다는 문제가 있음
  - 이를 해결하기 위해 log-bilinear가 도입됨
    - 비선형적인 활성 함수(non-linear activation) 대신 컨텍스트 행렬(context matrix)을 사용해 현재 단어의 컨텍스트 벡터(context vector)를 계산한다. 이후 현재 단어와 이전 토큰들의 컨텍스트 벡터 간 유사도(similarity)를 계산한다.
    - log-bilinear 모델은 APNews를 모델링하는 과제에 대해 전통적인 fully-connected 신경망이나 $n$-gram 언어 모델보다 더 뛰어난 성능을 보임
- Simple Neural Program Model
  - log-bilinear 모델을 소스 코드 모델링에 접목시킨 것
    - ex. Log-bilinear Tree-Traversal Model : log-bilinear와 트리 DFS(Depth-First Search) 순회 기법을 융합.
      - 사람이 이해할 수 있는 소스 코드(human-understandable source code) 생성 가능
      - 자연어 질의문(natural language query)으로부터 소스 코드 조각(source code snippet)을 얻거나, 반대로 소스 코드 조각으로부터 자연어 질의문을 얻을 수 있다.
        - $n$-gram으로 만든 모델보다 성능이 좋음
      - 객체지향 프로그래밍(object-oriented programming)(ex. Java)에서 메소드와 클래스 이름을 추천해줄 수 있다.
        - $n$-gram으로 만든 모델보다 성능이 좋음
  - log-bilinear 모델은 $n$-gram 모델과 마찬가지로 최근 $n-1$개의 토큰에 대한 지식만 가지고 있으므로, 소스 코드의 단거리 의존 관계(short-term dependency), 장거리 의존 관계(long-term dependency), 순차적인 속성(sequential property) 등을 잡아내려면 전역 컨텍스트(global context)와 로컬 컨텍스트(local context)를 명시적으로 정의해야 함
  - 단점 : 컨텍스트 목록은 여전히 사람이 직접 만들어 줘야 하고 불완전하기 때문에 새로운 도메인에 적용하기 힘듦

## 전통적인 접근법에 비해 DL 모델이 가지는 장점 (Advantages of deep learning models over traditional approaches)

- DL 모델의 인코더-디코더 구조(encoder-decoder framework)는 입력 시퀸스(input sequence)의 의존성(dependency)과 순차적인 속성(sequential property)을 잘 잡아냄
- DL 모델의 장점
  - 자동 특성 생성(automatic feature generation)을 잘한다.
  - 장거리 의존 관계(long-term dependency)와 순차적인 속성(sequential property)을 잘 잡아낸다.
  - end-to-end learning[^2]이 가능하다.
  - 일반화가 잘 된다(generalizability)
- 다른 전통적인 모델들은 위 4가지 장점을 동시에 가지지 않는다(trade-off).
  - $n$-gram 모델
    - 장점 : 소스 코드로부터 자동으로 특성(feature)를 추출해 낼 수 있다.
    - 단점 : 장거리 의존 관계(long-term dependency)를 잘 잡아내지 못한다.
      - 이유 : 항들이 기하급수적으로 많아지기 때문
  - simple neural program model (fully-connected, log-bilinear 모델)
    - 단점 : end-to-end learning이 안된다. 일반화가 잘 안된다.
      - 이유 : 소스 코드의 의존성 혹은 소스 코드의 구조를 잡아내려면 사람이 규칙을 만들어 넣어줘야 하기 때문
  - DSL guided model, probabilistic grammar
    - 장점 : 의존성(dependency)과 순차적인 속성(sequential property)을 잘 잡아낼 수 있다.
    - 단점 : 일반화가 잘 안된다. 새로운 도메인에서 학습 과정을 자동화시키는 것이 어렵다.
      - 이유 : 엄격하게 정의된 규칙(strictly defined rule) 때문

[^2]: 데이터만 입력하고 중간 단계 없이 최종 단계까지 원하는 목적을 한 번에 학습하는 방법. end-to-end learning을 하기 위해서는 아주 많은 데이터가 필요하다. end-to-end learning의 반대 개념은 여러 단계를 나눠서 학습하는 것(복잡한 문제를 간단한 여러 문제로 나눠서 푸는 것)으로, 때로는 이 방법이 더 효율적일 수도 있다. [참고](https://www.edwith.org/deeplearningai3/lecture/34893)

# 인코더-디코더 구조를 이용한 Deep Sequence 모델링 (Deep Sequence Modeling with Encoder-Decoder Framework)

- 인코더-디코더 구조(encoder-decoder framework)

{% include caption-img.html src="deep-learning-for-source-code-modeling-and-generation-models-applications-and-challenges_main-steps-of-encoder-decoder-framework.png" description="인코더-디코더 구조(encoder-decoder framework)의 핵심 단계들" %}

- 순차적인 모델(sequential model)(ex. 각 단어별로(word-by-word) 모델링), 구조적인 모델(structural model)(ex. 문장(sentence) 또는 코드 조각(snippet)의 문법 구조(syntactic structure)를 탐색(exploiting)) 둘 다 순차 모델링(sequence modeling)에 사용될 수 있다.

## 순차 모델링을 위한 DL 모델 (Deep learning models for sequence modeling)

- 순차 모델링(sequence modeling)을 위한 DL 모델은 크게 두 종류로 분류할 수 있다.
  - 순환신경망(RNN, recurrent neural network)
  - 비 순환신경망(non-recurrent neural network)
- 조금 더 강건한(robust) 모델을 만들기 위해 다음 세 가지 기술이 사용된다.
  - 어텐션 메커니즘(attention mechanism)
  - 외부 메모리(external memory)
  - beam 탐색(beam search)
- MLP(multi-layer perceptron)(fully-coonected neural network, feed-forward neural network라고도 불린다)는 시퀸스(sequence)로부터 의존성(dependency)과 순차적인 속성(sequential property)을 잘 잡아내지 못하기 때문에 순차 모델링(sequence modeling)엔 잘 사용되지 않음(위의 세 가지 기술과 조합해서는 가끔 사용됨)

### 순환신경망 (Recurrent Neural Network)

- RNN(recurrent neural network)의 파라미터 블럭(block of parameters)은 한 시퀸스(sequence)의 각 부분에 대해 여러 번 공유되어 적용되면서 심층 계산 그래프(deep computational graph)를 형성
  - 이러한 구조는 RNN이 (기존의 MLP는 하지 못했던) 다양한 길이의 입출력 데이터들로부터 학습할 수 있게 해 줌
- 순수한 RNN의 문제점
  - 학습이 어려움
  - 다양한 시간 간격(scale)에 있는 과거의 정보를 유지하고 있기 힘듦
- Gated RNN
  - ex. [LSTM(Long Short-Term Memory)](https://www.bioinf.jku.at/publications/older/2604.pdf), [GRU(Gated Recurrent Unit)](https://arxiv.org/abs/1412.3555)
  - 시그모이드 함수(sigmoid function)을 이용해 기억(keeping)과 망각(forgetting) 메커니즘을 구현한 RNN
    - 각 시그모이드 함수를 게이트(gate)라 한다.
    - ex. LSTM은 입력(input), 출력(output), 망각(forgetting)을 조절하기 위한 3개의 게이트로 구성됨
- [Recurrent Highway Network](https://arxiv.org/abs/1607.03474)
  - Highway Layer를 이용해 학습 과정(training gradient)을 안정화함
- [gated feedback RNN](https://arxiv.org/abs/1502.02367)
  - 추가적인 게이트(gate)를 이용해 네트워크가 자신만의 clock rate를 학습할 수 있게 함
- [Fast-Slow RNN](https://arxiv.org/abs/1705.08639)
  - 현재 SOTA RNN 언어 모델

### 비 순환신경망 (Non-recurrent neural networks)

- temporal convolution, 시간에 대한 1차원(one-dimensional) convolution을 이용하면 계층적인 구조(hierarchical architecture)에서 장거리 관계(long-term relation)를 잡아낼 수 있다.
  - 감정 분석(sentiment analysis), 문장 분류(sentence classification), 기계번역(machine translation), 메타 학습(meta learning) 등에 사용됨
- 초기 CNN 모델들은 LSTM의 성능을 따라가는데 실패했지만, 오늘날의 CNN 모델들은 RNN 모델들과 비슷한 성능을 내고, 심지어 계산하기 더 빠름
- recurrent unit과 convolutional unit을 합치는 것도 좋은 방법
- CNN 파생형
  - 초기 모델
    - [Kalchbrenner와 Blunsom의 모델](https://www.aclweb.org/anthology/D13-1176.pdf)
      - 대화 생성(dialogue generation) 모델
      - CNN을 인코더(encoder)로, RNN을 디코더(decoder)로 사용
    - [Dynamic CNN](https://arxiv.org/abs/1404.2188)
      - 문장 의미 모델링(sentence semantic modeling)에 사용됨
      - max pooling 도입
      - 다양한 길이의 입출력 데이터에서 관계 탐색(relation discovery)에 성공
  - 최근 모델
    - [Kalchbrenner의 모델](https://arxiv.org/abs/1610.10099)
      - 기계 번역(neural machine translation) 모델
      - masked covolution layer를 디코더(decoder)로 사용
    - [ConvS2S](https://arxiv.org/abs/1705.03122)
      - 문장 모델링(sentence modeling)에 skip connection, 어텐션(attention) 도입
      - 당시 SOTA 번역(translation) 성능을 달성
    - [He의 모델](https://arxiv.org/abs/1711.01577)
      - RNN을 쌓은 것(stacked RNN)에 cross-layer convolution을 추가하여 입출력값 간 연관성(correlation)을 강화
    - [Transformer](https://arxiv.org/abs/1706.03762)
      - 다중 헤드 어텐션(multi-head attention), 셀프 어텐션(self attention), 위치 정보 인코딩(position encoding) 도입
      - 디코더(decoder)가 멀리 있는 정보에도 주의를 기울일 수 있음
      - 품질 저하 없이 학습 시간을 비약적으로 단축
    - [BERT](https://arxiv.org/abs/1810.04805)
      - 심층 언어 표현 모델(deep language representation model)
      - Transformer에 양방향 학습(bidirectional training)을 도입
      - 11개의 NLP 과제(ex. 문장 분류(sentence classification), 문장 태깅(sentence tagging), 기계독해(question answering), 개체명 인식(named entity recognition))에 대해 SOTA 달성
      - 고정된 컨텍스트 길이(fixed-length context), 양방향성(bidirectional nature)에 대한 제약을 해결해 언어 모델링(language modeling), 언어 생성(language generation) 등에 확장 적용
- 시퀸스 생성(sequence generation) 속도를 올리는 과제도 중요한 과제
  - 문제점 : 모든 자기회귀모델(autoregressive model)[^3]은 ancestral sampling[^4]을 사용하기 때문에 샘플들을 순차적으로만(sequentially) 생성할 수 있다. → 빠르고 병렬적인 샘플 생성 모델이 필요
  - [Gu의 모델](https://arxiv.org/abs/1711.02281)
    - 출생률(fertility)를 표현하는 숨어있는 변수(latent variable)을 샘플링해 비-자기회귀 학습(non-autoregressive learning)이 가능하게 함
  - [Inverse-Autoregressive Flows(IAFs)](https://arxiv.org/abs/1606.04934)
    - 잠재 변수(latent variable)로부터 고차원의 샘플들을 병렬적으로 생성 가능
  - [parallel WaveNet](https://arxiv.org/abs/1711.10433)
    - WaveNet과 IAF를 결합한 것
    - 높은 정확도(high fidelity)의 샘플 생성 가능
    - 음성 생성(audio generation) 분야에서 (기존 모델보다) 3000배 빠르게 동작

[^3]: 이전의 자신의 관측값이 이후의 자신의 관측값에 영향을 준다는 아이디어의 모델. RNN의 아이디어와 매우 유사하다. [참고](https://yamalab.tistory.com/112)
[^4]: 부모 노드로부터 샘플을 생성한 뒤, 생성된 부모 노드의 샘플에 대해 조건부 확률을 계산해 자식 노드의 샘플링을 수행하는 샘플 추출 기법. [참고](http://norman3.github.io/prml/docs/chapter08/1.html)

### 어텐션 메커니즘 (Attention mechanism)

- 기존 인코더-디코더 모델(encoder-decoder framework)의 문제점 : 디코더(decoder)는 오직 하나의 컨텍스트 벡터(context vector)에만 접근할 수 있다.
- 어텐션 매커니즘 (attention mechanism)
  - 텍스트를 읽을 때 사람은 시퀸스의 여러 부분에 주의를 기울이며 텍스트를 이해함 → 이를 흉내낸 매커니즘
- early binding : $\boldsymbol{h}\_t = \textrm{RNN}(\boldsymbol{h}\_{t-1},\,[\boldsymbol{e}\_{t-1};\,\boldsymbol{c}\_t])$
  - $\textrm{RNN}()$ : RNN 모델
  - $\boldsymbol{h}\_t$ : 각 단계(step) $t$에서의 은닉 상태값(hidden state)
  - $\boldsymbol{c}\_t$ : input source vector
- input source vector
  - 어텐션 매커니즘으로 생성된 추가적인 입력값(input)
  - 생성 방법
    1. 컨텐츠 기반 점수 함수(content-based scoring function)을 이용, 현재 단계(step)의 어텐션 에너지(attention energy)를 계산 : $\boldsymbol{u}\_t = \textrm{score}(F,\,\boldsymbol{h}\_{t-1})$
    2. input source vector $c\_t$ 계산 : $c\_t = F \textrm{softmax}(\boldsymbol{u}\_t)$
      - $F$ : 인코딩된 (전체) 시퀸스(encoded sequence)
      - $\boldsymbol{h}\_{t-1}$ : 이전 단계(step)의 은닉 상태값(hidden state)
      - $\boldsymbol{u}\_t$ : 어텐션 에너지(attention energy)
      - $\textrm{score}()$ : 컨텐츠 기반 점수 함수(content-based scoring function)
        - ex. dot-product : $\textrm{score}(F,\,\boldsymbol{h}\_{t-1}) = F^{\intercal}\boldsymbol{h}\_{t-1}$
          - 가장 간단한 점수 함수(scoring function)
        - ex. MLP(Multi-Layer Perceptron) : $\textrm{score}(F,\,\boldsymbol{h}\_{t-1}) = \boldsymbol{v}^{\intercal} \tanh(WF + V\boldsymbol{h}\_{t-1})$
          - 어텐션 논문에서 사용한 점수 함수(scoring function)
          - $V$ : expected input embedding
- 컨텐츠 기반 어텐션 에너지(content-based attention energy)로는 다른 위치(location)에서 비슷한 내용(content)를 가지고 있는 요소(element)들을 구별하는 것이 힘들다.
  - 컨텐츠 기반 어텐션 에너지는 각 요소(element)들에 대해 각각 점수를 계산하기 때문
  - 해결법 : 위치에 민감한 어텐션(location sensitive attention)을 사용
    - 위치에 민감한 어텐션(location sensitive attention)은 자기회귀적(autoregressive)으로 어텐션(attention)을 생성하기 때문
    - 그러나 역전파(backpropagation) 중 다른 RNN을 unrolling하면 비약적으로 컴퓨팅 시간이 늘어남
  - 해결법 : 다중 헤드 셀프 어텐션(multi-head self attention)을 이용
    - 다중 헤드 셀프 어텐션(multi-head self attention)을 이용하면 입력 시퀸스의 각 단어들의 다른 위치에 있는 연관 컨텍스트(relevant context)를 표현할 수 있음
- 시퀸스 모델링(sequence modeling)과 어텐션 매커니즘(attention mechanism)을 합치면 현재 SOTA 기계번역(machine translation) 성능을 얻을 수 있다.

### Memory-augmented neural networks

- 외부 메모리(external memory) 기법은 어텐션(attention)과 자주 함께 쓰임
  - 외부 메모리(external memory)는 내부 상태(internal state)로 사용됨
  - 어텐션 매커니즘(attention mechanism)은 외부 메모리(external memory)를 업데이트함 → 선택적 읽기 및 업데이트(selective reading and updating)
- 메모리 네트워크(memory network)
  - 일반적으로 다음을 입력값으로 받음
    - 쿼리(query) $q$
      - 범용 대화(general dialogue) 설정(setting)의 경우 : 화자가 마지막으로 말한 말(utterance)
      - 질의응답(QA, Question Answer) 설정(setting)의 경우 : 질문(question)
    - 메모리 벡터(memory vector) $\boldsymbol{m}$
      - 모델이 가지고 있던 대화 기록(dialog history)
      - 모델이 충분히 강력할 경우 이 지식(knowledge)은 전체 코드베이스(codebase) 혹은 문서(documentation) 크기만큼 클 수 있다.
  - 일반적으로 다음 모듈(module)들을 가짐
    - 인코더(encoder)
      - $q$를 벡터(vector)로 변환
      - RNN 또는 워드 임베딩(word embedding)으로 구현
    - 메모리 모듈(memory module) $M$
      - $\boldsymbol{m}$에서 $q$와 관련된 최고의 부분(best part)를 찾음
      - 이 과정을 어드레싱 단계(addressing stage)라 함
    - 컨트롤러 모듈(controller module) $C$
      - $q$를 $M$으로 전송하고, 관련 메모리(relevant memory)를 다시 읽어들여 현재 상태(current state)에 추가
      - 일반적으로는 이 과정이 계속 반복되게(cycle) 함으로서 복잡한 추리(reasoning)가 가능케 함
    - 디코더(decoder)
      - 마지막 단계에서, 출력값(output)을 생성
- [MemNN(Memory Network)](https://arxiv.org/abs/1410.3916)
  - RAM을 흉내냄
  - 어드레싱(addressing)에 소프트 어텐션(soft attention)을 사용
  - 학습과정은 완전지도(fully supervised) 방식
    - 메모리의 최고의 부분(best part)을 표시한 레이블이 메모리 어드레싱(memory addressing)의 모든 단계에 주어짐
- [End-to-End Memory Network](https://arxiv.org/abs/1503.08895)
  - 메모리 어드레싱(memory addressing)에 소프트 어텐션(soft attention)을 사용
    - 역전파(backpropagation) 과정에서 어텐션(attention)을 학습할 수 있게 함
  - 출력값(output)만 지도(supervision)하면 됨
- [Millor의 모델](https://arxiv.org/abs/1606.03126)
  - 쿼리(query)와 상태(state)를 모두 매치시키기 위해 하나의 메모리 유닛(memory unit)을 쓰는 것은 표현력(expressiveness)이 낮음 → 메모리(memory)를 키-값 쌍(key-value pair)으로 나눔
    - 사전 지식(prior knowledge) 인코딩 성공
- [Recurrent Entity Network](https://arxiv.org/abs/1612.03969)
  - 에이전트(agent)가 진리(fact)를 찾을 수 있게 메모리(memory)에 읽고 쓰는 것을 학습하게 해 메모리 유닛(memory unit)의 성능을 올림
- [Weston의 모델](https://arxiv.org/abs/1604.06045)
  - Recurrent Entity Network에 정답(answer)과 에측 응답(predict reply)을 생성하는 새로운 계층을 추가하여 비지도학습(unsupervised learning)이 가능하도록 일반화
  - 12개의 간단한 bAbI 추론(reasoning) 과제, 아동용 도서 읽기, 영화의 실제 대화 이해하기 등의 과제에 대해 평가됨(사용됨)
- 최근 연구들은 SGD를 통한 모델 최적화가 가능해지도록 전동척인 메모리 패러다임(memory paradigm)이 미분 가능하게(differentiable) 만들려 하고 있음
- end-to-end 학습이 가능한 모델은 알고리즘적 학습(algorithmic learning)을 조정하거나, 언어 이해(language understanding), 프로그램 생성(program induction) 등과 같은 추론 과제(reasoning task)에 사용됨

### beam 탐색(beam search)

- 문제점 : 높은 확률(probability)로 최고로 디코딩된 결과(best-decoded result)를 탐색하는 것은 계산적으로 어려움(computationally intractable)
  - 한 가지 해법 : 디코딩(decoding) 과정에서 매 시간 간격(time step)마다 가장 높은 출력 확률(output probability)을 가진 단어(word)/토큰(token)을 선택
    - 문제점 : 차선의 결과(sub-optimum result)밖에 못 찾을 확률이 큼
- 따라서 기계번역(machine translation) 분야에서는 휴리스틱 탐색 기법으로 beam 탐색(beam search)를 많이 씀
  - 기존 방법
    - 다음 단어를 선택할 때, 가장 높은 확률(possibility)을 바로 선택
  - beam 탐색
    - 이전의 가장 그럴듯한 부분 번역(partial translation)들의 목록을 보관
    - 현재 단계에서 선택된 단어(word)/토큰(token)을 위 목록 각각에 붙여 점수를 다시 계산(re-rank)
    - beam 크기(beam size) : 각 시간 단계(time step)에서의 목록의 길이
- beam 탐색을 쓰면 기계번역 성능이 높아짐
- 기계번역 성능은 beam 크기(beam size)에 영향을 많이 받음

## 딥러닝 모델을 이용한 입력값 임베딩(Input embedding of deep learning model)

- 코드 모델링(code modeling)에서 입력값 표현(input representation)은 아주 중요
  - 코드에서, 함수(function), 클래스(class), 프로젝트(project)별로 키워드 표현(keyword representation)은 엄청 다를 수 있기 때문
- 전통적인 표현법(ex. 원-핫 인코딩(one-hot encoding), $n$-gram 등)은 듬성듬성한(sparse) 임베딩 벡터(embedding vector)를 생성
- 최근 딥러딩 모델에서는 입력 단어(input word)들이 분산 표현법(distributed representation)을 이용한 실수값 벡터(real-valued vector)로 표현됨
  - 