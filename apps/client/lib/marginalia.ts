export async function getAllMarginalias() {
    const res = await fetch(`http://localhost:3001/marginalia/all`)

    return res.json()
}

export async function getMarginalia(id: string) {
    const res = await fetch(`http://localhost:3001/marginalia/${id}`)

    return res.json()
}
