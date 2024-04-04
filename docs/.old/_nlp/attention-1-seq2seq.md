---
title: "어텐션 메커니즘 (Attention Mechanism) : (1) Seq2Seq 모델"
date_created: "2022-01-25"
date_modified: "2022-12-07"
---

{:.info}
어텐션 메커니즘 시리즈
- [Seq2Seq 모델](/nlp/seq2seq)
- [어텐션 메커니즘](/nlp/attention)
- [Transformer 모델](/nlp/transformer)

# Seq2Seq 모델

{:.info}
[[2014] Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)

어텐션 메커니즘은 본래 Seq2Seq 모델을 개선하기 위해 제안된 메커니즘이다. 어텐션 메커니즘을 잘 이해하려면 Seq2Seq 모델을 이해해야 한다.

Seq2Seq 모델은 번역, 요약과 같이 시퀸스(sequence)[^1]를 입력받아 시퀸스를 출력하는 task를 위해 고안된 RNN 기반 모델이다.[^2]

[^1]: 시퀸스(sequence)는 순서가 있는 항목들의 모음을 의미한다(ordered collection of items). 예를 들어 단어(word), 문장(sentence)은 시퀸스이다. 단어를 구성하는 글자(character)들의 순서가 바뀌면 그 의미가 바뀌고, 문장을 구성하는 단어들의 순서가 바뀌면 그 의미가 바뀌기 때문이다.
[^2]: 번역 : 원문을 받아들여 번역문을 출력. 요약 : 원문을 받아들여 요약문을 출력.

{% include caption-img.html src="attention-seq2seq.png" title="Fig.01 Seq2Seq 모델" description="영어 문장 \"I am a student.\"을 프랑스어 \"Je suis étudiant.\"으로 번역하는 Seq2Seq 모델이다. 왼쪽 주황색 사각형이 인코더(encoder)를, 오른쪽 녹색 사각형이 디코더(decoder)를 나타내고 있다. 인코더는 입력 문장(\"I am a student.\")을 입력받아 컨텍스트 벡터(context vector)를 출력하고, 디코더는 컨텍스트 벡터(와 <code class=\"language-plaintext highlighter-rouge\">&lt;sos&gt;</code> 토큰)를 입력으로 받아 출력 문장(\"Je suis étudiant.\")을 출력한다." %}

Seq2Seq 모델은 '시퀸스를 받아들이는 부분'과 '시퀸스를 출력하는 부분'을 분리한 것이 특징이다. 이때 시퀸스를 받아들이는 부분(왼쪽 주황색 RNN 모듈)을 **인코더(encoder)**, 시퀸스를 출력하는 부분(오른쪽 녹색 RNN 모듈)을 **디코더(decoder)**라 한다. 인코더는 입력 시퀸스(원문)를 받아들여 **컨텍스트 벡터(context vector)**라 불리는, 고정된 크기의 벡터로 변환한다. 디코더는 인코더가 생성한 컨텍스트 벡터를 받아 출력 시퀸스(번역문)를 출력한다.[^3]

[^3]: Fig.01를 보면 인코더, 디코더에 각각 여러 개의 RNN 셀이 있는 것처럼 그려져 있으나, 이는 여러 시점(time step)을 한 그림에 나타내기 위함일 뿐이지, 인코더와 디코너는 각각 하나의 RNN 셀로 이루어져 있다(단, RNN 셀을 세로 방향으로 여러 층 '깊게' 쌓는 경우는 있다). 또한 Fig.01에서는 LSTM을 사용하는 것으로 그려져 있는데, 경우에 따라 LSTM이 아닌 vanilla RNN, GRU 등 다른 RNN 셀을 사용할 수도 있다(LSTM을 쓰는 게 제일 흔하긴 하다).

## Seq2Seq 모델의 동작 방법

Seq2Seq 모델이 동작(inference)하는 순서는 다음과 같다. 우선 인코더의 은닉 상태를 적절한 값(ex. 영벡터)으로 초기화한다. 그리고 매 시점(time step) 원문의 단어(token)가 입력되면(정확히는, 단어의 임베딩이 입력되면) 인코더는 이를 이용해 은닉 상태를 업데이트한다. 입력 시퀸스의 끝까지 이 과정을 반복하면 인코더의 최종 은닉 상태는 입력 시퀸스의 정보를 압축 요약한 정보를 담고 있게 된다. 이 마지막 시점에서의 인코더 은닉 상태를 컨텍스트 벡터라 하고, 이 값은 디코더로 넘어간다.

디코더는 전달받은 컨텍스트 벡터로 자신의 은닉 상태를 초기화한다. 그리고 매 시점 자신이 바로 직전 시점에 출력했던 단어를 입력으로 받아(점선 화살표), 자신의 은닉 상태를 업데이트하고, 이를 이용해 다음 단어를 예측한다(최초 시점에서는 시퀸스 시작을 의미하는 `<sos>` 토큰(start of sequence)을 입력으로 받는다). 이 과정을 정해진 반복 횟수 또는 시퀸스 끝을 나타내는 `<eos>` 토큰(end of sequence)이 나올 때까지 수행한다.

