---
title: "Huggingface BERT 톺아보기"
date_created: "2022-07-23"
date_modified: "2022-09-01"
---

<style>
figure.highlight + figure.highlight.code-result {
    max-height: 500px;
    overflow-y: auto;
}
</style>

오늘날 우리는 transformer의 시대에 살고 있다고 말해도 과언이 아니다. transformer 기반 모델들은 거의 대부분의 NLP task들에서 sota를 달성하고 있다.

transformer 시대의 서막을 연 것은 BERT였다. BERT가 처음 등장했을 때는 이를 가져다 쓰기 위해선 상당한 실력이 요구되었으나, Huggingface 라이브러리가 등장하고부턴 누구나 쉽고 편하게 BERT(를 포함한 transformer 모델들)를 가져다 쓸 수 있게 되었다. 본 문서에서는 바로 그 Huggingface의 BERT(`bert-base-uncased`)가 어떻게 구현되어 있는지 살펴보도록 하겠다.

# 사전 준비

우선 현재 사용중인 머신의 CUDA 버전에 맞춰 적절한 pytorch 패키지를 설치한다. 

{:.code-header}
pytorch 패키지 설치 (CUDA 11.6)

{% highlight bash %}
pip install torch --extra-index-url https://download.pytorch.org/whl/cu116
{% endhighlight %}

그리고 transformers 패키지를 설치한다.

{:.code-header}
transformers 패키지 설치

{% highlight bash %}
pip install transformers
{% endhighlight %}

Jupyter Notebook/Lab을 사용한다면 ipywidgets 패키지를 설치해야 transfoermers 패키지가 정상적으로 동작하므로 이 역시 설치한다. (패키지 설치가 완료된 이후에는 커널을 재시작하고 페이지를 새로고침해 줘야 한다.)

{:.code-header}
ipywidgets 패키지 설치 (Jupyger Notebook/Lab 사용자의 경우)

{% highlight bash %}
pip install ipywidgets
{% endhighlight %}

# Tokenizer

Huggingface에서 제공하는 대부분의 transformer 모델들은 문자열(string)로 된 텍스트를 입력으로 바로 받을 수 없다. 예를 들어 BERT의 경우 tokenize한 후 각 token들을 고유한 정수로 바꾼 것, 그러니까 token id들의 리스트(sequence of token ids)를 입력으로 받는다. 게다가 `attention_mask`, `token_type_ids`와 같은 추가적인 데이터를 요구한다.

이에 Huggingface의 모델들은 각 모델별로 tokenizer라는 것을 제공한다. tokenizer는 자신과 짝이 맞는 모델이 어떤 데이터를 원하는지를 알아, 그에 맞게 데이터를 가공해 반환한다. 이 tokenizer의 출력값은 거의 그대로 모델로 들어가게 된다.

그래서 Huggingface 모델 사용의 제 1단계는 "해당 모델의 tokenizer 불러오기" 이다. 다음과 같이 `AutoTokenizer.from_pretrained()` 메소드에 모델명을 입력하면 모델과 매치되는 tokenizer를 불러올 수 있다. 이를 이용해 `bert-base-uncased` 모델의 tokenizer를 불러오자.

{% highlight python %}
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
{% endhighlight %}

Huggingface tokenizer의 사용법은 매우 간단하다. 다음과 같이 tokenize할 문자열을 tokenizer에 인자로 넣기만 하면 된다.

{% highlight python %}
tokenizer("I love NLP!")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': [101, 1045, 2293, 17953, 2361, 999, 102], 'token_type_ids': [0, 0, 0, 0, 0, 0, 0], 'attention_mask': [1, 1, 1, 1, 1, 1, 1]}
{% endhighlight %}

tokenizer가 반환하는 출력값은 여러 항목들이 들어 있는 python dictionary이고(정확히는 `BatchEncoding` 객체이지만 dictionary라 생각해도 무방하다), 각 항목의 값(value)들은 python list이다. 즉 다음과 같이 각각의 값들에 접근할 수 있다.

{% highlight python %}
tokens = tokenizer("I love NLP!")

