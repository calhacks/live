import Footer from '../components/Footer';
import Header from '../components/Header';
import React from 'react';

const MapPage = () => {
  return (
    <>
      <Header />

      <div id="maps">
        <h1>Venue Map:</h1>
        <img
          src="https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/hackathonsatberkeley/map.png"
          alt="Cal Hacks 10.0 Venue Map"
          style={{ width: '95%', maxWidth: '1600px', margin: '20px 40px', padding: '0 20px' }}
        />
      </div>

      <Footer />
    </>
  );
};

export default MapPage;