## Seq2Seq 모델의 학습 방법 - 교사 강요(teacher forcing)

Seq2Seq 모델을 사용(inference)할 땐 위에서 설명한 것처럼 이전 시점의 디코더 출력 단어를 다시 디코더 입력값으로 사용하는 방식을 사용하나, 이 방식으로 학습(training)을 시키면 디코더가 잘 학습되지 않는다. 모델 학습 시에는 디코더의 입력값으로 이전 시점의 디코더 출력 단어가 아닌 실제 정답 단어를 입력해 줘야 한다. 이 방식을 **교사 강요(teacher forcing)**라 한다.

{% include caption-img.html src="attention-seq2seq-teacher-forcing.png" title="Fig.02 Seq2Seq - Teacher Forcing" description="Seq2Seq 모델의 학습은 교사 강요(teacher forcing) 방식으로 진행해야 한다. 즉 \"&lt;sos&gt;je suis étudiant\"가 입력되었을 때 \"je suis étudiant&lt;eos&gt;\"가 출력되어야 한다는 것을 디코더에게 직접 알려줘야 한다." %}

## Seq2Seq 모델의 한계

Seq2Seq 모델은 번역(translation), 챗봇 등의 task에서 높은 성능을 보였다. 하지만 Seq2Seq 모델은 커다란 한계가 있었다.

- 입력 시퀸스의 모든 정보를 하나의 고정된 크기의 벡터(컨텍스트 벡터)에 다 압축 요약하려 하다 보니 정보의 손실이 생길 수밖에 없다. 특히 시퀸스의 길이가 길다면 정보의 손실이 더 커진다.
- RNN 기반 모델이다 보니, 필연적으로 gradient vaninshing/exploding 현상이 발생한다.

# 어텐션 메커니즘 (Attention Mechanism)

{:.info}
[[2015] Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)

어텐션 메커니즘은 Seq2Seq 모델의 문제점을 개선하기 위해 제안되었다. 어텐션 메커니즘의 아이디어는 고정된 크기의 벡터(컨텍스트 벡터) 하나에 입력 시퀸스의 모든 정보를 다 담아야 한다는 인코더의 부담을 덜어 주기 위해,[^4] 디코더에서 다음 단어 예측을 위해 인코더의 마지막 은닉 상태(컨텍스트 벡터)뿐만 아니라 **인코더의 매 시점 은닉 상태들을 모두 사용하자**는 것이다.

[^4]: "we relieve the encoder from the burden of having to encode all information in the source sentence into a fixedlength vector."

구체적으로, 어텐션 메커니즘은 다음을 가정한다.

> 디코더가 단어 $X$를 출력하기 직전의 디코더 은닉 상태는, 인코더가 입력 시퀸스에서 $X$와 연관이 깊은 단어를 읽은 직후의 인코더 은닉 상태와 유사할 것이다.

예를 들어 영어 문장 "I am a student."을 프랑스어 문장 "Je suis étudiant."로 번역하는 상황을 생각해 보자. 출력 시퀸스의 단어 "étudiant"(프랑스어로 학생을 뜻하는 단어)는 입력 시퀸스의 단어 "i", "am", "a", "student" 중 "student"(영어로 학생을 뜻하는 단어)와 연관이 깊다. 이때 어텐션 메커니즘은 디코더가 "étudiant"를 출력하기 직전의 은닉 상태는 인코더가 "student"를 입력받은 직후의 은닉 상태와 유사할 것이라 가정한다. 따라서 인코더가 "student"를 입력받은 직후의 은닉 상태에 조금 더 '집중'하면, 훨씬 더 품질 높은 번역을 만들 수 있을 것이다.

이 가정에 따라, Seq2Seq + 어텐션 모델의 디코더는 다음과 같은 순서로 다음 단어를 예측하게 된다.

1. 어느 시점의 인코더 은닉 상태에 조금 더 '집중'해야 하는지 찾기 위해, 현재 디코더의 은닉 상태와 매 시점 인코더의 은닉 상태들 간 '유사도'를 계산한다.
2. 이 유사도를 확률의 형태로 바꾸고, 그 값에 따라 인코더 은닉 상태들의 가중합(weighted sum)을 구해 '보정된 컨텍스트 벡터'를 구한다.
3. '보정된 컨텍스트 벡터'을 이용해 다음 단어를 예측한다.

이렇게 하면 Seq2Seq 모델의 두 가지 문제점이 모두 해결된다. 인코더의 마지막 은닉 상태 뿐만 아니라 인코더의 매 시점 은닉 상태들이 모두 디코더로 넘어가므로, 시퀸스의 길이가 길어지더라도 손실되는 정보가 거의 없다. 또 초기 시점의 인코더 은닉 상태와 나중의 인코더 은닉 상태가 동등하게 확률의 형태로 전달되므로, gradient vanishing/exploding 현상을 줄일 수 있다.

## Seq2Seq + 어텐션 모델의 동작 방법

Seq2Seq + 어텐션 모델의 인코더는 Seq2Seq의 인코더와 동일하다. 다만 Seq2Seq 모델의 인코더는 마지막 은닉 상태(context vector) 하나만 디코더로 넘기던 것을, Seq2Seq + 어텐션 모델의 인코더는 모든 시점의 은닉 상태를 디코더로 넘긴다.

