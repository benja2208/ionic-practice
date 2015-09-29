'use strict';
angular
    .module ('ion-crop')
    .factory ('fileReader', function ($q) {

    return {
        readAsDataUrl: function (filePath) {

            var deferred = $q.defer ();

            function gotFileEntry (fileEntry) {
                fileEntry.file (gotFile, fail);
            }

            function gotFile (file) {
                readDataUrl (file);
            }

            function readDataUrl (file) {
                var reader       = new FileReader ();
                reader.onloadend = function (evt) {
                    console.log ("Read as data URL");
                    var fileContent = evt.target.result;
                    deferred.resolve (fileContent);

                };
                reader.readAsArrayBuffer (file);
            }

            function fail (evt) {
                console.log (evt.target.error.code);
            }

            window.resolveLocalFileSystemURI (filePath, gotFileEntry, fail);

            return deferred.promise;
        }
    };
});