/**
 * Maps a response template object to an object with function calls.
 *
 * @param {Object} template - The response template object.
 * @returns {Object} The mapped object with function calls.
 */
export const mapResponseTemplateFunctions = function (template) {
    const dataKeys = Object.keys(template.data);
    const data = dataKeys.reduce((acc, key) => {
        if (typeof template.data[key] === "function") {
            acc[key] = (result) => template.data[key](result);
        } else {
            acc[key] = template.data[key];
        }
        return acc;
    }, {});

    console.log("ddddddddddd");
    console.log(template);

    return {
        parent: () => template.parent,
        id: () => template.id,
        data,
    };
};