print(f"input ids : {tokens['input_ids']}")
print(f"token type ids : {tokens['token_type_ids']}")
print(f"attention mask : {tokens['attention_mask']}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
input ids : [101, 1045, 2293, 17953, 2361, 999, 102]
token type ids : [0, 0, 0, 0, 0, 0, 0]
attention mask : [1, 1, 1, 1, 1, 1, 1]
{% endhighlight %}

`bert-base-uncased` tokenizer 출력값에 있는 각 항목의 의미는 다음과 같다.

- `input_ids` : token들의 id 리스트(sequence of token id).
- `token_type_ids` : 각 token이 어떤 문장에 속하는지를 나타내는 리스트. BERT는 한 번에 두 문장(sentence A, sentence B)을 입력으로 받을 수 있는데, `bert-base-uncased` tokenizer는 sentence A에 속하는 token에는 0을, sentence B에 속하는 token에는 1을 부여한다.
- `attention_mask` : attention 연산이 수행되어야 할 token과 무시해야 할 token을 구별하는 정보가 담긴 리스트. `bert-base-uncased` tokenizer는 attention 연산이 수행되어야 할, 일반적인 token에는 1을 부여하고, padding과 같이 attention 연산이 수행될 필요가 없는 token들에는 0을 부여한다.

이들 항목은 `bert-base-uncased` 모델이 입력값으로 요구하는 것들이다. Huggingface의 tokenizer는 자신과 짝이 되는 모델이 어떤 항목들을 입력값으로 요구한다는 것을 '알고' 이에 맞춰 출력값에 필요한 항목들을 자동으로 추가해 준다. 만약 `token_type_ids`, `attention_mask`가 필요없다면 다음과 같이 `return_token_type_ids`, `return_attention_mask` 인자에 `False`를 주면 된다.

{% highlight python %}
tokenizer(
    "I love NLP!",
    return_token_type_ids=False,
    return_attention_mask=False
)
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': [101, 1045, 2293, 17953, 2361, 999, 102]}
{% endhighlight %}

`tokenizer.convert_ids_to_tokens()` 메소드를 사용하면 token id를 token으로 변환할 수 있다.

{% highlight python %}
print(tokenizer.convert_ids_to_tokens(1045))  # 하나만 바꿀 수도 있고
print(tokenizer.convert_ids_to_tokens([101, 1045, 2293, 17953, 2361, 999, 102]))  # 여러 개를 바꿀 수도 있다
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
i
['[CLS]', 'i', 'love', 'nl', '##p', '!', '[SEP]']
{% endhighlight %}

위 결과를 보면 token들이 모두 소문자임을 볼 수 있다. 이는 `bert-base-uncased` tokenizer가 이름에 걸맞게 입력된 텍스트를 모두 소문자로 변환한 후 tokenization을 진행하기 때문에 그렇다.

또 "NLP"라는 단어가 "nl"과 "##p"로 분리된 것도 볼 수 있는데, 이는 BERT tokenizer가 WordPiece 알고리즘에 따라 각 subword 단위로 token을 분리하기 때문이다. WordPiece 알고리즘에 대해 조금 더 자세히 알고 싶다면 [Huggingface에 이를 잘 설명한 문서](https://huggingface.co/docs/transformers/tokenizer_summary#wordpiece)가 있으니 참조하자.

그리고 `[CLS]`, `[SEP]`과 같이 원문("I love NLP!")에는 없던 것들이 추가된 것을 볼 수 있다. 이는 BERT가 사용하는 특별한 token들로(special token), tokenizer가 tokenization 과정에서 자동으로 추가한 것이다. BERT가 사용하는 special token들의 종류와 그 token id들은 다음과 같다.

- padding token : `[PAD]`(0)
- unknown token : `[UNK]`(100)
- classifier token : `[CLS]`(101)
- seperator token : `[SEP]`(102)
- mask token : `[MASK]`(103)

BERT가 사용하는 special token들의 정보는 tokenizer 객체에서 다음과 같이 확인할 수 있다.

{% highlight python %}
print(f"special token ids : {tokenizer.all_special_ids}")
print(f"special tokens : {tokenizer.all_special_tokens}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
special token ids : [100, 102, 0, 101, 103]
special tokens : ['[UNK]', '[SEP]', '[PAD]', '[CLS]', '[MASK]']
{% endhighlight %}

만약 tokenizer가 자동으로 special token을 추가하는 것을 막고 싶다면 다음과 같이 `add_special_tokens` 인자를 `False`로 주면 된다(default: `True`).

{% highlight python %}
tokens = tokenizer(
    "I love NLP!",
    add_special_tokens=False    
)
print(f"token ids : {tokens['input_ids']}")
print(f"tokens : {tokenizer.convert_ids_to_tokens(tokens['input_ids'])}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
token ids : [1045, 2293, 17953, 2361, 999]
tokens : ['i', 'love', 'nl', '##p', '!']
{% endhighlight %}

필요하다면 `add_special_tokens` 인자를 `False`로 주고 다음과 같이 special token을 직접 입력할 수 있다.

{% highlight python %}
tokens = tokenizer(
    "[CLS]I love NLP![SEP]",
    add_special_tokens=False    
)
print(f"token ids : {tokens['input_ids']}")
print(f"tokens : {tokenizer.convert_ids_to_tokens(tokens['input_ids'])}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
token ids : [101, 1045, 2293, 17953, 2361, 999, 102]
tokens : ['[CLS]', 'i', 'love', 'nl', '##p', '!', '[SEP]']
{% endhighlight %}

혹은 다음과 같이 할 수도 있다.

{% highlight python %}
tokens = tokenizer(
    f"{tokenizer.cls_token}I love NLP!{tokenizer.sep_token}",
    add_special_tokens=False    
)
print(f"token ids : {tokens['input_ids']}")
print(f"tokens : {tokenizer.convert_ids_to_tokens(tokens['input_ids'])}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
token ids : [101, 1045, 2293, 17953, 2361, 999, 102]
tokens : ['[CLS]', 'i', 'love', 'nl', '##p', '!', '[SEP]']
{% endhighlight %}

`tokenizer.convert_tokens_to_ids()` 메소드를 사용하면 이번엔 반대로 token을 token id로 변환할 수 있다.

{% highlight python %}
print(tokenizer.convert_tokens_to_ids("i"))  # 하나만 바꿀 수도 있고
print(tokenizer.convert_tokens_to_ids(['[CLS]', 'i', 'love', 'nl', '##p', '!', '[SEP]']))  # 여러 개를 바꿀 수도 있다
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
1045
[101, 1045, 2293, 17953, 2361, 999, 102]
{% endhighlight %}

참고로 이 메소드에는 반드시 tokenizer의 vocabulary에 존재하는 token만 입력해야 한다. 존재하지 않는 token, 이를테면 대문자 "I" 따위를 변환하려 하면 `[UNK]` 토큰으로 변환된다.

`tokenizer.decode()` 메소드를 사용하면 token id들의 리스트(sequence of token id)를 다시 원문 문자열로 바꿀 수 있다. `tokenizer.convert_ids_to_tokens()` 메소드와 비슷하지만, `tokenizer.decode()` 메소드는 token들을 모아 자동으로 하나의 문자열 형태로 반환해 준다는 점에서 다르다.

{% highlight python %}
tokens = tokenizer("I love NLP!")
tokenizer.decode(tokens["input_ids"])
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
'[CLS] i love nlp! [SEP]'
{% endhighlight %}

`tokenizer.decode()` 메소드를 사용할 때 다음과 같이 `skip_special_tokens` 인자를 True로 주면 special token들은 무시하고 문자열로 변환된다(default: `False`).

{% highlight python %}
tokens = tokenizer("I love NLP!")
print(tokens)
print(f"Decoded : {tokenizer.decode(tokens['input_ids'])}")
print(f"Decoded (skip special tokens) : {tokenizer.decode(tokens['input_ids'], skip_special_tokens=True)}")
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': [101, 1045, 2293, 17953, 2361, 999, 102], 'token_type_ids': [0, 0, 0, 0, 0, 0, 0], 'attention_mask': [1, 1, 1, 1, 1, 1, 1]}
Decoded : [CLS] i love nlp! [SEP]
Decoded (skip special tokens) : i love nlp!
{% endhighlight %}

tokenizer를 사용해 여러 텍스트를 동시에 tokenize할 수도 있다. tokenizer는 다음과 같이 `List[str]` 형태로 입력이 들어오면 batch 입력이라 이해하고, 각 string별로 따로따로 `input_ids`, `token_type_ids`, `attention_mask`를 만들어 준다.

{% highlight python %}
tokenizer(["I love NLP!", "I don't like NLP..."])
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': [[101, 1045, 2293, 17953, 2361, 999, 102], [101, 1045, 2123, 1005, 1056, 2066, 17953, 2361, 1012, 1012, 1012, 102]], 'token_type_ids': [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 'attention_mask': [[1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]}
{% endhighlight %}

다음과 같이 `List[List[str]]` 형태로 입력이 들어오면 tokenizer는 하위 list(`List[str]`)가 sentence A, sentence B를 입력하는 것이라 이해하고, 다음과 같이 출력한다. `token_type_ids`에 0(sentence A)과 1(sentence B)이 둘 다 있는 것을 볼 수 있다.

{% highlight python %}
tokenizer([
    ["I love NLP!", "I don't like NLP..."],
    ["There is an apple.", "I want to eat it."]
])
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': [[101, 1045, 2293, 17953, 2361, 999, 102, 1045, 2123, 1005, 1056, 2066, 17953, 2361, 1012, 1012, 1012, 102], [101, 2045, 2003, 2019, 6207, 1012, 102, 1045, 2215, 2000, 4521, 2009, 1012, 102]], 'token_type_ids': [[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]], 'attention_mask': [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]}
{% endhighlight %}

이때 BERT는 한 번에 sentence A, setence B, 이렇게 두 개의 sentence만 입력받을 수 있기 때문에, `List[List[str]]` 형태로 입력을 할 땐 하위 list(`List[str]`)의 원소 개수가 2개를 넘겨선 안 된다.

{% highlight python %}
tokenizer([
    ["You can't", "pass more than", "two strings:-("]
])  # ERROR
{% endhighlight %}

tokenization 과정에서 다음과 같이 `return_tensors` 옵션을 주면 torch tensor 형태로 출력을 받을 수 있다.

{% highlight python %}
tokenizer(
    "I love NLP!",
    return_tensors="pt"
)
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': tensor([[  101,  1045,  2293, 17953,  2361,   999,   100,   102]]), 'token_type_ids': tensor([[0, 0, 0, 0, 0, 0, 0, 0]]), 'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1]])}
{% endhighlight %}

batch 입력을 할 때, 만약 각 텍스트의 token 수가 다르다면 pytorch tensor로 출력을 받을 수 없다. torch tensor의 각 row는 크기가 같아야 하기 때문이다.

{% highlight python %}
tokenizer(
    ["I love NLP!", "I don't like NLP..."],
    return_tensors="pt"
)  # ERROR
{% endhighlight %}

이를 해결하기 위해, 일반적으로는 입력의 최대 길이(max length)를 정해 놓고, 이 길이를 넘는 텍스트는 자르고(truncate), 이 길이에 못 미치는 텍스트는 padding을 추가하는 방법을 사용할 수 있다. 다음과 같이 하면 최대 길이 10을 넘는 텍스트는 자르고 부족한 부분에는 padding을 추가해 모든 텍스트의 길이가 같도록 만들 수 있다.

{% highlight python %}
tokenizer(
    ["I love NLP!", "I don't like NLP. blah blah blah blah blah"],
    max_length=10,
    padding="max_length",
    truncation=True,
    return_tensors="pt"
)
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
{'input_ids': tensor([[  101,  1045,  2293, 17953,  2361,   999,   102,     0,     0,     0], [  101,  1045,  2123,  1005,  1056,  2066, 17953,  2361,  1012,   102]]), 'token_type_ids': tensor([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]), 'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])}
{% endhighlight %}

참고로 truncation의 단위는 token 단위이다. 또 입력의 최대 길이 계산에는 special token 역시 포함된다.

`padding`, `truncation` 인자에 사용할 수 있는 값은 다음과 같다.

- padding
    - `True` 혹은 `"longest"` : batch에서 가장 긴 텍스트에 맞춰 padding한다. 만약 하나의 텍스트만 입력되었다면 padding하지 않는다.
    - `"max_length"` : `max_length` 인자가 주어진 경우 그 길이에 맞춰 padding한다. 만약 `max_length` 인자가 주어지지 않았다면 모델이 입력받을 수 있는 최대 길이(BERT의 경우 512)에 맞춰 padding한다.
    - `False` 혹은 `"do_not_pad`"(default) : padding하지 않는다.
- truncation
    - `True` 혹은 `"longest_first"` : `max_length` 인자가 주어진 경우 그 길이에 맞춰 truncate한다. 만약 `max_length` 인자가 주어지지 않았다면 모델이 입력받을 수 있는 최대 길이(BERT의 경우 512)에 맞춰 truncate한다. 만약 `List[List[str]]` 형태로 입력이 들어온 경우 두 sentence 중 긴 sentence를 먼저 truncate한다.
    - `"only_first"` : `max_length` 인자가 주어진 경우 그 길이에 맞춰 truncate한다. 만약 `max_length` 인자가 주어지지 않았다면 모델이 입력받을 수 있는 최대 길이(BERT의 경우 512)에 맞춰 truncate한다. 만약 `List[List[str]]` 형태로 입력이 들어온 경우 두 sentence 중 첫 번째 sentence만 truncate한다.
    - `"only_second"` : `max_length` 인자가 주어진 경우 그 길이에 맞춰 truncate한다. 만약 `max_length` 인자가 주어지지 않았다면 모델이 입력받을 수 있는 최대 길이(BERT의 경우 512)에 맞춰 truncate한다. 만약 `List[List[str]]` 형태로 입력이 들어온 경우 두 sentence 중 두 번째 sentence만 truncate한다.
    - `False` 혹은 `"do_not_truncate"`(default) : truncate하지 않는다.

# BertModel

BERT는 다양한 task에 대해 fine-tuning하여 사용할 수 있다. 특정 task에 대해 BERT를 fine-tuning하는 방법은 일반적으로 다음과 같다.

1. BERT 위에 해당 task를 위한 추가적인 layer를 쌓는다.
2. 이렇게 만들어진 모델을 추가 데이터로 학습시킨다.

이때 1번에서 쌓은 추가 layer를 head라 부른다. Huggingface에서는 다양한 task에서 BERT를 손쉽게 사용할 수 있도록 미리 다양한 종류의 head를 붙인 BERT를 제공한다. 예를 들어 extractive question answering task에 사용할 수 있도록 fully-connected layer head를 붙인 `BertForQuestionAnswering`, masked language modeling task에 사용할 수 있도록 MLM head(masked language modeling head)를 붙인 `BertForMaskedLM` 등이 있다.

Huggingface BERT가 어떻게 구현되어있는지 보기 위해 head가 없는 순수 BERT를 살펴보도록 하자. head 없는 순수 BERT는 Huggingface에서 `BertModel`이라는 이름으로 구현되어 있다. 다음과 같이 `BertModel.from_pretrained()` 메소드를 이용하면 사전학습된 BERT 모델과 그 가중치를 손쉽게 불러올 수 있다. 이때 `add_pooling_layer` 인자에 `False`를 주어 pooling layer가 자동으로 추가되는 것을 막았다(default: `True`).

{% highlight python %}
from transformers import BertModel

model = BertModel.from_pretrained("bert-base-uncased", add_pooling_layer=False)
{% endhighlight %}

위 명령어를 실행하면 다음과 같은 경고 문구가 뜰 것이다.

{% highlight text %}
Some weights of the model checkpoint at bert-base-uncased were not used when initializing BertModel: ['cls.predictions.transform.dense.weight', 'cls.predictions.transform.LayerNorm.weight', 'cls.predictions.transform.dense.bias', 'bert.pooler.dense.weight', 'cls.predictions.transform.LayerNorm.bias', 'cls.predictions.bias', 'cls.predictions.decoder.weight', 'bert.pooler.dense.bias', 'cls.seq_relationship.weight', 'cls.seq_relationship.bias']
{% endhighlight %}

이 경고는 `bert-base-uncased` 모델(정확히 말하면 checkpoint)의 가중치(weight)와 `BertModel`의 가중치가 완벽히 호환되지 않아, 괄호 안에 나열된 가중치들을 버렸다는 것을 알려주는 경고이다. 가중치 이름을 보면 알겠지만, 버려진 가중치들은 순수 BERT의 가중치가 아니라 (`cls`라는 이름의) head의 가중치이므로 무시해도 된다.

Huggingface의 BERT 모델은 약 108M개의 개의 파라미터로 이루어져 있다.

{% highlight python %}
model.num_parameters()
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
108891648
{% endhighlight %}

또 그 구조는 다음과 같다.

{% highlight python %}
model
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
BertModel(
  (embeddings): BertEmbeddings(
    (word_embeddings): Embedding(30522, 768, padding_idx=0)
    (position_embeddings): Embedding(512, 768)
    (token_type_embeddings): Embedding(2, 768)
    (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
    (dropout): Dropout(p=0.1, inplace=False)
  )
  (encoder): BertEncoder(
    (layer): ModuleList(
      (0): BertLayer(
        (attention): BertAttention(
          (self): BertSelfAttention(
            (query): Linear(in_features=768, out_features=768, bias=True)
            (key): Linear(in_features=768, out_features=768, bias=True)
            (value): Linear(in_features=768, out_features=768, bias=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
          (output): BertSelfOutput(
            (dense): Linear(in_features=768, out_features=768, bias=True)
            (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
        )
        (intermediate): BertIntermediate(
          (dense): Linear(in_features=768, out_features=3072, bias=True)
          (intermediate_act_fn): GELUActivation()
        )
        (output): BertOutput(
          (dense): Linear(in_features=3072, out_features=768, bias=True)
          (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
          (dropout): Dropout(p=0.1, inplace=False)
        )
      )
      (1): BertLayer(
        (attention): BertAttention(
          (self): BertSelfAttention(
            (query): Linear(in_features=768, out_features=768, bias=True)
            (key): Linear(in_features=768, out_features=768, bias=True)
            (value): Linear(in_features=768, out_features=768, bias=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
          (output): BertSelfOutput(
            (dense): Linear(in_features=768, out_features=768, bias=True)
            (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
        )
        (intermediate): BertIntermediate(
          (dense): Linear(in_features=768, out_features=3072, bias=True)
          (intermediate_act_fn): GELUActivation()
        )
        (output): BertOutput(
          (dense): Linear(in_features=3072, out_features=768, bias=True)
          (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
          (dropout): Dropout(p=0.1, inplace=False)
        )
      )
      (2): BertLayer(
        (attention): BertAttention(
          (self): BertSelfAttention(
            (query): Linear(in_features=768, out_features=768, bias=True)
            (key): Linear(in_features=768, out_features=768, bias=True)
            (value): Linear(in_features=768, out_features=768, bias=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
          (output): BertSelfOutput(
            (dense): Linear(in_features=768, out_features=768, bias=True)
            (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
        )
        (intermediate): BertIntermediate(
          (dense): Linear(in_features=768, out_features=3072, bias=True)
          (intermediate_act_fn): GELUActivation()
        )
        (output): BertOutput(
          (dense): Linear(in_features=3072, out_features=768, bias=True)
          (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
          (dropout): Dropout(p=0.1, inplace=False)
        )
      )
      ...(중략)...
      (11): BertLayer(
        (attention): BertAttention(
          (self): BertSelfAttention(
            (query): Linear(in_features=768, out_features=768, bias=True)
            (key): Linear(in_features=768, out_features=768, bias=True)
            (value): Linear(in_features=768, out_features=768, bias=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
          (output): BertSelfOutput(
            (dense): Linear(in_features=768, out_features=768, bias=True)
            (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
            (dropout): Dropout(p=0.1, inplace=False)
          )
        )
        (intermediate): BertIntermediate(
          (dense): Linear(in_features=768, out_features=3072, bias=True)
          (intermediate_act_fn): GELUActivation()
        )
        (output): BertOutput(
          (dense): Linear(in_features=3072, out_features=768, bias=True)
          (LayerNorm): LayerNorm((768,), eps=1e-12, elementwise_affine=True)
          (dropout): Dropout(p=0.1, inplace=False)
        )
      )
    )
  )
)
{% endhighlight %}

이제 이 `BertModel`이 실제로 어떻게 구현되어 있는지 알아보자. [Huggingface github](https://github.com/huggingface/transformers/blob/main/src/transformers/models/bert/modeling_bert.py)에서 `BertModel`의 구현 코드를 볼 수 있다.

{:.code-header}
BertModel

{% highlight python linenos %}
class BertModel(BertPreTrainedModel):
    """
    The model can behave as an encoder (with only self-attention) as well as a decoder, in which case a layer of
    cross-attention is added between the self-attention layers, following the architecture described in [Attention is
    all you need](https://arxiv.org/abs/1706.03762) by Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit,
    Llion Jones, Aidan N. Gomez, Lukasz Kaiser and Illia Polosukhin.
    To behave as an decoder the model needs to be initialized with the `is_decoder` argument of the configuration set
    to `True`. To be used in a Seq2Seq model, the model needs to initialized with both `is_decoder` argument and
    `add_cross_attention` set to `True`; an `encoder_hidden_states` is then expected as an input to the forward pass.
    """

    def __init__(self, config, add_pooling_layer=True):
        super().__init__(config)
        self.config = config

        self.embeddings = BertEmbeddings(config)
        self.encoder = BertEncoder(config)

        self.pooler = BertPooler(config) if add_pooling_layer else None

        # Initialize weights and apply final processing
        self.post_init()

    def get_input_embeddings(self):
        return self.embeddings.word_embeddings

    def set_input_embeddings(self, value):
        self.embeddings.word_embeddings = value

    def _prune_heads(self, heads_to_prune):
        """
        Prunes heads of the model. heads_to_prune: dict of {layer_num: list of heads to prune in this layer} See base
        class PreTrainedModel
        """
        for layer, heads in heads_to_prune.items():
            self.encoder.layer[layer].attention.prune_heads(heads)

    @add_start_docstrings_to_model_forward(BERT_INPUTS_DOCSTRING.format("batch_size, sequence_length"))
    @add_code_sample_docstrings(
        processor_class=_TOKENIZER_FOR_DOC,
        checkpoint=_CHECKPOINT_FOR_DOC,
        output_type=BaseModelOutputWithPoolingAndCrossAttentions,
        config_class=_CONFIG_FOR_DOC,
    )
    def forward(
        self,
        input_ids: Optional[torch.Tensor] = None,
        attention_mask: Optional[torch.Tensor] = None,
        token_type_ids: Optional[torch.Tensor] = None,
        position_ids: Optional[torch.Tensor] = None,
        head_mask: Optional[torch.Tensor] = None,
        inputs_embeds: Optional[torch.Tensor] = None,
        encoder_hidden_states: Optional[torch.Tensor] = None,
        encoder_attention_mask: Optional[torch.Tensor] = None,
        past_key_values: Optional[List[torch.FloatTensor]] = None,
        use_cache: Optional[bool] = None,
        output_attentions: Optional[bool] = None,
        output_hidden_states: Optional[bool] = None,
        return_dict: Optional[bool] = None,
    ) -> Union[Tuple[torch.Tensor], BaseModelOutputWithPoolingAndCrossAttentions]:
        r"""
        encoder_hidden_states  (`torch.FloatTensor` of shape `(batch_size, sequence_length, hidden_size)`, *optional*):
            Sequence of hidden-states at the output of the last layer of the encoder. Used in the cross-attention if
            the model is configured as a decoder.
        encoder_attention_mask (`torch.FloatTensor` of shape `(batch_size, sequence_length)`, *optional*):
            Mask to avoid performing attention on the padding token indices of the encoder input. This mask is used in
            the cross-attention if the model is configured as a decoder. Mask values selected in `[0, 1]`:
            - 1 for tokens that are **not masked**,
            - 0 for tokens that are **masked**.
        past_key_values (`tuple(tuple(torch.FloatTensor))` of length `config.n_layers` with each tuple having 4 tensors of shape `(batch_size, num_heads, sequence_length - 1, embed_size_per_head)`):
            Contains precomputed key and value hidden states of the attention blocks. Can be used to speed up decoding.
            If `past_key_values` are used, the user can optionally input only the last `decoder_input_ids` (those that
            don't have their past key value states given to this model) of shape `(batch_size, 1)` instead of all
            `decoder_input_ids` of shape `(batch_size, sequence_length)`.
        use_cache (`bool`, *optional*):
            If set to `True`, `past_key_values` key value states are returned and can be used to speed up decoding (see
            `past_key_values`).
        """
        output_attentions = output_attentions if output_attentions is not None else self.config.output_attentions
        output_hidden_states = (
            output_hidden_states if output_hidden_states is not None else self.config.output_hidden_states
        )
        return_dict = return_dict if return_dict is not None else self.config.use_return_dict

        if self.config.is_decoder:
            use_cache = use_cache if use_cache is not None else self.config.use_cache
        else:
            use_cache = False

        if input_ids is not None and inputs_embeds is not None:
            raise ValueError("You cannot specify both input_ids and inputs_embeds at the same time")
        elif input_ids is not None:
            input_shape = input_ids.size()
        elif inputs_embeds is not None:
            input_shape = inputs_embeds.size()[:-1]
        else:
            raise ValueError("You have to specify either input_ids or inputs_embeds")

        batch_size, seq_length = input_shape
        device = input_ids.device if input_ids is not None else inputs_embeds.device

        # past_key_values_length
        past_key_values_length = past_key_values[0][0].shape[2] if past_key_values is not None else 0

        if attention_mask is None:
            attention_mask = torch.ones(((batch_size, seq_length + past_key_values_length)), device=device)

        if token_type_ids is None:
            if hasattr(self.embeddings, "token_type_ids"):
                buffered_token_type_ids = self.embeddings.token_type_ids[:, :seq_length]
                buffered_token_type_ids_expanded = buffered_token_type_ids.expand(batch_size, seq_length)
                token_type_ids = buffered_token_type_ids_expanded
            else:
                token_type_ids = torch.zeros(input_shape, dtype=torch.long, device=device)

        # We can provide a self-attention mask of dimensions [batch_size, from_seq_length, to_seq_length]
        # ourselves in which case we just need to make it broadcastable to all heads.
        extended_attention_mask: torch.Tensor = self.get_extended_attention_mask(attention_mask, input_shape)

        # If a 2D or 3D attention mask is provided for the cross-attention
        # we need to make broadcastable to [batch_size, num_heads, seq_length, seq_length]
        if self.config.is_decoder and encoder_hidden_states is not None:
            encoder_batch_size, encoder_sequence_length, _ = encoder_hidden_states.size()
            encoder_hidden_shape = (encoder_batch_size, encoder_sequence_length)
            if encoder_attention_mask is None:
                encoder_attention_mask = torch.ones(encoder_hidden_shape, device=device)
            encoder_extended_attention_mask = self.invert_attention_mask(encoder_attention_mask)
        else:
            encoder_extended_attention_mask = None

        # Prepare head mask if needed
        # 1.0 in head_mask indicate we keep the head
        # attention_probs has shape bsz x n_heads x N x N
        # input head_mask has shape [num_heads] or [num_hidden_layers x num_heads]
        # and head_mask is converted to shape [num_hidden_layers x batch x num_heads x seq_length x seq_length]
        head_mask = self.get_head_mask(head_mask, self.config.num_hidden_layers)

        embedding_output = self.embeddings(
            input_ids=input_ids,
            position_ids=position_ids,
            token_type_ids=token_type_ids,
            inputs_embeds=inputs_embeds,
            past_key_values_length=past_key_values_length,
        )
        encoder_outputs = self.encoder(
            embedding_output,
            attention_mask=extended_attention_mask,
            head_mask=head_mask,
            encoder_hidden_states=encoder_hidden_states,
            encoder_attention_mask=encoder_extended_attention_mask,
            past_key_values=past_key_values,
            use_cache=use_cache,
            output_attentions=output_attentions,
            output_hidden_states=output_hidden_states,
            return_dict=return_dict,
        )
        sequence_output = encoder_outputs[0]
        pooled_output = self.pooler(sequence_output) if self.pooler is not None else None

        if not return_dict:
            return (sequence_output, pooled_output) + encoder_outputs[1:]

        return BaseModelOutputWithPoolingAndCrossAttentions(
            last_hidden_state=sequence_output,
            pooler_output=pooled_output,
            past_key_values=encoder_outputs.past_key_values,
            hidden_states=encoder_outputs.hidden_states,
            attentions=encoder_outputs.attentions,
            cross_attentions=encoder_outputs.cross_attentions,
        )
{% endhighlight %}

`BertModel`의 핵심 모듈은 `BertEmbeddings` 클래스로 만들어진 `embeddings` 모듈(line 16)과 `BertEncoder` 클래스로 만들어진 `encoder` 모듈(line 17)이다. (`BertPooler` 클래스로 만들어진 `pooler` 모듈도 있지만, `BertModel` 로드 시 `add_pooling_layer` 인자에 `False`를 줘서 로드했기에 동작하지 않는다. `BertPooler`에 대한 자세한 설명은 아래에서 확인할 수 있다.)

우선 `embeddings` 모듈은 입력된 정수 형태의 token id들을 embedding 형태로 변환하는 모듈이다. line 138 ~ 144를 보면 `embeddings` 모듈이 `input_ids`, `token_type_ids` 등의 입력 데이터들을 받아 `embedding_output`이라는 embedding을 반환하는 것을 볼 수 있다.

또 `encoder` 모듈은 `embeddings` 모듈이 만든 embedding을 문맥 정보가 반영된 embedding(contextual embedding)으로 변환하는 모듈이다. line 145 ~ 156을 보면 `encoder` 모듈이 `embeddings` 모듈의 출력값 `embedding_output`을 입력으로 받아 `encoder_output`이라는 출력값을 반환하는 것을 볼 수 있다.

각 모듈을 조금 더 자세히 알아보자. `BertEmbeddings`의 코드는 다음과 같다.

{:.code-header}
BertEmbeddings

{% highlight python linenos %}
class BertEmbeddings(nn.Module):
    """Construct the embeddings from word, position and token_type embeddings."""

    def __init__(self, config):
        super().__init__()
        self.word_embeddings = nn.Embedding(config.vocab_size, config.hidden_size, padding_idx=config.pad_token_id)
        self.position_embeddings = nn.Embedding(config.max_position_embeddings, config.hidden_size)
        self.token_type_embeddings = nn.Embedding(config.type_vocab_size, config.hidden_size)

        # self.LayerNorm is not snake-cased to stick with TensorFlow model variable name and be able to load
        # any TensorFlow checkpoint file
        self.LayerNorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        # position_ids (1, len position emb) is contiguous in memory and exported when serialized
        self.position_embedding_type = getattr(config, "position_embedding_type", "absolute")
        self.register_buffer("position_ids", torch.arange(config.max_position_embeddings).expand((1, -1)))
        if version.parse(torch.__version__) > version.parse("1.6.0"):
            self.register_buffer(
                "token_type_ids",
                torch.zeros(self.position_ids.size(), dtype=torch.long),
                persistent=False,
            )

    def forward(
        self,
        input_ids: Optional[torch.LongTensor] = None,
        token_type_ids: Optional[torch.LongTensor] = None,
        position_ids: Optional[torch.LongTensor] = None,
        inputs_embeds: Optional[torch.FloatTensor] = None,
        past_key_values_length: int = 0,
    ) -> torch.Tensor:
        if input_ids is not None:
            input_shape = input_ids.size()
        else:
            input_shape = inputs_embeds.size()[:-1]

        seq_length = input_shape[1]

        if position_ids is None:
            position_ids = self.position_ids[:, past_key_values_length : seq_length + past_key_values_length]

        # Setting the token_type_ids to the registered buffer in constructor where it is all zeros, which usually occurs
        # when its auto-generated, registered buffer helps users when tracing the model without passing token_type_ids, solves
        # issue #5664
        if token_type_ids is None:
            if hasattr(self, "token_type_ids"):
                buffered_token_type_ids = self.token_type_ids[:, :seq_length]
                buffered_token_type_ids_expanded = buffered_token_type_ids.expand(input_shape[0], seq_length)
                token_type_ids = buffered_token_type_ids_expanded
            else:
                token_type_ids = torch.zeros(input_shape, dtype=torch.long, device=self.position_ids.device)

        if inputs_embeds is None:
            inputs_embeds = self.word_embeddings(input_ids)
        token_type_embeddings = self.token_type_embeddings(token_type_ids)

        embeddings = inputs_embeds + token_type_embeddings
        if self.position_embedding_type == "absolute":
            position_embeddings = self.position_embeddings(position_ids)
            embeddings += position_embeddings
        embeddings = self.LayerNorm(embeddings)
        embeddings = self.dropout(embeddings)
        return embeddings
{% endhighlight %}

`BertEmbeddings`는 5개의 layer로 이루어져 있다. 이 중 첫 번째 layer인 `word_embeddings` layer는 입력된 정수 형태의 token id들을 `hidden_size` 크기의 벡터로 변환하는 layer로, `torch.nn.Embedding`을 이용해 구현되어 있다(line 6).

{% highlight python %}
model.embeddings.word_embeddings
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
Embedding(30522, 768, padding_idx=0)
{% endhighlight %}

여기서 30522는 BERT가 이해하고 있는 token의 총 개수(= vocabulary 크기)를 의미하고, 768은 `bert-base-uncased`에서 `hidden_size`의 크기를 의미한다. 즉 이 layer를 거치면 768차원의 embedding을 얻을 수 있다. 참고로 찾아보면 `hidden_size`라는 표현 대신 `emb_size`(embedding size) 또는 `d_model`(dimension of model)의 표현을 쓰는 문서도 있는데, 이 문서에서는 코드에 사용된 변수명을 따라 `hidden_size`라는 표현을 사용하도록 하겠다.

line 53, 54를 보면, `input_embeds`가 입력되지 않은 경우 `word_embeddings` layer를 이용해 `input_ids`를 `input_embeds`로 변환하고, `input_embeds`가 입력되었다면 이 값을 그대로 사용하는 것을 볼 수 있다.

두 번째 layer인 `position_embeddings` layer는 각 token의 위치 정보를 `hidden_size` 차원의 벡터 형태로 입력하는 layer로, 마찬가지로 `torch.nn.Embedding`을 이용해 구현되어 있다(line 7).

{% highlight python %}
model.embeddings.position_embeddings
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
Embedding(512, 768)
{% endhighlight %}

여기서 512는 BERT가 한 번에 받아들일 수 있는 최대 token 수를 의미하고, 768은 마찬가지로 `hidden_size`(출력되는 embedding의 차원)를 의미한다. line 39, 40을 보면, `position_ids`가 직접 입력되지 않은 경우 `past_key_values_length`(default: 0)부터 `seq_length + past_key_values_length`까지 token의 길이(`seq_length`)개의 정수를 `position_ids`로 삼는 것을 볼 수 있다. 그리고 line 59에서 `position_ids`를 인덱스로 하여 `model.embeddings.position_embeddings` layer로 `position_+embeddings`를 계산하는 것을 볼 수 있다. 이때 성능을 위해 line 16에서 `position_ids`를 BERT가 한 번에 받아들일 수 있는 최대 token 수까지 `torch.nn.Module.register_buffer`로 미리 만들어 놓은 것을 볼 수 있다.

참고로 token의 위치 정보를 입력하는 방법에는 positional encoding 방법과 positional embedding 방법이 있는데, 이 중 huggingface의 BERT는 positional embedding 방식을 사용한다. 두 방법의 차이에 대해서 조금 더 알고 싶다면 [이 문서](/ml-shorts/positional-encoding-vs-positional-embedding)를 참조하자.

세 번째 layer인 `token_type_embeddings`는 각 token의 타입 정보를 입력하는 layer로, 마찬가지로 `torch.nn.Embedding`을 이용해 구현되어 있다(line 8).

{% highlight python %}
model.embeddings.token_type_embeddings
{% endhighlight %}

{:.code-result.default-open}
{% highlight text %}
Embedding(2, 768)
{% endhighlight %}

여기서 2는 BERT가 받아들일 수 있는 sentence 개수(sentence A, sentence B)를 의미하고, 768은 마찬가지로 `hidden_size`(출력되는 embedding의 차원)를 의미한다. line 45 ~ 51을 보면, `token_type_ids`가 직접 입력되지 않은 경우 디폴트로 모든 값이 0으로 채워진 `token_type_ids`를 만들어 사용한다는 것을 볼 수 있다.

그리고 line 57 ~ 60에서 위 3개의 layer에서 만들어진 embedding들(`word_embeddings`, `position_embeddings`, `token_type_embeddings`)을 모두 합쳐서 `embeddings`라는 embedding을 만드는 것을 볼 수 있다. `word_embeddings`, `position_embeddings`, `token_type_embeddings`들은 모두 크기가 같은(`hidden_size`) 벡터들이므로, 이들을 더해서 만들어진 `embeddings` 역시 `hidden_size` 크기의 벡터이다. 그리고 line 61, 62에서 이 `embeddings`를 layer normalization layer(`torch.nn.LayerNorm`)와 dropout layer(`torch.nn.Dropout`)에 순차적으로 통과시켜 최종 embedding을 만드는 것을 볼 수 있다.

{% include caption-img.html src="huggingface-bert-bertembeddings.png" title="Fig.01 BertEmbeddings" description="Huggingface BERT의 embeddings 모듈은 token들의 embedding(<code class='language-plaintext highlighter-rouge'>word_embeddings</code>)과 segment embedding(<code class='language-plaintext highlighter-rouge'>token_type_embeddings</code>), 그리고 position embeddings(<code class='language-plaintext highlighter-rouge'>position_embeddings</code>)을 모두 합쳐 encoder 모듈로의 입력 embedding을 만든다.<br/>이미지 출처 : <a href='https://arxiv.org/abs/1810.04805'>BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (2019, Delvin et el.)</a>" %}

이번에는 `BertEncoder`의 코드를 살펴보자.

{:.code-header}
BertEncoder

{% highlight python linenos %}
class BertEncoder(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.layer = nn.ModuleList([BertLayer(config) for _ in range(config.num_hidden_layers)])
        self.gradient_checkpointing = False

    def forward(
        self,
        hidden_states: torch.Tensor,
        attention_mask: Optional[torch.FloatTensor] = None,
        head_mask: Optional[torch.FloatTensor] = None,
        encoder_hidden_states: Optional[torch.FloatTensor] = None,
        encoder_attention_mask: Optional[torch.FloatTensor] = None,
        past_key_values: Optional[Tuple[Tuple[torch.FloatTensor]]] = None,
        use_cache: Optional[bool] = None,
        output_attentions: Optional[bool] = False,
        output_hidden_states: Optional[bool] = False,
        return_dict: Optional[bool] = True,
    ) -> Union[Tuple[torch.Tensor], BaseModelOutputWithPastAndCrossAttentions]:
        all_hidden_states = () if output_hidden_states else None
        all_self_attentions = () if output_attentions else None
        all_cross_attentions = () if output_attentions and self.config.add_cross_attention else None

        next_decoder_cache = () if use_cache else None
        for i, layer_module in enumerate(self.layer):
            if output_hidden_states:
                all_hidden_states = all_hidden_states + (hidden_states,)

            layer_head_mask = head_mask[i] if head_mask is not None else None
            past_key_value = past_key_values[i] if past_key_values is not None else None

            if self.gradient_checkpointing and self.training:

                if use_cache:
                    logger.warning(
                        "`use_cache=True` is incompatible with gradient checkpointing. Setting `use_cache=False`..."
                    )
                    use_cache = False

                def create_custom_forward(module):
                    def custom_forward(*inputs):
                        return module(*inputs, past_key_value, output_attentions)

                    return custom_forward

                layer_outputs = torch.utils.checkpoint.checkpoint(
                    create_custom_forward(layer_module),
                    hidden_states,
                    attention_mask,
                    layer_head_mask,
                    encoder_hidden_states,
                    encoder_attention_mask,
                )
            else:
                layer_outputs = layer_module(
                    hidden_states,
                    attention_mask,
                    layer_head_mask,
                    encoder_hidden_states,
                    encoder_attention_mask,
                    past_key_value,
                    output_attentions,
                )

            hidden_states = layer_outputs[0]
            if use_cache:
                next_decoder_cache += (layer_outputs[-1],)
            if output_attentions:
                all_self_attentions = all_self_attentions + (layer_outputs[1],)
                if self.config.add_cross_attention:
                    all_cross_attentions = all_cross_attentions + (layer_outputs[2],)

        if output_hidden_states:
            all_hidden_states = all_hidden_states + (hidden_states,)

        if not return_dict:
            return tuple(
                v
                for v in [
                    hidden_states,
                    next_decoder_cache,
                    all_hidden_states,
                    all_self_attentions,
                    all_cross_attentions,
                ]
                if v is not None
            )
        return BaseModelOutputWithPastAndCrossAttentions(
            last_hidden_state=hidden_states,
            past_key_values=next_decoder_cache,
            hidden_states=all_hidden_states,
            attentions=all_self_attentions,
            cross_attentions=all_cross_attentions,
        )

{% endhighlight %}

우선 line 5에서 `layer`라는 이름으로 `BertLayer` 모듈이 `torch.nn.ModuleList`로 `config.num_hidden_layers`개(`bert-base-uncased`의 경우 12개) 쌓여 있는 것을 볼 수 있다.

{% include caption-img.html src="huggingface-bert-bertencoder.png" title="Fig.02 BertEncoder" description="Huggingface BERT의 encoder(파란색)는 BertLayer(노란색, 연두색 각 줄)가 여러 줄 쌓여 있는 것이다.<br/>이미지 출처 : <a href='https://arxiv.org/abs/1810.04805'>BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (2019, Delvin et el.)</a>" %}

그리고 line 26 ~ 72에서 이들 `BertLayer`를 하나씩 사용하고 있는 것을 볼 수 있다.

뒤에 자세히 설명하겠지만, `BertLayer`의 출력값 `layer_output`은 hidden states(`hidden_states`), self attention, cross attention들을 순서대로 포함하고 있다. 즉 line 66, 70, 72에서의 `layer_output[0]`, `layer_output[1]`, `layer_output[2]`는 각각 해당 `BertLayer`의 hidden states, self attention, cross attention을 의미한다.

line 47 ~ 54, line 56 ~ 64를 보면, 이전 `BertLayer`의 hidden states(`hidden_states`)는 현재 `BertLayer`에 입력으로 들어가 계속 업데이트되는 것을(= 조금 더 좋은 embedding이 되어 가고 있는 것을) 볼 수 있다. 그리고 (`output_hidden_states`가 `True`인 경우) 각 `BertLayer`의 hidden states(`hidden_states`)는 `all_hidden_states` 뒤에(line 74, 75), (`output_attention`이 `True`인 경우) 각 `BertLayer`의 self attention은 `all_self_attentions` 뒤에(line 69, 70) 계속 추가되어 저장된다.

이번엔 `BertLayer`의 코드를 살펴보자.

{:.code-header}
BertLayer

{% highlight python linenos %}
class BertLayer(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.chunk_size_feed_forward = config.chunk_size_feed_forward
        self.seq_len_dim = 1
        self.attention = BertAttention(config)
        self.is_decoder = config.is_decoder
        self.add_cross_attention = config.add_cross_attention
        if self.add_cross_attention:
            if not self.is_decoder:
                raise ValueError(f"{self} should be used as a decoder model if cross attention is added")
            self.crossattention = BertAttention(config, position_embedding_type="absolute")
        self.intermediate = BertIntermediate(config)
        self.output = BertOutput(config)

    def forward(
        self,
        hidden_states: torch.Tensor,
        attention_mask: Optional[torch.FloatTensor] = None,
        head_mask: Optional[torch.FloatTensor] = None,
        encoder_hidden_states: Optional[torch.FloatTensor] = None,
        encoder_attention_mask: Optional[torch.FloatTensor] = None,
        past_key_value: Optional[Tuple[Tuple[torch.FloatTensor]]] = None,
        output_attentions: Optional[bool] = False,
    ) -> Tuple[torch.Tensor]:
        # decoder uni-directional self-attention cached key/values tuple is at positions 1,2
        self_attn_past_key_value = past_key_value[:2] if past_key_value is not None else None
        self_attention_outputs = self.attention(
            hidden_states,
            attention_mask,
            head_mask,
            output_attentions=output_attentions,
            past_key_value=self_attn_past_key_value,
        )
        attention_output = self_attention_outputs[0]

        # if decoder, the last output is tuple of self-attn cache
        if self.is_decoder:
            outputs = self_attention_outputs[1:-1]
            present_key_value = self_attention_outputs[-1]
        else:
            outputs = self_attention_outputs[1:]  # add self attentions if we output attention weights

        cross_attn_present_key_value = None
        if self.is_decoder and encoder_hidden_states is not None:
            if not hasattr(self, "crossattention"):
                raise ValueError(
                    f"If `encoder_hidden_states` are passed, {self} has to be instantiated with cross-attention layers"
                    " by setting `config.add_cross_attention=True`"
                )

            # cross_attn cached key/values tuple is at positions 3,4 of past_key_value tuple
            cross_attn_past_key_value = past_key_value[-2:] if past_key_value is not None else None
            cross_attention_outputs = self.crossattention(
                attention_output,
                attention_mask,
                head_mask,
                encoder_hidden_states,
                encoder_attention_mask,
                cross_attn_past_key_value,
                output_attentions,
            )
            attention_output = cross_attention_outputs[0]
            outputs = outputs + cross_attention_outputs[1:-1]  # add cross attentions if we output attention weights

            # add cross-attn cache to positions 3,4 of present_key_value tuple
            cross_attn_present_key_value = cross_attention_outputs[-1]
            present_key_value = present_key_value + cross_attn_present_key_value

        layer_output = apply_chunking_to_forward(
            self.feed_forward_chunk, self.chunk_size_feed_forward, self.seq_len_dim, attention_output
        )
        outputs = (layer_output,) + outputs

        # if decoder, return the attn key/values as the last output
        if self.is_decoder:
            outputs = outputs + (present_key_value,)

        return outputs

    def feed_forward_chunk(self, attention_output):
        intermediate_output = self.intermediate(attention_output)
        layer_output = self.output(intermediate_output, attention_output)
        return layer_output
{% endhighlight %}

{% include caption-img.html src="huggingface-bert-bertlayer-transformer.png" title="Fig.03 Transformer" description="이 그림은 Transformer의 구조를 나타낸 그림으로, BERT는 Transformer의 encoder 부분만을 가져와 만든 것이다. 이때 <code class='language-plaintext highlighter-rouge'>BertLayer</code>는 왼쪽 encoder의 (N번 반복된다는) 사각형 하나를 의미한다. <code class='language-plaintext highlighter-rouge'>attention</code> 모듈은 위 그림에서 주황색 multi-head attention 블록을 의미하고 <code class='language-plaintext highlighter-rouge'>intermediate</code> 모듈은 파란색 feed-forward 블록을 의미한다.<br/>이미지 출처 : <a href='https://arxiv.org/abs/1706.03762'>Attention Is All You Need (2017, Vaswani et el.)</a>" %}

위 그림은 Transformer 논문([Attention Is All You Need (2017, Vaswani et el.)](https://arxiv.org/abs/1706.03762))에서 가지고 온 것인데, 모두 알고 있다시피 BERT는 Transformer의 encoder-decoder 구조 중 encoder 부분만을 가져와 만든 것이다. 이때 `BertLayer`는 왼쪽 encoder의 (N번 반복된다는) 사각형 하나를 의미한다.

`BertLayer` 코드를 보면 `BertLayer`는 `BertAttention` 클래스로 만들어진 `attention` 모듈과(line 6), `BertIntermediate` 클래스로 만들어진 `intermediate` 모듈(line 13), 그리고 `BertOutput` 클래스로 만들어진 `output` 모듈(line 14)로 이루어진 것을 볼 수 있는데, `attention` 모듈은 위 그림에서 주황색 "Multi-Head Attention" 블록(과 바로 다음의 노란색 "Add & Norm" 블록)을 의미하고, `intermediate` 모듈은 파란색 "Feed Forward" 블록을, 그리고 `output` 모듈은 "Feed Forward" 블록 바로 뒤에 있는 노란색 "Add & Norm" 블록을 의미한다.

하나씩 확인해보자. 우선 `BertAttention`의 코드는 다음과 같다.

{:.code-header}
BertAttention

{% highlight python linenos %}
class BertAttention(nn.Module):
    def __init__(self, config, position_embedding_type=None):
        super().__init__()
        self.self = BertSelfAttention(config, position_embedding_type=position_embedding_type)
        self.output = BertSelfOutput(config)
        self.pruned_heads = set()

    def prune_heads(self, heads):
        if len(heads) == 0:
            return
        heads, index = find_pruneable_heads_and_indices(
            heads, self.self.num_attention_heads, self.self.attention_head_size, self.pruned_heads
        )

        # Prune linear layers
        self.self.query = prune_linear_layer(self.self.query, index)
        self.self.key = prune_linear_layer(self.self.key, index)
        self.self.value = prune_linear_layer(self.self.value, index)
        self.output.dense = prune_linear_layer(self.output.dense, index, dim=1)

        # Update hyper params and store pruned heads
        self.self.num_attention_heads = self.self.num_attention_heads - len(heads)
        self.self.all_head_size = self.self.attention_head_size * self.self.num_attention_heads
        self.pruned_heads = self.pruned_heads.union(heads)

    def forward(
        self,
        hidden_states: torch.Tensor,
        attention_mask: Optional[torch.FloatTensor] = None,
        head_mask: Optional[torch.FloatTensor] = None,
        encoder_hidden_states: Optional[torch.FloatTensor] = None,
        encoder_attention_mask: Optional[torch.FloatTensor] = None,
        past_key_value: Optional[Tuple[Tuple[torch.FloatTensor]]] = None,
        output_attentions: Optional[bool] = False,
    ) -> Tuple[torch.Tensor]:
        self_outputs = self.self(
            hidden_states,
            attention_mask,
            head_mask,
            encoder_hidden_states,
            encoder_attention_mask,
            past_key_value,
            output_attentions,
        )
        attention_output = self.output(self_outputs[0], hidden_states)
        outputs = (attention_output,) + self_outputs[1:]  # add attentions if we output them
        return outputs
{% endhighlight %}

`BertAttention` 모듈은 `BertSelfAttention` 클래스로 만들어진 `self` 모듈(line 4)과 `BertSelfOutput` 클래스로 만들어진 `output` 모듈로 구성되어 있다. `self` 모듈은 multi-head self attention 연산을 수행하는 모듈이고(Fig.03의 주황색 블록), `output` 모듈은 layer normalization 연산을 수행하는 모듈이다(Fig.03의 노란색 블록).

`BertAttention`이 하는 일은 아주 간단하다. 입력된 `hidden_states`에 대해 `self` 모듈을 불러 multi-head self attention 연산을 수행하고(line 36 ~ 44), 그 결과와 원본 `hidden_states`를 가지고(즉 일종의 residual connection을 만드는 것이다) layer normalization을 수행하여(line 45) 반환한다.

`BertSelfAttention`의 코드는 다음과 같다.

{:.code-header}
BertSelfAttention

{% highlight python linenos %}
class BertSelfAttention(nn.Module):
    def __init__(self, config, position_embedding_type=None):
        super().__init__()
        if config.hidden_size % config.num_attention_heads != 0 and not hasattr(config, "embedding_size"):
            raise ValueError(
                f"The hidden size ({config.hidden_size}) is not a multiple of the number of attention "
                f"heads ({config.num_attention_heads})"
            )

        self.num_attention_heads = config.num_attention_heads
        self.attention_head_size = int(config.hidden_size / config.num_attention_heads)
        self.all_head_size = self.num_attention_heads * self.attention_head_size

        self.query = nn.Linear(config.hidden_size, self.all_head_size)
        self.key = nn.Linear(config.hidden_size, self.all_head_size)
        self.value = nn.Linear(config.hidden_size, self.all_head_size)

        self.dropout = nn.Dropout(config.attention_probs_dropout_prob)
        self.position_embedding_type = position_embedding_type or getattr(
            config, "position_embedding_type", "absolute"
        )
        if self.position_embedding_type == "relative_key" or self.position_embedding_type == "relative_key_query":
            self.max_position_embeddings = config.max_position_embeddings
            self.distance_embedding = nn.Embedding(2 * config.max_position_embeddings - 1, self.attention_head_size)

        self.is_decoder = config.is_decoder

    def transpose_for_scores(self, x: torch.Tensor) -> torch.Tensor:
        new_x_shape = x.size()[:-1] + (self.num_attention_heads, self.attention_head_size)
        x = x.view(new_x_shape)
        return x.permute(0, 2, 1, 3)

    def forward(
        self,
        hidden_states: torch.Tensor,
        attention_mask: Optional[torch.FloatTensor] = None,
        head_mask: Optional[torch.FloatTensor] = None,
        encoder_hidden_states: Optional[torch.FloatTensor] = None,
        encoder_attention_mask: Optional[torch.FloatTensor] = None,
        past_key_value: Optional[Tuple[Tuple[torch.FloatTensor]]] = None,
        output_attentions: Optional[bool] = False,
    ) -> Tuple[torch.Tensor]:
        mixed_query_layer = self.query(hidden_states)

        # If this is instantiated as a cross-attention module, the keys
        # and values come from an encoder; the attention mask needs to be
        # such that the encoder's padding tokens are not attended to.
        is_cross_attention = encoder_hidden_states is not None

        if is_cross_attention and past_key_value is not None:
            # reuse k,v, cross_attentions
            key_layer = past_key_value[0]
            value_layer = past_key_value[1]
            attention_mask = encoder_attention_mask
        elif is_cross_attention:
            key_layer = self.transpose_for_scores(self.key(encoder_hidden_states))
            value_layer = self.transpose_for_scores(self.value(encoder_hidden_states))
            attention_mask = encoder_attention_mask
        elif past_key_value is not None:
            key_layer = self.transpose_for_scores(self.key(hidden_states))
            value_layer = self.transpose_for_scores(self.value(hidden_states))
            key_layer = torch.cat([past_key_value[0], key_layer], dim=2)
            value_layer = torch.cat([past_key_value[1], value_layer], dim=2)
        else:
            key_layer = self.transpose_for_scores(self.key(hidden_states))
            value_layer = self.transpose_for_scores(self.value(hidden_states))

        query_layer = self.transpose_for_scores(mixed_query_layer)

        if self.is_decoder:
            # if cross_attention save Tuple(torch.Tensor, torch.Tensor) of all cross attention key/value_states.
            # Further calls to cross_attention layer can then reuse all cross-attention
            # key/value_states (first "if" case)
            # if uni-directional self-attention (decoder) save Tuple(torch.Tensor, torch.Tensor) of
            # all previous decoder key/value_states. Further calls to uni-directional self-attention
            # can concat previous decoder key/value_states to current projected key/value_states (third "elif" case)
            # if encoder bi-directional self-attention `past_key_value` is always `None`
            past_key_value = (key_layer, value_layer)

        # Take the dot product between "query" and "key" to get the raw attention scores.
        attention_scores = torch.matmul(query_layer, key_layer.transpose(-1, -2))

        if self.position_embedding_type == "relative_key" or self.position_embedding_type == "relative_key_query":
            seq_length = hidden_states.size()[1]
            position_ids_l = torch.arange(seq_length, dtype=torch.long, device=hidden_states.device).view(-1, 1)
            position_ids_r = torch.arange(seq_length, dtype=torch.long, device=hidden_states.device).view(1, -1)
            distance = position_ids_l - position_ids_r
            positional_embedding = self.distance_embedding(distance + self.max_position_embeddings - 1)
            positional_embedding = positional_embedding.to(dtype=query_layer.dtype)  # fp16 compatibility

            if self.position_embedding_type == "relative_key":
                relative_position_scores = torch.einsum("bhld,lrd->bhlr", query_layer, positional_embedding)
                attention_scores = attention_scores + relative_position_scores
            elif self.position_embedding_type == "relative_key_query":
                relative_position_scores_query = torch.einsum("bhld,lrd->bhlr", query_layer, positional_embedding)
                relative_position_scores_key = torch.einsum("bhrd,lrd->bhlr", key_layer, positional_embedding)
                attention_scores = attention_scores + relative_position_scores_query + relative_position_scores_key

        attention_scores = attention_scores / math.sqrt(self.attention_head_size)
        if attention_mask is not None:
            # Apply the attention mask is (precomputed for all layers in BertModel forward() function)
            attention_scores = attention_scores + attention_mask

        # Normalize the attention scores to probabilities.
        attention_probs = nn.functional.softmax(attention_scores, dim=-1)

        # This is actually dropping out entire tokens to attend to, which might
        # seem a bit unusual, but is taken from the original Transformer paper.
        attention_probs = self.dropout(attention_probs)

        # Mask heads if we want to
        if head_mask is not None:
            attention_probs = attention_probs * head_mask

        context_layer = torch.matmul(attention_probs, value_layer)

        context_layer = context_layer.permute(0, 2, 1, 3).contiguous()
        new_context_layer_shape = context_layer.size()[:-2] + (self.all_head_size,)
        context_layer = context_layer.view(new_context_layer_shape)

        outputs = (context_layer, attention_probs) if output_attentions else (context_layer,)

        if self.is_decoder:
            outputs = outputs + (past_key_value,)
        return outputs
{% endhighlight %}

`BertSelfAttention` 모듈은 BERT의 가장 핵심적인 연산인 multi-head self attention 연산을 수행하는 모듈이다. BERT의 multi-head self attention을 수식으로 나타내면 다음과 같다.

{:.mathjax-mb-0}
$$\text{MultiHead}(Q,\,K,\,V) = \text{Concat}(\text{head}_1,\,...,\,\text{head}_h)W^O$$

{:.mathjax-mb-0}
$$\text{where}$$

{:.mathjax-m-0}
$$\text{head}_i = \text{Attention}(QW_i^Q,\,KW_i^K,\,VW_i^V)$$

{:.mathjax-mt-0}
$$\text{Attention}(Q,\,K,\,V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$$

{% include caption-img.html src="huggingface-bert-bertselfattention-attention.png" title="Fig.04 Multi-head, Scaled Dot Product Self Attention" description="BERT가 사용하는 multi-head, scaled dot product self attention의 구조를 도식화하면 위와 같다.<br/>이미지 출처 : <a href='https://arxiv.org/abs/1706.03762'>Attention Is All You Need (2017, Vaswani et el.)</a>" %}

(multi-head self attention 연산 자체에 대한 조금 더 자세한 설명은 [본 블로그의 다른 문서](/nlp/attention)을 참조하기 바란다.)

`BertSelfAttention` 모듈은 우선 크기 `(batch_size, sequence_length, hidden_size)`의 `hidden_states` $X$를 입력으로 받는다. `bert-base-uncased`의 경우, `hidden_size`의 값은 768이므로 $X$의 크기는 `(batch_size, sequence_length, 768)`이다.

그럼 이 $X$를 `torch.nn.Linear`로 구현된 `query` layer, `key` layer, `value` layer에 넣어 query $Q$, key $K$, value $V$를 각각 얻는다(line 43, 65, 66).

{:.mathjax-mb-0}
$$Q = X W^Q$$

{:.mathjax-m-0}
$$K = X W^K$$

{:.mathjax-mt-0}
$$V = X W^V$$

단, $W^Q$, $W^K$, $W^V$는 크기 `(hidden_size, hidden_size)`인 가중치 배열이다. 그리고 $Q$, $K$, $V$의 크기는 모두 `(batch_size, sequence_length, hidden_size)`이다. `bert-base-uncased`의 경우, `hidden_size`의 크기가 768이기에, $W^Q$, $W^K$, $W^V$의 크기는 `(768, 768)`이 되고, $Q$, $K$, $V$의 크기는 `(batch_size, sequence_length, 768)`이 된다.

이제 multi-head attention 연산을 위해 $Q$, $K$, $V$를 `num_attention_heads`개로 나눈다(line 68, 65, 66). Huggingface BERT에서는 이를 위해 `BertSelfAttention.transpose_for_scores()` 메소드를 사용한다. 이 메소드는 3차원의 크기 `(batch_size, sequence_length, hidden_size)`인 텐서를 4차원의 크기 `(batch_size, num_attention_heads, sequence_length, hidden_size / num_attention_heads)`인 텐서로 변환한다. `bert-base-uncased`의 경우 `num_attention_heads`의 값은 12이므로 $Q$, $K$, $V$는 크기 `(batch_size, 12, sequence_length, 64)`의 텐서로 변환된다.

그리고 $Q$와 $K$ 간에 scaled dot product attention score $e$(`attention_scores`)를 계산한다(line 81, line 99).
   
$$e = \frac{Q K^T}{\sqrt{d_k}}$$

여기서 $d\_k$는 `hidden_size / num_attention_heads`이다. 코드에서 이 연산은 `torch.matmul()` 함수를 이용해 구현되어 있다. 이렇게 계산된 $e$는 크기 `(batch_size, num_attention_heads, sequence_length, sequence_length)`의 텐서가 된다. `bert-base-uncased`의 경우 $d\_k$는 64이고 $e$의 크기는 `(batch_size, 12, sequence_length, sequence_length)`가 된다.

그리고 attention mask를 이용, attention 연산이 수행되지 말아야 할 token들에 대해 masking 처리를 한다(line 100 ~ 102). 코드를 보면 attention score(`attention_scores`)와 attention mask(`attention_mask`)를 단순히 더하는 방식으로 구현되어 있는 것을 볼 수 있는데, 일단 여기서의 attention mask는 tokenizer가 만든, 0과 1로 이루어진 배열이 아니다. 이 attention mask는 `BertModel`의 line 118에서 `get_extended_attention_mask` 메소드로 가공된 `extended_attention_mask`이다(`BertModel` line 147). `get_extended_attention_mask` 메소드는 `PreTrainedModel`로부터 상속받은 메소드로, 다음과 같이 구현되어 있다.

{:.code-header}
get_extended_attention_mask (from [transformers/src/transformers/modeling_utils.py](https://github.com/huggingface/transformers/blob/main/src/transformers/modeling_utils.py))

{% highlight python linenos %}
def get_extended_attention_mask(
    self, attention_mask: Tensor, input_shape: Tuple[int], device: device = None, dtype: torch.float = None
) -> Tensor:
    """
    Makes broadcastable attention and causal masks so that future and masked tokens are ignored.
    Arguments:
        attention_mask (`torch.Tensor`):
            Mask with ones indicating tokens to attend to, zeros for tokens to ignore.
        input_shape (`Tuple[int]`):
            The shape of the input to the model.
    Returns:
        `torch.Tensor` The extended attention mask, with a the same dtype as `attention_mask.dtype`.
    """
    if dtype is None:
        dtype = self.dtype

    if not (attention_mask.dim() == 2 and self.config.is_decoder):
        # show warning only if it won't be shown in `create_extended_attention_mask_for_decoder`
        if device is not None:
            warnings.warn(
                "The `device` argument is deprecated and will be removed in v5 of Transformers.", FutureWarning
            )
    # We can provide a self-attention mask of dimensions [batch_size, from_seq_length, to_seq_length]
    # ourselves in which case we just need to make it broadcastable to all heads.
    if attention_mask.dim() == 3:
        extended_attention_mask = attention_mask[:, None, :, :]
    elif attention_mask.dim() == 2:
        # Provided a padding mask of dimensions [batch_size, seq_length]
        # - if the model is a decoder, apply a causal mask in addition to the padding mask
        # - if the model is an encoder, make the mask broadcastable to [batch_size, num_heads, seq_length, seq_length]
        if self.config.is_decoder:
            extended_attention_mask = ModuleUtilsMixin.create_extended_attention_mask_for_decoder(
                input_shape, attention_mask, device
            )
        else:
            extended_attention_mask = attention_mask[:, None, None, :]
    else:
        raise ValueError(
            f"Wrong shape for input_ids (shape {input_shape}) or attention_mask (shape {attention_mask.shape})"
        )

    # Since attention_mask is 1.0 for positions we want to attend and 0.0 for
    # masked positions, this operation will create a tensor which is 0.0 for
    # positions we want to attend and -10000.0 for masked positions.
    # Since we are adding it to the raw scores before the softmax, this is
    # effectively the same as removing these entirely.
    extended_attention_mask = extended_attention_mask.to(dtype=dtype)  # fp16 compatibility
    extended_attention_mask = (1.0 - extended_attention_mask) * torch.finfo(dtype).min
    return extended_attention_mask
{% endhighlight %}

보다시피 `get_extended_attention_mask` 메소드는 tokenizer가 만든 0과 1로 이루어진 attention mask를 입력받아 적절히 차원을 맞추고(line 36), 0이 입력된 곳에는 `torch.finfo(dtype).min`을, 1이 입력된 곳에는 0을 넣은 `extended_attention_mask`를 생성하여(line 48) 반환하는 메소드이다. `torch.finfo(dtype).min`은 모델이 다루는 데이터 타입(`dtype`)에서 표현할 수 있는 가장 작은 값을 나타내는 값이다. 사실상 음의 무한대(-∞)를 의미한다고 보면 된다. `bert-base-uncased`의 경우 `dtype`은 `torch.float32`이고, `torch.finfo(dtype).min`의 값은 -3.4028234663852886e+38이다. `torch.finfo(dtype).min`이 더해진 값에 후술할 softmax 연산을 수행하면 그 값은 너무 작기에 모두 0으로 죽는다. 즉, masking이 되는 것이다.

다시 `BertSelfAttention` 구현으로 돌아가서, 이제 이렇게 masking된 attention score에 softmax 연산을 적용해 attention distribution $\alpha$(`attention_probs`)를 얻는다(line 105).

$$\alpha = \text{softmax}(e)$$

그리고 $\alpha$와 $V$로부터 attention value $a$(`context_layer`)를 계산한다(line 115).

$$a = \alpha V$$

이 연산도 `torch.matmul()`을 이용하는 방식으로 구현되어 있다. 이렇게 계산된 $a$는 크기 `(batch_size, num_attention_heads, sequence_length, hidden_size / num_attention_heads)`인 텐서가 된다. `bert-base-uncased`의 경우 attention value는 `(batch_size, 12, sequence_length, 64)`의 텐서가 된다.

이렇게 각 attention head에서 attention 연산이 끝났으면 각 attention head의 attention value들을 다시 합친다(concatenate)(line 117 ~ 119). 여기까지 하면 최종 결과는 `(batch_size, sequence_length, hidden_size)` 크기의 텐서가 된다.

그리고 이 텐서에 마지막으로 크기 `(hidden_size, hidden_size)`의 $W^O$ 가중치 행렬을 곱해주는 linear 연산을 해야 하는데, (왜 이렇게 구현되어 있는지 잘은 모르겠지만) 이 연산은 `BertSelfOutput` 모듈에서 진행된다. 

`BertSelfOutput`의 코드는 다음과 같다.

{:.code-header}
BertSelfOutput

{% highlight python linenos %}
class BertSelfOutput(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.hidden_size)
        self.LayerNorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)

    def forward(self, hidden_states: torch.Tensor, input_tensor: torch.Tensor) -> torch.Tensor:
        hidden_states = self.dense(hidden_states)
        hidden_states = self.dropout(hidden_states)
        hidden_states = self.LayerNorm(hidden_states + input_tensor)
        return hidden_states
{% endhighlight %}

multi-head self attention 연산 후 얻어진 `hidden_states`에 대해, 우선 `torch.nn.Linear`로 구현된, $W^O$를 곱해주는 `dense` layer를 한 번 거친다(line 9). `dense` layer는 `hidden_states`의 크기를 바꾸지 않고 동일하게 `(batch_size, sequence_length, hidden_size)`로 유지한다.

그리고 그 결과는 `input_tensor`라는 이름의 인자로 받는, multi-head self attention 연산을 수행하기 전의 원본 `hidden_states`와 더해져(residual connection) layer normalization(line 11)이 수행된다.

이제 `BertLayer`를 구성하는 또다른 모듈인 `BertIntermediate` 모듈을 살펴보자.

{:.code-header}
BertIntermediate

{% highlight python linenos %}
class BertIntermediate(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.intermediate_size)
        if isinstance(config.hidden_act, str):
            self.intermediate_act_fn = ACT2FN[config.hidden_act]
        else:
            self.intermediate_act_fn = config.hidden_act

    def forward(self, hidden_states: torch.Tensor) -> torch.Tensor:
        hidden_states = self.dense(hidden_states)
        hidden_states = self.intermediate_act_fn(hidden_states)
        return hidden_states
{% endhighlight %}

상술했듯이 `BertIntermediate` 모듈은 Fig.03의 "Feed Forward" 블록을 의미한다. 이 블록은 linear 연산 이후 activation 함수를 적용하고 다시 linear 연산을 수행하는, 상당히 전통적인 feed forward 연산을 의미한다.

$$FFN(x) = \text{activation}(xW_1 + b_1)W_2 + b_2$$

그에 따라 `BertIntermediate`에는 `torch.nn.Linear`로 구현된 `dense` layer가 있다(line 4, 11). 크기 `(batch_size, sequence_length, hidden_size)`였던 `hidden_states`는 `dense` layer를 거치면 `(batch_size, sequence_length, intermediate_size)` 크기의 텐서가 된다. `bert-base-uncased`에서는 `intermediate_size`의 값으로 `hidden_size`의 4배인 3072를 사용한다.

그리고 그 결과에 activation 함수인 `hidden_act` 함수를 적용한다(line 5 ~ 8, 12). 참고로 원래 Transformer 모델에서는 `hidden_act` 함수로 ReLU를 사용하지만, BERT에서는 GeLU를 사용한다. 논문에서는 그 이유로 GPT와의 성능 비교를 위해 GPT가 사용한 GeLU를 사용했다고 밝혔다.

그리고 마지막으로 한번 더 linear 연산을 해야 하는데, (이번에도 이유는 모르겠지만) 이 연산은 `BertOutput`에 구현되어 있다.

`BertLayer`를 구성하는 마지막 모듈인 `BertOutput` 모듈의 코드는 다음과 같다.

{:.code-header}
BertOutput

{% highlight python linenos %}
class BertOutput(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.intermediate_size, config.hidden_size)
        self.LayerNorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)

    def forward(self, hidden_states: torch.Tensor, input_tensor: torch.Tensor) -> torch.Tensor:
        hidden_states = self.dense(hidden_states)
        hidden_states = self.dropout(hidden_states)
        hidden_states = self.LayerNorm(hidden_states + input_tensor)
        return hidden_states
{% endhighlight %}

상술했듯이 `BertOutput` 모듈은 Fig.03의 "Add & Norm" 블록을 의미한다. 우선 `torch.nn.Linear`로 구현된 `dense` layer를 거쳐, `(batch_size, sequence_length, intermediate_size)` 크기였던 `hidden_states`를 다시 `(batch_size, sequence_length, hidden_size)` 크기로 변환한다.

그리고 그 결과는 `input_tensor`라는 이름의 인자로 받는, `BertIntermediate` 모듈에 들어가기 전 (`BertAttention` 모듈의 출력값이었던) 원본 `hidden_states`와 더해져(residual connection) layer normalization(line 11)이 수행된다.

추가로, `BertModel`의 line 19에 보면 `BertPooler` 클래스를 이용해 만들어진 `pooler` 모듈이 있는 것을 볼 수 있다. 우리가 로드한 모델의 경우 상술했듯이 로드 시 `add_pooling_layer` 인자에 `False`를 주었기 때문에 이 `pooler` 모듈은 동작하지 않는다(`None`이 들어가 있다). 그래도 코드를 살펴보자.

{:.code-header}
BertPooler

{% highlight python linenos %}
class BertPooler(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.hidden_size)
        self.activation = nn.Tanh()

    def forward(self, hidden_states: torch.Tensor) -> torch.Tensor:
        # We "pool" the model by simply taking the hidden state corresponding
        # to the first token.
        first_token_tensor = hidden_states[:, 0]
        pooled_output = self.dense(first_token_tensor)
        pooled_output = self.activation(pooled_output)
        return pooled_output
{% endhighlight %}

이 모듈은 `encoder` 모듈이 만든 `embedding_output`의 첫 번째 요소, 그러니까 마지막 `BertLayer`가 출력한 `hidden_states`를 입력으로 받는다(`BertModel` line 157, 158).

line 10에서 이 입력값으로부터 각 batch를 구성하는 sequence들의 첫 번째 token, 그러니까 `[CLS]` token의 embedding만을 뽑아낸다(모든 sequence의 첫 번째 token은 `[CLS]` token이었던 것을 기억하자).

그리고 이들 값에 대해 linear 연산 후(line 11) activation 함수를 적용한다(line 12). 이렇게 `[CLS]` token들의 embedding들만 모아 만들어진, 크기 `(batch_size, hidden_size)`의 텐서는, 일반적으로 classification task를 위해 사용된다.

# 최종 정리

정리하면, `BertModel`을 구성하는 각 모듈이 하는 일은 다음과 같다.

1. `BertEmbeddings` : 입력된 `input_ids`를 위치 정보가 반영된 embedding으로 변환한다.

2. `BertEncoder` : `BertEmbeddings`에서 얻은 embedding을 여러 번의 `BertLayer`를 거쳐 contextual embedding으로 변환한다.

    `BertLayer`는 다음과 같이 동작한다.

   1. `BertAttention` : 이전 `BertLayer`가 만든 `hidden_states`를 입력으로 받아, mutli-head self attention 연산 및 residual connection, layer normalization을 수행한다.
      1. `BertSelfAttention` : `hidden_states`에 대해 multi-head attention을 수행한다.
      2. `BertSelfOutput` : `BertSelfAttention`의 출력값을 입력으로 받아, residual connection, layer normalization을 수행한다.
   2. `BertIntermediate` : `BertAttention`의 출력값을 입력으로 받아, feed forward 연산(linear + activation + linear)을 수행한다.
   3. `BertOutput` : `BertIntermediate`의 출력값을 입력으로 받아, residual connection, layer normalization을 수행한다.

3. `BertPooler` : `BertEncoder`에서 얻은 contextual embedding 중 `[CLS]` token의 embedding만을 뽑아내어 classification task를 위한 텐서로 변환한다.

