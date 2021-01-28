---
title: "[Node.js] 모듈 시스템"
tags: ["node-js", "javascript", "common-js"]
date: "2021-01-16"
---

Node.js의 모듈 시스템에 대해 알아보자.

2021년 1월 현재 Node.js에서 사용할 수 있는 모듈 시스템은 CommonJS 모듈 시스템과 ES6 모듈 시스템, 이렇게 두 가지가 있다.

# CommonJS 모듈 시스템

원래 순수 자바스크립트(Javascript)에는 모듈 기능이 없었다.[^1] 자바스크립트는 웹 브라우저에서 웹 페이지가 동적으로 작동할 수 있게 해 주는 스크립트 언어로 개발되었기에 모듈 기능이 필요할 정도의 길고 복잡한 로직은 자바스크립트로 작성할 일이 없었기 때문이다.[^2]

[^1]: 여러 파일에 자바스크립트 코드를 분할해 작성하고 HTML에서 `<script>` 태그로 코드 파일을 불러와 사용할 수 있기에, 얼핏 생각하면 자바스크립트는 모듈 기능을 제공한다고 생각할 수 있다. 하지만 우선 이는 HTML 태그(`<script>`)를 이용한 것이고(순수한 자바스크립트로 다른 모듈을 로딩한 게 아니다), `<script>` 태그로 로딩된 자바스크립트 코드는 하나의 전역 객체(Global Object)에 바인딩된다는 문제가 있다. 이렇게 되면 여러 개의 js 파일을 로딩할 때 만약 서로 다른 파일에 동일한 이름의 변수가 선언되어 있다면 변수가 덮어씌워지게 된다. 이 구조는 각 모듈들이 독립적이어야 하는 모듈 시스템이라 보기 어렵다.
[^2]: 당시 자바스크립트는 속도가 매우 느렸기 때문에 모듈화가 필요할 정도의 길고 복잡한 로직은 서버에서 처리하는 것이 맞았다.

하지만 개발자들은 자바스크립트를 웹 브라우저 밖에서도 범용적으로, 특히 서버를 개발할 때에도 사용할 수 있길 원했다.[^3] 이에 2009년 캐빈 댕구어(Kevin Dangoor)의 주도로 웹 브라우저 밖에서도 범용적으로 자바스크립트를 사용할 수 있도록 표준 명세(Specification)을 정의하는 CommonJS라는 프로젝트가 시작되었다.[^4]

범용 프로그래밍 언어가 되려면 그 무엇보다 모듈 기능이 필수적이라 할 수 있다.[^5] 그래서 CommonJS가 가장 중요하게 정의한 명세 중 하나가 자바스크립트로 모듈을 어떻게 만들고 사용하면 되는지에 관해서이다. CommonJS는 자바스크립트에서 모듈을 사용할 때의 사실상 표준(de facto standard)이 되었고[^6], 이에 Node.js 역시 CommonJS를 구현하였다.

