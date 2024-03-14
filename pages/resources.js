import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import React from 'react';
import SponsorPack from '../components/SponsorPack';
import { apiBaseUrl } from '../lib/constants';

const ResourcesPage = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${apiBaseUrl}/live/resources`)
      .then(async (res) => {
        const { categories } = await res.json();
        setData(categories);
      })
      .catch((err) => console.error(err));
  }, [setData]);

  return (
    <>
      <Header />

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

export default ResourcesPage;
