import React, { useReducer } from 'react';

import firebase from '../../firebase';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_SUCCESS } from '../../types'

import _ from 'lodash'

const FirebaseState = props => {

    //initial state
    const initialState = {
        menu: []
    }

    // useReducer with dispatch to execute functions
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //function that executes to fetch de DB
    const obtenerProductos = () => {
        dispatch({
            type: OBTENER_PRODUCTOS
        })

        // consult firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) // filtramos para recuperar solo los que hay en stock
            .onSnapshot(handleSnapshot)

        function handleSnapshot(snapshot) {
            let platos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log(platos)

            // sort by Type  using lodash
            platos = _.sortBy(platos, 'categoria')

            dispatch({
                type: OBTENER_PRODUCTOS_SUCCESS,
                payload: platos
            })
        }
    }

    return (
        <FirebaseContext.Provider value={{
            menu: state.menu,
            firebase,
            obtenerProductos
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;
