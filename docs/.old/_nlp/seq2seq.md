---
title: "어텐션 시리즈 : (1) Seq2Seq 모델"
date_created: "2022-01-25"
date_modified: "2022-12-07"
---

<div class="series-header" markdown="block">

{:.title}
어텐션 시리즈

- [어텐션 시리즈 : (1) Seq2Seq 모델](/nlp/seq2seq)
- [어텐션 시리즈 : (2) 어텐션 메커니즘](/nlp/attention)
- [어텐션 시리즈 : (3) Transformer 모델](/nlp/transformer)

</div>

본 시리즈에서는 어텐션 메커니즘(attention machanism)과 이와 관련된 다양한 모델들을 살펴본다.

# Seq2Seq 모델

{:.info}
[[2014] Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)

어텐션 메커니즘은 본래 Seq2Seq 모델을 개선하기 위해 제안된 메커니즘이다. 어텐션 메커니즘을 잘 이해하려면 Seq2Seq 모델을 이해해야 한다.

Seq2Seq 모델은 번역, 요약과 같이 시퀸스(sequence)를 입력받아 시퀸스를 출력하는 task를 위해 고안된 RNN 기반 모델이다.[^1]

[^1]: 번역 : 원문을 받아들여 번역문을 출력. 요약 : 원문을 받아들여 요약문을 출력.

<div class="note" markdown="block">

{:.title}
시퀸스(sequence)란?

시퀸스(sequence)는 여러 항목들의, 순서가 있는 모음을 의미한다(ordered collection of items). 예를 들어 단어(word)는 글자(character)들의 시퀸스이다. 단어를 구성하는 글자들의 순서가 바뀌면 그 의미가 달라지기 때문이다. 또 문장(sentence) 역시 시퀸스이다. 문장을 구성하는 단어 또는 글자들의 순서가 바뀌면 그 의미가 달라지기 때문이다.

</div>

{% include caption-img.html src="attention-seq2seq.png" title="Fig.01 Seq2Seq 모델" description="영어 문장 \"I am a student.\"을 프랑스어 \"Je suis étudiant.\"으로 번역하는 Seq2Seq 모델. 왼쪽 주황색 사각형이 인코더(encoder)를, 오른쪽 녹색 사각형이 디코더(decoder)를 나타내고 있다. 인코더는 입력 문장(\"I am a student.\")을 입력받아 컨텍스트 벡터(context vector)를 출력하고, 디코더는 컨텍스트 벡터(와 <code class=\"language-plaintext highlighter-rouge\">&lt;sos&gt;</code> 토큰)를 입력으로 받아 출력 문장(\"Je suis étudiant.\")을 출력한다." %}

Fig.01은 영어 문장 \"I am a student.\"을 프랑스어 \"Je suis étudiant.\"으로 번역하는 Seq2Seq 모델을 나타낸 것이다. Fig.01을 보면 원문("I am a student")을 받아들이는 부분(주황색 사각형)과 번역문("Je suis étudiant") 을 출력하는 부분(초록색 사각형)이 분리되어 있는 것을 볼 수 있다.

이처럼 Seq2Seq 모델은 '시퀸스를 받아들이는 부분'과 '시퀸스를 출력하는 부분'을 분리한 것이 특징이다. 이때 시퀸스를 받아들이는 부분을 **인코더(encoder)**, 시퀸스를 출력하는 부분을 **디코더(decoder)**라 한다. 인코더는 입력 시퀸스(원문)를 받아들여 **컨텍스트 벡터(context vector)**라 불리는, 고정된 크기의 벡터로 변환하는 역할을 한다. 그리고 디코더는 인코더가 생성한 컨텍스트 벡터를 받아 출력 시퀸스(번역문)를 출력한다.[^2]

[^2]: Fig.01를 보면 인코더, 디코더에 여러 개의 RNN 셀이 있는 것처럼 그려져 있으나, 이는 여러 시점(time step)을 한 그림에 나타내기 위함일 뿐이지, 인코더와 디코너는 각각 하나의 RNN 셀로 이루어져 있다(단, RNN 셀을 세로 방향으로 여러 층 '깊게' 쌓는 경우는 있다). 또한 Fig.01에서는 RNN 셀로 LSTM을 사용하는 것으로 그려져 있는데, 경우에 따라 LSTM이 아닌 vanilla RNN, GRU 등 다른 RNN 셀을 사용할 수도 있다(LSTM을 쓰는 게 제일 흔하긴 하다).

