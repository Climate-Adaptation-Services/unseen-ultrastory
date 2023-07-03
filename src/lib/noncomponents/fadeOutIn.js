import { select } from "d3";

function fadeOutIn(src){
  select('.fixed-image')
    .transition('out').duration(500)
    .style('opacity', 0)
    .on('end', () => {
      document.getElementsByClassName("fixed-image")[0].src = src;
      select('.fixed-image')
        .transition('in').duration(500)
        .style('opacity', 1)
    })
}

function fadeOut(){
  select('.fixed-image')
  .transition('out').duration(500)
  .style('opacity', 0)
}

export function showImages(stepName, currentStepName, scenes, currentScene, offset){
  // console.log(stepName, currentStepName, scenes, currentScene, offset)
  let newScene;
  scenes.forEach(scene => {
    if(offset > scene.time){
      newScene = scene
    }     
  });
  if(newScene !== currentScene && newScene !== undefined){
    currentScene = newScene
    if(currentScene.name === ''){
      fadeOut()
    }else{
      fadeOutIn('/static/images/' + currentScene.name + '.' + currentScene.image)
    }
  }
  if(offset > 0.98){
    fadeOut()
    currentScene = undefined
  }
  return currentScene;
}
