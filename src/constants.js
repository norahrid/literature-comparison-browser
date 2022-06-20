import { schemeCategory10 } from "d3";

export const DEFAULT_DATA_TYPE = "LITERATURE";

export const geneHeight = 15;

export const subregionGeneHeight = 25;

export const componentHeight = 75;

export const margin = 3;

// export const sliderWidth = 75;

export const alphaNum = 150;

//export const margin = 20;

//export const componentHeight = 115;

export const componentHeightWoutGDM = 90;

export const cascadeViewHeight = componentHeight * 3;

export const componentWidth = window.innerWidth * 0.90;

export const backgroundColour = "#22252c";

export const baseline = 25;

export const backgroundTextColour = 169;

export const sliderWidth = 50;

export const minSliderWidth = 10;

export const existingOptions = {
  LITERATURE: {
    label: "Literature",
    value: "LITERATURE",
    headers: ["Book", "Chapter", "Subsection"],
    dashboard: {
      1: {
        label: "Book",
        options: {
          PRIDE_AND_PREJUDICE: {
            label: "Pride and Prejudice",
            value: "PRIDE_AND_PREJUDICE"
          }
        },
        minElementRequirement: 1
      },
      2: {
        label: "Words",
        options: {
          ALL_WORDS: {
            label: "All words",
            value: "ALL_WORDS"
          },
          THE: {
            label: "the",
            value: "THE"
          },
          PRIDE: {
            label: "pride",
            value: "PRIDE"
          }
        },
        minElementRequirement: 1
      }
    }
  }
}


export const clades = {
  DEFAULT: { id: 0, label: 'All', value: 'DEFAULT', color: backgroundTextColour},
  TEKAY: { id: 1, label: "Tekay", value: "TEKAY", color: "#ff33f5" },
  OGRE: { id: 2, label: "Ogre", value: "OGRE", color: "#00ffff" },
  SIRE: { id: 3, label: "SIRE", value: "SIRE", color: "#ff0000" },
  ATHILA: { id: 4, label: "Athila", value: "ATHILA", color: "#00ff00" },
  ALE: { id: 5, label: "Ale", value: "ALE", color: "#ffff00" },
  ANGELA: { id: 6, label: "Angela", value: "ANGELA", color: "#008080" },
  IVANA: { id: 7, label: "Ivana", value: "IVANA", color: "#ff7f0e" },
  REINA: { id: 8, label: "Reina", value: "REINA", color: "#8c564b" },
  TAR: { id: 9, label: "TAR", value: "TAR", color: "#333eff" },
  TORK: { id: 10, label: "Tork", value: "TORK", color: "#FA8072" },
};

export const genomeOptions = {
  LENS_CULINARIS: {
    label: "Lens culinaris",
    value: "LENS_CULINARIS",
    chromosomeFormat: "Lcu.2RBY.Chr",
  },
  // LENS_TOMENTOSUS: {
  //   label: "Lens tomentosus",
  //   value: "LENS_TOMENTOSUS",
  //   chromosomeFormat: "Lto.1BIG.Chr",
  // },
  LENS_ERVOIDES: {
    label: "Lens ervoides",
    value: "LENS_ERVOIDES",
    chromosomeFormat: "Ler.1DRT.Chr",
  },
};

export const viewStyles = {
  FLAT: { label: "Flat", value: "flat" },
  CASCADE: { label: "Cascade", value: "cascade" },
};


export const completeOptions = {
  ALL: {label: "Show all", value: "all"},
  COMPLETE: {label: "Complete only", value: "complete"},
  FRAGMENT: {label: "Incomplete only", value: "fragment"}
}

export const trackOptions = {
  GDM: {label: "GDM", value: "GDM"},
  METHYLATION: {label: "Methylation", value: "METHYLATION"},
}
