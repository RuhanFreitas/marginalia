export async function login(body: any) {
    const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    return data
}

export async function register(body: any) {
    const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    return data
}
