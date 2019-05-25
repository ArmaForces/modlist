import cheerio from 'cheerio';
import _unescape from 'lodash/unescape';

/**
 * Extracts Steam Workshop Id from url
 *
 * @param {String} url Workshop url
 */
function getWorkshopIdFromUrl(url) {
  return url.split('id=')[1];
}

/**
 * Extracts data from node of arma launcher ModContainer element
 *
 * @param {wtring} text Content of node
 * @param {String} type Arma Launcher node type
 */
function getNodeDataFromText(text, type) {
  switch (type) {
    case 'Link':
      return getWorkshopIdFromUrl(text);
    case 'DisplayName':
      return text;
    default:
      console.warn(`Unknown mod node type: "${type}", "${text}"`);
      return text;
  }
}

/**
 * Converts launcher generated HTML to mods objects
 *
 * @param {String} html Launcher HTML contents
 */
export default function htmlToMods(html) {
  const $ = cheerio.load(html);
  const modContainers = $('[data-type=ModContainer]');

  return modContainers
    .map((_, row) => $(row).find('[data-type]'))
    .map((_, nodes) =>
      // Convert mod container nodes into object
      Array.from(nodes).reduce((obj, node) => {
        const key = $(node).data('type');
        const text = $(node).html();
        // Assign new prop to mod object depending on current node type
        return Object.assign(obj, {
          [key.toLowerCase()]: _unescape(getNodeDataFromText(text, key).trim()).replace('&apos;', "'"),
        });
      }, {}),
    );
}