이제 Seq2Seq + 어텐션 모델의 디코더 동작 과정을 자세히 알아보자.

- $N$ : 입력 시퀸스의 단어(token) 수. 즉, 인코더의 총 은닉 상태의 개수.
- $h\_p$ : 시점 $p$에서의 인코더의 은닉 상태 ($p = 1,\,2,\,\cdots,\,N$)
- $s\_q$ : 시점 $q$에서의 디코더의 은닉 상태
- $x\_r$ : 시점 $r$에서의 디코더의 입력 단어 임베딩. Seq2Seq 모델에서 디코더의 입력은 이전 시점의 디코더 출력이므로, 이 값은 동시에 시점 $r - 1$에서의 디코더의 출력 단어이기도 하다.

라 할 때, 시점 $t$에서 디코더는 출력 단어 $x\_{t + 1}$는 다음과 같이 예측한다.

1. **스코어 함수(score function)** $f$를 이용, 매 시점 인코더 은닉 상태 $h\_k$와 디코더의 (이전) 은닉 상태 $s\_{t-1}$ 간의 유사도(이를 **어텐션 스코어(attention score)**라 한다)를 모은 벡터, $\mathbf{e}$를 계산한다.

    - 스코어 함수(alignment model이라고도 한다)란 두 개의 벡터를 입력으로 받아 그들 간의 유사도를 계산하는 함수를 뜻한다.
    - 스코어 함수의 종류는 다음 문단을 참조하자.
 
    {:.mathjax-mb-0}
    $$\mathbf{e} = \left[\, e_{1},\,e_{2},\,\cdots,\,e_{N}\,\right]$$

    {:.text-align-center}
    (단, $e_{k} = f(s\_{t-1}, h\_k)$. ($k = 1,\,2,\,\cdots,\,N$))

2. **어텐션 분포(attention distribution)** $\boldsymbol{\alpha}$를 구한다.

    - 어텐션 분포란 가중합 연산을 위해 softmax 함수를 이용, 위에서 계산한 유사도(어텐션 스코어) 벡터 $\mathbf{e}$를 확률 형태로 바꾼 것이다.

    $$\boldsymbol{\alpha} = \textrm{softmax}(\mathbf{e} )$$
 
3. **어텐션 값(attention value)** $a$를 계산한다.

    - 위에서 계산한 어텐션 분포 $\boldsymbol{\alpha}$를 가중치로 하여 모든 인코더 은닉 상태들의 가중합(weighted sum)을 구한다. 이렇게 구한 값 $a$를 어텐션 값이라 한다.
    - 디코더의 은닉 상태 $s\_{t-1}$과 유사도가 높은 인코더 은닉 상태는 큰 어텐션 스코어를 가질 것이고, 따라서 어텐션 값에 더 많이 포함된다. 반대로 유사도가 낮은 인코더 은닉 상태는 어텐션 값에 적게 포함된다.
    - 즉 어텐션 값을 참조하면 유사도가 더 높은 인코더 은닉 상태에(= 가정에 의해, 더 '관련있는' 단어에) 집중할 수 있다.
    - $h\_p$들을 모두 모은 벡터 $H$를 이용하면 벡터 연산으로 어텐션 값을 한 번에 구할 수도 있다.

    {:.mathjax-mb-0}
    $$a = \sum_{k=1}^{N} \alpha_{k} h_k = \alpha H$$
 
    {:.text-align-center}
    (단, $\alpha\_k$는 어텐션 분포 $\boldsymbol{\alpha}$의 $k$번째 값(= $k$번째 단어의 가중치))

4. 어텐션 값과 디코더 입력 $x\_{t}$을 합쳐(concatenate) $v\_{t-1}$를 만들고, 이를 RNN 셀의 입력으로 하여 새로운 디코더 은닉 상태 $s\_t$를 만든다. 그리고 (기존 Seq2Seq 모델에서의 방법과 동일하게) 디코더 은닉 상태 $s\_t$로부터 시점 $t$에서의 단어를 예측한다.

    $$v_{t-1} = [a;x_{t}]$$

## Seq2Seq + 어텐션 모델의 학습 방법

Seq2Seq + 어텐션 모델 역시 Seq2Seq 모델에서와 동일하게 교사 강요 방식으로 학습을 진행한다.

## 일반화 : Attention(query, key, value)

어텐션 메커니즘의 동작 과정은 query, key, value라는 이름으로 일반화할 수 있다.

1. 유사도(similarity) 계산 : 스코어 함수를 이용, query와 각 key들 간의 어텐션 스코어를 계산한다.
2. 정규화(normalization) : softmax 함수를 이용, query와 각 key들간의 어텐션 스코어들을 어텐션 분포로 변환한다.
3. 가중합(weighted sum) 계산 : 어텐션 분포를 이용해 각 value들의 가중합(어텐션 값)을 구한다.

즉 어텐션 연산은 query에 대해 value들을 '요약'하는 것이다. 다르게 말하면, 어텐션 연산은 어떤 value에 '집중'할지 결정하는 것이다. 어텐션 연산이 수행되면, 중요한(= query와 유사도가 높은 key를 가진) value에 더 '집중'하게 된다.

