import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text } from 'native-base'

import globalStyles from '../styles/global'

const NuevaOrden = () => {

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, styles.content]}>
                <Button
                    block
                    rounded
                    style={globalStyles.btn}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={globalStyles.btnText}>Start order</Text>
                </Button>
            </View>
        </Container>
    )
}

export default NuevaOrden

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
})
