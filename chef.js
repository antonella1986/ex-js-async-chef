import dayjs from 'dayjs'

async function getChefBirthday(id) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)

        if (!response.ok) {
            throw new Error('Ricetta non trovata :c');
        }
        //converto la risposta grezza in oggetto leggibile (JSON)
        const recipe = await response.json()
        //estraggo da quell'oggetto l'id dell'autore della ricetta, che si chiama userId
        const userId = recipe.userId;
        console.log('Id ricevuto:', userId)
        //seconda richiesta: prendo i dati dello chef usando il suo userId
        const responseChef = await fetch(`https://dummyjson.com/users/${userId}`);

        if (!responseChef.ok) {
            throw new Error('Chef non trovato.');
        }
        //la risposta rappresenta lo chef
        const chef = await responseChef.json();
        //estraggo la sua data di nascita (è una stringa per ora)
        const birthday = chef.birthDate;
        const formattedBd = dayjs(birthday).format('DD/MM/YYYY')

        return formattedBd
    //qui l’errore viene catturato e nascosto. Quindi chi chiama la funzione da fuori non sa se è andata male
    } catch(error) {
        console.error('Errore', error.message)
    }
}
//chiamo la funzione con id 1, voglio sapere chi è l'autore della ricetta con id 1
getChefBirthday(2)
    //se tutto è andato bene, stampa in console la data (formattata)
    .then(formattedBd => console.log("Data di nascita dello chef:", formattedBd))
    //altrimenti cattura l'errore e lo stampa
    .catch(error => console.error("Errore:", error.message));