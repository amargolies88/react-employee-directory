import React, { createContext, useReducer, useContext } from "react";

const Context = createContext();
const { Provider } = Context;

const reducer = (state, action) => {
    switch (action) {

    }
};

const FilterProvider = ({ name = "", ...props }) => {
    const [state, dispatch] = useReducer(reducer, { name: name });
    return <Provider value={[state, dispatch]} {...props} />
};

const useFilterContext = () => {
    return useContext(Context);
};

export { FilterProvider, useFilterContext };