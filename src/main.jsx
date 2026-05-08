import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('Main starting...');

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('GLOBAL ERROR:', msg, url, lineNo, columnNo, error);
  document.body.innerHTML = `<div style="color: white; background: red; padding: 20px; font-family: monospace;">
    <h1>Runtime Error</h1>
    <pre>${msg}\n${lineNo}:${columnNo}</pre>
  </div>`;
  return false;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
