var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString Validation', () => {
  it('Should reject non-string value' , () => {
    var params = {
      name: 001,
      room: '~~~'
    }

    expect(isRealString(params.name)).toBeFalsy();
  });

  it('Should reject string with only spaces' , () => {
    var params = {
      name: ' ',
      room: ' '
    }
    expect(isRealString(params.name)).toBeFalsy();
  });

  it('Should allow strings w/ non-string chars' , () => {
    var params = {
      name: 'Adrian',
      room: 'Big Bro'
    }
    expect(isRealString(params.name)).toBeTruthy();
  });
});
