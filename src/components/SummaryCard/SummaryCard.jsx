import React from 'react';
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
);
/* type = certificates | employees  */
function SummaryCard({info, type='employees'}) {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: false,
        },
        legend: {
            display: false,
        },
        interaction: {
            intersect: false,
            mode: false,
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                // to remove the x-axis grid
                grid: {
                    drawBorder: false,
                    display: false,
                },
                border: {
                    display: false,
                }
            },
            // to remove the y-axis labels
            y: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                },
                // to remove the y-axis grid
                grid: {
                    drawBorder: false,
                    display: true,

                },
                border: {
                    display: false,
                }
            },
        }
    };
    const data = {
        labels: info.data.map(() => " "),
        datasets: [
            {
                fill: true,
                data: info.data.map((data) => data.value),
                borderColor: '#0F62FE',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                pointRadius: 0,
            }
        ],
    };

    return (
        <div className="card summary-card">
            <div className="flex justify-between mb-4">
                <div className="flex">
                    <div>
                        <img className={"mr-3"} src={"/icons/" + type + "_summary_card.png"} width={40} height={40} />
                    </div>
                    <div>
                        <p className={"font-bold text-gray-700"}>
                            {info.title}

                        </p>
                        <p className={"text-sm text-gray-500"}>
                            {info.subtitle}
                        </p>
                    </div>
                </div>
                <div className={"see-more"}>
                    ...
                </div>
            </div>
            <div className="flex bottom-info justify-between">
                <div>
                    <h3 className="text-gray-700 font-semibold text-3xl">{info.data[info.data.length - 1].value}</h3>
                    <p className="text-gray-500 text-sm ">Crecimiento Mensual</p>
                </div>
                <div className={"graph"}>
                    <Line options={options} data={data} width={"100%"} height={"100%"} />
                </div>

            </div>
        </div>
    );
}

export default SummaryCard;