## Seq2Seq 모델의 동작 방법

Fig.01에서의 예시를 통해 Seq2Seq 모델이 동작(inference)하는 순서를 알아보자.

- 인코딩
  1. 우선 인코더는 적절한 값(ex. 영벡터)으로 자신의 은닉 상태를 초기화한다.
  2. 매 시점(time step) 원문의 단어(token)가 입력되면(정확히는, 단어의 임베딩이 입력되면) 인코더는 이를 이용해 은닉 상태를 업데이트한다.
  3. 원문의 마지막 단어까지 이 과정을 반복하면, 인코더의 최종 은닉 상태는 원문의 정보를 압축 요약한 상태가 된다. 이 최종 은닉 상태를 컨텍스트 벡터라 하고, 이 값을 디코더로 넘긴다.
  
- 디코딩
  1. 디코더는 전달받은 컨텍스트 벡터로 자신의 은닉 상태를 초기화한다.
  2. 매 시점 자신이 바로 직전 시점에 출력했던 단어를 입력으로 받아(정확히는, 출력했던 단어의 임베딩을 입력으로 받아), 자신의 은닉 상태를 업데이트하고, 이를 이용해 다음 단어를 예측한다. 단, 최초 시점에서는 이전 출력 단어가 없으므로 시퀸스 시작을 의미하는 `<sos>` 토큰(start of sequence)을 입력으로 받는다.
  3. 2번 과정을 정해진 반복 횟수 또는 시퀸스 끝을 나타내는 `<eos>` 토큰(end of sequence)이 나올 때까지 수행한다.

## Seq2Seq 모델의 학습 방법 - 교사 강요(teacher forcing)

Seq2Seq 모델을 사용(inference)할 땐 이전 시점의 디코더 출력 단어를 다시 디코더 입력값으로 사용하는 방식을 사용하나, 이 방식으로 학습(training)을 시키면 디코더가 잘 학습되지 않는다. 모델 학습 시에는 디코더의 입력값으로 이전 시점의 디코더 출력 단어가 아닌 실제 정답 단어를 입력해 줘야 한다. 이 방식을 **교사 강요(teacher forcing)**라 한다.

{% include caption-img.html src="attention-seq2seq-teacher-forcing.png" title="Fig.02 Seq2Seq - Teacher Forcing" description="Seq2Seq 모델의 학습은 교사 강요(teacher forcing) 방식으로 진행해야 한다. 즉 \"&lt;sos&gt;je suis étudiant\"가 입력되었을 때 \"je suis étudiant&lt;eos&gt;\"가 출력되어야 한다는 것을 디코더에게 직접 알려줘야 한다." %}

- 인코딩
  1. 우선 인코더는 적절한 값(ex. 영벡터)으로 자신의 은닉 상태를 초기화한다.
  2. 매 시점(time step) 원문의 단어(token)가 입력되면(정확히는, 단어의 임베딩이 입력되면) 인코더는 이를 이용해 은닉 상태를 업데이트한다.
  3. 원문의 마지막 단어까지 이 과정을 반복하면, 인코더의 최종 은닉 상태는 원문의 정보를 압축 요약한 상태가 된다. 이 최종 은닉 상태를 컨텍스트 벡터라 하고, 이 값을 디코더로 넘긴다.
  
- 디코딩
  1. 디코더는 전달받은 컨텍스트 벡터로 자신의 은닉 상태를 초기화한다.
  2. 매 시점 <del>자신이 바로 직전 시점에 출력했던 단어를 입력으로 받아</del> <span class="text-color-red">[변경]</span> <span class="text-color-reset">이전 시점에서 실제로 출력되었어야 하는 정답 단어를 입력으로 받아</span>, 자신의 은닉 상태를 업데이트하고, 이를 이용해 다음 단어를 예측한다. 단, 최초 시점에서는 이전 출력 단어가 없으므로 시퀸스 시작을 의미하는 `<sos>` 토큰(start of sequence)을 입력으로 받는다.
  3. 2번 과정을 정해진 반복 횟수 또는 시퀸스 끝을 나타내는 `<eos>` 토큰(end of sequence)이 나올 때까지 수행한다.

