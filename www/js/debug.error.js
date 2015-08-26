(function(){
        window.onerror = function (message, url, lineNumber, columnNumber, error) {
                var errorObj = {name:'',stack:'', message:'', url: ''};

                var lineAndColumnInfo = columnNumber ? ' line:' + lineNumber +', column:'+ columnNumber : ' line:' + lineNumber;
                if (message){errorObj.message = message;}
                if (url){errorObj.url = url;}
                if (error){
                        errorObj.name = error.name;
                        errorObj.stack = error.stack;
                }
                var jsMessage = errorObj.message + " - " + errorObj.url + ' - ' + lineAndColumnInfo + ' - ' + errorObj.name + ' - ' + errorObj.stack + ' -> ' +  navigator.userAgent;
                var platformCategory = ionic.Platform.isAndroid() ? 'Photogram Google' : 'Photogram iOS';
                if (ionic.Platform.isWebView()){
                        analytics.trackEvent(platformCategory, "Javascript Error", jsMessage, 0);
                }
        };
})();