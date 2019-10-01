/* eslint-disable no-undef */
import { Selector } from 'testcafe';

fixture`Color Picker Browser Test`
  .page`./core-color-picker.html`;
const getElementById = Selector(id => document.querySelector(id));
test('core label', async t => {
  const component = await getElementById('color-picker');
  await t
    .expect(component.hasAttribute('label')).eql(true);
});

test('Click colorpicker', async t => {
  const button = await Selector(() => document.querySelector('color-picker').shadowRoot.getElementById('colorButton'));
  await t
    .click(button);
});
