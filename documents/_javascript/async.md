---
title: "[Javascript] 자바스크립트 비동기에 관하여"
tags: ["javascript", "nodejs"]
date: "2020-09-28"
---

Node.js가 자바스크립트 프레임워크이고, 단일 쓰레드에서 비동기적(Asynchronous)으로 작동한다는 사실을 모르는 개발자는 거의 없을 것이다. 그런데 이 사실이 너무 유명해지다 보니, 자바스크립트 언어 자체가 비동기적으로 구동된다고 착각하는 개발자들이 많은 것 같다. 이 글에서는 자바스크립트와 비동기 간의 관계를 정리하도록 하겠다.

# 자바스크립트와 비동기

자바스크립트는 기본적으로 (C언어와 같은 다른 언어와 유사하게) 동기적(Synchronous)으로 작동한다. 즉, 코드를 실행하면 위에서부터 아래로 순차적으로 실행된다.

그런데 자바스크립트는 기본적으로 단일 쓰레드(Single Thread)에서 작동한다. 이 단일 쓰레드에서 연산, DOM 및 UI 조작 등을 다 하게 된다. 

이때 다음과 같은 상황을 생각해 보자.

{% highlight javascript %}
/* CODE BLOCK A
// 아주 길고 복잡한 연산...
// END OF CODE BLOCK */

/* CODE BLOCK B
// UI 업데이트
// END OF CODE BLOCK */
{% endhighlight %}

아주 길고 복잡한 연산을 수행하는 코드 블럭 A와, UI를 업데이트 하는 코드 블럭 B가 있다. 자바스크립트는 단일쓰레드에서 동기식으로 작동하므로, UI를 업데이트하는 코드 블럭 B는 코드 블럭 A가 다 실행되고 난 이후에야 실행 가능하다.[^1] 이렇게 되면 UI가 오랬동안 업데이트되지 않으므로(= 코드 블럭 B가 실행될 때까지 오랜 시간이 걸리므로) 사용자에게는 시스템이 죽은 것처럼 보이게 된다.

[^1]: 이를 코드 블럭 A가 코드 블럭 B를 블로킹(Blocking)하고 있다고 표현한다.

반응성이 중요한 웹 브라우저에게 이는 심각한 문제이다. 그래서 웹 브라우저 개발자들은 비동기를 지원하는 "Web API"를 만들어 자바스크립트를 비동기식으로 사용 가능하게 만들었다.[^2] 즉, 웹 브라우저에서 자바스크립트의 비동기 실행을 가능케 하는 것은 자바스크립트 언어가 아닌, 웹 브라우저인 것이다. Node.js에서도 비슷하게, 자바스크립트 언어가 아닌 "libuv" 모듈이 자바스크립트의 비동기적 실행을 가능케 한다.

[^2]: 물론 Web API가 비동기성을 제공하기 위해서만 만들어진 것은 아니다. 대표적으로, Web API를 이용하면 DOM에 접근할 수 있다. Node.js에서 `document.getElementById()`, `document.querySelector()`, `document.createElement()`과 같은 DOM 조작 함수들을 사용할 수 없는 것은 Node.js에는 Web API가 없기 때문이다. 참고로 Web API의 DOM 조작 함수들은 대부분 동기식으로 작동한다.

{% include caption-img.html src="js-async-web-browser.png" title="Fig.01 웹 브라우저와 자바스크립트" description="웹 브라우저는 Web API를 이용해 비동기 자바스크립트를 구현한다." %}

웹 브라우저가 비동기 자바스크립트 코드를 실행하는 순서는 다음과 같다.[^3]

[^3]: Node.js도 이와 크게 다르지 않게 작동한다.

1. 개발자는 Web API가 제공하는 비동기 함수 `setInterval()`, `setTimeout()`, `$.ajax()`[^4] 등을 이용해 비동기 자바스크립트 코드를 작성한다.
2. 자바스크립트 엔진(JS Engine)[^5][^6]은 자바스크립트를 해석해 (동기적으로) 실행한다. 이때 비동기 Web API를 만나면 콜백 함수(Callback Function)를 콜백 큐(Callback Queue)에 넣는다.
3. 자바스크립트 엔진의 콜 스택(Call Stack)에 쌓인 모든 코드가 실행 완료되면 이벤트 루프(Event Loop)는 콜백 큐에 있는 첫 번째 콜백 함수를 자바스크립트 엔진의 콜 스택에 넣는다.[^7]
4. 자바스크립트 엔진은 콜 스텍에 들어온 콜백 함수를 처리한다. 이후 콜백 큐가 빌 때까지 3번, 4번을 반복한다.[^8]

