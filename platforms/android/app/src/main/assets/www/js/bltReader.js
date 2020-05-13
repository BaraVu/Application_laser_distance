function bltReader() {

	let message = undefined;
	const register = ()=>{ // ète po øádcích
		bluetoothSerial.subscribe('\n', function (data) {
		message = data;
	}, function (e) {
		alert('error')
	});
	}
	const sleep = (ms) => { //asynchronní fce, je jako delay
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	const sendMeasure = async (c) => {
		bluetoothSerial.write(c,
        function (f) {

        }, function (e) {
        });
		let i = 0;
		while(i<100){
			if(message){
				const current = message;
				message = undefined;
				return current;
			}
			await sleep(100) //poèkej na spánek
			i++
		}
		throw Error('Timeout');
	}
	
	
	
	return {sendMeasure,register};
	


}

