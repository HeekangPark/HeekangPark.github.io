---
title: "자바스크립트 비동기"
tags: ["callback", "promise"]
date_created: "2020-09-28"
date_modified: "2021-10-14"
---

# 자바스크립트와 비동기

Node.js가 자바스크립트 프레임워크이고, 단일 쓰레드에서 비동기적(Asynchronous)으로 작동한다는 사실을 모르는 개발자는 거의 없을 것이다. 그런데 이 사실이 너무 유명해지다 보니, 자바스크립트 언어 자체가 비동기적으로 구동된다고 착각하는 개발자들이 많은 것 같다.

**자바스크립트는 기본적으로 단일 쓰레드(Single Thread)에서 동기적(Synchronous)으로 작동한다**. 이 말을 풀어 얘기하면, 산술 연산, DOM 및 UI 조작 등 모든 종류의 자바스크립트 코드는 하나의 쓰레드에서, 위에서부터 아래로, 순차적으로 실행된다는 것이다.

이때 다음과 같이 아주 길고 복잡한 연산을 수행하는 코드 블럭 A와, UI를 업데이트 하는 코드 블럭 B가 순차적으로 있다고 해 보자.

{% highlight javascript %}
/* CODE BLOCK A
// 아주 길고 복잡한 연산...
// END OF CODE BLOCK */

/* CODE BLOCK B
// UI 업데이트
// END OF CODE BLOCK */
{% endhighlight %}

자바스크립트는 단일쓰레드에서 동기적으로 작동하므로, UI를 업데이트하는 코드 블럭 B는 코드 블럭 A가 다 실행되고 난 이후에야 실행 가능하다. 이를 코드 블럭 A가 코드 블럭 B를 블로킹(Blocking)하고 있다고 표현한다. 이렇게 되면 UI가 오랬동안 업데이트되지 않으므로(= 코드 블럭 B가 실행될 때까지 오랜 시간이 걸리므로) 사용자에게는 시스템이 죽은 것처럼 보이게 된다.

반응성이 중요한 웹 브라우저에게 이는 심각한 문제이다. 그래서 웹 브라우저 개발자들은 비동기를 지원하는 "Web API"를 만들어 자바스크립트를 비동기식으로 사용 가능하게 만들었다.[^1] 즉, 웹 브라우저에서 자바스크립트의 비동기 실행을 가능케 하는 것은 자바스크립트 언어가 아닌, 웹 브라우저인 것이다. Node.js에서도 비슷하게, 자바스크립트 언어가 아닌 "libuv" 모듈이 자바스크립트의 비동기적 실행을 가능케 한다.

[^1]: Web API는 비동기성 이외에도 DOM 조작 등의 기능을 제공한다. 자바스크립트가 웹 페이지를 조작하는데 주로 사용되는 언어이다 보니 혼동이 일어나기 쉬운 부분인데, DOM 조작 등의 기능는 자바스크립트 언어 차원에서 자체적으로 제공하는 기능이 아닌, Web API(브라우저)가 제공하는 기능이다. Node.js에서 `document.getElementById()`, `document.querySelector()`, `document.createElement()`과 같은 DOM 조작 함수들을 사용할 수 없는 것이 바로 이 때문이다. Node.js에는 Web API가 없기 때문이다. 참고로 Web API의 DOM 조작 함수들은 대부분 동기식으로 작동한다.

{% include caption-img.html src="async-web-browser.png" title="Fig.01 웹 브라우저와 자바스크립트" description="웹 브라우저는 Web API를 이용해 비동기 자바스크립트를 구현한다." %}

웹 브라우저가 비동기 자바스크립트 코드를 실행하는 순서는 다음과 같다.[^2]

[^2]: Node.js에서 비동기 코드가 실행되는 과정도 이와 크게 다르지 않다.

1. 개발자는 Web API가 제공하는 비동기 함수(`setInterval()`, `setTimeout()`, `XMLHttpRequest` 등)를 이용해 비동기 자바스크립트 코드를 작성한다.
2. 자바스크립트 엔진(JS Engine)[^3]은 자바스크립트를 해석해 (동기적으로) 실행한다. 이때 비동기 Web API를 만나면 전달받은 콜백 함수(Callback Function)를 콜백 큐(Callback Queue)[^4]에 넣는다.
3. 자바스크립트 엔진의 콜 스택(Call Stack)에 쌓인 모든 코드가 실행 완료되면 이벤트 루프(Event Loop)는 콜백 큐에 있는 첫 번째 콜백 함수를 자바스크립트 엔진의 콜 스택에 넣는다.
4. 자바스크립트 엔진은 콜 스텍에 들어온 콜백 함수를 처리한다. 이후 콜백 큐가 빌 때까지 이 과정을 반복한다.[^5]

