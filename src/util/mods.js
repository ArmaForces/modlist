export const TYPES = {
  OPTIONAL: 'optional',
  CLIENTSIDE: 'clientside',
  SERVERSIDE: 'serverside',
  REQUIRED: 'required',
};

const DEFAULT_TYPE = TYPES.REQUIRED;

/**
 * Enable or disable mod in local storage
 * @param {String} id Mod Steam ID
 * @param {Boolean} state Is enabled
 */
export const setEnabled = (id, state) => localStorage.setItem(`mod_${id}`, state);

/**
 * @param {String} id Mod Steam ID
 * @param {Boolean} state Is enabled
 */
export const setModType = (id, type) => localStorage.setItem(`mod_t_${id}`, type);

/**
 * @param {String} id Mod Steam ID
 */
export const getModType = id => localStorage.getItem(`mod_t_${id}`) || DEFAULT_TYPE;

/**
 * Is mod wanted/enabled by user
 * @param {string} id Mod SteamID
 */
export const isEnabled = id => JSON.parse(localStorage.getItem(`mod_${id}`)) === true;

/**
 * @param {Object<Mod>} mod Mod object
 */
export const isOptional = mod => mod.is_optional === 'True';

/**
 * Return client side mods from array
 * @param {Array<Mod>} mods Array of mods
 */
export const filterClient = mods => mods.filter(x => x.is_serverside !== 'True');

/**
 * Return required mods from array
 * @param {Array<Mod>} mods Array of mods
 */
export const filterRequired = mods => mods.filter(x => x.is_optional !== 'True');

/**
 * Return optional mods from array
 * @param {Array<Mod>} mods Array of mods
 */
export const filterOptional = mods => mods.filter(x => x.is_optional === 'True');