[^3]: 통상적으로 웹 서비스를 개발할 때는 사용자가 직접 마주할 부분을 개발하는 프론트엔드(Front-end)의 개발과 서비스가 원활하게 잘 돌아갈 수 있도록 서버 및 DB 등을 설계하는 백엔드(Back-end)의 개발이 필요하다. 그런데 프론트엔드 개발과 백엔드 개발은 사용하는 언어부터 차이가 나(프론트엔드를 개발할 때는 주로 HTML, CSS, 자바스크립트 등을, 백엔드를 개발할 때는 주로 Java, C#, PHP, SQL 등을 사용한다) 개발자 한 사람이 양쪽 모두를 다 하기 쉽지 않다(이렇게 양쪽 모두를 할 줄 아는 개발자를 풀스택(Full-stack) 개발자라 한다). 하지만 만약 프론트엔드 개발자들이 능숙하게 다룰 수 있는 자바스크립트로 백엔드 작업도 할 수 있게 된다면 개발자 한 명이 혼자서 프론트엔드와 백엔드 모두를 개발할 수 있게 되므로 더 효율적인 개발이 가능해진다.
[^4]: 초기에는 ServerJS라는 이름을 사용했으나, 단순히 서버에서뿐만 아니라 더 범용적으로 쓸 수 있다는 것을 나타내기 위해 CommonJS로 개명한다.
[^5]: 예를 들어 Java에서는 `class`로 모듈을 만들고 `import`로 모듈을 불러와 사용할 수 있다. C에서는 `extern`, `static` 등을 이용해 모듈을 만들고 `#include`로 모듈을 불러와 사용할 수 있다.
[^6]: 사실 자바스크립트에서 모듈을 어떻게 정의하고 사용할지를 정의한 명세에는 CommonJS 외에도 AMD(Asynchronous Module Definition)라는 것도 있다. CommonJS는 모든 모듈 파일들이 현재 로컬에 모두 존재한다는 전제를 깔고 있다(서버에서 자바스크립트를 사용하는 상황을 상정하고 만들어진 것이기 때문에 그렇다). 하지만 AMD는 필요한 모듈을 인터넷을 통해 다운받아야 하는 브라우저 환경에서도 모듈을 사용할 수 있도록 표준을 만드는 것을 목표로 한다는 차이점이 있다.

## Node.js에서 CommonJS 모듈 시스템 사용하기

CommonJS 모듈 시스템에서 하나의 파일은 하나의 모듈이 된다. 예를 들어 다음과 같이 `circle.js` 파일을 만들면 `circle.js` 모듈을 하나 만든 것이다.

{: .code-header}
circle.js

{% highlight javascript linenos %}
var PI = 3.14;

module.exports.area = function (radius) {
  return PI * radius * radius;
}

module.exports.circumference = function (radius) {
  return 2 * PI * radius;
}
{% endhighlight %}

CommonJS 모듈 시스템에서는 `module.exports` 객체를 이용해 함수 및 변수들을 외부에 공개할 수 있다(public하게 만들 수 있다). 위 코드의 3행과 7행에서 익명 함수를 각각 `module.exports.area`, `module.exports.circumference`에 담고 있다. 이렇게 하면 외부에서 이들 함수를 사용할 수 있다. 명시적으로 공개하지 않은 함수 및 변수들은 모두 private 취급된다. 위 코드의 1행에 있는 변수 `PI`의 경우 명시적으로 공개되지 않았으므로(`module.exports`에 담기지 않았으므로) private 변수가 되어 외부에서 접근할 수 없다.

만들어진 모듈을 사용하려면 `require()` 함수를 사용하면 된다. 예를 들어 `circle.js`와 동일한 디렉토리에 `foo.js` 파일이 있다고 해 보자. 이 파일에서 `circle.js`를 로드하려면 다음과 같이 하면 된다.

{: .code-header}
foo.js

{% highlight javascript linenos %}
var circle = require("./circle");

var radius = 3;

console.log("Area: " + circle.area(radius));
console.log("Circumference: " + circle.circumference(radius));
{% endhighlight %}

{: .code-result}
{% highlight text %}
Area: 28.259999999999998
Circumference: 18.84
{% endhighlight %}

### 자세한 설명

#### Module Wrapper

Node.js의 모든 모듈들은 실행되기 전에 Module Wrapper라 불리는 함수로 한 번 포장된다. Module Wrapper는 다음과 같이 생겼다.

{% highlight javascript %}
(function(exports, require, module, __filename, __dirname) {
  // 모듈 코드는 이 안에 삽입된다.
});
{% endhighlight %}

Module Wrapper는 각 모듈들의 전역 변수(top-level variable)가 모듈 범위의 스코프(scope)를 갖게 해 준다(즉 private한 변수를 만들어 준다). 또한 모듈 내에서 `module`, `exports`, `global`, `__filename`, `__dirname` 등의 다양한 객체 및 변수들을 사용할 수 있게 해 준다.

##### __dirname, __filename

`__filename`은 모듈의 전체 절대경로를, `__dirname`은 모듈의 전체 절대경로에서 파일명을 제거한 것, 즉 모듈이 위치한 디렉토리의 경로를 담고 있는 변수이다.

예를 들어 `/home/user/projects/foo.js` 모듈에서 `__dirname`, `__filename`을 출력하면 다음과 같이 된다.

{: .code-header}
/home/user/projects/foo.js

{% highlight javascript linenos %}
console.log(__dirname);
console.log(__filename);
{% endhighlight %}

{: .code-result}
{% highlight text %}
/home/user/projects
/home/user/projects/foo.js
{% endhighlight %}

`__dirname`은 `path.dirname(__filename)`을 한 것과 동일하다(물론 path 모듈을 로드해야 한다).

#### require()

`require()` 함수는 인자로 전달받은 모듈을 찾아 해당 모듈의 `module.exports`를 반환한다. 각 모듈들은 Module Wrapper 때문에 원칙적으로 모두 외부에서 접근이 불가능하나(private), `module.exports`에 담겨 있는 변수 및 함수들은 `require()`를 통해 접근할 수 있다(public).

`require()` 함수는 전달받은 인자가 코어 모듈의 이름인지, 절대 경로인지, 상대 경로인지 등을 자동으로 인식해서 가장 적합한 모듈을 로드한다. `require(X)`에 대해, `require()` 함수는 다음 알고리즘을 사용해 모듈을 찾는다.[^7]

[^7]: 아래 설명에는 몇몇 생략된 부분이 있다. 정확한 알고리즘은 Node.js 공식 문서에서 확인하자: <https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_all_together>

- 만약 X가 코어 모듈이라면 해당 코어 모듈을 로드한다.[^8][^9]
- 만약 X가 "/"으로 시작한다면 절대 경로라 판단하고, 다음을 수행한다.
  - 해당 경로에 가서 `X` 파일을 찾는다. 만약 `X` 파일이 존재한다면 해당 모듈을 로드한다.
  - 만약 `X` 파일이 존재하지 않는다면 `X.js` 파일을 찾는다. 만약 `X.js` 파일이 존재한다면 해당 모듈을 로드한다.
  - 만약 `X.js` 파일이 존재하지 않는다면 `X.json` 파일을 찾는다. 만약 `X.json` 파일이 존재한다면 해당 json 파일을 파싱한다.
  - 만약 `X.json` 파일이 존재하지 않는다면 `X.node` 파일을 찾는다. 만약 `X.node` 파일이 존재한다면 해당 binary addon을 로드한다.
  - 만약 이도 저도 다 없으면 "not found" 에러를 던진다.
- 만약 X가 "./", "../"으로 시작한다면 상대 경로라 판단하고, 다음을 수행한다.
  - 해당 경로에 가서 `X` 파일을 찾는다. 만약 `X` 파일이 존재한다면 해당 모듈을 로드한다.
  - 만약 `X` 파일이 존재하지 않는다면 `X.js` 파일을 찾는다. 만약 `X.js` 파일이 존재한다면 해당 모듈을 로드한다.
  - 만약 `X.js` 파일이 존재하지 않는다면 `X.json` 파일을 찾는다. 만약 `X.json` 파일이 존재한다면 해당 json 파일을 파싱한다.
  - 만약 `X.json` 파일이 존재하지 않는다면 `X.node` 파일을 찾는다. 만약 `X.node` 파일이 존재한다면 해당 binary addon을 로드한다.
  - 만약 이도 저도 다 없으면 "not found" 에러를 던진다.
- 만약 X가 코어 모듈도 아니고 "/", "./", "../"으로 시작하지도 않는다면, 다음을 수행한다.
  - 현재 모듈의 부모 디렉토리 밑의 `node_modules` 디렉토리에서 X를 찾는다. 만약 X 모듈이 존재한다면 해당 모듈을 로드한다.
  - 만약 X 모듈이 존재하지 않는다면 현재 모듈의 부모의 부모 디렉토리의 `node_modules` 디렉토리에서 X를 찾는다. 이렇게 X를 찾을 때까지 계속해서 부모 디렉토리로의 `node_modules` 디렉토리를 탐색한다. 예를 들어 `/home/user/projects/foo.js` 파일에서 `require("bar.js")`를 호출하면, `/home/user/projects/node_modules/bar.js`, `/home/user/node_modules/bar.js`, `/home/node_modules/bar.js`, `/node_modules/bar.js`이 있는지 순차적으로 탐색한다.
  - 만약 루트 디렉토리까지 탐색했는데 X 모듈을 찾지 못했다면, "not found" 에러를 던진다.

[^8]: 코어 모듈에는 다음과 같은 것들이 있다: assert, child_process, cluster, crpyto, dns, domain, events, fs, http, https, os, path, url, zlib 등. 전체 목록은 Node.js 공식 문서에서 확인할 수 있다: <https://nodejs.org/docs/latest-v14.x/api/index.html>
[^9]: 코어 모듈을 제일 먼저 찾기 때문에, 만약 모듈 이름이 코어 모듈과 같다면 해당 모듈을 사용할 수 없다. 물론 상대 경로 혹은 절대 경로를 사용하면 로드할 수 있다: ex. `require("./fs")`. 

위 알고리즘에서 볼 수 있듯이 `require()` 함수는 파일을 찾을 때 자동으로 .js, .json, .node 확장자를 모두 검색하므로 `require()`를 사용할 때는 확장자는 생략해도 된다. 위의 예시 코드에서도 모두 확장자를 생략하고 있다.

참고로 아래 ES6 모듈 시스템에서 사용하는 .mjs 확장자 파일은 `require()` 함수로 로딩할 수 없다.

##### 모듈 캐싱 (Module Caching)

`require()` 함수는 처음 실행되는 모듈을 모두 캐싱(caching)해 놓고, 이후 같은 모듈을 `require()`으로 호출하면 그 인스턴스를 반환한다.[^9] 즉 프로그램 실행 중 같은 모듈을 여러 번 `require()`으로 호출해도 모듈의 전역 코드(top-level code)는 딱 한번만 실행된다. 만약 모듈의 특정 코드를 여러 번 실행해야 한다면 해당 코드를 함수 형태로 만든 후, 해당 함수를 여러 번 호출하면 된다.

모듈이 캐싱된다는 점을 이용하면 각 모듈간 데이터를 주고받을 수 있다. 만약 모듈 A와 모듈 B에서 공통적으로 모듈 P를 `require()` 함수로 부르게 되면 A, B 중 `require(P)`를 먼저 실행한 쪽에 의해 P의 인스턴스가 생성되고 캐싱된다. `require(P)`를 두 번째로 실행한 쪽은 캐싱된 인스턴스를 받는다. 그 결과 A와 B는 P에 대한 동일한 인스턴스를 얻게 된다. 이 모듈 P를 이용하면 모듈 A와 B가 데이터를 주고받을 수 있다. 프로그램 전역 설정(config) 등을 이런 구조로 관리하면 편리하다.

캐싱은 `require()` 함수가 받은 인자(모듈 이름)을 기준으로 이루어진다. 이때 모듈 이름은 대소문자 구분을 한다(case-sensitive). 즉 CommonJS 모듈 시스템은 `require("./FOO")`와 `require("./foo")`를 서로 다른 모듈이라 인식하고, 각각 따로 캐싱한다. 

Linux에서 Node.js를 사용할 때는 별 문제가 생기지 않는다. Linux의 파일 시스템은 파일 이름의 대소문자 구분을 한다(즉 Linux에서 "FOO.js"와 "foo.js"는 다른 파일이다). 그 결과 Linux에 설치된 Node.js에서는 `require("./FOO")`와 `require("./foo")`는 서로 다른 모듈(`FOO.js`, `foo.js`)을 로드하고, 각각 캐싱된다.

하지만 Windows와 Mac OS를 사용할 때는 조심해야 한다. Windows와 Mac OS의 파일 시스템은 파일들의 이름의 대소문자 구분을 하지 않는다(case-insensitive)(즉 Windows와 Mac OS에서 "FOO.js"와 "foo.js"는 같은 파일이다). 그 결과 Windows와 Mac OS에 설치된 Node.js에서는 `require("./FOO")`와 `require("./foo")`는 같은 모듈을 로드하지만 각각 캐싱된다.

CommonJS 모듈 시스템과 같은 형태에서는 한 모듈이 실행을 모두 완료하기 전 다른 모듈에 의해 호출되는 순환 호출 문제가 있을 수 있다. 예를 들어 다음과 같이 각각 서로를 호출하는 모듈 `a.js`, `b.js`와, 이 둘을 실행하는 모듈 `main.js`가 있다고 해 보자.

{: .code-header}
a.js

{% highlight javascript linenos %}
console.log("[a.js] a.js starting");

module.exports.done = false;

var b = require("./b");
console.log("[a.js] b.done = %j", b.done);

module.exports.done = true;

console.log("[a.js] a.js done");
{% endhighlight %}


{: .code-header}
b.js

{% highlight javascript linenos %}
console.log("[b.js] b.js starting");

module.exports.done = false;

var a = require("./a");
console.log("[b.js] a.done = %j", a.done);

module.exports.done = true;

console.log("[b.js] b.js done");
{% endhighlight %}

{: .code-header}
main.js

{% highlight javascript linenos %}
console.log("[main.js] main.js staring");

var a = require("./a");
var b = require("./b");

console.log("[main.js] a.done = %j, b.done = %j", a.done, b.done);
{% endhighlight %}

{: .code-result}
{% highlight text %}
[main.js] main.js staring
[a.js] a.js starting
[b.js] b.js starting
[b.js] a.done = false
[b.js] b.js done
[a.js] b.done = true
[a.js] a.js done
[main.js] a.done = true, b.done = true
{% endhighlight %}

`main.js`는 `a.js`를 호출하고(행 3), `a.js`는 `b.js`를 호출한다(행 5). 그리고 `b.js`는 행 5에서 `a.js`를 호출하려 한다. CommonJS 모듈 시스템은 이런 순환 구조에서의 무한루프를 막기 위해 `a.js`가 실행이 모두 완료되지 않았더라도 완료되지 않은 인스턴스(unfinished copy)를 반환한다. 이 인스턴스를 받아 `b.js`는 실행을 마치고, 실행이 완료된 `b.js`의 인스턴스를 `a.js`는 받을 수 있다. 결론적으로 `main.js`에서는 모든 실행이 완료된 `a.js`, `b.js` 모듈 인스턴스를 얻을 수 있다. 순환 호출 구조는 실행 결과를 예측하기 어렵기 때문에 되도록이면 이런 구조는 피하거나 아주 조심스럽게 사용해야 한다.

#### module.exports

`module.exports`는 Module Wrapper에 의해 자동으로 생성되는 빈 객체(`{}`)이다. `require()` 함수는 전달받은 인자에 해당하는 모듈을 찾아 그 모듈의 `module.exports`를 반환한다. 따라서 이 객체 안에 속성(property)을 추가해 모듈 외부로 변수 또는 함수를 공개할 수 있다.

{: .code-header}
foo.js [module.exports 객체 안에 속성을 추가하여 모듈 공개하기]

{% highlight javascript linenos %}
module.exports.a = 3;
module.exports.b = "asdf";
module.exports.func1 = function() {
  console.log("I am Iron Man");
}
module.exports.func2 = function() {
  console.log("I'm Batman");
}
{% endhighlight %}

{: .code-header}
bar.js [module.exports 객체 안에 속성을 추가하여 모듈 공개하기]

{% highlight javascript linenos %}
var foo = require("./foo");

console.log(foo.a);
console.log(foo.b);

foo.func1()
foo.func2()
{% endhighlight %}

{: .code-result}
{% highlight text %}
3
asdf
I am Iron Man
I'm Batman
{% endhighlight %}

또는 다음과 같이 `module.exports`의 기존 값(`{}`)을 덮어씌우고 새로운 값을 할당할 수도 있다.

{: .code-header}
foo.js [module.exports 객체를 덮어씌워 모듈 공개하기]

{% highlight javascript linenos %}
module.exports = {
  a: 3,
  b: "asdf",
  func1: function() {
    console.log("I am Iron Man");
  },
  func2: function() {
    console.log("I'm Batman");
  }
}
{% endhighlight %}

{: .code-header}
bar.js [module.exports 객체를 덮어씌워 모듈 공개하기]

{% highlight javascript linenos %}
var foo = require("./foo");

console.log(foo.a);
console.log(foo.b);

foo.func1()
foo.func2()
{% endhighlight %}

{: .code-result}
{% highlight text %}
3
asdf
I am Iron Man
I'm Batman
{% endhighlight %}

`module.exports`에 값을 넣는 것은 모듈이 실행될 때 즉시 이루어져야 한다. 다음과 같이 콜백 함수에서 `module.exports`에 값을 넣으면 오류가 발생한다(값이 공개되지 않는다).

{: .code-header}
foo.js [잘못된 방법 - 콜백 함수에서 module.exports에 값 할당하기]

{% highlight javascript linenos %}
setTimeout(function() {
  module.exports = { a: 'hello' };
}, 0);
{% endhighlight %}

{: .code-header}
bar.js [잘못된 방법 - 콜백 함수에서 module.exports에 값 할당하기]

{% highlight javascript linenos %}
var foo = require("./foo");

console.log(foo.a);
{% endhighlight %}

{: .code-result}
{% highlight text %}
undefined (아무 값도 출력되지 않음)
{% endhighlight %}

##### exports

`exports` 변수는 Module Wrapper가 편의를 위해 만들어주는 변수로, `module.exports`로 초기화되어 있다. 즉, 다음 두 줄은 완벽히 동일한 역할을 한다.

{% highlight javascript %}
module.exports.a = "hello";
exports.a = "hello";
{% endhighlight %}

위와 같이 `module.exports`에 새로운 속성을 추가하여 모듈을 외부에 공개할 때는 `exports` 변수와 `module.exports`는 서로 동의어로 사용해도 된다. 하지만 `module.exports`에서 기존 값(`{}`)을 덮어씌우고 새로운 값을 할당하거나 `exports`에 새로운 값을 할당하게 되면 `exports`는 `module.exports`로의 연결을 잃게 되고, 그렇게 `exports`에 할당한 값들은 외부에 공개되지 않는다. 즉 다음 코드들에서 `"hello"` 문자열은 외부에 공개되지 않는다.

{% highlight javascript %}
exports = "hello";
{% endhighlight %}

{% highlight javascript %}
module.exports = "overwritten";
exports.a = "hello";
{% endhighlight %}

`exports` 변수는 `module.exports`에서 "module." 7자를 생략할 수 있게 해 준다는 것에 비해 쓸데없이 조심할 것만 늘기 때문에, 개인적으로 걍 `module.exports`를 사용하는 것을 추천한다.

#### require.main

파이썬에서도 CommonJS 모듈 시스템과 동일하게 각 .py 파일은 하나의 모듈로 취급된다. 파이썬 파일 `foo.py`가 있을 때, 이 파일의 코드는 직접 실행되었을 수도 있고(`python foo.py`) 모듈로서 실행되었을 수도 있다(`import foo`). 이를 검사하려면 `__name__` 변수의 값을 검사하면 된다. 만약 직접 실행되었다면 `__name__ == "__main__"`은 참(`True`)이 된다. 만약 모듈로서 실행되었다면 `__name__ == "__main__"`은 거짓(`False`)이 된다.

CommonJS에서도 비슷한 방법으로 이를 검사할 수 있다. `foo.js` 파일이 있다고 할 때, 이 파일의 코드는 직접 실행되었을 수도 있고(`node foo.js`) 모듈로서 실행되었을 수도 있다(`require("./foo")`). 이를 검사하려면 `require.main`의 값을 검사하면 된다. 만약 직접 실행되었다면 `require.main === module`은 참(`true`)이 된다. 만약 모듈로서 실행되었다면 `require.main === module`은 거짓(`false`)이 된다.

### 여담

#### require()에서 프로젝트 루트 디렉토리 기준 상대경로 사용하기

`require()` 함수는 상술했듯이 코어 모듈, 절대경로("/"으로 시작), 상대경로("./" 또는 "../"으로 시작), `node_modules` 디렉토리 밑에 설치된 모듈 이름만을 해석할 수 있다. 그래서 로컬 모듈들에 접근할 때는 상대 경로(혹은 절대 경로)로만 접근할 수 있다.

예를 들어 다음과 같은 디렉토리 구조를 가진 Node.js 프로젝트를 생각해 보자.

{% highlight text %}
.
├── server.js  # entry point
├── utils.js
├── package.json
└── models/
    ├── model1.js
    └── model2.js
{% endhighlight %}

`models/model1.js` 파일에서 `utils.js` 모듈을 사용하고 싶다고 해 보자. 이 경우 다음과 같이 해야 한다.

{: .code-header}
models/model1.js

{% highlight javascript %}
//...
var utils = require("../utils");
//...
{% endhighlight %}

이런 방식에서는 `utils.js` 파일과 `models/model1.js` 간의 경로를 모두 다 계산하고 있어야 한다. 만약 `model1.js` 파일이 몇 중의 폴더로 감싸진 엄청 깊이 있는 파일이라면 "../" 개수를 잘못 맞춰 실수하기 딱 좋은 구조이다. 또한 이런 방식에서는 파일 이동도 함부로 하면 안 된다. 만약 `models/model1.js` 파일을 다른 디렉토리로 옮기면 위 코드는 오류가 난다.

이 문제는 프로젝트 루트 디렉토리 기준 상대경로를 사용할 수 있다면 해결된다. 하지만 안타깝게도 `require()` 함수는 그런 기능이 없다. 이를 해결해 주는 라이브러리도 있다고 하는데, 코드에 추가적인 의존성을 부여하는 것은 별로 좋은 방법이 아닌것 같다. 개인적으로 찾은 가장 그럴듯한 편법은 모든 모듈에서 접근할 수 있는, 전역적으로 공유되는 `global` 전역 객체를 이용하는 것이다. 

1. 프로젝트 루트 디렉토리는 `package.json`에서 정의한 진입점 파일(entry point)이 있는 디렉토리일 것이므로, 진입점 파일에서 `global` 객체에 본인의 `__dirname`(프로젝트 루트 디렉토리)를 저장해 둔다.
2. 로컬 모듈을 로드할 때 다음과 같이 `require()` 함수를 쓴다.

{: .code-header}
server.js (Entry Point)

{% highlight javascript linenos %}
global.__ROOT_DIR = __dirname;
//...
{% endhighlight %}


{: .code-header}
models/model1.js

{% highlight javascript linenos %}
//...
var path = require("path");
var utils = require(path.join(__ROOT_DIR, "utils")); // 프로젝트 루트 디렉토리로부터의 상대 경로
//...
{% endhighlight %}

매번 `require()` 함수를 저런 형태로 쓰는 것이 귀찮다면 `global` 객체에 wrapper 함수를 등록하는 것도 방법이다.

{: .code-header}
server.js

{% highlight javascript linenos %}
var path = require("path");

global.__ROOT_DIR = __dirname;

global.require_localModule = function(rel_path) {
  return require(path.join(__ROOT_DIR, rel_path));
}
//...
{% endhighlight %}

# ECMAScript 2015 (ES6) 모듈 시스템

얘기를 시작하기 전에 우선 ECMAScript가 무엇인지부터 알아보자. 원래 자바스크립트는 넷스케이프 네비게이터(Netscape Navigator)라는 브라우저에서 웹 페이지를 동적으로 동작시킬 수 있는 스크립트 언어로 넷스케이프(Netscape) 사의 브랜든 아이크(Brendan Eich)에 의해 개발되었다. 하지만 그 강력함에 점차 많은 사람들이 쓰게 되면서 다른 브라우저들도 비슷한 스크립트 언어를 출시하기 시작했다.[^10] 각 브라우저마다 지원하는 언어가 조금씩 다르다 보니 웹 개발자들은 각 브라우저마다 따로 코드를 만들어야 할 위기에 처했다. 이에 넷스케이프 사는 자바스크립트 기술의 표준화를 위해 ECMA 인터네셔널(ECMA International)에 자바스크립트 기술 규격을 제출하였고, 1997년 6월 자바스크립트는 ECMA-262 기술 규격으로 표준화되었다. ECMA-262 기술 규격에 따라 표준화된 자바스크립트를 ECMAScript라 부른다.[^11]

[^10]: 대표적으로 마이크로소프트(Microsoft) 사는 인터넷 익스플로러(Internet Explorer)에서 사용할 수 있는 JScript라는 스크립트 언어를 개발하였다. 
[^11]: 조금 더 엄밀히 설명하자면, ECMAScript는 ECMA-262에서 정의된 범용 스크립트 언어의 명세(Specification)을 뜻하고, 이를 실제로 구현한 것이 자바스크립트이다. 또 다른 ECMAScript 구현체로는 JScript, 액션스크립트 등이 있다. ECMAScript 구현체 중 가장 많이 사용되는 것이 자바스크립트이기에 ECMAScript와 자바스크립트는 거의 동의어로 사용된다.

ECMAScript 2015는 2015년 발표된 ECMAScript로서, 6번째 개정판이기에 ES6이라고도 불린다. 상술했다시피 원래 자바스크립트에는 모듈 기능이 없었는데, 이 ES6에 모듈 시스템이 추가되었다. Node.js는 ES6의 모듈 시스템 역시 구현하였다. 다만 v14.x 버전에서의 ES6 모듈 시스템은 아직 실험적인 기능이고(Stability 1: Experimental) v15.x 버전에서야 안정화되었다(Stability 2: Stable). 2021년 1월 현재 Node.js의 최신 Current 버전은 v15.7.0이고, 최신 LTS 버전은 v14.15.4이므로 아직까지는 CommonJS 모듈 시스템이 더 많이 사용되겠지만 앞으로 ES6 모듈 시스템을 사용한 코드가 더 많아질 것으로 기대된다. 만약 새로운 Node.js 프로젝트를 만든다면 v15.x 이상의 버전을 사용할 때만 ES6 모듈 시스템을 사용할 것을 추천한다.

## Node.js에서 ES6 모듈 시스템 사용하기

CommonJS 모듈 시스템과 ES6 모듈 시스템은 호환되지 않는다.[^12] Node.js는 기본적으로 모든 .js 파일은 CommonJS 모듈 시스템이 적용되었다고 본다. ES6 모듈 시스템을 사용하려면 확장자를 .mjs로 하거나, `package.json` 파일에 `type: "module"`을 추가해[^13] 명시적으로 이를 표시해야 한다.

[^12]: Babel 등의 라이브러리를 사용하면 한 모듈 시스템을 다른 모듈 시스템으로 변경할 순 있지만, 네이티브하게 호환되진 않는다.
[^13]: 참고로 CommonJS를 사용할 때는 `package.json`에 아무런 값을 추가하지 않아도 암시적으로 CommonJS가 사용된다. 하지만 `type: "commonjs"`를 추가해 명시적으로 CommonJS 모듈 시스템을 사용한다는 것을 밝히는 것도 좋은 생각이다.

ES6 모듈 시스템에서 모듈을 공개할 때는 `export` 키워드를 사용한다. ES6 모듈 시스템에서 모듈을 공개하는 방법은 Named Export, Default Export, 이렇게 두 가지가 있다.

Named Export는 다음과 같이 공개하는 변수 및 함수에 이름을 붙여 공개하는 것이다.

{: .code-header}
circle.mjs [Named Export 사용 1]

{% highlight javascript linenos %}
const PI = 3.14;

export const area = function (radius) {
  return PI * radius * radius;
}

export const circumference = function (radius) {
  return 2 * PI * radius;
}
{% endhighlight %}

또는 다음과 같이 할 수도 있다.

{: .code-header}
circle.mjs [Named Export 사용 2]

{% highlight javascript linenos %}
const PI = 3.14;

function area(radius) {
  return PI * radius * radius;
}

function circumference(radius) {
  return 2 * PI * radius;
}

export { area, circumference };
{% endhighlight %}

Named Export는 위와 같이 여러 개의 변수 및 함수를 내보낼 수 있다.

한편 Default Export는 다음과 같이 공개하는 변수 또는 함수에 이름을 붙이지 않고 공개하는 것이다.

{: .code-header}
circle.mjs [Default Export 사용]

{% highlight javascript linenos %}
const PI = 3.14;

const functions = {
  area: function (radius) {
    return PI * radius * radius;
  },
  circumference: function (radius) {
    return 2 * PI * radius;
  }
}

export default functions;
{% endhighlight %}

Default Export는 한 모듈 당 한 번만 사용할 수 있다.

ES6 모듈 시스템에서 모듈을 사용할 때는 `import ... from` 키워드를 사용한다. ES6 모듈 시스템에서 모듈을 사용하는 방법 역시 Named Import, Default Import, 이렇게 두 가지가 있다.

Named Import는 다음과 같이 중괄호를 사용해 Named Export로 공개된 변수 및 함수들을 가져온다.

{: .code-header}
foo.mjs [Named Import 사용]

{% highlight javascript linenos %}
import { area, circumference } from "./circle.mjs";

let radius = 3;

console.log("Area: " + area(radius));
console.log("Circumference: " + circumference(radius));
{% endhighlight %}

{: .code-result}
{% highlight text %}
Area: 28.259999999999998
Circumference: 18.84
{% endhighlight %}

Default Import는 다음과 같이 중괄호를 사용하지 않고 Default Export로 공개된 변수 또는 함수를 가져온다.

{: .code-header}
foo.mjs [Default Import 사용]

{% highlight javascript linenos %}
import circle from "./circle.mjs";

let radius = 3;

console.log("Area: " + circle.area(radius));
console.log("Circumference: " + circle.circumference(radius));
{% endhighlight %}

{: .code-result}
{% highlight text %}
Area: 28.259999999999998
Circumference: 18.84
{% endhighlight %}

CommonJS의 `require()` 함수에서는 확장자를 생략해도 됐지만, ES6 모듈 시스템에서는 `import ... from` 키워드를 쓸 때 반드시 확장자까지 명시해 주어야 한다.



