import React, { useReducer } from 'react';

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN } from '../../types'


const PedidiosState = props => {

    //initial state
    const initialState = {
        pedido: [],
        plato: null
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

    // when user confirms a dish to order
    const saveOrder = pedido => {
        dispatch({
            type: CONFIRMAR_ORDEN,
            payload: pedido
        })
    }

    return (
        <PedidoContext.Provider value={{
            pedido: state.pedido,
            plato: state.plato,
            seleccionarPlato, 
            saveOrder
        }}>
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidiosState;
