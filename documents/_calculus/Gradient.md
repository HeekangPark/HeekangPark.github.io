---
title: "그라디언트(Gradient)"
date: "2020-05-01"
---

# 그라디언트(Gradient)
그라디언트는 벡터로서, 각 원소는 각 변수에 대해 함수를 편미분하여 얻을 수 있다. 그라디언트는 기호 $\nabla$("델(del) 연산자" 혹은 "나블라(nabla)"라 읽음)를 써서 표기한다.

$$\nabla f(w_1, w_2, \dots, w_p) = [\frac {\partial f}{\partial w_1}, \frac {\partial f}{\partial w_2}, \dots, \frac {\partial f}{\partial w_p}]$$

# 예시

다음 함수에 대해 그라디언트를 구해보자.

$$f(x, y) = x^2 +xy - 2x - y^2$$

각 변수에 대해 편미분하면

$$\nabla \frac{\partial f}{\partial x} = 2x + y - 2$$

$$\nabla \frac{\partial f}{\partial y} = x - 2y$$

이므로,

$$\nabla f(x, y) = [2x + y - 2, x - 2y] $$

가 된다.