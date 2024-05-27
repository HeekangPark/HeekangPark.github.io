---
title: "어텐션 메커니즘 (Attention Mechanism)"
order: 3
date_created: "2024-05-19"
date_modified: "2024-05-19"
---

# 어텐션 메커니즘 (Attention Mechanism)

::: info 참고

[[2015] Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)

:::

어텐션 메커니즘은 Seq2Seq 모델의 문제점을 개선하기 위해 제안되었다. 어텐션 메커니즘의 아이디어는 고정된 크기의 벡터(컨텍스트 벡터) 하나에 입력 시퀸스의 모든 정보를 다 담아야 한다는 인코더의 부담을 덜어 주기 위해,[^1] 디코더에서 다음 단어 예측을 위해 인코더의 마지막 은닉 상태(컨텍스트 벡터)뿐만 아니라 **인코더의 매 시점 은닉 상태들을 모두 사용하자**는 것이다.

[^1]: "we relieve the encoder from the burden of having to encode all information in the source sentence into a fixedlength vector."

구체적으로, 어텐션 메커니즘은 다음을 가정한다.

> 디코더가 단어 $X$를 출력하기 직전의 디코더 은닉 상태는, 인코더가 입력 시퀸스에서 $X$와 연관이 깊은 단어를 읽은 직후의 인코더 은닉 상태와 유사할 것이다.

예를 들어 영어 문장 "I am a student."을 프랑스어 문장 "Je suis étudiant."로 번역하는 상황을 생각해 보자. 출력 시퀸스의 단어 "étudiant"(프랑스어로 학생을 뜻하는 단어)는 입력 시퀸스의 단어 "i", "am", "a", "student" 중 "student"(영어로 학생을 뜻하는 단어)와 연관이 깊다. 이때 어텐션 메커니즘은 디코더가 "étudiant"를 출력하기 직전의 은닉 상태는 인코더가 "student"를 입력받은 직후의 은닉 상태와 유사할 것이라 가정한다. 이 가정에 따르면, 인코더가 "student"를 입력받은 직후의 은닉 상태에 조금 더 '집중'하면 훨씬 더 품질 높은 번역을 만들 수 있을 것이라 기대할 수 있다.

따라서 Seq2Seq + 어텐션 모델의 디코더는 다음과 같은 순서로 다음 단어를 예측한다.

1. 어느 시점의 인코더 은닉 상태에 조금 더 '집중'해야 하는지 찾기 위해, 현재 디코더의 은닉 상태와 매 시점 인코더의 은닉 상태들 간 '유사도'를 계산한다.
2. 이 유사도를 확률의 형태로 바꾸고, 그 값에 따라 인코더 은닉 상태들의 가중합(weighted sum)을 구해 '보정된 컨텍스트 벡터'를 구한다.
3. '보정된 컨텍스트 벡터'을 이용해 다음 단어를 예측한다.

이렇게 하면 Seq2Seq 모델의 두 가지 문제점이 모두 해결된다. 인코더의 마지막 은닉 상태 뿐만 아니라 인코더의 매 시점 은닉 상태들이 모두 디코더로 넘어가므로, 시퀸스의 길이가 길어지더라도 손실되는 정보가 거의 없다. 또 초기 시점의 인코더 은닉 상태와 나중의 인코더 은닉 상태가 동등하게 확률의 형태로 전달되므로, gradient vanishing/exploding 현상을 줄일 수 있다.

## Seq2Seq + 어텐션 모델의 동작 방법

### 인코더

Seq2Seq + 어텐션 모델의 인코더는 Seq2Seq의 인코더와 동일하다. 다만 Seq2Seq 모델의 인코더는 마지막 은닉 상태(context vector) 하나만 디코더로 넘기던 것을, Seq2Seq + 어텐션 모델의 인코더는 모든 시점의 은닉 상태를 디코더로 넘긴다.

### 디코더

Seq2Seq + 어텐션 모델의 디코더 동작 과정은 다음과 같다.

- $N$ : 입력 시퀸스의 단어(token) 수. 즉, 인코더의 총 은닉 상태의 개수.
- $h_p$ : 시점 $p$에서의 인코더의 은닉 상태 ($p = 1,\,2,\,\cdots,\,N$)
- $s_q$ : 시점 $q$에서의 디코더의 은닉 상태
- $x_r$ : 시점 $r$에서의 디코더의 입력 단어 임베딩. Seq2Seq 모델에서 디코더의 입력은 이전 시점의 디코더 출력이므로, 이 값은 동시에 시점 $r - 1$에서의 디코더의 출력 단어이기도 하다.

라 할 때, 시점 $t$에서 디코더는 출력 단어 $x_{t + 1}$는 다음과 같이 예측한다.

