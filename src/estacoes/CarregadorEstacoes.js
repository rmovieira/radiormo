import React from 'react'
import useFetch from '../helper/useFetch'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'


const Context = React.createContext()
const { Provider } = Context
export const useEstacoesState = () => React.useContext(Context) || {}
export const useEstacoes = () => useEstacoesState() || {}



export default CarregadorEstacoes = ({ children,filtro }) => {
    const { dados, carregando, erro } = useFetch(filtro)

    return (
        <Provider value={{ estacoes: dados, carregando, erro }}>
            <SafeAreaView style={styles.container}>
                {carregando && <Text>{'carregando'}</Text>}
                {!carregando && children}
            </SafeAreaView>
        </Provider >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
})
