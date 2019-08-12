import { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { Add } from '@material-ui/icons';
import Checkbox from '../../elements/checkbox';
import AddReleaseDialogContainer from './Release/AddReleaseDialogContainer';

class ReleaseTabView extends Component {
  constructor(props) {
    super(props);
    this.state = { showReleaseDialog: false };
  }

  closeHandler = e => {
    this.setState({ showReleaseDialog: false });
  };

  showReleaseDialogHandler = e => {
    this.setState({ showReleaseDialog: true });
    this.props.showReleaseDialog(this.props.index);
  };

  /**
   * Release
   */

  handleReleaseDelete = i => {
    const { products, index } = this.props;
    const productItem = products.bundle.productsToUpload[index];
    if (productItem.releases && productItem.releases.length > 0) {
      const tags = productItem.releases.slice(0);
      tags.splice(i, 1);
      productItem.releases = tags;
      this.props.setProductWithIndex(index, productItem);
    }
  };

  handleReleaseAddition = tag => {
    const { products, index } = this.props;
    const productItem = products.bundle.productsToUpload[index];
    const tags = [].concat(productItem.releases, tag);
    productItem.releases = tags;
    this.props.setProductWithIndex(index, productItem);
  };

  changeIncludePeople = () => {
    const { products, index } = this.props;
    const productItem = products.bundle.productsToUpload[index];
    productItem.includePeople = !productItem.includePeople;
    this.props.setProductWithIndex(index, productItem);
  };

  render() {
    const { products, index } = this.props;
    const productItem = products.bundle.productsToUpload[index];

    return (
      <div className="h-450">
        <div className="">
          <span className="h-label">Releases</span>&nbsp;
          <span className="normal-text">
            - Add any model or property releases.
          </span>
          &nbsp;
          <span className="filename">Learn More</span>
          <div className="mt-10 d-flex content-between">
            <Checkbox
              checked={productItem.includePeople}
              onChange={this.changeIncludePeople}
              label="Video includes any recognizable people and/or places"
              allowNew
            />
            <button
              className="button is-outline"
              type="button"
              onClick={e => this.showReleaseDialogHandler(e)}
            >
              <Add /> &nbsp;Add Release
            </button>
          </div>
        </div>

        <div className="mt-10">
          <ReactTags
            tags={productItem.releases}
            handleDelete={i => this.handleReleaseDelete(i)}
            handleAddition={tag => this.handleReleaseAddition(tag)}
            placeholder=""
          />
        </div>
        <AddReleaseDialogContainer
          index={this.props.index}
          filename={productItem.filename}
          show={this.state.showReleaseDialog}
          onClose={e => this.closeHandler(e)}
        />
      </div>
    );
  }
}

export default ReleaseTabView;
