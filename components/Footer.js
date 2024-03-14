import React from 'react';

const Footer = (props) => (
  <footer {...props}>
    <div id="footer-links">
      <a href="https://www.facebook.com/CalHacks/" target="_blank" rel="noopener noreferrer">
        <img
          className="connect-icon"
          src="https://calhacks-sierra.s3-us-west-2.amazonaws.com/assets/branding/facebook.svg"
          alt="facebook"
        />
      </a>
      <a href="https://twitter.com/CalHacks" target="_blank" rel="noopener noreferrer">
        <img
          className="connect-icon"
          src="https://calhacks-sierra.s3-us-west-2.amazonaws.com/assets/branding/twitter.svg"
          alt="twitter"
        />
      </a>
      <a href="https://www.instagram.com/calhacks/" target="_blank" rel="noopener noreferrer">
        <img
          className="connect-icon"
          src="https://calhacks-sierra.s3-us-west-2.amazonaws.com/assets/branding/instagram.svg"
          alt="instagram"
        />
      </a>
    </div>
    <h4 id="footer-tagline">Made with &lt;3 by Cal Hacks.</h4>
  </footer>
);

export default Footer;
