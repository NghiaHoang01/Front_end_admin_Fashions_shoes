export const Capitalize = (arr) => {
    return arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
}