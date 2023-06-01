
require('dotenv').config();
const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const Search = require('./models/search');
console.clear();
console.log(process.env);
const main = async () => {

    let option;
    const search = new Search();

    do {
        option = await inquirerMenu();
        switch (option) {
            case 1:
                //mesagge 
                const paramSearch = await readInput('city: ');
                //search places
                const places = await search.city(paramSearch);
                //list places
                const id = await listPlaces(places);
                if (id == '0') continue;
                const selectedplace = places.find(l => l.id == id);
                search.addHistory(selectedplace.name);

                //search weather 

                const weather = await search.getWeather(
                    selectedplace.lng,
                    selectedplace.lat,
                );
                console.log('weather', weather);

                console.clear();
                console.log('This is the informatios of the selected city');
                console.log('city:', selectedplace.name);
                console.log('latitude:', selectedplace.lat);
                console.log('longuitude:', selectedplace.lng);
                console.log('tempeture:', weather.temp);
                console.log('minimum tempeture:', weather.min);
                console.log('maximum tempeture:', weather.max);
                console.log('the weather is ', weather.description);
                break;
            case 2:
                await search.readDB();
                search.historyCapitalization.forEach((place, i) => {
                    const index = `${i + 1}`;
                    console.log(`${index}: ${place}`);
                    //   const read = search.readDB();
                });
                break;

            case 0:
                console.clear();
                break;

        }
        await pause();

    } while (option !== 0);
}
main();