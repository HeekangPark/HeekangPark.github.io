---
title: "어텐션 메커니즘 (Attention Mechanism)"
date_created: "2022-01-25"
date_modified: "2022-01-28"
---

# Seq2Seq 모델

{:.info}
[[2014] Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)

어텐션 메커니즘은 Seq2Seq 모델을 개선하기 위해 제안된 메커니즘이다. 따라서 어텐션 메커니즘을 잘 이해하려면 Seq2Seq 모델을 이해해야 한다.

Seq2Seq 모델은 입력 문장(sequence)을 입력받는 RNN 모듈과 출력 문장(sequence)을 출력하는 RNN 모듈, 이렇게 명시적으로 역할이 구분된 두 개의 RNN 모듈로 구성된 모델이다. 이때 입력 문장(sequence)을 받아들이는 RNN 모듈을 인코더(encoder)라, 출력 문장(sequence)을 출력하는 RNN 모듈을 디코더(decoder)라 한다.

{% include caption-img.html src="seq2seq.png" title="Fig.01 Seq2Seq 모델" description="영어 문장 \"I am a student.\"을 프랑스어 \"Je suis étudiant.\"으로 번역하는 Seq2Seq 모델이다. 왼쪽 주황색 사각형이 인코더(encoder)를, 오른쪽 녹색 사각형이 디코더(decoder)를 나타내고 있다. 인코더는 입력 문장(\"I am a student.\")을 입력받아 컨텍스트 벡터(context vector)를 출력하고, 디코더는 컨텍스트 벡터(와 <code class=\"language-plaintext highlighter-rouge\">&lt;sos&gt;</code> 토큰)를 입력으로 받아 출력 문장(\"Je suis étudiant.\")을 출력한다." %}

## Seq2Seq 모델의 동작 방법

인코더는 입력 문장(sequence)을 입력받아, 이를 압축 요약한 컨텍스트 벡터(context vector)라는 것을 출력한다.

구체적으로, 인코더는 각 시점(time step)마다 이전 은닉 상태(hidden state)[^2]와 입력 문장(sequence)의 단어(token)를 입력받아 은닉 상태를 업데이트한다. 이 과정을 입력 문장(sequence)의 끝에 도달할 때까지 하면, 인코더의 은닉 상태는 입력 문장(sequence)을 압축 요약한 정보를 담고 있게 된다. 이 마지막 시점에서의 은닉 상태를 컨텍스트 벡터라 하고, 이는 디코더로 넘어간다.

[^2]: 최초 시점($t = 0$)에는 이전 은닉 상태가 없으므로 적절한 초기값을 사용한다(일반적으로 영벡터를 많이 사용한다).

디코더는 인코더로부터 컨텍스트 벡터를 입력받아, 출력 문장(sequence)을 출력한다.

구체적으로, 전달받은 컨텍스트 벡터는 우선 디코더의 초기 은닉 상태가 된다. 그리고 디코더에 `<sos>` 토큰[^3]이라 불리는, 문장(sequence)이 시작한다는 것을 알려주는 특수한 단어(token)를 입력한다. 그럼 디코더는 현재의 은닉 상태와 입력값 `<sos>` 토큰을 보고, 은닉 상태를 업데이트하고, `<sos>` 뒤에 올 확률이 가장 높은 단어(token), 즉 첫 번째 단어를 출력한다. 이것이 최초 시점($t = 0$)에 일어나는 일이다. 이후 디코더는 이전 은닉 상태와 이전 출력 단어(token)을 입력받아, 은닉 상태를 업데이트하고, 이전 출력 단어(token) 뒤에 올 확률이 가장 높은, 다음 단어를 출력하는 과정을 반복한다. 그러다 문장의 끝을 알리는 `<eos>` 토큰[^4]이 출력되면, 반복을 종료한다.

[^3]: Start of Sentence
[^4]: End of Sentence

<blockquote markdown="block">

{:.title}
Seq2Seq 모델의 학습 : 교사 강요(teacher forcing)

