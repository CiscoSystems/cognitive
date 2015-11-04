(function() {
    'use strict';
    describe('FormulaController', function () {
        var scope;
        var controller;

        beforeEach(module('cognitive.experiment'));

        beforeEach(inject(function(
            $rootScope, $controller, ExperimentService, FormulaService) {
            scope = $rootScope.$new();
            controller = $controller('FormulaController', {
                $scope: scope,
                ExperimentService: ExperimentService,
                FormulaService: FormulaService
            });
        }));

        describe('one of the example', function() {
            it('should be something', function () {

            })
        });
    })
})();
