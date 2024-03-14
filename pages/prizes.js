import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import React from 'react';
import { apiBaseUrl } from '../lib/constants';
import getConfiguration from '../lib/configuration';

const PrizesPage = ({ data, config }) => {
  return (
    <>
      <Banner config={config} />
      <Header config={config} />

      <div id="content">
        <h1>Prizes</h1>

        {data ? (
          <div id="prizes">
            <div id="prize-header">
              <span>Category</span>
              <span>Awarded By</span>
              <span>Prize</span>
              <span>Link</span>
            </div>

            {data.map(({ category, by, item, link: { url } }, prizeIdx) => (
              <div key={`prize${prizeIdx}`}>
                <div className="desktop">
                  <span>{category}</span>
                </div>
                <div className="desktop">
                  <span>{by}</span>
                </div>
                <div className="desktop">
                  <span>{item}</span>
                </div>
                <div className="mobile">
                  <span>{item}</span>
                  <span>
                    {category} | {by}
                  </span>
                </div>
                {url && (
                  <div className="prize-link">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
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
    const res = await fetch(`${apiBaseUrl}/live/prizes`);
    const { prizes } = await res.json();

    return {
      props: {
        data: prizes,
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

export default PrizesPage;
