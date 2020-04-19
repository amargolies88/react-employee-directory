import React from "react";
import getRandomUsers from "../utils/API";

const EmployeeTable = () => {
    let randomEmployees = [];
    getRandomUsers(20).then(response => randomEmployees = response);

    

    return (
        <div>
            Employee Table
        </div>
    )
}

export default EmployeeTable;