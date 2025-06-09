import dayjs from 'dayjs'

async function getChefBirthday(id) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)

        if (!response.ok) {
            throw new Error('Ricetta non trovata :c');
        }

        const ricetta = await response.json()
        const userId = ricetta.userId;
        console.log('Id ricevuto:', userId)

        const responseChef = await fetch(`https://dummyjson.com/users/${userId}`);

        if (!responseChef.ok) {
            throw new Error('Chef non trovato.');
        }

        const chef = await responseChef.json();
        const birthday = chef.birthDate;
        const formattedBd = dayjs(birthday).format('DD/MM/YYYY')

        return formattedBd
    } catch (error) {
        console.error('Errore', error.message)
    }
}

getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));