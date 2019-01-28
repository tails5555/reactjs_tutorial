# Create React App

## Transpiler

React.js 에서는 순수 JavaScript 문장만 사용되지 않습니다. 1번 노트에서 언급한 JSX 문장 뿐만 아니라 ES6 이후의 문장들이 섞여 사용됩니다. 이들을 JavaScript 문장으로 바꿔줘야 컴파일이 가능합니다.

이러한 역할을 하는 도구를 트랜스파일러(Transpiler) 라고 합니다.

## Types Of Transpiler

1. Webpack

Webpack 은 React.js 문장을 브라우저가 이해하기 쉬운 코드로 바꿔줍니다. 자바스크립트의 최신 버전은 모든 브라우저가 이해를 하지 못 합니다. (특히 Internet Explorer.) 

Webpack 은 CSS, LESS, JavaScript, 이미지 파일 등의 Resource 파일들이 정적(static) 으로 저장되어 JS Application 안에서 어디서든 사용하기 쉽게 도와줍니다.

그리고 위에서 언급한 정적 파일들을 규칙에 알맞는 확장자로 변경하는 동시에 파일 압축까지 도와줍니다.

참고로 Webpack 은 생각보다 복잡하기 때문에 전문적으로 공부할 필요가 있습니다. 

2. Babel

강의에서 잘 안 다뤘지만, Babel 은 VS Code, Web Storm, Atom 등의 IDE 에서 작성한 JavaScript 최신 버전(ES6, ES7 등) 의 문장들을 ES5 로 바꿔줍니다. 또한 React.js 에서 작성한 JSX 문장도 ES5 문법으로 바꿔주는 역할을 합니다.

```jsx
let arr = [10, 20, 30]

arr.map(x => x * 20);

const title = (
    <div>
        <h1>Hello!</h1>
    </div>
);
```

```javascript
'use strict';

var arr = [10, 20, 30];

// 참고로 map 함수는 ES6 에서 새로 추가된 것이 아닙니다.
// 단지 Arrow Function 을 콜백함수로 바꿔주는 차이일 뿐입니다.
arr.map(function (x) {
    return x * 20;
});

// 초창기에 React.js 를 배웠으면 이처럼 노가다를 했어야 합니다.
var title = React.createElement( 'div', null,
  React.createElement('h1', null, 'Hello!')
);
```

## Create React App

Facebook 에서 React.js Application 을 쉽게 만들어주는 툴입니다. 

설치하는 것도 쉽고, App 을 만드는 방법도 쉽습니다.

```
npm install -g create-react-app

create-react-app [App 이름]
```

create-react-app 의 스크립트는 `start`, `build`, `test`, `eject` 4가지로 나뉩니다.

그리고 React Application 의 스크립트를 조작하는 모듈은 `react-scripts` 입니다.

React Application 을 실행할 수 있는 주소는 크게 Local, Own Network 2가지로 나뉩니다.

Local 은 말 그대로 `localhost`(127.0.0.1) 주소입니다.

Own Network 주소는 내 PC 의 네트워크 IP 주소입니다.

참고로 JavaScript 문장 내의 변경 과정이 이뤄지면 `react-scripts` 에서 이를 인지하고 난 후에 새로고침을 합니다.