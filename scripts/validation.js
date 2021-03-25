


function is_email(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email)));
   
    return re.test(String(email).toLowerCase());

}

function is_empty(lengthy){


    if((lengthy<=0)){
        return false;
        console.log("Function error");
    }else{
        return true;
    }

}

