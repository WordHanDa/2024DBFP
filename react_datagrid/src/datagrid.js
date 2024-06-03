import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MapWithMarkerCluster from './map';
import Axios from 'axios';

const SERVER_ADDRESS = "http://172.27.6.192:3001";

const Datagrid = ({ selectedLocation }) => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: '醫院名稱', headerName: '醫院名稱', width: 200 },
    { field: '醫院電話', headerName: '醫院電話', width: 200 },
    { field: '醫事機構代碼', headerName: '醫事機構代碼', width: 200 },
    { field: '醫院地址', headerName: '醫院地址', width: 400 },
    { field: '藥品名稱', headerName: '藥品名稱', width: 200 },
  ];

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const response = await Axios.get(`${SERVER_ADDRESS}/hospital`);
        const formattedData = response.data.map((hospital, index) => ({
          id: index,
          醫院名稱: hospital['醫院名稱'],
          醫院電話: hospital['醫院電話'],
          醫事機構代碼: hospital['醫事機構代碼'],
          醫院地址: hospital['醫院地址'],
          藥品名稱: hospital['藥品名稱'],
          road: hospital['road'], // 新增 road
          site: hospital['site'], // 新增 site
          city: hospital['city'] // 新增 city
        }));
        setRows(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        setLoading(false);
      }
    };
    getHospitals();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const { city, district, road, serum } = selectedLocation;
      const filteredData = rows.filter(row => {
        const hasSerum = !serum || row['藥品名稱'] === serum;
        return (
          (!city || row.city === city) &&
          (!district || row.site === district) &&
          (!road || row.road === road) &&
          hasSerum
        );
      });
      setFilteredRows(filteredData);
    };

    if (rows.length > 0) {
      applyFilters();
    }
  }, [selectedLocation, rows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [filteredRows]);

  const handleSelectionChange = (newSelection) => {
    const selectedIDs = new Set(newSelection);
    const selectedData = filteredRows.filter(row => selectedIDs.has(row.id));
    setSelectedRows(selectedData);
    console.log("Selected Hospitals:", selectedData);
  };

  if (loading) return <div>Loading...</div>;

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
          onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
        />
      </div>
      <div style={{ width: '80%', marginTop: 50 }}>
        <MapWithMarkerCluster selectedRows={selectedRows} />
      </div>
    </div>
  );
};

export default Datagrid;
