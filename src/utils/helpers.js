/* global requestAnimationFrame, cancelAnimationFrame */
export const count = (time, cb) => { // eslint-disable-line
  const start = Date.now();
  let rafId;

  return {
    start: function () { // eslint-disable-line
      function loop() {
        if (Date.now() - start >= time) {
          cb();
          return;
        }

        this.start();
      }

      rafId = requestAnimationFrame(loop.bind(this));
    },
    stop: function () { // eslint-disable-line
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
    },
  };
};

export const animate = (value, min, max, duration = 2000, easing = 'easeInOutCubic', cb = () => {}) => {
  const start = Date.now();
  let rafId;

  function loop() {
    const timestamp = Date.now();
    const deltaTime = timestamp - start;
    const mappedValue = easeInOutCubic(deltaTime) * ((max - min) / easeInOutCubic(duration)) + min; // value between min and max

    if (deltaTime >= duration) {
      cb();
      return;
    }

    if (deltaTime !== 0) {
      value[0][value[1]] = mappedValue // eslint-disable-line
    }

    rafId = requestAnimationFrame(loop.bind(this));
  }

  loop();

  return {
    stop: function () { // eslint-disable-line
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
    },
  };
};

export const easeInOutCubic = x => x ** 2 / x ** 2 + (1 - x) ** 2;

export const isIE = () =>
  typeof navigator !== 'undefined' &&
  (/MSIE 10/i.test(navigator.userAgent) ||
    (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)));

export const isSafari = () =>
  typeof navigator !== 'undefined' &&
  (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1);

export const isFirefox = () =>
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
