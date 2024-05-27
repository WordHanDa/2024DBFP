import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MapWithMarkerCluster from './map';

const Datagrid = ({ selectedLocation }) => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: '醫院名稱', headerName: '醫院名稱', width: 200 },
    { field: '醫院電話', headerName: '醫院電話', width: 200 },
    { field: '醫事機構代碼', headerName: '醫事機構代碼', width: 200 },
    { field: '醫院地址', headerName: '醫院地址', width: 400 },
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filteredData = rows.filter(row => 
        row['醫院地址'].includes(selectedLocation)
      );
      setFilteredRows(filteredData);
    };

    if (rows.length > 0) {
      applyFilters();
    }
  }, [selectedLocation, rows]);

  const handleSelectionChange = (selectionModel) => {
    const selectedIDs = new Set(selectionModel);
    const selectedData = rows.filter(row => selectedIDs.has(row.id));
    setSelectedRows(selectedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>附近的醫院或衛生所</h1>
      </div>
      <div style={{ height: 400, width: '80%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={handleSelectionChange}
        />
      </div>
      <div style={{ width: '80%', marginTop: 50 }}>
        <MapWithMarkerCluster selectedRows={selectedRows} />
      </div>
    </div>
  );
}

export default Datagrid;
