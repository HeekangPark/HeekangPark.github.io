---
title: "Source Code NLP Papers"
date_created: "2021-08-20"
date_modified: "2022-09-01"
tags: ["nlp", "nlp-for-source-code"]
---

# 2019

## [2019] CodeSearchNet Challenge : Evaluating the state of Semantic Code Search

{:.info}
- 논문 링크 : <https://arxiv.org/abs/1909.09436>
- 코드/데이터셋 링크 : <https://github.com/github/CodeSearchNet>
- 상세 : [CodeSearchNet : Evaluating the state of Semantic Code Search](/paper-review/codesearchnet)

{% include caption-img.html src="codesearchnet.png" title="CodeSearchNet Corpus" description="src: <a href=\"https://arxiv.org/abs/1909.09436\">[2019] CodeSearchNet Challenge : Evaluating the state of Semantic Code Search</a>" %}

{:.summary}
- Semantic Code Search의 성능 평가를 위해 **CodeSearchNet Corpus**와 **CodeSearchNet Challenge**를 제시
- CodeSearchNet Corpus : 6개의 프로그래밍 언어(Go, Java, JavaScript, PHP, Python, Ruby)로 작성된 오픈소스 함수 약 6M개와, 이 함수들 중 documentation이 존재하는 함수들의 code-documentation 쌍 $(c\_i,\,d\_i)$ 약 2M개
- CodeSearchNet Challenge : (사전 정의된) 자연어로 된 query가 주어졌을 때, 이와 연관된 함수를 CodeSearchNet Corpus에서 찾아 출력하는 task
- CodeSearchNet Challenge를 위한 baseline 방법들 제시

# 2020

## [2020] CoreGen: Contextualized Code Representation Learning for Commit Message Generation

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2007.06934>
- 코드/데이터셋 링크 : <https://github.com/Flitternie/CoreGen>

{% include caption-img.html src="coregen.png" title="CoreGen" description="src: <a href=\"https://arxiv.org/abs/2007.06934\">[2020] CoreGen: Contextualized Code Representation Learning for Commit Message Generation</a>" %}

{:.summary}
- encoder-decoder 구조 : contextual representation을 생성하는 모듈과 downstream commit message generation을 수행하는 모듈
- commit diff에서 implicit binary file change와 explicit code change에 대해 다른 학습 방법 적용
  - implicit binary file change : diff 내용을 random masking한 후 이를 예측하게 함 (masked language modeling)
  - explicit code change : 변경 전 코드를 입력값으로 해 변경 후 코드를 예측하게 함

# 2021

## [2021] CommitBERT : Commit Message Generation Using Pre-Trained Programming Language Models

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2105.14242>
- 코드/데이터셋 링크 : <https://github.com/graykode/commit-autosuggestions>

{% include caption-img.html src="commitbert.png" title="CommitBERT" description="src: <a href=\"https://arxiv.org/abs/2105.14242\">[2021] CommitBERT : Commit Message Generation Using Pre-Trained Programming Language Models</a>" %}

{:.summary}
- CodeBERT를 활용해 commit message generation task 수행
- Github에서 commit 정보 수집
  - 한 repo에서는 최대 50개의 commit만 수집
  - 1~2개의 파일만 수정된 commit만 수집
  - commit message가 여러 줄인 경우 첫 번째 줄만 사용
  - commit message가 issue #과 같은 형식으로 작성된 경우 제외
  - 영어가 아닌 언어로 commit message가 작성되었으면 제외
  - 코드에 너무 많은 변화가(32 token 이상) 있는 경우 제외
  - commit message의 첫 단어가 동사인 commit만 수집
- encoder-decoder 구조 : CodeBERT를 encoder로 사용. CodeBERT에 코드 변경사항을 입력하면, decoder에서 commit message를 생성하도록 학습시킴

## [2021] Evaluating Large Language Models Trained on Code

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2107.03374>
- 코드/데이터셋 링크 : <https://github.com/openai/human-eval>
- 상세 : [Evaluating Large Language Models Trained on Code](/paper-review/codex)

{:.summary}
- 코드에 대해 fine-tuning된 GPT-3 기반의 언어 모델, **Codex** 제안. Codex는 현재 Github Copilot에서 사용되고 있음.
- docstring으로부터 프로그램을 합성하는 task의 정확도를 평가하기 위한 **HumanEval**이라는 데이터셋을 제시. Codex는 이 중 28.8%의 문제를 풂. GPT-3은 0%의 문제를, GPT-J는 11.4%의 문제를 풂.
- 어려운 task를 풀 때는 반복적인 sampling이 아주 효과적인 전략임을 확인. 100번의 sampling을 하면 70.2%의 문제를 풂.

## [2021] GraphCodeBERT : Pre-Training Code Representations with Data Flow

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2009.08366>
- 코드/데이터셋 링크 : <https://github.com/microsoft/CodeBERT/tree/master/GraphCodeBERT>
- 상세 : [GraphCodeBERT : Pre-Training Code Representations with Data Flow](/paper-review/graphcodebert)

{% include caption-img.html src="graphcodebert.png" title="GraphCodeBERT" description="src: <a href=\"https://arxiv.org/abs/2009.08366\">[2021] GraphCodeBERT: Pre-training Code Representations with Data Flow</a>" %}

{:.summary}
- Transformer 기반, semantic-level structure를 고려하는 프로그래밍 언어를 위한 사전학습 모델(pre-trained model) **GraphCodeBERT** 제안
- data flow를 구축하고, BERT 학습 과정에서 이를 반영
- GraphCodeBERT 학습을 위한, structure-aware한 새로운 pre-training task를 제안 : Edge Prediction Task, Node Alignment Task
- Code Search, Clone Detection, Code Translation, Code Refinement 영역에서 GraphCodeBERT는 SotA를 달성

## [2021] Contrastive Code Representation Learning

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2007.04973>
- 코드/데이터셋 링크 : <https://github.com/parasj/contracode>

{% include caption-img.html src="contracode.png" title="ContraCode" description="src: <a href=\"https://arxiv.org/abs/2007.04973\">[2021] Contrastive Code Representation Learning</a>" %}

{:.summary}
- 문제점 : 기존 모델(CodeBERT, RoBERTa 등)이 code의 semantic보다 글자들 그 자체에 조금 더 집중함 → adversarial attack에 몹시 취약
- contrastive learning 적용하여 조금 더 사실적인 code representation을 얻는 **ContraCode**라는 방법 제안
  - 컴파일러를 이용, 소스 코드를 약간 변형한(reformatting, beatuufication, compression, constant folding, dead-code elimination, dead-code incerstion, type upconversion, variable renaming, identifier mangling, subword regularization, line subsampling) 코드(augmentation)를 생성
  - 같은 원본 소스 코드에 대한 augmentation들끼리는 positive pair를 이루도록 하고, 다른 원본 소스 코드에 대한 augmentation들끼리는 negative pair를 이루도록 하여 contrastive learning 적용
- Clone Detection, Code Summarization, Type Inference 등의 task에서 좋은 성능을 냄

## [2021] CodeTrans: Towards Cracking the Language of Silicon’s Code Through Self-Supervised Deep Learning and High Performance Computing

{:.info}
- 논문 링크 : <https://arxiv.org/abs/2007.04973>
- 코드/데이터셋 링크 : <https://github.com/agemagician/CodeTrans>

{:.summary}
- **CodeTrans** 제안 : 소스 코드 버전 T5 모델
- Code Documentation Generation, Code Summarization, Code Comment Generation, Git Commit Message Generation, API Sequence Recommendation, Program Synthesis 6개 분야에서 SotA 달성



# 2022


 
