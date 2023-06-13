import React, {useContext, useState} from 'react';
import {AppContext} from "@/context/AppProvider";

function SearchBar(props) {
    const [state, setState] = useContext(AppContext);
    const [searchInput, setSearchInput] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [filteredCertificates, setFilteredCertificates] = useState([]);
    const timeToSearch = 1000

    let timeout = null

    const search = (toSearch) => {
        let count = 0
        const regex = new RegExp(`(^|\\s)${toSearch}\\w*`, 'gi');
        console.log(regex)

        setFilteredEmployees(state.employees.filter((employee) => {
            if (count > 3) {
                return false
            }

            if (employee.Name.match(regex) || employee.UserId.match(regex)) {
                count++;
                return true;
            }
            return false;
        }))

        count = 0
        setFilteredCertificates(state.certificates.filter((certificate) => {
            if (count > 3) {
                return false
            }

            if (certificate.Name.match(regex)) {
                count++;
                return true;
            }
            return false;
        }))

        console.log(filteredEmployees, filteredCertificates)
    }

    const handleOpenDetails = (data, type) => {
        setSearchInput("");
        setFilteredEmployees([]);
        setFilteredCertificates([]);
        setState({
            ...state,
            isDetailsPopupOpen: true,
            detailsPopupData: {
                type: type,
                data: data
            }
        })
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        console.log(searchInput);

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => {
            console.log("searching");
            search(e.target.value);
        }, timeToSearch);

    }

    return (
        <div className="center">
            <div id="navbar-search">
                <input value={searchInput} type="text" placeholder="Search" onChange={handleChange} />
                {searchInput.length > 0 ? (
                    <button className="absolute right-5 bottom-2" onClick={() => {
                        setSearchInput("");
                        setFilteredEmployees([]);
                        setFilteredCertificates([]);
                    }}>X</button>

                ) : null}
                <div id={"search-bar-results"}>
                    {filteredEmployees.length > 0 ? (
                        <div className={"pt-2 "}>
                            <h2 className={"px-5 font-bold text-gray-600"}>Empleados</h2>
                            <hr />
                            <div className={"px-5"}>
                                {filteredEmployees.map((employee) => {
                                    return (
                                        <div className={"py-1.5"}>
                                            <p className={"text-sm"}
                                               onClick={() => handleOpenDetails(employee, "employees")}>{employee.Name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}

                    {filteredCertificates.length > 0 ? (
                        <div className={"py-2"}>
                            <h2 className={"px-5 font-bold text-gray-600"}>Certificados</h2>
                            <hr />
                            <div className={"px-5"}>
                                {filteredCertificates.map((certificate) => {
                                    return (
                                        <div className={"py-1.5"}>
                                            <p className={"text-sm"}
                                               onClick={() => handleOpenDetails(certificate, "certificates")}>{certificate.Name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;