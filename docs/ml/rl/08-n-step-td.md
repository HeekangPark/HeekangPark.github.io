---
title: "L08. n-step Bootstrapping"
order: 8
date_created: "2021-06-06"
date_modified: "2024-05-12"
---

<style src="./styles.scss"></style>

# $n$-step TD Method란?

다음과 같은 에피소드를 관측했다고 해 보자.

$S_0$, $A_0$, $R_1$, $S_1$, $A_1$, $R_2$, $S_2$, $A_2$, …, $R_{T}$, $S_{T}$ [종료] {.text-align-center}

이때 상태 $S_t$의 가치 함수 $V(S_t)$를 업데이트하는 방법을 생각해 보자.

[MC Method](/ml/rl/06-mc)에서는 시점 $t+1$부터 에피소드 종료까지 관측한 (전체) 보상들($R_{t + 1}$, $R_{t+2}$, …, $R_T$)을 기반으로 하여 $V(S_t)$를 업데이트했다.

$$\begin{align}
V(S_t)
&\leftarrow V(S_t) + \alpha [(R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{T - t - 1} R_T) - V(S_t)]\\[0.5em]
&\leftarrow V(S_t) + \alpha [G_t - V(S_t)]\\[0.5em]
\end{align}
$$

(단, $G_{t} = R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{T - t - 1} R_T$) {.text-align-center .mt-n1}

한편, [1-step TD Method(= TD(0) Method)](/ml/rl/07-td)에서는 시점 $t+1$에서 관측한 보상 $R_{t+1}$과 상태 $S_{t+1}$에서의 가치 추정값 $V(S_{t+1})$[^1]을 기반으로 하여 $V(S_t)$를 업데이트했다.

[^1]: $V(S_{t+1})$는 미래에 받을 보상들($R_{t+2}$, $R_{t+3}$, …, $R_{T}$)에 대한 프록시(proxy) 역할을 한다.

$$V(S_{t}) \leftarrow V(S_{t}) + \alpha [R_{t+1} + \gamma V(S_{t+1}) - V(S_{t})]$$

그렇다면 MC Method와 1-step TD Method 중간에 있는 방법도 있을 것이다. 그러니까, 시점 $t+1$부터 시점 $t+n$까지 관측한 $n$개의 보상들($R_{t + 1}$, $R_{t+2}$, …, $R_{t+n}$)과 상태 $S_{t+n}$에서의 가치 추정값 $V(S_{t+n})$[^2]을 기반으로 하여 $V(S_t)$를 업데이트하는 것이다.

[^2]: $V(S_{t+n})$는 시점 $t+n$ 이후 미래에 받을 보상들($R_{t+n+1}$, $R_{t+n+2}$, …, $R_{T}$)에 대한 프록시(proxy) 역할을 한다.

$$V(S_t) \leftarrow V(S_t) + \alpha [(R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n V(S_{t+n})) - V(S_t)]$$

이 방법을 **$n$-step TD Method**라 부른다. 참고로 $n = 1$이면 $n$-step TD Method는 1-step TD Method와 같아지고, $n=\infty$이면[^3] $n$-step TD Method는 MC Method와 같아진다.

[^3]: 엄밀히 말하면, $n \ge T$일 때

## $n$-step Return

$n$-step TD Method의 업데이트 식

$$V(S_t) \leftarrow V(S_t) + \alpha [(\bbox[border: 2px solid red, 5px]{R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n V(S_{t+n})}) - V(S_t)]$$

에서 빨간색 테두리 영역을 **$n$-step Return**이라 하고, 기호로 $G_{t:t+n}$이라 나타낸다.[^4][^5]

[^4]: 여기서 아래 첨자 $t:t+n$은 시점 $t$부터 $t+n$까지 $n$개의 보상을 사용함을 의미한다.
[^5]: $t + n \ge T$일 때의 식은 시점 $T$ 이후의 보상 항들과 가치 추정값 $V(S_{t+n})$을 모두 0이라 놓고 계산한 것이라 기억하면 편하다. 

$$G_{t:t+n} = \begin{cases}
R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n V(S_{t+n}) & (t + n < T)\\[0.5em]
G_t\quad(= R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{T-t-1} R_T) &(t + n \ge T)
\end{cases}
$$

