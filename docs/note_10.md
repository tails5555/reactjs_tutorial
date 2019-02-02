# Component VS Stateless(Functional) Component

React 에서 컴포넌트를 생성하면 구분 지어두는 것이 좋은 개념이 바로 일반 컴포넌트, 퓨어 컴포넌트, Stateless 컴포넌트 3가지 입니다.

셋의 공통점은 `props` 변수를 통해서 부모에게 값을 물려 받는 것이지만, 차이점은 `state` 의 유무와 컴포넌트 최적화에 대한 이슈입니다.

그래서 이번 노트에서는 React.js 에서 사용되는 컴포넌트에 대한 종류를 구분 지어 어떤 용도에 사용하면 좋을지 따져보는 시간을 가지겠습니다.

## Background About JavaScript

이 노트를 읽어보기 전에 알아둬야 하는 것이 2가지가 있어서 따로 단락 별로 구분 짓겠습니다.

1. Using Life Cycle API at Component 

React.js 에서 컴포넌트의 생명 주기 함수를 사용하기 위해서는 `Component` 를 상속해서 렌더링을 진행해야 합니다.

생명 주기 함수는 지난 시간에도 언급 했듯이 `props` 와 `state` 의 값에 따라 작동을 합니다.

또한 최적화를 담당하는 함수인 `shouldComponentUpdate()` 함수에 대해서 사용하는 습관을 들여야 합니다. 

그리고 이 함수에 대한 비교 방법도 달라질 수 있는데 이는 아래에서 언급하겠습니다.

2. JavaScript Class

또한 JavaScript 의 클래스(`class`) 개념은 ES6 버전에서 생겼습니다.

다른 객체 지향 언어에서는 클래스를 중요시하지만, JavaScript 는 프로토타입 지향 언어이기 때문에 `function` 을 더욱 중요하게 여깁니다.

그래서 자바스크립트에서의 클래스 개념은 함수의 일종으로 이해하셔야 합니다.

또한 자바스크립트에서도 `this` 키워드는 클래스 안에 있는 맴버 변수나 메소드 등으로 적용할 수 있습니다만 `private` 맴버 변수 및 메소드를 사용하는 것까진 기대하지 않는 것이 좋겠습니다...

## Stateless Component

말 그대로 `state` 변수가 없는 컴포넌트 입니다. 이는 오로지 부모에게 `props` 변수를 통하여 새로운 값만 받아 렌더링을 거칩니다.

그래서 `state` 변수에 따른 생명 주기 함수에 대한 이용 빈도가 드물기 때문에 React 라이브러리의 `Component` 를 굳이 상속할 필요가 없어집니다.

또한 위에서 언급했듯이, 클래스도 함수의 일종이기 때문에 Stateless Component 는 함수로도 구성 가능하고, 소스 코드가 한결 짧아집니다.

```jsx
const MyComponent = (props) => (
    <Fragment>
        <h1>{ props.greeting }</h1>
    </Fragment>
);

// Stateless(Functional) Component 에서 prop-types 는 아래와 같이 지정합니다.
MyComponent.propTypes = {
    greeting : PropTypes.string.isRequired
};

const YourComponent = ({ greeting }) => (
    <Fragment>
        <h1>{ greeting }</h1>
    </Fragment>
);

function hisComponent({ greeting }) {
    return (
        <h1>{ greeting }</h1>
    );
}
```

Stateless Component 를 렌더링하는 함수의 매개변수는 `props` 객체 입니다.

이 안에서 사용되는 `props` 의 프로퍼티들을 비구조화(Destructuring) 원리를 사용해서 가져오는 것이 더욱 효율적입니다.

Stateless Component 는 단일 데이터 객체에 대한 값을 보여줄 때 사용하는 것이 좋습니다. 

다만 이 값에 대한 변경 기능을 제공하기 위해선 일부 생명 주기 함수가 추가로 요구됩니다.

그렇다고 Stateless Component 를 많이 사용한다 치더라도 React Application 의 컴포넌트 최적화가 향상 된다는 보장은 없습니다. 

부모가 보내는 `props` 의 값이 어떻든 간에 리-렌더링 과정은 그냥 묻지도 않고 따지지도 않고 매번 진행하기 때문입니다.

참고로 Stateless Component 는 함수로 대부분 작성하기 때문에 Functional Component 라고도 부릅니다.

## Component

```jsx
class MyComponent extends Component {
    constructor(props){
        super(props);
        this.state = { greeting : '' };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                greeting : '안녕하세요'
            });
        }, 2000);
    }

    _handleChange = (event) => {
        this.setState({
            [ event.target.name ] : event.target.value
        });
    }

    render() {
        const { greeting } = this.state;
        return (
            <Fragment>
                <h1>{ greeting }</h1>
                <input type="text" onChange={this._handleChange.bind(this)} name="greeting" />
            </Fragment>
        );
    }
}
```

React 컴포넌트를 새로 생성했을 때 다뤘던 컴포넌트 클래스랑 전혀 다를 바가 없습니다.
 
방금 전과 같이 `props` 에만 영향이 있는 컴포넌트가 아니고, `state` 에 대한 영향이 매우 큰 경우에는 생명 주기 함수를 사용할 필요가 있습니다.

참고로 React.js 에서 일어나는 비동기 이벤트에 대해서 다루는 방법도 알아둬야 하는데 이는 뒤에서 계속 다루겠습니다.

여기서는 입력 상자 안에 텍스트를 입력하면 `greeting` 프로퍼티의 값이 계속 바뀌어 렌더링 된다는 사실만 알아두면 되겠습니다.

## Pure Component

Pure Component 는 위에서 언급한 Component 와 전혀 다를 바가 없어 보입니다.

하지만 분명한 차이가 있으니깐 결국 만들어진 건 사실입니다.

이를 상속 하더라도 React 컴포넌트의 생명 주기 함수들은 그대로 이용할 수 있습니다.

하지만 Component 에서 사용되는 `shouldComponentUpdate()` 함수와 PureComponent 에서 사용되는 `shouldComponentUpdate()` 함수의 차이가 존재합니다.

우선 `shouldComponentUpdate()` 함수는 컴포넌트의 리-렌더링 여부를 좌우하는 매우 중요한 함수입니다.

Component 에서는 알아서 구현해야 하지만, PureComponent 에서는 이를 구현할 필요가 없게 됩니다.

PureComponent 에서는 `shouldComponentUpdate()` 에서 `props` 와 `state` 의 값을 비교를 자체적으로 구현이 되어 있지만 Shallow Comparison(얕은 비교) 를 합니다.

## Thinking About Component

React 에서 컴포넌트의 최적화를 향상 시키기 위해선 컴포넌트를 잘 선택해야 합니다.

우선 위에서 언급했듯이 단일 데이터에 대한 조회용 컴포넌트는 Stateless Component 를 사용하는 것이 좋습니다.

다만 컴포넌트 최적화를 이루는 과정을 디테일하게 이루기 위해서는 Component 를 더욱 사용하는 것이 좋습니다.

그렇지만 아직까지 React.js 를 다루기 힘들고 컴포넌트 값에 대한 최적화에 대한 솔루션이 잡히지 않으면 PureComponent 를 사용해도 무방합니다.

하지만 요구 사항이 달리지는 경우를 대비하면 Component 를 사용하는 것이 좋겠습니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))