import Pride_and_Prejudice_data from "./assets/Pride_and_Prejudice_data.json";
import Alice_Wonderland_data from "./assets/Alices_Adventures_in_Wonderland_data.json";
import Sense_and_Sensibility_data from "./assets/Sense_and_Sensibility_data.json";
import Emma_data from "./assets/Emma_data.json";
import gdm_lcu from "./assets/gdm_lcu.json";
import gdm_ler from "./assets/gdm_ler.json";

export const dataFileManager = {
    LITERATURE: {
        PRIDE_AND_PREJUDICE: Pride_and_Prejudice_data,
        ALICES_ADVENTURES_IN_WONDERLAND: Alice_Wonderland_data, 
        EMMA: Emma_data,
        SENSE_AND_SENSIBILITY: Sense_and_Sensibility_data
    },
    GENE_DENSITY: {
        LENS_CULINARIS: gdm_lcu,
        LENS_ERVOIDES: gdm_ler,
    },
};
