export const truncateAddress = (_address: string) => {
    if (!_address) return ''
    return `${_address.slice(0, 14)}...${_address.slice(-12)}`
}
