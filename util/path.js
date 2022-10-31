const path = require('path');

module.exports = path.dirname(process.mainModule.filename); //here, process is a global variable that is available in all files by default. mainModule refers to the module that started our application i.e. in this, it means the module that we created in app.js  .filename refers to the file in which the module was called. In, simple words, we're basically trying to get the path to the file that started our application.
//since we get a deprecated warning above, we can use this instead :- path.dirname(require.main.filename)  ,which does the same thing as above.