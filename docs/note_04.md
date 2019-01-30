# `props`

Props 는 각 컴포넌트 안에서 필요한 데이터를 외부에서 가져올 때 사용하는 개념입니다. 데이터는 JSON, XML 등을 이용해서 가져오는 것이 보통입니다.

예를 들어 연락처 목록 컴포넌트 안에 단일 연락처를 카드 UI 로 재가공해서 보여주는 경우를 생각하겠습니다. 

부모 컴포넌트는 연락처 목록 컴포넌트(ContactList), 자식 컴포넌트는 단일 연락처 컴포넌트(ContactElement) 인데, 부모 컴포넌트가 자식 컴포넌트에게 정보를 넘겨줘야 합니다. 이 때 필요한 개념이 `props` 입니다.

## How To Use Props?

```jsx
const info = [
    '사람1', '사람2', '사람3'
];

class ContactList extends Component {
    render(){
        return (
            <Fragment>
                <ContactElement person={ info[0] } />
                <ContactElement person={ info[1] } />
            </Fragment>
        );
    }
}

class ContactElement extends Component {
    render(){
        const { person } = this.props;
        return(
            <Fragment>
                <h2>{person}</h2>
            </Fragment>
        );
    }
}
```

`props` 를 사용하는 방법은 컴포넌트에게 넘겨줄 객체의 프로퍼티를 JSX Property 이름을 이용해서 결정하고(여기서는 연락처의 이름 정보인 person 을 사용하겠습니다.), JavaScript 문법으로 넘겨주면 됩니다.

그리고 넘겨온 데이터들을 자식 컴포넌트에서 사용하기 위해 `render` 함수 안에서 `this` 로 호출하여 사용합니다.

또한 자식 컴포넌트 안에서 또 다른 자식 컴포넌트에게 `props` 데이터를 전달할 수 있습니다.

## When To Use `props`?

`props` 를 잘 활용하는 방법은 데이터를 얻어오는 Flow 를 최소화하는 것이 중요합니다.

실제로 컴포넌트에서는 여러 데이터들을 임의로 넘겨주기 때문에 Props 를 남용하면 스파게티 코드가 형성되어 데이터의 근원이 어디인지 파악하기ㅣ 힘들어집니다.

그리고 `props` 에 따른 Life Cycle API 를 추가로 공부해야 이에 따른 User Interface 의 렌더링을 철저히 관리할 수 있습니다.

또한 컴포넌트 안에서 쓰는 `state` 변수가 있는데 이는 다음에 다루겠습니다.

## `map` Syntax

`map` 함수는 JavaScript Array 에 있는 모든 데이터를 Iterator 를 이용하여 가공한 결과를 내놓는 함수입니다. React.js 에서는 JSX 문법을 이를 이용해서 반환할 수 있습니다.

```jsx
const people = [
    {
        name : '사람1',
        phone : '010-1111-2222'
    },
    {
        name : '사람2',
        phone : '010-2222-3333'
    },
    {
        name : '사람3',
        phone : '010-4444-5555'
    }
];

class ContactList extends Component {
    render(){
        return (
            <Fragment>
            {
                people.map((person, key) => (
                    <ContactElement key={`person_${key}`} person={person} />
                ))
            }
            </Fragment>
        )
    }
}

class ContactElement extends Component {
    render(){
        const { person } = this.props;
        return (
            <Fragment>
                <h1>{person.name}</h1>
                <h2>{person.phone}</h2>
            </Fragment>
        )
    }
}
```





