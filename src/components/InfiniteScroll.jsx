import React from 'react';

function InfiniteScroll({children, direction="vertical"}) {
    return (
        <div className={"flex flex-row infinite-scroll overflow-hidden"}>
            {children}
        </div>
    );
}

export default InfiniteScroll;