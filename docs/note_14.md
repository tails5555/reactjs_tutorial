# Handling Events

Nomad React.js 강의에서는 Event 를 다루는 방법에 대해 설명하지 않았습니다.

그래서 튜토리얼과 각종 자료를 참고해서 정리하겠습니다.

React.js 에서 DOM 객체에 대한 이벤트를 다루기 위한 이벤트는 다양합니다. 예를 들어 클릭을 위한 `onclick`, 값 변경을 위한 `onchange` 등이 있습니다.

그렇지만 이를 React 에서 적용하기 위해 Camel Case 로 수정해야 사용 가능합니다.

그리고 평상 시에 썼던 자바스크립트 문장으론 함수나 아니면 대놓고 실행 될 내용들을 쓰는데, React 에서는 이렇게 하면 버튼을 클릭 안 해도 실행이 되어 부립니다.

그래서 React.js 에서 컴포넌트에 대한 이벤트를 등록하고 사용하는 방법에 대해 알아보겠습니다.

```jsx
class MyComponent extends PureComponent {
    constructor(props){
        super(props); // 참고로 이를 안 쓰면 컴포넌트 안에서 this 는 무용지물이 되어 부립니다.
        this.state = { num : 1 };
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event) {
        event.preventDefault();
        const { num } = this.state;
        this.setState({
            num : num + 1
        });
    }

    render() {
        const { num } = this.state;
        return (
            <Fragment>
                <div>
                    <button onClick={this._handleClick}>
                        증가
                    </button>
                    <p>{ num }</p>
                </div>
            </Fragment>
        );
    }
}
```

컴포넌트가 브라우저에 보여질 때 라이프 사이클에 따른 렌더링 과정 이외에 이용자가 임의로 UI 를 건들어서 발생하는 이벤트를 인위적인 이벤트(Synthetic Event) 라고 합니다.

이 이벤트를 컴포넌트 안에 있는 DOM 객체에서 발생하기 위해 바인딩(binding) 과정이 필요합니다.

바인딩 과정은 쉽게 설명하면 이벤트 함수(`_handleClick(event)`) 에서 쓰이는 `this` 를 컴포넌트 자체의 `this` 로 인식시키는 것입니다.

그러면 위에서 작성한 `this._handleClick` 에 대한 호기심이 들게 됩니다.

이는 생성자에서 사용자가 만든 `_handleClick(event)` 함수에서 쓰인 `this` 를 컴포넌트 자체의 `this` 를 사용하게끔 바인딩 시킨 함수를 반환합니다.

**event.preventDefault()**

사용자가 DOM 에서 발생할 수 있는 이벤트는 다양합니다. 

그렇지만 이메일 형식 확인, 아이디 확인 처럼 이벤트에 대한 유효성이 올바르지 않으면 취소할 필요가 있습니다.

올바르지 않는 경우에 대해 이벤트를 확산하는 것을 방지하기 위한 함수가 바로 이 함수입니다.

이 함수는 대부분 Form 에 `onSubmit` 이벤트에서 주로 많이 쓰입니다.

## Thinking About Not Binding

만약에 이벤트 함수에 대한 바인딩을 아예 안 하고 진행하면 어떤 일이 벌어질까? `this` 가 `undefined` 로 뜹니다. 

이는 자바스크립트에 대한 이슈이기 때문에 자세하게 알아 보겠습니다.

`_handleClick(event)` 함수가 아무리 컴포넌트 안에 있는 메소드라 쳐도 `this` 의 값은 `undefined` 가 나오는 이유는 **함수(Function) 와 Arrow Function 에 대한 Scope 의 차이** 때문입니다.

우리가 작성한 메소드는 함수인데, 함수 스코프 내에서 `this` 는 해당 함수를 부른 객체에 대한 `this` 로 칩니다.

그렇지만 Arrow Function 에서의 `this` 는 렉시컬 영역의 상위 객체를 `this` 로 치게 됩니다.

그래서 Arrow Function 에서는 솔직하게 이야기하면 `this` 가 곧 렉시컬 영역의 상위 객체인 컴포넌트 자체를 가리키게 되어 **바인딩 자체가 필요 없게 됩니다.**

그렇지만 일반 함수로 작성을 하고, 바인딩을 안 거치고, 이벤트를 실행하면 렌더링 된 컴포넌트를 클릭하면 호출하는 함수의 스코프가 없기 때문에 `this` 의 값이 `undefined` 로 뜨게 됩니다.

그래서 React.js 에서는 함수 이벤트에 대하여 아래와 같은 규칙을 꼭 지키길 권장하고 있습니다.

1. 일반 메소드로 이벤트 처리를 할 땐, 바인딩 과정을 거쳐야 합니다. `constructor` 에서 바인딩을 미리 해 두는 방법이 적절합니다.

2. Arrow Function 을 메소드로 사용하면 바인딩을 안 해도 되기 때문에 편합니다. 그렇지만 실행할 DOM 에 Arrow Function 을 작성하면 함수를 생성하는데 성능 저하가 발생할 수 있습니다.

3. 이벤트를 실행할 DOM 에 작동 로직을 쓰는 건 성능 문제가 발생하니 지양해야 합니다.

**this at Development, Production Build**

추가로 바인딩을 안 거친 일반 함수 메소드의 `this` 는 개발 환경에선 `undefined` 가 뜹니다.

그렇지만 배포 환경에서는 `strict mode` 를 포함 시키지 않기 때문에 `window` 객체를 가리키게 됩니다.

그래서 배포 환경에서도 React 에 대한 엄격한 검사 여부를 유지하기 위해 `React.StrictMode` 를 사용하는 것을 권장합니다.

## References

- [React.js Binding 에 대한 이슈](https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

## Author

- 강인성([tails5555](https://github.com/tails5555))