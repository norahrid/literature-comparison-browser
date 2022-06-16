import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import _ from "lodash";
import { saveAs } from 'file-saver';
import getFileByPath from "../helpers/getFileByPath";
import categorizeFile from "../helpers/categorizeFile";
import { getCompleteData, getReferenceMap, getContigMapping, matchUnitigsToChromosomes } from "../helpers/processDataHelpers";
import { scaleChromosomeData, formatDataIntoObject } from "../helpers/formatDataHelpers";
// import complete from "../exampleImages/complete-example.png";
// import general from "../exampleImages/agp-example.png";
// import contigs from "../exampleImages/contigs-example.png";
// import intact from "../exampleImages/intact-example.png";

const FileDrop = () => {

    const [fileList, setFileList] = useState([]);
    
    // need: ler_complete.tsv, ler_intact.gff3, ler.agp, ler_contigs.agp

    const onProcessFile = async () => {
        let uploadedDocuments = {}
        if (fileList.length > 0) {
            for (const [fileIndex, file] of fileList.entries()) {
                const fileContents = await getFileByPath(file);

                //turn this into a promise
                let decoder = new TextDecoder();
                let data = decoder.decode(fileContents);
                let classify = categorizeFile(file.name);
                uploadedDocuments[classify] = {"name": file.name,
                                                "data": data
                                            }
            }
        }
        const { complete, contig, intact, general } = uploadedDocuments;
        const processedCompleteData = getCompleteData(complete);
        const referenceMap = getReferenceMap(general);
        const contigMap = getContigMapping(contig, referenceMap);
        const mapped = matchUnitigsToChromosomes(intact, processedCompleteData, contigMap);

        const remapped = scaleChromosomeData(mapped);
        const finalData = formatDataIntoObject(remapped);

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(finalData)], {
            type: 'application/json'
        })
        saveAs(fileToSave, 'processedGenomeData.json');
    }

    return (
    <div className="main-app">
 
        <Dropzone onDrop={fileList => setFileList(fileList)}>
            {({getRootProps, getInputProps}) => (
            <section>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop here</p>
                </div>
            </section>
            )}
        </Dropzone>
        <button className="process-button" onClick={onProcessFile}>
            <span>{"Process"}</span>
        </button>

        <h2>File formatting</h2>

        {/* <p>This file helps us match unitigs to chromosomes. Example of the required format for GENOME.agp:</p>
        <img 
            src={general}
            alt="Example of a agp-example file"
            width="750"
        ></img>

        <p>This file helps us match unitigs to chromosomes. Example of the required format for GENOME_contigs.agp:</p>
        <img 
            src={contigs}
            alt="Example of a contigs-example file"
            width="750"
        ></img>

        <p>This file contains information about the repeat's clade. Example of the required format for GENOME_intact.gff3:</p>
        <img 
            src={intact}
            alt="Example of a intact-example file"
            width="900"
        ></img>     

        <p>This file contains information about a repeat's completeness. Example of the required format for GENOME_complete.tsv:</p>
        <img 
            src={complete}
            alt="Example of a complete-example file"
            width="750"
        ></img> */}

  </div>
 
  );
};

export default FileDrop;