$G_{t:t+n}$은 시점 $t + n$ 이후의 보상들 대신 $V(S_{t+n})$을 써 만든, 전체 Return($G_t$)에 대한 일종의 근사식이라 이해할 수 있다.

$G_{t:t+n}$는 $n$-step TD Method의 업데이트 목표(target of the update)이다. $n$-step Return을 이용해 $n$-step TD Method의 업데이트 식을 나타내면 다음과 깉이 된다.

$$V(S_t) \leftarrow V(S_t) + \alpha [G_{t:t+n} - V(S_t)]$$

## 오류 감소 속성(The Error Reduction Property)

$n$-step Return은 $v_{\pi}$에 대한 추정값이다.[^6] 이때 $n$-step Return의 기댓값은 언제나 현재의 추정값 $V$보다 $v_{\pi}$에 대한 더 훌륭한 추정값이다. 이를 $n$-step Return의 **오류 감소 속성(error reduction property)** 이라 한다.

[^6]: 그래서 $n$-step TD Method에서 업데이트의 목표로 사용하는 것이다.

::: info $n$-step Return의 오류 감소 속성(The Error Reduction Property of $n$-step Return)

$n$-step Return의 기댓값의 오차는 (최악의 경우에도) 항상 현재 추정값 $V$의 오차의 $\gamma^n$배보다 작다. 즉, 모든 $n \ge 1$에 대해,

$$\max_s \left| \mathbb{E}_{\pi} [G_{t:t+n} \,|\, S_t = s] - v_{\pi} (s) \right| \le \gamma^n \mathbb{E}_{\pi} \left| V(s) - v_{\pi} (s) \right|$$

가 성립한다.

:::

$n$-step Return의 오류 감소 속성은 $n$-step TD Method을 이용해 $V$를 $v_{\pi}$로 항상 수렴시킬수 있음을 보장한다.

# $n$-step TD Prediction

$n$-step TD Method를 이용해 Prediction 문제를 풀 수 있다.

::: info Pseudo Code : $n$-step TD Prediction

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$와 $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

입력 : 정책 $\pi$ {.mt-1}

