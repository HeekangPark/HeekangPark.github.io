---
title: "어텐션 메커니즘 (Attention Mechanism)"
date_created: "2022-01-25"
date_modified: "2022-11-09"
---

# Seq2Seq 모델

{:.info}
[[2014] Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)

어텐션 메커니즘은 Seq2Seq 모델을 개선하기 위해 제안된 메커니즘이다. 어텐션 메커니즘을 잘 이해하려면 Seq2Seq 모델을 이해해야 한다.

## Seq2Seq 모델의 동작 방법

Seq2Seq 모델은 번역 task를 위해 고안된 RNN 기반 모델이다. Seq2Seq 모델은 '원문을 받아들이는 부분'과 '번역문을 출력하는 부분'을 분리한 것이 특징이다.

{% include caption-img.html src="attention-seq2seq.png" title="Fig.01 Seq2Seq 모델" description="영어 문장 \"I am a student.\"을 프랑스어 \"Je suis étudiant.\"으로 번역하는 Seq2Seq 모델이다. 왼쪽 주황색 사각형이 인코더(encoder)를, 오른쪽 녹색 사각형이 디코더(decoder)를 나타내고 있다. 인코더는 입력 문장(\"I am a student.\")을 입력받아 컨텍스트 벡터(context vector)를 출력하고, 디코더는 컨텍스트 벡터(와 <code class=\"language-plaintext highlighter-rouge\">&lt;sos&gt;</code> 토큰)를 입력으로 받아 출력 문장(\"Je suis étudiant.\")을 출력한다." %}

위 그림은 Seq2Seq의 동작을 도식화한 그림이다. 위 그림에서 왼쪽 주황색 사각형 RNN 모듈을 인코더(encoder)라 한다. 인코더는 원문을 받아들여 컨텍스트 벡터(context vector)라 불리는, 고정된 크기의 벡터로 변환한다. 그리고 오른쪽 녹색 사각형 RNN 모듈을 디코더(decoder)라 한다. 디코더는 인코더가 생성한 컨텍스트 벡터를 받아 번역문을 출력한다.

조금 더 자세히 살펴보자. Seq2Seq 모델이 동작하는 순서는 다음과 같다. 우선 인코더의 은닉 상태를 적절한 값(ex. 영벡터)으로 초기화한다. 그리고 매 시점(time step)마다 원문의 각 단어(token)가 입력되면(정확히는, 단어의 임베딩이 입력되면), 인코더는 이를 이용해 은닉 상태를 업데이트한다. 원문의 끝까지 이 과정을 반복하면 인코더의 은닉 상태는 원문의 정보를 압축 요약한 정보를 담고 있게 된다. 이 마지막 시점에서의 인코더 은닉 상태를 컨텍스트 벡터라 하고, 이를 디코더로 넘긴다.

컨텍스트 벡터로 디코더의 은닉 상태를 초기화한다. 최초 시점에 디코더에 문장 출력 시작을 위한 `<sos>` 토큰(start of sequence)을 입력하면, 디코더는 이 입력과 자신의 현재 은닉 상태로부터 (은닉 상태를 업데이트하고) 첫 번째 단어를 출력한다. 그리고 매 시점마다 자신이 바로 직전 시점에 출력했던 단어를 다시 디코더의 입력으로 넣으면, 디코더는 입력과 자신의 현재 은닉 상태로부터 (은닉 상태를 업데이트하고) 그 다음에 나와야 하는 단어를 출력하는 것을 반복하게 된다. 이 과정을 문장 출력 종료를 나타내는 `<eos>` 토큰(end of sequence)이 나올 때까지 수행한다.

<blockquote markdown="block">

{:.title}
참고 : Seq2Seq 모델의 학습 방법 - 교사 강요(teacher forcing)

위 설명은 Seq2Seq 모델을 사용(inference)할 때의 방법이다. Seq2Seq 모델을 학습(training)시킬 때는 조금 다른 방법을 써야 한다. 위처럼 이전 시점의 디코더 출력 단어를 다시 디코더 입력값으로 사용하는 방식으로는 디코더가 잘 학습되지 않는다. Seq2Seq 모델 학습 시에는 디코더의 입력값으로 이전 시점의 디코더 출력 단어가 아닌 실제 정답 단어를 입력해야 한다. 이 방식을 교사 강요(teacher forcing)라 한다.

