// Helper functions to aid with initialization and img grabbing

// Used to create a list of all selected genomes with a spec. init value
export const initializeRecord = (keys, intialValue) => {
    return keys.reduce((data, k) => {
        data[k] = intialValue;
        return data;
    }, {})
}

// Collects all of the clade images for the selected genome
export const getGenomeImages = (genome, clades, completeFilter) => {
    let requiredImgs = {};
    for (let i=0; i<clades.length; i++) {
        for (let j=0; j<Object.keys(genome.repeatData).length; j++) {
            for (let k=0; k<completeFilter.length; k++) {
                // Check what complete filter is applied 
                let id;
                if (completeFilter[k] === "all") id = `${genome.genome}_${clades[i]}_${j+1}`;
                else id = `${genome.genome}_${clades[i]}_${completeFilter[k]}_${j+1}`;
                requiredImgs[id] = require(`../preprocessedAssets/${id}.jpg`).default;
            }
            // // Check what complete filter is applied 
            // let id;
            // if (completeFilter === "all") id = `${genome.genome}_${clades[i]}_${j+1}`;
            // else id = `${genome.genome}_${clades[i]}_${completeFilter}_${j+1}`;
            // requiredImgs[id] = require(`../preprocessedAssets/${id}.jpg`).default;
        }
    }
    return requiredImgs;
}

// Grab the GDMs for the selected genome
export const getGDMImages = (genome, trackType) => {
    let requiredImages = new Map();
    for (let i=0; i<Object.keys(genome.repeatData).length; i++) {
        for (let j=0; j<trackType.length; j++) {
            let id = `${genome.genome}_${trackType[j]}_${i+1}`;
            requiredImages.set(id, require(`../preprocessedAssets/${id}.jpg`).default);
        }
    }
    return requiredImages;
}

// Grab all the clade images for the selected chromosome
export const getChromosomeImage = (genome, clades, completeFilter, chromosome) => {
    let requiredImgs = {};
    for (let i=0; i<clades.length; i++) {
        for (let j=0; j<completeFilter.length; j++) {
            let id;
            let chromosomeNum = chromosome.charAt(chromosome.length-1)
            if (completeFilter[j] === "all") id = `${genome.genome}_${clades[i]}_${chromosomeNum}`;
            else id = `${genome.genome}_${clades[i]}_${completeFilter[j]}_${chromosomeNum}`;
            requiredImgs[id] = require(`../preprocessedAssets/${id}.jpg`).default
        }
    }
    // const requiredImgs = clades.map(c => {
    //     for (let i=0; i<completeFilter.length; i++) {
    //         let id;
    //         let chromosomeNum = chromosome[genome.genome].charAt(chromosome[genome.genome].length-1)
    //         if (completeFilter[i] === "all") id = `${genome.genome}_${c}_${chromosomeNum}`;
    //         else id = `${genome.genome}_${c}_${completeFilter[i]}_${chromosomeNum}`;
    //         return require(`../preprocessedAssets/${id}.jpg`).default
    //     }
    //     let id;
    //     let chromosomeNum = chromosome[genome.genome].charAt(chromosome[genome.genome].length-1)
    //     if (completeFilter === "all") id = `${genome.genome}_${c}_${chromosomeNum}`;
    //     else id = `${genome.genome}_${c}_${completeFilter}_${chromosomeNum}`;
    //     return require(`../preprocessedAssets/${id}.jpg`).default
    // });
    return requiredImgs;
}

// Grab the GDM that corresponds to the selected chromosome
export const getChromosomeGDMImage = (genome, chromosome, trackType) => {
    let requiredImages = new Map();
    for (let i=0; i<trackType.length; i++) {
        let chromosomeNum = chromosome.charAt(chromosome.length-1)
        let id = `${genome.genome}_${trackType[i]}_${chromosomeNum}`;
        requiredImages.set(id, require(`../preprocessedAssets/${id}.jpg`).default);
    }
    return requiredImages;
}
