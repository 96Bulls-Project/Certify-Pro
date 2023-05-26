import React from 'react';
import DetailCard from "@/components/DetailCard/DetailCard";

const usersTestData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "certificates": [
            {
                "id": "13513"
            },
            {
                "id": "13514"
            }
        ]
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "certificates": [
            {
                "id": "13513"
            },
        ]
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "certificates": [
            {
                "id": "13513"
            },
            {
                "id": "13512"
            },
            {
                "id": "13511"
            },
        ]
    },
]

function TopCard({title, description, data, buttonDetails = {text: "Ver detalles", link: "/"}, fieldsMap}) {
    return (
        <div className="card ">
            <div className="p-5">
                <div>
                    <p className={"font-bold text-gray-700"}>
                        Title

                    </p>
                    <p className={"text-sm text-gray-500"}>
                        this is the subtitle
                    </p>
                </div>
            </div>
            <hr />
            <div className={"px-5 py-2"}>
                Filtro
            </div>
            <hr />
            <div>
                {
                    data?.map((cardData) => {
                        return (
                            <DetailCard key={cardData._id} data={cardData} fieldsMap={fieldsMap} />
                        )
                    })

                }

            </div>
            <button className="bg-blue-500 w-full h-10 text-white">
                {buttonDetails.text}
            </button>

        </div>
    )
        ;
}

export default TopCard;