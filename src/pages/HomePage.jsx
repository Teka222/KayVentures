import React from 'react';
import Header from '../components/Header';
import DestinationSearch from '../components/DestinationSearch';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-xl">KayVentures!</h2>
        <p className="mt-4">Plan your next adventure effortlessly.</p>
        <DestinationSearch />
      </main>
    </div>
  );
};

export default HomePage;
