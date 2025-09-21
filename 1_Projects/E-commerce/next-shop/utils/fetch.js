

export const getFetch = async (url, headers = {}) => {

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
    })

    if (response.ok) {
        const data = await response.json()
        return data.data
    } else {
        throw new Error(`مشکل در دریافت اطلاعات کد : ${response.status}`)
    }
}

export const postFetch = async (url, body, headers = {}) => {

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()
    return data

}