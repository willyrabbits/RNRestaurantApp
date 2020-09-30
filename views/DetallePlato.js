import React, { useContext } from 'react'
import { Image } from 'react-native'

import {
    Container, Content, Footer, FooterTab, Button, Body, Text, H1,
    Card, CardItem
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'

import PedidoContext from '../context/pedidos/pedidosContext'

const DetallePlato = () => {

    // order context
    const { plato } = useContext(PedidoContext)
    const { nombre, imagen, descripcion, precio } = plato

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.img} source={{ uri: imagen }} />
                            <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Price: ${precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() => navigation.navigate('FormPlato')}
                    >
                        <Text style={globalStyles.btnText}>Order dish</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default DetallePlato
