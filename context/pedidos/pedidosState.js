import React, { useReducer } from 'react';

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDEN,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'


const PedidiosState = props => {

    //initial state
    const initialState = {
        pedido: [],
        plato: null,
        total: 0,
        idpedido: ''
    }

    // useReducer with dispatch to execute functions
    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    // choose the product that the customer has selected
    const seleccionarPlato = plato => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: plato
        })
    }

    // show total to pay in te summary
    const showSummary = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    // when user confirms a dish to order
    const saveOrder = pedido => {
        dispatch({
            type: CONFIRMAR_ORDEN,
            payload: pedido
        })
    }

    // remove item from shoppin cart
    const deleteItem = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    // when an order is placed
    const orderPlaced = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return (
        <PedidoContext.Provider value={{
            pedido: state.pedido,
            plato: state.plato,
            total: state.total,
            idpedido: state.idpedido,
            seleccionarPlato,
            saveOrder,
            showSummary,
            deleteItem,
            orderPlaced
        }}>
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidiosState;
