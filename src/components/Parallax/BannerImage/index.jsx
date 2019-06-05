import React from "react";
import PropTypes from "prop-types";

export default class BannerImage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    height: PropTypes.number,
    opacity: PropTypes.number,
    grey: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.src = ''
    this.height = .5;
    this.opacity = 0.2
    this.grey = 0;
  }

  render() {

    const containerStyle = {
      position: 'relative',
      minHeight: window.innerHeight*this.props.height,
      backgroundImage: 'url(' + this.props.src + ')',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      opacity: this.props.opacity,
      WebkitBackfaceVisibility: 'hidden',
      display:"block",

      WebkitFilter: "grayscale(" +this.props.grey+ "%)",
      filter: "grayscale(" +this.props.grey+ "%)",
    }

    const textStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      MsTransform: 'translate(-50%,-50%)',
      whiteSpace: 'nowrap',
    }

    return (
      <div style={containerStyle}>
        <div style={textStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}