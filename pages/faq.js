import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Question from '../components/Question';
import Banner from '../components/Banner';
import React from 'react';
import { apiBaseUrl } from '../lib/constants';
import getConfiguration from '../lib/configuration';

const FAQPage = ({ data, config }) => {
  return (
    <>
      <Banner config={config} />
      <Header config={config} />

      <div id="content">
        <h1>FAQ &amp; Safety Information</h1>
        <h2>If there is an immediate threat to life, call 911 and 510-642-3333 (UC Emergency Response)</h2>
        {data ? (
          <div id="faq">
            {data.map((section, index) => (
              <div key={index}>
                <h2>{section.title}</h2>
                {section.questions.map((data, index) => (
                  <Question key={index} question={data.q} answer={data.a} />
                ))}
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
    const res = await fetch(`${apiBaseUrl}/live/faq`);
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

export default FAQPage;
