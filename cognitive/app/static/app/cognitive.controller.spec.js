(function () {
    'use strict';
    describe('CognitiveController', function () {
        var scope
        var controller;

        beforeEach(module('cognitive'));

        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            controller = $controller('CognitiveController', {$scope: scope});
        }));

        describe('scope.user', function() {
            it('has the default value even before login', function() {
                expect(scope.user.id).toEqual(-1);
                expect(scope.user.name).toEqual('');
                expect(scope.user.token).toEqual('');
                expect(true).toBe(true);
            });
        });
    });
})();
