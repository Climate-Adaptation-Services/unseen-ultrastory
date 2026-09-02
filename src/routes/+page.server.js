import { dsv } from 'd3'

export function load() {
  // const data = dsv(',', "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv").value
  const datatest = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/yearly_max_temp_eindhoven.csv")
  const datamiddellijn = dsv(',', "https://hete-nachten.fsn1.your-objectstorage.com/Observatie_Eindhoven_Tmin_statistieken_Middellijn.csv")
  const datamiddellijn2050 = dsv(',', "https://hete-nachten.fsn1.your-objectstorage.com/Observatie_Eindhoven_Tmin_statistieken_Middellijn_2050.csv")
  const dataconfidence = dsv(',', "https://hete-nachten.fsn1.your-objectstorage.com/Observatie_Eindhoven_Tmin_statistieken_Confidence_Intervals.csv")
  // const unseen = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/SEAS5_JJA_Txx_Noord-Brabant_corrected.csv")

  return { data: [datatest, datamiddellijn, dataconfidence, datamiddellijn2050] }
}