{% include caption-img.html src="attention-seq2seq-teacher-forcing.png" title="Fig.02 Seq2Seq - Teacher Forcing" description="Seq2Seq 모델의 학습은 교사 강요(teacher forcing) 방식으로 진행해야 한다. 즉 \"&lt;sos&gt;je suis étudiant\"가 입력되었을 때 \"je suis étudiant&lt;eos&gt;\"가 출력되어야 한다는 것을 디코더에게 직접 알려줘야 한다." %}

</blockquote> 

## Seq2Seq 모델의 한계

이렇게 만들어진 Seq2Seq 모델은 기계번역(machine translation), 챗봇(chatbot) 등 한 시퀸스(sequence)를 다른 시퀸스로 변환하는 task에서 높은 성능을 보였다. 하지만 Seq2Seq 모델은 커다란 한계가 있었다.

- 입력 시퀸스의 모든 정보를 하나의 고정된 크기의 벡터(컨텍스트 벡터)에 다 압축 요약하려 하다 보니 정보의 손실이 생길 수밖에 없다. 특히 시퀸스의 길이가 길다면 정보의 손실이 더 커진다.
- RNN 구조로 만들어진 모델이다 보니, 필연적으로 gradient vaninshing/exploding 현상이 발생한다.

# 어텐션 메커니즘 (Attention Mechanism)

{:.info}
[[2015] Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)

어텐션 메커니즘은 Seq2Seq 모델의 문제점을 개선하기 위해 제안되었다. 어텐션 메커니즘은 인코더가 마지막 은닉 상태(컨텍스트 벡터)가 입력 시퀸스의 모든 정보를 다 담아야 한다는 부담을 덜어 주기 위해[^1], 디코더에서 다음 단어 예측을 위해 인코더의 마지막 은닉 상태(컨텍스트 벡터)뿐만 아니라 **인코더의 매 시점 은닉 상태들을 모두 사용하자**는 것이다.

[^1]: "we relieve the encoder from the burden of having to encode all information in the source sentence into a fixedlength vector."

구체적으로, 어텐션 메커니즘은 다음을 가정한다.

> 디코더가 단어 $X$를 출력하기 직전의 디코더 은닉 상태는, 인코더가 입력 시퀸스에서 $X$와 연관이 깊은 단어를 읽은 직후의 인코더 은닉 상태와 유사할 것이다.

예를 들어 Fig.01에서처럼 영어 문장 "I am a student."을 프랑스어 문장 "Je suis étudiant."로 번역하는 상황을 생각해 보자. 출력 시퀸스의 단어 "étudiant"(프랑스어로 학생을 뜻하는 단어)는 입력 시퀸스의 단어 "i", "am", "a", "student" 중 "student"(영어로 학생을 뜻하는 단어)와 연관이 깊다. 이때 어텐션 메커니즘은 디코더가 "étudiant"를 출력하기 직전의 은닉 상태는 인코더가 "student"를 입력받은 직후의 은닉 상태와 유사할 것이라 가정한다. 따라서 인코더가 "student"를 입력받은 직후의 은닉 상태에 조금 더 '집중'하면, 훨씬 더 품질 높은 번역을 만들 수 있을 것이다.

이 가정에 따라, Seq2Seq + attention 모델에서의 디코더는 다음과 같은 순서로 다음 단어를 예측하게 된다.

1. 어느 시점의 인코더 은닉 상태에 조금 더 '집중'해야 하는지 찾기 위해, 현재 디코더의 은닉 상태와 매 시점 인코더의 은닉 상태들 간 '유사도'를 계산한다.
2. 이 유사도를 확률의 형태로 바꾸고, 그 값에 따라 인코더 은닉 상태들의 가중합(weighted sum)을 구해 '보정된 컨텍스트 벡터'를 구한다.
3. '보정된 컨텍스트 벡터'을 이용해 다음 단어를 예측한다.

이렇게 하면 Seq2Seq 모델의 두 가지 문제점이 모두 해결된다. 인코더의 마지막 은닉 상태 뿐만 아니라 인코더의 매 시점 은닉 상태들이 모두 디코더로 넘어가므로, 시퀸스의 길이가 길어지더라도 손실되는 정보가 거의 없다. 또 초기 시점의 인코더 은닉 상태와 나중의 인코더 은닉 상태가 동등하게 확률의 형태로 전달되므로, gradient vanishing/exploding 현상을 줄일 수 있다.

