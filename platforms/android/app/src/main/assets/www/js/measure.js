const event_mer = () => {

    eventy()
    let Mer = document.getElementById("mer1")

    Mer.addEventListener("click", () => {
        mer()
    })
    

}
const Blte = bltReader(); // ayb se spustil subscribe/odebírání dat z bluetooth
const mer = async () => {
    let MERDelka = document.getElementById("mer_delka")
    let MERButton = document.getElementById("mer1")
    document.getElementById("pocetOpak").defaultValue = 1;
    opak = document.getElementById("pocetOpak").value
    let save = document.getElementById("save1")

    if (opak === null || opak === 0 || opak === undefined) {
        opak = 1
    };
    Blte.register(); // spuštìní fce pro ètení z blt
  
    for (i = 0; i < opak; i++) { //pro poèet opakování
        await sleep(200)
        MERButton.innerText = '...' // do tlaèítka napíše mìøím
        let data = await Blte.sendMeasure('M') // odešle požadavek m a èeká na data
        let delka = data.split('m')// data = 45.256m,0076 split => delka[0] = 45.256 delka[1] = ,0076
        let opravdelka = parseFloat(delka[0]) + refP//opravena delka o posunuti prevedena na float
        MERDelka.innerText = opravdelka
   
        MERButton.innerText = 'Start'
        if (save.checked === true) {
            let delkavstup = opravdelka.toString();
            zapis(delkavstup + "m" + delka[1]); // zapis do textaku
        }
        await sleep(1000)
    }

    if (opak != 1) {

        alert("Measurement completed")}
    
};


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}




function zapis(merDelka) {
   
    var path = "file:///storage/emulated/0/Android/data/cz.laser.bp/files";
    var date = new Date();
    var day = (date.getUTCDate()).toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();

    var filename = year + month + day + ".txt"
    checkIfFileExists(path, filename, merDelka)



}

function checkIfFileExists(path, filename, merDelka) {

    window.resolveLocalFileSystemURL(path, function (dir) {
        dir.getFile(filename, { create: false }, function (f) {
            fileExists(path, filename, merDelka);
        }, function (e) {
            fileDoesNotExist(path, filename, merDelka);
        });
    });
}

function fileExists(path, filename, merDelka) {

    window.resolveLocalFileSystemURL(path, function (dir) {
        dir.getFile(filename, { create: false }, function (fileEntry) {

            writeFile(fileEntry, merDelka)
        });
    });


}

function fileDoesNotExist(path, filename, merDelka) {

    window.resolveLocalFileSystemURL(path, function (dir) {
        dir.getFile(filename, { create: true }, function (fileEntry) {
            writeFile(fileEntry, merDelka)
        });
    });

}

function getFSFail(evt) {
    console.log(evt.target.error.code);
}



function writeFile(fileEntry, dataObj, isAppend) { //dataObj / moje data, isAppend / nechci p5episovat

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function () {
            console.log("Successful file write...");

        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        dataObj = dataObj.toString(); // když nahodou cisla - text
        var date = new Date();
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();

        let first = hour + ":" + minute + ":" + second
        dataObj = first + " " + dataObj //+ "\n"
        
        isAppend = true;
        if (isAppend) {
            try {
             
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }




        fileWriter.write(dataObj);
    });
}

function send(c) {

    bluetoothSerial.write(c,
        function (f) {
          
        }, function (e) {
          
        });

}