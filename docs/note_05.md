# `key`

React.js 에서 `map` 함수를 이용한 컴포넌트 생성 및 렌더링을 위해 `key` 라는 프로퍼티가 필요합니다. `key` 의 데이터는 고유한 값으로 지정해야 합니다.

그래서 복수의 데이터를 컴포넌트에 보여질 때 DOM 객체의 탐색 속도를 향상시켜 컴포넌트에 바뀐 데이터에 대해 반영하기 위해 `key` 값을 꼭 지정해야 합니다.

```jsx
const list = people.map((person, idx) => (
    <ContactElement person={person} key={`contact_key_${idx}`} />
));
```

참고로 `key` 프로퍼티는 `this.props` 문장으론 볼 수 없습니다.

# Prop-Types

Prop-Types 는 React 컴포넌트에서 받아오는 `props` 데이터 타입에 대한 Validation 을 보장하기 위해 필요한 모듈입니다.

쉽게 생각하면, 사람에 대한 데이터를 컴포넌트에 보여줘야 하는데 이름과 나이, 전화번호 등의 정보가 들어 있는 데이터를 각각 보여주기 위하여 어떤 데이터 타입으로 지정 되어 있는지 확인해야 합니다. 

예를 들어 나이는 숫자 데이터만 들어 있어야 하는데 '스물 다섯 살' 이란 문자열로 저장이 되어 있으면 Prop-Types 를 사용해서 Props 의 데이터 형이 잘 못 되었음을 경고해야 프로퍼티를 견고하게 만들 수 있습니다.

React 15 버전 대에서는 `react` 라이브러리 자체에 내장 되어 있었지만, 16 버전 이후로는 지원을 하지 않아 `npm install prop-types` 를 사용해서 설치해야 합니다.

그리고 Prop-Types 는 컴포넌트 클래스 별로 static 맴버 변수로 지정해야 합니다.

참고로 자바스크립트의 데이터 타입으로 지정해야 하며, 데이터 타입 맨 뒤에 꼭 필요한 프로퍼티인 경우에는 `isRequired` 를 같이 붙어 써야 합니다.

```jsx
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ContactElement extends Component {
    static propTypes = {
        name : PropTypes.string.isRequired,
        age : PropTypes.number,
        phone : PropTypes.phone
    }

    render(){
        const { name, age, phone } = this.props;
        return (
            <Fragment>
                <h1>이름 : { name }</h1>
                <h2>나이 : { age }</h2>
                <h2>전화 : { phone }</h2>
            </Fragment>
        );
    }
}

export default ContactElement;
```

## Author

- 강인성([tails5555](https://github.com/tails5555))