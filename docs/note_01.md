# Introduce of React.js

## Specification

1. Only JavaScript Syntax(자바스크립트 기반)

React.js 는 자바스크립트 기반입니다. 

Angular 는 TypeScript, Vue.js 는 그 만의 함수를 추가로 배워야 합니다.

그러나 최근에는 TypeScript, KotlinScript 등의 언어로 협업하는 경우도 있습니다.

대부분 React.js 에서 쓰이는 함수들은 JavaScript 에서 제공하는 함수입니다.

```jsx
const peopleListBlocks = (
    <div>
    {
        people.map((person) => (
            <div>
                <p>{ person.name } : { person.age }
            </div>
        ))    
    }
    </div>
);
```

2. Composition(구조)

React.js 구조는 컴포넌트 별로 나뉘어서 작업을 합니다.

예를 들어 어느 웹 페이지 User Interface 의 역할에 따라 큰 단원으로 나뉩니다.

- Navigation Component : 메뉴 
- Header Component : 헤더 
- Grid Component : 갤러리
- Copyright Component : 하단 바

이러한 작은 컴포넌트들을 쪼개져서 아무 곳에서 사용하면 다른 곳에서 사용하기 용이합니다.

**Virtual DOM**

컴포넌트의 재활용을 향상 시켜 Single Page Application(SPA) 에 DOM 조작을 향상 시키는 것입니다. 

이를 굳이 쓰지 않더라도 변화된 컴포넌트에 DOM 을 적용 시켜도 성능엔 지장이 없어도 Virtual DOM 은 기존에 DOM Rendering 과정을 수동이 아닌 자동으로 추상화를 합니다.

**JSX**

React.js 에서 HTML Template 에 JavaScript 의 요소를 (Event, Variable 등) 주입 시키는 문장입니다. 

3. Unidirrectional Data Flow(단방향 플로우)

데이터는 항상 일정한 장소에 위치하고 그 장소에서 변경이 이뤄지는 것이 관례입니다.

예를 들어 Angular 에서는 데이터는 view 나 model 로 변합니다.

허나 React.js 에서는 데이터가 위치한 장소가 있고, 상태가 변하면 데이터는 그대로 있고, 생명 주기 API 에 따라 업데이트가 되는 것입니다.

그래서 React.js 에서 User Interface 는 데이터가 장악합니다. User Interface 에서 발생한 이벤트가 User Interface 자체를 변경 시키는 것으로 보이겠지만, 실제로는 새로 바뀐 데이터에 대한 처리가 컴포넌트 내부에서 이뤄지고 다시 렌더링 되는 것입니다.

짧게 요약하면 React.js 에서 User Interface 의 변경 과정은 다음과 같은 Flow 로만 이뤄집니다.

```markdown
- 데이터
- DOM Rendering
- UI 측 데이터 변경
- Life Cycle API
- DOM Re-rendering
- User Interface 변경
```

4. Community And ETC

React.js 와 관련된 커뮤니티와 오픈소스, Stack Overflow 질의 응답 등의 참여성이 매우 큽니다.

React.js 는 Ruby, Python, Java 등의 언어로 RESTful API 를 만드면 자유롭게 사용할 수 있습니다.

React.js 는 참고로 User Interface Library 입니다. View 에 있는 UI 의 사용 빈도가 크면 이 라이브러리를 사용하는 것을 권장합니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))