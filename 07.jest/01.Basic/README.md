## Jest: Designed JavaScript testing framework

Jest 홈페이지에 나와있는 대목중

> Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase

“Jest는 모든 JavaScript 코드베이스의 정확성을 보장하도록 설계된 JavaScript 테스트 프레임워크입니다.”라고 명시되어있다. Jest는 라이브러리가 아닌 프레임워크라고 명시한 이유가 무엇일까?

Jest는 기존 테스팅 라이브러리와 차이점이 존재한다.

이전까지 JS 테스팅 라이브러리로 제시된 Mocha, Jasmine는 Test Runner로 사용되었고 거기에 조합되는 Test Matcher용으로 Chai 나 Expect등은 따로 필요했었다.

또한 Mocking을 위해서는 Sinon과 Testdouble과 같은 Test Mock 라이브러리도 필요했었다.

이러한 자유도는 장점도 있지만 무질서로 인한 개발자의 혼란을 야기하기도 한다.

그런 부분에서 Jest는 Test Runner, Test Matcher, Test Mock 까지 제공해주기때문에 하나의 프레임워크라고 얘기할 수 있다.

## Frequency Matchers

빈번히 사용되는 검증용 Matcher 메소드를 알아보자.

### .toEqual(value) / .toBe(value)

두 메소드는 동등비교를 검증하는 용도로 사용된다.

한가지 차이점이 있다면 객체 비교이다.

`.toEqual`은 객체의 모든 속성들을 재귀적으로 비교한다. (deep 동등성이라고 불리는)

하지만 `.toBe` 는 객체 속성들을 비교하지 못하기 때문에 아래와 같은 테스트 케이스가 작성이 된다.

```tsx
const persion1 = {
  name: 'haru',
  age: 28,
};
const persion2 = {
  name: 'haru',
  age: 28,
};

describe('test', () => {
  test('모든 속성들이 동일함을 가진다.', () => {
    expect(persion1).toEqual(persion2);
  });
  test('정확히 같은 객체가 아니다.', () => {
    expect(persion1).not.toBe(persion2);
  });
});
```

하나 더 나아가서 `.toStrictEqual` 메소드가 있으며 `.toEqual`가 아래와 같은 차이점을 보인다.

- `undefined` 값을 가진 속성을 확인한다.
  - 예를 들어 `expect({ a: undefined, b: 2 }).toStrictEqual({ b: 2 })` 는 테스트에서 실패한다.
- 개체의 유형을 확인하여 만약 클래스 인스턴스 객체와 리터럴 객체간의 비교를 동일하다고 판단하지 않는다.

    ```tsx
    class Persion {
      constructor(name) {
        this.name = name;
      }
    }
    
    describe('test', () => {
      test('.toEqual 과 .toStrictEqual의 차이점', () => {
        expect(new Persion('haru')).toEqual({name: 'haru'});
        expect(new Persion('haru')).not.toStrictEqual({name: 'haru'});
      });
    });
    ```


### .toBeTruthy(), .toBeFalsy()

falsy 한 값 (false, null, 0, “”, undefined)등을 판별하는 메소드로서 많이 사용하곤 하지만 필자에 생각은 이 메소드는 boolean 타입을 검증하기위한 용도로 지양해야한다고 생각한다.

정확한 검증을 위해 `.toBeFalsy` 보다는 `.toBe(false)` 로 검증하는것이 정확한 타입 테스트까지의 검증법이기에 사용여부를 고려해야한다. 

### .toThrow

검증을 위해 실행함수의 예외 발생 여부를 테스트 하는 용도로 사용된다.

주의할 점은 검증 대상을 함수로 한번 wrapping 해줘야 된다. 여부 체크를 위함이기에 실행 코드가 호출되면 항상 테스트가 실패하게되는 결과를 반환되기때문에 함수로 감싸준 상태로 검증이 되어야 한다.

```tsx
it('test', () => {
  function getUser(id: number){
    if (id === -1) {
			throw new Error('error');
    }
		...
  }
	
	expect(getUser(-1)).toThrow('error') // (x)
	expect(() => getUser(-1)).toThrow('error') // (o)

})
```
