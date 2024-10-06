document.getElementById('login-button').addEventListener('click', () => {
    const CityName = document.getElementById('city-name').value;
    const Username = document.getElementById('Username').value;
    window.location.href = `./MainPage/index.html?CityName=${CityName}&username=${Username}`;

});
document.addEventListener('keydown', (event) => {
    if(event.code == "Enter"){
        const CityName = document.getElementById('city-name').value;
        const Username = document.getElementById('Username').value;
        window.location.href = `./MainPage/index.html?CityName=${CityName}&username=${Username}`;
    }
})
