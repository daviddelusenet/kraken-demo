import {Component} from 'component-loader-js';
import Kraken from 'kraken';

class KrakenDemo extends Component {

  constructor() {
    super(...arguments);

    this.setupKraken();

    document.querySelector('button').addEventListener('click', () => this.optimizeImage());

  }

  setupKraken() {

    this.kraken = new Kraken({
      api_key: 'd545003004a469f88206ac33095a6d80',
      api_secret: 'd8b73e5ebbd44c798b15529b3e805195aa6d9cb4'
    });

    this.krakenOptions = {
      url: '',
      lossy: true,
      wait: true
    };

  }

  optimizeImage() {

    this.krakenOptions.url = document.querySelector('input').value;

    this.kraken.url(this.krakenOptions, function(data, err) {
      if (err) {
        console.log('Failed. Error message: %s', err);
      } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);

        const link = document.createElement('a');
        link.setAttribute('download', '');
        link.href = data.kraked_url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });

  }

  destroy() {
    super.destroy();
  }

}

export default KrakenDemo;