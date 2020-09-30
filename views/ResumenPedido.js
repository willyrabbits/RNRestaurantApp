import React, { useContext, useEffect } from 'react'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab } from 'native-base'
import { StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

import PedidoContext from '../context/pedidos/pedidosContext'

const ResumenPedido = () => {

    // context
    const { pedido } = useContext(PedidoContext)

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.titulo}>Order summary</H1>
                {
                    pedido.map(plato => {
                        const { precio, nombre, cantidad, imagen, id } = plato
                        return (
                            <List key={id}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail large square source={{ uri: imagen }} />
                                    </Left>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text>Quantity: {cantidad}</Text>
                                        <Text>Subtotal: ${precio}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        )
                    })
                }
                <Text style={globalStyles.cantidad}>TOTAL TO PAY: $X</Text>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                    >
                        <Text style={globalStyles.btnText}>ORDER !</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default ResumenPedido

const styles = StyleSheet.create({})