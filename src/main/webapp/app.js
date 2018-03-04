/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var globalApi;

/*
// https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
var apiData = (function() {
  var privateVar = "";
  //function set(changeVar) {
  //  if (privateVar === ""){
  //      privateVar = changeVar;
  //  }
  //}
  return { // public interface
    get: function () {
       return privateVar;
    },
    set: function (changeVar) {
        if (privateVar === ""){
            privateVar = changeVar;
        }
    }
  };
})();
*/

function convertToSql(){
    var database = "names";
    
    function namesMap(item) {
        var keyArray = Object.keys(item);
        keyArray.splice(-1,1);
        var valueArray = Object.values(item);
        valueArray.splice(-1,1);
        var syntax_1 = "INSERT INTO ";
        var syntax_2 = " ("+keyArray.join()+") ";
        var syntax_3 = " VALUES ";
        var syntax_4 = " ("+valueArray.join()+");";
        
        return syntax_1 +" "+ database +" "+ syntax_2 + syntax_3 + syntax_4;
    };
    var outputList = globalApi.map(namesMap);
    document.getElementById("sql").value = outputList.join("\n");
}

function apiValuesArray() {
    var gender = document.getElementById("gender");
    var genderChosen = gender.options[gender.selectedIndex].innerHTML;
    
    var region = document.getElementById("region");
    var regionChosen = region.options[region.selectedIndex].innerHTML;
    
    var amount = document.getElementById("amount");
    var amountChosen = amount.value;//amount.options[amount.selectedIndex].innerHTML;
    
    //document.getElementById("chrtest").innerHTML = "buuu";
    
    //document.getElementById("chrtest").innerHTML = genderChosen + regionChosen + amountChosen;
    
    return [genderChosen,regionChosen,amountChosen];
    //http://uinames.com/api/?amount=25&region=denmark&gender=female
}

/*
 http://uinames.com/api/
 */

function myfetch() {
    
    var valuesArray = apiValuesArray();
    
    var ApitToUse = "http://uinames.com/api/?amount=" + 
            valuesArray[2].toString()+ //amount
            "&region="+ 
            valuesArray[1].toString()+ //region
            //"all"+
            "&gender="+
            valuesArray[0].toString(); //gender
    
    fetch(ApitToUse)
            .then(function(responce) {
                                
                if (responce.status >= 400){
                    console.log(responce);
                    document.getElementById("chrtest").innerHTML = 
                            " status: " + responce.status + 
                            " url: " + responce.url;
                }
                
                return responce.json();              
                
            }).then(function(data) {
                
                globalApi = data;
                
                var output = "";
                               
                for (var i = 0; i < data.length; i++) {
                    output += "<tr>";
                    output += makeColumn(data[i]);
                    output += "</tr>";
                }
                
                document.getElementById("tblbody").innerHTML = output;
            }).catch(function(error) {
                document.getElementById("tblbody").innerHTML = "fejl: " + error;
            });
}

function makeColumn(inputObject){
    var keyArray = Object.keys(inputObject); 
    var tr;
    for (var i = 0; i < 3; i++){
        tr += "<td>";
        tr += inputObject[keyArray[i]];
        tr += "</td>";
    }
    return tr;
}
