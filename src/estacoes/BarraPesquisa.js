import { SearchBar } from "@rneui/themed"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"

export default function BarraPesquisa({ filtrar }) {
    const [filtro, setFiltro] = useState('')

    const onChangeText = useCallback(texto => {
        filtrar(texto)
    }, [])
    
    const handleChange = useCallback(debounce(onChangeText, 500), [])

    const onClear = useCallback(() => {
        filtrar()
        setFiltro('')
    }, [])


    useEffect(()=>{
        handleChange(filtro)
    },[filtro])



    return (
        <SearchBar
            onClear={onClear}
            platform={'android'}
            placeholder="Digita o nome da rádio"
            onChangeText={setFiltro}
            value={filtro}
        />
    )
}