/* eslint-disable arrow-spacing */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable block-spacing */
/* eslint-disable semi */
/* eslint-disable key-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/no-unused-state */
import React from 'react';
import Editor from '@components/Base/Editor';
import {
  EDITOR_EVENTS,
  EDITOR_REACT_EVENTS,
  EVENT_BEFORE_ADD_PAGE,
  EVENT_AFTER_ADD_PAGE,
} from '@common/constants';
import { pick } from '@utils';
import Global from '@common/Global';
import GGEditorContext from '@common/context/GGEditorContext';
import PropsAPIContext from '@common/context/PropsAPIContext';
import PropsAPI from '@common/context/PropsAPIContext/propsAPI';
import { Modal } from 'antd';
class GGEditor extends React.Component {
  static setTrackable(value) {
    Global.set('trackable', Boolean(value));
  }

  editor = null;

  get currentPage() {
    return this.editor.getCurrentPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen1: true,
    };
    this.init();
    this.bindEvent();
  }

  addListener = (target, eventName, handler) => {
    if (typeof handler === 'function') target.on(eventName, handler);
  };

  handleBeforeAddPage = (func) => {
    this.editor.on(EVENT_BEFORE_ADD_PAGE, func);
  };

  handleAfterAddPage = (func) => {
    const { currentPage: page } = this;

    if (page) {
      func({ page });
      return;
    }

    this.editor.on(EVENT_AFTER_ADD_PAGE, func);
  };

  init() {
    this.editor = new Editor();
    this.ggEditor = {
      editor: this.editor,
      onBeforeAddPage: this.handleBeforeAddPage,
      onAfterAddPage: this.handleAfterAddPage,
      asd: this.state.isModalOpen1,
      setAsd: (a)=>{this.setState({isModalOpen1:a})},
    };
    this.propsAPI = new PropsAPI(this.editor);
  }

  bindEvent() {
    EDITOR_EVENTS.forEach((event) => {
      this.addListener(this.editor, [event], this.props[EDITOR_REACT_EVENTS[event]]);
    });
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    const { children } = this.props;
    const handleOk = () => {
      this.setState({isModalOpen1:false});
    };
    const handleCancel = () => {
      this.setState({isModalOpen1:false});
    };
    return (
      <>
      <Modal title="Basic Modal" open={this.state.isModalOpen1} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
      </Modal>
      <GGEditorContext.Provider value={this.ggEditor}>
        <PropsAPIContext.Provider value={this.propsAPI}>
          <div {...pick(this.props, ['style', 'className'])}>{children}</div>
        </PropsAPIContext.Provider>
      </GGEditorContext.Provider>
      </>
    );
  }
}

export default GGEditor;
