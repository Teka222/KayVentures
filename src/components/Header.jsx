import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">KayVentures</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-blue-300">Home</a></li>
          <li><a href="/destinations" className="hover:text-blue-300">Destinations</a></li>
          <li><a href="/itinerary" className="hover:text-blue-300">Itinerary</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
