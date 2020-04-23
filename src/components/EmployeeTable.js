import React, { useContext } from "react";
import EmployeeContext from "../utils/EmployeeContext";


const EmployeeTable = ({ sortBy }) => {
    const employees = useContext(EmployeeContext);
    console.log("employees", employees);

    if (employees.length > 0) {
        return (
            <div>
                <div className="employee-table-header">
                    <div className="row">
                        <div className="col">
                            {/* Picture Col, Don't need to title that... */}
                        </div>
                        <div className="col">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("first")}>First Name</button>
                        </div>
                        <div className="col">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("last")}>Last Name</button>
                        </div>
                        <div className="col">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("location")}>Location</button>
                        </div>
                        <div className="col">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("first")}>Email</button>
                        </div>
                    </div>
                </div>
                {
                    employees.map((emp, index) => {
                        return (
                            <div className="row employee-row" key={index}>
                                <div className="col">
                                    <img alt="" src={emp.picture.thumbnail}></img>
                                </div>
                                <div className="col">
                                    {emp.name.first}
                                </div>
                                <div className="col">
                                    {emp.name.last}
                                </div>
                                <div className="col">
                                    {emp.location.city}, {emp.location.state}, {emp.location.country}
                                </div>
                                <div className="col">
                                    <a href={`mailto:${emp.email}`}>{emp.email}</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default EmployeeTable;