function validateAndShow() {
    let uname = document.forms["form1"]["userName"].value;
    let gender = document.forms["form1"]["gender"].value;
    let age = document.forms["form1"]["age"].value;
    if((uname == "" || uname == null) && (gender == "" || gender == null) && (age == "" || age == null)){
        document.getElementById("unameError").innerHTML = "Name is mandatory";
        document.getElementById("genderError").innerHTML = "Gender is mandatory";
        document.getElementById("ageError").innerHTML = "Age is mandatory";
        return false;
    } 
    if(uname == "" || uname == null){
        document.getElementById("unameError").innerHTML = "Name is mandatory";
        return false;  
    }
    let letters = /^[A-Za-z]+$/;
    if(!uname.match(letters)){
        document.getElementById("unameError").innerHTML = "Only Alphabets allowed";
        return false;  
    }
    if(uname.length < 6){
        document.getElementById("unameError").innerHTML = "Name must be at least 6 characters long";
        return false;
    }
    if(gender == "" || gender == null){
        document.getElementById("genderError").innerHTML = "Gender is mandatory";
        return false;  
    }
    if(age == "" || age == null){
        document.getElementById("ageError").innerHTML = "Age is mandatory";
        return false;  
    }
    if(isNaN(age) || age < 18 || age > 60){
        document.getElementById("ageError").innerHTML = "Age is not valid should be between 18 to 60";
        return false;  
    }
    else{
        // document.getElementsByName
        document.getElementById("unameError").innerHTML = "";
        document.getElementById("genderError").innerHTML = "";
        document.getElementById("ageError").innerHTML = "";
        let pref = document.forms["form1"]["preference"].value;

        document.getElementById("setName").innerHTML = uname;
        document.getElementById("setGender").innerHTML = gender;
        document.getElementById("setAge").innerHTML = age;
        document.getElementById("setPref").innerHTML = pref;
        makeRequest();
        return false;
    }

    return false;
}


var httpReq;
var input;

function getHttpReq() {
	if (window.ActiveXObject) {
		httpReq = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		httpReq = new XMLHttpRequest();
	}

	console.log(httpReq);
}

function makeRequest() {
	input = document.forms["form1"]["preference"].value;
	var file = input + ".json";
	getHttpReq();
	httpReq.onreadystatechange = handleResponse;
	httpReq.open("GET", file, true);
	httpReq.send(null);
	//alert("request sent..");
	console.log(httpReq);
}

function handleResponse() {
	//alert(httpReq.readyState);
	if (httpReq.readyState == 4) {
		if (httpReq.status == 200) {
			var response = httpReq.responseText;
			//alert(httpReq.responseText);
			var jsonObj = eval('(' + response + ')');
			if (input == "Covaxin") {
				var vname = jsonObj.name;
				var secondDose = jsonObj.seconddose;
				var sideEffects = jsonObj["side effects"];
				var precautions = jsonObj.precautions;
			} else if (input == "Covishield") {
				vname = jsonObj.name;
				secondDose = jsonObj.seconddose;
				sideEffects = jsonObj["side effects"];
				precautions = jsonObj.precautions;
			}
			document.getElementById("setVaccineName").innerHTML = vname;
	        document.getElementById("setDose").innerHTML = secondDose;
	        document.getElementById("setSideEffects").innerHTML = sideEffects;
	        document.getElementById("setPrec").innerHTML = precautions;
		}
	}
}

