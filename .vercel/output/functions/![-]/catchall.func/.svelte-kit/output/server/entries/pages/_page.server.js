import { dsv } from "d3";
function load() {
  const datatest = dsv(",", "https://raw.githubusercontent.com/sophievanderhorst/data/main/yearly_max_temp_eindhoven.csv");
  const datamiddellijn = dsv(",", "https://raw.githubusercontent.com/sophievanderhorst/data/main/Observatie_Eindhoven_statistieken_Middellijn.csv");
  const datamiddellijn2050 = dsv(",", "https://raw.githubusercontent.com/sophievanderhorst/data/main/Observatie_Eindhoven_statistieken_Middellijn_2050.csv");
  const dataconfidence = dsv(",", "https://raw.githubusercontent.com/sophievanderhorst/data/main/confidence_intervals.csv");
  return { data: [datatest, datamiddellijn, dataconfidence, datamiddellijn2050] };
}
export {
  load
};
