import * as React from 'react';
import Navbar from './Navigation';

const Layout = (props) => {
  return (
    <React.Fragment >
      <Navbar />
     {props.children}
    </React.Fragment>
  );
};

export default Layout;
