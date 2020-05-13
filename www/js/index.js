
let refP = 0;//hodnota odsazeni zadku
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready',app.init);
    },
    init: function () {
        // device is ready, spus eventy - tlaèítka
        eventy() //tlaèítka headeru
   
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
       
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

const open = () => {
    bluetoothSerial.write('O', //odešle o do arduina
        function (f) {

        }, function (e) {
        });

}

const close = () => {
    bluetoothSerial.write('C', // odešle c do arduina
        function (f) {

        }, function (e) {
        });

}


function eventy() {

    
    document.getElementById("open").addEventListener("click",
        open,false)
 
    document.getElementById("close").addEventListener("click",
        close, false)

    document.getElementById("bltt1").addEventListener("click", 
        blt, false)

    document.getElementById("home").addEventListener("click",
        home, false)

    document.getElementById("refPoint1").addEventListener("click",
        ref, false)

  
};

function blt() {
  
    window.location.hash = "bltt1"
    var rodic = document.getElementById("plocha1")

    vymazPlochu(rodic)
    rodic.innerHTML = HTMLblt
    bluetoothSerial.isEnabled(
        sparZarizeni,nepripojeno 
    );

    event_nastaveni()

};

function ref() {
    refP = event_ref(refP)
    
};

function home() {

    window.location.hash = "home"
    var rodic = document.getElementById("plocha1")

    vymazPlochu(rodic)
    rodic.innerHTML = HTMLhome
    event_mer()

};


function vymazPlochu(rodic) {
    // tato funkce vymaze vsechny potomky daneho oddilu
    while (rodic.firstChild) {
        rodic.removeChild(rodic.firstChild)
    }
}

var HTMLblt = '<div class="blt_set"> <select id="blt_seznam1"> </select> <button id ="blt_pripoj1">Connect</button></div>'
var HTMLhome = '<div class="home_set"> <text><label> Distance: </label> </text><mereni><label id ="mer_delka">0.000 </label></mereni><metr><label >m</label></metr><button id = "mer1" > Start</button><div class = "textl"> <check> <input type="checkbox" id="save1" name = "save1" value="save" > <label for="save"> Save</label></div></check> <div class="opak"><label for="pocetopak">Repeat measurement:</label> <input type="number" id="pocetOpak"/></div>'
app.initialize();