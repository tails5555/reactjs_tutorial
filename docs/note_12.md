# Promise And Asynchronous

JavaScript 에서는 비동기 이벤트에 대한 실행이 많아지기 때문에 함수형 프로그래밍과 비동기 프로그래밍을 모르면 따라잡기 힘듭니다.

기존에 실행 했던 동기 프로그래밍에서는 아래와 같은 메카니즘으로 실행이 되었습니다.

```javascript
obj1.func(); // 이것이 실행되고 난 후에야
obj2.func(); // 비로소 이 함수가 실행됩니다.
```

그렇지만 지난 스터디 노트에서 다뤘던 AJAX 에서 동기 프로그래밍을 이용한 습관을 들이면 안 됩니다.

이번 스터디 노트에서는 비동기 프로그래밍에서 주로 사용되는 Promise 개념에 대해서 알아보겠습니다.

## Promise

예를 들어 힙합 뮤지션 프로필을 불러오는 API 랑 뮤지션이 부른 대표곡을 불러오는 API 를 AJAX 에서 사용한다고 가정 하겠습니다.

여기서 래퍼 '스윙스' 에 대한 정보를 불러오는데, 갑자기 뮤지션 프로필 API 서버에서 갑자기 화제가 된 래퍼인 '키드밀리' 에 대한 정보를 조회하는 사람이 많아져서 캐시에 대한 문제가 발생했다고 가정을 하겠습니다. 

그러면 뮤지선 대표곡 정보도 동시에 불러 와야 되는데 래퍼 '스윙스' 에 대한 정보를 못 불러오면 이는 실행이 되지 않고 계속 기다려야 합니다. 

AJAX 를 동기 프로그래밍 방식으로 접근하면 이러한 마비가 생기게 됩니다.

그래서 동기 프로그래밍 방식에 대한 실패 여부를 어딘가에 기록하고 다음 API 에게 요청을 해야 하는데 이 개념이 바로 `Promise` 입니다.

`Promise` 는 비동기 프로그래밍을 위해 사용되는 주체인데, 소스 코드가 실행이 되는 도중에 성공을 하든 실패를 하든 계속 작업을 이뤄 나가게끔 도와줍니다.

## Benefits Of Promise

1. 비동기 요청들에 대한 스케쥴링 조율을 도와줍니다.

`Promise` 의 장점은 다른 작업에 대해서 스케쥴링을 하는데 큰 기여를 합니다. 

예를 들어 Node.js 에서 Non-Blocking 방식으로(한 칸만 있는 공중화장실 같이 네트워크가 점유하면 그 네트워크에게만 제공하는 개념) Server Side Application 을 구성합니다.

그렇지만 서로 다른 데이터베이스 리소스에 접근해야 한다면 각 데이터베이스 정보를 일일히 가져오길 기다리는 것이 아니라 비동기 프로그래밍 방식으로 실행하고, 요청 완료에 대하여 스케쥴링 과정을 거쳐 클라이언트 측에게 서비스를 제공하게 됩니다.

2. 비동기 이벤트에 대한 시나리오를 잡아줍니다.

여기서 의미하는 시나리오는 우리가 실생활에서 사용하는 그 뜻 맞습니다.

예를 들어 AOMG 콘서트를 예매해야 한다고 가정하겠습니다.

처음에 친구가 소개해준 사이트 A로 예매하면 30프로 할인해주고 포인트도 빵빵하게 제공하는데 대신에 서버가 터지는 건 책임 못 진다고 합니다.

그러나 사이트 B로 예매하면 할인 기능도 없고 포인트도 그렇게 많이 안 주는데 대신에 서버가 터지면 백프로 보상을 합니다.

그래도 나는 AOMG 콘서트를 가야 되니깐 예매를 해야 하는데 예매 성공을 위해서 안전성을 보장해야 할지, 돈이 없어서 저렴한 사이트에서 예매 실패를 감안해서라도 진행을 할지로 나뉘게 됩니다. 

이러한 예시가 Promise 의 원리와 똑같습니다. 여기서 나는 AOMG 콘서트 예매를 성공하는가 실패하는가를 따지듯이, Promise 에서는 비동기 프로그래밍에 대한 이벤트에 따라 진행 방향을 제어할 수 있습니다.

## Examples Of Promise

`Promise` 의 상태는 3가지로 나뉘는데, 대기(Pending), 이행(Fulfilled), 오류(Rejected) 로 나뉩니다.

여기서는 AJAX 를 이용한 Promise 의 예를 살펴 보겠습니다.

예를 들어 http://127.0.0.1:0000/hiphop/profile?musician=스윙스 URL 를 이용한 AJAX 요청을 진행 하겠습니다.

```javascript
fetch('http://127.0.0.1:0000/hiphop/profile?musician=스윙스')
    .then(response => response.json()) // 1
    .then(json => console.log(json)) // 2
    .catch(err => console.log(err)); // 3
```

RESTful API 에 대한 요청은 JSON 데이터로 이뤄집니다. 그래서 URL 요청에 대한 응답 객체에선 응답 Status 가 200 인 경우에 Body 데이터를 JSON 으로 바꿔주는 과정을 1번에서 거칩니다.

그리고 가공 받은 JSON 데이터를 2번에서 출력합니다. 여기서는 JSON 데이터에 대한 결과 값을 출력하는 것입니다.

그러면 3번 문장의 의미는 무엇일까요? 여기서는 URL 요청에 대한 응답 Status 가 400번, 500번 대인 경우(즉, 응답을 하기 위해 오류가 발생한 경우) 이거나 `then` 문에서 데이터 참조에 대하여 얼타서 오류가 발생하는 경우 등등 갑작스런 예외 처리가 필요할 때 실행됩니다.

여기서 알 수 있듯이 `then` 함수는 요청에 대한 결과를 위한 데이터 역직렬화 과정처럼 **실행 성공시 진행해야 하는 과정의 시나리오**를 처리하고, `catch` 함수는 요청에 대한 실패 과정처럼 **실행 중 갑툭튀한 예외 과정에 대한 시나리오**를 처리합니다.

## Post Script

참고로 Promise 는 자바스크립트 기존 버전에도 있었지만, ES6 버전에서는 Arrow Function 을 이용해서 더욱 간결하게 구성합니다.

그렇지만 Arrow Function 을 사용하더라도 콜백 함수를 계속 무작위로 작성하면 장황한 소스 코드가 나와서 무슨 내용인지 이해하기 어려울 수도 있습니다.

그래서 Promise 에 대한 처리를 도와주는 `async`, `await` 키워드가 있는데 이는 다음 스터디 노트에서 계속 다루겠습니다.

## Author

- 강인성([tails5555](https://github.com/tails5555))