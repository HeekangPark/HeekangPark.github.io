---
title: "Evaluating Large Language Models Trained on Code"
date_created: "2021-10-10"
date_modified: "2022-08-15"
---

{:.info}
- 논문 링크 : <https://arxiv.org/pdf/2107.03374.pdf>
- 코드/데이터셋 링크 : <https://github.com/openai/human-eval>

# 요약

{:.guide-line}
- Idea
  - [이전 연구](https://arxiv.org/pdf/2005.14165.pdf)에서 GPT-3를 이용하면 Python docstring에서부터 간단한 프로그램을 만들어 낼 수 있음을 확인
  - GPT-3는 코드 생성(code generation)을 위해 학습되지 않았음에도 불구하고 작동함
  - 그렇다면, 여러 코드 관련 task에 특화된 GPT 모델을 만들면 높은 성능을 기록할 것이라 추정 → Codex

- Contribution
  - Codex
    - 학습 방법 : docstring에서부터 독립적인(standalone) Python 함수를 짜는 특화된 task에 대해 GPT 모델을 학습시킴
    - 평가 방법 : humanEval의 unit test를 이용해 생성된 코드 샘플들의 정확도를 자동으로 평가
      - 일반적으로 코드 생성 task에서 생성된 코드의 정확도는 heuristic하게 평가하거나 사람이 직접 평가했음
  - humanEval
    - 코드 합성(code synthesis) task의 성능 평가용 데이터 셋
    - 사람이 직접 만든 164개의 프로그래밍 문제로 구성됨
      - 언어의 이해도(comprehension), 알고리즘, 간단한 수학 등을 평가할 수 있음
      - 각 문제는 unit test를 가지고 있음

- 평가 방법
  1. 각 문제에 대해, 여러 개의 코드 샘플들을 생성
  2. 생성된 코드 샘플들 중 unit test를 통과하는 코드가 있는지 확인. unit test를 통과하면 문제를 맞힌 것으로 인정한다.

- Codex-S : docstring으로부터 함수를 생성하는 task에 대한 성능을 높이기 위해, 독립적이고(standalone) 정확히 구현된 함수들에 대해 Codex를 fine-tuning시킴

- 결과
  - 하나의 코드 샘플만 생성하여 평가
    - Codex-S (12B parameter) : 37.7%의 문제를 맞힘
    - Codex (12B parameter) : 28.8%의 문제를 맞힘
    - GPT-J (6B parameter) : 11.4%의 문제를 맞힘
    - 나머지 GPT 모델들 : (거의) 0%의 문제를 맞힘
  - 100개의 코드 샘플을 생성하여 평가
    - Codex-S (12B parameter) : 77.5%의 문제를 맞힘

- 100개의 코드 샘플을 생성해 평가하면 하나의 코드 샘플만 생성해 평가할 때보다 정답률이 비약적으로 상승
  - 각 코드 샘플을 일일이 평가해 '정확한' 하나의 답을 찾게 할 수도 있겠지만, 그냥 무턱대고 여러 개의 코드 샘플을 생성하다 보면 그 중에 답이 있을 확률이 높음
    - 전자의 방법은 현실적으로는 사용하긴 힘듦
  - 즉, 주어진 문제에 대해 여러 개의 코드 샘플을 생성하고, 사용자가 이들에 대해 랭킹을 매기는 heuristic한 방법을 써도 성능이 꽤 잘 나옴

# 상세

{:.guide-line}
- Evaluation Framework
  - functional correctness
    - 코드 생성 모델(generative model for code)은 일반적으로 match 기반 방법으로 평가되었음
      - 주어진 문제에 대한 정답 코드(reference code)가 있고, 생성된 코드가 이와 match되는지를 평가
      - match는 정확하게 될 수도 있고, fuzzy하게 될 수도 있다(ex. BLEU score).
    - 하지만 match 기반 방법들은 코드 생성 모델의 성능을 평가하는데 적절하지 않음
      - 프로그램의 공간(space of programs)은 너무 넓고 복잡해, 생성된 코드와 정답 코드(reference code)가 동일한지(equivalent) 비교하는 것이 매우 어려움
    - 그래서 최근엔 functional correctness 방식으로 평가를 진행함
      - 생성된 코드가 unit test를 통과하면 정답으로 인정
      - 실제 사람이 코드를 평가하는 방식과 유사(test-driven development)
    - ex. pass@$k$ metric
      - 각 문제에 대해 $k$개의 샘플 코드를 생성하고, 이 중 하나라도 해당 문제의 unit test를 통과하면 정답으로 인정하고, 전체 문제 중 맞힌 비율을 계산한다.
      - 그러나 pass@$k$ metric은 variance가 크다.
    - 개선된 pass@$k$ metric
      - 각 문제에 대해 $n \ge k$개의 코드를 생성하고, 이 중 unit test를 통과한 코드의 수를 세어($c$개라고 하자), 다음과 같이 계산한다 :
      
        {:.text-align-center}
        pass@$k := \underset{Problems}{\mathbb{E}} \left[ 1 - \frac{\begin{pmatrix}n-c\\\\k\end{pmatrix}}{\begin{pmatrix}n\\\\k\end{pmatrix}}\right]$ 
      
      - 이를 바로 사용하면 값이 너무 크고 numerically stable하지 않으므로 numerically stable한 버전을 사용
      - 본 논문에서는 $n=200$, $k \le 100$을 사용했다.
  - HumanEval 데이터 셋
    - <https://github.com/openai/human-eval>
    - 사람이 직접 만든 164개의 프로그래밍 문제 데이터 셋
    - 각 문제는 function signature, docstring, body, (여러 개의) unit test를 가지고 있음
      - unit test는 문제당 평균 7.7개 존재
    - HumanEval 데이터 셋의 문제들은 프로그래밍 언어의 이해도(language comprehension), 추리력(reasoning), 알고리즘, 간단한 수학 등을 평가함
  - 샌드박스(Sandbox)
    - 생성된 프로그램을 위험 없이 실행하기 위해 샌드박스(gVisor container runtime)에서 실행

- Code Fine-Tuning
  - Codex : 12B개의 파라미터를 가지고 있는 GPT-3 모델을 코드들에 대해 fine-tuning함
  - fine-tuning용 학습 데이터
    - GitHub에서 54M개의 public software repository에서 1MB 이하의 파이썬 파일 179GB 분량을 모은 후, 자동 생성된 코드, 100줄 이하의 코드, 1000줄 이상의 코드 등을 필터링해, 최종적으로 159GB 분량의 학습 데이터를 확보
  - 학습 방법
    - 사전학습된 GPT-3 model family에서부터 fine-tuning 시작
      - 단, 사전학습되지 않은 모델에서부터 fine-tuning을 시작해도 별로 성능의 차이가 없었음
        - fine-tuning용 학습 데이터의 크기가 매우 커서 그런 것으로 추정
      - 하지만, 사전학습된 모델에서부터 시작하면 더 빨리 수렴함
    - 사용한 사전학습된 GPT-3 모델과 같은 learning rate를 사용
      - 175 step linear warmup
      - cosine learning rate decay
      - Adam optimizer ($\beta\_1=0.9$, $\beta\_2=0.95$, $\epsilon=10^-8$)
      - weight decay coefficient = 0.1
    - 코드 lexer로 GPT-3의 text tokenizer를 사용
      - 코드의 context는 일반적인 자연어의 context와 다르므로(ex. whitespace), 그에 맞게 추가적인 token을 추가
      - 그 결과 30% 적은 token을 가지고 코드를 represent할 수 있게 됨

