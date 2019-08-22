const path = require('path');

module.exports = function(app) {
    const rootPath = path.dirname(require.main.filename);
    
    app.set('views', path.join(rootPath, 'views'));
    app.set('view engine','hbs');
}