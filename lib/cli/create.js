/**
 * Module dependencies.
 */
 var program = require('commander')
 , os = require('os')
 , fs = require('fs')
 , mkdirp = require('mkdirp');


/**
 * Create Nodeigniter application at `path`.
 *
 * @param {String} path
 * @api private
 */
 exports = module.exports = function create(path) {
  console.log('creating Nodeigniter application at : ' + path);
  
  (function createApplication(path) {
    emptyDirectory(path, function(empty) {
      if (empty) {
        createApplicationAt(path);
      } else {
        program.confirm('destination is not empty, continue? ', function(ok) {
          if (ok) {
            process.stdin.destroy();
            createApplicationAt(path);
          } else {
            abort('aborting');
          }
        });
      }
    });
  })(path);
}


var eol = 'win32' == os.platform() ? '\r\n' : '\n';

var autoloadConfig = [
'module.exports = new function() {'
, '    this.libraries = [];'
, '    this.helpers = [\'security\',\'array\',\'url\', \'string\', \'html\', \'form\'];'
, '    this.models = [];'
, '}'
].join(eol);

var routesConfig = [
'module.exports = new function() {'
, ''
, '    //add routes here'
, '    this.route = ['
, '    {src: \'/test\', dest: \'/main/test\', method: [\'GET\',\'POST\']}'
, '    ];'
, ''
, '}'
].join(eol);

var mainController = [
'var ni = require(\'nodeigniter\');'
, ''
, 'module.exports = new function() {'
, ''
, '   this.index = function(req, res, next) {'
, '       ni.partial(\'section/header.ejs\').partial(\'main/main.index.ejs\').render();'
, '       ni.partial(\'section/header.ejs\').partial(\'main/main.test.ejs\').render();'
, '   }'
, '};'
].join(eol);

var notfoundError = [
'<html>'
, '   <h1>Page not Found</h1>'
, '<html>'
].join(eol);

var mainView = [
'    <!--content starts here-->'
, '    <div class="container container-top">'
, '        <div class="row">'
, '            <div class="span12">'
, '                <div class="hero-unit">'
, '                    <h1>Nodeigniter</h1>'
, '                    <p>Welcome to the fast and flexible ignition framework for node developers</p>'
, '                    <p>Version 1.0</p>'
, ''
, '                <h2>Features:</h2>'
, '                    <ul>'
, '                        <li>Custom routing</li>'
, '                        <li>Asynchronous module loading</li>'
, '                        <li>Built in with different helpers and libraries</li>'
, '                        <li>Localize helper functions for view rendering</li>'
, '                        <li>Use connect middleware</li>'
, '                        <li>Customize it according to your needs</li>'
, '                    </ul>'
, '                </div>'
, '            </div>'
, '        </div>'
, '    </div>'
].join(eol);

var testView = [
'<div class="container container-top">'
, '        <div class="row">'
, '            <div class="span12">'
, '                <div class="hero-unit">'
, '                    <h1>TEST</h1>'
, '                    <p>This is an example of another view you can pass through your controller. Be sure to route this to your URL in the routes file.</p>'
, '                </div>'
, '            </div>'
, '        </div>'
, '    </div>'
].join(eol);

var headerElement = [
'{{= doctype(\'html5\') }}'
, '<html lang="en">'
, '    <head>'
, '        <title>Nodeigniter - Fast and flexible node framework</title>'
, '        {{= link_tag(\'css/bootstrap.min.css?timestamp=\'+Number(new Date())) }}'
, '        {{= link_tag(\'css/style.css?timestamp=\'+Number(new Date())) }}'
, '        {{= script_tag(\'//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js\') }}'
, '    </head>'
].join(eol);

var appJS = [
'var ni = require('nodeigniter'),'
, 'connect = require('connect');'
, ''
, 'ni.config('root', __dirname + '/app');'
, 'ni._initialize(function(){'
, '    connect.createServer('
, '        connect.bodyParser(),'
, '        connect.static('public'),'
, '        connect.query(),'
, '        connect.cookieParser('ni_cookie'),'
, '        connect.session({secret: 'kM43QtvEhmhH2KK9sJac',cookie: {maxAge: 36000}}),'
, '        ni.router,'
, '        ni.not_found'
, '        ).listen(3000);'
, '    console.log('Application Started on Port: '+3000);'
, '});'
].join(eol);

var componentJSON = [
'{'
, '    "name": "ni-app",'
, '    "version": "1.0.0",'
, '    "dependencies": {'
, '        "jquery": "latest",'
, '        "bootstrap": "latest"'
, '   }'
, '}'
].join(eol);

var packageJSON = [
'{'
, '  "name": "ni-app",'
, '  "version": "1.0.0",'
, '  "private": true,'
, '  "dependencies": {'
, '    "mongodb": "1.x.x",'
, '    "ejs": "0.8.x",'
, '    "connect": "1.x.x"'
, '  }'
, '}'
, ''
].join(eol);


/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */
 function createApplicationAt(path) {
  console.log();
  process.on('exit', function(){
    console.log();
    console.log('   install dependencies:');
    console.log('     $ cd %s && npm install', path);
    console.log();
    console.log('   install static files (requires Bower!):');
    console.log('     $ bower install ');
    console.log();
    console.log('   run the app:');
    console.log('     $ node app.js ');
    console.log();
  });
  
  mkdir(path, function() {
  	mkdir(path + '/app');
    mkdir(path + '/app/config', function(){
      write(path + '/app/config/autoload.js', autoloadConfig);
      write(path + '/app/config/routes.js', routesConfig);
    });
    mkdir(path + '/app/controllers', function(){
      write(path + '/app/controllers/main.js', mainController);
    });
    mkdir(path + '/app/error', function(){
      write(path + '/app/error/404.ejs', notfoundError);
    });
    mkdir(path + '/app/views');
    mkdir(path + '/app/views/main', function(){
      write(path + '/app/views/main/main.index.ejs', mainView);
      write(path + '/app/views/main/main.test.ejs', testView);
    });
    mkdir(path + '/app/views/elements', function(){
      write(path + '/app/views/main/header.ejs', headerElement);
    });
    mkdir(path + '/public');
    mkdir(path + '/public/css');
    mkdir(path + '/public/img');
    mkdir(path + '/public/js');
    write(path + '/app.js', appJS);
    write(path + '/component.json', componentJSON);
    write(path + '/package.json', packageJSON);
  });
}

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */
 function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */
 function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */
 function write(path, str) {
  fs.writeFile(path, str);
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

/**
 * Exit with the given `str`.
 *
 * @param {String} str
 */
 function abort(str) {
  console.error(str);
  process.exit(1);
}