## Seq2Seq + attention 모델의 동작 방법

Seq2Seq + attention 모델의 동작 과정을 조금 더 자세히 알아보자.

- $N$ : 입력 시퀸스의 단어(token) 수. 즉, 인코더의 총 은닉 상태의 개수.
- $h\_p$ : 시점 $p$에서의 인코더의 은닉 상태 ($p = 1,\,2,\,\cdots,\,N$)
- $s\_q$ : 시점 $q$에서의 디코더의 은닉 상태
- $x\_r$ : 시점 $r$에서의 디코더의 입력 단어 임베딩. Seq2Seq 모델에서 디코더의 입력은 이전 시점의 디코더 출력이므로, 이 값은 동시에 시점 $r - 1$에서의 디코더의 출력 단어이기도 하다.

라 할 때, 시점 $t$에서의 디코더 출력 단어 $x\_{t + 1}$는 다음과 같이 예측할 수 있다.

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
    - 즉 어텐션 값을 참조하면 유사도가 더 높은 인코더 은닉 상태에(= 가정에 의해, 더 관련있는 단어에) '집중'할 수 있다.

    {:.mathjax-mb-0}
    $$a = \sum_{k=1}^{N} \alpha_{k} h_k$$
 
    {:.text-align-center}
    (단, $\alpha\_k$는 어텐션 분포 $\boldsymbol{\alpha}$의 $k$번째 값을 의미한다.)

4. 어텐션 값과 디코더 입력 $x\_{t}$을 합쳐(concatenate) $v\_{t-1}$를 만들고, 이를 RNN 셀의 입력으로 하여 새로운 디코더 은닉 상태 $s\_t$를 만든다. 그리고 (기존 Seq2Seq 모델에서의 방법과 동일하게) 디코더 은닉 상태 $s\_t$로부터 시점 $t$에서의 단어를 예측한다.

    $$v_{t-1} = [a;x_{t}]$$

## 일반화 : Attention(query, key, value)

어텐션 메커니즘의 동작 과정은 query, key, value라는 이름으로 일반화할 수 있다.

1. 유사도(similarity) 계산 : 스코어 함수를 이용, query와 각 key들 간의 어텐션 스코어를 계산한다.
2. 정규화(normalization) : softmax 함수를 이용, query와 각 key들간의 어텐션 스코어들을 어텐션 분포로 변환한다.
3. 가중합(weighted sum) 계산 : 어텐션 분포를 이용해 각 value들의 가중합(어텐션 값)을 구한다.

즉 어텐션 연산은 query에 대해 value들을 '요약'하는 것이다. 다르게 말하면, 어텐션 연산은 어떤 value에 '집중'할지 결정하는 것이다. 어텐션 연산이 수행되면, 중요한(= query와 유사도가 높은 key를 가진) value에 더 '집중'하게 된다.

{% include caption-img.html src="attention-qkv.png" title="Fig.03 Attention" description="어텐션 연산은 query(주황색)와 key들(녹색) 사이의 유사도(노란색)에 따라, key와 짝지어져 있는 value들(파란색)의 가중합을 구하는 연산이라 이해할 수 있다. 이때 query와 key들 간의 유사도는 스코어 함수를 이용해 계산한다." %}

Seq2Seq + attention 모델에서는 query로 디코더의 은닉 상태($s\_{t-1}$)를 사용하고, key와 value는 인코더의 모든 은닉 상태($h\_{k}$)를 사용한 것이다(즉 Seq2Seq + attention 모델에서 key와 value는 같다).

### query, key, value 이름에 대해

처음 어텐션 메커니즘을 배우면 제일 헷갈리는 것이 바로 이 이름이다. 왜 query, key, value라는 이름을 썼을까? Seq2Seq + attention 모델에서 key와 value는 같은 값이라고 하고, 나중에 나올 self-attention 모델에서는 query, key, value가 모두 같은 값이라는데, 왜 다른 이름이 붙어 있는 걸까?

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

어텐션 메커니즘을 처음 제안했던 논문의 저자(Bahdanau)는 다음과 같이 '학습 가능한' 스코어 함수를 사용했다. 아래 식에서 $V$, $W\_1$, $W\_2$는 각각 학습 가능한 가중치 행렬이다. 이런 스코어 함수를 쓰는 어텐션을 Bahdanau Attention이라 한다.

