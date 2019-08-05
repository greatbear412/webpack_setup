if (process.env.NODE_ENV !== 'production') {
 console.log('！！！开发模式开启！！！');
}

var app = angular.module('ykd_wx',['ionic']);
app
  .run()
  .config(['$stateProvider', '$urlRouterProvider',($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('index');
    $stateProvider
    .state('index', {
      url: '/index',
      cache: false,
      template: require('./page/home/home.html')
      // controller: require('./page/home/homeController')
    })
  }])

require('./app.css')
