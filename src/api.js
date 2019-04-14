import Papa from 'papaparse';

let BASE_URL;
if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://armaforces.ddns.net:8888/`
} else {
  BASE_URL = `http://localhost:8080/`
}

export const getDownloadableModsets = () =>
  fetch(`${BASE_URL}/modsets/downloadable.json?${Date.now()}`)
  .then((resp) => resp.json())


export const getModsetData = modset =>
  fetch(`${BASE_URL}/modsets/${modset}.csv?${Date.now()}`)
  .then((resp) => resp.text())
  .then((csvText) => Papa.parse(csvText.trim(), {
    header: true,
    comments: '#',
    quoteChar: '"'
  }))