1. **스코어 함수(score function, alignment model)** $f$를 이용, 매 시점 인코더 은닉 상태 $h_k$와 디코더의 (이전) 은닉 상태 $s_{t-1}$ 간의 유사도(이를 **어텐션 스코어(attention score)** 라 한다)를 모은 벡터, $\mathbf{e}$를 계산한다.

   $$\mathbf{e} = \left[\, e_{1},\,e_{2},\,\cdots,\,e_{N}\,\right]$$

   (단, $e_{k} = f(s_{t-1}, h_k)$. ($k = 1,\,2,\,\cdots,\,N$)) {.text-align-center .mt-n1 .mb-1}

   - 스코어 함수란 두 개의 벡터를 입력으로 받아 그들 간의 유사도를 계산하는 함수를 뜻한다.
   - 스코어 함수의 종류는 다음 문단을 참조하자.

2. **어텐션 분포(attention distribution)** $\boldsymbol{\alpha}$를 구한다.

    $$\boldsymbol{\alpha} = \textrm{softmax}(\mathbf{e} )$$

   - 어텐션 분포란 가중합 연산을 위해 softmax 함수를 이용, 위에서 계산한 유사도(어텐션 스코어) 벡터 $\mathbf{e}$를 확률 형태로 바꾼 것이다.
 
3. **어텐션 값(attention value)** $a$를 계산한다.

    $$a = \sum_{k=1}^{N} \alpha_{k} h_k = \alpha H$$

    (단, $\alpha_k$는 어텐션 분포 $\boldsymbol{\alpha}$의 $k$번째 값(= $k$번째 단어의 가중치)) {.text-align-center .mt-n1 .mb-1}

   - 위에서 계산한 어텐션 분포 $\boldsymbol{\alpha}$를 가중치로 하여 모든 인코더 은닉 상태들의 가중합(weighted sum)을 구한다. 이렇게 구한 값 $a$를 어텐션 값이라 한다.
   - 디코더의 은닉 상태 $s_{t-1}$과 유사도가 높은 인코더 은닉 상태는 큰 어텐션 스코어를 가질 것이고, 따라서 어텐션 값에 더 많이 포함된다. 반대로 유사도가 낮은 인코더 은닉 상태는 어텐션 값에 적게 포함된다.
   - 즉 어텐션 값을 참조하면 유사도가 더 높은 인코더 은닉 상태에(= 가정에 의해, 더 '관련있는' 단어에) 집중할 수 있다.
   - $h_p$들을 모두 모은 벡터 $H$를 이용하면 벡터 연산으로 어텐션 값을 한 번에 구할 수도 있다.

4. 어텐션 값과 디코더 입력 $x_{t}$을 합쳐(concatenate) $v_{t-1}$를 만들고, 이를 RNN 셀의 입력으로 하여 새로운 디코더 은닉 상태 $s_t$를 만든다. 그리고 (기존 Seq2Seq 모델에서의 방법과 동일하게) 디코더 은닉 상태 $s_t$로부터 시점 $t$에서의 단어를 예측한다.

    $$v_{t-1} = [a;x_{t}]$$

## Seq2Seq + 어텐션 모델의 학습 방법

Seq2Seq + 어텐션 모델 역시 Seq2Seq 모델에서와 동일하게 교사 강요 방식으로 학습을 진행한다.

## 일반화 : Attention(query, key, value)

어텐션 메커니즘의 동작 과정은 query, key, value라는 이름으로 일반화할 수 있다.

1. 유사도(similarity) 계산 : 스코어 함수를 이용, query와 각 key들 간의 어텐션 스코어를 계산한다.
2. 정규화(normalization) : softmax 함수를 이용, query와 각 key들간의 어텐션 스코어들을 어텐션 분포로 변환한다.
3. 가중합(weighted sum) 계산 : 어텐션 분포를 이용해 각 value들의 가중합(어텐션 값)을 구한다.

즉 어텐션 연산은 query에 대해 value들을 '요약'하는 것이다. 모든 value들을 참조하는데, 그 중 어떤 value가 더 중요한지(= query와 유사도가 높은 key의 value인지), 어떤 value에 조금 더 '집중'해야 하는지(= 가중치를 높여야 하는지) 결정하는 것이다.

<v-image src="attention-qkv.png" title="Fig.01 Attention 연산" description="어텐션 연산은 query(주황색)와 key들(녹색) 사이의 유사도(노란색)에 따라, key와 짝지어져 있는 value들(파란색)의 가중합을 구하는 연산이다. 이때 query와 key들 간의 유사도는 스코어 함수를 이용해 계산한다." />

Seq2Seq + 어텐션 모델에서의 어텐션 연산은 query로 디코더의 은닉 상태($s_{t-1}$)를 사용하고, key와 value로 인코더의 모든 은닉 상태($h_{k}$)를 사용한 것이다.

## query, key, value 이름에 대해

