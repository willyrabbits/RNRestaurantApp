import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN } from '../../types'

export default (state, action) => {

    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                plato: action.payload
            }
        case CONFIRMAR_ORDEN:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        default:
            return state;
    }
};