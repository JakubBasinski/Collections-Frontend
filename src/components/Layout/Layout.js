import * as React from 'react';
import Navbar from './Navigation';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
