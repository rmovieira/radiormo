import { useCallback, useEffect, useState } from "react"

const URL = 'https://de1.api.radio-browser.info/json/stations/search?limit=9990&countrycode=BR&hidebroken=true&order=clickcount&reverse=true'

export const useFetch = (filtro) => {
    const [carregando, setCarregando] = useState()
    const [dados, setDados] = useState()
    const [erro, setErro] = useState()

    const carregarDados = useCallback(async () => {
        setCarregando(true)
        try {
            if (!filtro) {
                setDados([])
                setCarregando(false)
                return
            }
            const response = await fetch(`${URL}&name=${filtro}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json()
            setErro(null)
            setDados(json)
            setCarregando(false)
        } catch (e) {
            console.log(5, e)
            setErro("Não foi possível carregar estações")
        }
    }, [filtro])

    useEffect(() => {
        carregarDados()
    }, [filtro])

    return { dados, carregando, erro }
}

export default useFetch