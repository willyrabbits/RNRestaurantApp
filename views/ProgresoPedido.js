import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, H1, H3, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import firebase from '../firebase'
import Countdown from 'react-countdown'

import PedidoContext from '../context/pedidos/pedidosContext'

const ProgresoPedido = () => {

    const { idpedido } = useContext(PedidoContext)

    const [tiempo, setTiempo] = useState(0)
    const [completado, setCompletado] = useState(false)

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                .doc(idpedido)
                .onSnapshot(
                    function (doc) {
                        setTiempo(doc.data().tiempoentrega)
                        setCompletado(doc.data().completado)
                    }
                )
        }
        obtenerProducto()
    }, [])

    //navigation hook & hide back button
    const navigation = useNavigation()
    navigation.setOptions({
        headerLeft: () => <></>
    })

    // show countdown in screen
    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={[globalStyles.content, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Your order is received in the kitchen</Text>
                        <Text style={{ textAlign: 'center' }}>We are calculating the time, please wait.</Text>
                    </>
                )}
                {!completado && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Your order will be ready in: </Text>
                        <Text>
                            <Countdown
                                date={Date.now() + tiempo * 60000}
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )}

                {completado && (
                    <>
                        <H1 style={styles.txtCompletado}>Order ready</H1>
                        <H3 style={styles.txtCompletado}>Please, come to get your order</H3>

                        <Button
                            full
                            style={[globalStyles.btn, { marginTop: 100 }]}
                            rouded
                            block
                            onPress={() => navigation.navigate('NuevaOrden')}
                        >
                            <Text style={globalStyles.btnText}>Start a new order</Text>
                        </Button>
                    </>
                )}
            </Content>
        </Container>
    )
}

export default ProgresoPedido

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30
    },
    txtCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})
