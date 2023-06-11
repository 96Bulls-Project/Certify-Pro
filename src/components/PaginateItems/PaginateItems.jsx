import React, {Fragment} from 'react';
import OpenDetailsButton from "@/components/OpenDetailsButton/OpenDetailsButton";

function Item({data, fieldsMapValues}) {
    return (
        <tr className="h-16" key={data.id}>
            <td>
                <div className="flex justify-center">
                    <div className="rounded-full w-10 h-10 bg-slate-600"></div>
                </div>
            </td>

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

            <OpenDetailsButton />

        </tr>
    )
}

function PaginateItems({dataToRender, fieldsMapValues}) {
    return (
        <>
            {dataToRender?.map(data => (
                <Fragment key={data._id + '-item'}>
                    <Item data={data} fieldsMapValues={fieldsMapValues} />
                </Fragment>
            ))}
        </>
    );
}

export default PaginateItems;