import { dsv } from 'd3'

export function load(){
  const data = dsv(',', "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv")
  const datatest = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/yearly_max_temp_eindhoven.csv")
  const datamiddellijn = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/Observatie_Eindhoven_statistieken_Middellijn.csv")
  const dataconfidence = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/confidence_intervals.csv")
  const unseen = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/SEAS5_JJA_Txx_Noord-Brabant_corrected.csv")
  return { data, datatest, datamiddellijn, dataconfidence, unseen }
}