모든 $s \in \mathcal{S}$에 대해, $V(s) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $V(\textrm{terminal}) = 0$. {.mt-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>현재 상태 $S_t$에서 $\pi$에 따라 다음 행동 $A$을 선택

<span class="indent-3"/>$A$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/>$G \leftarrow \sum_{i = \tau + 1} ^{\min(\tau + n,\,T)} \gamma^{i - \tau - 1} R_i$

<span class="indent-3"/><span class="keyword-highlight">If</span> $t + n < T$:

<span class="indent-4"/>$G \leftarrow G + \gamma^n V(S_{\tau + n})$

<span class="indent-3"/>$V(S_{\tau}) \leftarrow V(S_{\tau}) + \alpha [G - V(S_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

## 예제 : Random Walk

[이전 글](/ml/rl/07-td#예제-random-walk)에서 보았던 Random Walk 문제에서 첫 번째 에피소드로 다음과 같은 에피소드를 얻었다고 해 보자.

C, 0, D, 0, E, 1, T {.text-align-center}

1-step TD Method에선 이 경우 $V(E)$만 업데이트된다. 하지만 2-step TD Method의 경우 $V(D)$와 $V(E)$, 이렇게 두 개의 가치가 업데이트되게 된다. $n > 2$인 $n$-step TD Method에서는 $V(C)$, $V(D)$, $V(E)$ 모두가 업데이트된다.

그렇다면 $n$이 얼마일 때 성능이 가장 좋을까? Random Walk 문제를 다음과 같이 살짝 변형시키고, 이 문제를 풀어 이 질문에 답해보자.

::: info Random Walk (Updated)

Fig.01과 같은 게임판 위에서, 말은 다음과 같은 규칙으로 움직인다.

- S1 ~ S19, 이렇게 총 19개의 상태가 존재한다. 모든 에피소드는 가운데 S10에서 시작한다.
- 각 상태에서는 각각 50% 확률로 왼쪽 혹은 오른쪽으로 이동할 수 있다.
- 가장 왼쪽 끝으로 가면 -1의 보상을 받는다. 가장 오른쪽 끝으로 가면 +1의 보상을 받는다. 이외의 모든 이동은 0의 보상을 받는다.

<v-image src="08-random-walk.png" title="Fig.01 Random Walk (Updated)" />

:::

::: details Code : Random Walk (Updated)

```python:line-numbers
import numpy as np
import matplotlib.pyplot as plt

def generateEpisodes(episode_num, state_num=19):
    episodes = []
    for e in range(episode_num):
        episode = []
        
        S = state_num // 2
        episode.append(S)

        status = True        
        while status:    
            delta = np.random.choice([-1, 1])
            if S == 0 and delta == -1:
                R = -1
                S  = state_num
                status = False
            elif S == state_num - 1 and delta == 1:
                R = 1
                S = state_num
                status = False
            else:
                R = 0
                S += delta

            episode.append(R)
            episode.append(S)

        episodes.append(episode)
    return episodes

class NStepTDPredictor:
    def __init__(self, n, alpha, gamma=1, state_num=19):
        self.n = n
        self.alpha = alpha
        self.gamma = gamma
        self.state_num = state_num
        
        self.V = self.V = np.zeros(self.state_num + 1)
        self.true_values = np.array([(-1 + 2 * i / (self.state_num + 1)) for i in range(1, self.state_num + 1)])
    
    def getRMSError(self):
        return np.sqrt(np.mean(np.square(self.V[:-1] - self.true_values)))
    
    def learn(self, episodes):
        for episode in episodes:
            S = [None for x in range(self.n + 1)]
            R = [None for x in range(self.n + 1)]
            
            e = 0
            S[0] = episode[e]
            e += 1
            
            T = float("inf")
            t = 0
            while True:
                if t < T:
                    R[(t + 1) % (self.n + 1)] = episode[e]
                    S[(t + 1) % (self.n + 1)] = episode[e + 1]
                    e += 2
                    
                    if S[(t + 1) % (self.n + 1)] == self.state_num: # is terminal state?
                        T = t + 1
                tau = t - self.n + 1
                if tau >= 0:
                    G = sum([((self.gamma ** (i - tau - 1)) * R[i % (self.n + 1)]) for i in range(tau + 1, min(tau + self.n, T) + 1)])
                    if tau + self.n < T:
                        G += (self.gamma ** self.n) * self.V[S[(tau + self.n) % (self.n + 1)]]
                    self.V[S[tau % (self.n + 1)]] = self.V[S[tau % (self.n + 1)]] + self.alpha * (G - self.V[S[tau % (self.n + 1)]])
                
                if tau == T - 1:
                    break
                
                t += 1
        
        return self.getRMSError()

def drawGraph(ns, alphas, results):
    for n_idx, n in enumerate(ns):
        plt.plot(alphas, results[n_idx], label=f"n = {n}")
        
    plt.title("Random Walk (Updated)")
    plt.xlabel("α")
    plt.ylabel("RMS Error")
    plt.xticks([0, 0.2, 0.4, 0.6, 0.8, 1])
    plt.ylim(0.1, 0.6)
    plt.legend()
    plt.show()
    
if __name__ == "__main__":
    repeats = 100
    episode_num = 10
    ns = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
    alphas = [(i / 20) for i in range(21)]
    
    results = np.zeros((len(ns), len(alphas)))
    for repeat in range(repeats):
        episodes = generateEpisodes(episode_num=episode_num)
        for n_idx, n in enumerate(ns):
            rms_errors_by_alpha = [NStepTDPredictor(n=n, alpha=alpha).learn(episodes) for alpha in alphas]
            results[n_idx] += rms_errors_by_alpha
    results /= repeats
    
    drawGraph(ns, alphas, results)
```

**코드 설명**
- line 4 ~ 31 : `generateEpisodes()` 함수
  - 인자로 받은 `episode_num`개만큼의 에피소드를 생성하는 함수
  - `state_num` 매개변수는 상태의 수를 나타냄
- line 33 ~ 77 : `NStepTDPredictor` 클래스
  - line 34 ~ 41 : `NStepTDPredictor.__init__()` 메소드
    - line 40 : 가치 함수 `self.V`를 0으로 초기화한다. 종료상태(T) 때문에 `self.V`의 크기는 `self.state_num + 1`이 된다.
    - line 41 : 가치 함수의 참값($v$)을 저장하는 배열 `self.true_values`를 만든다. 참고로 상태의 개수가 $k$개 있는 Random Walk(Updated)에서 최적 가치 함수 $v_{*}$는 다음과 같이 계산된다: $v_{*}(S_x) = -1 + \frac{2x}{k + 1}$ ($1 \le x \le k$).
  - line 43 ~ 44 : `NStepTDPredictor.getRMSError()` 메소드
    - 현재 가치 추정값 `self.V`의 RMS Error를 구하는 메소드
    - `self.V`와 `self.true_values`의 차를 구한 후, 이를 제곱하고, 평균내고, 루트를 씌운 값이다.
  - line 46 ~ 77 : `NStepTDPredictor.learn()` 메소드
    - 인자로 전달받은 에피소드들을 가지고 학습을 진행하는 메소드
    - 학습 결과 만들어진 `self.V`에 대해 RMS Error를 계산한 결과값(`self.getRMSError()`)을 반환한다.
- line 79 ~ 89 : `drawGraph()` 함수
  - Fig.02를 그리는 함수
- line 91 ~ 105 : main
  - 각 $n$에 대해, $\alpha$에 따라 RMS Error를 계산한 후 그래프(Fig.02)를 그린다.

:::

<v-image src="08-random-walk-result.png" title="Fig.02 Random Walk (Updated) 학습 결과" description="적당한 $n$($n=2$ 또는 $n=4$)을 선택할 때 성능이 가장 좋음을(= RMS Error가 작음을) 볼 수 있다" />

위 그래프에서 볼 수 있듯이 적당한 $n$($n=2$ 또는 $n=4$)을 선택할 때 성능이 가장 좋다(= RMS Error가 작다). 이는 $n$-step TD Method가 1-step TD Method나 MC Method와 같은 극단적인 경우보다 (일반적으로) 성능이 좋음을 보여준다.

# $n$-step TD Control

## On-policy Learning

### On-policy $n$-step SARSA

[이전 글](/ml/rl/07-td#sarsa)에서 살펴본 SARSA와 $n$-step TD Method를 결합해 보자. $n$-step TD Method 버전의 SARSA를 **$n$-step SARSA**라 한다. 참고로 이전 글에서 배운 TD(0) Method 버전의 SARSA는 1-step SARSA 또는 SARSA(0)이라 부른다.

SARSA에서는 행동-가치 함수(action-value function)를 사용하므로, $n$-step Return $G_{t:t+n}$을 다음과 같이 $Q$를 사용하여 재정의하자.

$$G_{t:t+n} = \begin{cases}
R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n Q(S_{t+n},\,A_{t+n}) & (t + n < T)\\[0.5em]
G_t\quad(= R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{T-t-1} R_T) &(t + n \ge T)
\end{cases}
$$

이를 이용해 업데이트 식을 다음과 같이 만들 수 있다.

$$Q(S_t,\,A_t) \leftarrow Q(S_t,\,A_t) + \alpha [G_{t:t+n} - Q(S_t,\,A_t)]$$

::: info Pseudo Code : On-policy $n$-step SARSA ($\varepsilon$-greedy Policy 사용)

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$, $A_t$, $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해, $Q(s,\,a) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $Q(\textrm{terminal},\,\cdot) = 0$. {.mb-1 .mt-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>현재 $Q$에 대해 $\varepsilon$-greedy Policy를 사용하여 행동 $A_0$ 선택

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>$A_t$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>현재 $Q$에 대해 $\varepsilon$-greedy Policy를 사용하여 행동 $A_{t+1}$ 선택

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/>$G \leftarrow \sum_{i = \tau + 1} ^{\min(\tau + n,\,T)} \gamma^{i - \tau - 1} R_i$

<span class="indent-3"/><span class="keyword-highlight">If</span> $t + n < T$:

<span class="indent-4"/>$G \leftarrow G + \gamma^n Q(S_{\tau + n},\,A_{\tau + n})$

<span class="indent-3"/>$Q(S_{\tau},\,A_{\tau}) \leftarrow Q(S_{\tau},\,A_{\tau}) + \alpha [G - Q(S_{\tau},\,A_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

### On-policy $n$-step Expected SARSA

[이전 글](/ml/rl/07-td#expected-sarsa)에서 살펴본 Expected SARSA와 $n$-step TD Method를 결합하면 **$n$-step Expected SARSA**를 얻을 수 있다. $n$-step Expected SARSA는 다음과 같은 $n$-step Return을 정의해 사용한다.

$$G_{t:t+n} = \begin{cases}
R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n \sum_a \pi (a \,|\, S_{t+n}) Q(S_{t+n},\,a) & (t + n < T)\\[0.5em]
G_t\quad(= R_{t + 1} + \gamma R_{t+2} + \cdots + \gamma^{T-t-1} R_T) &(t + n \ge T)
\end{cases}
$$

::: info Pseudo Code : On-policy $n$-step Expected SARSA ($\varepsilon$-greedy Policy 사용)

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$, $A_t$, $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

모든 $s \in \mathcal{S}^{+}$, $a \in \mathcal{A}(s)$에 대해, $Q(s,\,a) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $Q(\textrm{terminal},\,\cdot) = 0$. {.mb-1}

$\pi$ : $Q$에 대한 $\varepsilon$-greedy Policy {.mb-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>현재 $Q$에 대해 $\pi$를 사용하여 행동 $A_0$ 선택

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>$A_t$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>현재 $Q$에 대해 $\pi$를 사용하여 행동 $A_{t+1}$ 선택

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/>$G \leftarrow \sum_{i = \tau + 1} ^{\min(\tau + n,\,T)} \gamma^{i - \tau - 1} R_i$

<span class="indent-3"/><span class="keyword-highlight">If</span> $t + n < T$:

<span class="indent-4"/>$G \leftarrow G + \gamma^n \sum_a \pi(a\,\|\,S_{\tau + n}) Q(S_{\tau + n},\,a)$

<span class="indent-3"/>$Q(S_{\tau},\,A_{\tau}) \leftarrow Q(S_{\tau},\,A_{\tau}) + \alpha [G - Q(S_{\tau},\,A_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

## Off-policy Learning

### Importance-sampling ratio

Off-policy Learning은 학습이 진행되는 목표 정책(target policy) $\pi$와 데이터를 생성하는 행동 정책(behavior policy) $b$가 다른 학습법이었다. $b$로 생성한 데이터를 이용해 $\pi$를 학습시키기 위해선 [MC Method](/ml/rl/06-mc#off-policy-prediction)에서 살펴본 **Importance Sampling** 기법을 사용해야 한다. 목표 정책 $\pi$와 행동 정책 $b$ 사이의 **Importance-sampling ratio** $\rho_{t:h}$는 다음과 같이 정의된다.

$$\rho_{t:h} = \prod _{k=t} ^{\min(h,\,T-1)} \frac{\pi(A_k\,|\,S_k)}{b(A_k\,|\,S_k)}$$

Importance-sampling ratio를 이용해 업데이트 식을 세우면 다음과 같이 된다.

$$V(S_t) \leftarrow V(S_t) + \alpha \cdot \rho_{t:t+n-1} [G_{t:t+n} - V(S_t)]$$

### Off-policy $n$-step SARSA

Importance-sampling ratio를 이용해 다음과 같은 업데이트 식을 세울 수 있다.[^7]

[^7]: 여기서의 $G_{t:t+n}$은 [On-policy $n$-step SARSA](#on-policy-n-step-sarsa)에서 정의한 버전을 사용한다.

$$Q(S_t,\,A_t) \leftarrow Q(S_t,\,A_t) + \alpha \cdot \rho_{t+1:t+n} [G_{t:t+n} - Q(S_t,\,A_t)]$$

이 업데이트 식에서 사용하는 $\rho_{t+1:t+n}$는 위에서 본 $V$에 대한 업데이트 식에서 사용하는 $\rho_{t:t+n-1}$보다 시점, 종점 모두 한 시간 단계(time step) 뒤에 있음에 주의하자. 차이가 생기는 이유는 $V$는 상태에 대한 값이지만 $Q$는 상태-행동 쌍(state-action pair)에 대한 값이기 때문이다. $Q(S_t,\,A_t)$는 $Q(S_{t+n},\,A_{t+n})$를 이용해 업데이트되므로, $\rho$를 계산할 때는 시점 $t+n$에서의 행동 $A_{t+n}$에 대한 상대 확률(relative probability)까지 계산해 주어야 한다. 그러나 $Q(S_t,\,A_t)$는 $S_t$에서 $A_{t}$가 실행되었을 때의 가치를 의미하므로, $\rho$를 계산할 때 (이미 확정적으로 시행된) 시점 $t$에서의 행동 $A_{t}$에 대한 상대 확률은 계산할 필요가 없다.

이 업데이트 식을 이용하면 다음과 같이 Off-policy 버전의 $n$-step SARSA를 만들 수 있다.

::: info Pseudo Code : Off-policy $n$-step SARSA

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$, $A_t$, $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

$b$ : 모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해 $b(a \,\|\, s) >0$인 임의의 행동 정책 {.mt-1}

모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해, $Q(s,\,a) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $Q(\textrm{terminal},\,\cdot) = 0$. {.mt-1 .mb-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>$S_0$에서 $b$를 이용해 행동 $A_0 ~ b(\cdot \,\|\,S_0)$ 선택

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>$A_t$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>$S_{t+1}$에서 $b$를 이용해 행동 $A_{t+1} ~ b(\cdot \,\|\,S_{t+1})$ 선택

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/>$\rho \leftarrow \prod _{i=\tau + 1} ^{\min(\tau+n,\,T-1)}\frac{\pi(A_i\,\|\,S_i)}{b(A_i\,\|\,S_i)}

<span class="indent-3"/>$G \leftarrow \sum_{i = \tau + 1} ^{\min(\tau + n,\,T)} \gamma^{i - \tau - 1} R_i$

<span class="indent-3"/><span class="keyword-highlight">If</span> $t + n < T$:

<span class="indent-4"/>$G \leftarrow G + \gamma^n Q(S_{\tau + n},\,A_{\tau + n})$

<span class="indent-3"/>$Q(S_{\tau},\,A_{\tau}) \leftarrow Q(S_{\tau},\,A_{\tau}) + \alpha \cdot \rho \cdot [G - Q(S_{\tau},\,A_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

### Off-policy $n$-step Expected SARSA

Importance-sampling ratio를 이용해 다음과 같이 Off-policy 버전의 $n$-step Expected SARSA의 업데이트 식을 만들 수 있다.[^8]

[^8]: 여기서의 $G_{t:t+n}$은 [On-policy $n$-step Expected SARSA](#on-policy-n-step-expected-sarsa)에서 정의한 버전을 사용한다.

$$Q(S_t,\,A_t) \leftarrow Q(S_t,\,A_t) + \alpha \cdot \rho_{t+1:t+n-1} [G_{t:t+n} - Q(S_t,\,A_t)]$$

이 업데이트 식에서 사용하는 $\rho_{t+1:t+n-1}$는 위에서 본 Off-policy $n$-step SARSA의 업데이트 식에서 사용하는 $\rho_{t+1:t+n}$보다 종점이 한 시간 단계(time step) 앞에 있음에 주의하자. Expected SARSA를 사용하면 마지막 상태에서는 가능한 모든 행동들을 고려하기 때문에, $\rho$를 계산할 때 시점 $t+n$에서의 행동 $A_{t+n}$에 대한 상대 확률(relative probability)은 계산할 필요가 없다.

::: info Pseudo Code : Off-policy $n$-step Expected SARSA

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$, $A_t$, $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

$b$ : 모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해 $b(a \,\|\, s) >0$인 임의의 행동 정책 {.mt-1}

모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해, $Q(s,\,a) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $Q(\textrm{terminal},\,\cdot) = 0$. {.mt-1 .mb-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>$S_0$에서 $b$를 이용해 행동 $A_0 ~ b(\cdot \,\|\,S_0)$ 선택

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>$A_t$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>$S_{t+1}$에서 $b$를 이용해 행동 $A_{t+1} ~ b(\cdot \,\|\,S_{t+1})$ 선택

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/>$\rho \leftarrow \prod _{i=\tau + 1} ^{\min(\tau+n-1,\,T-1)}\frac{\pi(A_i\,\|\,S_i)}{b(A_i\,\|\,S_i)}

<span class="indent-3"/>$G \leftarrow \sum_{i = \tau + 1} ^{\min(\tau + n,\,T)} \gamma^{i - \tau - 1} R_i$

<span class="indent-3"/><span class="keyword-highlight">If</span> $t + n < T$:

<span class="indent-4"/>$G \leftarrow G + \gamma^n \sum_a \pi(a\,\|\,S_{\tau + n})Q(S_{\tau + n},\,a)$

<span class="indent-3"/>$Q(S_{\tau},\,A_{\tau}) \leftarrow Q(S_{\tau},\,A_{\tau}) + \alpha \cdot \rho \cdot [G - Q(S_{\tau},\,A_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

### $n$-step Tree Backup Algorithm

[이전 글](/ml/rl/07-td)에서 봤던 Q-Learning과 Expected SARSA는 Importance Sampling을 사용하지 않고도 Off-policy Learning을 수행했다. 그렇다면 Importance Sampling을 사용하지 않는 Off-policy $n$-step Learning은 없을까?

한편, Expected SARSA의 Return을 구하는 과정을 생각해보자. (1-step) Expected SARSA Return은 다음 상태 $S_{t+1}$에서 받을 수 있는 보상들의 기댓값이었다. $n$-step Expected SARSA Return은 보상 $R_{t+1}$, $R_{t+2}$, …, $R_{t+n}$과, 상태 $S_{t+n}$에서 받을 수 있는 보상들의 기댓값의 합이었다. 그런데 만약, 거치는 모든 상태 $S_{t+1}$, $S_{t+2}$, …, $S_{t+n}$에서 보상들의 기댓값을 구한다면 더 정확하지 않을까?

이 두 질문에 대한 답이 바로 **$n$-step Tree Backup Algorithm**이다. $n$-step Tree Backup Algorithm은 Expected SARSA를 발전시킨 방법으로, Importance Sampling을 사용하지 않는 Off-policy $n$-step Learning이다. 구체적으로 $n$-step Tree Backup Algorithm에서는 다음과 같이 **$n$-step Tree Backup Return**을 정의해 사용한다.

$$G_{t:t+n} = \begin{cases}
R_{t+1} + \gamma \sum_{a} \pi(a \,|\,S_{t+1})Q(S_{t+1},\,a) & \quad (t < T-1,\,n = 1)\\[0.5em]
R_{t+1} + \gamma \left[ \bbox[border: 2px solid red, 5px]{\sum_{a \neq A_{t+1}} \pi(a \,|\,S_{t+1})Q(S_{t+1},\,a)} + \bbox[border: 2px solid green, 5px]{\pi (A_{t+1}\,|\,S_{t+1})G_{t+1:t+n}} \right] & \quad (t < T-1,\,n \ge 2)\\[0.5em]
R_T&\quad (t=T-1)\\[0.5em]
\end{cases}
$$

$t<T-1$, $n=1$일 때의 $n$-step Tree Backup Return은 (1-step) Expected SARSA에서의 Return과 같다. $t=T-1$일 때는 $R_T$와 같다. $t<T-1$, $n \ge 2$일 때는 시점 $t+1$에서부터 $t+n$까지의 각 시점에서, 시행하지 않은 행동을 시행했다면 받을 것으로 예상되는 보상의 기댓값(빨간색 테두리 영역)과 시행한 행동으로 받게 되는 보상의 기댓값(초록색 테두리 영역)의 합으로 계산된다. 시행하지 않은 행동 $a \neq A_{t+1}$을 시행했다면 받을 보상은 실제로는 알 수 없으므로 대신 $Q_(S_{t+1},\,a)$을 이용한다(bootstrapping). 시행한 행동 $A_{t+1}$으로 받게 되는 보상의 기댓값은 재귀적으로 계산된다. $n$-step Tree Backup Return 계산 과정은 마치, 현재 상태로부터 실제 시행한 행동들($A_{t+1}$, $A_{t+2}$, …, $A_{t+n - 1}$)과 그로 인해 전이되는 상태들($S_{t+1}$, $S_{t+2}$, …, $S_{t+n}$)이 큰 줄기를 형성하고, 각 상태들마다 시행하지 않은 행동들($a \neq A_{t+1}$)이 잔가지를 이루는, 나무처럼 생겼다. 이 때문에 이 방법을 "Tree Backup"이라 부르는 것이다.

이렇게 계산한 $n$-step Tree Backup Return은 $n$-step Tree Backup Algorithm의 학습 목표(target)가 된다.

$$Q(S_t,\,A_t) \leftarrow Q(S_t,\,A_t) + \alpha [G_{t:t+n} - Q(S_t,\,A_t)]$$

::: info Pseudo Code : $n$-step Tree Backup Algorithm

<div class="pseudo-code">

<span class="comment-highlight">// 아래 의사 코드에서, $S_t$, $A_t$, $R_t$를 읽고 저장할 때는 첨자 $t$에 $(n+1)$로 나머지 연산을 한 값을 사용한다.</span>

<span class="comment-highlight">// ex) $n = 2$인 경우, $S_{10}$은 $S_1$으로(10 % 3 = 1), $R_{21}$은 $R_0$으로(21 % 3 = 0) 읽고 저장하면 된다.</span>

모든 $s \in \mathcal{S}$, $a \in \mathcal{A}(s)$에 대해, $Q(s,\,a) \in \mathbb{R}$을 임의의 값으로 초기화. 단, $Q(\textrm{terminal},\,\cdot) = 0$. {.mt-1}

$\pi$ : $Q$에 대한 Greedy Policy {.mt-1 .mb-1}

<span class="keyword-highlight">Loop</span> for each episode:

<span class="indent-1"/>$S_0$를 종료 상태(terminal state)가 아닌 임의의 상태로 초기화

<span class="indent-1"/>$S_0$에서 $\pi$를 이용해 행동 $A_0 ~ \pi(\cdot \,\|\,S_0)$ 선택

<span class="indent-1"/>$T \leftarrow \infty$

<span class="indent-1"/><span class="keyword-highlight">Loop</span> for $t$ = 0, 1, 2, …

<span class="indent-2"/><span class="keyword-highlight">If</span> $t < T$:

<span class="indent-3"/>$A_t$ 시행하고, 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$ 관측

<span class="indent-3"/><span class="keyword-highlight">If</span> $S_{t+1}$이 종료 상태(terminal state)이면:

<span class="indent-4"/>$T \leftarrow t+1$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>$S_{t+1}$에서 $\pi$를 이용해 행동 $A_{t+1} ~ \pi(\cdot \,\|\,S_{t+1})$ 선택

<span class="indent-2"/>$\tau \leftarrow t - n + 1$

<span class="indent-2"/><span class="keyword-highlight">If</span> $\tau \ge 0$:

<span class="indent-3"/><span class="keyword-highlight">If</span> $t+1 \ge T$:

<span class="indent-4"/>$G \leftarrow R_T$

<span class="indent-3"/><span class="keyword-highlight">else</span>:

<span class="indent-4"/>$G \leftarrow R_{t+1} + \gamma \sum_a \pi(a\,\|\,S_{t+1})Q(S_{t+1},\,a)$

<span class="indent-3"/><span class="keyword-highlight">Loop</span> for $k$ = \min(t,\,T-1),\, \min(t,\,T-1) - 1,\, \min(t,\,T-1) - 2,\, \cdots,\, \tau + 1$:

<span class="indent-4"/>$G \leftarrow R_{k} + \gamma [ \sum_{a \neq A_k} \pi(a\,\|\,S_{k})Q(S_{k},\,a) + \pi(A_k\,\|\,S_k)G ]$

<span class="indent-3"/>$Q(S_{\tau},\,A_{\tau}) \leftarrow Q(S_{\tau},\,A_{\tau}) + \alpha [G - Q(S_{\tau},\,A_{\tau})]$

<span class="indent-1"/><span class="keyword-highlight">until</span> $\tau = T - 1$

</div>

:::

