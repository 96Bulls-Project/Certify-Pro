import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
);

const options = {
    responsive: true,
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: false,
                },
            },
            y: {
                display: false,
                ticks: {
                    display: false,
                },
            },
        },
    },
};

const labels = ['', '', '', '', '', '', ''];

const data = {
    labels: labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

export function GraphTest() {
    return <Line className={"c-full"} options={options} data={data} />;
}