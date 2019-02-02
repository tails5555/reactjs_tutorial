# `state`

`state` 는 React 컴포넌트 안에서 자체적으로 사용하는 객체입니다. 이 객체에 해당하는 프로퍼티의 값이 바뀌면 컴포넌트는 언제든지 리-렌더링 됩니다. 

컴포넌트에서 `state` 객체를 새로 갱신하는 방법은 2가지입니다. 클래스 안에 `state` 라는 맴버 변수를 이용하는 방법, `constructor()` 함수 안에서 `state` 객체를 초기화 하는 방법입니다.

방법에 따른 차이는 따로 없습니다.

```jsx
class MyComponent extends Component {
    state = {
        name : '강사람',
        age : 25
    };

    render() {
        const { name, age } = this.state;
        return (
            <h1>{name} - {age}</h1>
        );
    }
}
```

```jsx
class YourComponent extends Component {
    constructor(props){
        super(props);
        this.state = { name : '강사람', age : 25 };
    }

    render() {
        const { name, age } = this.state;
        return (
            <h1>{name} - {age}</h1>
        );
    }
}
```

## Updating About `state` Object

`state` 객체에 있는 프로퍼티의 값들은 직접 변경하면 컴파일러에서 아래와 같은 경고를 날립니다.

```
Do not mutate state directly. Use setState()  react/no-direct-mutation-state
```

JavaScript 안에서는 프로퍼티에 해당하는 값을 바꾸기 위해 `Object.assign()` 함수나 프로퍼티 별로 접근해서 바꿔도 무방합니다.

하지만 React 컴포넌트의 `state` 객체의 값을 직접 접근해서 값을 변경해도 무용지물로 돌아옵니다.

그래서 경고창에 기재된 내용에 따라 `setState()` 함수를 이용해서 변경하면 됩니다. 이 함수를 이용하는 경우는 그렇게 많진 않지만 대표적으로 AJAX 요청, 이벤트 헨들링 과정에서 값이 변경되는 경우에 흔히 사용합니다.

```jsx
class Greeting extends Component {
    constructor(props){
        super(props);
        this.state = { greeting : '안녕하세요' };
    }

    componentDidMount() {
        this.setState({
            greeting : '안녕히가세요'
        });
    }

    render(){
        return (
            <h1>{ this.state.greeting }</h1>
        );
    }
}
```

지난 시간에 다뤘던 생명 주기 함수를 잠깐 복습하면, `Greeting` 컴포넌트가 Web 브라우저 상에 나타납니다. 

그러면 지금 `state` 의 값은 컴포넌트가 생성 되자 마자 `greeting` 프로퍼티의 값이 '안녕하세요' 로 저장이 되어 있습니다. 

이 컴포넌트가 렌더링이 되면 '안녕하세요' 라는 값이 나오기는 합니다. 그렇지만 우리 눈으로는 인식을 못 하고 `componentDidMount()` 함수로 인하여 빠르게 '안녕히가세요' 로 바뀌게 됩니다.

`state` 의 값이 변하는 과정은 순식간이지만, 더욱 자세하게 살펴보면 프로퍼티의 값이 일일히 변경되는 것이 아니고 비동기 이벤트에 따라 새로 덮어 쓰는 느낌으로 이해하는 것이 좋습니다.

`props` 의 값은 부모 컴포넌트에 전달 되는 값에 따라 리-렌더링 여부를 따졌습니다. 하지만 `state` 의 값은 값이 어떻게든 변하여 리-렌더링 과정이 일어날 수 밖에 없습니다. 그래서 컴포넌트의 리-렌더링을 최소화 시켜주는 비동기 이벤트의 이용 빈도가 높으면 `state` 변수를 고려해야 합니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))