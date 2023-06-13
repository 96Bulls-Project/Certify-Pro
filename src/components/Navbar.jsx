import React from 'react';
import SearchBar from "@/components/SearchBar/SearchBar";

function Navbar() {
    return (
        <div id="navbar" className={"relative"}>
            <div className="wrapper">
                <div className="content">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <SearchBar />
                    <div className="right flex-row">
                        <div className="icon">
                            <img src="/icons/notification_outline_dot.png" alt="info" />
                        </div>
                        <div className="icon">
                            <img src="/icons/info_circle_outline.png" alt="plus" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;