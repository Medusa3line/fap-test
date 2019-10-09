export const pinRegex = (event) => {
    return event.target.value.replace(/[^0-9]/g, '').trim()
}