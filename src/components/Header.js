import React, { useContext } from "react";
import FilterContext from "./FilterContext";

const Header = () => {
    const filterC = useContext(FilterContext);

    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Employee Directory</h1>
                <p className="lead">Click column titles to sort!</p>
                <input onChange={filterC.handleInputChange} placeholder="Filter by Name" type="text"></input>
            </div>
        </div>
    )
}

export default Header;