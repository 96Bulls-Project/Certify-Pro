import React, {useContext} from 'react';
import Card from "@/components/Card/Card";
import PaginateTable from "@/components/PaginateTable/PaginateTable";
import {AppContext} from "@/context/AppProvider";

function DetailsPopup() {
    const [state, setState] = useContext(AppContext)

    console.log(state)


    return (
        <>
            <div id={"details-popup"} className={state.isDetailsPopupOpen ? "active" : "pointer-events-none"}>
                {state.isDetailsPopupOpen ? (
                    <Card title={"Detalles de " + (state.detailsPopupData?.type === "certificates" ? "Certificado" : "Empleado")}
                          className={"relative"}>
                        <p onClick={() => setState({
                            ...state,
                            isDetailsPopupOpen: false,
                            detailsPopupData: {}
                        })} className={"absolute right-5 top-5 font-bold text-red-700 text-xl"}>X</p>
                        {state.detailsPopupData?.type === "certificates" ? (
                            <div>
                                <div className={'p-5'}>
                                    <p className={"text-2xl text-primary font-bold"}>{state.detailsPopupData?.data.Name}</p>
                                    <p className={"text-gray-600"}>{state.detailsPopupData?.data.Type}</p>
                                </div>
                                <hr />
                                <div className={"p-5"}>
                                    <h2 className={"text-gray-600 font-bold"}>Empleados que cuentan con el
                                                                              certificado:</h2>
                                    <PaginateTable data={state.detailsPopupData?.data.CertifiedEmployees}
                                                   canOpenDetails={false}
                                                   hasIcon={false}
                                                   fieldsMap={{
                                                       Id: "uid",
                                                       Fecha: "year",
                                                   }}
                                                   pageCount={5}
                                                   type={state.detailsPopupData?.type} />

                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className={'p-5'}>
                                    <p className={"text-2xl text-primary font-bold"}>{state.detailsPopupData?.data.Name}</p>
                                    <p className={"text-gray-600"}>{state.detailsPopupData?.data.UserId}</p>
                                    <p className={"text-gray-600"}>{state.detailsPopupData?.data.WorkLocation}</p>
                                </div>
                                <hr />
                                <div className={"p-5"}>
                                    <h2 className={"text-gray-600 font-bold"}>Certificaciones Obtenidas:</h2>
                                    <PaginateTable data={state.detailsPopupData?.data.CertificationsObtained}
                                                   canOpenDetails={false}
                                                   hasIcon={false}
                                                   fieldsMap={{
                                                       Certificado: "certificate",
                                                       Fecha: "year",
                                                   }}
                                                   pageCount={5}
                                                   type={state.detailsPopupData?.type} />

                                </div>

                            </div>)}
                    </Card>
                ) : null}

            </div>

        </>
    );

}

export default DetailsPopup;