export const setDropdownToggle = dropdownOpen => ({ type: 'TOGGLE_DROPDOWN', payload: dropdownOpen })
export const setAlert = (alertActive, alertType, text) => ({ type: 'SET_ALERT', payload: [alertActive, alertType, text]})
export const setModal = (active, title, children) => ({ type: 'SET_MODAL', payload: [active, title, children]})
export const onModalSuccess = (success, error) => ({ type: 'ON_MODAL_SUCCESS', payload: [success, error] })