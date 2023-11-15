/* eslint-disable no-console */
/* eslint-disable arrow-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable object-curly-spacing */
/* eslint-disable key-spacing */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-extra-semi */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React from 'react';
import { pick } from '@utils';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';
import Item from './Item';
class ItemPanel extends React.Component {
  page = null;

  constructor(props) {
    super(props);
    this.bindEvent();
  }

  handleMouseUp = () => {
    this.page.cancelAdd();
  }

  bindEvent() {
    const { onAfterAddPage } = this.props;

    onAfterAddPage(({ page }) => {
      this.page = page;

      document.addEventListener('mouseup', this.handleMouseUp);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { children } = this.props;
    return (
      <div id={this.containerId} {...pick(this.props, ['style', 'className'])}>
        {children}
      </div>
    );
  }
}

export { Item };

export default withGGEditorContext(ItemPanel);
