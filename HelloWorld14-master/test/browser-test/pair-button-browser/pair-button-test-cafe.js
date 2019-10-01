/* eslint-disable semi */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';

fixture`Pair Button Browser Test`
  .page`./pair-button.html`;

const getElementById = Selector(id => document.querySelector(id));
test('Inner text', async t => {
  const component = await Selector(() => document.querySelector('pair-button').shadowRoot.querySelector('button'));
  await t
    .expect(component.innerText).eql('Peter');
});
test('Round attribute', async t => {
  const component = await getElementById('pair-button');
  await t
    .expect(component.hasAttribute('round')).eql(true);
});
test('type attribute', async t => {
  const component = await getElementById('pair-button');
  await t
    .expect(component.getAttribute('type')).eql('primary');
});
test('Click button', async t => {
  const component = await Selector(() => document.querySelector('pair-button').shadowRoot.querySelector('button'));
  await t
    .click(component);
});
test('Hover button', async t => {
  const component = await Selector(() => document.querySelector('pair-button').shadowRoot.querySelector('button'));
  await t
    .hover(component);
});
