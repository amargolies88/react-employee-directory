import React, { useContext } from "react";
import EmployeeContext from "./EmployeeContext";
import SortContext from "./SortContext";
import FilterContext from "./FilterContext";

const EmployeeTable = ({ sortBy }) => {
    const employees = useContext(EmployeeContext);
    const sorts = useContext(SortContext);
    const filterC = useContext(FilterContext);
    console.log(filterC);
    if (employees.length > 0) {
        return (
            <div className="container mb-3">
                {/* Row for labeling columns. Labels are buttons that sort employees by that button's title */}
                <div className="employee-table-header">
                    <div className="row">
                        <div className="col-1">
                            {/* Empty Col for proper alignment. The columns aligned with this one on rows below hold thumbnail pictures of employees */}
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
                        if (filterC.nameFilter === "" || emp.name.first.toLowerCase().includes(filterC.nameFilter.toLowerCase())) {
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
                            );
                        } else {
                            return null;
                        }
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