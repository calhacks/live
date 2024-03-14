import PropTypes from 'prop-types';
import React, { useState } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

const Header = ({ config }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header>
      <i className="material-icons icon" onClick={toggleMenu}>
        menu
      </i>
      <img id="logo" src={config.logo} alt="logo" onClick={() => router.push('/')} />
      <div id="topnav" className={open ? 'responsive-open' : ''}>
        {nav.map(({ title, href, action }) => (
          <NavBarItem key={title} title={title} href={href} action={action} active={router.pathname === href} />
        ))}
      </div>
      <Head>
        <title>Cal Hacks: Live</title>
      </Head>
    </header>
  );
};

const NavBarItem = ({ action, active, href, onClick, title }) => {
  return (
    <Link href={href} className={cn({ action, active })} target={action ? '_blank' : '_top'}>
      {title}
    </Link>
  );
};

NavBarItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Header;
