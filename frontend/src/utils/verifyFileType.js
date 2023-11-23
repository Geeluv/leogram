export default function verifyFileType(filename) {
    const splitName = filename.split(".");
    if (splitName[1] === "mp4") {
        return "video"
    } else {
        return "image"
    }
}