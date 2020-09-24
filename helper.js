function filterOutNonDates(data) {
  return data.filter(function(d) {
    return d["PlantDate"] != ""
  });
}

function mapDataToDates(data) {
  data.forEach(function(d) {
    d["Month"] = d["PlantDate"].split("/")[0];
    d["Day"] = d["PlantDate"].split("/")[1];
    d["Year"] = d["PlantDate"].split("/")[2].substring(0, 4);
  });
  return data;
}

function getFrequencyByKey(data, str, splitter="::", index = 0) {
    let map = new Map();
    for (var i = 0; i < data.length; i++) {
        let key = data[i][str].split(splitter)[index];
        // let key = data[i][str];
        if (!map.has(key)) {
            map.set(key, 1);
        } else {
            map.set(key, map.get(key) + 1);
        }
    }

    let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    return sortedMap;
}

function getFrequencyByTwoKeys(data, str1, str2) {
    let map = {};
    for (var i = 0; i < data.length; i++) {
        let key = data[i][str1].split(":")[0];
        let key2 = data[i][str2];
        if (!(key in map)) {
            map[key] = {};
            map[key][key2] = 1
        } else {
            map[key][key2] = !(key2 in map[key]) ? 1 : (map[key][key2] + 1);
        }
    }

    // var sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    return map;
}

function sortJsMap(map) {
  return new Map([...Object.entries(map)].sort((a, b) => b[1] - a[1]));
}

function createFakePieData() {
  return {"Jan": 1, "Feb": 1, "Mar": 1, "Apr": 1, "May": 1, "Jun": 1,"July": 1,
    "Aug": 1, "Sep": 1, "Oct": 1, "Nov": 1, "Dec": 1 };
}

function getMinMaxMonthsBySpecies(topFive, data) {
  let finalData = {};
  topFive.forEach(function(d) {
    let tempData = data.filter(function(g) {
      return g["qSpecies"].split("::")[1] == d;
    });
    let months = Array.from(getFrequencyByKey(tempData, "Month").keys());
    finalData[d] = {"max": months[0], "min": months[months.length - 1]}
  });
  return finalData;
}
