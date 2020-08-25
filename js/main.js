const username = document.querySelector('#username')
const btn = document.querySelector('button');
const ul = document.querySelector('.characterInfo')

btn.addEventListener('click', showInfo)

function showInfo() {
    let url = `https://api.tibiadata.com/v2/characters/${username.value}.json`

    fetch(url)
        .then(character => {
            if (!character.ok) {
                throw new Error()
            }
            return character.json()
        })

        .then(char => {
            const charData = char.characters.data
            let checkSex = () => {
                if (charData.sex === 'male') {
                    return `<img src='https://vignette.wikia.nocookie.net/tibia/images/c/c1/Outfit_Citizen_Male_%28Old%29.gif/revision/latest?cb=20090912105510&path-prefix=en' alt='male' />`
                }
                else if (charData.sex === 'female') {
                    return `<img src='https://vignette.wikia.nocookie.net/tibia/images/a/ac/Outfit_Citizen_Female_%28Old%29.gif/revision/latest?cb=20090912102711&path-prefix=en' alt='female'>`
                }
            }

            let checkVocation = () => {
                let vocation = charData.vocation;

                switch (vocation) {
                    case 'Knight':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/8/87/Broadsword.gif/revision/latest?cb=20061213161446&path-prefix=en' alt='sword'/>`;
                        break;
                    case 'Druid':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/b/be/Snakebite_Rod.gif/revision/latest?cb=20150120030027&path-prefix=en' alt='rod'/>`;
                        break;
                    case 'Sorcerer':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/9/90/Wand_of_Vortex.gif/revision/latest?cb=20151003103135&path-prefix=en' alt='wand'/>`;
                        break;
                    case 'Paladin':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/a/ad/Bow.gif/revision/latest?cb=20070630122316&path-prefix=en' alt='bow'/>`;
                        break;
                    case 'Elite Knight':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/4/42/Falcon_Longsword.gif/revision/latest?cb=20180605182037&path-prefix=en' alt='sword'/>`;
                        break;
                    case 'Elder Druid':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/6/61/Falcon_Rod.gif/revision/latest?cb=20180605182039&path-prefix=en' alt='rod'/>`;
                        break;
                    case 'Master Sorcerer':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/1/17/Falcon_Wand.gif/revision/latest?cb=20180605182040&path-prefix=en' alt='wand'/>`;
                        break;
                    case 'Royal Paladin':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/f/fc/Falcon_Bow.gif/revision/latest?cb=20180605182033&path-prefix=en' alt='bow'/>`;
                        break;
                    case 'None':
                        return `<img src='https://vignette.wikia.nocookie.net/tibia/images/3/37/Club.gif/revision/latest?cb=20051119163830&path-prefix=en' alt='knife' />`;
                        break;
                    default:
                        'No vocation'
                }
            }

            let adjustTime = () => {
                let adjustment = char.characters.account_information.created.date.split('').splice(0, 10);
                return adjustment.join('')
            }


            let lisInfo = `
            <li class="h5">${charData.name}</li>
            <li>Created in ${adjustTime()}</li>
            <li>Level: ${charData.level}</li>
            <li>Sex: ${charData.sex} ${checkSex()}</li>
            <li>Residence: ${charData.residence}</li>
            <li>Status: ${charData.status}</li>
            <li>Vocation: ${charData.vocation} ${checkVocation()}</li>
            <li>World: ${charData.world}</li>
            `
            ul.innerHTML = lisInfo
        })

        .catch(error => ul.innerHTML = `Não foi possível encontrar ${username.value}`)
}



