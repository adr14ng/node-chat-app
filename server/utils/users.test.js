const expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Adrian',
      room: 'React Course'
    },{
      id: '3',
      name: 'Mario',
      room: 'Node Course'
    }];
  });

  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id: 1,
      name: 'Adrian',
      room: 'Cool'
    }
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should return names for Node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList.length).toBe(2);
    expect(userList).toEqual(['Mike', 'Mario']);
  });

  it('Should return users without Mario', () => {
    var userList = users.removeUser('3');

    expect(userList.length).toBe(2);
    expect(userList[0].name).toBe('Mike');
    expect(userList[1].name).toBe('Adrian');
  });

  it('Should return Adrian', () => {
    var user = users.getUser('2');

    expect(user.name).toBe('Adrian');
  });
});
