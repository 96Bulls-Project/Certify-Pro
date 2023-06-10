import React from 'react';
import DetailCard from "@/components/DetailCard/DetailCard";
import Card from "@/components/Card/Card";

function TopFiveCard({title, description, data, buttonDetails = {text: "Ver detalles", link: "/"}, fieldsMap, loading}) {
    return (
        <Card title={title} subtitle={description} className={"h-fit"}>
            <div className={"px-5 py-2"}>
                Filtro
            </div>
            <hr />
            <div className={"h-fit"}>
                {
                    loading ?
                        [0, 1, 2, 3, 4].map((l) => {
                            return (
                                <div key={l} className={loading ? "loading" : ""}>
                                    <DetailCard  data={{}} fieldsMap={fieldsMap} />
                                </div>
                            )
                        })
                        :

                        data?.map((cardData) => {
                            return (
                                <DetailCard key={cardData._id} data={cardData} fieldsMap={fieldsMap} />
                            )
                        })

                }

            </div>
            <button className="bg-blue-500 w-full h-10 text-white bottom-0">
                {buttonDetails.text}
            </button>

        </Card>
    )
        ;
}

export default TopFiveCard;