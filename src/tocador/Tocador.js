import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Button, Card, Icon, Image } from "@rneui/themed"
import { TouchableWithoutFeedback, View } from "react-native"
import { useServicoTocador } from "../ServicoTocador"


const Botoes = ({ status, parar, tocar }) => {

    if (status === 'tocando') {
        return <Icon
            Component={TouchableWithoutFeedback}
            size={64}
            type="antdesign"
            name='pausecircle'
            onPress={parar}
        />
    }

    if (status === 'parado') {
        return <Icon
            Component={TouchableWithoutFeedback}
            containerStyle={{ shadowColor: 'white', backgroundColor: 'white' }}
            size={64}
            type="antdesign"
            name='play'
            onPress={tocar}
        />
    }
    return <Button size={64} loadingProps={{size: 64}} title="Solid" type="clear" loading />

}

const Tocador = forwardRef((props, ref) => {
    const [radio, setRadio] = useState()
    const { tocar, parar, status } = useServicoTocador(radio)

    useImperativeHandle(ref, () => ({
        async definirRadio(radio) {
            setRadio(radio)
        },
    }))

    useEffect(() => {
        if (!radio) return
        tocarRadio()
    }, [radio])

    const tocarRadio = async () => {
        await tocar()

    }

    const pararRadio = async () => {
        await parar()
    }

    if (!radio?.url) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                icon={<Botoes status={status} parar={pararRadio} tocar={tocarRadio} />}
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
