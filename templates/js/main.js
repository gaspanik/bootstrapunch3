requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: ['//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min','jquery.min'],
        hookjs: 'hook',
        bootstrap: 'bootstrap.min'
    },
    shim: {
        'hookjs':{deps: ['jquery']},
        'bootstrap':{deps: ['jquery']}
    }
});

requirejs([
    'jquery', 
    'hookjs',
    'bootstrap'
    ], function($, _bootstrap){
        return {};
});