import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Papa from 'papaparse';
import axios from 'axios';

const Datagrid = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const columns = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'antivenomType', headerName: 'Antivenom Type', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'district', headerName: 'District', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'longitude', headerName: 'Longitude', width: 150 },
    { field: 'latitude', headerName: 'Latitude', width: 150 },
    { field: 'code', headerName: 'Code', width: 200 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://od.cdc.gov.tw/rdvd/snake_place.csv");
        const csvData = response.data;
        
        // Parse CSV data using PapaParse
        const { data } = Papa.parse(csvData, { header: true });
        
        // Ensure each row has a unique ID
        const rowsWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

        setRows(rowsWithIds);
        setFilteredRows(rowsWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  function handleSearch(event) {
    const searchInput = event.target.value.toLowerCase();
    const filteredData = rows.filter(data => 
      data.name.toLowerCase().includes(searchInput)
    );
    setFilteredRows(filteredData);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ height: 400, width: '50%', margin: 'auto' }}>
      <input type="text" placeholder="Enter name to search..." onChange={handleSearch}/>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5}/>
    </div>
  );
}

export default Datagrid;
