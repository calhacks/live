import Footer from '../components/Footer';
import Header from '../components/Header';
import Banner from '../components/Banner';
import React from 'react';
import getConfiguration from '../lib/configuration';

const MapPage = ({ config }) => {
  return (
    <>
      <Banner config={config} />
      <Header config={config} />

      <div id="maps">
        <h1>Venue Map:</h1>
        <img
          src={config.map}
          alt="Cal Hacks Venue Map"
          style={{ width: '95%', maxWidth: '1600px', margin: '20px 40px', padding: '0 20px' }}
        />
      </div>

      <Footer />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      config: await getConfiguration(),
    },
    revalidate: 60, // Re-generate page after 60 seconds
  };
}

export default MapPage;
