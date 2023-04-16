import { MainLayout } from "../components/layout/Layout";
import React from "react";
import { ItemListComponent } from "../components/ItemListComponent"
import  MainSide  from "../components/banner/MainSide"
import MainBottom from "../components/banner/MainBottom"
import MainMini from "../components/banner/MainMini"

import "./main.css"
const Main = () => {
    return (
        <>
            <MainLayout>
                <div className="body">
                    <div className="left">
                        <div className="top">
                            {/*slider*/}
                            <div className="slider">
                            </div>
                            <MainMini/>
                        </div>
                        <MainBottom/>
                        <div className="recommend">
                            <p>추천 게시물</p>
                            <ItemListComponent/>
                        </div>
                        <div className="theme">
                            <p>테마 게시물</p>
                            <ItemListComponent/>
                        </div>
                    </div>
                </div>
                <MainSide/>
            </MainLayout>
        </>
    )
}

export default Main;