
export const setEnabled = (id, state) => localStorage.setItem('mod_'+id, state)

export const isEnabled = id => JSON.parse(localStorage.getItem('mod_'+id)) === true

export const isOptional = mod => mod.is_optional === 'True'
