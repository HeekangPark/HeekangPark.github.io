---
title: "Deep Learning for Source Code Modeling and Generation: Models, Applications and Challenges"
date: "2021-02-08"
layout: "draft"
---

논문 Triet H. M. Le, Hao Chen, Muhammad Ali Babar, 2020, "Deep Learning for Source COde Modeling and Generation: Models, Applications and Challenges" 정리

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

[^1]: 대규모의 데이터 집합 또는 데이터베이스로부터 숨겨진 유용한 패턴 정보를 추출하는 기법

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

[^2]: 데이터만 입력하고 중간 단계 없이 최종 단계까지 원하는 목적을 한 번에 학습하는 방법. end-to-end learning을 하기 위해서는 아주 많은 데이터가 필요하다. end-to-end learning의 반대 개념은 여러 단계를 나눠서 학습하는 것(복잡한 문제를 간단한 여러 문제로 나눠서 푸는 것)으로, 때로는 이 방법이 더 효율적일 수도 있다.

# 인코더-디코더 구조를 이용한 Deep Sequence 모델링 (Deep Sequence Modeling with Encoder-Decoder Framework)

- 인코더-디코더 구조(encoder-decoder framework)

{% include caption-img.html src="main-steps-of-encoder-decoder-framework.png" description="인코더-디코더 구조(encoder-decoder framework)의 핵심 단계들" %}

- 순차적인 모델(sequential model)(ex. 각 단어별로(word-by-word) 모델링), 구조적인 모델(structural model)(ex. 문장(sentence) 또는 코드 조각(snippet)의 문법 구조(syntactic structure)를 탐색(exploiting)) 둘 다 순차 모델링(sequence modeling)에 사용될 수 있다.

## 순차 모델링을 위한 DL 모델 (Deep learning models for sequence modeling)

- 순차 모델링(sequence modeling)을 위한 DL 모델은 크게 두 종류로 분류할 수 있다.
  - 순환신경망(recurrent neural network)
  - 비 순환신경망(non-recurrent neural network)
- 조금 더 강건한(robust) 모델을 만들기 위해 다음 세 가지 기술이 사용된다.
  - 어텐션 메커니즘(attention mechanism)
  - 외부 메모리(external memory)
  - beam 탐색(beam search)
- MLP(multi-layer perceptron)(fully-coonected neural network, feed-forward neural network라고도 불린다)는 시퀸스(sequence)로부터 의존성(dependency)과 순차적인 속성(sequential property)을 잘 잡아내지 못하기 때문에 순차 모델링(sequence modeling)엔 잘 사용되지 않음(위의 세 가지 기술과 조합해서는 가끔 사용됨)

### 순환신경망 (Recurrent Neural Network)

- 순환신경망에서 파라미터 블럭(block of parameters)은 