import {createContext, useState} from 'react';

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [state, setState] = useState({
        isMenuOpen: false,
    });

    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};