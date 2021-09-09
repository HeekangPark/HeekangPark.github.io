---
title: "NLP for Source Code 관련 논문 정리"
date_created: "2021-08-20"
date_modified: "2021-09-03"
tags: ["nlp", "nlp-for-source-code"]
---

# 2019

## CodeSearchNet Challenge : Evaluating the state of Semantic Code Search

{:.no-guide-line}
- 논문 링크 : <https://arxiv.org/pdf/1909.09436.pdf>
- 코드/데이터셋 링크 : <https://github.com/github/CodeSearchNet>
- 상세 : [CodeSearchNet : Evaluating the state of Semantic Code Search](/paper_review/codesearchnet-challenge-evaluating-the-state-of-semantic-code-search)

{:.no-guide-line}
- Semantic Code Search의 성능 평가를 위해 CodeSearchNet Corpus와 CodeSearchNet Challenge를 제시
  - CodeSearchNet Corpus : 6개의 프로그래밍 언어(Go, Java, JavaScript, PHP, Python, Ruby)로 작성된 오픈소스 함수 약 6M개와, 이 함수들 중 documentation이 존재하는 함수들의 code-documentation 쌍 $(c\_i,\,d\_i)$ 약 2M개
  - CodeSearchNet Challenge : (사전 정의된) 자연어로 된 query가 주어졌을 때, 이와 연관된 함수를 CodeSearchNet Corpus에서 찾아 출력하는 task
- CodeSearchNet Challenge를 위한 baseline 방법들 제시


# 2021

## GraphCodeBERT : Pre-Training Code Representations with Data Flow

{:.no-guide-line}
- 논문 링크 : <https://arxiv.org/pdf/2009.08366.pdf>
- 코드/데이터셋 링크 : <https://github.com/microsoft/CodeBERT/tree/master/GraphCodeBERT>
- 상세 : [GraphCodeBERT : Pre-Training Code Representations with Data Flow](/paper_review/graphcodebert-pre-training-code-representations-with-data-flow)

{:.no-guide-line}
- Transformer 기반, semantic-level structure를 고려하는 프로그래밍 언어를 위한 사전학습 모델(pre-trained model) GraphCodeBERT 제안
- GraphCodeBERT 학습을 위한, structure-aware한 새로운 pre-training task를 제안 : Edge Prediction Task, Node Alignment Task
- Code Search, Clone Detection, Code Translation, Code Refinement 영역에서 GraphCodeBERT는 SotA를 달성

