import {createContext, useEffect, useState} from 'react';
import axios from "axios";
import useSWR from "swr";

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const fetcher = async (url) => axios(url).then(async (res) => {
        return await axios(url).then((res) => {
            console.log(res.data.data)
            return res.data.data;
        })
    });

    const [state, setState] = useState({
        isMenuOpen: false,
        isDetailsPopupOpen: false,
        detailsPopupData: null,
        isFetchingData: true,
        employees: [],
        certificates: [],
    });

    const {
        data: employees,
        error: employeesError,
    } = useSWR(state.employees.length === 0 ? '/api/employees' : null, fetcher);

    const {
        data: certificates,
        error: certificatesError,
    } = useSWR(state.certificates.length === 0 ? '/api/certificates' : null, fetcher);


    useEffect(() => {

        if (state.employees.length > 0 && state.certificates.length > 0) {
            setState({
                ...state,
                isFetchingData: false
            })
            return;
        }


        if (state.employees.length === 0 && employees) {
            setState({
                ...state,
                employees: employees,
            })
        }

        if (state.certificates.length === 0 && certificates) {
            setState({
                ...state,
                certificates: certificates,
            })
        }

    }, [employees, certificates]);


    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};