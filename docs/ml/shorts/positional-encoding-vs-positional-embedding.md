---
title: "Positional Encoding vs. Positional Embedding"
date_created: "2022-01-28"
date_modified: "2022-11-13"
tags: ["nlp", "transformers", "pytorch", "position-encoding", "positional-embedding"]
---

전통적으로, 자연어로 된 문장을 조작해야 하는 NLP 영역에서는 연속적인(sequential) 데이터를 자연스럽게 입력으로 받아들일 수 있는 RNN 기반 모델이 많이 사용되어 왔다. 예를 들어, 문장 "John loves Susan"과 "Susan loves John"은 같은 단어들로 구성되어 있지만, 그 단어들의 위치(순서)가 달라 서로 다른 문장이다. 이때 RNN 모델에서는 문장 "John loves Susan"에 대해 ["John", "loves", "Susan"] 순으로 하나씩 입력되므로, "John"이 첫 번째 단어이고, "loves"가 두 번째 단어이고, "Susan"이 세 번째 단어라는 정보가 자연스럽게 입력된다. 또 문장 "Susan loves John"은 ["Susan", "loves", "John"]의 순서로 입력되므로, RNN 모델은 두 문장이 다르다는 사실을 쉽게 학습한다.

그런데 논문 "[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)", "[[2018] BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)"에서 각각 RNN을 사용하지 않고 어텐션만 사용하는 Transformer 모델과, 이 Transformer 모델을 기반으로 한 언어모델(language model) BERT를 제안한다. Transformer 기반 모델은 기존 RNN 기반 모델보다 성능이 훨씬 잘 나왔기에, NLP에서는 RNN보다 Transformer 기반 모델이 더 많이 사용되게 되었다.

이때 Transformer 모델을 구성하고 있는 Multi-Head Self Attention 층은 입력 순서가 바뀌어 출력되는 결과가 항상 같다는 문제가 있다.[^1] 즉 RNN 기반 모델에서는 자연스럽게 입력되었던 문장(sequence)의 위치 정보들이 Transformer 기반 모델에서는 입력되지 않는다는 것이다. Transformer 모델에서는 "John loves Susan"과 "Susan loves John" 두 문장이 다르다는 것이나, "John loves Susan"에서 "John"이 "Susan" 두 칸 앞에 있다는 정보 등이 자연스럽게 입력되지 않는다. 이를 해결하기 위해, 위 두 논문에서는 각각 Positional Encoding과 Positional Embedding이라는 방법을 사용해 사용자가 *직접* 입력 문장(sequence)의 위치 정보를 입력해 주게 된다.

[^1]: 이를 permutation equivariant하다고 한다. 구체적으로, (a, b, c)가 입력되었을 때 (1, 2, 3)이 출력된다면, (b, c, a)가 입력되면 (2, 3, 1)이 출력된다는 뜻이다.

그렇다면 Positional Encoding과 Positional Embedding의 차이는 무엇일까?

# Positional Encoding (Sinusoid Positional Embedding)

Transformer를 제일 처음 제안했던 논문 "[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)"에서는 모델에 위치 정보를 입력하기 위해 Positional Encoding, 또는 Sinusoid Positional Embedding이라 불리는 방법을 사용했다. 이 방법은 간단하다. 각 단어(token)의 위치마다 고유한 값(정확히는, 벡터)을 만들어 내는 *적절한* 함수를 이용해, 문장에서 각 단어의 위치를 설명하는 위치 임베딩 벡터를 만든 뒤, 단어 임베딩 벡터에 더하는 것이다.

이때 적절한 함수란 다음 조건을 만족시키는 함수를 말한다.

- 단어 임베딩 벡터와 같은 차원의 벡터를 반환한다.[^2]
- 같은 위치에서는 항상 유일하게 같은 값이 나온다(deterministic).
- 같은 거리만큼 떨어져 있으면 같은(비슷한) 값이 나온다.
- 벡터의 값들이 정규화되어 있어야 한다.
- 문장의 길이가 얼마나 되더라도 항상 사용 가능해야 한다.

[^2]: 그렇기에 단어 임베딩 벡터와 덧셈을 할 수 있다.

위 논문에서는 이에 대해 다음과 같은 함수를 사용했다.[^3]

[^3]: 이 함수를 sinusoidal 함수라 한다.

$$f(p, i) = \begin{cases}
\sin \left( \displaystyle\frac{p}{10000^{   i    / d  }} \right) & (i = 2k) \\[0.5em]
\cos \left( \displaystyle\frac{p}{10000^{(i - 1) / d  }} \right) & (i = 2k + 1) \\[0.5em]
\end{cases}$$

