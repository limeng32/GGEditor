import Editor from '@components/Base/Editor';
import {
  FLOW_CONTAINER,
  ER_CLASS_NAME,
  EVENT_BEFORE_ADD_PAGE,
  EVENT_AFTER_ADD_PAGE,
} from '@common/constants';
import Page from '@components/Page';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';

class Er extends Page {
  static defaultProps = {
    data: {
      nodes: [],
      edges: [],
    },
  };

  get pageId() {
    const { editor } = this.props;

    return `${FLOW_CONTAINER}_${editor.id}`;
  }

  initPage() {
    const { editor } = this.props;
    console.log('er----------------------------2');
    editor.emit(EVENT_BEFORE_ADD_PAGE, { className: ER_CLASS_NAME });

    this.page = new Editor.Flow(this.config);

    editor.add(this.page);

    editor.emit(EVENT_AFTER_ADD_PAGE, { page: this.page });
  }
}

export default withGGEditorContext(Er);
