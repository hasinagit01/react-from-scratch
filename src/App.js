import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './components/Home';
import ProductList from './components/Products/ProductList';
import AnnouncementList from './components/Announcements/AnnouncementList';
import { ProductProvider } from './contexts/ProductContext';
import { AnnouncementProvider } from './contexts/AnnouncementContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <AnnouncementProvider>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/announcements" element={<AnnouncementList />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AnnouncementProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
