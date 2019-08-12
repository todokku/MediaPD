import { handleActions } from 'redux-actions';

const defaultState = {
  releases: [],
  uploadFiles: [],
  uploading: false,
  error: false,
  index: -1
};

export default handleActions(
  {
    SHOW_RELEASE_DIALOG: (state, { payload: { index } }) => {
      return {
        ...state,
        releases: []
      };
    },

    GET_RELEASE_SUCCESS: (state, { payload: { releases } }) => {
      return {
        ...state,
        releases,
        error: false,
        uploadFiles: []
      };
    },

    GET_RELEASE_FAILED: (state, { payload: { error } }) => {
      return {
        ...state,
        releases: [],
        error,
        uploadFiles: []
      };
    },

    CANCEL_ALL_RELEASE_UPLOAD: state => {
      return {
        ...state,
        error: false,
        uploading: false,
        uploadFiles: []
      };
    },

    SET_RELEASE_UPLOADING: (state, { payload: { uploading } }) => {
      return {
        ...state,
        uploading
      };
    },

    NEW_REALEASE_UPLOAD_FAILED: state => ({
      ...state,
      error: true
    }),

    ADD_RELEASE_FILES: (state, { payload: { files } }) => {
      const { uploadFiles } = state;
      for (let i = 0; i < files.length; i += 1) {
        uploadFiles.push({
          file: files[i],
          canceled: false
        });
      }
      return {
        ...state,
        uploadFiles,
        error: false
      };
    },

    UPLOAD_RELEASE_PERCENTCOMPLETED: (
      state,
      { payload: { percentCompleted, index } }
    ) => {
      const { uploadFiles } = state;

      if (uploadFiles.length === 0) {
        return {
          ...state
        };
      }
      uploadFiles[index].percentCompleted = percentCompleted;
      return {
        ...state,
        uploadFiles
      };
    },

    CANCEL_RELEASE_UPLOAD_INDEX: (state, { payload: { index } }) => {
      const { uploadFiles } = state;

      uploadFiles[index].canceled = true;
      return {
        ...state,
        uploadFiles
      };
    },

    SAVE_RELEASE_UPLOADFILESINFO: (
      state,
      { payload: { name, path, index } }
    ) => {
      const { uploadFiles } = state;

      uploadFiles[index].name = name;
      uploadFiles[index].path = path;
      return {
        ...state,
        uploadFiles,
        error: false
      };
    },

    CHECK_RELEASE_ITEM: (state, { payload: { index } }) => {
      const { releases } = state;

      if (releases[index].checked) {
        releases[index].checked = false;
      } else {
        releases[index].checked = true;
      }

      return {
        ...state,
        releases
      };
    }
  },
  defaultState
);
