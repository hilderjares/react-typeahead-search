import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, filter, switchMap, debounceTime, retry, distinctUntilChanged } from "rxjs/operators";

export const getApiUrl = (value) => `https://rickandmortyapi.com/api/character/?name=${value}`;

export const getCharacters = (subject) => {
  return subject.pipe(
    debounceTime(300),
    filter(value => value.length > 2),
    distinctUntilChanged(),
    map(getApiUrl),
    switchMap(url => ajax(url)),
    map(data => data.response.results.slice(0, 5)),
    retry(3),
  );
};
