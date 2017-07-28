// Style import
import './../scss/app.scss';

// Component loader used for loading JavaScript components
import ComponentLoader        from 'component-loader-js';
// Import components
import KrakenDemo from './KrakenDemo/KrakenDemo';

document.addEventListener('DOMContentLoaded', function () {

  console.info("Init Kraken Demo");

  const componentLoader = new ComponentLoader({
    KrakenDemo
  });

  componentLoader.scan();

}, false);
