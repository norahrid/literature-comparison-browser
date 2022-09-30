export const DEFAULT_DATA_TYPE = "LITERATURE";

export const componentHeight = 75;

export const margin = 3;

export const componentWidth = window.innerWidth * 0.90;

export const sliderWidth = 50;

export const minSliderWidth = 10;

export const existingOptions = {
  LITERATURE: {
    label: "Literature",
    value: "LITERATURE",
    legendLabel: "Word length",
    headers: ["Book", "Chapter", "Subsection"],
    dashboard: {
      1: {
        label: "Book",
        options: {
          PRIDE_AND_PREJUDICE: {
            label: "Pride and Prejudice",
            value: "PRIDE_AND_PREJUDICE"
          },
          EMMA: {
            label: "Emma",
            value: "EMMA"
          },
          SENSE_AND_SENSIBILITY: {
            label: "Sense and Sensibility",
            value: "SENSE_AND_SENSIBILITY"
          },
          ALICES_ADVENTURES_IN_WONDERLAND: {
            label: "Alice's Adventures in Wonderland",
            value: "ALICES_ADVENTURES_IN_WONDERLAND"
          },
        },
        minElementRequirement: 1,
        creatable: false,
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
          A: {
            label: "a",
            value: "A"
          },
          PREJUDICE: {
            label: "prejudice",
            value: "PREJUDICE"
          },
          LOVE: {
            label: "love",
            value: "LOVE"
          },
          RICH: {
            label: "rich",
            value: "RICH"
          },
        },
        minElementRequirement: 1,
        creatable: true,
      }
    }
  },
};



