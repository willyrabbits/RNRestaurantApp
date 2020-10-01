import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from '../../types'

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
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                pedido: state.pedido.filter(item => item.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                pedido: [],
                total: 0,
                idpedido: action.payload
            }
        default:
            return state;
    }
};