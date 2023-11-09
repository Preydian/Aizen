import React from 'react';
import './App.css';
import './css/film.css';
import './css/header.css';
import './css/filters.css';
import './css/profile.css';
import './css/animation.css';
import './css/loading.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Films from "./components/Films";
import Movies from "./components/Movies";
import Shows from "./components/Shows";
import Watch from "./components/Watch";
import Film from "./components/Film";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
        .register('/service-worker.js') // specify the path to your service worker file
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
  });
}

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Films/>}/>
              <Route path="/films" element={<Films/>}/>
              <Route path="/movies/" element={<Movies/>}/>
              <Route path="/movie/:id" element={<Watch/>}/>
              <Route path="/shows" element={<Shows/>}/>
              <Route path="/tv/:id" element={<Watch/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/films/:id" element={<Film/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;
