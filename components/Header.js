import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import Head from 'next/head';

const nav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Map',
    href: '/map',
  },
  {
    title: 'Resources',
    href: '/resources',
  },
  {
    title: 'Prizes',
    href: '/prizes',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
  // {
  //   title: 'Apply',
  //   href: 'https://apply.calhacks.io',
  //   action: true,
  // },
  // {
  //   title: 'Hacker Guide',
  //   href: 'https://docs.google.com/document/d/1jrxv9NAS7HvXwPl0PpgxeYqEfPxwQlCfpWD2cf36LDE/edit?usp=sharing',
  //   action: true,
  // },
];

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <header>
        <i className="material-icons icon" onClick={this.toggleMenu}>
          menu
        </i>
        <img
          id="logo"
          src="https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/live/logo.svg"
          alt="logo"
          onClick={() => (window.location.href = '/')}
        />
        <div id="topnav" className={this.state.open ? 'responsive-open' : ''}>
          {nav.map(({ title, href, action }) => (
            <NavBarItem
              key={title}
              title={title}
              href={href}
              onClick={this.toggleMenu}
              action={action}
              active={typeof window != 'undefined' ? window.location.pathname === href : false}
            />
          ))}
        </div>
        <Head>
          <title>Cal Hacks: Live</title>
        </Head>
      </header>
    );
  }
}

class NavBarItem extends React.Component {
  render() {
    const { action, active, href, onClick, title } = this.props;

    return (
      <a className={cn({ action, active })} href={href} target={action ? '_blank' : '_top'} onClick={onClick}>
        {title}
      </a>
    );
  }
}

NavBarItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
