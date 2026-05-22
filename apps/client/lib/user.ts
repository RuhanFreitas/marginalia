type update = {
    name?: string
    email?: string
    password?: string
}

export async function updateAccount(body: update, token: string) {
    const res = await fetch(`http://localhost:3001/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    return res.json()
}
