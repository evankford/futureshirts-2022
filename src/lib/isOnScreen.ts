import { browser } from "$app/env";

let observer:IntersectionObserver |undefined;

const offscreenEvent = browser ? new CustomEvent('offscreen') : undefined;
const onscreenEvent = browser ? new CustomEvent('onscreen') : undefined;

function handleIntersection(entries:IntersectionObserverEntry[]) {
  entries.forEach(entry=> {
    if (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('onScreen');
        entry.target.dispatchEvent(onscreenEvent)
      }
      else {
        entry.target.classList.remove('onScreen');
        entry.target.dispatchEvent(offscreenEvent)
      }
    }
  })
}

const options:IntersectionObserverInit = {
  threshold: [0.25, 0.5, 0.75],
  // rootMargin: '0 0%',
}

let observed:HTMLElement[] = [];

function watchOnScreen(node:HTMLElement) {
  if (!browser || !node) {
    return {
      destroy() {}
    }
  }
  if (!observer) {
    observer = new IntersectionObserver(handleIntersection, options);
  }
  observer.observe(node);
  observed.push(node);
  return  {
    destroy() {
     stopWatching(node);
    }
  }
}
function stopWatching(node:HTMLElement) {

  if (browser && observer && node) {
    observed.indexOf(node) > -1 ? observed.splice(observed.indexOf(node), 1) : null;
    observer.unobserve(node);
    if (observed.length == 0) {
      observer.disconnect();
      observer = undefined;
    }
  }
}



export default watchOnScreen;
export {stopWatching}