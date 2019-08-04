if (process.env.NODE_ENV !== 'production') {
 console.log('！！！开发模式开启！！！');
}

var app = angular.module('ykd_wx',['ionic']);
app
  .run()
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',($stateProvider, $urlRouterProvider, $ionicConfigProvider) => {
    $urlRouterProvider.otherwise('login123');
    console.log(123);
  }])

require('./app.css')
