import { dsv } from 'd3'

export function load(){
  // Regensburg temperature data
  const datatest = dsv(',', "https://hete-nachten.s3.eu-north-1.amazonaws.com/maxtemp-regensburg.csv")
  // TODO: Update these with Regensburg statistics when available
  const datamiddellijn = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/Observatie_Eindhoven_statistieken_Middellijn.csv")
  const datamiddellijn2050 = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/Observatie_Eindhoven_statistieken_Middellijn_2050.csv")
  const dataconfidence = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/confidence_intervals.csv")

  return {data:[datatest, datamiddellijn, dataconfidence, datamiddellijn2050]}
}