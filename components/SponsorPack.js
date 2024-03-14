import PropTypes from 'prop-types';
import React from 'react';

const SponsorPack = ({ name, url, imageUrl }) => (
  <a className="sponsor-pack" href={url} target="_blank" rel="noopener noreferrer">
    <img style={{ paddingBottom: '20px' }} className="pack-image" src={imageUrl} alt="sponsor pack"></img>
    <h2>{name}</h2>
  </a>
);

SponsorPack.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default SponsorPack;
