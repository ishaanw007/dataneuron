// App.js

import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';

const App = () => {
  const handleResize = (index, { size }) => {
    // Handle resizing logic here
    console.log(`Resized component ${index} to ${size.width}x${size.height}`);
  };

  return (
    <div className="app-container">
      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(1, data)}>
        <div>Component 1</div>
      </ResizableBox>

      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(2, data)}>
        <div>Component 2</div>
      </ResizableBox>

      <ResizableBox className="resizable-component" width={200} height={300} onResize={(e, data) => handleResize(3, data)}>
        <div>Component 3</div>
      </ResizableBox>
    </div>
  );
};

export default App;
