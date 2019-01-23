import { TRANSLATE_LOADER, TRANSLATE_CHANGE } from "@/store/actions/actionTypes";
import env from '@/env/env';
import axios from 'axios';
import store from '@/store/store';

export default function translateAction(locale) {
  return async (dispatch, getState) => {
    dispatch({ type: TRANSLATE_LOADER });

    const { storage } = getState().translate;

    if (storage.hasOwnProperty(locale)) {
      dispatch(change(storage, storage[locale], locale));
    } else {
      try {
        const { data } = await axios.get(`${env.langUrl}/i18n/${locale}.json`);
        storage[locale] = data;

        dispatch(change(storage, data, locale));
      } catch (e) {
        console.log(e);
      }
    }
  }
}

function change(storage, data, locale) {
  return { type: TRANSLATE_CHANGE, payload: { storage, data, locale } };
}

export function translate(name) {
  const { data } = store.getState().translate;

  const findKey = Object.keys(data).find(key => name.toLowerCase() === key.toLowerCase());

  if (findKey) {
    return data[findKey];
  }

  return name;
}