[^4]: jQuery의 ajax 함수 `$.ajax()`는 Web API가 제공하는 기능 중 하나인 `XMLHttpRequest`를 포장한 것이다.
[^5]: Google의 [V8 Engine](https://v8.dev/) 등이 있다. V8 Engine은 크롬 웹 브라우저와 Node.js에서 사용된다.
[^6]: 다른 언어나 프레임워크에서는 대체로 프로세스/쓰레드 기반으로 다중 처리를 지원한다. 이때 각 프로세스/쓰레드는 독립적인 콜 스택을 갖는다. 하지만 자바스크립트는 상술했다시피 단일 쓰레드만을(= 하나의 콜 스택만을) 사용한다. Fig. 01에서 자바스크립트 엔진이 단 하나의 콜 스택을 가지고 있는 것을 확인할 수 있다.
[^7]: 즉, 자바스크립트 엔진의 콜 스택에 있는 코드들이 모두 실행되고 난 후 콜백 함수가 처리된다.
[^8]: 이 반복적인 동작을 틱(tick)이라 한다.

자바스크립트의 비동기 처리 방식을 이해한다면 웹 브라우저, Node.js 등에서 어떻게 효율적인 비동기 코드를 짜야 하는지 직관을 얻을 수 있다.

- **파일 시스템 접근, DB 접근, AJAX 요청 등 시간이 오래 걸릴 작업은 반드시 비동기 코드로 작성한다** : 대부분의 개발자들은 비동기식보다 동기식의 코드 작성이 익숙하다 보니, 비동기를 지원하는 많은 자바스크립트 프레임워크에서도 편의를 위해 동기식으로 코드를 짤 수 있는 기능을 제공하는 경우가 많다.[^9] 하지만 동기식으로 코드를 작성하면 무겁고 시간이 오래 걸리는 작업은 뒤의 모든 작업(UI 갱신 등)을 블로킹하므로, 시간이 오래 걸릴 작업은 무조건 비동기 방식으로 코드를 작성해야 한다.
- **함수들은 기능별로 최대한 간결하게 작성한다** : 한 코드 블럭은 자바스크립트 콜 스택에 들어가면 동기적으로 한 번에 실행된다. 그리고 이 코드 블럭은 다른 작업들이 모두 블로킹한다. 따라서 비동기로 작성된 코드일지라도 한 번에 쭉 짜는 것보다 (필요하다면) 기능별로 여러 개의 함수로 나눠 여러 번 콜백이 일어나게 하는 것이 좋다. 이렇게 하면 자바스크립트가 최적의 방식을 알아서 스케줄링(Scheduling)을 하여 가장 효율적인 방식으로 코드가 실행되게 돕는다.

[^9]: 예를 들어 Node.js에서 파일의 내용을 읽으려면 기본적으로 비동기 함수 `fs.readFile()`를 사용해야 하지만, `fs.readFileSync()`라는 동기식 함수도 함께 제공한다. 

# 비동기 코드에서 순차 실행 코드 작성하기

비동기적으로 코드를 작성하는 것이 자바스크립트 코드의 실행 성능 향상에 큰 도움이 된다는 것은 충분히 설명한 것 같다. 그런데 비동기식으로 코드를 작성할 때에는 반드시 한번 생각해 봐야 하는 것이 있다.

개발을 하다 보면 반드시 다른 부분이 먼저 실행되고 난 이후 실행되어야 하는, 순차 실행이 필요한 코드가 발생한다. 동기식으로 코드를 작성하는 경우 이는 고민거리가 아니다. 그냥 순차적으로 실행되어야 하는 코드들을 시간 순서에 맞게 쭉 작성하면, 알아서 위에서부터 아래로, 순차적으로 실행되기 때문이다. 하지만 비동기식 코드에서는 코드 실행 순서를 장담할 수 없으므로 문제가 발생한다. 다음 코드를 보자.

{% highlight javascript linenos %}
var x = 0;
x = update_x_async();
console.log(x);
{% endhighlight %}

코드 작성자의 의도는 `x`의 값을 갱신한 후(2번째 줄) 그 결과를 보고 싶다(3번째 줄)는 것이다. 그러나 `x`를 갱신하기 위해 사용한 함수 `update_x_async()`가 비동기적으로 동작하는 함수라면, 이 함수의 실행 시점은 3번째 줄이 실행되고 난 이후일 것이다. 그 결과 3번째 줄의 실행 결과는 항상 0이 된다.

그렇다면 자바스크립트에서 순차 실행이 필요한 코드는 어떻게 작성할 수 있을까? 크게 다음 3가지 방식이 있다.

## 콜백 함수 (Callback Function)

바쁠 때 누군가 나한테 전화를 하면 그 전화를 미처 받지 못할 때가 있다. 그러면 부재중 전화가 남고, 우리는 바쁜 일이 끝나면 부재중 전화를 보고 해당 번호로 다시 전화를 걸어준다. 이런 일련의 동작을 영어로 콜백(Callback)이라 한다.

자바스크립트에서 함수는 일급 객체(First-class Object)[^10]로서, 다른 함수의 인자(Parameter)로 넘길 수 있다.

[^10]: 일급 객체(First-class Object)란 다른 일반적인 객체(ex. 클래스 등)에 적용 가능한 연산(을 모두 지원하는 객체를 말한다. 일급 객체라고 뭔가 특별한 권한이 있는건 아니고 (다른 객체들처럼 연산이 가능한) 그냥 "평범한" 객체라고 이해하면 될 것 같다.

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

위 코드의 14번째 줄에서 함수 A를 실행할 때 함수 B를 인자로서 넘기는 것을 볼 수 있다. 함수 A는 본인의 로직(6 ~ 8번째 줄) 실행이 끝난 후 종료 직전에 함수 B를 호출한다(10번째 줄). 이렇게 전달받은 함수(B)를 함수의 코드가 다 실행된 후 마지막에 호출하는 패턴을 콜백(Callback)이라 부르고, B와 같이 전달된 함수를 콜백 함수(Callback Function)라 부른다.

콜백 함수를 이용하면 비동기식 코드에서 순차 처리를 만들 수 있다. 콜백 함수는 상술했다시피 인자로 전달한 함수(Caller)의 로직 실행이 모두 끝난 이후 마지막에 호출된다. 따라서 콜백 함수에 "이후에 실행되어야 할 코드"를 넣게 되면 순차처리를 달성할 수 있다. 위의 코드에서 함수 B는 항상 함수 A보다 시간적으로 나중에 실행됨을 보장할 수 있다.

### 콜백 지옥 (Callback Hell)

콜백 함수를 이용하는 이 방법은 자바스크립트 비동기 코드에서 순차 처리를 달성하는 가장 기초적인 방법으로, 모든 자바스크립트 런타임에서 사용 가능하다. 하지만 콜백 함수는 콜백 지옥(Callback Hell)이라 부르는 현상을 일으킬 수 있다.

Node.js에서 다음과 같은 동작을 수행하는 스크립트를 작성해야 한다고 생각해 보자.

- `./text/` 디렉토리에는 텍스트 파일들이 있다.
- `fs` 모듈을 이용해 디렉토리 내 모든 파일명을 읽는다.
- 읽은 파일명을 바탕으로 각각의 파일에 접근해 파일 내용을 읽는다.
- `mysql` 모듈을 이용해 파일 내용이 MySQL 데이터베이스에 등록되어 있는지 확인한다.
- 데이터베이스에 파일 내용이 등록되어 있지 않으면 데이터베이스에 넣는다.

콜백 함수를 이용해 비동기식으로 코드를 작성하면 다음과 같이 된다.

{% highlight javascript linenos %}
var fs = require("fs");
var mysql = require("mysql"); //npm install mysql로 mysql 모듈이 설치되었다고 가정

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'test'
});

