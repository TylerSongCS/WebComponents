/* eslint-disable no-undef */
describe('Testing dialog component', function () {
  describe('Testing default component', function () {
    it('testing no attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\'></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.disabled).toBe(false);
      expect(element.centered).toBe(false);
      expect(element.content).toBe('');
      expect(element.visible).toBe(false);
      expect(element.pusher).toBe('');
      expect(element.width).toBe('50%');
      expect(element.height).toBe('25%');
      expect(element.fullScreen).toBe(false);
    });
  });
  describe('Testing title attribute', function () {
    it('testing title attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' pair-title=\'123\'></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.getAttribute('title')).toBe('123');
    });
  });
  describe('Testing center attribute', function () {
    it('testing center attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' center></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.hasAttribute('center')).toBe(true);
    });
  });
  describe('Testing pusher attribute', function () {
    it('testing pusher attributes', function () {
      document.body.innerHTML = '<pair-button id="opener1">Click to see dialog</pair-button><pair-dialog id=\'pdialog\' pusher="opener1"></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.getAttribute('pusher')).toBe('opener1');
    });
  });
  describe('Testing width attribute', function () {
    it('testing width attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' width="75%"></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.getAttribute('width')).toBe('75%');
    });
  });
  describe('Testing height attribute', function () {
    it('testing height attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' height="75%"></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.getAttribute('height')).toBe('75%');
    });
  });
  describe('Testing top attribute', function () {
    it('testing top attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' top="75%"></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.getAttribute('top')).toBe('75%');
    });
  });
  describe('Testing fullscreen attribute', function () {
    it('testing fullscreen attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' fullscreen></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.hasAttribute('fullscreen')).toBe(true);
    });
  });
  describe('Testing shape attribute', function () {
    it('testing shape attributes', function () {
      document.body.innerHTML = '<pair-dialog id=\'pdialog\' round></pair-dialog>';
      var element = document.getElementById('pdialog');
      expect(element.hasAttribute('round')).toBe(true);
    });
  });
});
