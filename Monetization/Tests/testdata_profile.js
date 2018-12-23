//PRD

let test_data = 
{
    // ZEND - NOT USED
    "regression_personalised_label" :
    {
        "A" :
        {
            "PRD" : ["snehak@bankas.in","test"],
            "SANDBOX" : ["emailid_1SH07736671@bankas.in","test"]
        },
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    // ZEND - NOT USED
    "regression_premium_label" :
    {
        "A" :
        {
            "PRD" : ["snehak@bankas.in","test"],
            "SANDBOX" : ["emailid_1SH07736671@bankas.in","test"]
        },
        "CUG" :
        {
            "PRD" :["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    "regression_redesign" : 
    {
        "A" :
        {
            "SANDBOX" : ["emailid_1SH07736671@bankas.in","test"],
            "PRD" : ["snehak@bankas.in","test"]
        },
        "CUG" :
        {
            "SANDBOX" : ["emailid_bSH48505526@bankas.in","test"],
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    "juspay" : 
    {
        "A" : 
        {
            "SANDBOX" : ["emailid_7SH85616355@bankas.in","test"],
            "PRD" :  ["snehak@bankas.in","test"]
        },
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
        
    },

    "netbanking" :
    {
        "A" : 
        {
            "PRD" : ["snehak@bankas.in","test"],
        },
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    "regression_orderSummary" : 
    {
        "A" :
        {
            "SANDBOX" : ["emailid_1SH07736671@bankas.in","test"],
            "PRD" : ["snehak@bankas.in","test"]
        },
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
        
    },
    "regression_credit" : 
    {
        "A" : 
        {
        "SANDBOX" : ["emailid_7SH85616355@bankas.in","test"],
        "PRD" : ["snehak@bankas.in","test"]
        }
        ,
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    "regression_EMI" : 
    {
        "A" : 
        {
        "SANDBOX" : ["emailid_7SH85616355@bankas.in","test"],
        "PRD" : ["snehak@bankas.in","test"]
        }
        ,
        "CUG" :
        {
            "PRD" : ["mausam1134@bankas.in", "7156826f0042fd28ac348e1f0f033b86"]
        }
    },

    "pay_at_bank" :
    {
        "A" : {
            "PRD" : ["pq19@bankas.in","test"]
        }
    }
    

}

module.exports = test_data;