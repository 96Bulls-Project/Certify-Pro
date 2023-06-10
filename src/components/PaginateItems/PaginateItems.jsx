import React from 'react';
import OpenDetailsButton from "@/components/OpenDetailsButton/OpenDetailsButton";

function Item({data, fieldsMap}) {
    return (
        <tr className="h-16" key={data.id}>
            <td>
                <div className="flex justify-center">
                    <div className="rounded-full w-10 h-10 bg-slate-600"></div>
                </div>
                {data[fieldsMap.icon]}
            </td>

            {
                fieldsMap.first !== null ? (
                    <td>
                        {data[fieldsMap.first]}
                    </td>
                ) : null
            }

            {
                fieldsMap.second !== null ? (
                    <td className="text-gray-500">
                        {data[fieldsMap.second]}
                    </td>
                ) : null
            }

            {
                fieldsMap.third !== null ? (
                    <td className="text-gray-500">
                        {data[fieldsMap.third]}
                    </td>) : null
            }

            {
                fieldsMap.fourth !== null ? (
                    <td className="text-gray-500">
                        {data[fieldsMap.fourth]}
                    </td>
                ) : null
            }

            <OpenDetailsButton />

        </tr>
    )
}

function PaginateItems({dataToRender, fieldsMap}) {
    return (
        <>
            {dataToRender?.map(data => (
                <Item data={data} fieldsMap={fieldsMap} />
            ))}
        </>


    );
}

export default PaginateItems;