import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
} from 'reactstrap'
import './styles.scss'


export default class Content extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    shape: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.title = ''
    this.src = '';
    this.alt = '';
    this.shape = '';
  }

  render() {

    const containerStyle = {
      
      minHeight: window.innerHeight*this.props.height,
    }

    function rowChildren( children ) {
      var ret = [];
      if (children.length > 1)
        children.forEach((child, i) => {
          ret.push(
            <Col key={i}> {child} </Col>
          )
        })
      else
        ret = children;
      return ret;
    }

    return (
      <div id={this.props.id} className="content container Parallax-Content" style={containerStyle}>
        <h3 className="center" style={{marginBottom: "2em"}}>{this.props.title}</h3>
        <Row>
          {rowChildren(this.props.children)}
        </Row>
      </div>
    );
  }
}