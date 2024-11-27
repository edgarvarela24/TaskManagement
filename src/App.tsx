import React from 'react';
import { TaskManagement } from "./features/tasks/components/TaskManagement";

function App() {
  return (
      <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
          <TaskManagement/>
      </div>
  );
}

export default App;