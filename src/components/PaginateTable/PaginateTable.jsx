import React, {Fragment, useState} from 'react';
import PaginateItems from "@/components/PaginateItems/PaginateItems";
import ReactPaginate from "react-paginate";

function PaginateTable({hasIcon, canOpenDetails, data = [], type, itemsPerPage = 5, fieldsMap = {}}) {
    const [itemOffset, setItemOffset] = useState(0);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        setItemOffset(newOffset);
    };

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    const currentItems = data.length > 0 ? data.slice(itemOffset, endOffset) : [];

    const fieldsMapKeys = Object.keys(fieldsMap);
    const fieldsMapValues = Object.values(fieldsMap);


    return (
        <>
            <table className="table-auto w-full text-left mt-4">
                <thead>
                <tr>
                    {hasIcon ? (
                        <th className={""}></th>
                    ) : null}
                    {data.length > 0 ?
                        (fieldsMapKeys.map(field => {
                            return (
                                <Fragment key={field}>
                                    <th className={"text-sm text-gray-500 font-light"}>{field}</th>
                                </Fragment>
                            )
                        })) : null}


                </tr>
                </thead>

                <tbody>
                {data.length > 0 ?
                    <PaginateItems hasIcon={hasIcon}
                                   canOpenDetails={canOpenDetails}
                                   dataToRender={currentItems}
                                   fieldsMapValues={fieldsMapValues}
                                   type={type} />
                    : null}

                </tbody>
            </table>

            <hr />

            <div className="p-5 text-center">
                <ReactPaginate
                    className="flex items-center justify-between w-1/2 m-auto"
                    pageCount={pageCount}
                    nextLabel=">"
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    onPageChange={handlePageClick}
                    breakLabel="..."
                />

            </div>

        </>
    )
        ;
}

export default PaginateTable;