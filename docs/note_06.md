# Component Life Cycle API

React.js 에서는 컴포넌트 안에 `props` 변수와 `state` 변수에 저장된 데이터에 대한 단방향 바인딩(One-way Data Binding) 이 이뤄집니다.

그래서 이 데이터 변경 사항에 대한 Flow 를 컴포넌트 자체 내부에서 정해진 순서대로 실행해야 합니다.

참고로 React.js 16.3 버전 이후에 생긴 Life Cycle API 를 기준으로 알아보겠습니다.

`componentWillMount()`, `componentWillUpdate()`, `componentWillReceiveProps()` 등의 함수는 안 다루겠습니다.

# First Rendering Mechanism

```markdown
1. constructor(props)
2. render()
3. componentDidMount()
```

이 생명주기 함수들은 컴포넌트가 브라우저에서 바인딩 된다면(즉, 존재한다면) 무조건 실행되는 함수들입니다.

1. React 컴포넌트에 대하여 생성할 때 실행되는 함수입니다. 말 그대로 생성자 입니다. 이 안에서는 `state` 에 대한 초기화 과정이 일어나는데, `state` 의 개념은 다음에 다뤄 보겠습니다.

2. 원래는 `componentWillMount()` 함수가 실행이 되었는데 (브라우저가 아닌 환경에서 호출 되는 용도. 서버 사이드 렌더링의 사례), 생성자가 실행된 이후에는 곧바로 JSX 문장에 작성한 DOM 문장들을 렌더링 합니다.

3. 컴포넌트가 렌더링 된 이후 브라우저 환경에 컴포넌트가 보이면 이 함수가 실행 됩니다. 이 함수에서는 DOM 객체에 대한 이벤트 등록(물론 React 컴포넌트 자체로도 이벤트를 작성할 수 있습니다.), AJAX 요청(`fetch` 함수, `axios` 모듈 사용) 등 초기에 렌더링이 된 바로 직후에 실행할 기능들을 기재합니다.

# After Rendering Mechanism

```markdown
1. static getDerivedStateFromProps(nextProps, prevState)
2. shouldComponentUpdate(nextProps, nextState)
~~componentWillUpdate(nextProps, nextState)~~
3. render()
4. getSnapshotBeforeUpdate(prevProps, prevState)
5. componentDidUpdate(prevProps, prevState, snapshot)
```

1. 원래는 `componentWillReceiveProps(nextProps, nextState)` 함수를 실행 했었지만 React.js 측에서도 동기화에 대한 이슈를 고려했습니다. 그래서 컴포넌트 안에 새로운 `props` 의 값을 받아와 컴포넌트 내부 변수인 `state` 에 대하여 동기화 작업을 할 때 사용되는 함수가 `getDerivedStateFromProps(nextProps, prevState)` 함수 입니다. 참고로 `static` 함수이기 때문에 이 안에서는 `this` 를 못 사용합니다. 대신에 새로운 `props` 변수의 값으로 새로운 `state` 값을 반환 시켜 저장 시켜줍니다.

2. 이 함수에서는 컴포넌트에 대한 렌더링을 최적화 하기 위해 사용 됩니다. React.js 에서는 변화가 자주 발생하는 컴포넌트에 대하여만 업데이트를 시켜서 성능을 향상 시키는 것을 요구합니다. 단일 컴포넌트에 대해서는 변경된 데이터가 그 때마다 바로 변경 해 주면 되지만, 부모와 자식이 있는 컴포넌트에서 부모 측의 컴포넌트가 `props` 와 `state` 의 변경이 많아지면 자식 컴포넌트에서는 쓸데 없는 리-렌더링 과정이 일어나서 성능이 안 좋아집니다. 이러한 작업을 줄이기 위해 이 함수를 적극 활용하는 것이 중요합니다. 참고로 이 함수는 `true` 값을 반환 시켜야 리-렌더링 과정이 일어납니다.

3. 원래는 `componentWillUpdate(nextProps, nextState)` 함수 자리였습니다. 여기서는 애니메이션 효과 초기화, 이벤트 리스너를 없애는 작업을 합니다. 하지만 이 함수는 4번에 기재된 함수로 대체 됩니다.

4. DOM 에 대한 변화가 일어나기 직전의 시점의 DOM 상태를 가져와서 componentDidUpdate 에서 세 번째 파라미터로 사용합니다. 쉽게 생각하면 놀이동산에서 롤러코스터를 타기 직전의 표정 셀카와 롤러코스터 기계를 타면서 찍을 때 떨리는 표정을 찍힐 때의 차이점이라고 생각하면 됩니다.

5. 컴포넌트가 리렌더링을 마칠 때 실행 되는 함수입니다. 여기서 `this.state`, `this.props` 는 이미 업데이트 된 값이 저장 되어 있습니다. 그리고 `snapshot` 변수를 이용하여 변경된 값을 더욱 쉽게 비교하여 적용합니다. 참고로 여기서는 컴포넌트가 완전히 생성된 이후 라우터에 대한 액션들을 처리할 때 많이 사용합니다.

# Cancel Rendering Mechanism

```markdown
componentWillUnmount()
```

컴포넌트가 더 이상 필요하지 않을 때 실행 되는 함수입니다. 여기서는 `setTimeout()`, `setInterval()` 등의 함수로 타이머를 설정하다가 이들을 없애는 `clearTimeout()` 함수를 이용할 때, Redux 에서 데이터에 대한 초기화 액션 등을 실행할 때 사용되는 함수 입니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))