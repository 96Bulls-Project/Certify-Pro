import {useSession, signIn, signOut} from "next-auth/react"
import React from "react";
import Layout from "@/components/Layout";
import PageTitle from "../components/PageTitle";
import InfiniteScroll from "@/components/InfiniteScroll";
import {faker} from "@faker-js/faker";
import SummaryCard from "@/components/SummaryCards/SummaryCard";

export default function Home() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    const cardsTest = [
        {
            icon: "fas fa-users",
            title: "Empleados",
            subtitle: "Cantidad de Empleados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
        },
        {
            icon: "fas fa-users",
            title: "Empleados",
            subtitle: "Cantidad de Empleados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
        },
        {
            icon: "fas fa-users",
            title: "Empleados",
            subtitle: "Cantidad de Empleados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
        }
    ]

    console.log("user: ", session.user);

    if (session?.user) {
        return (
            <Layout user={session?.user}>
                <PageTitle>Bienvenid@ {session.user.name}</PageTitle>
                <InfiniteScroll>
                    {cardsTest.map((card, index) => (
                        <SummaryCard key={index} info={card} type={'employees'} />
                    ))}
                </InfiniteScroll>
            </Layout>
        )
    }


}
