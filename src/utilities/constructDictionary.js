module.exports = (ingredientsArray) => {
    console.warn('this is the array', ingredientsArray);
    return new Promise((resolve, reject) => {
        const finalDictionary = ingredientsArray.reduce((dictionary, ingredient) => ({
            ...dictionary,
            [ingredient.id]: ingredient.name.charAt(0).toLowerCase()
        }), {});
        console.warn('finalDictionary', finalDictionary);
        resolve(finalDictionary);
    });
}