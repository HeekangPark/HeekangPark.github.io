---
title: "Seq2Seq 모델"
order: 2
date_created: "2024-05-16"
date_modified: "2024-05-16"
tags: ["seq2seq"]
---

# Seq2Seq 모델

::: info 참고

[[2014] Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)

:::

어텐션 메커니즘은 본래 Seq2Seq 모델을 개선하기 위해 제안된 메커니즘이다. 어텐션 메커니즘을 잘 이해하려면 Seq2Seq 모델을 이해해야 한다.

Seq2Seq 모델은 번역, 요약과 같이 시퀸스(sequence)[^1]를 입력받아 시퀸스를 출력하는 task를 위해 고안된 RNN 기반 모델이다.[^2]

[^1]: 시퀸스(sequence)는 순서가 있는 항목들의 모음을 의미한다(ordered collection of items). 예를 들어 단어(word), 문장(sentence)은 시퀸스이다. 단어를 구성하는 글자(character)들의 순서가 바뀌면 그 의미가 바뀌고, 문장을 구성하는 단어들의 순서가 바뀌면 그 의미가 바뀌기 때문이다.
[^2]: 번역 : 원문을 받아들여 번역문을 출력. 요약 : 원문을 받아들여 요약문을 출력.

<v-image src="seq2seq.png" title="Fig.01 Seq2Seq 모델" description="영어 문장 &quot;I am a student.&quot;을 프랑스어 &quot;Je suis étudiant.&quot;으로 번역하는 Seq2Seq 모델이다. 왼쪽 주황색 사각형이 인코더(encoder)를, 오른쪽 녹색 사각형이 디코더(decoder)를 나타내고 있다. 인코더는 입력 문장(&quot;I am a student.&quot;)을 입력받아 컨텍스트 벡터(context vector)를 출력하고, 디코더는 컨텍스트 벡터(와 <code>&lt;sos&gt;</code> 토큰)를 입력으로 받아 출력 문장(&quot;Je suis étudiant.&quot;)을 출력한다." />

Seq2Seq 모델은 '시퀸스를 받아들이는 부분'과 '시퀸스를 출력하는 부분'을 분리한 것이 특징이다. 이때 시퀸스를 받아들이는 부분(왼쪽 주황색 RNN 모듈)을 **인코더(encoder)**, 시퀸스를 출력하는 부분(오른쪽 녹색 RNN 모듈)을 **디코더(decoder)** 라 한다. 인코더는 입력 시퀸스(원문)를 받아들여 **컨텍스트 벡터(context vector)** 라 불리는, 고정된 크기의 벡터로 변환한다. 디코더는 인코더가 생성한 컨텍스트 벡터를 받아 출력 시퀸스(번역문)를 출력한다.[^3]

[^3]: Fig.01를 보면 인코더, 디코더에 각각 여러 개의 RNN 셀이 있는 것처럼 그려져 있으나, 이는 여러 시점(time step)을 한 그림에 나타내기 위함일 뿐이지, 인코더와 디코너는 각각 하나의 RNN 셀로 이루어져 있다(단, RNN 셀을 세로 방향으로 여러 층 '깊게' 쌓는 경우는 있다). 또한 Fig.01에서는 LSTM을 사용하는 것으로 그려져 있는데, 경우에 따라 LSTM이 아닌 vanilla RNN, GRU 등 다른 RNN 셀을 사용할 수도 있다(LSTM을 쓰는 게 제일 흔하긴 하다).

## Seq2Seq 모델의 동작 방법

Seq2Seq 모델이 동작(inference)하는 순서는 다음과 같다. 우선 인코더의 은닉 상태를 적절한 값(ex. 영벡터)으로 초기화한다. 그리고 매 시점(time step) 원문의 단어(token)가 입력되면(정확히는, 단어의 임베딩이 입력되면) 인코더는 이를 이용해 은닉 상태를 업데이트한다. 입력 시퀸스의 끝까지 이 과정을 반복하면 인코더의 최종 은닉 상태는 입력 시퀸스의 정보를 압축 요약한 정보를 담고 있게 된다. 이 마지막 시점에서의 인코더 은닉 상태를 컨텍스트 벡터라 하고, 이 값은 디코더로 넘어간다.

디코더는 전달받은 컨텍스트 벡터로 자신의 은닉 상태를 초기화한다. 그리고 매 시점 자신이 바로 직전 시점에 출력했던 단어를 입력으로 받아(점선 화살표), 자신의 은닉 상태를 업데이트하고, 이를 이용해 다음 단어를 예측한다(최초 시점에서는 시퀸스 시작을 의미하는 `<sos>` 토큰(start of sequence)을 입력으로 받는다). 이 과정을 정해진 반복 횟수 또는 시퀸스 끝을 나타내는 `<eos>` 토큰(end of sequence)이 나올 때까지 수행한다.

## Seq2Seq 모델의 학습 방법 - 교사 강요(teacher forcing)

Seq2Seq 모델을 사용(inference)할 땐 위에서 설명한 것처럼 이전 시점의 디코더 출력 단어를 다시 디코더 입력값으로 사용하는 방식을 사용하나, 이 방식으로 학습(training)을 시키면 디코더가 잘 학습되지 않는다. 모델 학습 시에는 디코더의 입력값으로 이전 시점의 디코더 출력 단어가 아닌 실제 정답 단어를 입력해 줘야 한다. 이 방식을 **교사 강요(teacher forcing)** 라 한다.

<v-image src="seq2seq-teacher-forcing.png" title="Fig.02 Seq2Seq - Teacher Forcing" description="Seq2Seq 모델의 학습은 교사 강요(teacher forcing) 방식으로 진행해야 한다. 즉 &quot;&lt;sos&gt;je suis étudiant&quot;가 입력되었을 때 &quot;je suis étudiant&lt;eos&gt;&quot;가 출력되어야 한다는 것을 디코더에게 직접 알려줘야 한다." />

## Seq2Seq 모델의 한계

Seq2Seq 모델은 번역(translation), 챗봇 등의 task에서 높은 성능을 보였다. 하지만 Seq2Seq 모델은 커다란 한계가 있었다.

- 입력 시퀸스의 모든 정보를 하나의 고정된 크기의 벡터(컨텍스트 벡터)에 다 압축 요약하려 하다 보니 정보의 손실이 생길 수밖에 없다. 특히 시퀸스의 길이가 길다면 정보의 손실이 더 커진다.
- RNN 기반 모델이다 보니, 필연적으로 gradient vaninshing/exploding 현상이 발생한다.
