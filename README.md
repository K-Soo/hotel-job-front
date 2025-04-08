# Hotel Job - Frontend

> 채용 플랫폼 | Next.js 기반 프론트엔드  
> **운영 중**: [https://www.hotel-job-connect.com](https://www.hotel-job-connect.com)  
> **개발 환경**: [https://dev.hotel-job-connect.com](https://dev.hotel-job-connect.com)  
> **개발 기간**: 2024년 12월 ~ 현재

<br>

## Project Overview

**Hotel Job**은 숙박업계 종사자(구직자)와 채용 기업을 연결하는 채용 플랫폼입니다.  
개인 사용자를 위한 **B2C 서비스**와, 기업 사용자를 위한 **B2B 서비스**를 모두 제공합니다.  

<br>

## Features

- 채용 공고 열람 및 지원 기능  
- 구직자 ↔ 채용자 간 메시지 기능  
  (채용자는 REST API로 메시지를 전송하고, 구직자는 Socket.IO 기반 인앱 알림 수신)  
- 반응형 UI  
  - 구직자 전용 화면은 모바일 중심 반응형 UI 제공  
  - 사업자(채용자) 전용 화면은 데스크탑 환경에 최적화
- JWT 기반 인증 (HTTP Only Cookie 방식)  
- 휴대폰 본인 인증 (SMS 인증 연동)  
- 구직자 이력서 작성 및 관리  
- 채용자 구인 공고 등록 및 관리  
- 유료 채용 공고 결제 연동 (Toss Payments)  
- PWA 지원  
  - 오프라인 환경 동작  
  - 앱 설치 후 푸시 알림 지원

<br>

## Tech Stack

| 분류 | 기술 |
|------|------|
| Framework | [Next.js](https://nextjs.org/) |
| State Management | [Recoil](https://recoiljs.org/), [React Query](https://tanstack.com/query/v5) |
| Form | [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup) |
| Styling | TailwindCSS, Styled Components |
| Animation | Framer Motion |
| WebSocket | Socket.IO |
| Auth | JWT (HTTP Only Cookie 기반) |
| PWA | next-pwa 적용 |

<br>


## Versioning

이 프로젝트는 `standard-version`으로 버전을 관리합니다.  

배포 시점마다 CHANGELOG를 함께 업데이트하며,  
상세한 변경 이력은 아래 파일에서 확인할 수 있습니다.

→ [CHANGELOG.md](./CHANGELOG.md)

<br>

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.  
You may use, modify, and share this code for **non-commercial purposes only**.  
For more details, refer to the [LICENSE](./LICENSE) file.

