# Using `state` With API Loading 

Component 안에서 필요한 데이터는 항상 존재하진 않습니다. 

컴포넌트에서 데이터를 불러오기 위해 로딩 상태 UI 를 보여주고, API 로 호출을 하고 안에서 데이터를 받아오면 `state` 프로퍼티에 저장합니다.

지난 시간에 언급했듯이, React 컴포넌트에서 `state` 의 프로퍼티 값들은 항상 새롭게 바뀝니다. 

마치 톰과 제리에서 제리가 멘하탄 옥상에서 서로 다른 모형 인형과 춤 추는 장면과 유사합니다. 

컴포넌트에서는 언제든지 새로운 데이터를 쓰고 난 뒤에 새로운 `state` 를 받으면 기존에 있던 `state` 를 버리고 프로퍼티 별로 새로운 값을 덮어 씁니다.

[![TandJ](https://img.youtube.com/vi/RMW6wBruQwc/0.jpg)](https://www.youtube.com/embed/RMW6wBruQwc?start=325)

그래서 `state` 에 초기 값을 설정을 해 두고 변경이 되게 설정하거나 생명 주기 함수를 통해 새로운 `state` 값을 덮어 쓰게 만들거나 둘 중 하나의 작업이 이뤄져야 합니다.

컴포넌트 안에서 실제 API 를 이용한 요청 과정을 어떻게 구성하면 좋을지 아래 예제를 살펴보면 좋겠습니다.

## How To Create Loading State At Component

강의 예제에서 영화 목록을 `componentDidMount()` 함수에서 한꺼번에 불러오고 난 이후에 새로운 값을 덮어 쓰는 방식을 적용했습니다. 

하지만 컴포넌트가 바로 생성된 이후에 `state` 객체에 아무런 프로퍼티가 없으면 자식 컴포넌트를 불러오는데 지장이 생깁니다.

그래서 컴포넌트에 해당 되는 프로퍼티의 존재 여부를 확인해야 합니다. JavaScript 에서 값 중에 존재하는 것이 확실한 것들을 Truthy Value 라고 합니다. 참고로 길이가 0인 배열의 값도 이에 해당 됩니다.

```jsx
class ContactList extends Component {
    state = {

    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                contacts : [
                    { name : '강사람', phone : '01022223333' },
                    { name : '김사람', phone : '01022334455' },
                    { name : '이사람', phone : '01023456789' },
                    { name : '저사람', phone : '01033334444' }
                ]
            });
        }, 5000);
    }

    _renderContacts = () => {
        const { contacts } = this.state;

        return contacts.map((contact, idx) => (
            <ContactElement contact={contact} key={`contact_key_${idx}`} />
        ));
    }

    render() {
        return (
            <Fragment>
            {
                this.state.contacts ? this._renderContacts() : <h1>Loading</h1>
            }
            </Fragment>
        );
    }
}

export default ContactList;
```

이 문장에 대한 간략한 설명을 하면, 이 컴포넌트가 브라우저에 표출될 때 `state` 에 아무런 프로퍼티가 없이 작동을 하게 되어 Falsy Value 에 대한 처리로 'Loading' 메시지를 보여줍니다.

그 다음에 `componentDidMount()` 함수에서는 연락처 목록을 초기화하는 과정을 5초 뒤에 실행하라고 타이머를 잡아둡니다. 이 때까지의 `state` 값에는 아무런 프로퍼티의 값이 존재하지 않습니다.

이제 5초 후에는 새로운 프로퍼티인 `contacts` 가 생기게 되어 Truthy Value 에 대한 처리로 각 연락처 객체 별 Virtual DOM 을 보여줍니다.

렌더링이 완료된 시점에서는 위 문장에 기재된 연락처 목록만 보여주게 됩니다. 추가로 새로운 연락처 목록을 보여주기 위해서는 `state` 값에 대한 이벤트 처리를 따로 기재하시고 이용해야 합니다.

참고로 React 컴포넌트 함수에서는 React 라이브러리 만의 함수 이름을 구분 짓기 위해 개인적으로 만든 컴포넌트의 함수나 멤버 변수들은 `_` 로 작성하는 것이 좋습니다. 

## About Initialized State

노마드 React 강의에서는 `state` 의 객체는 항상 새로워지는 것을 예방하기 위하여 Truthy, Falsy Value 의 원리로 렌더링 여부를 결정 했습니다.

그렇지만 컴포넌트에서 쓰이는 `state` 값을 초기화 해서 사용을 해도 무방합니다. 

위에서 작성한 컴포넌트 클래스에서 `contacts` 에 빈 배열의 값으로 초기화를 시킬 것입니다. 

하지만 앞서 이야기 했듯이 빈 배열의 값도 Truthy Value 이기 때문에 단일 연락처에 대한 Virtual DOM 렌더링 과정이 일어납니다.

그래서 배열의 길이가 0보다 큰 경우에만 렌더링을 하고, 아닌 경우에는 로딩 처리를 하는 것으로 작성하는 것이 더욱 효율적입니다.

```jsx
class ContactList extends Component {
    state = {
        contacts : []
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                contacts : [
                    { name : '강사람', phone : '01022223333' },
                    { name : '김사람', phone : '01022334455' },
                    { name : '이사람', phone : '01023456789' },
                    { name : '저사람', phone : '01033334444' }
                ]
            });
        }, 5000);
    }

    _renderContacts = () => {
        const { contacts } = this.state;

        return contacts.map((contact, idx) => (
            <ContactElement contact={contact} key={`contact_key_${idx}`} />
        ));
    }

    render() {
        const { contacts } = this.state;
        return (
            <Fragment>
            {
                contacts.length > 0 ? this._renderContacts() : <h1>Loading</h1>
            }
            </Fragment>
        );
    }
}

export default ContactList;
```

```javascript
const { contacts } = this.state;
```

참고로 이전에서도 작성한 바와 같이, 객체의 프로퍼티를 통하여 값을 가져오는 원리를 Destructuring(비구조화) 과정이라고 합니다. 이는 JavaScript ES6 버전부터 가능한 기능입니다.

JavaScript 에서는 객체를 임의로 불러오기 때문에 객체들 간의 정체성이 확실하게 잡히지 않습니다. 

그래서 객체의 프로퍼티에 있는 값을 따로 불러오되 변경하는 사항이 거의 없으면 Destructuring 으로 얻어 오는 방법이 객체의 정체성을 구분하는데 효과적입니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))