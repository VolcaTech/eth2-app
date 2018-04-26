export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

export function updateAddress (address) {
    return {
        type: UPDATE_ADDRESS,
        address
    }
}