---
title: "ATS (Automatic Text Summarization)"
date_created: "2022-01-22"
date_modified: "2022-01-26"
---

# ATS란?

ATS(Automatic Text Summarization)이란 주어진 텍스트에 대한 요약(summary)을 (자동으로) 만드는 기술을 말한다.

# ATS 분류

{:.info}
논문 [[2021] Automatic text summarization: A comprehensive survey](https://linkinghub.elsevier.com/retrieve/pii/S0957417420305030)를 참조해 작성함

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

## BERTSum

{:.info}
논문 [[2019] Fine-tune BERT for Extractive Summarization](https://arxiv.org/abs/1903.10318)를 참조해 작성함

- 핵심 아이디어

    주어진 텍스트 $d$를 구성하는 $m$개의 문장 [$sent\_1$, $sent\_2$, ..., $sent\_m$]에 대해, extractive text summarization은 각 문장 $sent\_i$에 0(요약에 포함되지 않음) 또는 1(요약에 포함됨)의 레이블을 부여하는 분류 문제라 볼 수 있다.

{% include caption-img.html src="ats-bertsum-architecture.png" title="BERTSum 모델 구조" description="from <a href=\"https://arxiv.org/abs/1903.10318\">[2019] Fine-tune BERT for Extractive Summarization</a>" %}

- 모델 구조
  
  각 문장에 대한 embedding을 구하는 BERT와, 문장의 embedding을 이용해 요약을 진행하는 summarization layer로 구성된다(위 그림 참조).

  - BERT
    - Encoding Multiple Sentences
      
      각 문장 앞에 `[CLS]` 토큰을, 뒤에 `[SEP]` 토큰을 추가하여 입력값을 만든다. 각 문장의 embedding은 각 문장의 `[CLS]` 토큰에 담기게 된다. 이를 summarization layer로 보낸다.

    - Interval Segment Embedding
   
      각 문장들을 구분하기 위해, 홀수 번째 문장에는 $E\_A$ segment embedding을, 짝수 번째 문장에는 $E\_B$ segment embedding을 부여한다. 즉, 전체 텍스트의 각 문장은 [$E\_A$, $E\_B$, $E\_A$, $E\_B$, ...]의 segment embedding을 가지게 된다.

  - summarization layer

    BERT로부터 넘어온 문장 $sent\_i$의 embedding $T\_i$를 이용해 최종 score $\hat {Y}\_i$를 계산한다. 저자는 simple classifier, RNN, inter-sentence transformer, 이렇게 3가지 종류의 summarization layer를 시험해 보았고, 이 중 inter-sentence transformer가 성능이 제일 좋았다고 한다.

- fine-tuning

  참값($Y\_i$)과 예측값($\hat {Y}\_i$)의 binary classification entropy loss를 이용해 전체 모델(BERT + summarization layer)를 fine-tuning한다.

