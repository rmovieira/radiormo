import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Audio } from 'expo-av'
import * as Location from 'expo-location'
import useFetch from './src/estacoes/CarregadorEstacoes'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Icon, SearchBar } from '@rneui/themed'
import ContainerEstacoes from './src/estacoes/ContainerEstacoes'
import BarraPesquisa from './src/estacoes/BarraPesquisa'
import Tocador from './src/tocador/Tocador'

export default function App() {
  const [radio, setRadio] = useState()

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <Tocador radio={radio} />
      <ContainerEstacoes setRadio={setRadio}/>
    </SafeAreaView>
  )
}


