const { chunk } = require('lodash');

module.exports.chunkify = (table, data) => {
    data = chunk(data, 500);

    let initialPromise = Promise.resolve();

    for (var i = 0; i < data.length; i++) {
        const chunk = data[i];

        initialPromise = initialPromise.then(() => table.insert(chunk));
    }

    return initialPromise;
}

module.exports.defaultMail = (user) => {
    const firstname = user.firstname.toLowerCase().replace(/ /g, '-');
    const lastname = user.lastname.toLowerCase().replace(/ /g, '-');

    return `${firstname}.${lastname}@utt.fr`;
}
