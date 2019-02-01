# `state` And Array

`state` 변수에 Array 데이터를 넣을 때 주의 사항을 짚어 보겠습니다. 

예를 들어 연락처 목록을 보여주기 위한 컴포넌트를 조성한다고 가정하겠습니다.

```jsx
class ContactList extends Component {
    constructor(props){
        this.state = {
            contacts : [
                {
                    name : '강사람', phone : '01011112222'
                },
                {
                    name : '김사람', phone : '01022223333'
                },
                {
                    name : '이사람', phone : '01033334444'
                }
            ]
        };
    }

    componentDidMount() {
        // 이 함수에서 저사람 에 대한 정보를 추가해야 합니다.
        // 어떤 방법으로 추가해야 할까요?    
    }

    render(){
        const { contacts } = this.state;
        return (
            <Fragment>
            {
                contacts.map((contact, idx) => (
                    <ContactElement contact={contact} key={`contact_key_${idx}`} />
                ))
            }
            </Fragment>
        ); 
    }
}
```

`state` 에 있는 배열의 값을 추가하거나 일부 삭제한 값을 `state` 변수에 저장하기 위해 어떤 방법을 이용해야 할까?

`this.state` 에서 직접 배열을 가져와서 데이터를 추가하면 되는 것 아닌가 라고 생각할 수 있지만 틀렸습니다.

실제로 React 컴포넌트의 `state` 개념은 새로 덮어서 리-렌더링 과정에서 보여지기 때문에 `state` 에 있는 배열을 직접 접근하여 데이터를 추가해도 변하는 건 1도 없습니다.

그래서 `state` 에 있는 배열을 복사하여 데이터를 추가하는 방법과 JavaScript 에서 `...` Syntax 를 이용해서 저장하는 방법 2가지를 고려할 수 있습니다.

```jsx
componentDidMount() {
    const { contacts } = this.state;
    const tmp_arr = contacts.slice();
    tmp_arr.push({
        name : '저사람', phone : '01044445555'
    });
    
    this.setState({
        contacts : tmp_arr
    });
}
```

```jsx
componentDidMount() {
    const { contacts } = this.state;
    this.setState({
        contacts : [
            ...contacts,
            {
                name : '저사람', phone : '01044445555'
            }
        ]
    });
}
```

`...` Syntax 와 `slice()` 함수의 역할은 배열에 있는 모든 값에 대하여 그대로 복사하는 역할을 합니다. 원래 `slice()` 함수는 배열의 일부를 자르는 함수인데 파라미터에 아무 것도 안 넣으면 배열을 복사하는 함수로도 사용 가능합니다.

그리고 복사 된 배열에 `push` 함수를 이용해서 '저사람' 데이터를 추가하고 새로운 배열을 `setState()` 함수로 지정 해 줍니다.

여기서 `setState()` 함수를 보는 시점이 중요한데 새로운 값에 대하여 각각 설정하는 느낌으로 보는 것이 아닌, JavaScript 에서의 새로운 객체를 `state` 에 덮어 써 준다는 의미로 보는 것이 좋습니다.

그래서 `state` 에 있는 값으로 배열의 인덱스나 객체의 프로퍼티에 접근을 해서 새로운 값을 배정한다 치더라도 React 컴포넌트에서는 여전히 무반응인 것입니다.

## Timer At `componentDidMount()`

`componentDidMount()` 함수에서는 타이머, AJAX 요청 등의 비동기 이벤트를 작성할 수 있습니다.

예를 들어 처음에는 '안녕하세요' 라는 메시지가 나왔지만, 4초 이후에는 '안녕하가세요' 로 변경되는 UI 를 작성 하겠습니다.

```jsx
class MyComponent extends Component {
    state = {
        greeting : '안녕하세요'
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                greeting : '안녕히가세요'
            });
        }, 4000);
    }

    render() {
        const { greeting } = this.state;
        return (
            <Fragment>
                <h1>{ greeting }</h1>
            </Fragment>
        );
    }
}
```

원래는 '안녕하세요' 라는 문장이 나왔지만, UI 가 렌더링 된지 4초 이후에 '안녕히가세요' 로 변경 됩니다. 타이머 함수 안에 있는 콜백 함수를 이용하여 메시지를 변경하였는데, `this.setState()` 함수도 콜백 함수에 대한 클로저에 제한이 없으면 언제든지 적용할 수 있다는 뜻입니다.

여기서 4초 이후에 `greeting` 의 변수가 '안녕히가세요' 로 바꿔 달라는 것이 아니라, 4초 이후에 `state` 에 있는 모든 **프로퍼티** 중에서 `greeting` 의 값만 '안녕히가세요' 로 새로 덮어 써달라는 뜻으로 받아 들여야 합니다. 