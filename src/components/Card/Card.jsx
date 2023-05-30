import React from 'react';

function Card({title, subtitle, children}) {
    return (
        <div className={"card h-full"}>
            <div className="p-5">
                <div>
                    <p className={"font-bold text-gray-700"}>
                        {title}
                    </p>
                    <p className={"text-sm text-gray-500"}>
                        {subtitle}
                    </p>
                </div>

            </div>
            <hr />
            {children}
        </div>
    );
}

export default Card;