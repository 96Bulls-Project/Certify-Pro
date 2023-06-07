import React from 'react';

function Card({title, subtitle, footerTitle, footerSubtitle, className, children}) {
    return (
        <div className={"card " + className}>
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
            {footerTitle ?
                <>
                    <hr />
                    <div className="p-5">
                        <div>
                            <p className={"font-bold text-gray-700"}>
                                {footerTitle}
                            </p>
                            <p className={"text-sm text-gray-500"}>
                                {footerSubtitle}
                            </p>
                        </div>

                    </div>
                </> : <></>}

        </div>
    );
}

export default Card;