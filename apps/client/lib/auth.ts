export async function login(body: any) {
    const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

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

    if (!res.ok) {
        throw new Error('Please, enter a valid data format.')
    }

    return data
}

export async function deleteAccount(token: string) {
    const res = await fetch(`http://localhost:3001/user`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    console.log(res)
}
