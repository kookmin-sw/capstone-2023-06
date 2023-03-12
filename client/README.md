# 프론트엔드

어떤 코드를 작성하기 전에 프론트엔드 우선순위는 다음과 같음을 잊지 않습니다.

> **공부 목적  >  코드 가독성  >  성능**
> 

## 🍩 Git

가급적 PR , 코드 리뷰 후 진행합니다.

### Git branch

작업에 따라 브랜치는 항상 분리하여 개발합니다.

브랜치 생성 규칙은 아래와 같습니다.

```yaml
master : 출시될 수 있는 브랜치
develop : 다음 출시 버전을 개발하는 브랜치
feature : 기능을 개발 브랜치
update : 기능 개발(feature) 후 develop에 병합되었는데 수정 사항이 생긴 경우
release : 이번 출시 버전을 준비하는 브랜치
hotfix : 출시 버전(master)에서 발생한 버그를 수정 하는 브랜치
```

개발중에는 `develop` , `feature` , `update` 브랜치가 주로 사용됩니다.

### Git Commit

커밋 규칙은 항상 `태그: 제목` 형태를 유지합니다.

태그와 제목 사이에는 `:` 가 있으며 제목 앞은 space로 구분합니다.

태그는 항상 영문과 소문자로 시작합니다.

제목은 한글로 작성해도 괜찮으며 영문이 들어간다면 고유 명사는 첫 글자 대문자를 지켜주세요.

태그 종류는 아래와 같으며 아래에 해당되지 않은 내용이 있으면 추가해도 좋습니다.

```yaml
feat: 새로운 기능 추가
fix: 버그를 고친 경우
refactor: 코드 리팩토링
comment: 주석 관련 수정만 있을 경우
hotfix: 급한 버그를 고친 경우
rename/remove: 명명 수정 혹은 파일 삭제 등
design: 디자인 변경
```

제목 작성시 중복되는 내용은 생략합니다.

ex)

```yaml
(X) feat: 로그인 기능 추가
(O) feat: 로그인 기능
// feat 태그 자체가 새로운 기능을 추가한다는 의미를 지닙니다.
// 때문에 제목에 '추가'라는 내용은 불필요 합니다.
```

## 👾 React

react 폴더 구조는 다음과 같습니다.

절대적이지 않으며 필요에 따라 추가/수정 될 수 있으며 더 좋은 설계가 있다면 업데이트 됩니다.

```powershell
src/
  +---api
	+---assets
	+---components
	|   +---common
	|   \---...
	+---hooks
	+---modules
	+---pages
	\---styles
```

- `api` : api 들을 분리하여 사용합니다.
- `assets` : 이미지 등 정적 파일들
- `components` : 컴포넌트들
    - `common` : 흔히 사용되는 컴포넌트들
    - 그 외는 폴더를 만들어서 분리하거나 components 아래에 둬도 괜찮습니다.
- `hooks` : 커스텀 훅
- `modules` : Redux 모듈
- `pages` : 페이지, 라우트
- `styles` : styled-component global 컴포넌트

### Styled-component 를 포함한 component 생성시

보통 styled-component로 생성한 컴포넌트를 사용해서 만든 함수 컴포넌트가 코드량이 더 크거나 유지보수 할 일이 많습니다. 때문에 같은 파일에서 코드를 작성하게 된다면 일반 컴포넌트가 코드 앞에, styled-component 가 뒤에 위치하게 둡니다.

### 코드 / 명명 규칙

1. 컴포넌트 파일들은 모두 대문자로 시작합니다. (e.g. Button.tsx)
2. Typescript 사용으로 인해 무분별한 any type 은 자제합니다.
3. 최대한 컴포넌트들 나노화합니다.