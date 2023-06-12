import React, {useContext} from 'react';
import {AppContext} from "@/context/AppProvider";

function OpenDetailsButton({data, type}) {
    const [state, setState] = useContext(AppContext)

    const handleOpen = () => {
        console.log("Open Details")
        console.log(data, type)

        setState({
            ...state,
            isDetailsPopupOpen: true,
            detailsPopupData: {
                type: type,
                data: data
            }
        })
    }

    return (
        <>
            <td className="m-4">
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded" onClick={handleOpen}>+ Ver más</button>
            </td>
        </>
    );
}

export default OpenDetailsButton;