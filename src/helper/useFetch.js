import { useCallback, useEffect, useState } from "react"

const URL = 'https://de1.api.radio-browser.info/json/stations/search?limit=9990&countrycode=BR&hidebroken=true&order=clickcount&reverse=true'

export const useFetch = () => {
    const [carregando, setCarregando] = useState()
    const [dados, setDados] = useState()
    const [erro, setErro] = useState()
    const [filtro, setFiltro] = useState()

    const carregarDados = useCallback(async () => {
        setCarregando(true)
        try {
            console.log('filtro', filtro)
            if (!filtro) {
                console.log('www')
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
            // console.log(2)
            const json = await response.json()
            // console.log(3)
            // console.log(json)
            setErro(null)
            setDados(json)
            setCarregando(false)
            // return json.movies;
        } catch (e) {
            console.log(5, e)
            setErro("Não foi possível carregar estações")
        }
    }, [filtro])

    useEffect(() => {
        // if (carregando) return

        carregarDados()

        // http://all.api.radio-browser.info/json/stations
    }, [filtro])

    return { setFiltro, filtro, dados, carregando, erro }
}

export default useFetch