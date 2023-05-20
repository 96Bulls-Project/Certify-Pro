import React from 'react';
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";

function Layout({user, children}) {
    return (
        <>
            <Navbar />
            <div id="layout" className="w-full flex flex-row">
                <Menu user={user}/>
                <div id="main-wrapper">
                {children}
                </div>
            </div>
        </>
    );
}

export default Layout;