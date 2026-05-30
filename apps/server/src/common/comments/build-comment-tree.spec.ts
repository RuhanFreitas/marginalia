import { buildCommentTree } from './build-comment-tree'

describe('buildCommentTree', () => {
    it('should nest replies under their parent', () => {
        const comments = [
            { id: 1, parentId: null, content: 'Root' },
            { id: 2, parentId: 1, content: 'Reply' },
        ]

        const tree = buildCommentTree(comments)

        expect(tree).toHaveLength(1)
        expect(tree[0].id).toBe(1)
        expect(tree[0].replies).toHaveLength(1)
        expect(tree[0].replies![0].id).toBe(2)
    })

    it('should treat orphan replies as root nodes', () => {
        const comments = [{ id: 2, parentId: 99, content: 'Orphan' }]

        const tree = buildCommentTree(comments)

        expect(tree).toHaveLength(1)
        expect(tree[0].id).toBe(2)
    })

    it('should return multiple root comments', () => {
        const comments = [
            { id: 1, parentId: null, content: 'A' },
            { id: 2, parentId: null, content: 'B' },
        ]

        const tree = buildCommentTree(comments)

        expect(tree).toHaveLength(2)
    })
})
