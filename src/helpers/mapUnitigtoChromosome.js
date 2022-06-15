fetch("data/lc_mapped.gff3")
  .then((response) => response.text())
  .then((gffContent) => {
    let referenceMap = gffContent.trim().split("\n");
    referenceMap = referenceMap.map((d) => d.split("\t"));
    let groups = _.groupBy(referenceMap, (d) => d[0]);
    let chromosomeKeys = _.keys(groups);
    chromosomeKeys = _.keys(groups).filter(
      (d) => d.indexOf("unitig") == -1 && d !== ""
    );

    let lineStore = [];

    _.each(chromosomeKeys, (d) => {
      let chromosomeData = groups[d];
      let sortedChromosomeData = _.sortBy(
        _.sortBy(chromosomeData, (e) => +e[2]),
        (d) => +d[1]
      );

      let chromosomeDataGroupByStart = _.groupBy(
        sortedChromosomeData,
        (d) => +d[1]
      );

      _.each(chromosomeDataGroupByStart, (groupArray) => {
        let unitigMinimum = _.minBy(groupArray, (d) => +d[6])[6];
        let unitigMaximum = _.maxBy(groupArray, (d) => +d[7])[7];

        let chromosomeGroupStart = groupArray[0][1],
          chromosomeGroupEnd = groupArray[0][2];

        var mappingScaleFunction = scaleLinear()
          .domain([+unitigMinimum, +unitigMaximum])
          .range([+chromosomeGroupStart, +chromosomeGroupEnd]);

        _.each(groupArray, (line) => {
          line[6] = Math.round(mappingScaleFunction(+line[6]));
          line[7] = Math.round(mappingScaleFunction(+line[7]));
          lineStore.push(line);
        });
      });
    });

    let lineStoreTabbed = lineStore.map((d) => d.join("\t")).join("\n");
    console.log(lineStoreTabbed);
  });