{% include caption-img.html src="attention-qkv.png" title="Fig.03 Attention" description="어텐션 연산은 query(주황색)와 key들(녹색) 사이의 유사도(노란색)에 따라, key와 짝지어져 있는 value들(파란색)의 가중합을 구하는 연산이라 이해할 수 있다. 이때 query와 key들 간의 유사도는 스코어 함수를 이용해 계산한다." %}

Seq2Seq + 어텐션 모델에서의 어텐션 연산은 query로 디코더의 은닉 상태($s\_{t-1}$)를 사용하고, key와 value로 인코더의 모든 은닉 상태($h\_{k}$)를 사용한 것이다.

## query, key, value 이름에 대해

처음 어텐션 메커니즘을 배우면 제일 헷갈리는 것이 바로 이 이름이다. 왜 query, key, value라는 이름을 썼을까? Seq2Seq + 어텐션 모델에서는 key와 value가 같다 그러고, 조금 있으면 나오는 self-attention에서는 query, key, value가 모두 같다는데, 왜 query, key, value라 다르게 이름을 붙였을까?

파이썬 딕셔너리를 생각해 보자. 파이썬 딕셔너리는 키(key), 값(value) 쌍을 저장하고 있는 자료구조로, 이름 그대로 사전처럼 동작한다. 사전에서 단어를 찾으면 그에 대한 설명이 나오는 것처럼, 파이썬 딕셔너리에서는 키를 찾으면 그에 상응하는 값을 얻을 수 있다.

그런데 파이썬 딕셔너리에서는 존재하지 않는 키를 찾으려 하면 오류가 발생한다. 그럼 이 파이썬 딕셔너리를 조금 완화시킨 버전을 생각해 보자. '완화된 딕셔너리'에서는 사용자의 요청(query)이 들어오면, 저장되어 있는 키(key)들 중 이와 유사한 것들의 값(value)을 바탕으로 (query에 대한 value가 존재하지 않더라도) '최선을 다해' 값을 반환한다. 이를 한 줄 한 줄 풀어 쓰면 다음과 같다.

1. 사용자가 찾고 싶은 값(query)이 입력된다.
2. 딕셔너리에 저장된 모든 키(key)들과 query 간의 '유사도'를 계산한다.
3. 유사도를 확률 형태로 변환한다.
4. 3번에서의 값에 따라 값(value)들의 가중합(weighted sum)을 구한 것을 최종 결과로 반환한다.

어디서 많이 본 모습이지 않은가. 그렇다. 어텐션 메커니즘의 동작 방법과 완전히 같다. 즉 어텐션 메커니즘은 딕셔너리와 비슷하게, 다만 조금 완화된 버전으로, 저장된 값(key-value 쌍)들을 바탕으로 특정 값(query)에 가장 맞는 값(attention value)을 찾는 것이라 이해하면 된다.

## 스코어 함수

query와 key 사이의 유사도를 구하는 스코어 함수 $f$로는 다양한 함수가 사용될 수 있다.

가장 간단한 형태는 내적(dot product) 함수가 있다. 이 경우 query와 key가 같으면 내적 함수는 최대값이 되고, 반대 방향으로 가면 최솟값이 된다. 이렇게 내적 함수를 사용하는 어텐션을 dot-product 어텐션, 또는 제안자의 이름을 따 Luong 어텐션이라 한다.

어텐션 메커니즘을 처음 제안했던 논문의 저자(Bahdanau)는 다음과 같이 '학습 가능한' 스코어 함수를 사용했다. 아래 식에서 $V$, $W\_1$, $W\_2$는 각각 학습 가능한 가중치 행렬이다. 이런 스코어 함수를 쓰는 어텐션을 Bahdanau 어텐션이라 한다.

$$f(s,\,h) = V^T \tanh (W_1 s + W_2 h) $$

이외에도 다양한 종류의 스코어 함수를 생각할 수 있다. 다음은 유명한 몇몇 스코어 함수들을 정리한 표이다.