[^3]: 자바스크립트 코드를 해석(interpreting)하고 실행하는 프로그램. Google의 [V8 Engine](https://v8.dev/) 등이 유명하다. V8 Engine은 크롬 웹 브라우저와 Node.js에서 사용된다. Fig.01에서 자바스크립트 엔진(JS Engine)은 하나의 콜 스택만을 가지고 있는 것을 볼 수 있다. 자바스크립트 엔진은 이 콜 스택 하나만을 가지고 단일 쓰레드 환경에서 코드를 실행한다.
[^4]: Fig.01에서는 편의상 하나로만 그렸지만, 사실 콜백 큐는 Task Queue, Microtask Queue, Animation Frames 등 종류가 많다. 실행하는 비동기 함수의 종류에 따라 각기 다른 큐를 사용한다. 각 큐는 우선순위가 있어, 상위 우선순위의 큐가 먼저 비워진 후에 하위 우선순위의 큐가 비워진다.
[^5]: 이 반복적인 동작을 틱(tick)이라 한다.

대부분의 개발자들은 비동기식보다 동기식의 코드 작성이 익숙하다 보니, 많은 자바스크립트 프레임워크에서 편의를 위해 비동기식 함수와 동기식 함수를 동시에 제공하는 경우가 많다.[^6] 하지만 동기식으로 작성된 코드는 뒤의 모든 작업(UI 갱신 등)을 블로킹하므로, 파일 시스템 접근, DB 접근, AJAX 요청 등 **시간이 오래 걸릴 작업은 비동기 방식으로 코드를 작성해야 한다.**

[^6]: 예를 들어 Node.js에서는 파일의 내용을 읽을 수 있는 비동기식 함수 `fs.readFile()`와 동기식 함수 `fs.readFileSync()`를 함께 제공한다.

# 비동기 코드에서 순차 실행 코드 작성하기

비동기적으로 코드를 작성하는 것이 자바스크립트 코드의 실행 성능 향상에 큰 도움이 된다는 것은 충분히 설명한 것 같다. 그런데 비동기식으로 코드를 작성할 때에는 반드시 한번 생각해 봐야 하는 것이 있다. 다음 코드를 보자.

{% highlight javascript linenos %}
var x = 0;
x = update_x_async();
console.log(x);
{% endhighlight %}

코드 작성자의 의도는 `x`의 값을 갱신한 후(2번째 줄) 그 결과를 보고 싶다(3번째 줄)는 것이다. 그러나 `x`를 갱신하기 위해 사용한 함수 `update_x_async()`가 비동기적으로 동작하는 함수라면, 이 함수의 실행 시점은 3번째 줄이 실행되고 난 이후일 것이다. 그 결과 3번째 줄의 실행 결과는 항상 0이 된다.

이처럼 개발을 하다 보면 반드시 다른 부분이 먼저 실행되고 난 이후 실행되어야 하는, 순차 실행이 필요한 코드가 발생한다. 동기식으로 코드를 작성하는 경우 이는 고민거리가 아니다. 그냥 순차적으로 실행되어야 하는 코드들을 시간 순서에 맞게 쭉 작성하면, 알아서 위에서부터 아래로, 순차적으로 실행되기 때문이다. 하지만 비동기식 코드에서는 코드 실행 순서를 장담할 수 없으므로 문제가 발생한다.

그렇다면 비동기식 코드에서 순차 실행이 필요한 경우 어떻게 해야 할까? 크게 다음 3가지 방식이 있다.

## 콜백 함수(Callback Function)를 이용한 순차 실행

바쁠 때 누군가 나한테 전화를 하면 그 전화를 미처 받지 못할 때가 있다. 그러면 부재중 전화가 남고, 우리는 바쁜 일이 끝나면 부재중 전화를 보고 해당 번호로 다시 전화를 걸어준다. 이런 일련의 동작을 영어로 콜백(Callback)이라 한다. 콜백 함수(Callback Function)은 바로 여기서 이름을 딴 디자인 패턴이다. 아래 코드를 보자.

{% highlight javascript linenos %}
function B() {
    console.log("Complete!");
}

function A(callback_func) {
    for(var i = 0; i < 10; i++) {
        console.log(i);
    }

    callback_func();
}

// Execution
A(B);
{% endhighlight %}

{:.code-result}
{% highlight text %}
0
1
2
3
4
5
6
7
8
9
Complete!
{% endhighlight %}

자바스크립트에서 함수는 일급 객체(First-class Object)[^7]로서, 다른 함수의 인자(Parameter)로 넘길 수 있다. 위 코드의 14번째 줄에서 함수 A를 실행할 때 함수 B를 인자로서 넘기는 것을 볼 수 있다. 함수 A는 본인의 로직(6 ~ 8번째 줄) 실행이 끝난 후 종료 직전에 함수 B를 호출한다(10번째 줄). 이렇게 함수의 코드가 다 실행된 후 전달받은 함수(B)를 마지막에 호출하는 패턴을 **콜백(Callback)**이라 부르고, B와 같이 전달된 함수를 **콜백 함수(Callback Function)**라 부른다.

[^7]: 일급 객체(First-class Object)란 다른 일반적인 객체(ex. 클래스 등)에 적용 가능한 연산을 모두 지원하는 객체를 말한다. 일급 객체라고 뭔가 특별한 권한이 있는건 아니고 (다른 객체들처럼 연산이 가능한) 그냥 "평범한" 객체라고 이해하면 된다.

콜백 함수를 이용하면 비동기식 코드에서 순차 처리를 만들 수 있다. 콜백 함수는 상술했다시피 인자로 전달한 함수(Caller)의 로직 실행이 모두 끝난 이후 마지막에 호출된다. 따라서 콜백 함수에 "이후에 실행되어야 할 코드"를 넣게 되면 순차처리를 달성할 수 있다. 위의 코드에서 함수 B는 항상 함수 A보다 시간적으로 나중에 실행됨을 보장할 수 있다. 콜백 함수를 이용하는 이 방법은 자바스크립트 비동기 코드에서 순차 처리를 달성하는 가장 기초적인 방법으로, 모든 자바스크립트 런타임에서 사용 가능하다.

### 콜백 함수의 문제점 1 : 콜백 지옥 (Callback Hell)

하지만 콜백 함수를 사용하는 방법에는 문제점이 있다. 첫째로 **콜백 지옥(Callback Hell)**이라 부르는 현상을 일으킬 수 있다. 콜백 지옥이란 순차적인 처리를 위해서 익명 콜백 함수(Anonymous Callback Function) 밑에 익명 콜백 함수를 계속 사용함으로서 다음 코드와 같이 들여쓰기의 수준이 감당하기 힘들 정도로 깊어진 코드를 말한다. 다음 코드와 같이 말이다.

{% highlight javascript linenos %}
function asyncFunc(name, callback) {
    console.log(name);
    if(callback) {
        setTimeout(callback, 10); //0.01초 후에 callback 함수 실행
    }
}

asyncFunc("A", function() {
    asyncFunc("B", function() {
        asyncFunc("C", function() {
            asyncFunc("D", function() {
                asyncFunc("E", function() {
                    asyncFunc("F", function() {
                        asyncFunc("G", function() {
                            console.log("Done!")
                        });
                    });
                });
            });
        });
    });
});
{% endhighlight %}

{:.code-result}
{% highlight text %}
A
B
C
D
E
F
G
Done!
{% endhighlight %}

콜백 지옥은 코드가 한 눈에 들어오지 않아 미관상 보기도 좋지 않고, 디버깅도 어렵다.~~당장 괄호 짝 맞추는 것부터 어렵다.~~

익명 함수(Anonymous Function)을 사용하지 않고 모든 콜백 함수에 이름을 붙이면 콜백 지옥을 없앨 수 있긴 하다. 하지만 한 번밖에 사용하지 않을 코드를 함수로 만들면 함수가 너무 많아진다는 점, 함수 정의부와 사용부가 너무 멀어져 디버깅이 어려워진다는 점, 이전 함수에서 사용한 변수를 사용하려면 추가적인 변수 전달이 필요해진다는 점 등의 단점이 있어 어쩔 수 없이 익명 함수를 이용해 콜백 함수를 작성한다.~~그리고 콜백 지옥을 마주한다.~~

### 콜백 함수의 문제점 2 : 예외 처리

콜백 함수에서 발생한 예외는 일반적인 `try ... catch`문으로 잡을 수 없다.

{% highlight javascript linenos %}
function asyncFunc(name, callback) {
    console.log(name);
    if(callback) {
        setTimeout(callback, 10); //0.01초 후에 callback 함수 실행
    }
}

try {
    asyncFunc("A", function() {
        throw new Error("Something goes wrong...");
    });
} catch (e) {
    console.log(e);
}
{% endhighlight %}

{:.code-result}
{% highlight text %}
A
[오류 발생]
{% endhighlight %}

위 코드의 10번째 줄에서 발생한 예외는 `try...catch` 구문에서 잡히지 않는다. 원래 호출된 함수(callee)에서 발생한 예외는 호출한 함수(caller)가 맡아 처리해야 하는데, 콜백 구조에서 콜백 함수를 호출한 `setTimeout` 함수는 비동기 함수이므로 콜백 함수 호출 후 종료되어 버리기 때문에(= 콜 스택에서 제거되기 때문에) 예외가 처리되지 않는다.[^8]

[^8]: 사실 이 설명은 엄밀하진 않다. 엄밀히 말하자면 `setTimeout` 함수는 콜백 함수를 자바스크립트 프레임워크의 타이머에 등록하는 역할을 하는 함수이고, 실제로 콜백 함수를 호출하는 것은 프레임워크의 타이머이다. 타이머는 `try...catch` 구문으로 감싸져 있지 않으므로 예외는 처리되지 않는다.

이 예외를 잡으려면 코드가 많이 더러워진다. 예를 들어, 다음과 같이 콜백 함수에서 직접 `try...catch` 구문을 쓰는 방법이 있다.

{% highlight javascript linenos %}
// 방법 1 : 콜백 함수에서 직접 try-catch 구문을 사용
function asyncFunc(name, callback) {
    console.log(name);
    if(callback) {
        setTimeout(callback, 10); //0.01초 후에 callback 함수 실행
    }
}

asyncFunc("A", function() {
    try {
        throw new Error("Something goes wrong...");
    } catch(e) {
        console.log(e.message);
    }
});
{% endhighlight %}

{:.code-result}
{% highlight text %}
A
Something goes wrong...
{% endhighlight %}

이 방법은 동일한 예외 처리 로직을 사용하더라도 매 콜백 함수마다 일일이 `try...catch` 구문을 하나씩 직접 입력해야 한다는 단점이 있다. 다음과 같이 예외 처리를 위한 핸들러 함수를 만들면 이 문제를 해결할 수 있긴 하다.

{% highlight javascript linenos %}
// 방법 2 : 예외 처리를 위한 핸들러 함수 사용
function asyncFunc(name, callback) {
    console.log(name);
    if(callback) {
        setTimeout(callback, 10); //0.01초 후에 callback 함수 실행
    }
}

function errorHandler(func, params) {
    return function() {
        try {
            return func.apply(this, params);
        } catch(e) {
            console.log(e.message);
        }
    }
}

asyncFunc("A", errorHandler(function() {
    throw new Error("Something goes wrong...");
}));
{% endhighlight %}

{:.code-result}
{% highlight text %}
A
Something goes wrong...
{% endhighlight %}

하지만 이 방법도 콜백을 등록할 때 계속 핸들러 함수를 같이 입력해야 하기에, `try...catch`를 사용하는 직관적인 방식보다 번잡스럽다.

이 때문에 Node.js와 같은 많은 비동기 자바스크립트 라이브러리에서는 예외처리를 구현하기 위해 다음과 같은 규칙(convention)을 만들어 사용하고 있다.

- 예외가 발생한 경우 해당 예외를 콜백 함수로 전달한다. 즉, 예외처리의 책임을 함수를 호출한 함수(caller)가 아닌 콜백 함수가 지게 하는 것이다. 일반적으로 콜백 함수로 전달되는 첫 번째 인자(argument)는 예외를 전달하기 위해 사용한다.[^9]
- 콜백 함수에서 (`try...catch` 구문이 아닌) `if...else` 구문으로 예외처리를 진행한다.

그래서 콜백 함수는 실행되자마자 자신을 호출한 함수(caller)가 예외를 전달했는지 여부를 `if...else` 구문을 통해 확인해, 만약 예외가 전달되었다면 적절한 처리를 해 주어야 한다.

[^9]: 실제 데이터는 두 번째 인자부터 전달한다. 만약 전달할 예외가 없다면 첫 번쨰 인자로 `null` 또는 `undefined`를 전달한다.

{% highlight javascript linenos %}
var fs = require("fs");

fs.readFile("foo.txt", "utf-8", function(err, data) {
    //콜백 함수가 fs.readFile() 함수의 예외처리의 책임을 진다.
    //첫 번째 인자 err은 예외 정보를 담고 있고, 두 번째 인자부터 실제 데이터가 담긴다.

    if(err) { //콜백 함수는 실행되지마자 예외가 전달되었는지 확인해야 한다.
        handleError(err); //만약 예외가 전달되었으면 적절한 처리를 한다.
    } else {
        processData(data);
    }
});
{% endhighlight %}

## Promise를 이용한 순차 실행

비동기 코드에서 순차 실행이 필요한 코드를 작성하는 두 번째 방법은 Promise를 이용하는 것이다. Promise는 ES6에 새로 추가된 기능으로, IE11을 제외하면 현존하는 대부분의 브라우저(구글 크롬, 모질라 파이어폭스, 마이크로소프트 엣지, 사파리 등), 모바일 브라우저(삼성 브라우저, 오페라 모바일 등), Node.js 등에서 사용 가능하다.

### Promise 객체 생성하기

Promise는 쉽게 말해 "값을 저장할 수 있는 상태 머신(state machine)"으로, `new` 키워드를 이용해 생성 가능하다. Promise는 생성될 때 함수 하나를 인자로 받는다. 이 함수를 **실행 함수(executor)**라 부른다. 만약 Promise 객체를 생성할 때 아무런 인자를 전달하지 않거나, 함수 이외의 값을 전달하면 `TypeError`가 발생한다.

{% highlight javascript linenos %}
new Promise(function(resolve, reject) { //이 함수를 실행 함수(executor)라 한다.
    //do something...
})
{% endhighlight %}

위 코드에서 볼 수 있듯이, 실행 함수는 각각 순서대로 `resolve`와 `reject`라는 두 개의 매개변수를 받는다. `resolve`와 `reject`는 Promise 객체 내부에 존재하는 (콜백) 메소드들로, (실행 함수에 매개변수로 전달되었으므로) 실행 함수 안에서 호출할 수 있다. 이 메소드들의 동작을 이해하려면 Promise 객체의 상태에 대해 알아야 한다.

Promise 객체는 다음 3가지 상태 중 하나를 갖는다.

- 대기(pending) : 실행 함수가 아직 실행 완료되지 않음
- 성공(resolved, fulfilled) : 실행 함수가 성공적으로 실행 완료됨
- 실패(rejected) : 실행 함수 실행 중 오류가 발생함(실행 완료되긴 함)

참고로 성공 상태와 실패 상태를 통칭해 완료(settled) 상태라 부른다. 실행 함수에서 `resolve()` 함수와 `reject()` 함수는 다음과 같이 동작한다.

1. `new` 키워드로 Promise 객체가 처음 생성되면, Promise 객체는 대기 상태에 있게 되고, 실행 함수는 즉시 실행된다.
2. 실행 함수 실행 중 `resolve()` 또는 `reject()` 함수 호출을 만난다.
    - `resolve()` 함수는 **실행 함수가 성공적으로 잘 실행되었음을 알리는 역할을 한다.** 실행 함수 실행 중 `resolve()` 함수 호출을 만나게 되면, Promise 객체는 성공 상태로 변하고, `resolve()` 함수의 인자로 주어진 값은 Promise 객체에 저장된다.
    - `reject()` 함수는 **실행 함수 실행 중 오류가 발생했음을 알리는 역할을 한다.** 실행 함수 실행 중 `reject()` 함수 호출을 만나게 되면, Promise 객체는 실패 상태로 변하고, `reject()` 함수의 인자로 주어진 값[^10]은 Promise 객체에 저장된다.

[^10]: `reject()` 객체는 저장하는 값의 종류를 특별히 가리진 않지만, 일반적으로 `Error` 객체를 저장한다.

{% include caption-img.html src="async-promise-state.png" title="Fig.02 Promise 객체의 상태 변화" description="Promise 객체는 반드시 대기(pending), 성공(resolved), 실패(rejected), 세 가지 상태 중 하나에 있다. 한번 완료(settled) 상태가 된 Promise 객체는 변경되지 않는다." %}

`resolve()` 함수 또는 `reject()` 함수를 호출해 완료 상태가 된 Promise 객체는 변경되지 않는다.[^11] 이 때문에 `resolve()` 함수 또는 `reject()` 함수를 여러 번 호출해도 가장 처음 만나는 함수만 유의미하고(= 값을 저장할 수 있고), 나머지 함수 호출들은 무의미하다.

[^11]: Fig.02를 보면 성공 또는 실패 상태가 된 Promise 객체에서 뻗어나가는 화살표가 없다.

또한 Promise 객체에 값을 저장하려면 반드시 `resolve()` 함수 또는 `reject()` 함수를 호출해야 한다. `resolve()` 함수 또는 `reject()` 함수를 호출하지 않고 다른 방식(ex. `return (반환값)`)을 사용하면 값이 저장되지 않는다.[^12] 그러나 `resolve()` 함수 또는 `reject()` 함수가 호출되었다고 실행 함수가 종료되는 것은 아니다. 함수를 종료시키려면 (우리 모두 잘 알고 있는) `return`을 통해 종료시켜야 한다. 즉 (필요하다면) `resolve()` 또는 `reject()` 함수를 호출해 값을 '저장'한 후, 로그를 남기거나 연결을 정리하는 등의 후속 작업을 할 수 있다.[^13]

[^12]: Promise 객체는 계속 대기 상태에 있게 된다.
[^13]: 하지만 일반적으로 이렇게 하기보단 아래에서 설명할 `.then()` 메소드 또는 `.finally()` 메소드를 사용해 후속 작업을 처리한다.

### Promise 객체 사용하기

`resolve()` 또는 `reject()`로 Promise 객체에 값을 저장했다면, 그 값을 꺼내볼 수도 있을 것이다. `resolve()` 함수로 저장한 값은 `.then()` 메소드로, `reject()` 함수로 저장한 값은 `.catch()` 메소드로 꺼낼 수 있다. 하나씩 자세히 알아보자.

#### .then() 메소드

`.then()` 메소드는 다음과 같이 함수 하나를 인자로 받는다.[^14] 이 함수를 `.then()` 메소드의 핸들러(handler)라 부른다.

[^14]: 사실 `.then()` 메소드는 함수 두 개를 인자로 받을 수 있다. 첫 번째 인자로 주어지는 함수(`.then()` 메소드의 핸들러)는 Promise 객체가 성공 상태가 되었을 때 실행되는 함수이고, 두 번째 인자로 주어지는 함수는 Promise 객체가 실패 상태가 되었을 때 실행되는, 예외 처리를 위한 함수이다. 하지만 예외 처리를 위해서는 상위호환 격인 `.catch()` 메소드를 이용하는 것이 좋다. `.then()` 메소드의 두 번째 인자로 주어지는 함수로는 (실행 함수의 예외는 잡을 수 있지만) `.then()` 메소드의 핸들러에서의 예외를 잡을 수 없다. 하지만 `.catch()` 메소드를 사용하면 (아래에서 설명하듯이) 실행 함수의 예외뿐만 아니라 `.then()` 메소드의 핸들러에서 발생하는 예외까지도 잡을 수 있다.

{% highlight javascript linenos %}
(promise 객체).then(function(data) {
    //do something...
})
{% endhighlight %}

`.then()` 메소드의 핸들러는 실행 함수가 성공 상태가 되면(= `resolve()` 함수가 호출되면) 실행된다. 다시 말해, 실행 함수가 성공 상태가 되기 전에는(= `resolve()` 함수가 호출되기 전에는) `.then()` 메소드의 핸들러는 실행되지 않는다. 즉, `.then()` 메소드의 핸들러는 무조건 실행 함수 실행 이후에 실행된다.

{% highlight javascript linenos %}
let promise = new Promise(function(resolve, reject) {
    console.log("In Executor : 1");
    setTimeout(function() { //1초 후 실행되는 비동기 코드
        console.log("In Executor : 2");
        resolve(9876);
    }, 1000);
    console.log("In Executor : 3");
});

promise.then(function(data) {
    console.log(`In then : data = ${data}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
In Executor : 1
In Executor : 3
In Executor : 2
In then : data = 9876
{% endhighlight %}

위 코드을 보면, 1번째 줄에서 Promise 객체를 생성해 변수 `promise`에 저장했다. 해당 Promise 객체는 1초 후 `9876`을 저장하는(`resolve()`, 5번째 줄) 비동기 코드를 포함하는 실행 함수를 가지고 있다. 그리고 10번째 줄에서 `.then()` 메소드가 사용되었다. `resolve()`가 실행되어야 `.then()` 메소드의 함수가 실행되므로, 위 코드의 11번째 줄, `In then : ...`는 가장 마지막에 실행된다. 또한 `.then()` 메소드의 핸들러의 첫 번째 매개변수(`data`)를 읽음으로서 `resolve()`로 저장한 값을 성공적으로 읽어온 것을 볼 수 있다.[^15]

[^15]: 콜백 함수에서는 여러 개의 인자를 주어 여러 개의 값을 전달할 수 있었지만, Promise에서 `resolve()` 또는 `reject()`로 전달할 수 있는 값은 하나만 가능하다. Promise를 사용하면서 여러 개의 값을 전달해야 한다면 하나의 객체(object)로 묶어서 보내야 한다.

#### .catch() 메소드

`.catch()` 메소드는 다음과 같이 함수 하나를 인자로 받는다. 이 함수를 `.catch()` 메소드의 핸들러(handler)라 부른다.

{% highlight javascript linenos %}
(promise 객체).catch(function(data) {
    //do something...
})
{% endhighlight %}

`.catch()` 메소드는 `try...catch` 구문에서 `catch`가 하는 역할과 비슷하다. 실행 함수 실행 중 예외가 발생해 `reject()` 함수로 오류(`Error` 객체)를 전파하면,[^16] `.catch()` 메소드의 핸들러에서 그 오류를 잡을 수 있다. `.catch()` 메소드는 `.then()` 메소드와 비슷하게 실행 함수가 실패 상태가 되어야지만(= `reject()` 함수가 호출되어야지만) 실행된다. 다음 코드는 `.catch()` 메소드를 이용해 예외를 처리하는 상황을 보여준다.

[^16]: 즉 `reject()` 함수는 `throw`와 비슷하다.

{% highlight javascript linenos %}
let promise = new Promise(function(resolve, reject) {
    setTimeout(function() { //1초 후 실행되는 비동기 코드
        reject(new Error("Something goes wrong...")); //예외 발생
    }, 1000);
});

promise.catch(function(err) {
    console.log(err.message); //예외 메시지 출력
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
Something goes wrong...
{% endhighlight %}

#### .finally() 메소드

`.finally()` 메소드는 다음과 같이 함수 하나를 인자로 받는다. 이 함수를 `.finally()` 메소드의 핸들러(handler)라 부른다.

{% highlight javascript linenos %}
(promise 객체).finally(function() {
    //do something...
})
{% endhighlight %}

`.finally()` 메소드는 `try...catch...finally` 구문에서 `finally`가 하는 역할과 비슷하다. `.finally()` 메소드의 핸들러는 Promise 객체가 성공 상태이든 실패 상태이든 항상 실행된다. `.finally()` 메소드는 실행 함수의 성공/실패 여부와 상관없이 보편적인 마무리 작업을 할 수 있도록 설계된 메소드이기 때문에, `finally()` 메소드의 핸들러는 매개변수가 없다. 다음 코드는 `.finally()` 메소드를 사용하는 상황을 보여준다.

{% highlight javascript linenos %}
let promise = new Promise(function(resolve, reject) {
    setTimeout(function() { //1초 후 실행되는 비동기 코드
        if (Math.random() < 0.5) { //50%의 확률로 resolve()
            resolve(1234);
        } else { //50%의 확률로 reject()
            reject(5678);
        }
    }, 1000);
});

promise.finally(function() {
    console.log("Finally Executed"); //finally() 메소드의 핸들러는 실행 함수의 성공/실패 여부와 상관없이 항상 실행된다.
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
Finally Executed
(50% 확률로 오류 발생)
{% endhighlight %}

위 코드에서, `promise` 변수는 50% 확률로 성공 상태에 진입하고(= `resolve()`가 호출되고) 50% 확률로 실패 상태에 진입하는(= `reject()`가 호출되는) 실행 함수를 가진 Promise 객체를 담고 있다. 11번째 줄의 `.finally()` 메소드의 핸들러는 실행 함수의 성공/실패 여부와 상관없이 항상 실행된다. 하지만 `.finally()` 메소드는 예외 처리를 하진 않는다는 점을 주의하자. (50% 확률로) 실행 함수에서 예외가 발생한 경우 `.finally()` 메소드가 실행은 되나, 예외는 처리되지 않고 전파된다.[^17]

[^17]: 위 예시에서는 전파된 예외를 처리할 수 있는 코드가 없으므로 시스템이 멈추게 된다.

#### Promise Chaining

사실 `.then()` 메소드와 `.catch()` 메소드는 생각보다 더 강력하다. `.then()` 메소드와 `.catch()` 메소드는 항상 Promise를 반환한다. 구체적으로 다음 세 가지 경우가 있다.

- `return value`를 하는 경우 : `value`가 저장된, 성공 상태의 Promise를 반환한다.[^18]
- `throw new Error()`를 하는 경우 : `Error`가 저장된, 실패 상태의 Promise를 반환한다.
- `return new Promise()`를 하는 경우 : 해당 Promise 객체를 반환한다.

[^18]: 실행 함수에서는 `return value`를 해도 Promise를 성공 상태로 바꿀 수 없다는 점에 유의하자. `return value`로 성공 상태의 Promise가 반환되는 것은 `.then()` 또는 `.catch()` 메소드의 핸들러에서만이다.

또한 `.finally()` 메소드는 전달받은 Promise 객체에 어떠한 처리도 하지 않고 그대로 반환한다. 즉, 다음과 같이 `.then()`, `.catch()`, `.finally()`를 연결하여 연속적인 순차 처리를 구현할 수 있다.

{% highlight javascript linenos %}
let promise = new Promise(function(resolve, reject) { //(1) 실행 함수
    let value = 1;
    setTimeout(function() {
        value = value * 2;
        console.log(`1st(Executor) : value = ${value}`);
        resolve(value);
    }, 1000);
});

promise.then(function(value) { //(2) return value 형식. 성공 상태의 Promise를 반환한다.
    value = value * 2;
    console.log(`2nd(then) : value = ${value}`);
    return value;
}).then(function(value) { //(3) return new Promise 형식. 해당 Promise를 반환한다.
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            value = value * 2;
            console.log(`3rd(then) : value = ${value}`);
            resolve(value);
        })
    });
}).then(function(value) { //(4) throw new Error 형식. 실패 상태의 Promise를 반환한다.
    console.log(`4th(then) : value = ${value}`);
    throw new Error("Something goes wrong...");
}).then(function(value) { //(5) (4)번 then() 메소드에서 실패 상태의 Promise를 반환했기에, 이 핸들러는 실행되지 않는다.
    console.log(`5th(then) : value = ${value}`);
}).finally(function() { //(6) finally() 메소드는 Promise가 성공 상태이든 실행 상태이든 항상 실행된다. 그리고 저장된 값을 처리하지 않고 다음 then() 또는 catch()로 그대로 넘긴다.
    console.log("6th(finally)");
}).then(function(value) { //(7) catch() 메소드에서 실패 상태의 Promise를 처리하기 전까진 그 사이에 있는 then() 메소드는 무시된다(= 실행되지 않는다).
    console.log(`7th(then) : value = ${value}`);
}).catch(function(err) { //(8) (4)번 then()에서 던진 실패 상태의 Promise를 처리한다.
    console.log(`8th(catch) : message = ${err.message}`);
    return 10; //return value 형식이므로 성공 상태의, 10이 저장된 Promise를 반환한다.
}).catch(function(err) { //(9) (7)번 catch()에서 성공 상태의 Promise를 반환했기에, 이 핸들러는 실행되지 않는다.
    console.log(`9th(catch) : message = ${err.message}`);
}).finally(function() { //(10) finally() 메소드는 Promise가 성공 상태이든 실행 상태이든 항상 실행된다. 그리고 저장된 값을 처리하지 않고 다음 then() 또는 catch()로 그대로 넘긴다.
    console.log("10th(finally)");
}).catch(function(err) { //(11) then() 메소드에서 성공 상태의 Promise를 처리하기 전까진 그 사이에 있는 catch() 메소드는 무시된다(= 실행되지 않는다).
    console.log(`11th(catch) : message = ${err.message}`);
}).then(function(value) { //(12) (8)번 catch()에서 반환한 성공 상태의 Promise를 처리한다.
    console.log(`12th(then) : value = ${value}`);
});
{% endhighlight %}

{:.code-result}
{% highlight text %}
1st(Executor) : value = 2
2nd(then) : value = 4
3rd(then) : value = 8
4th(then) : value = 8
6th(finally)
8th(catch) : message = Something goes wrong...
10th(finally)
12th(then) : value = 10
{% endhighlight %}

거의 모든 경우 Promise Chaining을 이용해 순차적인 비동기 작업을 구현하는 것이 콜백 함수를 사용하는 것보다 낫다. Promise Chaining을 사용하면 콜백 지옥이 발생하지 않고 들여쓰기 수준이 항상 감당 가능한 수준으로 유지된다. 또한 예외 처리 역시 `.catch()` 메소드로 편하게 할 수 있다.

### Promise 심화

#### thenable

Promise Chaining이 가능한 이유는 `.then()` 메소드의 실행 결과 다시 `.then()` 메소드를 호출할 수 있는 Promise 객체가 반환되기 때문이다. 이 말은, `.then()` 메소드의 핸들러에서 `then`이라는 메소드를 가진 객체를 반환해도 Promise Chaining이 가능하다는 것이다. 이처럼 `then` 메소드를 가져, Promise Chaining할 수 있는 객체를 **thenable**한 객체라 부른다.

{% highlight javascript linenos %}
class MyThenable {
    constructor(value) {
        this.value = value;
    }
    then(resolve, reject) {
        setTimeout(() => { //this를 쓰기 위해 화살표 함수(arrow function) 사용
            let value = this.value * 2;
            console.log(`In MyThenable.then : value = ${value}`);
            resolve(value);
        }, 1000)
    }
}

(new Promise(function(resolve, reject) {
    setTimeout(function() {
        let value = 1;
        console.log(`In Executor : value = ${value}`);
        resolve(value);
    }, 1000)
})).then(function(value) {
    value = value * 2;
    console.log(`In Promise.then : value = ${value}`);
    return new MyThenable(value);
}).then().then(function(value) {
    console.log(`Result : value = ${value}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
In Executor : value = 1
In Promise.then : value = 2
In MyThenable.then : value = 4
Result : value = 4
{% endhighlight %}

자바스크립트 언어 차원에서 Promise를 지원하기 전에 Promise 기능을 독자적으로 구현한 서드파티 라이브러리들이 있었다. thenable의 개념은 이들 라이브러리들과의 호환성을 위해 등장한 개념이다. thenable한 성질을 이용하면 Promise와 호환 가능한 새로운 객체를 마음대로 만들 수 있다.

#### 암시적 try...catch

실행 함수와 `.then()`, `.catch()` 메소드의 핸들러에는 암시적인 `try...catch` 구문이 자동으로 삽입되어 있어, 예외가 발생한 경우 자동으로 실패 상태의 Promise를 반환한다.

{% highlight javascript linenos %}
(new Promise(function(resolve, reject) {
    let x = 1;
    console.log(x.asdf()); //예외 발생 : 존재하지 않는 함수 호출
})).catch(function(err) {
    console.log(`In catch : ${err.message}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
In catch : x.asdf is not a function
{% endhighlight %}

그러나 이는 만능이 아니다. 이 방법으로는 비동기 코드에서의 예외는 잡을 수 없다.

{% highlight javascript linenos %}
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        let x = 1;
        console.log(x.asdf()); //비동기 코드에서의 예외 발생 : 존재하지 않는 함수 호출
    }, 1000)
})).catch(function(err) {
    console.log(`In catch : ${err.message}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
(오류 발생)
{% endhighlight %}

비동기 코드에서의 예외는 다음과 같이 명시적으로 `try...catch`를 써 줘야 한다.

{% highlight javascript linenos %}
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        try {
            let x = 1;
            console.log(x.asdf()); //비동기 코드에서의 예외 발생 : 존재하지 않는 함수 호출
            resolve();
        } catch(err) {
            reject(err);
        }
    }, 1000)
})).catch(function(err) {
    console.log(`In catch : ${err.message}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
In catch : x.asdf is not a function
{% endhighlight %}

#### Promise API

Promise 객체는 여러 개의 정적 메소드(static method)들을 제공한다. 각각에 대해 알아보자.
##### Promise.all()

`Promise.all()`을 이용하면 여러 개의 Promise 객체를 동시에 실행하고, 이들 모두가 성공 상태가 되었을 때 실행할 동작을 설정할 수 있다.

`Promise.all()`은 Promise들의 배열을 인자로 받는다. 모든 Promise들이 성공 상태가 되면, `Promise.all()`은 각 Promise들의 실행 결과들의 배열을 저장한, 성공 상태의 Promise를 반환한다.

{% highlight javascript linenos %}
let promises = [new Promise(function(resolve, reject) {
    console.log("Promise 1 : begin");
    setTimeout(function() {
        console.log("Promise 1 : end");
        resolve(123);
    }, 2000)
}), new Promise(function(resolve, reject) {
    console.log("Promise 2 : begin");
    setTimeout(function() {
        console.log("Promise 2 : end");
        resolve(456);
    }, 1000)
})];

Promise.all(promises).then(function(data) {
    console.log(`then : ${data}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
Promise 1 : begin
Promise 2 : begin
Promise 2 : end
Promise 1 : end
then : 123,456
{% endhighlight %}

위 코드에서, `Promise.all()`은 2초 뒤 123을 저장하는 Promise와 1초 뒤 456을 저장하는 Promise의 배열을 받는다. 이들 Promise가 모두 성공 상태가 되면, 각 Promise의 실행 결과를 모은 배열 `[123, 456]`이 저장된 성공 상태의 배열이 반환된다. 배열의 각 원소의 순서는 `Promise.all()`에 인자로 준 Promise들의 순서와 같다.[^19]

[^19]: 배열의 순서는 Promise의 실행 순서와 아무런 상관이 없는 것에 유의하자. 위 코드에서 두 번째 Promise가 먼저 성공 상태가 되지만, 배열의 순서는 `Promise.all()`에 입력한 Promise 순서대로 나온다.

`Promise.all()`은 인자로 주어진 Promise들 중 하나라도 실패 상태가 되면, 가장 먼저 실패 상태가 된 Promise를 반환한다. 즉, 주어진 Promise들 중 다른 모든 Promise는 다 성공 상태가 되더라도 단 하나의 Promise만이 실패 상태가 되면, `.then()` 메소드가 작동하지 않고, 성공 상태가 된 Promise의 결과값은 받아볼 수 없다. 또한 여러 Promise가 실패 상태가 되더라도, 오직 가장 먼저 실패 상태가 된 Promise 하나만 `.catch()` 메소드로 잡을 수 있고 나머지 Promise들의 성공, 실패 결과값은 받아볼 수 없다.

이러한 성질 때문에, `Promise.all()`은 모든 Promise들이 성공 상태가 되어야지만 유효한, 모 아니면 도인 경우에만 써야 한다.

##### Promise.allSettled()  

`Promise.all()`은 인자로 받은 Promise들이 모두 성공 상태가 되어야 `.then()`으로 후속 처리를 할 수 있었다. 만약 그 중 단 하나라도 실패 상태가 되면 `.then(   )`으로 후속 처리를 할 수 없다. 하지만 `Promise.allSettled()`을 이용하면 일부 Promise가 실패 상태가 되더라도 `.then()`을 이용해 후속 처리를 할 수 있다. 

`Promise.allSettled()`는 `Promise.all()`과 동일하게 Promise들의 배열을 인자로 받는다. 모든 Promise들이 완료 상태(성공 또는 실패 상태)가 되면, `Promise.allSettled()`는 각 Promise들의 상태와 저장된 값을 담은 하나의 배열을 반환한다. 구체적으로, 배열의 각 원소는 다음과 같이 된다.

- Promise가 성공 상태가 된 경우 : `{status: "fullfiled", value: (저장된 값)}`
- Promise가 실패 상태가 된 경우 : `{status: "rejected", reason: (저장된 값)}`

{% highlight javascript linenos %}
let promises = [new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("123"); //성공
    }, 2000)
}), new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject(new Error("456")); //실패
    }, 1000)
}), new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("789"); //성공
    }, 1000)
})];

