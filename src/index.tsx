import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import TaskAppContext from './Context/TaskAppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <TaskAppContext>
    <App />
    </TaskAppContext>
);

