

export const numberFormat = (number) => {
    return new Intl.NumberFormat().format(number)
}

export function handleError(message) {

    if (typeof message === 'object') {

        const errors = []
        Object.keys(message).map(key => {
            message[key].map(e => {
                errors.push(e)
            })
        })

        return errors.join('**')

    } else {

        return message
    }

}

export function discountPercent(price, salePrice) {

    let discount = ((price - salePrice) / price) * 100
    return Math.round(discount)
}