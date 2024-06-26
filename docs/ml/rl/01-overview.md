---
title: "L01. Overview"
order: 1
date_created: "2021-03-02"
date_modified: "2024-05-12"
---

<style src="./styles.scss"></style>

2021-1학기 서울대 강화학습(M3309.000200) 강의 노트

도서 <Reinforcement Learning: An Introduction (2nd Edition)> by Richard S. Sutton and Andrew G. Barto 내용을 정리함

<v-image src="https://m.media-amazon.com/images/I/71nk3rOK3jL._SL1500_.jpg" description="<Reinforcement Learning: An Introduction (2nd Edition)>, Richard S. Sutton and Andrew G. Barto" />

# 강화학습이란?

일반적으로 기계학습은 지도학습(Supervised Learning)과 비지도학습(Unsupervised Learning)으로 분류할 수 있다.

- 지도학습 (Supervised Learning) : 데이터 인스턴스 $x$와 레이블(label) $y$가 주어지는 경우  ex. 분류(Classificaiton), 회귀(Regression)
- 비지도학습 (Unsupervised Learning) : 데이터 인스턴스 $x$가 주어지지만 레이블 $y$는 주어지지 않는 경우  ex. 클러스터링(Clustering)

하지만 강화학습(Reinforcement Learning)은 지도학습, 비지도학습과 다른, 조금 더 일반화된 학습 형태라 할 수 있다. 강화학습은 어떤 환경(environment) 안에서 정의된 에이전트(agent)가 현재의 상태(state)를 인식하여, 선택 가능한 행동(action) 중 보상(reward)을 최대화하는 방향을 선택하게 하는 기계학습 방법을 의미한다.

강화학습에의 보상(reward)은 지도학습에의 레이블(label)과 유사하다. 하지만 보상(reward)는 다음과 같은 차이점이 있다.

- 보상(reward)은 에이전트(agent)의 행동에 따라 바뀔 수도 있다.
- 보상(reward)이 지금 당장 주어지지 않을 수도 있다.
- 현재의 보상(reward)이 좋은 건지(good) 나쁜 건지(bad) 알 수가 없다.  ex. 보상 "10"은 좋은 것일까 나쁜 것일까?

강화학습에서의 환경(environment)은 명확하지 않은(uncertain) 경우가 많다. 따라서 에이전트(agent)는 다양한 시도를 통해 환경(environment)를 파악해야 한다.

에이전트가 앞으로 할 행동을 결정하는 방법을 정책(policy)라 한다. 정책에는 두 가지 종류가 있다.

- 결정론적 정책(deterministic policy) : 특정 상태(state)에서는 반드시 특정 행동(action)을 하도록 정해져 있는 정책
- 확률적 정책(stochastic policy) : 특정 상태(state)에서 어떤 행동(action)을 할 지 확률적으로 결정하는 정책

결정론적 정책(deterministic policy)과 확률적 정책(stochastic policy) 중 어느 것이 더 나을까? 고정된 목표가 있는 경우 결정론적 정책(deterministic policy)이 더 좋다. 하지만 강화학습으로 푸는 많은 문제에서는 목적지가 정해져 있지 않은 경우가 많다. 목적지가 불명확한 경우 확률적 정책(stochastic policy)이 조금 더 좋다.
