/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Checkbox from '../../../elements/checkbox';
import Dialog from '../../../elements/Dialog';
import SearchInput from '../../../elements/SearchInput';
import Progress from '../../../elements/progress';

class AddReleaseDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { searchString: '' };
  }

  componentDidMount() {
    this.props.getRelease(this.props.index);
  }

  render() {
    const {
      show,
      filename,
      onClose,
      release,
      checkReleaseHandler,
      uploadNewRelease,
      addReleaseFiles,
      cancelAllUploadFile,
      cancelUploadWithIndex,
      doneUploadFile
    } = this.props;

    return (
      <Dialog show={show} onClose={onClose} style={{ width: '450px' }}>
        {!release.uploading ? (
          <>
            <div className="release_upload_title">
              Add Releases to : <span className="filename">{filename}</span>
            </div>
            <hr />
            <SearchInput
              value={this.state.searchString}
              onChange={e => this.setState({ searchString: e.target.value })}
            />
            <div className="mt-20 scroll-250">
              {release.releases.map((item, index) => {
                if (
                  item.name
                    .toLowerCase()
                    .includes(this.state.searchString.toLowerCase())
                ) {
                  return (
                    <Fragment key={index}>
                      <div className="mt-20"></div>
                      <Checkbox
                        checked={item.checked}
                        onChange={() => checkReleaseHandler(index)}
                        label={item.name}
                      />
                    </Fragment>
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-20 content-end d-flex">
              <span className="blueunderlinetext">Download release forms</span>
            </div>
            <div className="mt-20 d-flex content-between">
              <button
                className="button is-mediumn-primary"
                type="button"
                onClick={e => {
                  onClose();
                  uploadNewRelease(this.props.index);
                }}
              >
                Done
              </button>
              <button className="button is-mediumn-outline" type="button">
                <Dropzone
                  className="upload-dropzone"
                  onDrop={files => addReleaseFiles(files)}
                  onDropRejected={this.onDropRejected}
                  multiple
                >
                  Upload New
                </Dropzone>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="release_upload_title">Upload new release</div>
            <hr />
            <div className="mt-20">
              {release.uploadFiles.map((item, index) => {
                if (!item.canceled)
                  return (
                    <div className="d-flex mt-20" key={index}>
                      <div className="filename">{item.file.name}</div>
                      <div className="w-100">
                        <Progress
                          progress={item.percentCompleted}
                          cancelHandler={e => cancelUploadWithIndex(index)}
                          small
                        />
                      </div>
                    </div>
                  );
                return null;
              })}
            </div>
            <div className="mt-20 d-flex">
              <button
                className="button is-mediumn-primary"
                type="button"
                onClick={e => doneUploadFile(this.props.index)}
              >
                Done
              </button>
              <button
                className="button is-mediumn-outline ml-30"
                type="button"
                onClick={e => cancelAllUploadFile()}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Dialog>
    );
  }
}

export default AddReleaseDialog;
