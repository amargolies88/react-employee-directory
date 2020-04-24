import React, { useState, useEffect } from 'react';
import getRandomUsers from "./utils/API";
import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import EmployeeContext from "./components/EmployeeContext";
import SortContext from './components/SortContext';
import FilterContext from "./components/FilterContext";
import './App.css';

function App() {
  const [filter, setFilter] = useState({
    handleInputChange: handleInputChange,
    nameFilter: ""
  });

  const [employees, setEmployees] = useState([]);

  const [sorts, setSorts] = useState({
    first: "unsorted",
    last: "unsorted",
    location: "unsorted",
    email: "unsorted"
  });

  useEffect(() => {
    getRandomUsers(10).then((res) => {
      setEmployees(res.data.results);
    });
  }, []);

  //cat argument is category to sort by
  function sortBy(cat) {
    let sortedEmployees = [];
    sortedEmployees = [...employees].sort((a, b) => {
      // m is used to flip the sign of return from .sort(). flipping the sign reverses the order
      let m = 1;
      if (sorts[cat] === "asc") {
        // if the category is already sorted ascending... flip the sign to sort it as decending and mark this category as sorted decending ("dec")
        m = -1;
        setSorts({ first: "unsorted", last: "unsorted", location: "unsorted", email: "unsorted", [cat]: "dec" });
      } else {
        // else mark this category as sorted ascending ("asc")
        setSorts({ first: "unsorted", last: "unsorted", location: "unsorted", email: "unsorted", [cat]: "asc" })
      }
      // returning 1 orders a before b, returning -1 orders b before a. a negative "m" value reverses that as described above
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
    // set the sorted array to the main employee array which will be displayed on state change
    setEmployees(sortedEmployees);
  }

  // sets a new filter value whenever user types in the input box from ./components/Header.js
  function handleInputChange(event) {
    const userInput = event.target.value;
    setFilter({ ...filter, nameFilter: userInput });
  }

  return (
    <div className="App">
      <EmployeeContext.Provider value={employees}>
        <SortContext.Provider value={sorts}>
          <FilterContext.Provider value={filter}>
            <Header />
            <EmployeeTable sortBy={sortBy} />
          </FilterContext.Provider>
        </SortContext.Provider>
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
