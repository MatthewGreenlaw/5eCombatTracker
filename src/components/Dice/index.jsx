import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {
  Toast,
  ToastHeader,
  ToastBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./styles.css";

export default class Dice extends React.Component {
  static propTypes = {
    nth: PropTypes.number,
    n: PropTypes.number,
    die: PropTypes.number,
    mod: PropTypes.number,
    res: PropTypes.number,
    advantage: PropTypes.bool,
    disadvantage: PropTypes.bool,
    removable: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.hide = this.hide.bind(this);

    this.state = {
      nth: this.props.nth,
      n: this.props.n,
      die: this.props.die,
      dice: this.props.dice === undefined ? [2, 4, 6, 8, 10, 12, 20] : this.props.dice,
      mod: this.props.mod,
      res: this.props.res,
      advantage: false,
      disadvantage: false,
      critical: false,
      hidden: false
    };
  }

  setN(n) {
    this.setState({ n: n, res: 0 });

    this.props.callback(
      {
        nth: this.state.nth,
        n: n,
        die: this.state.die,
        mod: this.state.mod,
        res: 0,
        advantage: this.state.advantage,
        disadvantage: this.state.disadvantage,
        critical: this.statecritical,
        hidden: this.state.hidden
      },
      false
    );
  }

  setDie(die) {
    this.setState({ die: die, res: 0 });
    this.props.callback(
      {
        nth: this.state.nth,
        n: this.state.n,
        die: die,
        mod: this.state.mod,
        res: 0,
        advantage: this.state.advantage,
        disadvantage: this.state.disadvantage,
        critical: this.state.critical,
        hidden: this.state.hidden
      },
      false
    );
  }

  setMod(mod) {
    this.setState({ mod, res: 0 });
    this.props.callback(
      {
        nth: this.state.nth,
        n: this.state.n,
        die: this.state.die,
        mod: mod,
        res: 0,
        advantage: this.state.advantage,
        disadvantage: this.state.disadvantage,
        critical: this.statecritical,
        hidden: this.state.hidden
      },
      false
    );
  }

  hide() {
    this.setState({ hidden: true });
    this.props.callback(
      {
        nth: this.state.nth,
        hidden: true
      },
      true
    );
  }

  render() {
    // console.log(this.state)
    var setAdvantage = () => {
      this.props.callback(
        {
          nth: this.state.nth,
          n: 1, //Advantage rolls limited to 1 primary dice
          die: this.state.die,
          mod: this.state.mod,
          res: 0,
          advantage: !this.state.advantage,
          disadvantage: this.state.disadvantage,
          critical: this.statecritical,
          hidden: this.state.hidden
        },
        false
      );
      this.setState({ advantage: !this.state.advantage, n: 1, res: 0 });
    };

    var setDisadvantage = () => {
      this.props.callback(
        {
          nth: this.state.nth,
          n: 1, //Disadvantage rolls limited to 1 primary dice
          die: this.state.die,
          mod: this.state.mod,
          res: 0,
          advantage: this.state.advantage,
          disadvantage: !this.state.disadvantage,
          critical: this.statecritical,
          hidden: this.state.hidden
        },
        false
      );
      this.setState({ disadvantage: !this.state.disadvantage, n: 1, res: 0 });
    };

    var setCritical = () => {
      this.props.callback(
        {
          nth: this.state.nth,
          n: this.state.n,
          die: this.state.die,
          mod: this.state.mod,
          res: 0,
          advantage: this.state.advantage,
          disadvantage: this.state.disadvantage,
          critical: !this.statecritical,
          hidden: this.state.hidden
        },
        false
      );
      this.setState({ critical: !this.state.critical, res: 0 });
    };

    var attackDie = () => {
      return (
        <Form inline>
          <FormGroup check>
            <Label check sm={2}>
              <Input
                type="checkbox"
                onChange={setAdvantage}
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
                onChange={setDisadvantage}
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
                onChange={setCritical}
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
        return this.state.die === 20 ? attackDie() : criticalDie();
    };

    var enableN = () => {
      return (
        <Label>
          <Input
            type="number"
            onChange={e => this.setN(+e.target.value)}
            placeholder={this.state.n}
            className={"diceInput"}
          />
          {" d "}
        </Label>
      );
    };

    var disableN = () => {
      if(this.state.advantage && this.state.disadvantage){
        return (
          <Label>
            <Input
              type="number"
              value={1}
              className={"diceInput"}
              readOnly
            />
            {" d "}
          </Label>
        );
      }
      return (
        <Label>
          <Input
            type="number"
            value={2}
            className={"diceInput"}
            readOnly
          />
          {" d "}
        </Label>
      );
    };

    var diceOptions = () => {
      var dice = this.state.dice
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
              {this.state.die === 20 && (this.state.advantage || this.state.disadvantage)
                ? disableN()
                : enableN()}
              <Label>
                <Input
                  type="select"
                  onChange={e => this.setDie(+e.target.value)}
                  placeholder={this.state.die}
                  defaultValue={20}
                  className={"diceInput"}
                >
                  {diceOptions()}
                </Input>
                {" + "}
              </Label>
              <Label>
                <Input
                  type="number"
                  onChange={e => this.setMod(+e.target.value)}
                  placeholder={this.state.mod}
                  className={"diceInput"}
                />
                <Fragment>
                  {" = "}
                  <Input
                    type="text"
                    value={this.props.res}
                    className={"diceInput"}
                    readOnly
                  />
                </Fragment>


              </Label>
            </FormGroup>
          </Form>
        </ToastBody>
      </Toast>
    );
  }
}
