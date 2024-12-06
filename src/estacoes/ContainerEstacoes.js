import ListaEstacoes from "./ListaEstacoes"

export default function ContainerEstacoes({setRadio}) {
    return  (
        <CarregadorEstacoes>
            <ListaEstacoes setRadio={setRadio}/>
        </CarregadorEstacoes>
    )
}