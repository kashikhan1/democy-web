import React, { Component,useState } from 'react'
import jwt_decode from 'jwt-decode'
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";
import createRowData from "./createRowData";

// import "./styles.css";

const defaultColumnProperties = {
  filterable: true
};

const selectors = Data.Selectors;
const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters;
const columns = [
  {
    key: "id",
    name: "User ID",
    filterRenderer: NumericFilter
  },
  {
    key: "question",
    name: "Question",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "postcode",
    name: "Postcode",
    filterRenderer: MultiSelectFilter
  },
  {
    key: "sex",
    name: "Sex",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "birth",
    name: "Birth Year",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "answer",
    name: "Answer",
    filterRenderer: AutoCompleteFilter
  }
].map(c => ({ ...c, ...defaultColumnProperties }));



const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function Example({ rows }) {
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={filter => setFilters(handleFilterChange(filter))}
      onClearFilters={() => setFilters({})}
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
    />
  );
}
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }

  render() {
    return (
      <div>
<Example rows={createRowData(50)} />
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
    )
  }
}

export default Profile
