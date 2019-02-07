# `async` & `await`

JavaScript ES7 버전 부터 새로 추가된 키워드 입니다. 

지난 스터디 노트에서 다뤘던 `Promise` 에서 `then(() => {})` 함수와 `catch(() => {})` 함수를 다루는 방법을 익혔습니다.

각 함수 내부에 쓰인 콜백 함수의 의미는 비동기 이벤트(AJAX, 타이머 함수 등) 에 대한 시나리오 과정을 거치고 이를 세 가지 상태(대기, 이행, 오류) 에 따라 실행 되는 분기점을 구분하여 실행하는 것입니다.

그렇지만 이 함수들 안에 Arrow Function, 콜백 함수 등을 많이 사용하면 코드에 대한 인식성이 떨어집니다.

또한 콜백 함수에 대한 함수 접근 과정이 많아질수록 유지보수가 힘들어 집니다. 이러한 경우를 Callback Hell 이라고 부릅니다.

Callback Hell 를 최소화 하기 위한 과정에서는 `async`, `await` 키워드를 알아둬야 합니다. 

그렇다고 `then()`, `catch()` 함수 등의 이용 빈도가 줄어든다는 뜻은 아닙니다. 

이 안에서 사용 되는 콜백 함수의 사용 빈도를 줄이는 것이 중요하다는 뜻입니다.

## Examples Of AJAX Event At React Component

예를 들어 컴포넌트 자체가 브라우저 안에 렌더링이 된 이후 AJAX 요청을 통하여 래퍼 목록을 가져오기 위한 함수를 작성하겠습니다.

AJAX 요청, 타이머 등록 등의 작업은 대부분 `componentDidMount()` 에서 실행합니다.

참고로 `componentWillMount()` 함수는 다음 버전(v17) 에서 파기되고, 요즘은 잘 안 사용합니다.

```jsx
componentDidMount() {
    fetch('http://127.0.0.1:8000/api/rappers')
        .then(response => response.json())
        .then(json => {
            this.setState({
                rappers : json.data
            });
        })
        .catch(error => console.log(error));
}
```

컴포넌트의 `state` 에 래퍼 목록을 가져오는 함수인데, `then` 함수에 대한 꼬리 물기가 많아지면 콜백 헬(Callback Hell) 이 발생합니다.

그리고 `componentDidMount()` 함수가 됐든 다른 생명주기 함수가 됐든, 실행 되는 함수의 분량을 최소화하는 습관을 들여야 됩니다.

굳이 `componentDidMount()` 에서 API 호출, JSON 변환, 에러 처리 등을 전부 다 하면 함수 이름에 어긋나고 코드에 대한 가식성이 떨어집니다. 

~~그럴거면 이름을 `componentDidAllJobs()` 이렇게 지었지...~~

가식성을 향상하기 위해 각 함수 안에서 일어나는 일들을 단위 별로 나뉘어 분리해야 합니다. 순수 React.js 에서는 컴포넌트 메소드로 대체하지만, 중-대규모 프로젝트에서 수많은 비동기 이벤트들을 한 곳에 모아서 역할 분담을 확인하기 위한 라이브러리를 사용하는 것이 좋습니다.(ex> Redux-Thunk, Redux-Saga, MobX)

그래서 `componentDidMount()` 함수에 대한 역할 분담을 API 호출 과 `state` 설정 두 방법으로 나누겠습니다.

```jsx
componentDidMount() {
    this._getRappers();
}

_getRappers = async () => {
    const rapperList = await this._callApi(); // 1
    this.setState({
        rappers : rapperList
    }); // 2
}

_callApi = () => {
    fetch('http://127.0.0.1:8000/api/rappers')
        .then(response => response.json())
        .then(json => json.data) // *
        .catch(error => console.log(error));
}
```

그러면 `componentDidMount()` 함수에서는 `this._getRappers()` 함수를 실행하는데 이를 비동기 함수(Asynchronous Function) 라 합니다. 

여기서 `this._callApi()` 함수를 실행하게 되는데 이 함수가 끝날 때 까지 2번 문장을 아예 실행하지 않습니다. 그리고 `this._callApi()` 함수의 결과가 어떻든 간에 상관 없이 아래 문장을 작동하지 않습니다.

참고로 `_callApi()` 함수에서 반환 되는 값이 없어 보이는데, * 표 친 곳에서 반환이 이뤄집니다. 

Arrow Function 에서 `value => value.a` 의 의미는 `value` 객체에서 `a` 의 프로퍼티에 해당 되는 값에 대해 반환 하겠다는 맥락과 같습니다. 

Arrow Function 의 사용 빈도는 갈수록 많아져서 이번 기회에 람다식(Lambda Expression) 을 익혀두시길 바랍니다.

## Property Shortends

이것은 번외 설명인데 위에서 작성한 함수 중 `_getRappers()` 함수에서 `rapperList` 변수가 아니라 `rappers` 변수로 작성한다고 가정하겠습니다.

```jsx
_getRappers = async () => {
    const rappers = await this._callApi();
    /*
     *  Before ES6
     *  this.setState({
     *      rappers : rappers
     *  });
     */
    this.setState({ rappers });
}
```

프로퍼티 변수 이름을 동시에 2개씩 사용한다면 굳이 2개를 사용해야 하나 라는 생각이 들 것입니다. 

이러한 번거로움을 줄이기 위해 ES6 버전 이후에선 Property Shortends 기능을 사용할 수 있습니다. 

이는 같은 프로퍼티의 데이터가 가공 되면 그 이후에 프로퍼티에 대하여 `assign()` 함수 및 `setState()` 함수 에서 새로운 값을 덮어 쓸 때 애용 됩니다.

추가로 `const` 변수는 데이터의 값을 변경할 순 없지만, 객체에 대한 프로퍼티 별 값은 변경할 수 있습니다. 객체의 값을 변경하지 못하게 막기 위하여 `Object.freeze()` 함수를 이용해야 되겠습니다.

## Thinking About Keys

다수의 컴포넌트에 대하여 렌더링할 때 사용되는 `key` 의 값을 어떤 것으로 사용하는 것이 좋을까?

컴포넌트의 `key` 값은 `map()` 함수에서 따온 `index` 값을 사용하지 않는 편이 좋습니다.

그래서 각 객체에 따른 컴포넌트에 대한 리-렌더링 반영을 위하여 객체에 대한 `id` 값을 사용하는 것을 더욱 좋은 방법입니다.

이에 대한 이슈는 다음에 더 알아 보겠습니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))