import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDomain, defaultValue } from 'app/shared/model/domain.model';

export const ACTION_TYPES = {
  FETCH_DOMAIN_LIST: 'domain/FETCH_DOMAIN_LIST',
  FETCH_DOMAIN: 'domain/FETCH_DOMAIN',
  CREATE_DOMAIN: 'domain/CREATE_DOMAIN',
  UPDATE_DOMAIN: 'domain/UPDATE_DOMAIN',
  DELETE_DOMAIN: 'domain/DELETE_DOMAIN',
  RESET: 'domain/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDomain>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DomainState = Readonly<typeof initialState>;

// Reducer

export default (state: DomainState = initialState, action): DomainState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOMAIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOMAIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOMAIN):
    case REQUEST(ACTION_TYPES.UPDATE_DOMAIN):
    case REQUEST(ACTION_TYPES.DELETE_DOMAIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOMAIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOMAIN):
    case FAILURE(ACTION_TYPES.CREATE_DOMAIN):
    case FAILURE(ACTION_TYPES.UPDATE_DOMAIN):
    case FAILURE(ACTION_TYPES.DELETE_DOMAIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOMAIN_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOMAIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOMAIN):
    case SUCCESS(ACTION_TYPES.UPDATE_DOMAIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOMAIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/domains';

// Actions

export const getEntities: ICrudGetAllAction<IDomain> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOMAIN_LIST,
    payload: axios.get<IDomain>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDomain> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOMAIN,
    payload: axios.get<IDomain>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDomain> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOMAIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IDomain> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOMAIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDomain> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOMAIN,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
