import {Component} from 'component-loader-js';
//import Kraken from 'kraken';

class KrakenDemo extends Component {

  constructor() {
    super(...arguments);
    console.log('rip Kraken');
  }

  destroy() {
    super.destroy();
  }

}

export default KrakenDemo;