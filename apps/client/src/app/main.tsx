import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '../contexts/auth';
import { TaskProvider } from '../contexts/task';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
);
