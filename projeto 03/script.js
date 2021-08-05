document.querySelector('.busca').addEventListener('submit', async ()=>{
	let input = document.querySelector('#searchInput').value;
	event.preventDefault();
	
	if(input !== ''){
		clearInfo();
		showWarning('Carregando...');
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=285214df1a1ffc0d81f02034f73b26a3&units=metric&lang=pt_br`;

		let results = await fetch(url);
		let json = await results.json();
		
		if(json.cod == 200){
			showInfo({
				name: json.name,
				country: json.sys.country,
				temp: json.main.temp,
				tempDescription: json.weather[0].description,
				tempIcon: json.weather[0].icon,
				windSpeed: json.wind.speed,
				windAngle: json.wind.deg
			});
		}else{
			showWarning('Não encontramos essa localização');
		}
	}else{
		clearInfo();
	}
})

function showWarning(msg){
	document.querySelector('.aviso').innerHTML = `${msg}`;
}

function showInfo(json){
	clearInfo();
	document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
	document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
	document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
	document.querySelector('.tempDescriptions').innerHTML = `${json.tempDescription}`;
	document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
	document.querySelector('.ventoPonto').style.transform= `rotate(${json.windAngle - 90}deg)`;

	document.querySelector('.resultado').style.display = 'block';
}

function clearInfo(msg){
	showWarning('');
	document.querySelector('.resultado').style.display = 'none';
}