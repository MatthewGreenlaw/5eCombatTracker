import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {
  Toast,
  ToastHeader,
  ToastBody,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import "./styles.css";

export default class Dice extends React.Component {
  static propTypes = {
    nth: PropTypes.number,
    n: PropTypes.number,
    die: PropTypes.number,
    mod: PropTypes.number,
    res: PropTypes.string,
    advantage: PropTypes.bool,
    disadvantage: PropTypes.bool,
    removable: PropTypes.bool
  };

  constructor(props){
    super(props)

    this.state = {
      advantage: false,
      disadvantage: false,
      critical: false,
    }
  }

  render() {
    var nth = this.props.nth === undefined ? 0 : this.props.nth
    var n = this.props.n === undefined ? 1 : this.props.n
    var die = this.props.die === undefined ? 2 : this.props.die
    var dice = this.props.dice === undefined ? [2, 4, 6, 8, 10, 12, 20] : this.props.dice
    var mod = this.props.mod === undefined ? 0 : this.props.mod
    var res = this.props.res === undefined ? 0 : this.props.res
    var hidden = this.props.hidden === undefined ? false : this.props.hidden
    console.log("DiceRemix.render: %s", mod)

    var updateParent = () => {
      this.props.callback({
        nth: nth,
        n: n,
        die: die,
        mod: mod,
        res: res,
        advantage: this.state.advantage,
        disadvantage: this.state.disadvantage,
        critical: this.state.critical,
        hidden: hidden
      })
    }

    var toggleAdvantage = () => {
      var advantage = !this.state.advantage
      this.setState({advantage}, () => updateParent())
    }

    var togglepDisadvantage = () => {
      var disadvantage = !this.state.disadvantage
      this.setState({disadvantage}, () => updateParent())
    }

    var toggleCritical = () => {
      var critical = !this.state.critical
      this.setState({critical}, () => updateParent())
    }

    var attackDie = () => {
      return (
        <Form inline>
          <FormGroup check>
            <Label check sm={2}>
              <Input
                type="checkbox"
                onChange={toggleAdvantage}
                checked={this.state.advantage}
                className={"diceInput"}
              />{" "}
              Advantage{" "}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check sm={2}>
              <Input
                type="checkbox"
                onChange={togglepDisadvantage}
                checked={this.state.disadvantage}
                className={"diceInput"}
              />{" "}
              Disadvantage{" "}
            </Label>
          </FormGroup>
        </Form>
      );
    };

    var criticalDie = () => {
      return (
        <Form inline>
          <FormGroup check>
            <Label check sm={2}>
              <Input
                type="checkbox"
                onChange={toggleCritical}
                checked={this.state.critical}
                className={"diceInput"}
              />
              Critical
            </Label>
          </FormGroup>
        </Form>
      );
    };

    var dieType = () => {
        return die === 20 ? attackDie() : criticalDie();
    };

    var enableN = () => {
      return (
        <Label>
          <Input
            type="number"
            onChange={e =>  {n = +e.target.value; updateParent()}}
            placeholder={n}
            className={"diceInput"}
          />
          {" d "}
        </Label>
      );
    };

    var disableN = () => {
      var _n = 1;
      if((this.state.advantage && this.state.disadvantage))
        _n = 1
      else if(this.state.advantage && this.props.disableN || this.state.disadvantage && this.props.disableN)
        _n = 2

      return (

        <Label>
          <Input
            type="number"
            placeholder={_n}
            className={"diceInput"}
            readOnly
          />
          {" d "}
        </Label>
      );
    };

    var diceOptions = () => {
      return dice.map((die, i) => {return <option key={i}>{die}</option>})
    }

    return (
      <Toast fade={false} className={"dice"}>
        {this.props.hideType ? null :
           <ToastHeader toggle={this.props.removable ? this.hide : null}>
            {dieType()}
          </ToastHeader>
        }

        <ToastBody>
          <Form inline>
            <FormGroup inline>
              {this.state.advantage || this.state.disadvantage || this.props.disableN
                ? disableN()
                : enableN()}
              <Label>
                <Input
                  type="select"
                  onChange={e =>  {die = +e.target.value; updateParent()}}
                  placeholder={die}
                  defaultValue={die}
                  className={"diceInput"}
                >
                  {diceOptions()}
                </Input>
              </Label>
              <Label>
                {" + "}
                <Input
                  type="number"
                  onChange={e => {mod = +e.target.value; updateParent()}}
                  placeholder={mod}
                  className={"diceInput"}
                />
              {this.props.hideResult ? null :
                <Fragment>
                  {" = "}
                  <Input
                    type="text"
                    value={res}
                    className={"diceInput"}
                    readOnly
                  />
                </Fragment>
              }

              </Label>
            </FormGroup>
          </Form>
        </ToastBody>
      </Toast>
    );
  }
}
