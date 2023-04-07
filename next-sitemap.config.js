/* eslint-disable no-undef */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lsj-techblog.vercel.app/',
  generateRobotsTxt: true, // (optional)
  priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
  robotsTxtOptions: {
    // 정책 설정
    policies: [
      {
        userAgent: '*', // 모든 agent 허용
        allow: '/', // 모든 페이지 주소 크롤링 허용
      },
      // 추가 정책이 필요할 경우 배열 요소로 추가 작성
    ]
  }
  // ...other options
  // sourceDir: 'build'
}