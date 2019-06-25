import Papa from 'papaparse';
import _filter from 'lodash/filter';

// eslint-disable-next-line
let BASE_URL = 'https://server.armaforces.com:8888/';
if (process.env.NODE_ENV !== 'production') {
  // BASE_URL = 'http://localhost:8080/';
}

export const getDownloadableModsets = () =>
  fetch(`${BASE_URL}/modsets/downloadable.json?${Date.now()}`)
    .then(resp => resp.json());

export const getModsetData = modset =>
  fetch(`${BASE_URL}/modsets/${modset}.csv?${Date.now()}`)
    .then(resp => resp.text())
    .then(csvText => Papa.parse(csvText.trim(), {
      header: true,
      comments: '#',
      quoteChar: '"',
    }))
    .then(x => x.data);

export const getCurrentModset = () =>
  fetch(`${BASE_URL}/current.txt?${Date.now()}`)
    .then(resp => resp.text())
    .then((current) => {
      // Remove BOM
      if (current.charCodeAt(0) === 0xFEFF) {
        return current.substr(1).trim();
      }
      return current.trim();
    });

export const getDefaultClientside = () =>
  fetch(`${BASE_URL}/modsets/special.csv?${Date.now()}`)
    .then(resp => resp.text())
    .then(csvText => Papa.parse(csvText.trim(), {
      header: true,
      comments: '#',
      quoteChar: '"',
    }))
    .then(x => x.data)
    .then(x => _filter(x, 'id'))
    .then(m =>
      m.map(x => ({
        ...x,
        is_optional: 'True',
        is_serverside: 'False',
        is_map: 'False',
      })),
    );
