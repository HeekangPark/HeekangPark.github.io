---
title: "자바스크립트 비동기"
tags: ["callback", "promise"]
date_created: "2020-09-28"
date_modified: "2024-03-29"
---

[[toc]]

자바스크립트를 공부하다 보면 **비동기(asynchronous)** 라는 말을 듣게 된다. 이를테면, "Node.js는 비동기적으로 작동해 성능이 좋다" 등과 같은 말을 한 번쯤은 들어봤을 것이다. 본 문서에서는 비동기의 의미와 자바스크립트에서 비동기를 어떻게 사용하는지에 대해 알아보겠다.

# 동기(synchronous)와 비동기(asynchronous)

우선 비동기라는 말이 구체적으로 무슨 의미인지부터 알아보자.

비동기는 동기(synchronous)의 반댓말이다. 다음 자바스크립트 코드를 보자.

```js:line-numbers
function connect_to_db() {
  console.log("connected to db")
}

function 
```

위 코드의 실행 결과는 어떻게 나올까? 당연히 "Task A", "Task B", "Task C" 순서대로 출력될 것이다.

```text
Task A
Task B
Task C
```

이 지극히 당연한 현상을 한번 말로 풀어보자. 우선 `taskA()` 함수가 실행되면서 "Task A"가 출력된다. `taskB()` 함수는 언제 실행될까? `taskB()` 함수는 `taskA()` 함수가 리턴되기 전에는 절대 실행되지 않는다. `taskB()` 함수는 `taskA()` 함수가 모두 실행되기를 기다렸다가, `taskA()` 함수가 실행이 완료된 이후 실행된다 마찬가지로 `taskC()` 함수 역시 `taskB()` 함수가 리턴되고 난 이후에 실행된다. 그 결과 "Task A", "Task B", "Task C"와 같이, 함수가 호출된 순서 그대로 실행된다.



이처럼 **코드가 호출된 순서 그대로 실행되는 것**을 **동기적(Synchronous)** 이라 한다. 동기적인 코드에서 다음 

전혀 새삼스러울 게 없는 개념이다. 우리가 배우는 대부분의 프로그래밍 언어(C, 자바, 파이썬, 심지어 자바스크립트)에서 코드는 기본적으로 위에서 아래로, top-down 방식으로, 작성한 순서 그대로 순차적으로 실행된다. 즉, 동기적이다. ~~이 현상에 '동기적'이란 말을 붙인게 오히려 새삼스러울 지경이다.~~

하지만 다음 자바스크립트 코드를 보자.

```js:line-numbers
console.log("First line");
setTimeout(() => {
  console.log("Second line");
}, 1000);
console.log("Third line");
```

위 코드에서도 `console.log()` 함수를 세 번 호출했지만, 두 번째 호출은 `setTimeout()` 함수에 인자로 전달된 함수 내부에 있다. `setTimeout()` 함수는 인자로 전달된 함수를 1초 후에 실행하도록 예약하는 함수이다. 이 코드를 실행하면 어떻게 될까?

```output
First line
Third line
Second line
```

위 코드를 실행하면 "First line"이 출력되고, 그 다음 "Second line"이 출력되는 대신 "Third line"이 출력된다. 그리고 1초 후에 "Second line"이 출력된다. 이처럼 **코드가 작성된 순서와 실행 순서가 다른 것**을 **비동기적(Asynchronous)** 이라 한다.

::: details 심화: 블로킹(blocking)과 논블로킹(non-blocking)

동기/비동기를 논할 때 함께 생각해 봐야 할 개념이 바로 **블로킹(blocking)** 과 **논블로킹(non-blocking)** 이다.

블로킹은 **어떤 작업이 시작되면 해당 작업이 제어권을 반환하지 않아, 해당 작업이 끝날 때까지 다른 작업을 수행할 수 없는 것**을 말한다. 즉 해당 작업이 다른 작업의 실행을 막는(blocking) 것이다. 다음 자바스크립트 코드를 보자.

```js:line-numbers
function task() {
  console.log("Task started");
  for (let i = 0; i < 1000000000; i++) {
    console.log(i);
  }
  console.log("Task ended");
}

console.log("Start");
task();
console.log("End");
```

