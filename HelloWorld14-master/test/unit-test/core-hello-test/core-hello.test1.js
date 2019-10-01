/* eslint-disable no-undef */
/* eslint-disable semi */
describe('Testing core-hello component', function () {
  let rainbowCSS = `
      transform: translateY(-50%); white-space: nowrap;
      animation: textAnimate 5s linear infinite alternate;
      background: linear-gradient( 92deg, #95d7e3, #eb76ff );
      background: -webkit-linear-gradient( 92deg, #95d7e3, #eb76ff );
      background-size:600vw 600vw;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      &::after {
        position: absolute; content: attr(data-text);
        left: 0; right: 0; background: none;
        box-shadow: 2px 4px 2px rgba(0,0,0,0.50);
        z-index: -1;
      }
    }
    @keyframes textAnimate {
      from {
        filter: hue-rotate(0deg); background-position-x: 0%;
      }
      to {
        filter: hue-rotate(360deg);
        background-position-x: 600vw;
      }
    }`;
  describe('Testing Constructor', function () {
    let element = new HelloWorldElement();
    it('Checking if element exists', function () {
      expect(element).not.toBe(null);
    });
    it('Test attributes', function () {
      expect(element.rainbow).toBe('}');
      expect(element.fontSize).toBe('12px');
      expect(element.fontFamily).toBe('Open Sans');
      expect(element.name).toBe('');
      let bar = {
        'en': 'Hello World',
        'sp': 'Hola Mundo',
        'fr': 'Bonjour le Monde'
      };
      expect(element.helloMap).toEqual(bar);
      expect(element.helloString).toBe(bar['en']);
      expect(element.rainbowCSS).toEqual(rainbowCSS);
      expect(element.name).toEqual(element.innerHTML);
    });
  });

  describe('Testing initUserAttribute', function () {
    let element;
    beforeEach(function () {
      element = new HelloWorldElement();
    });
    it('Checking default language english', function () {
      expect(element.helloString).toBe('Hello World');
    });
  });
  describe('Testing custom attributes', function () {
    it('creating element', function () {
      document.body.innerHTML = '<core-hello id=\'hello\' rainbow font-family=\'helvetica\' font-size=\'60pt\' lang=\'sp\'> </core-hello>';
      var element = document.getElementById('hello');
      expect(element.rainbow).toBe(rainbowCSS);
      expect(element.fontSize).toBe('60pt');
      expect(element.fontFamily).toBe('helvetica');
      expect(element.lang).toBe('sp');
    });
    it('testing language english', function () {
      document.body.innerHTML = '<core-hello id=\'hello\' lang=\'en\'> </core-hello>';
      var element = document.getElementById('hello');
      expect(element.lang).toBe('en');
    });
    it('testing language spanish', function () {
      document.body.innerHTML = '<core-hello id=\'hello\' lang=\'sp\'> </core-hello>';
      var element = document.getElementById('hello');
      expect(element.lang).toBe('sp');
    });
    it('testing language french', function () {
      document.body.innerHTML = '<core-hello id=\'hello\' lang=\'fr\'> </core-hello>';
      var element = document.getElementById('hello');
      expect(element.lang).toBe('fr');
    });
    it('testing language random', function () {
      document.body.innerHTML = '<core-hello id=\'hello\' lang=\'random\'> </core-hello>';
      var element = document.getElementById('hello');
      expect(element.lang).toBe('en');
    });
  });
});
