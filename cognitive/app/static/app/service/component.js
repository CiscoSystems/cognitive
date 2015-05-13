cognitive.factory('CognitiveComponentService', function(
    IntroductionService, FileInputService,
    RowAdditionService, NormalizationService,
    ProjectionService, DuplicateRemovalService,
    MissingDataRemovalService, MetaDataService,
    FormulaService, MachineLearningService) {

    var CognitiveComponentService = {}
    var components = [
        IntroductionService.definition,
        FileInputService.definition,
        RowAdditionService.definition,
        FormulaService.definition,
        NormalizationService.definition,
        ProjectionService.definition,
        DuplicateRemovalService.definition,
        MissingDataRemovalService.definition,
        //MetaDataService.definition,
        MachineLearningService.definition,
    ];

    CognitiveComponentService = {
        getCognitiveComponents: function(){return components},
        pushCognitiveComponent: function(component) {components.push(component)}
    };

    return CognitiveComponentService;
})