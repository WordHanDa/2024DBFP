import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Datagrid = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  const columns = [
    { field: '醫療院所名稱', headerName: '醫療院所名稱', width: 200 },
    { field: '抗蛇毒血清種類', headerName: '抗蛇毒血清種類', width: 200 },
    { field: '經度', headerName: '經度', width: 200 },
    { field: '緯度', headerName: '緯度', width: 200 },
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

  function handleSearch(event) {
    const searchInput = event.target.value.toLowerCase();
    const filteredData = rows.filter(data => 
      data.醫療院所名稱.toLowerCase().includes(searchInput)
    );
    setFilteredRows(filteredData);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ height: 400, width: '80%', margin: 'auto' }}>
      <input type="text" placeholder="輸入名稱進行搜尋..." onChange={handleSearch}/>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5}/>
    </div>
  );
}

export default Datagrid;
