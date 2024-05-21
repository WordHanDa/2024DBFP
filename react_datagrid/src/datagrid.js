import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MapWithMarkerCluster from './map';

const Datagrid = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: '醫院名稱', headerName: '醫院名稱', width: 200 },
    { field: '醫院地址', headerName: '醫院地址', width: 200 },
    { field: '醫院電話', headerName: '醫院電話', width: 200 },
    { field: '醫事機構代碼', headerName: '醫事機構代碼', width: 200 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/convert.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Ensure each row has a unique ID
        const rowsWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

        setRows(rowsWithIds);
        setFilteredRows(rowsWithIds); // Initialize filtered rows with all rows
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filteredData = rows.filter(data => 
      data.醫療院所名稱.toLowerCase().includes(searchInput)
    );
    setFilteredRows(filteredData);
  };

  const handleSelectionChange = (selectionModel) => {
    console.log("Selection Model:", selectionModel); // Add this line
    const selectedIDs = new Set(selectionModel);
    const selectedData = rows.filter(row => selectedIDs.has(row.id));
    setSelectedRows(selectedData);
    console.log("Selected Rows:");
    selectedData.forEach(row => {
      console.log(`Latitude: ${row.緯度}, Longitude: ${row.經度}`);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ height: 400, width: '80%' }}>
      <input type="text" placeholder="輸入名稱進行搜尋..." onChange={handleSearch} />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
    <div style={{ width: '80%', marginTop: 20 }}>
      <MapWithMarkerCluster selectedRows={selectedRows} />
    </div>
  </div>
  );
}

export default Datagrid;