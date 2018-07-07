var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('Should generate the correct message object', () => {
    var mesObj = generateMessage('Beavis', 'Cornholio');

    console.log(mesObj.from);

    expect(typeof mesObj.createdAt).toBe("number");
    expect(mesObj.from).toBe('Beavis');
    expect(mesObj.text).toBe('Cornholio');
  });
});
