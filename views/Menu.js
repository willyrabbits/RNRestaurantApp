import React, { useEffect, useContext, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base'

import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

import FirebaseContext from '../context/firebase/firebaseContext'
import PedidoContext from '../context/pedidos/pedidosContext'

const Menu = () => {

    // firebase context
    const { menu, obtenerProductos } = useContext(FirebaseContext)
    // order context
    const { seleccionarPlato } = useContext(PedidoContext)

    // hook to navigate & hide back button
    const navigation = useNavigation()
    navigation.setOptions({
        headerLeft: () => <></>
    })

    useEffect(() => {
        obtenerProductos()
    }, [])

    const showHeading = (categoria, i) => {

        if (i > 0 && menu[i - 1].categoria === categoria) {
            // const prevCategoria = menu[i - 1].categoria
            // if (prevCategoria === categoria) {
            return
            // }
        }
        return (
            <Separator style={styles.separador}>
                <Text style={styles.separadorTxt}>{categoria}</Text>
            </Separator>
        )

    }

    return (
        <Container style={globalStyles.container}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {menu.map((plato, i) => {
                        const { imagen, nombre, descripcion, categoria, precio, id } = plato
                        return (
                            <Fragment key={id}>
                                {showHeading(categoria, i)}
                                <ListItem
                                    onPress={() => {
                                        // delete some properties (EXISTENCIA) of the dish which we dont need
                                        const { existencia, ...plato2 } = plato

                                        seleccionarPlato(plato2)
                                        navigation.navigate('DetallePlato')
                                    }}
                                >
                                    <Thumbnail large square source={{ uri: imagen }} />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >
                                            {descripcion}
                                        </Text>
                                        <Text>Price: ${precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    },
    separadorTxt: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default Menu