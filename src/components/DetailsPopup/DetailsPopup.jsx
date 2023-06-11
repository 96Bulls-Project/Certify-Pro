import React, {useState} from 'react';
import Card from "@/components/Card/Card";
import PaginateItems from "@/components/PaginateItems/PaginateItems";

function DetailsPopup({type = "empleado", data, handleOpen}) {
    const [isOpen, setIsOpen] = useState(false);

    const _data = {
        "CertificationsObtained": [
            {
                "certificate": "IBM Garage Foundation",
                "day": "06",
                "month": "06",
                "year": "2022"
            },
            {
                "certificate": "DevSecOps Essentials",
                "day": "23",
                "month": "05",
                "year": "2022"
            },
            {
                "certificate": "Cloud Satellite Sales Foundation",
                "day": "20",
                "month": "05",
                "year": "2022"
            },
            {
                "certificate": "Trustworthy AI and AI Ethics",
                "day": "06",
                "month": "05",
                "year": "2022"
            },
            {
                "certificate": "Knowledge Sharing for Business Impact",
                "day": "03",
                "month": "05",
                "year": "2022"
            },
            {
                "certificate": "IBM Garage Essentials",
                "day": "06",
                "month": "04",
                "year": "2022"
            },
            {
                "certificate": "IoT - Selling an IBM Watson IoT SaaS Solution",
                "day": "07",
                "month": "02",
                "year": "2022"
            },
            {
                "certificate": "Mental Health Ally",
                "day": "03",
                "month": "12",
                "year": "2021"
            },
            {
                "certificate": "IoT - Token Licensing",
                "day": "02",
                "month": "12",
                "year": "2021"
            },
            {
                "certificate": "IoT - Maximo Safety Management",
                "day": "01",
                "month": "12",
                "year": "2021"
            },
            {
                "certificate": "IBM AI Associate Product Manager",
                "day": "05",
                "month": "11",
                "year": "2021"
            },
            {
                "certificate": "IBM AI Associate Leader",
                "day": "05",
                "month": "11",
                "year": "2021"
            },
            {
                "certificate": "IBM AI Associate for All IBMers",
                "day": "30",
                "month": "10",
                "year": "2021"
            },
            {
                "certificate": "IBM Cloud Essentials",
                "day": "22",
                "month": "06",
                "year": "2021"
            },
            {
                "certificate": "Cloud Core",
                "day": "01",
                "month": "03",
                "year": "2021"
            },
            {
                "certificate": "IoT - Tactic: Improve Product Requirements with AI",
                "day": "06",
                "month": "01",
                "year": "2021"
            },
            {
                "certificate": "Watson IoT - Industry 4.0 Essentials",
                "day": "29",
                "month": "12",
                "year": "2020"
            },
            {
                "certificate": "Think Like a Hacker",
                "day": "02",
                "month": "12",
                "year": "2020"
            },
            {
                "certificate": "Digital Insights - Knowledge Delivery",
                "day": "29",
                "month": "11",
                "year": "2020"
            },
            {
                "certificate": "Watson IoT - Building Optimization Essentials",
                "day": "27",
                "month": "11",
                "year": "2020"
            },
            {
                "certificate": "Watson IoT - Asset Optimization Essentials",
                "day": "26",
                "month": "11",
                "year": "2020"
            },
            {
                "certificate": "IoT - Intro to IBM Maximo Production Optimization",
                "day": "25",
                "month": "11",
                "year": "2020"
            },
            {
                "certificate": "IBM Consulting - Delivering Trust",
                "day": "14",
                "month": "10",
                "year": "2020"
            },
            {
                "certificate": "IBM Consulting - Leading Initiatives",
                "day": "25",
                "month": "09",
                "year": "2020"
            },
            {
                "certificate": "IBM Consulting - Building Teams",
                "day": "08",
                "month": "09",
                "year": "2020"
            },
            {
                "certificate": "Watson Speech to Text",
                "day": "11",
                "month": "08",
                "year": "2020"
            },
            {
                "certificate": "IBM Watson Studio Visual Recognition Essentials",
                "day": "27",
                "month": "07",
                "year": "2020"
            },
            {
                "certificate": "IBM Consulting - Communicating Value",
                "day": "15",
                "month": "07",
                "year": "2020"
            },
            {
                "certificate": "IBM Consulting - Delivering Business Value",
                "day": "03",
                "month": "06",
                "year": "2020"
            },
            {
                "certificate": "IoT - Intro to IBM IoT Worker Insights",
                "day": "31",
                "month": "05",
                "year": "2020"
            },
            {
                "certificate": "IoT - Managing Engineering Complexity, an Introduction",
                "day": "31",
                "month": "05",
                "year": "2020"
            },
            {
                "certificate": "IoT - Optimize Equipment with AI - Introduction",
                "day": "30",
                "month": "05",
                "year": "2020"
            },
            {
                "certificate": "IoT - Optimize Operations with AI - Introduction",
                "day": "30",
                "month": "05",
                "year": "2020"
            },
            {
                "certificate": "IBM Blockchain Consulting",
                "day": "30",
                "month": "05",
                "year": "2020"
            },
            {
                "certificate": "IBM Certification Exam Developer 2020 - Level I",
                "day": "24",
                "month": "03",
                "year": "2020"
            },
            {
                "certificate": "Watson IoT - Services Essentials",
                "day": "23",
                "month": "03",
                "year": "2020"
            },
            {
                "certificate": "IBM Certified Solution Advisor - IBM Cloud Foundations V2",
                "day": "13",
                "month": "03",
                "year": "2020"
            },
            {
                "certificate": "All Flash Storage Foundations V2",
                "day": "31",
                "month": "12",
                "year": "2019"
            },
            {
                "certificate": "Enterprise Design Thinking - Team Essentials for AI",
                "day": "17",
                "month": "12",
                "year": "2019"
            },
            {
                "certificate": "IBM Cloud Garage Test-Driven Development (TDD)",
                "day": "15",
                "month": "12",
                "year": "2019"
            },
            {
                "certificate": "IBM Quantum Conversations",
                "day": "15",
                "month": "12",
                "year": "2019"
            },
            {
                "certificate": "IBM Automation Essentials",
                "day": "04",
                "month": "12",
                "year": "2019"
            },
            {
                "certificate": "IBM Storage and Cloud Essentials",
                "day": "30",
                "month": "11",
                "year": "2019"
            },
            {
                "certificate": "IBM Cloud Migration Method Explorer 2",
                "day": "30",
                "month": "11",
                "year": "2019"
            },
            {
                "certificate": "IBM Data Driven & Multi-Cloud Storage Strategy v1",
                "day": "14",
                "month": "11",
                "year": "2019"
            },
            {
                "certificate": "Application Services Innovation - Application Innovation 101",
                "day": "14",
                "month": "08",
                "year": "2019"
            },
            {
                "certificate": "QRadar Cloud & QRadar Advisor with Watson",
                "day": "12",
                "month": "08",
                "year": "2019"
            },
            {
                "certificate": "IBM Storage for AI",
                "day": "12",
                "month": "08",
                "year": "2019"
            },
            {
                "certificate": "People Skills - Communication, Problem Solving, Emotional Intelligence",
                "day": "12",
                "month": "08",
                "year": "2019"
            },
            {
                "certificate": "Experienced Cloud Engineer",
                "day": "25",
                "month": "07",
                "year": "2019"
            },
            {
                "certificate": "IBM Agile Explorer",
                "day": "23",
                "month": "07",
                "year": "2019"
            },
            {
                "certificate": "IBM Security Data Protection Technical Sales Foundations - Level 100",
                "day": "29",
                "month": "06",
                "year": "2019"
            },
            {
                "certificate": "IBM Security BigFix Technical Sales Foundations - Level 100",
                "day": "22",
                "month": "05",
                "year": "2019"
            },
            {
                "certificate": "IoT - Maximo Security Model",
                "day": "18",
                "month": "05",
                "year": "2019"
            },
            {
                "certificate": "Beyond the Basics: Istio and IBM Cloud Kubernetes Service",
                "day": "26",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Containers, K8s and Istio on IBM Cloud",
                "day": "26",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Getting started with Microservices with Istio and IBM Cloud Kubernetes Service",
                "day": "24",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "IBM Cloud Kubernetes Service",
                "day": "22",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Security and Privacy by Design Foundations",
                "day": "21",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Cloud Service Management and Operations - Advanced V2",
                "day": "14",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Python for Data Science",
                "day": "13",
                "month": "03",
                "year": "2019"
            },
            {
                "certificate": "Watson Discovery Service Foundations",
                "day": "09",
                "month": "01",
                "year": "2019"
            },
            {
                "certificate": "Data Science Foundations - Level 1",
                "day": "08",
                "month": "01",
                "year": "2019"
            },
            {
                "certificate": "Hadoop Foundations - Level 1",
                "day": "04",
                "month": "01",
                "year": "2019"
            },
            {
                "certificate": "Statistics 101",
                "day": "29",
                "month": "12",
                "year": "2018"
            },
            {
                "certificate": "IBM Security Essentials for Architects",
                "day": "28",
                "month": "12",
                "year": "2018"
            },
            {
                "certificate": "IBM New Collar Professional Skills",
                "day": "22",
                "month": "12",
                "year": "2018"
            },
            {
                "certificate": "Data Science for Business - Level 1",
                "day": "07",
                "month": "12",
                "year": "2018"
            },
            {
                "certificate": "Cloud Service Management and Operations Explorer",
                "day": "04",
                "month": "12",
                "year": "2018"
            },
            {
                "certificate": "Big Data Foundations - Level 1",
                "day": "29",
                "month": "11",
                "year": "2018"
            },
            {
                "certificate": "Enterprise Design Thinking Co-Creator",
                "day": "22",
                "month": "11",
                "year": "2018"
            },
            {
                "certificate": "Watson Analytics - Level 1",
                "day": "15",
                "month": "11",
                "year": "2018"
            },
            {
                "certificate": "IBM Certification Exam Developer 2018 - Level I",
                "day": "22",
                "month": "10",
                "year": "2018"
            },
            {
                "certificate": "IBM Certified Deployment Professional - IBM Cloud Private V1",
                "day": "15",
                "month": "10",
                "year": "2018"
            },
            {
                "certificate": "IBM Garage Method for Cloud Advocate",
                "day": "01",
                "month": "08",
                "year": "2018"
            },
            {
                "certificate": "IBM Cloud Private - Continuous Integration/Continuous Delivery Pipelines",
                "day": "17",
                "month": "07",
                "year": "2018"
            },
            {
                "certificate": "Watson and Cloud Foundations",
                "day": "06",
                "month": "07",
                "year": "2018"
            },
            {
                "certificate": "Get started with Istio and IBM Cloud Container Service",
                "day": "04",
                "month": "07",
                "year": "2018"
            },
            {
                "certificate": "IBM Garage Method for Cloud Explorer",
                "day": "29",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "Watson Conversation Service Foundations",
                "day": "26",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "Get started with Kubernetes and IBM Cloud Container Service",
                "day": "22",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "Docker Essentials: A Developer Introduction",
                "day": "19",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "IBM Cloud Private Infrastructure and Architecture",
                "day": "15",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "IBM Cloud Private Installation and Configuration",
                "day": "08",
                "month": "06",
                "year": "2018"
            },
            {
                "certificate": "IBM Cloud Private - Foundation Technology",
                "day": "02",
                "month": "04",
                "year": "2018"
            },
            {
                "certificate": "Node-RED: basics to bots",
                "day": "12",
                "month": "03",
                "year": "2018"
            },
            {
                "certificate": "IBM Blockchain Essentials",
                "day": "03",
                "month": "03",
                "year": "2018"
            },
            {
                "certificate": "Cognitive Practitioner",
                "day": "15",
                "month": "02",
                "year": "2018"
            },
            {
                "certificate": "IBM Cloud Essentials",
                "day": "13",
                "month": "12",
                "year": "2017"
            },
            {
                "certificate": "Enterprise Design Thinking Practitioner",
                "day": "17",
                "month": "11",
                "year": "2017"
            },
            {
                "certificate": "IBM Agile Achiever",
                "day": "03",
                "month": "02",
                "year": "2017"
            },
            {
                "certificate": "IBM Agile Champion",
                "day": "25",
                "month": "01",
                "year": "2017"
            },
            {
                "certificate": "IBM Advisory Project Manager",
                "day": "21",
                "month": "10",
                "year": "2016"
            }
        ],
        "Name": "Ruben DuBuque Jr.",
        "TotalCertifications": 95,
        "UserId": "076180781IBM",
        "WorkLocation": "Guadalajara, JAL, Mexico",
        "_id": "6451e214a666b89f112ee81f"
    }

    return (
        <>
            {isOpen ? (
                <div id={"details-popup"} className={isOpen ? "active" : ""}>

                    <Card title={"Detalles de " + type} className={""}>
                        {type === "empleado" ? (
                            <div>
                                <div className={'p-5'}>
                                    <h1>{_data.Name}</h1>
                                    <h2>{_data.UserId}</h2>
                                </div>
                                <hr />
                                <div>
                                    <PaginateItems items={_data.Certifications} />

                                </div>
                            </div>
                        ) : (
                            <div>


                            </div>)}
                    </Card>

                </div>
            ) : null}
        </>
    );
}

export default DetailsPopup;