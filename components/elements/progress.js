import { Cancel } from '@material-ui/icons';
import objectAssign from 'object-assign';

const styles = {
  progressWrapper: {
    height: '36px',
    width: '100%',
    maxWidth: '728px',
    float: 'left',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#35AB86'
  },
  cancelButton: {
    marginTop: '0px',
    marginLeft: '28px',
    marginRight: '-50px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)'
  },
  cancelIcon: {
    color: 'red'
  }
};

const Progress = ({ progress, hasError, cancelHandler, small }) => {
  const barStyle = objectAssign({}, styles.progressBar);
  barStyle.width = `${progress}%`;

  let message = <span>{progress}%</span>;
  if (hasError) {
    barStyle.backgroundColor = '#d9534f';
    message = <span style={{ color: '#fff' }}>Failed to upload ...</span>;
  } else if (progress === 100) {
    message = <span>100%</span>;
  } else if (progress === 0) {
    message = <span>0% Upload Pending - In Queue</span>;
    barStyle.backgroundColor = 'transparent';
    barStyle.width = '100%';
    barStyle.color = '#333';
  }

  const wrapperStyle = objectAssign({}, styles.progressWrapper);
  const cancelStyle = objectAssign({}, styles.cancelButton);
  const cancelIconStyle = objectAssign({}, styles.cancelIcon);
  if (small) {
    wrapperStyle.height = '13px';
    cancelStyle.fontSize = '13px';
    cancelIconStyle.fontSize = '17px';
    message = '';
    cancelStyle.marginTop = '-10px';
    cancelStyle.marginLeft = '28px';
    cancelStyle.marginRight = '0px';
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'start' }}>
      <div style={wrapperStyle}>
        <div className="_react_fileupload_progress_bar" style={barStyle}>
          <div
            style={{
              textAlign: progress === 0 ? 'left' : 'center',
              marginLeft: small ? '0px' : '20px',
              marginTop: '8px'
            }}
          >
            {message}
          </div>
        </div>
      </div>
      {progress !== 100 ? (
        <button
          type="button"
          style={cancelStyle}
          onClick={e => cancelHandler(e)}
        >
          <Cancel style={cancelIconStyle} />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Progress;
