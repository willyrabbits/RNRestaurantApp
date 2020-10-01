import React, { useContext } from 'react'
import { Button, Text } from 'native-base'

import globalStyles from '../../styles/global'

import { useNavigation } from '@react-navigation/native'

import PedidoContext from '../../context/pedidos/pedidosContext'

const BotonResumen = () => {

    const navigation = useNavigation()

    const { pedido } = useContext(PedidoContext)

    if (pedido.length === 0) return null

    return (
        <Button
            onPress={() => navigation.navigate('ResumenPedido')}
            style={globalStyles.btn}
        >
            <Text style={globalStyles.btnText}>MY Order</Text>
        </Button>
    )
}

export default BotonResumen