Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(scrollDOM, amount) {
  (scrollDOM || document.documentElement || document.body.parentNode || document.body).scrollTop = amount
}

function position(scrollDOM) {
  // console.log(scrollDOM.scrollTop)
  return scrollDOM.scrollTop || document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {String | HTMLElement | HTMLDocument} scrollEl
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export default function scrollTo(scrollEl, to, duration, callback) {
  return new Promise((resolve, reject) => {
    const scrollDOM = document.querySelector(scrollEl)
    const start = position(scrollDOM)
    // console.log(start, to)
    const change = to - start
    const increment = 20
    let currentTime = 0
    duration = (typeof (duration) === 'undefined') ? 500 : duration
    var animateScroll = function() {
    // increment the time
      currentTime += increment
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration)
      // move the document.body
      move(scrollDOM, val)
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll)
      } else {
        resolve()
      // if (callback && typeof (callback) === 'function') {
      //   // the animation is done so lets callback
      //   callback()
      // }
      }
    }
    animateScroll()
  })
}
