# Test-Driven-Development
테스트 주도 개발 시작하기 

## 프로젝트 준비단계
- Terminal
```
yarn add --dev @types/jest jest ts-jest typescript
```
```
tsc --init
```
- Package.json
```
{
    ...
    "jest": {
    "globals": {
      "ts-jest": {
        "isolatedModules": true
      }
    },
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": ".*.(spec|test).ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    }
    }
}
```
