import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import React from 'react';
import SponsorPack from '../components/SponsorPack';
import { apiBaseUrl } from '../lib/constants';
import getConfiguration from '../lib/configuration';

const ResourcesPage = ({ data, config }) => {
  return (
    <>
      <Banner config={config} />
      <Header config={config} />

      <div id="content">
        <h1>Resources</h1>

        {data ? (
          data.map(({ name, packs }) => (
            <div className="resource-section" key={name}>
              <h2>{name}</h2>
              <div className="sponsor-packs">
                {packs.map((pack, index) => (
                  <SponsorPack key={index} {...pack} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>

      <Footer />
    </>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch(`${apiBaseUrl}/live/resources`);
    const { categories } = await res.json();

    return {
      props: {
        data: categories,
        config: await getConfiguration(),
      },
      revalidate: 60, // Re-generate page after 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        config: await getConfiguration(),
      },
    };
  }
}

export default ResourcesPage;
