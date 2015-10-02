(function() {
    'use strict';
    describe('FormulaController', function () {
        var scope;
        var controller;

        beforeEach(module('cognitive.experiment'));

        beforeEach(inject(function(
            $rootScope, $controller, CognitiveWorkspaceService, FormulaService) {
            scope = $rootScope.$new();
            controller = $controller('FormulaController', {
                $scope: scope,
                CognitiveWorkspaceService: CognitiveWorkspaceService,
                FormulaService: FormulaService
            });
        }));

        describe('one of the example', function() {
            it('should be something', function () {

            })
        });
    })
})();
