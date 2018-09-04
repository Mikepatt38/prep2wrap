export const setDropdownToggle = dropdownOpen => ({ type: 'TOGGLE_DROPDOWN', payload: dropdownOpen })
export const setAlert = (alertActive, alertType, text) => ({ type: 'SET_ALERT', payload: [alertActive, alertType, text]})
export const setModal = (active) => ({ type: 'SET_MODAL', payload: active})