|                    이름                     |                                 식                                 |                                      출처                                       |
| :-----------------------------------------: | :----------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
|           content-based attention           | $f(s,\,h) = \displaystyle \frac{s^T h}{\|\|s\|\| \cdot \|\|h\|\|}$ |                 [Graves, 2014](https://arxiv.org/abs/1410.5401)                 |
| additive attention<br/>(Bahdanau attention) |             $f(s,\,h) = V^T \tanh (W_1 s + W_2 h)$[^5]             |                [Bahdanau, 2015](https://arxiv.org/abs/1409.0473)                |
| dot-product attention<br/>(Loung attention) |                         $f(s,\,h) = s^T h$                         |                 [Luong, 2015](https://arxiv.org/abs/1508.04025)                 |
|        scaled dot-product attention         |       $f(s,\,h) = \displaystyle \frac{s^T h}{\sqrt{n}}$[^6]        | [Vaswani, 2017](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf) |

[^5]: 단, $V$, $W\_1$, $W\_2$는 각각 학습 가능한 가중치 행렬
[^6]: 단, $n$은 $s$와 $h$의 차원

## Cross Attention vs. Self Attention

key, value로 같은 값을 사용하지만 query는 다른 값을 사용하는 어텐션 연산(즉, query ≠ key = value)을 **cross attention** 연산이라 한다. Seq2Seq + 어텐션 모델에서의 어텐션 연산, 또는 후술할 트랜스포머 모델의 디코더에서 사용하는 어텐션 연산은 cross attention 연산이다.

반면, query, key, value로 모두 같은 값을 사용하는 어텐션 연산(즉, query = key = value)을 **self attention** 연산이라 한다. 후술할 트랜스포머 모델의 인코더에서 사용하는 어텐션 연산은 self attention 연산이다.

# 트랜스포머 (Transformer)

{:.info}
[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)

트랜스포머 모델은 Seq2Seq 모델, 어텐션 이후 NLP 분야에서 나온 또 하나의 큰 도약이다. 트랜스포머 모델의 아이디어는 Seq2Seq + 어텐션 모델에서 RNN 구조를 제거하는 것이다. 즉 RNN을 사용하지 않고 오직 어텐션 연산(과 FC 연산)만 사용한 모델이 트랜스포머 모델이다.

## 왜 RNN을 제거했을까

시퀸스 형태의 데이터는 각 항목의 값 뿐만 아니라 그 순서도 중요하다. "John loves Sarah"와 "Sarah loves John"은 단어는 모두 같지만 순서가 달라 의미가 다르다. 즉 시퀸스 형태의 데이터를 다루기 위해서는 순서 정보를 처리할 수 있는 모델을 사용해야 한다.

RNN은 연속적으로 입력을 받아들이고 은닉 상태를 업데이트하기에 시퀸스 형태의 데이터를 처리하기에 적합했다. Seq2Seq와 같은 모델에서는 바로 이 이유로 RNN을 사용했다(그 당시엔 RNN을 제외하면 사실상 다른 대안이 없었다).

하지만 RNN은 단점이 많은 구조이다.

- 병렬화 문제 : RNN은 그 구조상 순차적으로 입력을 처리해야 하기에 병렬화가 불가능하다. 이 때문에 대규모의 데이터셋을 이용한 학습이 불가능하다(학습 시간이 너무 길어진다).
- long distance dependency 문제 : 시퀸스에서 멀리 떨어진 항목들 간의 관계성은 gradient vanishing/exploding 문제로 학습이 잘 되지 않는다.

이때 어텐션 연산은 위 두 가지 문제에 대한 해결책이 된다. 어텐션 연산은 병렬화가 가능하고, 각 query와 모든 key를 비교하기에 long distance dependency를 해결할 수 있다. 즉 이론적으로 어텐션 연산만을 사용한 모델은 RNN을 사용한 모델보다 학습이 빠르고, 그래서 더 큰 데이터셋에 대해서 학습시킬 수 있고, 더 좋은 성능을 낼 수 있다.[^7]

[^7]: 이미지 처리 분야에서 아주 성공적으로 사용되는 CNN 구조도 위 두 가지 문제에 대한 해결책이 될 수 있다. CNN은 병렬화가 잘 되고, long distance dependency 문제도 여러 층의 layer를 쌓아(+ residual connection을 추가해) 해결할 수 있기 때문이다. 그래서 실제로 NLP 분야에 CNN을 사용한 모델도 많이 등장했다. 하지만 트랜스포머 모델에 비해 성능이 떨어져 오늘날엔 잘 사용되지 않는다.

## 어떻게 RNN을 제거했나 : Positional Encoding

RNN 구조에서는 순서 정보가 자연스럽게 모델에 입력됐지만, 어텐션 연산에서는 순서 정보가 고려되지 않는다. 그래서 트랜스포머 모델에서는 모델에 입력되는 입력 임베딩(input embedding)에 **positional encoding**이라 불리는, 입력 임베딩과 같은 차원의, 위치 정보를 담고 있는 벡터를 더해준다.

{% include caption-img.html src="attention-transformer-positional-encoding.png" title="Fig.04 Positional Encoding" description="순서 정보를 입력해 주기 위해, 트랜스포머 모델에서는 모델에 입력되는 입력 임베딩에 positiona encoding을 더해준다." %}

입력 임베딩의 차원이 $d$라 할 때, $p$번째 단어(token)의 positional encoding은 다음 식을 이용해 계산된다(단 $i = 0,\,1,\,\cdots,\,(d - 1)$).

{:.mathjax-mb-0}
$$f(p) = \begin{cases}
\sin \left( \displaystyle\frac{p}{10000^{   i    / d  }} \right) & (i = 2k) \\[0.5em]
\cos \left( \displaystyle\frac{p}{10000^{(i - 1) / d  }} \right) & (i = 2k + 1) \\[0.5em]
\end{cases}$$

positional encoding 덕분에 같은 단어일 지라도 위치에 따라 다른 임베딩 벡터를 갖게 되어 위치 정보가 성공적으로 모델에 전달된다.

그런데 사실 위치 정보를 담고 있는 벡터를 만드는 방법에는 위 식을 이용하는 방법만 있는 것이 아니다. 이와 관련된 조금 더 자세한 정보는 [다음 문서](/ml-shorts/positional-encoding-vs-positional-embedding)를 참고하자.

## 트랜스포머 모델의 구조

{% include caption-img.html src="attention-transformer.png" title="Fig.05 Transformer" description="트랜스포머 모델은 Seq2Seq 모델과 마찬가지로 인코더-디코더 구조로 되어 있다." %}

트랜스포머 모델은 Seq2Seq 모델과 마찬가지로 입력 시퀸스를 받아들이는 인코더와 출력 시퀸스를 출력하는 디코더로 이루어져 있다.[^8]

[^8]: 인코더-디코더 구조는 Seq2Seq 모델의 특징적인 구조이기에, 원래 인코더-디코더 모델이라 하면 Seq2Seq 모델을 의미하는 것이었다. 하지만 트랜스포머 모델의 성공으로, 오늘날 인코더-디코더 모델이라 하면 트랜스포머 모델을 의미하는 경우가 많아졌다.

### 인코더

{% include caption-img.html src="attention-transformer-transformer-encoder.png" title="Fig.06 Transformer Encoder" description="트랜스포머 인코더는 인코더 레이어를 $N$개 쌓은 구조로 되어 있다." %}

트랜스포머 인코더는 인코더 레이어(encoder layer)를 $N = 6$개 쌓은 구조로 되어 있다. 첫 번째 인코더 레이어의 입력은 positional encoding이 더해진 입력 임베딩이고, 각 인코더 레이어의 출력은 다음 인코더 레이어의 입력으로 사용된다.

하나의 인코더 레이어 안에는 multi-head self attention 연산을 수행하는 서브 레이어(주황색 블록)와 position-wise fully connected feed forward 연산을 수행하는 서브 레이어(파란색 블록), 이렇게 두 개의 서브 레이어(sub-layer)가 있다(각 연산들에 대한 자세한 설명은 아래를 참조하자). 각 서브 레이어의 출력은 서브 레이어로의 입력과 더해진 후(residual connection) layer normalize되어(노란색 블록) 다음 서브 레이어의 입력으로 들어간다.

참고로 Seq2Seq 모델, Seq2Seq + 어텐션 모델, 트랜스포머 모델의 인코더를 비교해 보면 다음과 같다.

- 핵심 연산
  - Seq2Seq : RNN
  - Seq2Seq + Attention : RNN
  - Transformer : multi-head self attention
- 입력
  - Seq2Seq : 입력 시퀸스
  - Seq2Seq + Attention : 입력 시퀸스
  - Transformer : 입력 시퀸스 + positional encoding
- 출력의 의미
  - Seq2Seq : 마지막 시점에서의 은닉 상태
  - Seq2Seq + Attention : 매 시점에서의 은닉 상태
  - Transformer : 마지막 인코더 레이어의 출력
- 출력의 형태
  - Seq2Seq
    - (`seq_len`, `input_dim`) 크기의 입력을 받아, (`hidden_dim`) 크기의 출력을 내놓는다. (단, `seq_len`은 입력 시퀸스의 길이, `input_dim`은 입력 시퀸스의 임베딩 차원, `hidden_dim`은 RNN의 은닉 상태의 차원이다.)
    - batch 입력이라면, (`batch_len`, `seq_len`, `input_dim`) 크기의 입력을 받아, (`batch_len`, `hidden_dim`) 크기의 출력을 내놓는다. (단, `batch_len`은 batch의 크기이다.)
  - Seq2Seq + Attention
    - (`seq_len`, `input_dim`) 크기의 입력을 받아, (`seq_len`, `hidden_dim`) 크기의 출력을 내놓는다. (단, `seq_len`은 입력 시퀸스의 길이, `input_dim`은 입력 시퀸스의 임베딩 차원, `hidden_dim`은 RNN의 은닉 상태의 차원이다.)
    - batch 입력이라면, (`batch_len`, `seq_len`, `input_dim`) 크기의 입력을 받아, (`batch_len`, `seq_len`, `hidden_dim`) 크기의 출력을 내놓는다. (단, `batch_len`은 batch의 크기이다.)
  - Transformer
    - (`seq_len`, `input_dim`) 크기의 입력을 받아, (`seq_len`, `input_dim`) 크기의 출력을 내놓는다. (단, `seq_len`은 입력 시퀸스의 길이, `input_dim`은 입력 시퀸스의 임베딩 차원이다.)
    - batch 입력이라면, (`batch_len`, `seq_len`, `input_dim`) 크기의 입력을 받아, (`batch_len`, `seq_len`, `input_dim`) 크기의 출력을 내놓는다. (단, `batch_len`은 batch의 크기이다.)

### 디코더

{% include caption-img.html src="attention-transformer-transformer-decoder.png" title="Fig.07 Transformer Decoder" description="트랜스포머 디코더는 디코더 레이어를 $N$개 쌓은 구조로 되어 있다." %}

트랜스포머 디코더는 디코더 레이어(decoder layer)를 $N = 6$개 쌓은 구조로 되어 있다.[^8] 이전 디코더 레이어의 출력은 다음 디코더 레이어의 입력으로 사용된다.

[^8]: 보통 인코더와 디코더의 레이어 수는 같게 하는데, 필요에 따라 다르게 설정할 수 있다.

디코더 레이어는 masked multi-head self attention 서브 레이어(첫 번째 주황색 블록)와 multi-head cross attention 서브 레이어(두 번째 주황색 블록), 그리고 position-wise fully connected feed forward 서브 레이어(파란색 블록), 이렇게 세 개의 서브 레이어(sub-layer)로 구성된다. 각 서브 레이어의 출력은 residual connection으로 전달받은 입력을 더한 후 layer normalization을 거쳐(노란색 블록) 다음 서브 레이어의 입력으로 사용된다.

각 연산에 대해 조금 더 자세히 알아보자.

### Multi-head Attention 연산

multi-head 어텐션 연산은 어텐션 연산을 병렬적으로 여러 번 실행하기 위한 기법이다. 여기서 head란 어텐션 연산을 수행하는 주체를 말하는 것이고, 즉 multi-head라 하면 (동일한 시퀸스에 대해) 여러 번의 어텐션 연산을 수행하겠다는 것이다. 동일한 소스에 대해 $h$번의 어텐션 연산을 수행한다는 것은 어디에 얼마만큼 집중할 지 $h$가지 다른 '집중 방법'을 시도할 수 있다는 것이고, 조금 더 인간적인 말로 하면 $h$가지 다른 '관점'에서 시퀸스를 볼 수 있다는 것이다.

구체적으로, 시퀸스 길이가 $l$이고 입력 임베딩의 차원이 $d$일 때, $h$개의 head를 사용하는 multi-head 어텐션 연산은 다음 순서로 동작한다.

1. query $Q$, key $K$, value $V$가 입력된다.

   - 인코더 레이어, 디코더 레이어에서 사용하는 multi-head *self* attention의 경우 $Q$ = $K$ = $V$ = (이전 레이어의 출력)이다.
   - 디코더 레이어에서 사용하는 multi-head *cross* attention의 경우 $Q$ = (이전 레이어의 출력) ≠ $K$ = $V$ = (인코더의 출력)이다.
   - $Q$, $K$, $V$는 크기 ($l$, $d$) 행렬이다.

2. 각 head가 사용할 query, key, value 만들기

    모든 head가 동일한 query, key, value를 사용하면 여러 '관점'을 가진 multi-head 어텐션 연산이 되지 않는다. 따라서 $Q$, $K$, $V$에 가중치 행렬 $W^Q\_i$, $W^K\_i$, $W^V\_i$을 각각 곱해 $i$번째 head가 사용할 query, key, value $Q_i$, $K_i$, $V_i$를 만들어 준다($i = 1,\,2,\,\cdots,\,h$).

    {:.mathjax-mb-0}
    $$Q_i = Q W^Q_i$$

    {:.mathjax-m-0}
    $$K_i =  K W^K_i$$

    {:.mathjax-mt-0}
    $$V_i = V W^V_i$$

    - $W^Q\_i$, $W^K\_i$, $W^V\_i$는 각각 크기 ($d$, $d\_k$), ($d$, $d\_k$), ($d$, $d\_v$)인 행렬이고, 이렇게 구해진 $Q_i$, $K_i$, $V_i$는 각각 크기 ($l$, $d\_k$), ($l$, $d\_k$), ($l$, $d\_v$)인 행렬이 된다.
    - $d\_k$는 각 head에서 사용하는 query, key의 차원이고, $d\_v$는 각 head에서 사용하는 value의 차원이다.
        
        $$d_k = d_v = \frac{d}{h}$$

    - 실제 구현할 때는 $h$개의 행렬 $W^Q\_i$, $W^K\_i$, $W^V\_i$를 $h$번 각각 곱해 사용하기보단, 크기 ($d$, $d$)인 행렬 $W^Q$, $W^K$, $W^V$를 $Q$, $K$, $V$에 한 번에 곱한 후, 그 결과값(크기 ($l$, $d$)짜리 행렬)을 크기 ($l$, $d\_k$), ($l$, $d\_k$), ($l$, $d\_v$)로 잘라 사용한다.

3. 어텐션 계산
   
    각 head에서 $Q\_i$, $K\_i$, $V\_i$를 이용해 scaled dot product 어텐션 연산을 수행한다.

    $$\text{head}_i = \text{Attention}(Q_i,\,K_i,\,V_i) = \text{softmax}(\frac{Q_i K_i^T}{\sqrt{d_k}})V_i$$

    - 위 계산으로 얻어지는 어텐션 값(attention value)은 크기 ($l$, $d\_v$)인 행렬이 된다.
    - 실제 구현할 때는 각 head별로 따로따로 $h$번의 연산을 하는 것이 아니라 벡터 연산을 통해 한 번에 계산한다.

4. 각 head별 어텐션 값 합치기

    각 head별 어텐션 값들을 모두 이어붙인 후(concatenate), 가중치 행렬 $W^O$를 곱한다. 이렇게 얻은 값은 multi-head 어텐션의 최종 결과값이 된다.

    {:.mathjax-mb-0}
    $$\text{MultiHead}(Q,\,K,\,V) = \text{Concat}(\text{head}_1,\,...,\,\text{head}_h)W^O$$

    - $W^O$는 크기 ($hd\_v$, $d$) = ($d$, $d$)인 행렬이다.

참고로 트랜스포머 논문에서는 $d = 512$, $h = 8$, $d\_k = d\_v = 64$를 사용하였다

벡터 연산을 적극적으로 활용했기 때문에, multi-head 어텐션 연산의 비용은 그냥 어텐션 연산(single-head attention)의 비용과 비슷하다.

### Masked Attention 연산



디코더에서 사용하는 어텐션 연산은 *masked* multi-head self attention 연산이다. 이는 어텐션 연산을 할 때 미래의 단어를 참고하지 못하도록 미래의 단어를 가리고(mask) 학습하는 것을 의미한다.

masking을 구현하는 방법은 여러 가지가 있겠지만, 트랜스포머 모델에서는 mask 행렬을 이용하는 방식으로 구현한다. mask 행렬 $M$은 0과 $-\infty$로 이루어진 크기 ($l$, $l$) 행렬로, $M[i][j]$의 값은 다음과 같다(단, $l$은 입력된 시퀸스의 길이).

- $M[i][j] = -\infty$ : (key의) $j$번째 단어의 어텐션 값을 계산할 때 (query의) $i$번째 단어를 보면 안 되는 경우. 다시 말해, (query의) $i$번째 단어가 (key의) $j$번째 단어보다 미래에 위치하는 경우.
- $M[i][j] = 0$ : 나머지 경우

이 mask 행렬을 가지고 masked 어텐션을 계산하는 방법은 다음과 같다.

1. 어텐션 스코어 계산 : 주어진 query $Q$, key $K$, value $V$에 대해, scaled dot product 어텐션 스코어 $e$를 계산한다.

    $$e = \frac{QK^T}{\sqrt{d_k}}$$

    - $e$는 크기 ($l$, $l$)인 행렬이 된다($d\_k$ : query, key 벡터의 차원)
    - $e[i][j]$는 (query에서의) $i$번째 단어와 (key에서의) $j$번째 단어가 얼만큼 연관되어 있는지를 나타낸다.

2. (추가) 마스킹 : 어텐션 스코어에 마스크 행렬 $M$을 더해준다.

    $$e' = e + M$$

3. 어텐션 분포 계산 : 마스킹된 어텐션 스코어 행렬 $e'$에 softmax 연산을 수행해 어텐션 분포 $\alpha$를 구한다.

    $$\alpha = \textrm{softmax}(e')$$

    - $\alpha$는 크기 ($l$, $l$)인 행렬이 된다.
    - $M[i][j] = \infty$인 경우, softmax 연산에 의해 $\alpha[i][j]$는 0이 된다(즉 masking이 된 것이다).

4. 어텐션 값 계산 : 어텐션 분포 $\alpha$와 value 행렬 $V$를 곱해 어텐션 값 $a$를 구한다.

    $$a = \alpha V$$

    - $a$는 크기 ($l$, $d_v$)인 행렬이 된다($d\_v$ : value 벡터의 차원)

### Position-wise Fully Connected Feed-Forward 연산

트랜스포머 모델의 position-wise fully connected feed forward 연산은 linear 연산과 ReLU를 이용해 다음과 같이 구현되어 있다.

$$\textrm{FFN}(x) = \max(0,\,xW_1 + b_1)W_2 + b_2$$

- $W\_1$ : 크기 ($d$, $d\_{ff}$)인 가중치 행렬
- $W\_2$ : 크기 ($d\_{ff}$, $d$)인 가중치 행렬
- $b\_1$ : 크기 ($d\_{ff}$)인 bias 벡터
- $b\_2$ : 크기 ($d$)인 bias 벡터
- $d$ : 입력 임베딩의 차원. 트랜스포머 모델에서는 $d = 512$이다.
- $d\_{ff}$ : feed forward 연산의 hidden layer의 차원. 트랜스포머 모델에서는 $d\_{ff} = 2048$로 설정했다.

### Layer Normalization 연산

트랜스포머 인코더 레이어와 디코더 레이어에서는 각 서브 레이어(sub-layer)의 출력에 residual connection과 layer normalization을 적용한다. 이를 수식으로 나타내면 다음과 같다.

$$\textrm{output} = \textrm{LayerNorm}(x + \textrm{Sublayer}(x))$$

## 트랜스포머 모델의 동작

상술했듯이 트랜스포머 모델은 인코더와 디코더로 구성되어 있고, 다시 인코더는 인코더 레이어를 여러 개 쌓아, 디코더는 디코더 레이어를 여러 개 쌓아 구성된다.



트랜스포머 디코더 레이어에는 두 개의 어텐션 연산이 있다. 첫 번째 어텐션 연산은 디코더에 입력된 입력 임베딩들에 대해 적용하는 self attention 연산이고, 두 번째 연산은 첫 번째 어텐션 연산으로 얻어진 '개선된' 입력 임베딩들과 인코더의 출력값에 대해 적용하는 cross attention 연산이다.

