import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import React from 'react';
import { apiBaseUrl } from '../lib/constants';

const PrizesPage = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${apiBaseUrl}/live/prizes`)
      .then(async (res) => {
        const { prizes } = await res.json();
        setData(prizes);
      })
      .catch((err) => console.error(err));
  }, [setData]);

  return (
    <>
      <Header />

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

export default PrizesPage;
