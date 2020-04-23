import React, { useContext } from "react";
import EmployeeContext from "./EmployeeContext";
import SortContext from "./SortContext";

const EmployeeTable = ({ sortBy }) => {
    const employees = useContext(EmployeeContext);
    const sorts = useContext(SortContext);

    if (employees.length > 0) {
        return (
            <div>
                <div className="employee-table-header">
                    <div className="row">
                        <div className="col-1">
                            {/* Picture Col, Don't need to title that... */}
                        </div>
                        <div className="col-2">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("first")}>
                                First Name <SortIcon cat={"first"} />
                            </button>
                        </div>
                        <div className="col-2">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("last")}>
                                Last Name <SortIcon cat={"last"} />
                            </button>
                        </div>
                        <div className="col-4">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("location")}>
                                Location <SortIcon cat={"location"} />
                            </button>
                        </div>
                        <div className="col-3">
                            <button type="button" className="employee-header-button" onClick={() => sortBy("email")}>
                                Email <SortIcon cat={"email"} />
                            </button>
                        </div>
                    </div>
                </div>
                {
                    employees.map((emp, index) => {
                        return (
                            <div className="row employee-row" key={index}>
                                <div className="col-1">
                                    <img alt="" src={emp.picture.thumbnail}></img>
                                </div>
                                <div className="col-2">
                                    {emp.name.first}
                                </div>
                                <div className="col-2">
                                    {emp.name.last}
                                </div>
                                <div className="col-4">
                                    {emp.location.city}, {emp.location.state}, {emp.location.country}
                                </div>
                                <div className="col-3">
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

    function SortIcon({ cat }) {
        switch (sorts[cat]) {
            case "asc": return (<i className="fas fa-sort-down"></i>);
            case "dec": return (<i className="fas fa-sort-up"></i>);
            default: return (<i className="fas fa-sort"></i>);
        }
    }
}

export default EmployeeTable;