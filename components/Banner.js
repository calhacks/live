import React from 'react';

const Banner = ({ config }) => {
  return (
    <>
      {config['banner_text'] && (
        <div className="banner">
          {config['banner_url'] ? (
            <a href={config['banner_url']}>
              <p>{config['banner_text']}</p>
            </a>
          ) : (
            <p>{config['banner_text']}</p>
          )}
        </div>
      )}
      <style>
        {`
          :root {
            --color-one: ${config['color-one']};
            --color-two: ${config['color-two']};
            --color-three: ${config['color-three']};
            --color-four: ${config['color-four']};
            --color-five: ${config['color-five']};
          }
          

          `}
      </style>
    </>
  );
};

export default Banner;
