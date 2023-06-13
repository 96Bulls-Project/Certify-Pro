import React from 'react';
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import DetailsPopup from "@/components/DetailsPopup/DetailsPopup";

function Layout({user, grid="", children}) {
    return (
        <>
            <DetailsPopup />
            <Navbar />
            <div id="layout" className={"w-full flex flex-row"}>
                <Menu user={user}/>
                <div id="main-wrapper" className={grid} >
                {children}
                </div>
            </div>
        </>
    );
}

export default Layout;