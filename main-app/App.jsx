import React from 'react';
import Button from 'component-app/Button';
import Logo from 'component-app/Logo';
import ToolTip from 'component-app/ToolTip';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Open Dev Tool And Focus On Network,checkout resources details</h1>
        <p>
          components hosted on <strong>component-app</strong>
        </p>
        <h4>Logo:</h4>
        <Logo />
        <h4>Buttons:</h4>
        <Button type="primary" />
        <Button type="warning" />
        <h4>hover me please!</h4>
        <ToolTip content="hover me please" message="Hello,world!" />
      </div>
    );
  }
}
