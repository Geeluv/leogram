export function setImageLink(link) {
    let splitLink = link.split("uploads\\");
    return splitLink[1];
}

export function setImageName(imageArr) {
    const imageName = imageArr[0]?.name
    if (imageName) {
        return imageName?.slice(0, 12) + "..." + imageName?.slice(-3)
    }
}