import React, {Fragment} from 'react';
import OpenDetailsButton from "@/components/OpenDetailsButton/OpenDetailsButton";

function Item({hasIcon, canOpenDetails, data, fieldsMapValues, type}) {
    return (
        <tr className="h-16" key={data.id}>
            {hasIcon ?
                (
                    <td>
                        <div className="flex justify-center">
                            <div className="rounded-full w-10 h-10 bg-slate-600"></div>
                        </div>
                    </td>) : null
            }

            {
                fieldsMapValues.map((field, i) => {
                    return (
                        <Fragment key={i + "-field"}>
                            <td className="text-gray-500">
                                {data[field]}
                            </td>
                        </Fragment>
                    )

                })
            }
            {canOpenDetails ? (
                <OpenDetailsButton data={data} type={type}/>
            ) : null}

        </tr>
    )
}

function PaginateItems({dataToRender, canOpenDetails, fieldsMapValues, type}) {
    return (
        <>
            {dataToRender?.map(data => (
                <Fragment key={data._id + '-item'}>
                    <Item data={data} canOpenDetails={canOpenDetails} fieldsMapValues={fieldsMapValues} type={type} />
                </Fragment>
            ))}
        </>
    );
}

export default PaginateItems;