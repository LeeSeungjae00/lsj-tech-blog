---
title: 'React 18'
date: '2023-01-16'
---

## React 18 간단 정리

### Automatic Batching

```
useTimeout(() => {
    setCount(c => c + 1)
    setFlag(f => !f)
}
```

일경우 렌더를 2번함

하지만 react 18 부터 timeout 이나 promise 안에 있는 set은 2가지를 업데이트 해도 1번만 rerender 한다.

### Transition
