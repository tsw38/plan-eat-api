module.exports = (tagObj) => {
    return new Promise((resolve, reject) => {
        const finalList = Object.keys(tagObj).reduce((dictionary, letter) => {
            return {
                ...dictionary,
                ...(Object.keys(tagObj[letter]).reduce((subDictionary, id) => {
                    const tagInfo = tagObj[letter][id];

                    return {
                        ...subDictionary,
                        ...(
                            tagInfo.isGrocerSection && !subDictionary[id] && {
                            [id]: tagInfo.name
                        })
                    }
                }, {}))
            }
        }, {});
        resolve(finalList)
    })
}