# Yourssu Infrastructure System Client

유어슈의 개발자들이 쉽게 동방 온프렘을 이용하여 애플리케이션을 배포/관리할 수 있는 백오피스 서비스이에요.

<br />

## 개발 세팅

1. 레포지토리를 로컬에 클론해주세요.

    ```bash
    git clone https://github.com/yourssu/yis-client.git
    ```

<br />

2. 프로젝트 의존성을 설치해주세요.

    ```bash
    corepack enable
    pnpm i
    ```

<br />

3. 프로젝트 루트에 .env를 생성하고, 유어슈 Vault > Frontend 컬렉션에 있는 값으로 채워주세요.

<br />

1. 개발 서버 실행

    ```bash
    pnpm dev
    ```

    추가로, 에디터 실행시 자동으로 개발 서버가 실행되도록 [task를 작성](https://github.com/yourssu/yis-client/blob/main/.vscode/tasks.json)해두었어요.

<br />

## 커밋 컨벤션

### 깃모지

더 직관적인 카테고라이징을 위해 깃모지를 사용해요.

하지만 깃모지 특성상, 이모지를 전부 입력해야하는 불편함이 있어요.

<br />

더 나은 개발 경험을 위해, 
**커밋 메시지 맨 앞에 단축어를 입력**하면 

깃모지가 커밋 메시지에 반영되도록 [스크립트를 작성](https://github.com/yourssu/yis-client/blob/main/scripts/commit-msg.mts)해두었어요.

<img src="https://github.com/user-attachments/assets/e77d0e89-3b6c-4eb2-bda5-832fd319057d" width="400" />

<br />
<br />

가능한 단축어 목록은 아래와 같아요.

원하는 단축어는 언제든지 추가해도 돼요.

| 단축어 | 이모지 | 용례 |
| --- | --- | --- |
| s | ✨ | 피처 구현 |
| b | 🐛 | 코드 버그 수정 |
| r | ♻️ | 코드 리팩토링 |
| l | 💄 | 마크업 작성 및 컴포넌트 스타일링 |
| w | 🔧 | 프로젝트 설정 추가 및 변경 |
| t | 🚚 | 파일 및 폴더 이동 |
| f | 🔥 | 코드 및 파일 제거 |
| a | 🎨 | 코드 포매팅 |
| p | 📦 | 의존성 설치, 업데이트 및 정적 빌드 파일 추가 |
| pp | 💩 | 나중에 제거 될 테스트용 코드 |

<br />

```bash
git commit -m "s 새로운 피처를 만들었어요"
> ✨ 새로운 피처를 만들었어요
```

<br />

### 브랜치 병합 규칙

**Rebase Merge**만 사용해요.

- 모든 경우에 대한 머지 방식 일원화
- 직관적 커밋 그래프 (갠취)
- 빠른 이슈 트래킹 + PR 트래킹
- 세부 기능 단위 revert

<br />

## 코드젠

이 프로젝트에서 반복적 파일 생성에는 코드젠 작성을 강력하게 권고해요.

### 컨벤션

1. `scripts/codegen` 폴더 하위에 코드젠 스크립트를 작성해주세요.
2. package.json 파일에 스크립트 커맨드를 작성해주세요.

    ```json
    "scripts": {
        ...
        "gen-<이름>": "pnpm tsx <경로>",
        "gen-<이름>:watch": "pnpm tsx watch --clear-screen=false --include <의존성경로> <경로>"
    }
    ```

    더 자세한 내용은 [tsx](https://tsx.is/) 문서를 확인해주세요.

3. 개발 서버 실행시 함께 watch되도록 추가해주세요.

    ```json
    "scripts": {
        "dev": "concurrently 'next dev --turbopack' '코드젠 코드1' '코드젠 코드2' ... ",
    }
    ```


<br />

## 이슈레이징 & 컨트리뷰션

언제나 환영해요. 이슈 혹은 PR을 열어주세요.

아직은 따로 템플릿을 지정해두지는 않았기에, 최대한의 맥락을 담아 자유롭게 작성해주시면 돼요.

더 빠른 답장을 위해 슬랙에서 저(Feca)를 멘션해주시면 더 좋아요.

<br />

## 배포

Cloudflare Pages 유어슈 계정에서 호스팅하고 있어요.

로그인은 유어슈 Valut > Frontend 컬렉션의 계정을 사용해주세요.
