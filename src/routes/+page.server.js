import { dsv } from 'd3'

export function load(){
  const data = dsv(',', "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv")
  const datatest = dsv(',', "https://raw.githubusercontent.com/sophievanderhorst/data/main/yearly_max_temp_eindhoven.csv")
  return { data, datatest }
}