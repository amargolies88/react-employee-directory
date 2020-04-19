import React from 'react';
import logo from './logo.svg';
import getRandomUsers from "./utils/API";
import { FilterProvider } from "./utils/GlobalState";
import EmployeeTable from "./components/EmployeeTable";
import './App.css';

function App() {
  getRandomUsers(10).then(response => console.log(response.data.results));
  return (

    <FilterProvider>
      <div className="App">
        <EmployeeTable />
      </div>
    </FilterProvider>

  );
}

export default App;
