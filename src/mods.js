
export const setEnabled = (id, state) => localStorage.setItem('ws_'+id, state)

export const isEnabled = id => JSON.parse(localStorage.getItem('ws_'+id)) !== false

export const isOptional = mod => mod.is_optional === 'True'
