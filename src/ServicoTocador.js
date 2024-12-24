import { useEffect, useState } from "react"
import { Audio, InterruptionModeAndroid } from "expo-av"
import * as Notifications from 'expo-notifications'

export const useServicoTocador = (radio) => {
    const [som, setSom] = useState(null)
    const [status, setStatus] = useState('parado')

    const configAudio = async () => {
        await Audio.setAudioModeAsync({
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            staysActiveInBackground: true,
        })
    }

    useEffect(() => {
        configAudio()
    }, [])

    const tocar = async () => {
        if (!radio?.url) return
        setStatus('carregando')
        try {
            await parar(true)
            const { sound: som } = await Audio.Sound.createAsync(
                { uri: radio.url },
                { shouldPlay: true },
            )
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Tocando rádio',
                    body: radio.name,
                },
                trigger: null,
            })
            setStatus('tocando')
            setSom(som)
        } catch (e) {
            console.error("Erro ao tocar áudio:", e)
        } finally {
        }
    }

    const parar = async (naoAlterarEstado) => {
        !naoAlterarEstado && setStatus('parado')
        if (!som) return
        try {
            await som.stopAsync()
            await som.unloadAsync()
            setSom()
        } catch (error) {
            console.error("Erro ao parar áudio:", error)
        } finally {
            Notifications.dismissAllNotificationsAsync()
        }
    }

    return { tocar, parar, status }

}