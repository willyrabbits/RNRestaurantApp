import 'react-native-gesture-handler';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import NuevaOrden from './views/NuevaOrden'
import Menu from './views/Menu'
import DetallePlato from './views/DetallePlato'
import FormPlato from './views/FormPlato'
import ResumenPedido from './views/ResumenPedido'
import ProgresoPedido from './views/ProgresoPedido'

import BotonResumen from './components/ui/BotonResumen'

import FirebaseState from './context/firebase/firebaseState'
import PedidoState from './context/pedidos/pedidosState'

const Stack = createStackNavigator()

const App = () => {
    return (
        <>
            <FirebaseState>
                <PedidoState>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: '#FFDA00'
                                },
                                headerTitleStyle: {
                                    fontWeight: 'bold'
                                },
                                headerTintColor: '#000'
                            }}
                        >

                            <Stack.Screen
                                name="NuevaOrden"
                                component={NuevaOrden}
                                options={{ title: "New Order" }}
                            />

                            <Stack.Screen
                                name="Menu"
                                component={Menu}
                                options={{ headerRight: props => <BotonResumen /> }}
                            />

                            <Stack.Screen
                                name="DetallePlato"
                                component={DetallePlato}
                                options={{ title: "Dish Detail" }}
                            />

                            <Stack.Screen
                                name="FormPlato"
                                component={FormPlato}
                                options={{ title: "Order Dish" }}
                            />

                            <Stack.Screen
                                name="ResumenPedido"
                                component={ResumenPedido}
                                options={{ title: "Review your order" }}
                            />

                            <Stack.Screen
                                name="ProgresoPedido"
                                component={ProgresoPedido}
                                options={{ title: "Order Status" }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PedidoState>
            </FirebaseState>
        </>
    )
}

export default App