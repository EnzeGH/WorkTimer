import React from 'react';
import ReactDOM from 'react-dom/client';

/* CSS */
import './main.css';

/* Pages */
import WorkTimerApp from './WorkTimerApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WorkTimerApp />
    </React.StrictMode>
);
