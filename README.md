## 💬 프로젝트 소개

> 개발 기간 : 2025. 03. 21 ~ 2025. 03. 27 (총 7일)
>
> <br><br> > **어려운 도전을 함께하고, 서로를 격려하며, 성공을 나누는 플랫폼: Do-Gather** > <br> > <br> 자신만의 챌린지를 만들고, 같은 목표를 가진 사람들과 함께 도전하는 **습관 형성 챌린지 플랫폼**입니다.
> <br> 챌린지 인증을 통해 진행 상황을 기록하고, 다른 사람들의 챌린지 완료 소식도 로그를 통해 실시간으로 확인할 수 있습니다.
> <br> PC와 모바일 환경 모두에 최적화된 반응형 UI를 제공하여 어디서든 편리하게 이용할 수 있습니다.

<br/>

## 👩‍👩‍👧‍👧 프로젝트 멤버 소개

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/woohyuckk">
        <img src="https://github.com/woohyuckk.png" width="80" alt="woohyuckk"/>
        <br />
        <sub><b>woohyuckk</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        로그인 회원가입 페이지 구현 <br>
        병렬 라우팅 및 인터셉팅 라우팅 <br>
        을 통한 로그인/회원가입 구현
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/arendt9797">
        <img src="https://github.com/arendt9797.png" width="80"  alt="arendt9797"/>
        <br />
        <sub><b>arendt9797</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        챌린지 목록 페이지 구현 <br>
        조건 및 검색 필터링 및 정렬을 적용한 챌린지 목록 구현 <br>
        Dropdown, ChallengeCard 등 공통컴포넌트 구현
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/ye21iin">
        <img src="https://github.com/ye21iin.png" width="80" alt="ye21iin"/>
        <br />
        <sub><b>ye21iin</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        마이페이지 구현 <br>
        프로필과 닉네임 수정 페이지 구현 <br>
        자신의 챌린지를 페이지네이션으로 구현
      </td>       
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/llddang">
        <img src="https://github.com/llddang.png" width="80" alt="llddang"/>
        <br />
        <sub><b>llddang</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        챌린지 상세 페이지 구현 <br>
        Supabase Realtime으로 챌린지 로그 실시간 표시<br> 
        카카오 SDK를 통한 카카오톡 공유 구현<br> 
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/izzienote">
        <img src="https://github.com/izzienote.png" width="80" alt="izzienote"/>
        <br />
        <sub><b>izzienote</b></sub>
        </a>
        <br />
      </td>   
      <td align="center">
        챌린지 목록 페이지 구현 <br>
        Carousel 을 통한 인기 챌린지 목록 표시 <br>
        Loading 컴포넌트 및 페이지 구현
      </td> 
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/verdantgreeny">
        <img src="https://github.com/verdantgreeny.png" width="80" alt="verdantgreeny"/>
        <br />
        <sub><b>verdantgreeny</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        챌린지 생성/수정 페이지 구현 <br>
        다양한 input태그를 활용하여 form 구성 <br>
        radio, checkbox, file, text, textarea
      </td>       
    </tr>
  </tbody>
</table>

<br/>

## ⚙ 프로젝트 기능 소개

- **Next.js 프레임워크**로 구성된 프로젝트입니다.
- **TanStack Query**를 사용하여 비동기 데이터 요청 및 캐싱 기능으로 서버 데이터를 효율적으로 관리합니다.
- **이메일 회원가입 및 로그인 기능**과 **구글/깃헙 기반 소셜 로그인**을 제공합니다.
- **회원 정보 유효성 검사**를 통해 정확한 데이터가 저장되도록 합니다.
- **Tailwind CSS**를 사용하여 반응형 UI를 적용합니다.
- **middleware**를 통해 비인가 사용자의 접근을 제한합니다.

<br/>

## 🔗 협업 프로세스

