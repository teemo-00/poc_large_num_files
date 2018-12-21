/*
 * Create Large Number of Files
 */

var fs = require('fs');
var util = require('util');

var outdir = 'C:\\Temp\\rv_prog\\nodejs_dev\\netbeans\\large_num_files\\testfolder\\';

var numOpenFiles = 0;
var gCounter = 1;
var gcTarget=60000;

f_writefile = function (p_filename, p_string) {
    
    numOpenFiles++;
    util.log('Writing File:[FileHandles:' + numOpenFiles+'] ' + p_filename);
    
    fs.writeFile(p_filename, p_string, function (err) {
        if (err) throw err;
        
        numOpenFiles--;
        gCounter++;
        util.log('Saved File ' + p_filename );
    });
    
   //fs.writeFileSync(p_filename, p_string);
};


f_main = function () {

    if (gCounter<=gcTarget) {
    
        var t_filename = outdir + 'f' + gCounter + '.txt';
        var t_string = 'File number: ' + gCounter;
    
        /*while (numOpenFiles>600) {
        setTimeout(function() {console.log('Timer:'+numOpenFiles);},10000);
        console.log('After Timeout:' + numOpenFiles);
        }
        */
    
        if (numOpenFiles <= 600) {
            util.log('main < 600:'+gCounter);
            f_writefile(t_filename, t_string);
            setTimeout(function() {f_main();}, 2 );
        }
        else {           
            util.log('main above 600 threshold!!!');
            setTimeout(function() {f_main();}, 1000);
            util.log('Post setting Timeout for file count: '+gCounter);
        }
        
    }
    else {
        util.log('We are done!!!');
    }
    
};

f_main();

