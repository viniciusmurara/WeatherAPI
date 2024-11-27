document.getElementById('cidade-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidade = document.getElementById('cidade').value;
    const apiKey = '1e70be32d90143ab9c0191634242711';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=1&lang=pt`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar dados! Verifique o nome da cidade.');
        }

        const data = await response.json();

        // Atualizar o card com os dados retornados
        document.getElementById('text').textContent = `${data.location.name}, ${data.location.region}`;
        document.getElementById('icon').src = `https:${data.current.condition.icon}`;
        document.getElementById('temp-c').textContent = `Temperatura: ${data.current.temp_c}ºC`;
        document.getElementById('feelslike-c').textContent = `Sensação Térmica: ${data.current.feelslike_c}ºC`;
        document.getElementById('humidity').textContent = `Humidade: ${data.current.humidity}%`;
        document.getElementById('daily-chance-of-rain').textContent = `Chance de Chuva: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        document.getElementById('min-temp').textContent = `Mínima: ${data.forecast.forecastday[0].day.mintemp_c}ºC`;
        document.getElementById('max-temp').textContent = `Máxima: ${data.forecast.forecastday[0].day.maxtemp_c}ºC`;

        // Mostrar o card
        document.getElementById('card').classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
});