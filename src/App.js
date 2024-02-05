// App.js
import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Modal from 'react-modal'; // Import the Modal component from react-modal
import './App.css';
import axios from 'axios';
import { toast } from "react-toastify";



// Set the root element for the Modal
Modal.setAppElement('#root');

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [dataToAdd, setDataToAdd] = useState('');
  const [addCount, setaddCount] = useState(0);
  const [updateCount, setupdateCount] = useState(0);
  const [existingData, setExistingData] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    // Fetch existing data for the update modal (replace this with your API call)
    fetchDataForUpdate();
    countdata();

  }, []);

  const fetchDataForUpdate = async () => {
    try {
      // Replace this with your actual API endpoint for fetching existing data
      const response = await axios.get(`http://localhost:5000/api/fetch`);
      console.log(response,"j")
      setExistingData(response.data.data);
    } catch (error) {
      console.error('Error fetching existing data:', error);
    }
  };

  const handleResize = (index, { size }) => {
    // Handle resizing logic here
    console.log(`Resized component ${index} to ${size.width}x${size.height}`);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleComponentChange = (e) => {
    setSelectedComponent(Number(e.target.value));
  };

  const handleDataChange = (e) => {
    setDataToAdd(e.target.value);
  };

  const handleAddData = async () => {
    try {
      // Replace this with your actual API endpoint for adding data
      await axios.post('http://localhost:5000/api/add', { componentId: selectedComponent, data: dataToAdd });
      countdata()
      fetchDataForUpdate();

      closeAddModal();
    } catch (error) {
      closeAddModal();
      toast.error(error?.response?.data?.error|| "Something went wrong");    }
  };

  const countdata = async () => {
    try {
      // Replace this with your actual API endpoint for adding data
      let count=await axios.get('http://localhost:5000/api/stats');
      console.log(count)
      setaddCount(count.data.addCount)
      setupdateCount(count.data.updateCount)
      closeAddModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  

  const handleUpdateData = async () => {
    try {
      // Replace this with your actual API endpoint for updating data
      await axios.post(`http://localhost:5000/api/update`, {  componentId: selectedComponent, data: dataToAdd });
      countdata()
      fetchDataForUpdate();

      closeUpdateModal();
    } catch (error) {
      console.log(error)
      closeUpdateModal();
      toast.error(error?.response?.data?.error|| "Something went wrong");
    }
  };

  return (
  <div className="app-container">
     

  <div className="buttons-container">
    <button className="buttons" onClick={openAddModal}>Add</button>
    <button className="buttons" onClick={openUpdateModal}>Update</button>
  <h3>ADD COUNTER - {addCount}</h3>
  <h3>UPDATE COUNTER - {updateCount}</h3>
  </div>


      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Data Modal"
        className="modal"
      >
        <h2>Add Data</h2>
        <label>Select Component:</label>
        <select value={selectedComponent} onChange={handleComponentChange}>
          <option value={1}>Component 1</option>
          <option value={2}>Component 2</option>
          <option value={3}>Component 3</option>
        </select>
        <label>Data:</label>
        <input type="text" value={dataToAdd} onChange={handleDataChange} />
        <button   onClick={handleAddData}>Add Data</button>
        <button   onClick={closeAddModal}>Cancel</button>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Data Modal"
        className="modal"

      >
        <h2>Update Data</h2>
        <label>Select Component:</label>
        <select value={selectedComponent} onChange={handleComponentChange}>
          <option value={1}>Component 1</option>
          <option value={2}>Component 2</option>
          <option value={3}>Component 3</option>
        </select>
        <div> </div>
        <label>New Data:</label>
        <input type="text" value={dataToAdd} onChange={handleDataChange} />
        <button    onClick={handleUpdateData}>Update Data</button>
        <button   onClick={closeUpdateModal}>Cancel</button>
      </Modal>
      <div className='componentcontainer'>


      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(1, data)}>
        <div>Component 1</div>--
        <div>
            {existingData.find((component) => component.componentId === 1)?.data || '-- No Data --'}
          </div>
      </ResizableBox>

      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(2, data)}>
        <div>Component 2</div>--
        <div>
            {existingData.find((component) => component.componentId === 2)?.data || '-- No Data --'}
          </div>
      </ResizableBox>

      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(3, data)}>
        <div>Component 3</div>--
        <div>
            {existingData.find((component) => component.componentId === 3)?.data || '-- No Data --'}
          </div>
      </ResizableBox>
    </div>
  </div>

  );
};

export default App;