- ### [사용자 스토리보드 맵](https://www.figma.com/board/7ymwNIk20Iwmp5rtsA08cg/%EC%8A%B5%EA%B4%80-%ED%98%95%EC%84%B1-%EC%B1%8C%EB%A6%B0%EC%A7%80-%ED%94%8C%EB%9E%AB%ED%8F%BC-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B3%B4%EB%93%9C?node-id=0-1&p=f&t=ABwp4gh2vv14FHsN-0)
- ### [코드 컨벤션](https://github.com/do-gather-challenge/do-gather/wiki/%5B%ED%98%91%EC%97%85-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%5D-Code-Convention)
  - 프로젝트 구조 (도메인 기반 아키텍처(Domain-based Architecture))
  - 폴더/파일 네이밍 (네임스페이스 프리픽스(Namespace Prefix), 미들 네이밍 패턴)
  - 변수네이밍 규칙 (api 및 이벤트 핸들러의 접두사,접미사)
- ### [Pull Request 템플릿을 활용한 코드 리뷰](https://github.com/do-gather-challenge/do-gather/pull/30)

<br/>

## 🚀 트러블 슈팅

<br />

## 📑 페이지 구성

<table>
  <tbody>
    <tr>
      <td align="center" colspan="2">
        1. 메인 페이지
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <img src="" alt="메인 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        2. 챌린지 목록 페이지
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <img src="" alt="챌린지 목록 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        3. 챌린지 생성/수정 페이지
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <img src="" alt="챌린지 생성/수정 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        4. 챌린지 상세 페이지
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <img src="" alt="챌린지 상세 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        5-1. 로그인/회원가입 페이지 - Parallel
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="" alt="로그인 페이지 이미지" />
      </td>
      <td align="center">
        <img src="" alt="회원가입 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        5-2. 로그인/회원가입 페이지
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="" alt="로그인 페이지 이미지" />
      </td>
      <td align="center">
        <img src="" alt="회원가입 페이지 이미지" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        6. 마이 페이지
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="" alt="마이 프로필 수정 페이지 이미지" />
      </td>
      <td align="center">
        <img src="" alt="마이 챌린지 목록 페이지 이미지" />
      </td>
    </tr>
  </tbody>
</table>

<br/>

## 📁 프로젝트 구조

```markdown
📦 do-gather
├─ public
│  ├─ fonts
│  └─ images
└─ src
  ├─ app
  │  ├─ (auth)
  │  │  ├─ sign-in
  │  │  │  └─ page.tsx
  │  │  └─ sign-up
  │  │     └─ page.tsx
  │  ├─ (client)
  │  │  ├─ @auth
  │  │  │  ├─ (.)sign-in
  │  │  │  │  └─ page.tsx
  │  │  │  ├─ (.)sign-up
  │  │  │  │  └─ page.tsx
  │  │  │  └─ default.tsx
  │  │  ├─ challenges
  │  │  │  ├─ [id]
  │  │  │  │  └─ page.tsx
  │  │  │  ├─ page.tsx
  │  │  │  └─ post
  │  │  │     ├─ [id]
  │  │  │     │  └─ page.tsx
  │  │  │     └─ page.tsx
  │  │  ├─ default.tsx
  │  │  ├─ home
  │  │  │  └─ page.tsx
  │  │  ├─ layout.tsx
  │  │  └─ my-page
  │  │     └─ page.tsx
  │  ├─ api
  │  │  └─ auth
  │  │     └─ callback
  │  │        └─ route.ts
  │  ├─ globals.css
  │  ├─ layout.tsx
  │  ├─ loading.tsx
  │  └─ page.tsx
  ├─ components
  │  ├─ features
  │  │  ├─ auth
  │  │  ├─ challenges
  │  │  │  ├─ detail
  │  │  │  ├─ home
  │  │  │  └─ post
  │  │  └─ my-page
  │  ├─ layouts
  │  │  └─ header.tsx
  │  └─ ui
  ├─ constants
  ├─ lib
  │  ├─ api
  │  ├─ hooks
  │  ├─ providers
  │  ├─ queries
  │  ├─ supabase
  │  └─ utils
  ├─ middleware.ts
  └─ types
```

<br />

## 🧶 기술 스택

<div align="left">

### Environment

<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<br>

### Development

<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
<img src="https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">   
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&amp;logo=Tailwind CSS&amp;logoColor=white">

</div>
