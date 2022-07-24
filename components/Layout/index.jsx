import React from "react";
import Navigationbar from "../Navigationbar";
import Footer from '../../components/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navigationbar />
      <div style={{flex: 1}}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
