module.exports = (complexArray) => {
    return new Promise((resolve, reject) => {
        const finalDictionary = complexArray.reduce((dictionary, element) => ({
            ...dictionary,
            [element.id]: element.name.charAt(0).toLowerCase()
        }), {});
        resolve(finalDictionary);
    });
}