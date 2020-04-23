import React, { useState, useEffect } from 'react';
import getRandomUsers from "./utils/API";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeContext from "./components/EmployeeContext";
import './App.css';
import SortContext from './components/SortContext';
import Header from "./components/Header";

function App() {

  const [employees, setEmployees] = useState([]);
  const [sorts, setSorts] = useState({
    first: "unsorted",
    last: "unsorted",
    location: "unsorted",
    email: "unsorted"
  })

  useEffect(() => {
    getRandomUsers(10).then((res) => {
      setEmployees(res.data.results);
    });
  }, []);

  function sortBy(cat) {
    let sortedEmployees = [];
    sortedEmployees = [...employees].sort((a, b) => {
      let m = 1;
      if (sorts[cat] === "asc") {
        m = -1;
        setSorts({ first: "unsorted", last: "unsorted", location: "unsorted", email: "unsorted", [cat]: "dec" });
      } else {
        setSorts({ first: "unsorted", last: "unsorted", location: "unsorted", email: "unsorted", [cat]: "asc" })
      }
      switch (cat) {
        case "first":
          if (a.name.first > b.name.first) return 1 * m;
          if (b.name.first > a.name.first) return -1 * m;
          return 0;
        case "last":
          if (a.name.last > b.name.last) return 1 * m;
          if (b.name.last > a.name.last) return -1 * m;
          return 0;
        case "location":
          if (a.location.country > b.location.country) return 1 * m;
          if (b.location.country > a.location.country) return -1 * m;
          if (a.location.state > b.location.state) return 1 * m;
          if (b.location.state > a.location.state) return -1 * m;
          if (a.location.city > b.location.city) return 1 * m;
          if (b.location.city > a.location.city) return -1 * m;
          return 0;
        case "email":
          if (a.email > b.email) return 1 * m;
          if (b.email > a.email) return -1 * m;
          return 0;
        default: return 0;
      }
    })
    setEmployees(sortedEmployees);
  }

  return (
    <div className="App">
      <EmployeeContext.Provider value={employees}>
        <SortContext.Provider value={sorts}>
          <Header />
          <EmployeeTable sortBy={sortBy} />
        </SortContext.Provider>
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
