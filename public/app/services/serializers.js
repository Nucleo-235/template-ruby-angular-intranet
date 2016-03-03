// Serializers de Exemplo
// angular.module('rails').factory('SituationImagesSerializer', function (railsSerializer) {
//     return railsSerializer(function () {
//         this.exclude('uploaded');
//         this.add('data', function (image) {
//           if (image.uploaded != null)
//             return image.uploaded["$ngfDataUrl"];
//           else
//             return null;
//         });
//     });
// });

// angular.module('rails').factory('SituationSerializer', function (railsSerializer, SituationImagesSerializer) {
//     return railsSerializer(function () {
//         this.exclude('situation_type');
//         this.exclude('situation_kind');
//         this.exclude('situation_detail');
//         this.serializeWith('situation_images', 'SituationImagesSerializer');
//         this.nestedAttribute('situation_images');
//     });
// });

// angular.module('rails').factory('ReportSerializer', function (railsSerializer, SituationSerializer) {
//     return railsSerializer(function () {
//         this.serializeWith('situations', 'SituationSerializer');
//         this.serializeWith('modified_situations', 'SituationSerializer');
//         this.resource('modified_situations', 'Situation');
//         this.resource('situations', 'Situation');
//     });
// });