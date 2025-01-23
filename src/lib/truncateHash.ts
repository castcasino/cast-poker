export const truncateHash = (_hash: string) => {
    if (!_hash) return ''
    return `${_hash.slice(0, 10)}...${_hash.slice(-8)}`
}