위 내용은 Seq2Seq 모델을 사용(inference)할 때의 방법을 설명한 것이다. Seq2Seq 모델을 학습(training)시킬 때는 조금 다른 방법을 써야 한다. 위처럼 디코더의 RNN 셀의 입력값으로 이전 단어(token)만 주고 학습시키려 하면 학습이 잘 되지 않는다. Seq2Seq 모델을 학습시킬 땐 디코더의 입력값으로 정답 단어(token)를 실제로 주어야 학습이 잘 된다. 이 방식을 교사 강요(teacher forcing)라 한다.

{% include caption-img.html src="seq2seq-teacher-forcing.png" title="Fig.02 Seq2Seq - Teacher Forcing" description="Seq2Seq 모델을 학습시킬 땐 교사 강요(teacher forcing)라는 방식을 사용해야 한다." %}

</blockquote> 

## Seq2Seq 모델의 한계

이렇게 만들어진 Seq2Seq 모델은 기계번역(machine translation) 등의 분야에서 높은 성능을 보였다. 하지만 Seq2Seq 모델은 커다란 한계가 있었다.

- 하나의 고정된 크기의 벡터(컨텍스트 벡터)에 입력 문장(sequence)의 모든 정보를 다 압축 요약하려 하다 보니 정보의 손실이 생길 수밖에 없다. 특히 문장의 길이가 길다면 정보의 손실이 더 커진다.
- RNN 구조로 만들어진 모델이다 보니, 필연적으로 gradient vaninshing 현상이 발생한다.

# 어텐션 메커니즘 (Attention Mechanism)

{:.info}
[[2015] Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)

어텐션 메커니즘은 Seq2Seq 모델의 문제점을 개선하기 위해 제안되었다. 어텐션 메커니즘의 아이디어는, **인코더의 마지막 은닉 상태(컨텍스트 벡터)뿐만 아니라, 인코더의 매 시점 은닉 상태들을 모두 사용하자**는 것이다. 구체적으로 디코더가 다음 단어(token)을 예측할 때 이전 은닉 상태, 이전 출력 단어(token)와 더불어 인코더의 매 시점 은닉 상태들의 가중합(weighted sum)인 **어텐션 값(attention value)**도 사용하자는 것이다.

일단 이렇게 하면 Seq2Seq 모델의 두 가지 문제점은 모두 해결된다. 이제 입력 문장(sequence)의 정보는 컨텍스트 벡터 뿐만 아니라 인코더의 매 시점의 은닉 상태들의 가중합인 어텐션 값을 통해서도 디코더로 전달될 수 있다.[^5] 또 초기 시점의 인코더 은닉 상태와 나중의 인코더 은닉 상태가 동등하게 전달되므로 gradient vanishing 현상을 줄일 수 있다.

[^5]: 참고로 Seq2Seq + Attention 모델에서는 (인코더의 마지막 은닉 상태가 아닌) 어텐션 값을 컨텍스트 벡터(context vector)라 부른다.

## 어텐션 값 계산하기

그렇다면 어텐션 값은 어떻게 구할까? 어텐션 값의 계산은 다음 가정에 근거한다.

> 디코더가 단어(token) $X$를 출력하기 직전의 디코더 은닉 상태는, 인코더가 입력 문장(sequence)에서 $X$와 연관이 깊은 단어(token)를 읽은 직후의 인코더 은닉 상태와 유사할 것이다.

예를 들어 Fig.01에서처럼 영어 문장 "I am a student."을 프랑스어 문장 "Je suis étudiant."로 번역하는 상황을 생각해 보자. 출력 문장(sequence)의 단어(token) `étudiant`[^6]는 입력 문장(sequence)의 단어(token) `i`, `am`, `a`, `student` 중 `student`[^7]와 연관이 깊다. 그러므로 디코더가 `étudiant`를 출력하기 직전의 은닉 상태는 인코더가 `student`를 입력받은 직후의 은닉 상태와 유사할 것이라는 것이다.

