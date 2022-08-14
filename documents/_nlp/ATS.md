---
title: "ATS (Automatic Text Summarization)"
date_created: "2022-01-22"
date_modified: "2022-08-14"
---

# ATS란?

ATS(Automatic Text Summarization)이란 주어진 텍스트에 대한 요약(summary)을 (자동으로) 만드는 기술을 말한다.

# ATS 분류

{:.info}
reference : [[2021] Automatic text summarization: A comprehensive survey](https://linkinghub.elsevier.com/retrieve/pii/S0957417420305030)

## 입력 크기(input size)에 따른 분류
  
- **SDS(Single-Document Summarization)** : 주어진 텍스트가 문서(document) 하나인 경우
- **MDS(Multi-Document Summarization)** : 주어진 텍스트가 문서 여러 개인 경우

MDS에서는 특정 문장이 여러 문서에서 동시에 나오더라도 요약에는 한 번만 출력되게 해야 하고(redundancy 문제), 문서들 모두가 골고루 포함되는 요약을 만들어야 하고(coverage 문제), 문서들에 시간 순서가 있는 경우 이도 고려해야(temporal relatedness 문제) 하는 등 SDS에 비해 고려해야 할 게 많다. 즉 일반적으로 MDS가 SDS보다 더 어렵다.
  
## 요약 방법(text summarization approach)에 따른 분류

- **extractive text summarization approach** : 주어진 텍스트에서 중요한 문장들을 선별한 후, 이를 이어 붙여 요약을 만드는 방법
- **abstractive text summarization approach** : 주어진 텍스트를 적절한 방법을 사용해 intermediate representation으로 만들고, 이로부터 요약을 생성하는 방법
- **hybrid text summarization approach** : extractive text summarization approach와 abstractive text summarization approach을 함께 사용해 요약을 만드는 방법

extractive text summarization approach로 만든 요약의 각 문장들은 원 텍스트에 실제로 존재하는 문장들이다. 그러나 abstractive text summarization approach로 만든 요약의 각 문장들은 원 텍스트에 실제로 존재하지 않을 수도 있다.

## 요약의 성질(nature of the output summary)에 따른 분류

- **generic** : 주어진 텍스트의 전체적인 내용을 모두 담고 있는 요약을 생성하는 경우
- **query-based** : 주어진 질의(query)와 관련있는 내용을 주로 담고 있는 요약을 생성하는 경우

## 요약 언어(summary language)에 따른 분류

- **monolingual** : 한 종류의 언어(langauge)로 작성된 텍스트로부터, 동일한 언어로 된 요약을 만드는 경우(ex. 영어 텍스트로부터 영어 요약을 생성)
- **multilingual** : 여러 종류의 언어로 작성된 텍스트로부터, 여러 언어로 된 요약을 만드는 경우(ex. 영어, 아랍어, 프랑스어로 된 텍스트로부터 영어, 아랍어, 프랑스어 요약을 생성)
- **cross-lingual** : 한 종류의 언어로 작성된 텍스트로부터, 다른 언어로 된 요약을 만드는 경우(ex. 영어 텍스트로부터 아랍어 요약을 생성)

## 요약 알고리즘(summarization algorithm)에 따른 분류

- **supervised** : 학습 과정(training phase)와, 이를 위한 레이블링된 학습 데이터(anootated training data)가 필요
- **unsupervised** : 학습 과정도, 학습 데이터도 필요하지 않음

## 요약 내용(summary content)에 따른 분류

- **indicative** : 주어진 텍스트가 무엇에 관한 내용인지 그 주제를 알려주는 요약을 생성하는 경우. 사용자는 이를 이용해 전체 텍스트의 범위(scope)를 빠르게 파악하고, 전체 텍스트를 읽을 지 말지를 결정하는 데 사용할 수 있다(영화 감상 한줄평과 비슷).
- **informative** : 주어진 텍스트에서 중요한 정보와 아이디어를 담고 있는 요약을 생성하는 경우. 사용자는 이를 이용해 세부사항까진 다 살펴보진 않고 전체 텍스트의 핵심 내용만을 훑어볼 수 있다(강의 요약 노트와 비슷).

## 요약 형태(summary type)에 따른 분류

- **headline** : 한 문장도 안 되는 길이의 요약(헤드라인)을 생성하는 경우
- **sentence-level** : 한 문장의 요약을 생성하는 경우. 일반적으로 abstractive text summarization approach를 이용해 만든다.
- **highlight** : 전보와 비슷한 형태(telegraphic style)로 된, 매우 압축된 형태의 요약을 생성하는 경우. 일반적으로 bullet point(·) 스타일로 생성된다.
- **full-text** : 이외의 경우. 일반적으로 만들어야 하는 요약의 길이 또는 정보를 압축할 압축률이 주어지는 경우가 많다.

## 요약 도메인(summarization domain)에 따른 분류

- **general**, **domain-independent** : 다양한 도메인의 텍스트에 대한 요약을 생성하는 경우
- **domain-specific** : 특정 도메인에 대한 텍스트에 대해, 도메인 특화된 요약을 생성하는 경우

# Extractive Text Summarization

## BERTSumExt

{:.info}
Reference : [[2019] Fine-tune BERT for Extractive Summarization](https://arxiv.org/abs/1903.10318), [[2019] Text Summarization with Pretrained Encoders](https://arxiv.org/abs/1908.08345v2)

- 핵심 contribution

    BERT를 사용해 extractive summarization을 효율적으로 하는 방법론을 제안

- 문제 정의

    주어진 텍스트 $d$를 구성하는 $m$개의 문장 [$sent\_1$, $sent\_2$, ..., $sent\_m$]에 대해, extractive text summarization은 각 문장 $sent\_i$에 0(요약에 포함되지 않음) 또는 1(요약에 포함됨)의 레이블을 부여하는 분류 문제라 볼 수 있다.

{% include caption-img.html src="ats-bertsum-architecture.png" title="BERTSum 모델 구조" description="from <a href=\"https://arxiv.org/abs/1903.10318\">[2019] Fine-tune BERT for Extractive Summarization</a>" %}

- 모델 구조
  
  - BERT + inter-sentence transformer + classifier
  
  - BERT : 문장의 embedding을 구하는 모듈. embeddings + encoder
    - embeddings : token embedding + segment embedding + position embedding을 수행하는 모듈. token이 아닌 문장의 embedding을 만들 수 있도록 BERT의 embeddings 모듈을 약간 변형하여 사용.
      - 각 문장의 앞에 `[CLS]` token을, 뒤에 `[SEP]` token을 추가. 이 `[CLS]` token의 embedding을 문장의 embedding으로 사용함
      - 각 문장을 구별하기 위해, 홀수 번째 문장의 segment embedding(token type id)은 $E\_A$(0)로, 짝수 번째 문장의 segment embedding는 $E\_B$(1)로 설정. 즉 텍스트의 각 문장은 차례로 [$E\_A$, $E\_B$, $E\_A$, $E\_B$, ...]의 segment embedding을 가지게 됨
      - 긴 텍스트도 입력받을 수 있게 입력 가능한 최대 token 수를 적절한 값으로 설정하고, 이에 맞춰 (필요하다면) position embedding을 확장. 확장한 position embedding은 무작위 값으로 초기화하고 fine-tuning 과정에서 (다른 parameter와 함께) 학습되도록 함. 입력 가능한 최대 token 수를 넘어가는 텍스트는 뒷부분을 버리고(truncate) 입력. 예를 들어 논문에서는 CNN/DM dataset의 경우 512 token 이후, NYT dataset의 경우 800 token 이후 텍스트를 버리고(truncate) 사용함.
    - encoder : token embedding이 문맥 정보를 반영한 embedding(contextual embedding)이 되도록 embedding을 개선시키는 모듈. BERT의 encoder 모듈을 그대로 사용.

  - inter-sentence transformer : 문장 embedding을 개선하는 모듈. embeddings + encoder
    - embeddings : sentence embedding + position embedding을 수행하는 모듈
      - BERT 모듈의 가장 마지막 layer(top layer)의 hidden state에서 `[CLS]` token의 embedding(이하 sentence embedding)만을 추출해 입력값으로 받음
      - 문장의 순서를 embedding에 담기 위해, sinusoid position embedding을 sentence embedding에 더해 줌
    - encoder : sentence embedding이 문맥 정보를 반영한 embedding(contextual embedding)이 되도록 embedding을 개선시키는 모듈. 2층의 transformer layer를 사용.
      - embeddings 모듈의 출력값을 입력값으로 받음
      - 다음 연산을 수행
        
          {:.mathjax-mb-0}
          $$\tilde{h}^l = \text{LN}(h^{l-1} + \text{MHAtt}(h^{l-1}))$$

          {:.mathjax-mt-0}
          $$h^l = \text{LN}(\tilde{h}^l + \text{FFN}(\tilde{h}^l))$$
          
          단 $\text{LN}$, $\text{MHAtt}$, $\text{FFN}$은 각각 layer normalization, transformer의 multi-head attention 연산, feed-forward 연산을 의미. $h^0$는 embeddings 모듈의 출력값.
  
  - classifier : sentence embedding을 점수(summary에 포함될 확률)로 변환하는 모듈
    - inter-sentence transformer 모듈의 가장 마지막 layer(top layer)의 hidden state를 입력값으로 받음
    - 다음 연산을 수행

        $$\hat{y}_i = \sigma (W_o h_i^L + b_o)$$

        단 $\sigma$는 sigmoid 함수이고, $h_i^L$는 inter-sentence transformer의 마지막 layer의 hidden state 중 $i$번째 문장의 sentence embedding을 의미.

- fine-tuning

  참값($Y\_i$)과 예측값($\hat {Y}\_i$)의 binary classification entropy loss를 이용해 전체 모델을 fine-tuning한다.

