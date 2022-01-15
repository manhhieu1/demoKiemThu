import React from "react";

const Footer = ({ ...otherProps }) => {
  return (
    <footer className="bg-gray-600">
      <div className="w-full max-w-7xl mx-auto py-8 px-2.5 text-center">
        <span className="text-base text-white ">
          COPYRIGHT © 2021 - Đinh Mạnh Hiếu
        </span>
      </div>
    </footer>
  );
};

export default Footer;
