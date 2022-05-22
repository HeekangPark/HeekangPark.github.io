---
title: "[pytorch] Dataset, DataLoader"
date_created: "2022-05-22"
date_modified: "2022-05-22"
---

pytorch는 모델로의 데이터 입력을 편하게 할 수 있도록 위해 `torch.utils.data.Dataset` 클래스(이하 `Dataset`)와 `torch.utils.data.DataLoader` 클래스(이하 `DataLoader`)를 제공한다.

- `Dataset` : 데이터 셋의 각 샘플들에 전처리 등의 작업을 수행해 하나씩 가져오는 역할을 한다.
- `DataLoader` : 인자로 주어진 `Dataset`을 이용, 데이터 셋의 샘플들을 정해진 개수만큼 모아 미니배치(mini-batch)를 구성하는 역할을 한다.

즉 다음과 같은 순서로 pytorch 모델에 데이터를 입력할 수 있다.

1. 사용하려는 데이터 셋에 맞게 `Dataset`을 확장(expand)한 Custom Dataset을 만든다.
2. Custom Dataset를 이용해 `DataLoader`를 생성한다.
3. 각 epoch의 매 iteration마다 `DataLoader`가 만들어 준 미니배치를 이용해 모델을 학습시킨다.

`Dataset` - `DataLoader` 구조에 대해 조금 더 구체적으로 알아보자.

# Dataset

`Dataset`은 추상 클래스(abstract class)로서, 이를 사용하려면 몇 가지 메소드들을 구현해야 한다. `Dataset`은 map-style `Dataset`, iterable-style `Dataset`, 이렇게 두 가지 모드로 만들 수 있는데, 모드에 따라 구현해야 하는 메소드의 종류가 달라진다.

## map-style Dataset

map-style `Dataset`은 일반적으로 많이 사용하는 모드로, `torch.utils.data.Dataset`을 상속받아 구현한다. map-style `Dataset`은

{% highlight python linenos %}
Dataset[idx]
{% endhighlight %}

와 같은 형태로 사용할 수 있다(이렇게 하면 인덱스 `idx`에 해당하는 샘플을 가져올 수 있다). 이때 `idx`는 꼭 숫자일 필요는 없고, dictionary와 같이 문자열 인덱스도 사용 가능하다.

map-style `Dataset`은 다음 두 개의 메소드를 반드시 구현해야 한다.

- `__len()__` : 데이터 셋의 요소의 총 개수를 반환한다.
- `__getitem__()` : 인덱스를 인자로 받아, 해당 인덱스에 해당하는 데이터 셋의 요소를 반환한다. 일반적으로 샘플은 예제와 레이블의 쌍(example-label pair)이므로, 이 둘을 하나의 튜플 형태로 반환한다.

## iterable-style Dataset

iterable-style `Dataset`은 몇몇 특수한 경우(ex. 데이터 셋이 원격지, 데이터베이스 등에 있어서 stream으로 읽어오는 경우 등) 사용하는 모드로, `torch.utils.data.IterableDataset`을 상속받아 구현한다. iterable-style `Dataset`은

{% highlight python linenos %}
iter(Dataset)
{% endhighlight %}

과 같은 형태로 사용할 수 있다(이렇게 하면 데이터 셋의 샘플들을 순차적으로 하나씩 가져오는 이터레이터를 만들 수 있다).

iterable-style `Dataset`은 다음 메소드를 반드시 구현해야 한다.

- `__iter__()` : 매 iteration마다 샘플 하나를 출력하는 iterable 객체를 반환한다.

# DataLoader

`Dataset`의 필수 메소드들을 잘 만들었다면 `DataLoader`는 아무런 후처리 없이 바로 만들 수 있다. 다음과 같이 그냥 `Dataset`의 인스턴스를 인자로 주기만 하면 된다.

{% highlight python linenos %}
dataset = CustomDataset()
dataloader = DataLoader(dataset)
{% endhighlight %}

## automatic batching

`DataLoader`는 기본적으로 automatic batching을 수행한다. automatic batching이란 `Dataset`이 만들어 낸 각 샘플들을 쌓아 하나의 tensor로 된 배치 입력(batch input)을 만드는 것을 의미한다. 예를 들어 다음과 같은 `CustomDataset`이 있다고 해 보자.