처음 어텐션 메커니즘을 배우면 제일 헷갈리는 것이 바로 이 이름이다. 왜 query, key, value라는 이름을 썼을까? Seq2Seq + 어텐션 모델에서는 key와 value가 같다 그러고, 조금 있으면 나오는 self-attention에서는 query, key, value가 모두 같다는데, 왜 query, key, value라 다르게 이름을 붙였을까?

파이썬 딕셔너리를 생각해 보자. 파이썬 딕셔너리는 키(key)-값(value) 쌍을 저장하고 있는 자료구조로, 키(key)를 찾으면(query) 그에 상응하는 값(value)을 얻을 수 있다. 하지만 파이썬 딕셔너리에서는 존재하지 않는 키를 찾으려 하면 오류(`KeyError`)가 발생한다.

그럼 이 파이썬 딕셔너리를 조금 완화시킨 버전을 생각해 보자. '완화된 딕셔너리'에서는 사용자의 query에 대해 '최선을 다해' 값을 반환한다. 만약 존재하지 않는 키(key)를 찾으려 하면 저장되어 있는 키-값(key-value) 쌍들을 참조해 최대한 그럴 듯한 값을 만들어서 반환한다. 구체적으로, 다음과 같이 한다.

1. 사용자가 찾고 싶은 값(query)이 입력된다.
2. 딕셔너리에 저장된 모든 키(key)들과 query 간의 '유사도'를 계산한다.
3. 유사도를 확률 형태로 변환한다.
4. 3번에서의 값에 따라 값(value)들의 가중합(weighted sum)을 구한 것을 최종 결과로 반환한다.

어디서 많이 본 모습이지 않은가. 그렇다. 어텐션 메커니즘의 동작 방법과 완전히 같다. 즉 어텐션 메커니즘은 딕셔너리와 비슷하게, 다만 조금 완화된 버전으로, 저장된 값(key-value 쌍)들을 바탕으로 특정 값(query)에 가장 맞는 값(attention value)을 얻는 것이라 이해하면 된다.

## 스코어 함수

query와 key 사이의 유사도를 구하는 스코어 함수 $f$로는 다양한 함수가 사용될 수 있다.

가장 간단한 형태는 내적(dot product) 함수가 있다. 이 경우 query와 key가 같으면 내적 함수는 최대값이 되고, 반대 방향으로 가면 최솟값이 된다. 이렇게 내적 함수를 사용하는 어텐션을 dot-product 어텐션, 또는 제안자의 이름을 따 Luong 어텐션이라 한다.

어텐션 메커니즘을 처음 제안했던 논문의 저자(Bahdanau)는 다음과 같이 '학습 가능한' 스코어 함수를 사용했다. 아래 식에서 $V$, $W_1$, $W_2$는 각각 학습 가능한 가중치 행렬이다. 이런 스코어 함수를 쓰는 어텐션을 Bahdanau 어텐션이라 한다.

$$f(s,\,h) = V^T \tanh (W_1 s + W_2 h) $$

이외에도 다양한 종류의 스코어 함수를 생각할 수 있다. 다음은 유명한 몇몇 스코어 함수들을 정리한 표이다.

|                    이름                     |                                 식                                 |                                      출처                                       |
| :-----------------------------------------: | :----------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
|           content-based attention           | $f(s,\,h) = \displaystyle \frac{s^T h}{\|\|s\|\| \cdot \|\|h\|\|}$ |                 [Graves, 2014](https://arxiv.org/abs/1410.5401)                 |
| additive attention<br/>(Bahdanau attention) |             $f(s,\,h) = V^T \tanh (W_1 s + W_2 h)$[^3]             |                [Bahdanau, 2015](https://arxiv.org/abs/1409.0473)                |
| dot-product attention<br/>(Loung attention) |                         $f(s,\,h) = s^T h$                         |                 [Luong, 2015](https://arxiv.org/abs/1508.04025)                 |
|        scaled dot-product attention         |       $f(s,\,h) = \displaystyle \frac{s^T h}{\sqrt{n}}$[^4]        | [Vaswani, 2017](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf) |

[^3]: 단, $V$, $W_1$, $W_2$는 각각 학습 가능한 가중치 행렬
[^4]: 단, $n$은 $s$와 $h$의 차원

## Cross Attention vs. Self Attention

key, value로 같은 값을 사용하지만 query는 다른 값을 사용하는 어텐션 연산(즉, query ≠ key = value)을 **cross attention** 연산이라 한다. Seq2Seq + 어텐션 모델에서의 어텐션 연산, 또는 후술할 트랜스포머 모델의 디코더에서 사용하는 어텐션 연산은 cross attention 연산이다.

반면, query, key, value로 모두 같은 값을 사용하는 어텐션 연산(즉, query = key = value)을 **self attention** 연산이라 한다. 후술할 트랜스포머 모델의 인코더에서 사용하는 어텐션 연산은 self attention 연산이다.