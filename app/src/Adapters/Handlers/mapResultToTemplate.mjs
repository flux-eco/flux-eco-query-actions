export const mapResultToTemplate = function mapResultToTemplate(result, template, mapped = {}) {
    const keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = template[key];
        if (key === "parent") {
            mapped[key] = () => {
                const parent = result[value.label];
                return parent ? { label: parent } : null;
            };
        } else if (key === "id") {
            mapped[key] = () => ({ label: result[value.label] });
        } else if (key === "data") {
            mapped[key] = {};
            const dataKeys = Object.keys(value);
            for (let j = 0; j < dataKeys.length; j++) {
                const dataKey = dataKeys[j];
                const dataValue = value[dataKey];
                mapped[key][dataKey] = (result) => ({ label: result[dataValue.label] });
            }
        }
    }
    return mapped;
};
