# 맛이슈 (MatIssue) : "맛있는 레시피를 제공 및 공유하는 플랫폼"

## <데모 사이트>

[![logo_2.svg](/uploads/f7162a12b83fe9d781efb64f4dfa9694/logo_2.svg)](https://www.matissue.com)
<br/>
**_<div align="center">로고 클릭 시 맛이슈 홈페이지로 이동합니다.</div>_**

## <프로젝트 주제>
![맛이슈란_](/uploads/f880fe06a1508d3cbc47ebbea85e8e87/맛이슈란_.png)
![페르소나](/uploads/9cf5a80ca64a541e2c95f4dfc434ce1c/페르소나.png)
<br/>
- 목적 : 오늘 뭐 먹지? 고민하는 주부, 자취생 및 요리를 좋아하는 모든 사람들을 위한 레시피를 공유하고 소통할 수 있는 플랫폼을 구축 합니다.
- 목표 :
    - 사용자에게 보다 편리한 사용성을 제공하기 위한 UX/UI를 제공합니다.
    - 모바일 사용자를 위한 반응형 페이지를 제공합니다.
    - 기존 레시피 공유 사이트의 노후화된 레시피 정보를 최신화 하고, 깔끔하게 재구성 합니다.
    - CSR과 SSR을 모두 사용한 최적화된 로딩 방식을 통해 사용자에게 더욱 빠른 인터렉션을 제공합니다.
<br />

## <서비스 소개 및 핵심 기능>

#### 레시피 작성 및 수정, 게시물 스크랩 등 레시피 공유 플랫폼의 핵심 서비스를 구현합니다.

1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD**
2. 회원가입 및 회원정보 수정시 **회원인증 이메일 발송 기능** 제공
3. **마이페이지** 에서 사용자는 자신이 업로드한 레시피를 마이페이지에서 확인 조회, 삭제. 회원정보수정 페이지에서 비밀번호, 닉네임, 프로필 사진 사용자 정보 CRUD. 사용자는 스크랩한 레시피를 확인하고 메모를 수정 가능
4. **레시피 작성**, **레시피 수정**, **레시피 조회** 및, **레시피 상세 정보 조회** 등 **기본적인 게시물 관련 CRUD**
5. **레시피 통합 검색 (제목, 재료, 내용 등)**, **카테고리 별 레시피 조회** 가능
6. **레시피 스크랩 기능** 제공, 스크랩의 경우 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (local strorage)
7. 댓글 작성, 수정 및 삭제 등 **댓글 관련 CRUD**
8. **게시글 및 댓글 좋아요** 기능 제공
9. **관리자 관련 CRUD**
10. MBTI, 레시피 이상형 월드컵과 같은 **오락적인 요소** 제공
11. 모바일 사용자를 위한 **반응형 페이지** 제공

## <👪 구성원 역할>

| 이름 | 담당 업무 |
| :--: | :------: |
| ⭐️신유빈⭐️ | BE (👑팀장) |
| ⭐️송호준⭐️ | BE (👑백엔드 팀장)|
| ⭐️장윤수⭐️ | FE (👑프론트 팀장)|
| ⭐️이수현⭐️ | FE |
| ⭐️이나현⭐️ | FE |
| ⭐️김동균⭐️ | FE |
| ⭐️임정훈⭐️ | FE |

#### Front-End

- 장윤수
  - 메인페이지, 헤더 푸터 레이아웃, 로그인 페이지, 회원가입 페이지, 아이디 비밀번호찾기 페이지, 관리자 페이지 
- 이수현
  - 어마어마 하게 많은 일
- 이나현
  - 마이페이지 (유저프로필, 레시피 조회/삭제, 회원정보수정(프로필사진 업로드/ 비밀번호 변경 / 회원탈퇴), 모달창)
- 김동균
  - 레시피 등록 페이지, 레시피 수정 페이지, 레시피 이상형 월드컵 게임 (웹 및 모바일) 구현, 맛이슈 홍보 영상 제작
- 임정훈
  - 게시물 검색 페이지 (웹 및 모바일) 구현
  - (레시피 썸네일 컴포넌트, FilterBar 및 Tag, 정렬 버튼, 페이지네이션, 무한스크롤, 관련 API 연결, MBTI, Kakao API를 이용한 공유 기능)

#### Back-End

- 신유빈
  - 어마어마 하게 많은 일
- 송호준
  - 어마어마 하게 많은 일

## <기술 스택>
![기술스택.svg](/uploads/03484eb7ff839fd314d11bc2f85de74e/기술스택.svg)

## <API 문서>
[ERD](https://www.erdcloud.com/d/AW9MEiXv4g2T9mJHx)
<br/>
<br/>
[Swagger](https://matissue-1jim.onrender.com/docs)
<br/>
<br/>
[Redoc](https://matissue-1jim.onrender.com/redoc)

## <팀 컨벤션>

#### 커밋 컨벤션
- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Docs`: 문서 변경
- `Design`: CSS 등 사용자 UI 디자인 변경
- `Style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `Refactor`: 코드 리팩토링
- `Test`: 테스트 코드 추가, 리팩토링 테스트 코드 추가
- `Chore`: 빌드 작업, 패키지 매니저 수정
- `Comment`: 필요한 주석 추가 및 변경
- `Rename`: 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
- `Remove`: 파일을 삭제하는 작업만 수행한 경우
- `!BREAKING CHANGE`: 커다란 API 변경의 경우
- `!HOTFIX`: 급하게 치명적인 버그를 고쳐야 하는 경우
- Ex) Feat : 메인페이지 무한스크롤 기능 구현

#### 디렉토리 및 파일 컨벤션
- **디렉토리 명** : **kebab-case**
- app **폴더 내 라우팅 디렉토리명** : **kebab-case**
    - `// app/login/page.tsx , app/new-recipe/page.tsx`
- **컴포넌트 파일명** : **PascalCase**로 작성
    - `// LoginForm.tsx`
- **일반 파일명** : **kebab-case**로 작성
    - `// auth-context.ts || auth-api.ts`

#### 함수 및 변수 컨벤션
- **컴포넌트** : **함수형**으로 작성
- **컴포넌트 함수명** : **PascalCase**로 작성
    - `// const Login  =  ( ) => { }`
- **일반 함수, 변수명** : **camelCase**로 작성
    - `// const titleChangeHandler = ( e ) => { }`
- **file-scope 함수명** : **UPPER_CASE**로 작성
    - `// DUMMY_DATA = []`
- **Boolean 타입의 변수명** : **is,has,can** 같은 접두사를 붙임
    - `// const [ isLoggedIn , setIsLoggedIn ]  =  useState( false )`
- **핸들러 함수명** : 핸들링하는 **명사 + 동사 + 핸들러** 형태로 작성
    - `// const title + Change + Handler = ( e ) => { }`

#### TypeScript 컨벤션
- Type은 **type alias**로 통일 (interface X)
- Type, enum은 **PascalCase**로 작성
    - `// type LayoutType = { children : React.ReactNode }`
- **any** 타입 웬만하면 사용 금지
- **React.FC** 생략

#### 컴포넌트 내 코드 작성 구조
```tsx
import { useEffect, useState, useRef } from "react";
import route from "next/navigate"

// file-scope constant
const ONE = 1;
const MY_NAME = "YOONSU";

const Page = (props) => {
	const { a, b, c } = props

  // state
  const [state, setState] = useState();

	// constant
	const route = useRoute();
	const ref = useRef();

  // handler
  const buttonClickHandler = () => {
    console.log("click");
  };

  // useEffect
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return <></>;
};
export default Page;
```
## <Git Branch 관리>

```
master
├── dev-fe
│   ├── feature/user
│   │   │feature/postList
│   │   │ feature/main
│   │   │ feature/ViewPage
│___│___└── feature/my-page
```
feature/(기능명)으로 개인 작업 브랜치 생성, 기능구현 후 dev에 PR

## <협업 툴>

- Figma : 초반 기획시 빠른 레이아웃을 잡기 위해 사용
- Notion : 팀 페이지, 스크럼 정리, 문서 정리
- Discord : 팀원간 커뮤니케이션
- Gather : 팀원간 커뮤니케이션 및 온라인 스크럼 진행
- Gitlab : Code Repository
- Gitlab Issue : Trouble Shooting 내역 기제
- Swagger : API 테스트 진행

## <스크럼>

- 매일 오전 10시 스크럼 진행 (게더타운을 활용한 온라인 스크럼)
- 프론트, 백의 개발 진행상황 및 이슈 공유

## <팀 페이지>
[Nothion](https://www.notion.so/elice/10-67e5d91b15e7404cbfe47c3ff0c40a33)
<br/>
<br/>
[Figma](https://www.figma.com/file/1T0YMmCs1tyNQ3ud32OELi?embed_host=notion&kind=&node-id=0-1&t=kZbDFgIjnFHXUPtm-0&type=design&viewer=1)
<br/>
<br/>
[Gather](https://app.gather.town/app/KsD8E36KLhbcxc03/EliceProject)

## <배포>

#### Front-End
- pm2를 이용한 서버 오픈 및 nginx를 활용한 배포

## <서버 실행 방법>
#### Front-End
```bash
git clone {.....repository_name}.git
cd {repository_name}
npm install
npm run dev
```

## <.env 설정>
#### Front-End
```
NEXT_PUBLIC_KAKAO_API_KEY={OUR_KAKAO_KEY}
NEXT_PUBLIC_AWS_ACCESS_KEY_ID={AWS_KEY}
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY={AWS_ACCESS_KEY}
NEXT_PUBLIC_AWS_BUCKET_NAME={AWS_NAME}
```
## <꿇어라, 그게 맛이슈와 너의 눈높이다.>
![토끼들.svg](/uploads/d8ecc12258f7d831d1b56dcad080a3be/토끼들.svg)


