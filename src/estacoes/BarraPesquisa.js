import { SearchBar } from "@rneui/themed"
import { useCallback } from "react"
import { debounce } from "lodash"

export default function BarraPesquisa({ filtrar, filtro }) {
    const onChangeText = useCallback(texto => {
        console.log('xxx', texto)
        filtrar(texto)
    }, [])

    const onClear = useCallback(() => {
        filtrar()
    }, [])

    const handleChange = useCallback(debounce(onChangeText, 500), [])

    return (
        <SearchBar
            onClear={onClear}
            platform={'android'}
            placeholder="Digita o nome da rádio"
            onChangeText={handleChange}
            value={filtro}
        />
    )
}