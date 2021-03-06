import React from "react";
import { useContext } from "react";

import PropTypes from "prop-types";

import { LoginContext } from "./context.js";

const If = props => {
  return props.condition ? props.children : null;
};

const Auth = props => {
  const context = useContext(LoginContext);

  const canRender = context => {
    return (
      context.loggedIn &&
      (props.capability
        ? context.user.capabilities &&
          context.user.capabilities.includes(props.capability)
        : true)
    );
  };

  return <If condition={canRender(context)}>{props.children}</If>;
};

Auth.propTypes = {
  capability: PropTypes.string.isRequired
};

export default Auth;