여기서 $p$, $d$, $i$, 이렇게 3가지 미지수가 등장하는데, 각각의 의미는 다음과 같다.

- $p$ : 단어의 위치(순서)를 의미하는 변수. 예를 들어, "John loves Susan"에서 "John"은 1, "loves"는 2, "Susan"은 3이다.

- $d$ : Transformer는 모든 층에서 출력의 차원이 같은데, 이 상수를 $d$라고 한다. 이 값은 단어 임베딩 벡터의 차원이기도 하고, 마찬가지로 위치 임베딩 벡터의 차원이기도 하다. 또한 Transformer가 받아들일 수 있는 입력 문장의 최대 길이(단어 수)이기도 하다. 참고로 위 논문에서는 $d = 512$를 사용했다.

- $i$ : 출력되는 위치 임베딩 벡터의 요소(element) 인덱스를 의미하는 변수. 예를 들어 단어 임베딩 벡터의 차원이 5라 할 때, $i = 2$를 하면 [ x, x, o, x, x ]에서 o의 위치에 해당하는 값이 계산된다. 즉 하나의 위치 임베딩 벡터를 계산하기 위해서는 위 식에 $i = 0$부터 $i = (d-1)$까지 넣어 가며 모두 계산해야 한다.

왜 이렇게 복잡한 함수를 쓰는지, 그리고 이 함수의 성질에 대한 설명은 아래 문서들을 참고하자.

- <https://towardsdatascience.com/master-positional-encoding-part-i-63c05d90a0c3>  [영문]
  - 번역 : <https://hongl.tistory.com/231>  [한글]
- <https://kazemnejad.com/blog/transformer_architecture_positional_encoding/>  [영문]
  - 번역 : <https://skyjwoo.tistory.com/entry/positional-encoding%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80>  [한글]

## 구현

다음과 같이 사전에 최대 입력 길이(`max_seq_len`)까지의 위치 임베딩을 미리 계산해 놓고, 입력이 들어올 때 바로 바로 가져다 쓰는 방식으로 구현할 수 있다.

```python
import torch.nn as nn

class PositionalEncoding(nn.Module):
    def __init__(self, max_seq_len, hidden_size):
        super().__init__()
        pe = torch.zeros(max_seq_len, hidden_size)
        position = torch.arange(0, max_seq_len).unsqueeze(1)
        div_term = torch.exp((torch.arange(0, hidden_size, 2, dtype=torch.float) *
                              -(math.log(10000.0) / hidden_size)))
        pe[:, 0::2] = torch.sin(position.float() * div_term)
        pe[:, 1::2] = torch.cos(position.float() * div_term)
        pe = pe.unsqueeze(0)
        
        self.register_buffer('pe', pe)
    
    def forward(self, word_emb):
        pos_emb = self.pe[:, :word_emb.shape[1]]
        return sent_embs + pos_emb
```

# Positional Embedding

