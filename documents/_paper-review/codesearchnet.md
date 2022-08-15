---
title: "CodeSearchNet : Evaluating the state of Semantic Code Search"
date_created: "2021-09-02"
date_modified: "2022-08-15"
tags: ["nlp", "nlp-for-source-code"]
---

{:.info}
- 논문 링크 : <https://arxiv.org/pdf/1909.09436.pdf>
- 데이터셋 링크 : <https://github.com/github/CodeSearchNet>

{:.guide-line}
- CodeSearchNet Corpus
  - 링크 : <https://github.com/github/CodeSearchNet>
  
  - 구성
    - 6개의 프로그래밍 언어(Go, Java, JavaScript, PHP, Python, Ruby)로 작성된 오픈소스 함수 약 6M개
    - 위 함수들 중 documentation이 존재하는 함수들의 code-documentation 쌍 $(c\_i,\,d\_i)$ 약 2M개

  - 데이터 수집 방법
    1. 다른 프로젝트에 한 번 이상 사용된[^2019-codesearchnet-1] 오픈소스[^2019-codesearchnet-2] 프로젝트의 non-fork Github Repository에서 Corpus 수집
    2. Popularity(star 수와 fork 수를 기반으로 계산) 순으로 정렬
    3. Go, Java, JavaScript, Python, PHP, Ruby 함수(혹은 메소드)를 토크나이즈[^2019-codesearchnet-3]
    4. (만약 존재한다면) 휴리스틱 정규식을 이용해 해당 함수의 documentation 토크나이즈
  
  - $(c\_i,\,d\_i)$ 쌍 데이터 정제 방법
    - $d\_i$는 전체 documentation의 첫 번째 문단
      - query를 검색하기 쉬운 길이로 만듦
      - 각 함수의 인자와 반환값에 대한 자세한 설명은 포함하지 않음
    - 세 문장(token)보다 짧은 $d\_i$는 많은 정보를 포함하고 있지 않다 판단하여 제거
    - 세 줄(line)보다 짧은 $c\_i$는 제거
      - 이보다 짧은 코드는 보통 구현되지 않은 메소드(unimplemented method), getter, setter 따위임
    - "test"가 들어간 이름을 사용하는 함수, 생성자(constructor), 표준 확장 메소드(standard extension method)[^2019-codesearchnet-4] 제거
    - 중복 함수는 제거
      - 자동 생성된 코드(auto-generated code), 복사-붙여넣기된 코드 제거
      - 이 과정에서 유사한 함수(near duplicate function)도 제거됨
      - [[2018] Allamanis, The Adverse Effects of Code Duplication in Machine Learning Model of Code](https://arxiv.org/pdf/1812.06469), [[2017] Lopes, DejaVu: a map of code duplicates on GitHub](https://dl.acm.org/doi/pdf/10.1145/3133908)에 나온 방법 사용

- CodeSearchNet Challenge : (사전 정의된) 자연어로 된 query가 주어졌을 때, 이와 연관된 함수를 CodeSearchNet Corpus에서 찾아 출력하는 task
  - Leaderboard : <https://app.wandb.ai/github/codesearchnet/benchmark>
  
  - 평가 데이터 셋 : 99개의 query와, 전문가 프로그래머(expert programmer)들이 각 99개 query에 대해 CodeSearchNet Corpus 일부를 분류한 답(annotation)으로 구성

  - 평가 방법 : NDCG(Normalized Discounted Cumulative Gain) 계산
    - "Within" : annotation이 있는 함수들에 대한 NDCG 계산값
    - "All" : 전체 CodeSearchNet Corpus에 대한 NDCG 계산값
  
  - query 수집 방법
    1. Bing에서 코드를 클릭하게 되는 검색 query들을 모은 후 [StaQC](https://arxiv.org/pdf/1803.09371)를 이용해 각 query들의 intent를 결합
    2. 명백한 기술적인 키워드[^2019-codesearchnet-5]를 포함하는 query는 제거
  
  - expert annotation 방법
    1. baseline 방법들을 ensemble해 CodeSearchNet Corpus에서 각 프로그래밍 언어 및 각 query당 10개의 후보 함수들을 생성
    2. 간단한 웹 인터페이스를 이용해 expert annotation 수행 : 프로그래밍 언어를 선택하면, query/code 쌍이 제시됨. 전문가 프로그래머는 query에 대한 결과로서 code(함수)가 얼마나 관련이 있는지[^2019-codesearchnet-6] 연관도(relevance score)를 평가함
    3. 두 개 이상의 annotation이 붙은 항목들의 경우(891개) squared Cohen's kappa interannotator agreement[^2019-codesearchnet-7]를 사용

  - expert annotation의 한계
    - Code Quality : 품질이 낮은 코드(ex. 가독성 낮은 코드, 보안성이 낮은 코드, 느린 코드)는 연관도를 어떻게 주어야 하는가?
    - Query Ambiguity : 몇몇 query는 추가적인 맥락(context)이 있어야 의미가 명확해진다.
    - Library vs. Project Specific : 몇몇 코드는 해당 코드가 속한 프로젝트에 특화되어 있고, 몇몇 코드는 범용적이고 장황하다(불필요한 내용이 포함되어 있다). query의 맥락(context)에 따라 이들 코드는 연관이 있을수도 있고, 아닐 수도 있다.
    - Directionality : query와 정확히 반대되는 함수들이 후보로 제시되는 경우도 있다.[^2019-codesearchnet-8] 후보를 생성할 때 사용한 baseline 방법들이 query의 의미를 제대로 이해하지 못한 것으로 보인다.

- baseline 방법들
  - Joint Vector Representations for Code Search : <https://github.com/github/CodeSearchNet>
  - ElasticSearch Baseline : 기본값 사용
  
<table>
    <caption>CodeSearchNet Corpus 구성</caption>
    <thead>
        <tr>
            <th rowspan="2"></th>
            <th colspan="2">함수 개수</th>
        </tr>
        <tr>
            <th>documentation이 있는 함수</th>
            <th>전체 함수</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Go</th>
            <td>347,789</td>
            <td>726,768</td>
        </tr>
        <tr>
            <th>Java</th>
            <td>542,991</td>
            <td>1,569,889</td>
        </tr>
        <tr>
            <th>JavaScript</th>
            <td>157,988</td>
            <td>1,857,835</td>
        </tr>
        <tr>
            <th>PHP</th>
            <td>717,313</td>
            <td>977,821</td>
        </tr>
        <tr>
            <th>Python</th>
            <td>503,502</td>
            <td>1,156,085</td>
        </tr>
        <tr>
            <th>Ruby</th>
            <td>57,393</td>
            <td>164,048</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>전체</th>
            <td>2,326,976</td>
            <td>6,452,446</td>
        </tr>
    </tfoot>
</table>

<table>
    <caption>CodeSearchNet Challenge Evalutation Dataset Annotation 구성</caption>
    <thead>
        <tr>
            <th rowspan="2"></th>
            <th colspan="4">Relevance Score 개수</th>
            <th rowspan="2">총계</th>
        </tr>
        <tr>
            <th>0</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Go</th>
            <td>62</td>
            <td>64</td>
            <td>29</td>
            <td>11</td>
            <td>166</td>
        </tr>
        <tr>
            <th>Java</th>
            <td>383</td>
            <td>178</td>
            <td>125</td>
            <td>137</td>
            <td>823</td>
        </tr>
        <tr>
            <th>JavaScript</th>
            <td>153</td>
            <td>52</td>
            <td>56</td>
            <td>58</td>
            <td>319</td>
        </tr>
        <tr>
            <th>PHP</th>
            <td>103</td>
            <td>77</td>
            <td>68</td>
            <td>66</td>
            <td>314</td>
        </tr>
        <tr>
            <th>Python</th>
            <td>498</td>
            <td>511</td>
            <td>537</td>
            <td>543</td>
            <td>2,089</td>
        </tr>
        <tr>
            <th>Ruby</th>
            <td>123</td>
            <td>105</td>
            <td>53</td>
            <td>34</td>
            <td>315</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="5">전체</th>
            <td>4,026</td>
        </tr>
    </tfoot>
</table>

[^2019-codesearchnet-1]: [libraries.io](https://libraries.io) 사용
[^2019-codesearchnet-2]: license가 없거나, 재배포를 명시적으로 금지하는 license를 가진 프로젝트는 제외
[^2019-codesearchnet-3]: [TreeSitter](https://github.com/tree-sitter/tree-sitter)(Github의 파서) 사용
[^2019-codesearchnet-4]: ex. Python에서의 `__str__()`, Java에서의 `toString()` 등
[^2019-codesearchnet-5]: ex. `tf.gather_nd` 등
[^2019-codesearchnet-6]: 0: 관련없음 / 1: 약한 관련 / 2: 강한 관련 / 3: 정확함
[^2019-codesearchnet-7]: Cohen $\kappa = 0.47$
[^2019-codesearchnet-8]: "convert int to string" query에 대해, `stringToInt()` 함수를 제시
[^2019-codesearchnet-9]: 자연어, 프로그래밍 언어
[^2019-codesearchnet-10]: ex. 변수 `camelCase`는 "camel", "case" subtoken으로 분리