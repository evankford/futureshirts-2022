import { browser } from "$app/env";


function handleIntersection(entries:IntersectionObserverEntry[]) {
  const offscreenEvent = new CustomEvent('offscreen')
  const onscreenEvent = new CustomEvent('onscreen')

  entries.forEach(entry=> {
    if (entry.isIntersecting) {
      entry.target.classList.add('onScreen');
      entry.target.dispatchEvent(onscreenEvent)
    }
    else {
      entry.target.classList.remove('onScreen');
      entry.target.dispatchEvent(offscreenEvent)
    }
  })
}

const options:IntersectionObserverInit = {
  threshold: [0,0.25,  0.75,  1],
  // rootMargin: '-14px -14px',
}

function watchOnScreen(node:HTMLElement) {
  if (browser && observer) {

    observer.observe(node);
    return  {
      destroy() {
        observer.unobserve(node);
      }
    }
  }
}
function stopWatching(node:HTMLElement) {
  if (browser && observer) {
    observer.unobserve(node);
  }
}


const observer = browser && new IntersectionObserver(handleIntersection, options)

export default watchOnScreen;
export {stopWatching}