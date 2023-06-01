const inquirer = require('inquirer');


const question = [
    {
        type: 'list',
        name: 'option',
        message: 'what would you like',
        choices: [
            {
                value: 1,
                name: `${'1'} ${'search'}`
            },
            {
                value: 2,
                name: `${'2'} ${'history'}`
            },
            {
                value: 0,
                name: `${'3'} ${'out'}`
            }

        ]
    },

]

const inquirerMenu = async () => {

    console.log("------------ select option-------------")

    const { option } = await inquirer.prompt(question);
    return option;
}
const readInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validat(value) {
            if (value.lenght == 0) {
                return 'invalid input'
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
}
const listPlaces = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}.`;
        return {
            value: place.id,
            name: `${idx}: ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. ' + 'cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'select place',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const pause = async () => {

    const question = [{
        type: 'input',
        name: 'desc',
        message: "press Enter to continue",

    }];
    return await inquirer.prompt(question);

}


module.exports = { readInput, inquirerMenu, pause, listPlaces }