var path = "./text/";
try {
    fs.readdir(path, function(err, files) {
        if(err) throw err;

        for(var file of files) {
            fs.readFile(path + file, function(err, content) {
                if(err) throw err;

                connection.query("SELECT * FROM Text WHERE content=?", [content], function(err, results, fields) {
                    if(err) throw err;

                    if(results.length == 0) {
                        connection.query("INSERT INTO Text(content) VALUES (?)", [content], function(err, results, fields) {
                            if(err) throw err;
                        })
                    }
                })
            })
        }
    })
} catch(err) {
    console.error(err);
}
{% endhighlight %}

무슨 말을 하고 싶은지 보이는가? 비동기식 코드에서는 겨우 4가지 일을 순차적으로 하기 위해서 위와 같이 깊이 내려가는 코드를 사용해야 한다. 이게 싫다면 익명 함수(Anonymous Function)을 사용하지 않고 함수에 다 이름을 붙이고 

만약 동기식으로 코드를 작성한다면, 다음과 같이 아주 간단하게 짤 수 있다.

{% highlight javascript linenos %}
var path = "./text/";

var files;
try {
    files = fs.readdirSync(path)
} catch(err) {
    console.error(err);
}

for(var file of files) {
    try {
        var content = fs.readFileSync(path + file);
        console.log(content);
    } catch(err) {
        console.error(err);
    }
}
{% endhighlight %}

하지만 상술했다시피 동기식으로 코드를 작성하는 것은 
자바스크립트는 익명 함수(Anonymous Function)을 지원하기에, 보통은 다음과 같이 코드를 작성한다.