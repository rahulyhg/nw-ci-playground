const XLSX = require('xlsx');

class Excel_Parser
{
    constructor(excelFile, sheet_name = "Sheet1")
    {
        let workbook = XLSX.readFile(excelFile);
        this.curr_worksheet = workbook.Sheets[sheet_name];

        this.verifyHeaderData();
    }

    verifyHeaderData()
    {   
        //verify missing header
        let expected_last_cell_header = ((this.curr_worksheet["!ref"]).split(":"))[1].replace(/\d+/g, '') +"1";
        let valid_worksheet = false;
        for(let item in this.curr_worksheet)
        {
            if(item  === expected_last_cell_header)
                valid_worksheet = true;
        }

        if(!valid_worksheet)
            throw new Error("Missing spreadsheet header");
    }

    getTestDataCount()
    {
        let ref_info = this.curr_worksheet["!ref"];
        let row_info_split = ref_info.split(":");

        let pattern = /^\D+/g;
        let start_row = row_info_split[0].replace(pattern, '');
        let end_row  = row_info_split[1].replace(pattern, '');

        return (end_row - start_row);
    }

    getDataByRow(row_num)
    {
        if(row_num <= 1)
            throw new Error("Test data row number cannot be less than 2");
        
        let testData_count = this.getTestDataCount()
        if(row_num > (testData_count)+1)
            throw new Error(row_num + " row is not found. The spread contains " + testData_count + " rows");

        const header = this.getHeaders();       
        let test_data = {};

        for(const cell_num in (this.curr_worksheet))
        {
            let row_num_sheet = cell_num.replace(/^\D+/g,'');
            
            if(row_num_sheet > row_num)
                break;

            if(row_num_sheet == row_num)
            {
                let new_cell_num = cell_num.replace(/\d+/g,'');
                new_cell_num = new_cell_num + "1";

                test_data[header[new_cell_num]] = this.curr_worksheet[cell_num].v;
            }
        }

       let A = Object.keys(test_data);
       let B = Object.values(header);

       let diff = B.filter(x => A.indexOf(x) < 0 );

        diff.forEach(element => {
            test_data[element] = ""
        });

        return test_data;
    }

    getSingleDataByAccountType(membertype_value)
    {
        const header = this.getHeaders();  
        let cell_location = Object.keys(header).find(key => header[key] === 'membertype');
        cell_location = cell_location.replace(/\d+/g, '');
        
        let testData_count = this.getTestDataCount()
        let row_num = "";
        for (let index = 2; index <= testData_count+1; index++) 
        {
            if(this.curr_worksheet[cell_location+index].v == membertype_value)
                row_num = index;
        }

        if(row_num == "")
            throw new Error(membertype_value + " not found in spreadsheet.");
        
        return this.getDataByRow(row_num);
        
    }

    getHeaders()
    {
        let pattern = /\d+/g;
        let last_cell_header = ((this.curr_worksheet["!ref"]).split(":"))[1].replace(pattern, '') +"1";
        let header = {};
        for(const item in (this.curr_worksheet))
        {
            header[item] = this.curr_worksheet[item].v;
            if(item == last_cell_header)
                break;
        }

        return header;
    }
}

module.exports = Excel_Parser;