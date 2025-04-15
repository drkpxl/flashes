// gatsby-ssr.js
import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      key="google-fonts-css"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500..700;1,500..700&display=swap"
      rel="stylesheet"
    />,
  ]);
};
