# Hotel Job - Frontend

> 채용 플랫폼 | Next.js 기반 프론트엔드  
> **운영 중**: [https://www.hotel-job-connect.com](https://www.hotel-job-connect.com)  

<br>

## Related Repositories

- [Hotel Job - Backend](https://github.com/K-Soo/hotel-job-api)

<br>


## Project Overview

**Hotel Job**은 숙박업계 종사자(구직자)와 채용 기업을 연결하는 채용 플랫폼입니다.  
개인 사용자를 위한 **B2C 서비스**와, 기업 사용자를 위한 **B2B 서비스**를 모두 제공합니다.

<br>

## Features

- 채용 공고 열람 및 지원 기능
- 구직자 ↔ 채용자 간 메시지 기능
  (Socket.IO 기반 인앱 알림 수신, Push 알림 수신)
- 반응형 UI
  - 구직자 전용 화면은 모바일 중심 반응형 UI 제공
  - 사업자(채용자) 전용 화면은 데스크탑 환경에 최적화
- JWT 기반 인증 (HTTP Only Cookie 방식)
- KCP 휴대폰 본인 인증
- 구직자 이력서 작성 및 관리
- 채용자 구인 공고 등록 및 관리
- 유료 채용 공고 결제 연동 (Toss Payments)
- PWA 지원
  - 앱 설치 후 푸시 알림 지원

<br>

## Tech Stack

| 분류                 | 기술 / 설명                                        |
| -------------------- | -------------------------------------------------- |
| **Framework**        | Next.js (Page Router v14)                          |
| **State Management** | Recoil, Zustand, React Query                       |
| **Form**             | React Hook Form + Yup                              |
| **Styling**          | TailwindCSS, Styled Components                     |
| **Animation**        | Framer Motion                                      |
| **WebSocket**        | Socket.IO                                          |
| **Auth**             | JWT (Access + Refresh 토큰, HTTP Only Cookie 기반) |
| **PWA**              | next-pwa                                           |
| **Monitoring**       | Sentry                                             |
| **SEO**              | next-seo , next-sitemap                            |

<br>





## Versioning

→ [CHANGELOG.md](./CHANGELOG.md)

<br>

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.  
You may use, modify, and share this code for **non-commercial purposes only**.  
For more details, refer to the [LICENSE](./LICENSE) file.
