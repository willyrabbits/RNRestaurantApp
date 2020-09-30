import React, { useState, useContext, useEffect } from 'react'
import {
    Container, Content, Form, Icon, Input, Grid, Col, Button, Text, Footer, FooterTab
} from 'native-base'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

import PedidoContext from '../context/pedidos/pedidosContext'

const FormPlato = () => {

    // state for amounts
    const [amount, setAmount] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        calcTotal()
    }, [amount])

    // context
    const { plato, saveOrder } = useContext(PedidoContext)
    const { precio, nombre } = plato

    const navigation = useNavigation()

    const calcTotal = () => {
        const totalPagar = precio * amount
        setTotal(totalPagar)
    }

    const substractOne = () => {
        (amount > 1) ? setAmount(amount - 1) : null
    }

    const addOne = () => {
        setAmount(amount + 1)
    }

    //confirm order
    const confirmOrder = () => {
        Alert.alert(
            'Add to order?',
            'An added order can not be modified',
            [
                {
                    text: "Yup! Feed me",
                    onPress: () => {
                        // add order into main order
                        const pedido = {
                            ...plato,
                            amount,
                            total
                        }
                        saveOrder(pedido) // context-> reducer-> update general state

                        // go to cart
                        navigation.navigate('ResumenPedido')
                    }
                }, {
                    text: "Oh wait!",
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <Form>
                    <Text style={globalStyles.titulo}>How many "{nombre}" do you want?</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: '100%' }}
                                onPress={() => substractOne()}
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>

                        <Col>
                            <Input
                                value={amount.toString()}
                                style={{ textAlign: 'center', fontSize: 20 }}
                                onChangeText={amount => setAmount(amount)}
                                keyboardType="numeric"
                            />
                        </Col>

                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: '100%' }}
                                onPress={() => addOne()}
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.btn}
                        onPress={() => confirmOrder()}
                    >
                        <Text style={globalStyles.btnText}>Add to order</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default FormPlato