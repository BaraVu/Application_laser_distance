var zarizeni = {
    class: [],
    id: [],
    address: [],
    name: []
}

function event_nastaveni() {
    let BTblePripoj = document.getElementById("blt_pripoj1")
    let SELble = document.getElementById("blt_seznam1")

    BTblePripoj.addEventListener("click", () => { //pó stisknutí tlaèítka pøipojit se spustí BLTpripoj
        Bltpripoj(SELble.value) // odesílá se value = adresa
    })
}


function nepripojeno() {
    bluetoothSerial.enable(
        function () {
         
            blt()
        },
        function () {
            console.log("The user did *not* enable Bluetooth");
        }
    );

}


function sparZarizeni() {
    bluetoothSerial.list(
    function (devices) {
        let sezBlt = document.getElementById("blt_seznam1"); //do okna select pujdou options
        let pocet = devices.length                          //count found device
        let html = "<option> Device </option>"


       
        if (pocet > 0) {
            for (let i = 0; i < pocet; i++) {
                html += "<option value="
                html += devices[i]["address"]
                html += ">"
                html += devices[i].hasOwnProperty("name")
                    ? devices[i]["name"]
                    : devices[i]["id"]
                html += "</option>"
            }

            sezBlt.innerHTML = html

        }
    },
    function (er) {
        alert(er)
    }
)

}

function Bltpripoj(adresa) {
    bluetoothSerial.connect(
        adresa,
        function () {
            console.log("connected")
            alert("connected");
           
        },
        function () {
            console.log("no connected device")
        
        }
    )
}