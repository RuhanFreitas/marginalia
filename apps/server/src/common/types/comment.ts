export type Comment = {
    id: number
    parentId: number | null
    children?: Comment[]
    [key: string]: any
}
