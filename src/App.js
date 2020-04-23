import React, { useState, useEffect } from 'react';
import getRandomUsers from "./utils/API";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeContext from "./utils/EmployeeContext";
import './App.css';

function App() {

  const [employees, setEmployees] = useState([]);
  const [sorts, setSorts] = useState({
    firstName: "unsorted",
    lastName: "unsorted",
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
    switch (cat) {
      case "first":
        sortedEmployees = [...employees].sort((a, b) => {
          if (a.name.first > b.name.first) return 1;
          if (b.name.first > a.name.first) return -1;
          return 0;
        }); break;
      case "last":
        sortedEmployees = [...employees].sort((a, b) => {
          if (a.name.last > b.name.last) return 1;
          if (b.name.last > a.name.last) return -1;
          return 0;
        }); break;
      case "location":
        sortedEmployees = [...employees].sort((a, b) => {
          if (a.location.country > b.location.country) return 1;
          if (b.location.country > a.location.country) return -1;
          if (a.location.state > b.location.state) return 1;
          if (b.location.state > a.location.state) return -1;
          if (a.location.city > b.location.city) return 1;
          if (b.location.city > a.location.city) return -1;
          return 0;
        }); break;
      default: break;
    }
    setEmployees(sortedEmployees);
  }

  function compareFirstName(a, b) {

  }

  return (
    <div className="App">
      <EmployeeContext.Provider value={employees}>
        <EmployeeTable sortBy={sortBy} />
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
