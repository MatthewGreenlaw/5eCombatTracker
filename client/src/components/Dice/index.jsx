import React from "react";
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
    res: PropTypes.string,
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
      mod: this.props.mod,
      res: this.props.res,
      advantage: false,
      disadvantage: false,
      critical: false,
      hidden: false
    };
  }

  async setN(n) {
    await this.setState({ n: n, res: 0 });

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

  async setDie(die) {
    await this.setState({ die: die, res: 0 });
    this.props.callback(
      {
        nth: this.state.nth,
        n: this.state.n,
        die: die,
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

  async setMod(mod) {
    await this.setState({ mod, res: 0 });
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

  async hide() {
    await this.setState({ hidden: true });
    this.props.callback(
      {
        nth: this.state.nth,
        hidden: true
      },
      true
    );
  }

  render() {
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
                onClick={setCritical}
                checked={this.state.critical}
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
          />
          {" d "}
        </Label>
      );
    };

    var disableN = () => {
      if(this.state.advantage && this.state.disadvantage){
        return (
          <Label>
            <Input type="number" value={1} className={"width-sm"} readOnly />
            {" d "}
          </Label>
        );
      }
      return (
        <Label>
          <Input type="number" value={2} className={"width-sm"} readOnly />
          {" d "}
        </Label>
      );
    };

    return (
      <Toast fade={false}>
        <ToastHeader toggle={this.props.removable ? this.hide : null}>
          {dieType()}
        </ToastHeader>
        <ToastBody>
          <Form inline>
            <FormGroup inline>
              {this.state.advantage || this.state.disadvantage
                ? disableN()
                : enableN()}
              <Label>
                <Input
                  type="select"
                  onChange={e => this.setDie(+e.target.value)}
                  placeholder={this.state.die}
                  defaultValue={20}
                >
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                  <option>20</option>
                </Input>
                {" + "}
              </Label>
              <Label>
                <Input
                  type="number"
                  onChange={e => this.setMod(+e.target.value)}
                  placeholder={this.state.mod}
                />
                {" = "}
                <Input type="text" value={this.props.res} readOnly />
              </Label>
            </FormGroup>
          </Form>
        </ToastBody>
      </Toast>
    );
  }
}
