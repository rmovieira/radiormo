const ULTIMAS = 'ultimas'

const adicionar = async (value) => {
    const ultimas = await recuperar()

    ultimas.unshift(value)
    if (ultimas.length > 3) {
        ultimas.pop()
    }

    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(ULTIMAS, jsonValue)
}

const recuperar = async () => {
    const jsonValue = await AsyncStorage.getItem(ULTIMAS)
    return jsonValue != null ? JSON.parse(jsonValue) : []
}

const salvar = async (value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(ULTIMAS, jsonValue)
}