위 코드에서 9번째 줄의 `console.log()` 함수가 "Start"를 출력하고 난 후, 프로그램의 제어권은 `task()` 함수로 넘어간다. `task()` 함수는 모든 작업이 완료되고 난 후에야 그 제어권을 반환하고, 그제서야 11번째 줄의 `console.log()` 함수가 "End"를 출력한다. 즉 `task()`는 다른 작업의 실행을 막아, `task()` 함수가 실행되는 동안에는 다른 작업이 실행될 수 없다. 이와 같은 `task()` 함수의 행동을 블로킹이라 한다.

반면 논블로킹은 **어떤 작업이 시작되더라도 제어권을 즉시 반환하여, 해당 작업이 끝나지 않아도 다른 작업을 수행할 수 있는 것**을 말한다. 즉 해당 작업이 다른 작업의 실행을 막지 않는(non-blocking) 것이다. 다음 파이썬 코드를 보자.

```python:line-numbers
from multiprocessing import Process

def task():
    print("Task started")
    for i in range(1000000000):
        print(i)
    print("Task ended")
  
print("Start")
p = Process(target=task)
p.start()
print("End")
```

위 코드에서 10번째 줄과 11번째 줄은 새로운 프로세스를 생성하여 `task()` 함수를 실행한다. 9번째 줄의 `print()` 함수가 "Start"를 출력하면, `task()` 함수가 실행되지만 다른 프로세스에서 실행되어 다른 작업을 막지 않는다. 그 결과 12번째 줄의 `print()` 함수는 곧바로 제어권을 받아 "End"를 출력할 수 있다.[^1-1] 이와 같은 `task()` 함수의 행동을 논블로킹이라 한다.

[^1-1]: 컴퓨터에 따라 "Task started"와 숫자들 일부가 먼저 출력되고 "End"가 출력될 수도 있다.

정리하면 다음과 같다.

- 동기/비동기 : 순서의 관점
  - 동기 : 코드 작성 순서와 실행 순서가 같다
  - 비동기 : 코드 작성 순서와 실행 순서가 다르다

- 블로킹/논블로킹 : 작업 진행의 관점
  - 블로킹 : 작업이 시작되면 다른 작업을 수행할 수 없다.
  - 논블로킹 : 작업이 시작되더라도 다른 작업을 수행할 수 있다.

따라서 다음 네 가지 경우를 생각해 볼 수 있다.

- 동기적이면서 블로킹인 경우

  대부분의 동기 코드는 블로킹 코드이다. 코드 실행 순서를 보장하려면 해당 코드가 끝날 때까지 다른 작업을 수행할 수 없어야 하기 때문이다. 위에서 본 `console.log()` 함수를 세 번 호출하는 코드가 한 가지 예시이다.

  ```js:line-numbers
  console.log("First line");
  console.log("Second line");
  console.log("Third line");
  ```

- 동기적이면서 논블로킹인 경우

  동기 코드이면서 논블로킹인 경우는 거의 없다. 매우 비효율적인 코드가 나오기 때문이다. 굳이 예시 상황을 만들어 보면, 다음과 같은 코드를 생각해 볼 수 있다.

  ```js:line-numbers
  console.log("Start");

  let data;
  while(true) {
    data = getData();
    if (data !== "not ready") break;
    // you can do other tasks here!
  }

  console.log("End");
  ```

  여기서 `getData()` 함수는 데이터를 조회해, 데이터가 준비되었으면 그 데이터를, 데이터가 준비되지 않았다면 "not ready"를 즉시 반환하는 논블로킹 함수라 하자. 위 코드는 무한 루프를 이용해 데이터가 준비될 때까지 무한히 대기하다가, 데이터가 준비되면 다음 코드를 실행하는, 동기적이면서 논블로킹인 코드이다. 이때 7번째 줄의 주석이 말하듯이, 데이터가 준비될 때까지 대기하는 동안 다른 작업을 수행한다면 더욱 효율적인 프로그램을 만들 수 있을 것이다. 힘들게 `getData()` 함수를 논블로킹으로 만들어 놨지만 아무러 의미가 없어지지 않았는가.[^1-2]

- 비동기적이면서 블로킹인 경우

  위에서 본 파이썬 멀티프로세싱 코드는 비동기 코드이면서 블로킹인 경우이다. `task()` 함수는 실행되면 다른 작업을 막는 블로킹 함수이지만, 다른 프로세스에서 실행되므로 메인 프로세스에서는 그 동안 다른 작업을 수행할 수 있다.

  ```python:line-numbers
  from multiprocessing import Process

  def task():
      print("Task started")
      for i in range(1000000000):
          print(i)
      print("Task ended")
    
  print("Start")
  p = Process(target=task)
  p.start()
  print("End")
  ```

