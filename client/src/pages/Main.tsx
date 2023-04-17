import React from "react";
import { MainLayout } from "../components/layout/Layout";
import { getPostList } from "../api/upload";

const Main = () => {
  React.useEffect(() => {
    refreshPostList();
  }, []);

  const refreshPostList =  async () => {
    // 아직 API 가 서버에서 구현이 안됨.
    // try {
    //   const res = await getPostList("user");

    //   console.log(res);

    //   if (res.success) {
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <MainLayout>
      메인 화면
      <div>캐로셀</div>
      <div>배너</div>
    </MainLayout>
  );
};

export default Main;
