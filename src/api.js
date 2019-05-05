import Papa from 'papaparse';

let BASE_URL = `http://armaforces.ddns.net:8888/`;
if (process.env.NODE_ENV !== 'production') {
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

export const getCurrentModset = () =>
  fetch(`${BASE_URL}/current.txt?${Date.now()}`)
  .then((resp) => resp.text())
  .then(current => {
    // Remove BOM
    if (current.charCodeAt(0) === 0xFEFF) {
      current = res.substr(1);
    }
    return current.trim()
  })
