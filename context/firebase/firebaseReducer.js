import { OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_SUCCESS } from '../../types'

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PRODUCTOS_SUCCESS:
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state;
    }
};