import { Image, ListItem } from "@rneui/themed"
import { useEstacoes } from "./CarregadorEstacoes"
import { FlatList, Keyboard } from "react-native"

export default function ListaEstacoes({ setRadio }) {
    const { estacoes } = useEstacoes()

    const renderItem = ({ item }) => {

        const selecionarRadio = () => {
            Keyboard.dismiss()
            setRadio(item)
        }

        console.log(item.favicon)
        return (
            <ListItem bottomDivider onPress={selecionarRadio}>
                <Image
                    style={{ width: '50', height: '50' }}
                    src={item.favicon}
                    source={{ uri: item.favicon }}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <>
            <FlatList
                keyboardShouldPersistTaps={'always'}
                data={estacoes}
                renderItem={renderItem}
                keyExtractor={item => item.stationuuid}
            />
        </>
    )
}