{:.code-header}
automatic batching 예제 : Custom Dataset 만들기

{% highlight python linenos %}
from torch.utils.data import Dataset

class CustomDataset(Dataset):
    def __init__(self, size=8):
        self.size = size
    
    def __len__(self):
        return self.size
    
    def __getitem__(self, idx):
        # 반환값 : (a, b)
        # a : idx에 해당하는 인덱스만 1이고 나머지는 0인 크기 (1, 8)짜리 one-hot vector
        # b : idx
        return torch.eye(self.size)[idx].reshape(1, -1), torch.tensor(idx)

dataset = CustomDataset()

# 출력
print(Dataset[0])  # (tensor([[1., 0., 0., 0., 0., 0., 0., 0.]]), tensor(0))
print(Dataset[1])  # (tensor([[0., 1., 0., 0., 0., 0., 0., 0.]]), tensor(1))
print(Dataset[2])  # (tensor([[0., 0., 1., 0., 0., 0., 0., 0.]]), tensor(2))
{% endhighlight %}

{:.code-result}
{% highlight text %}
(tensor([[1., 0., 0., 0., 0., 0., 0., 0.]]), tensor(0))
(tensor([[0., 1., 0., 0., 0., 0., 0., 0.]]), tensor(1))
(tensor([[0., 0., 1., 0., 0., 0., 0., 0.]]), tensor(2))
{% endhighlight %}

위 출력 결과에서 볼 수 있듯이 `CustomDataset`은 항상 크기 (1, 8), (1,)인 tensor들의 쌍을 튜플 형태로 반환한다. 이때 다음과 같이 `batch_size`를 2로 설정한 `DataLoader`를 만들어보자(인자 `batch_size`에 대한 자세한 설명은 아래를 참조하자).


{:.code-header}
automatic batching 예제 : DataLoader 만들기

{% highlight python linenos %}
from torch.utils.data import DataLoader

dataloader = DataLoader(dataset, batch_size=2)

# 출력
for batch in dataloader:
    print(batch)

# [tensor([[[1., 0., 0., 0., 0., 0., 0., 0.]],
#         [[0., 1., 0., 0., 0., 0., 0., 0.]]]), tensor([0, 1])]
# 
# [tensor([[[0., 0., 1., 0., 0., 0., 0., 0.]],
#         [[0., 0., 0., 1., 0., 0., 0., 0.]]]), tensor([2, 3])]
# 
# [tensor([[[0., 0., 0., 0., 1., 0., 0., 0.]],
#         [[0., 0., 0., 0., 0., 1., 0., 0.]]]), tensor([4, 5])]
# 
# [tensor([[[0., 0., 0., 0., 0., 0., 1., 0.]],
#         [[0., 0., 0., 0., 0., 0., 0., 1.]]]), tensor([6, 7])]
{% endhighlight %}

{:.code-result}
{% highlight text %}
[tensor([[[1., 0., 0., 0., 0., 0., 0., 0.]],
        [[0., 1., 0., 0., 0., 0., 0., 0.]]]), tensor([0, 1])]
[tensor([[[0., 0., 1., 0., 0., 0., 0., 0.]],
        [[0., 0., 0., 1., 0., 0., 0., 0.]]]), tensor([2, 3])]
[tensor([[[0., 0., 0., 0., 1., 0., 0., 0.]],
        [[0., 0., 0., 0., 0., 1., 0., 0.]]]), tensor([4, 5])]
[tensor([[[0., 0., 0., 0., 0., 0., 1., 0.]],
        [[0., 0., 0., 0., 0., 0., 0., 1.]]]), tensor([6, 7])]
{% endhighlight %}

위 출력 결과에서 볼 수 있듯이 `DataLoader`는 샘플들을 자동으로 쌓아 하나의 tensor 형태로 만든다.

만약 샘플이 (위 예제에서처럼) 튜플 형태로 입력되면 튜플의 같은 인덱스에 있는 값들끼리(0번째 인덱스의 값들은 0번째 인덱스들끼리, 1번째 인덱스의 값들은 1번째 인덱스들끼리) 각각 모아 각각 하나의 tensor로 만든다. 즉 출력값은 tensor들의 튜플이 된다. (참고로 이 동작은 `collate_fn` 기본값에 의해 수행하는 동작이다.)

