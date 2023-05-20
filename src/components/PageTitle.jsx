import React from 'react';
import Moment from "react-moment";

function PageTitle({children}) {
    const date = new Date();

    return (
        <div id="header-container">
            <div>
                <h1 className="text-gray-700">{children}</h1>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-600">Hoy es</p>
                <Moment className="text-gray-700" date={date} format={"DD MMM YYYY"} />
            </div>
        </div>
    );
}

export default PageTitle;