Promise.allSettled(promises).then(function(data) {
    for(let item of data) {
        console.log(`status = ${item.status}`);
        if(item.status == "fulfilled") {
            console.log(`value = ${item.value}`);
        } else { //item.status == "rejected"
            console.log(`reason = ${item.reason.message}`);
        }
        console.log("")
    }
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
status = fulfilled
value = 123

status = rejected
reason = 456

status = fulfilled
value = 789

{% endhighlight %}

`Promise.allSettled()`는 편리하지만, 비교적 최근에 추가된 명세이기 때문에 몇몇 자바스크립트 프레임워크에서는 작동하지 않을 수도 있다. 만약 현재 사용하고 있는 자바스크립트 프레임워크에서 `Promise.allSettled()`를 지원하지 않는 경우 다음과 같이 직접 구현해 사용할 수 있다.

{% highlight javascript linenos %}
if (!Promise.allSettled) { //Promise.allSettled()가 없는 경우
    Promise.allSettled = function (promises) {
        return Promise.all(promises.map(function(p) {
            return Promise.resolve(p).then(function(value) {
                return {
                    status: "fulfilled",
                    value: value
                };
            }, function(err) {
                return {
                    status: "rejected",
                    reason: err
                }
            })
        }));
    };
}
{% endhighlight %}

##### Promise.race()

`Promise.race()`은 Promise들의 배열을 인자로 받아, 가장 먼저 성공 상태가 된 Promise를 반환한다. 나머지 Promise들의 결과값들은 모두 무시된다(실행은 된다).

{% highlight javascript linenos %}
let promises = [new Promise(function(resolve, reject) {
    console.log("Promise 1 : begin");
    setTimeout(function() {
        console.log("Promise 1 : end");
        resolve(123);
    }, 2000)
}), new Promise(function(resolve, reject) {
    console.log("Promise 2 : begin");
    setTimeout(function() {
        console.log("Promise 2 : end");
        resolve(456);
    }, 1000)
})];

Promise.race(promises).then(function(data) {
    console.log(`then : ${data}`);
})
{% endhighlight %}

{:.code-result}
{% highlight text %}
Promise 1 : begin
Promise 2 : begin
Promise 2 : end
then : 456
Promise 1 : end
{% endhighlight %}

위 코드의 실행 결과에서 볼 수 있듯이, 두 번째 Promise가 1초 후 성공 상태가 되자마자 `Promise.race()`는 이를 반환했고, 그 결과 `.then()` 메소드가 실행되었다. 2초 뒤 성공 상태가 되는 첫 번째 Promise는 (실행은 되었지만) 그 결과값이 무시된다.

##### Promise.resolve(), Promise.reject()

`Promise.resolve()`는 다음과 같이 동작한다. 

- `Promise.resolve(value)` : 성공 상태의, `value`가 저장된 Promise 객체를 반환한다.
- `Promise.resolve(new Promise())` : 인자로 주어진 Promise 객체를 그대로 반환한다. 즉, 만약 해당 Promise 객체가 실패 상태가 된다면 실패 상태의 Promise가 반환된다.

한편, `Promise.reject()`는 항상 실패 상태의 Promise 객체를 반환한다. 인자가 주어진 경우[^20], 해당 인자가 저장된 실패 상태의 Promise 객체를 반환한다.

[^20]: 일반적으론 `Error` 객체를 사용한다.

`Promise.resolve()`는 간간히 호환성을 위해 일반적인 값을 Promise 객체로 만들기 위해 사용된다. `Promise.reject()`는 현실적으로 거의 사용할 일이 없다.

#### Microtask Queue

다음 코드를 보자.

{% highlight javascript linenos %}
console.log("1");

let promise = new Promise(function(resolve, reject) {
    console.log("2");
    resolve();
});

promise.then(function(data) {
    console.log("3");
})

console.log("4");
{% endhighlight %}

{:.code-result}
{% highlight text %}
1
2
4
3
{% endhighlight %}

Promise 객체로 전달되는 실행 함수는 상술한 대로 Promise 객체가 만들어지는 즉시 실행된다. 위 코드의 3번째 줄에서, `promise` 변수는 즉시 실행되어 즉시 성공 상태가 되는 Promise 객체를 담고 있다. 그리고 `.then()` 메소드는 Promise 객체가 성공 상태가 되면 즉시 실행된다. 위 코드의 8번째 줄에서, 성공 상태인 `promise`에 `.then()` 메소드를 붙였으므로 위 코드의 출력 순서는 `1 2 3 4`이어야 될 것 같다. 하지만 실제로 위 코드를 실행해 보면 `1 2 4 3`의 순으로 실행된다. 왜 이런 일이 벌어졌을까?

그 이유는 바로, `.then()`, `.catch()`, `.finally()`의 핸들러들은 모두 Microtask Queue라 불리는 콜백 큐에 들어가기 때문이다. [위 문단](#kramdown_자바스크립트와-비동기)에서 설명한 것처럼, 콜백 큐는 현재 콜 스택이 모두 비워진 다음에야 실행된다. 이 때문에 위 코드에서 콜 스택에 올라와 있는 4가 먼저 출력되고(`console.log("4")`) 그 이후 Microtask Queue에 있던 `.then()` 메소드의 핸들러가 실행되어 3이 출력되는 것이다(`console.log("3")`).

쉽게 말하면, `.then()`, `.catch()`, `.finally()`의 핸들러들은 실행 함수가 비동기 함수가 아니더라도 항상 비동기적으로 늦게 실행된다고 이해하면 되겠다.



