# Starting Project

## Design Component

- React.js 에서 컴포넌트에 대한 디자인을 진행할 때 작은 단위로 잘 나뉘어야 하는 것이 중요합니다.

- React.js 에서 모든 컴포넌트들이 뿌려지는 큰 컴포넌트를 `App.js` 로 생성하는 것이 일반적입니다.

- 컴포넌트가 User Interface 의 주름을 잡기 때문에 구조를 파악하기 쉽게 생산하는 것이 중요합니다.

## JSX

JSX 는 React.js 에서 컴포넌트를 만들 때 사용하는 JavaScript 와 다른 또 다른 언어 입니다. 생긴 것은 HTML 와 똑같지만, property 가 카멜체(CamelCase) 로 되어 있거나 다른 이름으로 되어 있습니다.

ex) class → className, onclick → onClick

참고로 JSX 문장은 Webpack 안에서 `babel` 트랜스파일러를 사용해서 JavaScript 문장으로 컴파일 하게 도와줘야 합니다. CRA(`create-react-app`) 에는 자동으로 내장되어 있어 그냥 사용해도 상관 없습니다. 하지만 Webpack 으로 React Application 을 만들어 볼 필요는 있습니다.

## Component Structure

React.js 에서 컴포넌트를 생성할 때, `react` 모듈에 있는 Component 를 사용합니다.

```jsx
import React, { Component } from 'react';

class MyComponent extends Component {
    render(){
        return(
            <h1>Hello</h1>
        );
    }
}

export default MyComponent;
```

추가로 필요한 함수(Function) 와 메소드 등은 외부에서 가져와 사용할 수 있습니다.

컴포넌트를 브라우저에 보여주도록 하기 위한 함수는 `render()` 입니다.

이외에도 Life Cycle API 함수 등이 있는데 다음에 알아 가겠습니다.

## `index.js`

`index.js` 안에는 기본으로 `App` Component, `react`, `react-dom`, `css` 모듈 등을 불러옵니다. `App` Component 를 외부 브라우저에서 그리기 위해 필요한 모듈이 바로 `react-dom` 입니다.

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

이 문장은 `public` 폴더에 저장된 정적 HTML(`index.html`) 에 `div` 태그 중 아이디가 `root` 인 곳에 렌더링을 하겠다는 의미입니다.

App 컴포넌트 안에는 여러 개의 컴포넌트를 만들어 출력할 수 있습니다.

또한 JavaScript DOM 함수를 이용해서 또 다른 컴포넌트들을 브라우저에 출력이 가능합니다. 그러나 단일 컴포넌트 안에서 내부 컴포넌트를 구성하는 방법이 보편화 되어 있습니다.

## React VS React DOM?

`react` 는 User Interface 의 주름을 잡아주는 라이브러리이고, `react-dom` 은 Web Browser 에 출력(렌더링)하는 것을 도와주는 모델입니다. 

하지만 React Application 을 모바일, AR에서 사용하고 싶으면 리엑트 네이티브(React Native), React 360 를 `npm` / `yarn` 에서 따로 설치하고 사용하면 됩니다.

## `npm start` / `yarn start`

React.js 에서 컴포넌트 클래스를 작성하고 저장하면 HTML 안에서 새로 생성되는 것으로 착각할 수 있습니다.

하지만 실제 메카니즘은 복잡합니다. 우선 `npm start` 명령어 (yarn Module Management 를 사용하면 `yarn start` 를 이용하면 됨.) 를 입력하면 Application 안에 저장 된 HTML 파일이 열립니다. 그 다음에 지금까지 작성한 JavaScript 문장들을 정적 단위로 묶어 HTML 파일 안에서 불러오고, 컴포넌트 UI 들을 HTML 문장 안에 렌더링을 거칩니다. 정적 파일들은 전부 `public` 에 저장 되어 있습니다.

## Fragment

이미 알고 있는 개념을 미리 적어두는 것인데, JSX 문장에는 단일 DOM 문장만 작성 가능합니다. 하지만 복수 컴포넌트를 생성하기 위한 방법은 `div` 태그, `ul` 태그 등을 이용해서 감쌀 수 있습니다.

```jsx
const header = <h1>header</h1> // OK
const header2 = <h1>header</h1><h2>hello</h2> // 에러
const header3 = (
    <div>
        <h1>header</h1>
        <h2>hello</h2>
    </div>
);
const header4 = (
    <Fragment>
        <h1>header</h1>
        <h1>hello</h1>
    </Fragment>
)
```

그러나 CSS 특성에 따라 `div`, `ul` 태그에 대한 속성이 종속되어 UI 디자인에 영향을 줄 수 있습니다. 자식 컴포넌트(OR 자식 DOM) 들을 감싸주는 `div` 태그를 대체하는 컴포넌트가 바로 `Fragment` 입니다. 이를 사용하면 CSS 에 미치는 영향이 줄어들고 요구 사항에 가까운 컴포넌트를 구성할 수 있기 때문에 이를 사용하는 습관을 들여야 합니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))