$$f(s,\,h) = V^T \tanh (W_1 s + W_2 h) $$

이외에도 다양한 종류의 스코어 함수를 생각할 수 있다. 다음은 유명한 몇몇 스코어 함수들을 정리한 표이다.

| 이름 | 식 | 출처 |
|:-: | :-: | :-: |
| content-based attention | $f(s,\,h) = \displaystyle \frac{s^T h}{\|\|s\|\| \cdot \|\|h\|\|}$ | [Graves, 2014](https://arxiv.org/abs/1410.5401) |
| additive attention<br/>(Bahdanau attention) | $f(s,\,h) = V^T \tanh (W_1 s + W_2 h)$[^2] | [Bahdanau, 2015](https://arxiv.org/abs/1409.0473) |
| dot-product attention<br/>(Loung attention) | $f(s,\,h) = s^T h$ | [Luong, 2015](https://arxiv.org/abs/1508.04025) |
| scaled dot-product attention | $f(s,\,h) = \displaystyle \frac{s^T h}{\sqrt{n}}$[^3] | [Vaswani, 2017](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf) |

[^2]: 단, $V$, $W\_1$, $W\_2$는 각각 학습 가능한 가중치 행렬
[^3]: 단, $n$은 $s$와 $h$의 차원

{% comment %}
# 트랜스포머 (Transformer)

{:.info}
[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)￦

트랜스포머 모델은 Seq2Seq 모델, 어텐션 이후 NLP 분야에서 나온 또 하나의 큰 도약이다. 트랜스포머 모델의 기본 아이디어는 Seq2Seq 모델에서처럼 RNN 구조를 사용하지 않고, 오직 어텐션(과 FC 연산)만 사용하자는 것이다.

self attention : q = k = v
cross atteition : q, k, v 다름



1. 크기 `(batch_size, sequence_length, hidden_size)`의 `hidden_states` $X$를 입력으로 받는다.

   - `bert-base-uncased`의 경우, `hidden_size`의 값은 768이므로 $X$의 크기는 `(batch_size, sequence_length, 768)`이다.

2. $X$를 attention head 개수(`num_attention_heads`)만큼 잘라 크기 `(batch_size, sequence_length, hidden_size / num_attention_heads)`의 $X\_i$를 만든다.

   - `bert-base-uncased`의 경우, `num_attention_heads`의 값은 12이므로 $X\_i$의 크기는 `(batch_size, sequence_length, 64)`이다. ($i = 1,\,2,\,\cdots,\,12$)

3. $X\_i$로부터 query $Q\_i$, key $K\_i$, value $V\_i$를 구한다.
   
    {:.mathjax-m-0}
    $$Q_i = X_i W^Q_i$$
    
    {:.mathjax-m-0}
    $$K_i = X_i W^K_i$$
    
    {:.mathjax-mt-0}
    $$V_i = X_i W^V_i$$
    
   - 단, $W^Q\_i$, $W^K\_i$, $W^V\_i$는 크기 `(hidden_size / num_attention_heads, hidden_size / num_attention_heads)`의 가중치 행렬
   - `bert-base-uncased`의 경우, $W^Q\_i$, $W^K\_i$, $W^V\_i$의 크기는 `(64, 64)`이고, $Q\_i$, $K\_i$, $V\_i$의 크기는 `(batch_size, sequence_length, 64)`이다.

4. $Q$와 $K$ 간에 attention score $a\_i$를 계산한다(scaled dot product attention score).
   
    $$a_i = \frac{Q_i K_i^T}{\sqrt{d_k}}$$

    - 단, $d\_k$는 `hidden_size / num_attention_heads`이다.
    - `bert-base-uncased`의 경우, $d\_k$는 64이다.

5. (optional)attention mask가 입력되었다면, masking 처리를 한다.

    - attention mask가 0인 곳의 attention score를 아주 작은 값(`-1e9`)으로 만든다.

6. softmax 연산을 수행해 확률 형태의 attention distribution을 구한다.

    - masking된 곳의 attention score는 매우 작은 값이므로, attention distribution에서 거의 0에 가까운 값이 된다.

7. attention distribution과 $V$로부터 attention value $\alpha$를 계산한다.

{% endcomment %}
