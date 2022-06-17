// Used to create a list of all selected genomes with a spec. init value
export const initializeRecord = (keys, intialValue) => {
    return keys.reduce((data, k) => {
        data[k] = intialValue;
        return data;
    }, {})
}
