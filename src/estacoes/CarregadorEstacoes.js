import React, { useState } from 'react'
import useFetch from '../helper/useFetch'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'


const Context = React.createContext()
const { Provider } = Context
export const useEstacoesState = () => React.useContext(Context) || {}
export const useEstacoes = () => useEstacoesState() || {}



export default CarregadorEstacoes = ({ children }) => {
    const { setFiltro, filtro, dados, carregando, erro } = useFetch()
    // console.log('---', carregando, erro)
    const [radios, setRadios] = useState(dados)

    return (
        <Provider value={{ estacoes: dados, carregando, erro, filtro, filtrar: setFiltro }}>
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
