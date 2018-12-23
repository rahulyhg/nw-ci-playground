module.exports = {
  'Demo test Google' : function (client) {
    client
      .url('http://www.google.com')
      .waitForElementVisible('body', 9000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .end();
  }
};