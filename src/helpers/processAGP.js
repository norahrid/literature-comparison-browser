// Fetch info about the complete repeats and process for later lookup
fetch("data/lc_complete.tsv")
.then((response) => response.text())
.then((completeContent) => {
  let lines = completeContent.split("\n").slice(1);
  let completeData = lines.reduce((data, line) => {
    let id = line.split("\t")[0].split("#")[0];
    data[id] = line.split("\t")[4];
    return data;
  }, {});
  


    // Fetch the AGP file and parse it into an reference map object
  fetch("data/lc.agp")
  .then((response) => response.text())
  .then((agpContent) => {
    const referenceMap = agpContent
      .trim()
      .split("\n")
      .filter((d) => d.trim().indexOf("#") == -1)
      .map((e) => e.split("\t"))
      .filter((g) => g[4] == "W")
      .map((f) => {
        return {
          chromosomeID: f[0],
          chromosomeStart: +f[1],
          chromosomeEnd: +f[2],
          // example: "Lcu.2RBY.unitig3317" first split by . and then get the third element
          contigID: f[5].split(".")[2],
          contigStart: +f[6],
          contigEnd: +f[6],
        };
      });

    const AGPReferenceMap = referenceMap.reduce(
      (entryMap, e) =>
        entryMap.set(e.contigID, [...(entryMap.get(e.contigID) || []), e]),
      new Map()
    );

    // Once the AGP reference map is ready, fetch the gff file

    fetch("data/lc_intact.gff3")
      .then((response) => response.text())
      .then((intactGFF) => {
        let linesGFF = intactGFF
          .trim()
          .split("\n")
          .map((e) => e.split("\t"))
          .map((f) => {
            let unitigId = f[8].split("#")[0].split("=")[1];
            let AGPmap = AGPReferenceMap.get(f[0])[0] || {};
            // example props in a AGP map entry
            // chromosomeEnd: 318712989
            // chromosomeID: "Lcu.2RBY.Chr7"
            // chromosomeStart: 309268626
            // contigEnd: 1
            // contigID: "unitig0001"
            // contigStart: 1
            return [
              AGPmap.chromosomeID,
              AGPmap.chromosomeStart,
              AGPmap.chromosomeEnd,
              ...f,
              completeData[unitigId],
            ].join("\t");
          })
          .join("\n");

        //Logging linesGFF to the console gives user an option to copy its contents and paste it into a file
        //console.log(linesGFF);
      });
  });
});

// FOR PROCESSING LTO
  // Fetch info about the complete repeats and process for later lookup
  fetch("data/lto_complete.tsv")
  .then((response) => response.text())
  .then((completeContent) => {
    let lines = completeContent.split("\n").slice(1);
    let completeData = lines.reduce((data, line) => {
      let id = line.split("\t")[0].split("#")[0];
      data[id] = line.split("\t")[4];
      return data;
    }, {});
    
    fetch("data/lto.agp")
    .then((response) => response.text())
    .then((agpContent) => {
      const referenceMap = agpContent
        .trim()
        .split("\n")
        .filter((d) => d.trim().indexOf("#") == -1)
        .map((e) => e.split("\t"))
        .filter((g) => g[4] == "W")
        .map((f) => {
          return {
            chromosomeID: f[0],
            chromosomeStart: +f[1],
            chromosomeEnd: +f[2],
            // example: "Lcu.2RBY.unitig3317" first split by . and then get the third element
            // 'contigID': f[5].split('.')[2],
            contigID: f[5].split(".").slice(2, 4).join(""),
  
            contigStart: +f[6],
            contigEnd: +f[7],
          };
        });
  
      const tempReferenceMap = referenceMap.reduce(
        (entryMap, e) =>
          entryMap.set(e.contigID, [...(entryMap.get(e.contigID) || []), e]),
        new Map()
      );
  
      // const AGPReferenceMap = new Map();
      fetch("data/lto_contigs.agp")
        .then((response) => response.text())
        .then((contigContent) => {
          let linesContigs = contigContent
            .trim()
            .split("\n")
            .map((e) => e.split("\t"))
            .map((f) => {
              let unitigID = f[0].split(".").slice(2, 4).join("");
              let newUnitigID = f[5];
              return {
                ...tempReferenceMap.get(unitigID)[0],
                componentID: newUnitigID,
              };
            });
          const AGPReferenceMap = linesContigs.reduce(
            (entryMap, e) =>
              entryMap.set(e.componentID, [
                ...(entryMap.get(e.contigID) || []),
                e,
              ]),
            new Map()
          );
  
          // Once the AGP reference map is ready, fetch the gff file
          fetch("data/lto_intact.gff3")
            .then((response) => response.text())
            .then((intactGFF) => {
              let linesGFF = intactGFF
                .trim()
                .split("\n")
                .map((e) => e.split("\t"))
                .map((f) => {
                  let matchId = f[8].split("#")[0].split("=")[1]
                  let id = f[0].split("|");
                  if (id.length === 1) id = id[0];
                  else if (id.length > 1) id = id[1];
                  // console.log(id)
                  if (AGPReferenceMap.has(id)) {
                    let AGPmap = AGPReferenceMap.get(id)[0] || {};
                    // example props in a AGP map entry
                    // chromosomeEnd: 318712989
                    // chromosomeID: "Lcu.2RBY.Chr7"
                    // chromosomeStart: 309268626
                    // contigEnd: 1
                    // contigID: "unitig0001"
                    // contigStart: 1
                    return [
                      AGPmap.chromosomeID,
                      AGPmap.chromosomeStart,
                      AGPmap.chromosomeEnd,
                      ...f,
                      completeData[matchId]
                    ].join("\t");
                  }
                })
                .join("\n");
  
              //Logging linesGFF to the console gives user an option to copy its contents and paste it into a file
              console.log(linesGFF);
            });
        });
    });
  });
  