import _ from "lodash";
import { dataFileManager } from "../dataFileManager";
import { calculateChromosomeBoundaries } from "./calculateChromosomeBoundaries";
import { mapMaxChromosomePosition, mapMinChromosomePosition } from "./mapChromosomePositions";

export const formatGenomeData = (genomes) => {
    let genomeData = genomes.map((g) => {
        const { repeatData, geneData, methylationData } = dataFileManager[g];
    
        const GENE_DENSITY_MAX = _.maxBy(
            _.flatMap(geneData),
            (d) => +d.density
        ).density;
        const GENE_DENSITY_MIN = _.minBy(
            _.flatMap(geneData),
            (d) => +d.density
        ).density;

        const METHYL_DENSITY_MAX = _.maxBy(
            _.flatMap(methylationData),
            (d) => +d.density
        ).density;

        const METHYL_DENSITY_MIN = _.minBy(
            _.flatMap(methylationData),
            (d) => +d.density
        ).density;
    
        const minChromosomePositions = mapMinChromosomePosition(repeatData);
        const maxChromosomePositions = mapMaxChromosomePosition(repeatData);
    
        const chromosomeBoundaries = calculateChromosomeBoundaries(
            repeatData,
            geneData
        );
    
        return {
            "genome": g,
            "repeatData": repeatData,
            "geneData": geneData,
            "methylationData": methylationData,
            "geneDensityMax": GENE_DENSITY_MAX,
            "geneDensityMin": GENE_DENSITY_MIN,
            "methylationDensityMax": METHYL_DENSITY_MAX,
            "methylationDensityMin": METHYL_DENSITY_MIN,
            "minChromosomePositions": minChromosomePositions,
            "maxChromosomePositions": maxChromosomePositions,
            "chromosomeBoundaries": chromosomeBoundaries
        }
    });
    return genomeData;
}
