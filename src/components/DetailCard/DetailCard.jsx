import React from 'react';

function DetailCard({data, fieldsMap}) {

    console.log("Data:", data);
    console.log("FieldsMap:", fieldsMap);

    const renderSubtitle = () => {
        if (Array.isArray(data[fieldsMap.subtitle])) {
            return (
                <p className={"card_subtitle text-sm text-gray-500"}>
                    {data[fieldsMap.subtitle].map(data => {
                        return (
                            <span className={"mr-2"}>
                                {data},
                            </span>
                        )
                    })}
                </p>
            )
        } else {
            return (
                <p className={"text-sm text-gray-500"}>
                    {data[fieldsMap.subtitle]}
                </p>
            )
        }
    }

    return (
        <div className="card-detail px-5 py-2.5 w-full">
            <div className="flex  content-between justify-between">
                <div>
                    <p>
                        {data[fieldsMap.title] || "Cargando..."}
                    </p>
                    <p>
                        {
                            renderSubtitle()
                        }
                    </p>
                </div>
                <div>
                    <p className="text-center font-semibold text-xl text-gray-600">
                        {data[fieldsMap.value]}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DetailCard;