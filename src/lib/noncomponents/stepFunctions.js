
export function getStepSize(stepName){
  const stepRect = document.getElementsByClassName('step_' + stepName)[0].getBoundingClientRect()
  const stepSize = stepRect.bottom - stepRect.top;
  return stepSize
}