## Seq2Seq 모델의 한계

Seq2Seq 모델은 번역, 챗봇 등의 task에서 좋은 성능을 보였다. 하지만 Seq2Seq 모델은 커다란 한계가 있었다.

- 입력 시퀸스의 모든 정보를 하나의 고정된 크기의 벡터(컨텍스트 벡터)에 다 압축 요약하려 하다 보니 정보의 손실이 생길 수밖에 없다. 특히 시퀸스의 길이가 길다면 정보의 손실이 더 커진다.
- RNN 기반 모델이다 보니, 필연적으로 gradient vaninshing/exploding에 의한 장기 의존성 문제(Long-term dependency problem)가 발생한다.

<div class="note" markdown="block">

{:.title}
장기 의존성 문제(Long-term dependency problem)란?

RNN 기반 모델은 입력 시퀸스를 단방향으로만 훑는다. Bi-LSTM과 같은 '양방향 모델'이라 할 지라도 순방향과 역방향을 각각 훑는 것이지, 모든 단어들을 한번에 다 훑는 것이 아니다. 그러다 보니 RNN 기반 모델로는 물리적으로 멀리 떨어져 있는 단어들 간의 관계(long-term dependency)를 학습하기 어렵다.

예를 들어, 다음과 같은 문장이 있을 때,

{:.text-align-center}
"John has a nice big mansion with a swimming pool, and he likes to swim in it."

"John"과 "he"는 같은 대상을 지칭하고 있지만 물리적으로 멀리 떨어져 있어, RNN 기반 모델로는 두 단어가 같은 대상을 지칭하고 있다는 사실을 학습하기 어렵다. 두 단어 사이의 시간 간격(time step)이 너무 멀어 gradient가 전파되는 중 gradient vanishing/exploding 현상이 일어나기 쉽기 때문이다. Vanilla RNN은 말할 것도 없고, 장기 기억력을 가진 LSTM이라 할지라도 단어 간 거리가 너무 멀어지면 관계성을 학습하기 쉽지 않다. 이런 RNN 기반 모델의 한계를 장기 의존성 문제(long-term dependency problem)라고 한다.

</div>

## 예제

pytorch를 이용해 영어를 한국어로 번역하는 Seq2Seq 모델을 직접 만들어 보자.

### 사전준비

다음 패키지들을 설치한다.

- pytorch==1.13.0
- transformers==4.24.0
- korpora==0.2.0

다음 항목들을 import한다.

{:.code-header}
imports

{% highlight python linenos %}
from Korpora import Korpora
import torch
from torch.utils.data import Dataset, DataLoader
from torch.nn.utils.rnn import pad_sequence, pack_padded_sequence
import torch.nn as nn
from transformers import AutoTokenizer
{% endhighlight %}

### 데이터

영어-한국어 번역기를 만드는데 사용할 데이터는 Jungyeul Park 님이 만드신 한국어-영어 뉴스 말뭉치이다.

<div class="info" markdown="block">

- author: Jungyeul Park
- repository: <https://github.com/jungyeul/korean-parallel-corpora>
- size:
  - train: 94,123 pairs
  - dev: 1,000 pairs
  - test: 2,000 pairs

</div>

