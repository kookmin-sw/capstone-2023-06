import React from "react";
import ItemComponent from "./ItemComponent";
import "./itemListComponent.css";

export function ItemListComponent() {
    return (
        <>
            <div className="list">
                <ItemComponent/>
                <ItemComponent/>
                <ItemComponent/>
                <ItemComponent/>
                {/*<ItemComponent/>*/}
                {/*<ItemComponent/>*/}
            </div>
        </>
    )
}
