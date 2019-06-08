import React from "react";

export default class Bannerheader extends React.Component {

  render() {

    const text = {
      textAlign: 'center',
      padding: '16px 32px',
      color: '#fff',
      backgroundColor: '#000',
      fontSize: '24px',
      fontFamily: '"Segoe UI", Arial, sans-serif',
      WebkitAnimation: 'opac 0.8s',
      animation:'opac 0.8s',
      borderRadius:"10px",
    }

    //<span class="w3-center w3-padding-xlarge w3-black w3-xlarge w3-wide w3-animate-opacity">MATT <span class="w3-hide-small"></span> GREENLAW</span>
    return (
      <span style={text}>
        {this.props.children}
      </span>
    );
  }
}
