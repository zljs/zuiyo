import VConsole from 'vconsole';

(function () {
  if (process.env.TYPE === 'prod') {

  } else {
    return new VConsole()
  }
})()
