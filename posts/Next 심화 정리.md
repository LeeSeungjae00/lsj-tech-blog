---
title: 'Next 심화 정리'
date: '2023-01-27'
---

## 컴파일러

언어를 다른 언어로 변환해 주는 도구

## Babel / Terser

Transpiler / Minifier (mangle & compress)

## SWC

Next.js 에서는 Rust 기반인 SWC 를 통해서 Transpiler / Minifier (mangle & compress) 하기 떄문에 빠름

## Previwe Mode

쿠키를 발급 받고 previce Mode 를 통해 쿠키를 발급 받은 대상은 화면이 다르게 보이는 기능 getStaticProps 를 request time

## Dynamic Import

Lazy Load로 초기 청크 사이즈를 줄일 수 있다. 많은 웹 성능 측정은 초기 렌더링을 많이 보는데 초기 랜더링 시간을 줄일 수 있게 됨

## suspense

를 활용해서 Dynamic Import 를 사용할 수 있음

## Automatic Static Optimize

알아서 정적파일과 동적파일을 구분하여 build 하면 js 와 html 을 구분해서 나오게 됨 getServerSideProps 나 getinitialProps 가 있을 경우 동적 파일로 나옴

## Static HTML Export

의도적으로 모든 정적 파일로 export 사용 가능 하지만 Next 의 node 단에서 사용할 수 있는 ex) Image 기능 같은 것을 사용 할 수 없음

## Absolute Import

Module Path aliases 를 통해 `import from '@~~' ` 다음과 같이 사용

## Custom App

모든 페이지에 들어가는 layout 이나 페이지에 전달하고 싶은 상태들을 전달 할 수 있음 ex) 처음 접속 했던 시간

## Custom Document

서버에서 실행되는 모든 페이지에 공통인 영역을 사용 할 수 있음, App 보단 static 한 내용들이 들어가있음 ex) head

## Custom Error Page

Error 코드 별로 원하는 error page 노출 할 수 있다
