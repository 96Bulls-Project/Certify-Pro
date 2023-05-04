import React from 'react';

function Navbar() {
    return (
        <div id="navbar">
            <div className="wrapper">
                <div className="content">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <div className="center">
                        <div id="navbar-search">
                            <input  type="text" placeholder="Search" />
                        </div>
                    </div>
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