var DNS = require('dns');

let elbs = {
    "sandbox" :  {
        "www.shaadi.com" : "www-sandbox-1575232315.ap-south-1.elb.amazonaws.com",
        "ww4.shaadi.com" : "ww4-sandbox-1973001492.ap-south-1.elb.amazonaws.com",
        "back1.shaadi.com" : "back1-sandbox-1782009766.ap-south-1.elb.amazonaws.com",
        "min.shaadi.com" : "min-sandbox-663235164.ap-south-1.elb.amazonaws.com",
       // "min.familyshaadi.com" : "min-fs-sandbox-1888939301.ap-south-1.elb.amazonaws.com",
       // "secured.shaadi.com" : "securedShaadi-Sandbox-1263496717.ap-south-1.elb.amazonaws.com"
    },

    "onlinecopy" :  {
        "www.shaadi.com" : "www-onlinecopy-1211440180.ap-south-1.elb.amazonaws.com",
        "ww4.shaadi.com" : "ww4-onlinecopy-152695897.ap-south-1.elb.amazonaws.com",
        "back1.shaadi.com" : "back1-sandbox-1782009766.ap-south-1.elb.amazonaws.com",
        "min.shaadi.com" : "min-onlinecopy-2120624942.ap-south-1.elb.amazonaws.com",
        "min.familyshaadi.com" : "min-fs-sandbox-1888939301.ap-south-1.elb.amazonaws.com",
        "secured.shaadi.com" : "secured-onlinecopy-115666327.ap-south-1.elb.amazonaws.com",
        "upload-file.shaadi.com" : "file-upload-1392627220.ap-south-1.elb.amazonaws.com",
        "cha.shaadi.com" : "chat-83527428.ap-south-1.elb.amazonaws.com",
        "s18.shaadi.com" : "internal-s18-internal-1883278738.ap-south-1.elb.amazonaws.com"
    },

    "stage_s6" : {
        "ww4.shaadi.com" : "stage-ww4-LB-1782172364.us-east-1.elb.amazonaws.com",
        "stage.shaadi.com" : "myshaadi-312494220.ap-south-1.elb.amazonaws.com",
        "www.shaadi.com" : "stage-640759903.us-east-1.elb.amazonaws.com"
    }
}

if((process.argv).includes("--sandbox") || 
    (process.argv).includes("--stage_s6") || 
    (process.argv).includes("--onlinecopy"))
{       

    let env = "";
    env = (process.argv[2]).replace("--","");
    //env = ((process.argv[2]).split('='))[1];

    console.log("#" + env)
    console.log("127.0.0.1 local.shaadi.com")
    
    
    for (const domain in elbs[env]) {


        DNS.lookup(elbs[env][domain], (err, address, family) => {
            let ip =  address  + " " + domain + " #ping " + elbs[env][domain];
            console.log(ip);
        });
    }
}



