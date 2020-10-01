import React, { useContext, useEffect } from 'react'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab } from 'native-base'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'

import globalStyles from '../styles/global'

import PedidoContext from '../context/pedidos/pedidosContext'

const ResumenPedido = () => {

    // context
    const { pedido, total, showSummary, deleteItem, orderPlaced } = useContext(PedidoContext)

    useEffect(() => {
        calcTotal()
    }, [pedido])

    const navigation = useNavigation()

    const calcTotal = () => {
        let newTotal = 0
        newTotal = pedido.reduce((newTotal, item) => newTotal + item.total, 0)
        showSummary(newTotal)
    }

    // sent to Order PRogress
    const orderProgress = () => {
        Alert.alert(
            'Double check your order.',
            'Once your order is placed, you will not be able to modify it.',
            [
                {
                    text: 'Sure mate!',
                    onPress: async () => {

                        //write order in firebase
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now()
                        }

                        try {
                            const p = await firebase.db.collection('ordenes').add(pedidoObj)
                            orderPlaced(p.id)

                            navigation.navigate('ProgresoPedido')
                        } catch (error) {
                            console.warn(error)
                        }

                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
    }

    // delete a dish from array pedido
    const confirmDelete = id => {
        Alert.alert(
            'Are you sure you donnot want this item anymore?',
            '',
            [
                {
                    text: 'Yup!',
                    onPress: () => {
                        // remove from state
                        deleteItem(id)

                    }
                },
                {
                    text: 'Oh sorry',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.titulo}>Order summary</H1>
                {
                    pedido.map((plato, i) => {
                        const { precio, nombre, amount, imagen, id } = plato
                        return (
                            <List key={id + i}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail large square source={{ uri: imagen }} />
                                    </Left>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text>Quantity: {amount}</Text>
                                        <Text>Subtotal: ${precio}</Text>

                                        <Button
                                            full
                                            danger
                                            style={{ marginTop: 20 }}
                                            onPress={() => confirmDelete(id)}
                                        >
                                            <Text style={[globalStyles.btnText, { color: '#FFF' }]}>Delete item</Text>
                                        </Button>
                                    </Body>
                                </ListItem>
                            </List>
                        )
                    })
                }
                <Text style={globalStyles.cantidad}>TOTAL TO PAY: ${total}</Text>

                <Button
                    full
                    dark
                    style={{ marginTop: 30 }}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={[globalStyles.btnText, { color: '#FFF' }]}>Continue ordering</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() => orderProgress()}
                        full
                    >
                        <Text style={globalStyles.btnText}>¡ ORDER !</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default ResumenPedido
