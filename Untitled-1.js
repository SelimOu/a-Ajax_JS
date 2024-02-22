// let citycoo = AfficherCoo()
// citycoo.then((value) => {
//     console.log(value[0]["lat"]);
//     console.log(value[0]["lon"]);
//     console.log(Affichermeteo(value));

// }
// )


async function AfficherCoo(ville) {



    let reponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ville},&appid=536001057948ae8a81edfe04e20f54dd&lang=fr`)
    let Coordonee = await reponse.json();

    return Coordonee;
}




async function Affichermeteo(value) {

    let LAT = value[0]["lat"];
    let LON = value[0]["lon"]

    let reponse2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=536001057948ae8a81edfe04e20f54dd&lang=fr`)
    let meteo = await reponse2.json()
    return meteo

}
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault()
    let ville = document.getElementById('input').value;
    let citycoo = AfficherCoo(ville);
    citycoo.then((value) => {
        let weather1 = Affichermeteo(value)
        console.log(weather1)
        weather1.then(data => {
            console.log(data);
            let output =
                `<h2>Météo pour ${data.name}</h2>
                <p><strong>Temps:</strong> ${data.weather[0].description}</p>
                <p><strong>Température:</strong> ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                <p><strong>Vitesse du vent:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Humidité:</strong> ${data.main.humidity}%</p>`
                ;
            document.getElementById('resultats').innerHTML = output;

        })
    });
})