- 비동기적이면서 논블로킹인 경우

  위에서 본 `setTimeout()` 함수를 사용하는 코드는 비동기 코드이면서 논블로킹인 경우이다. `setTimeout()` 함수는 제어권을 즉시 반환해 다음 코드를 실행할 수 있게 하는 논블로킹 함수이고, 그 결과 코드의 실행 순서는 작성 순서와 다르게 된다.

  ```js:line-numbers
  console.log("First line");
  setTimeout(() => {
    console.log("Second line");
  }, 1000);
  console.log("Third line");
  ```

[^1-2]: 물론 프로그램에 따라 무한루프를 돌며 값이 준비될 때까지 무한히 대기하는 선택지 말고는 선택할 수 있는 선택지가 없는 경우도 있다(ex. 다른 작업을 수행하기 위해서 반드시 해당 데이터가 필요한 경우 등). 이런 경우에는 비효율적이라 말할 수 없다.

위에서 볼 수 있듯이 비동기가 반드시 논블로킹인 것은 아니다. 멀티프로세싱, 멀티스레딩 등을 이용하면 비동기 코드이면서 블로킹인 코드를 작성할 수 있다. 사실 Node.js의 성능은 비동기성에서 온다는 말은, 엄밀히 말하면 비동기성이 아니라 논블로킹에서 온다고 해야 할 것이다. 하지만 기본적으로 단일 쓰레드에서 동작하는 자바스크립트에서는 비동기 코드 = 논블로킹 코드라고 생각해도 크게 무리가 없다.

:::




**자바스크립트는 기본적으로 단일 쓰레드(Single Thread)에서 동기적(Synchronous)으로 작동한다**. 이 말을 풀어 얘기하면, 산술 연산, DOM 및 UI 조작 등 모든 종류의 자바스크립트 코드는 하나의 쓰레드에서, 위에서부터 아래로, 순차적으로 실행된다는 것이다.

이때 다음과 같이 아주 길고 복잡한 연산을 수행하는 코드 블럭 A와, UI를 업데이트 하는 코드 블럭 B가 순차적으로 있다고 해 보자.

```js
/* CODE BLOCK A
// 아주 길고 복잡한 연산...
// END OF CODE BLOCK */

/* CODE BLOCK B
// UI 업데이트
// END OF CODE BLOCK */
```

자바스크립트는 단일쓰레드에서 동기적으로 작동하므로, UI를 업데이트하는 코드 블럭 B는 코드 블럭 A가 다 실행되고 난 이후에야 실행 가능하다. 이를 코드 블럭 A가 코드 블럭 B를 블로킹(Blocking)하고 있다고 표현한다. 이렇게 되면 UI가 오랬동안 업데이트되지 않으므로(= 코드 블럭 B가 실행될 때까지 오랜 시간이 걸리므로) 사용자에게는 시스템이 죽은 것처럼 보이게 된다.

반응성이 중요한 웹 브라우저에게 이는 심각한 문제이다. 그래서 웹 브라우저 개발자들은 비동기를 지원하는 "Web API"를 만들어 자바스크립트를 비동기식으로 사용 가능하게 만들었다.[^1] 즉, 웹 브라우저에서 자바스크립트의 비동기 실행을 가능케 하는 것은 자바스크립트 언어가 아닌, 웹 브라우저인 것이다. Node.js에서도 비슷하게, 자바스크립트 언어가 아닌 "libuv" 모듈이 자바스크립트의 비동기적 실행을 가능케 한다.

[^1]: Web API는 비동기성 이외에도 DOM 조작 등의 기능을 제공한다. 자바스크립트가 웹 페이지를 조작하는데 주로 사용되는 언어이다 보니 혼동이 일어나기 쉬운 부분인데, DOM 조작 등의 기능는 자바스크립트 언어 차원에서 자체적으로 제공하는 기능이 아닌, Web API(브라우저)가 제공하는 기능이다. Node.js에서 `document.getElementById()`, `document.querySelector()`, `document.createElement()`과 같은 DOM 조작 함수들을 사용할 수 없는 것이 바로 이 때문이다. Node.js에는 Web API가 없기 때문이다. 참고로 Web API의 DOM 조작 함수들은 대부분 동기식으로 작동한다.
