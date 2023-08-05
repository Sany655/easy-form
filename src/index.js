import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preview from './Pages/Preview';
import NoPage from './Pages/NoPage';
import CreateForm from './Pages/CreateForm';
import Demo from './Demo'
import Landing from './Pages/Landing';
import Forms from './Pages/Forms';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/preview/:id' element={<Preview />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

  // <Demo />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
