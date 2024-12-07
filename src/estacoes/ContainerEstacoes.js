import { useState } from "react"
import ListaEstacoes from "./ListaEstacoes"
import BarraPesquisa from "./BarraPesquisa"

export default function ContainerEstacoes({ setRadio }) {
    const [filtro, setFiltro] = useState()
    return (
        <>
            <BarraPesquisa filtrar={setFiltro} filtro={filtro} />
            <CarregadorEstacoes filtro={filtro}>
                <ListaEstacoes setRadio={setRadio} />
            </CarregadorEstacoes>
        </>
    )
}