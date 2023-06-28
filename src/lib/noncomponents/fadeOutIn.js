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
    fadeOutIn('/images/' + currentScene.name + '.' + currentScene.image)
  }
  return currentScene;
}