위 예제의 경우 하나의 샘플이 크기 (1, 8), (1,)인 두 tensor들의 튜플이므로, `DataLoader`의 iteration별 출력값은 크기 (2, 1, 8), (2,)인 두 tensor들의 튜플이 된다. automatic batching으로 2차원 벡터가 3차원이 된 것에 주목하자.

모델의 빠른 속도를 위해서는 배치 입력을 통한 배치 연산이 사실상 필수인데, `DataLoader`의 automatic batching을 이용하면 간단하게 배치 입력을 만들 수 있어 아주 편리하다.

이때 만약 샘플들의 크기가 서로 다르다면 하나의 tensor로 만들 수 없으므로 오류가 발생하고, automatic batching을 이용할 수 없게 된다. 이 경우엔 아래에서 소개할 `collate_fn` 인자를 이용해야 한다.

## 인자

많이 사용되는 `DataLoader`의 추가 인자(optional)들을 정리하면 다음과 같다.

- `batch_size` [int, default = 1]
  - 미니배치 크기. 이 크기만큼 샘플들을 모아 하나의 배치 입력을 만든다.
  - `batch_size`가 1이더라도 automatic batching이 수행되어 크기 1짜리 미니배치가 만들어진다.
  - automatic batching을 끄고 싶으면 `batch_size`에 `None`을 입력하면 된다. 이렇게 하면 `DataLoader`는 매 iteration마다 하나의 샘플만을 출력한다.
- `shuffle` [bool, default = False]
  - `True` : 매 epoch마다 데이터가 섞인다. 즉 Epoch 1 Iter 1에서 모델이 보게 되는 미니배치 데이터와 Epoch 2 Iter 1에서 모델이 보게 되는 미니베치 데이터가 달라지게 된다.
  - `False` : 매 epoch마다 데이터가 섞이지 않는다. 즉 Epoch 1 Iter 1에서 모델이 보게 되는 미니배치 데이터와 Epoch 1 Iter 2에서 모델이 보게 되는 미니베치 데이터는 같다.
- `num_workers` [int, default = 0]
  - 데이터 로드를 위해서 몇 개의 subprocess를 사용할 것인지를 설정한다.
  - 0이면 main process만 사용해 데이터를 로드한다.
- `collate_fn` [callable, default = None]
  - 함수를 입력으로 받는다.
  - automatic batching이 켜져 있는 경우, `collate_fn`은 한 미니배치에 들어가는 샘플들의 리스트(list of samples)를 입력으로 받아, 이들을 적당히 처리해 하나의 배치 입력 형태로 만들어야 한다.
    - 만약 None이 입력되면(기본값) 각 샘플들의 데이터 구조(ex. 튜플, 리스트, 딕셔너리)를 보존한 채로 같은 항목끼리 묶어, 새로운 배치 차원을 가장 앞에 추가하는 방식으로(ex. (N, M)차원 → (`batch_size`, N, M)차원) 하나의 배치 입력을 만든다. 이때 numpy 배열이나 파이썬 숫자 값(numerical value)들은 자동으로 tensor로 변환된다.
  - automatic batching이 꺼저 있는 경우, `collate_fn`은 샘플 하나를 입력으로 받아, 이를 적당히 처리해 출력해야 한다. 이 출력값은 `DataLoader`가 매 iteration마다 출력하는 값이 된다.
    - 만약 None이 입력되면(기본값) 그냥 단순히 numpy 배열이나 파이썬 숫자 값(numerical value)들을 자동으로 tensor로 변환하는 동작만 한다.
- `drop_last` [bool, default = False]
  - `True` : 마지막 미니배치의 샘플 개수가 부족한 경우(즉 `Dataset`의 크기가 `batch_size`로 나누어 떨어지지 않는 경우) 버린다.
  - `False` : 마지막 미니배치를 버리지 않는다. 즉 마지막 미니배치의 크기는 다른 미니배치보다 작을 수 있다.