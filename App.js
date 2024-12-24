import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Audio } from 'expo-av'
import useFetch from './src/estacoes/CarregadorEstacoes'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Icon, SearchBar } from '@rneui/themed'
import ContainerEstacoes from './src/estacoes/ContainerEstacoes'
import Tocador from './src/tocador/Tocador'
import * as Notifications from 'expo-notifications'
import * as Updates from "expo-updates"

export default function App() {
  const tocadorRef = useRef(null)
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()
      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync() // depende da sua estratégia
      }
    }
    updateApp()
  }, [])
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    })
  }, [])

  const setRadio = useCallback((radio) => {
    if (!tocadorRef || !tocadorRef.current) return
    tocadorRef.current.tocar(radio)
  }, [tocadorRef])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <Tocador ref={tocadorRef} />
      <ContainerEstacoes setRadio={setRadio} />
    </SafeAreaView>
  )
}


