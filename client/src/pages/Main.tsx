import { MainLayout } from "../components/layout/Layout";

import Editor from "../components/editor/Editor";

const Main = () => {
    return (
        <MainLayout>
            메인 화면
            <div>캐로셀</div>
            <div>배너</div>
            <Editor></Editor>
        </MainLayout>
    )
}

export default Main;