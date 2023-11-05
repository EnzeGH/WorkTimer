import React from 'react';
import ReactDOM from 'react-dom/client';

/* CSS */
import './main.css';

/* Pages */
import Panel from './pages/Panel';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Panel />
    </React.StrictMode>
);
