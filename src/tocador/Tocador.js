import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Audio } from "expo-av"
import { Button, Card, Icon, Image } from "@rneui/themed"
import { TouchableWithoutFeedback, View } from "react-native"
import * as Notifications from 'expo-notifications'


const Botoes = ({ desabilitado, tocando, acao }) => {
    if (tocando) {
        return <Icon
            disabled={desabilitado}
            Component={TouchableWithoutFeedback}
            size={64}
            type="antdesign"
            name='pausecircle'
            onPress={acao}
        />
    }

    return <Icon
        Component={TouchableWithoutFeedback}
        containerStyle={{ shadowColor: 'white', backgroundColor: 'white' }}
        disabled={desabilitado}
        size={64}
        type="antdesign"
        name='play'
        onPress={acao}
    />

}

const Tocador = forwardRef((props, ref) => {
    const [radio, setRadio] = useState({})
    const [sound, setSound] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useImperativeHandle(ref, () => ({
        async tocar(radio) {
            setRadio(radio)
        },
    }))
    useEffect(() => {
        if (!radio.url) return
        playAudio()
    }, [radio.url])

    const playAudio = async () => {
        if (!radio) return
        if (sound) {
            await stopAudio()
        }

        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
        })
        Notifications.dismissAllNotificationsAsync()
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Tocando rádio',
                body: radio.name,
            },
            trigger: null,
        })

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: radio.url },
            { shouldPlay: true },
        )
        setSound(newSound)
        setIsPlaying(true)
    }

    const stopAudio = async () => {
        Notifications.dismissAllNotificationsAsync()
        if (sound) {
            await sound.stopAsync()
        }
        setIsPlaying(false)
        setSound(null)
    }

    if (!radio.url) {
        return (
            <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                <Image
                    resizeMode="contain"
                    style={{ padding: 0, height: 150, width: 150 }}
                    source={require('../../assets/radio.png')}
                />
            </View>
        )
    }

    return (
        <Card>
            <Card.Title>{radio.name}</Card.Title>
            <Card.Divider />
            <Card.Image
                resizeMode="contain"
                style={{ padding: 0 }}
                source={{ uri: radio.favicon }}
            />
            <Button
                color="transparent"
                icon={<Botoes desabilitado={!radio.url} tocando={isPlaying} acao={isPlaying ? stopAudio : playAudio} />}
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
            />
        </Card>
    )
})



export default Tocador
