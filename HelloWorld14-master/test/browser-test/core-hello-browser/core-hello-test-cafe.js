/* eslint-disable semi */
/* eslint-disable no-undef */

import { Selector } from 'testcafe';

fixture`Core-Hello Browser Test`
  .page`./core-hello.html`;
test('name input text', async t => {
  const userInput = await Selector(() => document.querySelector('core-hello'));
  await t
    .expect(userInput.textContent).eql('Peter');
});
test('Hello World + name text', async t => {
  const shadowInput = await Selector(() => document.querySelector('core-hello').shadowRoot.querySelector('h1'));
  await t
    .expect(shadowInput.innerText).eql('Hello World Peter');
});
test('font-size attribute', async t => {
  const helloComp = await Selector(() => document.querySelector('core-hello'));
  await t
    .expect(helloComp.hasAttribute('font-size')).eql(true)
    .expect(helloComp.getAttribute('font-size')).eql('60pt');
});
test('font-family attribute', async t => {
  const helloComp = await Selector(() => document.querySelector('core-hello'));
  await t
    .expect(helloComp.hasAttribute('font-family')).eql(true)
    .expect(helloComp.getAttribute('font-family')).eql('helvetica');
});
test('rainbow attribute', async t => {
  const helloComp = await Selector(() => document.querySelector('core-hello'));
  await t
    .expect(helloComp.hasAttribute('rainbow')).eql(true);
});
