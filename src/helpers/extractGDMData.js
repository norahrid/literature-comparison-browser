fetch("data/all-edit.gff")
  .then((response) => response.text())
  .then((gffContent) => {
    const referenceMap = gffContent
      .trim()
      .split("\n")
      .map((e) => e.split("\t"))
      .filter((g) => g[0].includes("lt"));

    const finalMap = referenceMap
      .map((f) => {
        return [...f].join("\t");
      })
      .join("\n");
    console.log(finalMap);
  });
