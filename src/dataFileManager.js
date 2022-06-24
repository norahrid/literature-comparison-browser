import Pride_and_Prejudice_data from "./assets/Pride_and_Prejudice_data.json";
import gdm_lcu from "./assets/gdm_lcu.json";
import gdm_ler from "./assets/gdm_ler.json";

export const dataFileManager = {
    LITERATURE: {
        PRIDE_AND_PREJUDICE: Pride_and_Prejudice_data,
    },
    GENE_DENSITY: {
        LENS_CULINARIS: gdm_lcu,
        LENS_ERVOIDES: gdm_ler,
    },
};
