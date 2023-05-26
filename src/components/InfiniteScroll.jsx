import React from 'react';

function InfiniteScroll({children, direction="vertical"}) {
    return (
        <div className={"flex flex-row infinite-scroll overflow-hidden row-start-2 row-end-4"}>
            {children}
        </div>
    );
}

export default InfiniteScroll;