[^6]: 프랑스어로 학생을 의미하는 단어이다.
[^7]: 영어로 학생을 의미하는 단어이다.

이 가정에 따라, 디코더가 단어(token) $X$를 출력할 때 사용하는 어텐션 값은, 디코더의 은닉 상태와 가장 '유사한' 인코더 은닉 상태들에 가중치를 주어 가중합을 구하는 방법으로 계산한다. 말하자면, 인코더 은닉 상태들 중 $X$와 연관이 깊은 단어(token)들을 읽은 직후의 은닉 상태들에 디코더가 좀 더 *집중*하도록 어텐션 값을 설계하는 것이다.

구체적으로, 다음과 같이 한다.

> - $N$ : 입력 문장(sequence)의 단어(token) 수. 즉, 인코더의 총 은닉 상태의 개수.
> - $h\_p$ : 시점 $p$에서의 인코더의 은닉 상태 ($p = 1,\,2,\,\cdots,\,N$)
> - $s\_q$ : 시점 $q$에서의 디코더의 은닉 상태
> 
> 라 할 때, 시점 $t$에서의 어텐션 값 $a$는 다음과 같이 계산한다.
> 
> 1. 어텐션 스코어(attention score)를 계산한다.
> 
>    어텐션 스코어란 **스코어 함수(score function)**라 불리는, 스칼라를 반환하는 함수 $f$를 이용해, 디코더의 이전 은닉 상태 $s\_{t-1}$과, 특정 인코더 은닉 상태 $h\_k$ 간의 '유사도'를 계산한 것이다.
> 
>    $$e_{k} = f(s_{t-1}, h_k)$$
> 
>    디코더의 이전 은닉 상태 $s\_{t-1}$[^10]과 모든 인코더 은닉 상태들 $h\_1$, $h\_2$, ..., $h\_N$[^11] 간의 어텐션 스코어들을 모두 구한다.
>    
>    $$\mathbf{e} = \left[\, e_{1},\,e_{2},\,\cdots,\,e_{N}\,\right] = \left[\,f(s_{t-1}, h_1),\,f(s_{t-1}, h_2),\,\cdots,\,f(s_{t-1}, h_N)\,\right]$$
> 
> 2. 어텐션 분포(attention distribution)를 구한다.
> 
>    $\mathbf{e}$에 소프트맥스(softmax) 함수를 씌워 '유사도'를 퍼센트로 바꾼 어텐션 분포 $\boldsymbol{\alpha}$를 구한다.
> 
>    $$\boldsymbol{\alpha} = \textrm{softmax}(\mathbf{e} )$$
> 
> 3. 어텐션 값(attention value)를 계산한다.
> 
>    위에서 계산한 어텐션 분포 $\boldsymbol{\alpha}$를 가중치 삼아 모든 인코더 은닉 상태들[^12]과 각각 곱한 후 모두 더해 가중합을 구한다. 이렇게 구한 값 $a$를 어텐션 값이라 한다.
>    
>    {:.mathjax-mb-0}
>    $$a = \sum_{k=1}^{N} \alpha_{k} h_k$$
> 
>    {:.text-align-center}
>    (단, $\alpha\_k$는 어텐션 분포 $\boldsymbol{\alpha}$의 $k$번째 값을 의미한다.)
> 
>    디코더의 이전 은닉 상태 $s\_{t-1}$과 유사도가 높은 인코더 은닉 상태 $h\_p$는 큰 어텐션 스코어를 가질 것이고, 따라서 어텐션 값에 더 많이 포함된다. 반대로 유사도가 낮은 인코더 은닉 상태는 어텐션 값에 적게 포함된다. 

[^10]: 이를 query라 부른다.
[^11]: 이를 key라 부른다.
[^12]: 이를 value라 부른다.

### 어텐션 값 사용하기

이렇게 계산된 어텐션 값 $a$는 디코더의 이전 은닉 상태 $s\_{t-1}$와 합쳐져(concatenate) $v\_{t-1}$이 된다.

$$v_{t-1} = [a;s_{t-1}]$$