Korpora를 이용하면 이 말뭉치를 손쉽게 받을 수 있다(Korpora에 대한 자세한 사용법은 [다음 문서](https://ko-nlp.github.io/Korpora/)를 참고하자). 이를 이용해 train, dev, test dataset 및 dataloader를 다음과 같이 만들 수 있다.

{:.code-header}
Dataset, Dataloader

{% highlight python linenos %}
class KoEnDataset(Dataset):
    def __init__(self, split):
        assert split in ["train", "dev", "test"], f"Invalid param <split> : {split}"
        
        full_dataset = Korpora.load("korean_parallel_koen_news", root_dir=".")
        if split == "train":
            self.dataset = full_dataset.train
        elif split == "dev":
            self.dataset = full_dataset.dev
        else: # test
            self.dataset = full_dataset.test
    
    def __len__(self):
        return len(self.dataset) 
    
    def __getitem__(self, idx):
        return self.dataset[idx].text, self.dataset[idx].pair

train_dataset = KoEnDataset("train")
dev_dataset = KoEnDataset("dev")
test_dataset = KoEnDataset("test")

batch_size = 32

train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
dev_loader = DataLoader(dev_dataset, batch_size=batch_size, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
{% endhighlight %}


### Seq2Seq 모델 구현

우선 인코더는 다음과 같은 역할을 해야 한다.

1. 원문 문자열(영어)을 받아들여,
2. tokenization : tokenizer를 이용해 tokenization을 수행하고,
3. embedding : 각 token을 임베딩 벡터로 변환하고,
4. feeding : 하나씩 RNN 모듈에 넣어 은닉 상태를 업데이트한다.
5. 마지막 token까지 모두 입력한 후, 최종 은닉 상태를 반환한다.

2번 tokenization 과정에서는 spacy, nltk 등의 rule-based tokenizer를 사용해도 되지만, 우린 huggingface의 transformers 라이브러리에서 제공하는 `bert-base-uncased` tokenizer를 사용하자. 이 tokenizer는 데이터 기반 tokenizer(WordPiece)로, BERT가 학습할 때 사용했던 tokenizer이다. 또 3번 embedding 과정에서는 one-hot encoding을 사용한다.

{:.code-header}
Encoder

{% highlight python linenos %}
class Encoder(nn.Module):
    def __init__(self, hidden_size=256, num_layers=2, dropout=0.5):
        super().__init__()
        self.tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
        self.rnn = nn.LSTM(
            input_size=self.tokenizer.vocab_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout
        )
    
    def one_hot_encoding(self, input_ids):
        # sequence 하나를 one hot embedding으로 변환해주는 함수
        # input_ids : LongTensor(seq_len)
        # return : tensor(seq_len, vocab_size)
        return torch.zeros(len(input_ids), self.tokenizer.vocab_size).scatter(1, input_ids.unsqueeze(1), 1)
    
    def forward(self, sentences):
        # 만약 단일 문장이 입력되었다면, 문장을 리스트로 감싸 batch 입력으로 바꿔준다.
        if isinstance(sentences, str):
            sentences = [sentences]
        
        # huggingface tokenizer를 이용해 tokenize
        input_ids = self.tokenizer(
            sentences,
            return_attention_mask=False,
            return_token_type_ids=False
        ).input_ids
        
        # one-hot encoding
        input_ids = [
            self.one_hot_encoding(torch.LongTensor(x)) for x in input_ids
        ]
        
        # 길이 내림차순으로 정렬
        sorted_order = [
            (original_idx, sorted_idx)
            for sorted_idx, original_idx
            in enumerate(
                sorted(range(len(input_ids)), key=lambda i: input_ids[i].shape[0], reverse=True)
            )
        ]
        input_ids = [input_ids[i] for i, _ in sorted_order]
        lengths = [x.shape[0] for x in input_ids]
        
        # padded sequence 생성
        padded_input_ids = pad_sequence(
            input_ids,
            batch_first=True,
            padding_value=self.tokenizer.pad_token_id
        )
        
        # packed sequence 변환
        packed_input_ids = pack_padded_sequence(
            padded_input_ids,
            lengths=lengths,
            batch_first=True
        )
        
        outputs, (hidden_states, cell_states) = self.rnn(packed_input_ids)
        
        # 원래 순서대로 복구
        sorted_order = sorted(sorted_order, key=lambda x: x[0])
        hidden_states = torch.stack(
            [hidden_states[:, i, :] for i in [x[1] for x in sorted_order]],
            dim=1
        )
        cell_states = torch.stack(
            [cell_states[:, i, :] for i in [x[1] for x in sorted_order]],
            dim=1
        )
        
        return hidden_states, cell_states
{% endhighlight %}
