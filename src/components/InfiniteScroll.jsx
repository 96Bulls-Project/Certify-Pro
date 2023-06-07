import React from 'react';

function InfiniteScroll({children, direction="vertical"}) {
    return (
        <div className={"flex flex-row infinite-scroll row-start-2 row-end-3"}>
            {children}
        </div>
    );
}

export default InfiniteScroll;