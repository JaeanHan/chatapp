# chatapp

## 세팅 : spring reactive web, mongoDB, spring WebFlux <br/>

#### Spring Reactive Web Project <br/>

기존 스프링은 요청이 올 때마다 스레드를 생성한다. => Context Switching (Time Slicing) -> 상대적으로 느리다 (백만배정도) <br/>

스프링 5.0은 비동기 서버 Netty를 사용한다. => Single Thread, taskQueue -> Context Switching이 없다

[비동기 서버 사용]

#### MongoDB <br/>

MariaDB(RDBMS) vs. MongoDB(NotOnlySQL)

RDBMS는 테이블간의 관계(foriegn key)를 통해 테이블을 join 시키니 중복되는 값은 저장하지 않았다.

MongoDB는 데이블이 아닌 컬렉션(JSON) 단위로 데이터를 저장했고 데이터가 중복이 되든 말든 그냥 저장했었다.

RDBMS의 장점 : 스키마로 인한 데이터의 무결성 보장 <br/>
MongoDB의 장점 : 조회 할 때 퍼포먼스가 좋다 + 비동기 데이터베이스

RDBMS 또한 R2DBC 라이브러리를 사용하면 비동기 지원가능하고 이때 Reactive R2DBC Repository를 사용해야함

[비동기 디비 사용]

### SSE 프로토콜 <br/>

http vs. sse
http는 요청에 응답이 되면 연결이 끊어진다. => stateless -> polling
websocket은 요청에 응답이 되도 클라이언트와 서버의 연결이 끊어지지 않는다. => stateful
sse는 요청에 응답이 되면 클라이언트의 연결만 끊어진다.

mime type : MediaType.TEXT_EVENT_STREAM_VALUE

### WebFlux <br/>
단일스레드, 비동기 + Stream을 통해 백프레셔가 적용된 데이터만큼 간혈적 응답이 가능하다.
- Publisher
- Subscriber
- Subscription

### Flux <br/>
Flux<?> : 데이터 계속 전달 <br/>
Mono<?> : 데이터 한 번만 전달 (기존 방식)

Flux를 사용하면 연결되있는 모든 resp에 데이터를 흘려보냄 (url이 같을 시)
#### @Tailable

디비에서 데이터를 반환 할 때 데이터 반환 후 디비 커서가 종료되는데 해당 어노테이션을 달아주면 쿼리 수행 후에도 종료x
이거 쓸 때는 디비 버퍼 사이즈를 키워 줘야한다.
Repository 또는 DAO에 달아준다.

데이터가 컨트롤러로 계속 흘러들어옴 (Tailable)
컨트롤러는 흘러 들어온 데이터를 계속 응답함 (Flux)

## reference
메타코딩
https://www.youtube.com/watch?v=Oo_eHCr_HsQ&t=7s
