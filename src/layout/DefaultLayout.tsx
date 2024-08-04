import React, { useState, ReactNode } from 'react';
import Header from '../components/includes/header';
import Footer from '../components/includes/footer';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div>
      <Header />
      <div className="main_content_fluid">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
