---
title: "NLP for Source Code 관련 논문 정리"
date_created: "2021-08-20"
date_modified: "2022-06-11"
tags: ["nlp", "nlp-for-source-code"]
---

# 2019

## CodeSearchNet Challenge : Evaluating the state of Semantic Code Search

{:.info}
- 논문 링크 : <https://arxiv.org/pdf/1909.09436.pdf>
- 코드/데이터셋 링크 : <https://github.com/github/CodeSearchNet>
- 상세 : [CodeSearchNet : Evaluating the state of Semantic Code Search](/paper-review/codesearchnet-challenge-evaluating-the-state-of-semantic-code-search)

{:.summary}
- Semantic Code Search의 성능 평가를 위해 **CodeSearchNet Corpus**와 **CodeSearchNet Challenge**를 제시
- CodeSearchNet Corpus : 6개의 프로그래밍 언어(Go, Java, JavaScript, PHP, Python, Ruby)로 작성된 오픈소스 함수 약 6M개와, 이 함수들 중 documentation이 존재하는 함수들의 code-documentation 쌍 $(c\_i,\,d\_i)$ 약 2M개
- CodeSearchNet Challenge : (사전 정의된) 자연어로 된 query가 주어졌을 때, 이와 연관된 함수를 CodeSearchNet Corpus에서 찾아 출력하는 task
- CodeSearchNet Challenge를 위한 baseline 방법들 제시


# 2021

## Evaluating Large Language Models Trained on Code

{:.info}
- 논문 링크 : <https://arxiv.org/pdf/2107.03374.pdf>
- 코드/데이터셋 링크 : <https://github.com/openai/human-eval>
- 상세 : [Evaluating Large Language Models Trained on Code](/paper-review/evaluating-large-language-models-trained-on-code)

{:.summary}
- 코드에 대해 fine-tuning된 GPT-3 기반의 언어 모델, **Codex** 제안. Codex는 현재 Github Copilot에서 사용되고 있음.
- docstring으로부터 프로그램을 합성하는 task의 정확도를 평가하기 위한 HumanEval이라는 데이터셋을 제시. Codex는 이 중 28.8%의 문제를 풂. GPT-3은 0%의 문제를, GPT-J는 11.4%의 문제를 풂.
- 어려운 task를 풀 때는 반복적인 sampling이 아주 효과적인 전략임을 확인. 100번의 sampling을 하면 70.2%의 문제를 풂.

## GraphCodeBERT : Pre-Training Code Representations with Data Flow

{:.info}
- 논문 링크 : <https://arxiv.org/pdf/2009.08366.pdf>
- 코드/데이터셋 링크 : <https://github.com/microsoft/CodeBERT/tree/master/GraphCodeBERT>
- 상세 : [GraphCodeBERT : Pre-Training Code Representations with Data Flow](/paper-review/graphcodebert-pre-training-code-representations-with-data-flow)

{:.summary}
- Transformer 기반, semantic-level structure를 고려하는 프로그래밍 언어를 위한 사전학습 모델(pre-trained model) **GraphCodeBERT** 제안
- GraphCodeBERT 학습을 위한, structure-aware한 새로운 pre-training task를 제안 : Edge Prediction Task, Node Alignment Task
- Code Search, Clone Detection, Code Translation, Code Refinement 영역에서 GraphCodeBERT는 SotA를 달성


