---
title: 'Next.js배우면서 습득한 지식 여러가지'
date: '2020-01-02'
---

이 글은 Next.js 의 코어한 기능들과 기본 기능들에 집중하지 않고 주변의 팁이나 기록해두면 좋은 점을 기록하는 글입니다. Next.js 뿐만 아니라 프론트엔드 개발 할 때에 유용한 라이브러리 들이나 팁들도 기록할 예정이다

## Next.js 검색엔진 효율 늘리기

1. next-sitemap 을 사용한다. `yran add -D next-sitemap`
2. `robots.txt` 작성을 한다.
3. metadata를 작성한다.
4. 시멘틱 테그를 사용한다.
5. 오픈 그래프를 컨텐츠 안에 넣어둔다. with facebook
6. meta 테그에 og 를 사용한다.
7. metatag는 ssr이나 ssg 로 이루어져 있어 봇이 읽어 갈 수 있어야 하는 상태여야 한다.

## 에디터 만들 때 좋은 라이브러리

1. Draft.js
2. react-draft-wysiwyg (what you see is what you get)
3. slate.js
4. tiptap.js

## Next Image 를 사용할 때 placeholder 를 사용하여 유저 경험을 늘릴 수 있음

```
<Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ''}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0dPesBwADFAFamsrLhQAAAABJRU5ErkJggg=="
></Image>
```

## 무한 스크롤을 했을 떄 컴포넌트가 너무 많아지면 화면이 느려지는 현상 발생

해당 방법 Virtual Scroll을 활용할 수있습니다. n개의 컴포넌트만 draw 이 요소를 재활용 할 수 있게 해준다.

- 한 화면에 다룰 수 있는 컴포넌트의 갯수를 제한한다
- 대표적인 라이브러리로는 react-virtualized와 react-window 가 있습니다.
- FCP와 LCP에 많은 도움

## 이미지를 가져오는 url 에서 CORS 가 나온다면 next.config 를 수정하자

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
```

## input 을 통해 실시간으로 검색하는 기능은 debounce 를 사용하여 한다

- useDebounce

  ```
  import { useEffect, useState } from 'react';

  const useDebounce = <T = any>(value: T, delay = 600) => {
    const [debouncedValue, setDebounceValue] = useState<T>(() => value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceValue(value);
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  export default useDebounce;
  ```
