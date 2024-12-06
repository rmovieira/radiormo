import { Text } from "@rneui/themed"
import { useState } from "react"
import AntDesign from '@expo/vector-icons/AntDesign'
import { Audio } from "expo-av"

export default function Tocador({ radio = {} }) {

    console.log('radio', radio.url)

    const [sound, setSound] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const playAudio = async () => {
        console.log('play')
        if (sound) {
            await sound.playAsync()
            setIsPlaying(true)
            return
        }
        if (!radio) return

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: radio.url },
            { shouldPlay: true }
        )
        setSound(newSound)
        setIsPlaying(true)
    }

    const pauseAudio = async () => {
        console.log('pause')
        if (sound) {
            await sound.pauseAsync()
            setIsPlaying(false)
        }
    }

    const stopAudio = async () => {
        console.log('stop')
        if (sound) {
            await sound.stopAsync()
            setIsPlaying(false)
        }
    }

    return (<>
        <AntDesign name="play" size={24} color="black" onPress={playAudio} />
        <AntDesign name="pausecircle" size={24} color="black" onPress={stopAudio} />
    </>)

}