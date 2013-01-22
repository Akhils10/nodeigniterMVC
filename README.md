nodeigniterMVC
==============

NodeigniterMVC - an MVC framework for node.js inspired by Codeigniter. It allows custom routing, chaining, and partial view rendering; built-in with helpers, libraries, and a CLI. Fully compatible with Bower.

Dependencies:

- connect
- commander
- connect

CI-based URL structure

``` js
http://www.domain.com/[controller]/[function]/[param1]/[param2]/[etc]
```

<h2>Installation</h2>

Via NPM:

``` js
npm install nodeignitermvc
```

<h2>Creating an app</h2>

``` js
nodeigniter create <appname>
```

<h2>Running the app</h2>

``` js
node app.js
```

Use inside application:

``` js
var ni = require('nodeigniter');
```

Customize the autoload in app/config/autoload.js

``` js
// currently available helpers
this.helpers = ['security','array','url', 'string', 'html', 'form'];

//or load the helper in the controller

ni.load_helper('array');
//OR
ni.load_helper(['array', 'url']);

```

Custom routing in app/config/routes.js

``` js
// set your custom routes here
this.route = [
    {src: '/sign_up', dest: '/main/sign_up', method: ['GET','POST']},
    {src: '/sign_in', dest: '/main/sign_in', method: ['GET','POST']}
];
```

Setting config variables

``` js
// config variable setting
var ni = require('nodeigniter');

//setter
ni.config('some-name', 'value');

//getter
var val = ni.config('some-name');

```

Accessing helpers

``` js
// config variable setting
var ni = require('nodeigniter');

//from url helper
ni.fn.site_url();


//from html helper
ni.fn.anchor();


//to view availabe functions
console.log(ni.fn);

```

Form validation:

``` js
// config variable setting
var ni = require('nodeigniter');

//validation library
ni.load_librray('validation');

//set the rules - same with codeigniter
ni.validation.set_rules('name', 'display', 'required|valid_email|max_length[30]');

//to execute
if (ni.validation.run()) {
    some function
} else {
    some function
}

//writing form fields to the view and setting the values

{{= 
    form_open('') + 
    form_input('name', set_value('name'), {class: 'someclass', maxlength: 30}) + 
    form_submit('submit', 'Submit')
}}


//accessing the request variables

var username = ni.input.req_vars.username;
var password = ni.fn.sha1(ni.input.req_vars.password);

//you can also use any functions

```

Loading views--uses the ejs templating system:

``` js
// setting the partial pages and render, allows chaining

var ni = require('nodeigniter');

// file should be located in the views folder under app: app/views
ni.partial('main.ejs').render();

//you can also put the file into a sub folder
ni.partial('subfolder/main.ejs').render();

//or this
ni.partial('section/header.ejs').partial('subfolder/main.ejs').render();

```

view exaample app/views/section/header.ejs

``` js
{{= doctype('html5') }}
<html lang="en">
    <head>
        <title>Nodeigniter - Fast and flexible node framework</title>
        {{= link_tag('css/bootstrap.min.css?timestamp='+Number(new Date())) }}
        {{= link_tag('css/custom.css?timestamp='+Number(new Date())) }}
        {{= script_tag('js/jquery-1.4.6.min.js?timestamp='+Number(new Date())) }}
        {{= script_tag('js/jquery.tmpl.js?timestamp='+Number(new Date())) }}
    </head>

//use the curly braces
{{= some_function or some vars }}
```
