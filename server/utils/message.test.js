var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('Should generate the correct message object', () => {
    var mesObj = generateMessage('Beavis', 'Cornholio');


    expect(typeof mesObj.createdAt).toBe('number');
    expect(mesObj.from).toBe('Beavis');
    expect(mesObj.text).toBe('Cornholio');
  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object', () => {
    var locObj = generateLocationMessage("Adrian", 0, 0);

    expect(typeof locObj.createdAt).toBe('number');
    expect(locObj.from).toBe('Adrian');
    expect(locObj.url).toBe('https://www.google.com/maps?q=0,0');
  });
});
