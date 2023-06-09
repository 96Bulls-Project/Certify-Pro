import React from 'react';

function Item ({data, fieldsMap}) {
    return (
        <tr className="h-16" key={data.id}>
            <td>
                <div className="flex justify-center">
                    <div className="rounded-full w-10 h-10 bg-slate-600"></div>
                </div>
                {data[fieldsMap.icon]}
            </td>

            <td>
                {data[fieldsMap.first]}
            </td>

            <td className="text-gray-500">
                {data[fieldsMap.second]}
            </td>

            <td className="text-gray-500">
                {data[fieldsMap.third]}
            </td>

            <td className="text-gray-500">
                {data[fieldsMap.fourth]}
            </td>

            <td className="m-4">
                <button className="bg-blue-600 text-white px-2 py-1 rounded">Ver mas</button>
            </td>

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