한편, [BERT](https://arxiv.org/abs/1810.04805)에서는 모델에 위치 정보를 입력하기 위해 Positional Embedding[^4]이라는 방법을 사용했다. Positional Embedding은 더 간단하다. Positional Embedding은 위치 정보를 표현하기 위해서 학습 가능한 추가적인 임베딩 층(embedding layer)을 사용하는 것이다. BERT가 학습되면서, BERT는 위치 정보를 어떻게 표현(임베딩)하는게 제일 좋은지를 스스로 학습하게 된다.

[^4]: Position Embedding이라 하기도 한다.

## 구현 : nn.Embedding

PyTorch 기준, Positional Embedding은 일반적으로 `nn.Embedding` 클래스를 사용해 구현한다. `nn.Embedding`은 tokenizer가 각 토큰들을 정수로 바꾼 배열을 넘기면, 이를 변환해 dense한 벡터로 바꾸는 클래스이다. 예를 들어,

```python
import torch.nn as nn

layer = nn.Embedding(
    num_embeddings=2048,
    embedding_dim=8
)
```

`num_embeddings`가 2048[^5]이고 `embedding_dim`가 8[^6]인 임베딩 층 `layer`를 이용해 임베딩을 진행해 보자. 우선 tokenizer가 입력된 문장을 단어(token) 단위로 토크나이징 한 후, 각 토큰에 해당되는 정수 인덱스의 배열을 반환한다. 이를테면, 다음과 같은 형태로 말이다.[^7]

[^5]: 전체 텍스트의 단어 개수(= 임베딩해야 하는 항목 수 = vocabulary 크기)가 2048개라는 뜻이다.
[^6]: 출력되는 (dense해진) 임베딩 벡터의 차원이 8이라는 뜻이다.
[^7]: 배열의 크기가 13이다. 이 말은 입력된 문장에 총 13개의 단어(token)가 있다는 뜻이다. 또한 배열의 각 원소 값들은 전체 vocabulary 크기(2048)보다 작은 것을 확인할 수 있다.

```python
[ 3, 535, 85, 62, 658, 1216, 1987, 4, 667, 23, 343, 1120, 786 ]
```

이 배열이 위 `layer`에 입력되면, `layer`는 13 × 8 크기의 배열을 반환한다.

```python
[
  [ -0.51,  0.46, -0.15, -1.70,  0.47, -0.30, -1.86,  0.87 ],
  [ -1.00, -0.44,  1.08, -0.31,  0.00,  0.32,  0.89, -2.33 ],
  [ -0.41,  0.48,  1.15,  0.88,  0.70, -1.44, -1.20, -1.74 ],
  [  1.50,  1.86, -1.07,  0.61,  0.17,  0.28,  0.06, -0.65 ],
  [  0.32, -0.02,  0.64, -1.61, -0.11, -0.29, -0.54, -0.72 ],
  [ -0.26, -0.46,  0.01, -0.94, -2.22, -0.09,  0.39, -0.37 ],
  [ -0.19, -1.34, -0.83, -0.25,  0.20,  0.81, -1.66, -2.10 ],
  [  1.30, -0.79, -0.13,  0.23, -0.70, -0.15,  0.79,  1.04 ],
  [  0.06,  1.26,  0.69,  0.40,  1.16,  0.23, -1.68,  0.18 ],
  [  1.44, -0.81,  2.69,  0.28, -0.63, -0.27,  1.23, -0.65 ],
  [  2.07,  0.24, -1.21, -1.10, -1.22,  1.72, -0.69, -0.61 ],
  [ -0.08,  0.41, -1.18, -0.50, -1.05,  1.54, -1.10, -1.07 ],
  [  0.35, -0.79, -0.69,  1.02, -0.82, -1.47,  2.20,  0.94 ],
]
```

각 행이 각 단어(token)에 대한 임베딩 벡터이다. 예를 들어, 첫 번째 행 `[ -0.51,  0.46, -0.15, -1.70,  0.47, -0.30, -1.86,  0.87 ]`은 첫 번째 단어(token id 3)에 대한 임베딩 벡터이다.

# 결론

Positional Encoding과 Positional Embedding은 둘 다 Transformer 기반 모델에 입력 문장(sequence)의 위치 정보를 알려주기 위한 위치 임베딩 벡터를 만들기 위해 사용하는 방법이다.

다만, Positional Encoding은 deterministic한 함수를 이용해 위치 임베딩 벡터를 바로 만드는 방법이고, Positional Embedding은 학습 가능한 임베딩 층을 구성해 위치 임베딩 벡터를 만드는 방법이다. 즉 모델이 학습되어 갈 때, Positional Encoding은 업데이트되지 않지만(학습되지 않지만), Positional Embedding은 업데이트된다(학습된다).

또, Positional Encoding은 입력 문장의 길이가 매우 길더라도 항상 위치 임베딩을 만들 수 있지만, Positional Embedding은 임베딩 층의 크기보다 긴 길이의 문장은 위치 임베딩을 만들지 못한다.

그렇다면 둘 중 어느 방법이 좋을까? 사실 논문 "[[2017] Attention Is All You Need](https://arxiv.org/abs/1706.03762)"의 저자들은 Positional Encoding뿐만 아니라 Positional Embedding도 실험해 봤다고 한다. 그러나 둘 중 어느 방법을 사용하던지 비슷한 성능이 나왔다고 한다. 즉, **둘 중 아무거나 사용해도 된다**는 것이다.

실제로 PyTorch로 BERT를 구현한 유명한 repository인 [codertimo/BERT-pytorch](https://github.com/codertimo/BERT-pytorch)를 보면 Positional Encoding 방식을 사용해 BERT를 구현한 걸 볼 수 있으나, [huggingface의 구현](https://github.com/huggingface/transformers)을 보면 Positional Embedding 방식을 사용해 BERT를 구현한 것을 볼 수 있다.
