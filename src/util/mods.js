
export const setEnabled = (id, state) => localStorage.setItem(`mod_${id}`, state);

/**
 * Is mod wanted/enabled by user
 * @param {string} id Mod SteamID
 */
export const isEnabled = id => JSON.parse(localStorage.getItem(`mod_${id}`)) === true;

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
