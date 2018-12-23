const HTMLReport = require('./Xml_Html_Lib.js');
const FileHound = require('filehound');
const fs = require('fs');
const path = require('path');
const ansiRegex = require('ansi-regex');

// Call custom report for html output.
testConfig = {
    reportTitle: 'QA Result',
    outputPath: process.cwd() + '/Result'
};

module.exports = {

    deleteOldXML :async function()
    {
        const files = await FileHound.create()
        .paths(process.cwd() + "/Result")
        .ext('xml')
        .find();

        await files.forEach(element => {
            fs.unlinkSync(element);
        });
    }
,
    convertHMTL :async function()
    {
        let timeStamp = Get_TimeStamp();

        const files = await FileHound.create()
        .paths(process.cwd() + "/Result")
        .ext('xml')
        .find();

        await files.forEach(element =>  {
            
            let content = fs.readFileSync(element,'utf8');
            let ansi = content.match(ansiRegex());

            if(ansi != null)
            {
                for (let item of ansi) {
                    content = content.replace(item, "");
                }
            }
            
            content = content.replace(/&#34;/g, "");
            fs.writeFileSync(element, content,'utf8')

            let report_file_name = Report_File_Name(element);
            let output_path = process.cwd() + '/Result';

            fs.renameSync(element, Report_File_Name(element).full_path);
        
            new HTMLReport().from(report_file_name.full_path, {
                    reportTitle: 'QA Result',
                    outputPath: output_path,
                    outputFile: report_file_name.new_file_name + ".html"
                });

            function Report_File_Name(_file)
            {
                let new_file_name = [];
                const fileObject = path.parse(_file);
                let  OS = fileObject.name.includes("_Windows_NT_")? "_Windows_NT_" : "_Linux_";
                let test_plan_name = fileObject.name.split(OS);

                new_file_name.push(fileObject.dir + "\\");
                new_file_name.push(test_plan_name[1]);
                new_file_name.push(fileObject.ext);

                let new_file_name_oject = {
                    full_path : new_file_name.join(''),
                    new_file_name : test_plan_name[1] + "_" + timeStamp
                }

                return new_file_name_oject;
            }
     });
    
 } //Convert_HMTL
} //module.export

function Get_TimeStamp()
{
    let date = new Date();
    let time_stamp = `${date.getFullYear()}${(date.getMonth()+1)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;

    return time_stamp;
}