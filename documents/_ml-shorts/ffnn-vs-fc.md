---
title: "Feed Forward (Neural) Network vs. Fully Connected Network"
date_created: "2022-01-27"
date_modified: "2022-01-28"
---

{:.info}
참고 : <https://stackoverflow.com/questions/45933670/whats-the-difference-between-feed-forward-network-and-fully-connected-networ>

Feed Forward (Neural) Network, 줄여서 FFNN이라 불리는 신경망과, Fully Connected (Neural) Network, 줄여서 FC라 불리는 신경망은 어떤 차이가 있을까?

결론부터 말하면, 이 두 단어는 언급되는 도메인이 다르다.

# FFNN (Feed Forward Neural Network)

FFNN은 이름 그대로 텐서(tensor)가 신경망의 앞으로만 전파되는(feed forward), 즉 재귀적인(recurrent) 구조가 없는 신경망을 의미한다. 다시말해 FFNN은 RNN(Recurrent Neural Network)과 대비되는 개념의 신경망이다. 재귀적인 구조가 없기에, FFNN에서는 그라디언트(gradient)가 명확하게 정의되고, 역전파(backpropagation) 알고리즘으로 그라디언트를 쉽게 계산할 수 있다. 반면 RNN에서는 재귀 구조 때문에 무한루프가 형성되어 그라디언트를 정확하게 계산할 수 없다.[^1]

[^1]: 그래서 일반적으로는 정해진 횟수만큼만 루프를 돌게 하고, 그렇게 계산된 근사치만을 사용한다.

# FC (Fully Connected Neural Network)

반면 FC는, 조금 더 정확히는, fully connected layer[^2]는, 각 층(layer)의 모든 노드(뉴런)들이 그 다음 층의 모든 노드들과 하나도 뺴놓지 않고 모두 연결되어 있는, 정말 말 그대로 fully connected된 신경망을 의미한다. 즉 FC는, 각 층의 노드가 다음 층의 노드들과 듬성듬성 연결되어 있는 convolutional layer나 pooling layer 등과 대비되는 개념인 셈이다.

[^2]: dense layer라 부르기도 한다.

# 결론

그러니까 말하자면, 모든 FC는 FFNN이다. FC에 재귀적인 구조는 없지 않은가. 하지만 모든 FFNN이 FC인 것은 아니다. CNN도 FFNN이지만, FC는 아니지 않은가.

그러나 많은 사람들이 FFNN과 FC를 같은 의미로 쓰는 것으로 보인다. 