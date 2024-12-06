import { Avatar, ListItem, Text } from "@rneui/themed"
import { useEstacoes } from "./CarregadorEstacoes"
import { FlatList } from "react-native"
import BarraPesquisa from "./BarraPesquisa"
import { useState } from "react"

export default function ListaEstacoes({setRadio}) {
    const { estacoes, filtrar } = useEstacoes()
    // console.log(estacoes)

    const renderItem = ({ item }) => {
        // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        // const color = item.id === selectedId ? 'white' : 'black';

        return (
            <ListItem bottomDivider onPress={()=> setRadio(item)}>
                <Avatar title={item.name[0]} source={item.favicon && { uri: item.favicon }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    return (
        <>
            <BarraPesquisa filtrar={filtrar}/>
            <FlatList
                data={estacoes}
                renderItem={renderItem}
                keyExtractor={item => item.stationuuid}
            // extraData={selectedId}
            />
        </>
    )
}