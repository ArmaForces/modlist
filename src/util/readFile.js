
export default function readFile(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (e) => {
      fr.abort();
      reject(e);
    };
    fr.readAsText(file);
  });
}