사실 여기서 다음 단어(token) 예측에 $v\_{t-1}$을 바로 이용해도 되지만, 어텐션을 처음 제안했던 논문에서는 여기에 fully-connected 레이어 하나를 더 추가해 $\tilde{s}\_{t-1}$을 만든다.

{:.mathjax-mb-0}
$$\tilde{s}_{t-1} = \tanh(W v_{t-1} + b_c)$$

{:.text-align-center}
(단, $W$와 $b\_c$는 각각 학습 가능한 가중치(weight), 편향(bias))

그리고 이 $\tilde{s}\_{t-1}$을 디코더의 이전 은닉 상태로 삼아, 다음 단어(token)를 예측하게 된다.

### 스코어 함수

query와 key 사이의 유사도를 구하는 스코어 함수 $f$로는 다양한 함수가 사용될 수 있다. 가장 간단한 형태는 내적(dot product) 함수가 있다.[^14] 이렇게 내적 함수를 사용하는 어텐션을 dot-product 어텐션이라 한다.[^15]

$$f(s_{t-1}, h_k) = s_{t-1}^T h_k $$

[^14]: query와 key가 같으면 내적 함수는 최대값이 되고, 반대 방향으로 가면 최솟값이 된다.
[^15]: 제안한 사람의 이름을 따 Luong 어텐션이라 하기도 한다.

어텐션 메커니즘을 처음 제안했던 논문의 저자(Bahdanau)는 다음과 같은 스코어 함수를 사용했다.[^16] 이런 스코어 함수를 쓰는 어텐션을 Bahdanau Attention이라 한다.

$$f(s_{t-1}, h_k) = V^T \tanh (W_1 s_{t-1} + W_2 h_k) $$

[^16]: 단, $V$, $W\_1$, $W\_2$는 학습 가능한 가중치 행렬

이외에도 다양한 종류의 어텐션 함수를 생각할 수 있다.

## Attention(query, key, value)

위에서 설명한 어텐션 연산은 query, key, value라는 개념을 사용해 일반화할 수 있다. 어텐션 연산은 한 마디로 **query와 key들 사이의 유사도에 따라, key와 짝지어져 있는 value들의 가중합을 구하는 연산**이라 이해할 수 있다. 이때 query와 key들간의 유사도는 스코어 함수를 이용해 계산한다. 즉 어텐션 연산은 query를 고려하여 value들을 '요약'하는 것이다.[^20]

[^20]: 용어들이 헷갈릴 수 있는데, 우선 key와 value는 파이썬 dictionary 등에서 말하는 key-value 쌍 할 때의 그 key와 value이다. key와 value가 서로 짝지어져 있다는 것을 표현하기 위해 이런 단어를 쓴 것이다. 그리고 query는 전체 key-value 쌍들에 대해 유사한지 안한지 질의를 하는 개념이므로 이런 이름이 붙은 것이다.

{% include caption-img.html src="attention-qkv.png" title="Fig.03 Attention" description="어텐션 연산은 query(주황색)와 key들(녹색) 사이의 유사도(노란색)에 따라, key와 짝지어져 있는 value들(파란색)의 가중합을 구하는 연산이라 이해할 수 있다. 이때 query와 key들 간의 유사도는 스코어 함수를 이용해 계산한다." %}

(위에서 설명한) Seq2Seq 모델에 어텐션을 사용하는 경우, query는 현재 디코더의 은닉 상태($s\_{t-1}$)에 해당되고, key와 value는 매 시점마다의 인코더 은닉 상태($h\_k$) 각각에 해당된다. 즉 key와 value가 같은 상황인 것이다.

{% comment %}
# 트랜스포머 (Transformer)

{:.info}
[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)

트랜스포머 모델은 Seq2Seq 모델, 어텐션 이후 나온 또 하나의 큰 도약이다. 트랜스포머 모델의 기본 아이디어는 Seq2Seq에서처럼 RNN 구조를 사용하지 않고, 오직 어텐션(과 FC 연산)
{% endcomment %}
