function generateTransactionId() {
    const character = 'abcdefghijklmnopqrstuvwx0123456789'
    const length = 14
    const prefix = 'TXN_'

    let randomId = prefix
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * character.length)
        randomId += character[randomNumber]
    }

    return randomId
}

export default generateTransactionId

