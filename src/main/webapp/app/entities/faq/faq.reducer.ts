import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFaq, defaultValue } from 'app/shared/model/faq.model';

export const ACTION_TYPES = {
  FETCH_FAQ_LIST: 'faq/FETCH_FAQ_LIST',
  FETCH_FAQ: 'faq/FETCH_FAQ',
  CREATE_FAQ: 'faq/CREATE_FAQ',
  UPDATE_FAQ: 'faq/UPDATE_FAQ',
  DELETE_FAQ: 'faq/DELETE_FAQ',
  SET_BLOB: 'faq/SET_BLOB',
  RESET: 'faq/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFaq>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FaqState = Readonly<typeof initialState>;

// Reducer

export default (state: FaqState = initialState, action): FaqState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FAQ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FAQ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FAQ):
    case REQUEST(ACTION_TYPES.UPDATE_FAQ):
    case REQUEST(ACTION_TYPES.DELETE_FAQ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FAQ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FAQ):
    case FAILURE(ACTION_TYPES.CREATE_FAQ):
    case FAILURE(ACTION_TYPES.UPDATE_FAQ):
    case FAILURE(ACTION_TYPES.DELETE_FAQ):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FAQ_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FAQ):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FAQ):
    case SUCCESS(ACTION_TYPES.UPDATE_FAQ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FAQ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/faqs';

// Actions

export const getEntities: ICrudGetAllAction<IFaq> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FAQ_LIST,
    payload: axios.get<IFaq>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFaq> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FAQ,
    payload: axios.get<IFaq>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFaq> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FAQ,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFaq> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FAQ,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFaq> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FAQ,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
