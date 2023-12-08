export const ConvertDate = (value) => {
    const parts = value.split("-")
    const formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formattedDate
}