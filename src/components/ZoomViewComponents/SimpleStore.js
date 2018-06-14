import store from 'react-native-simple-store';

store
    .save('coffee', {
        isAwesome: true
    })
    .then(() => store.get('coffee'))
    .then(coffee => {
        console.assert(coffee.isAwesome === true);
    })
    .then(() => store.update('coffee', {
        isNotEssential: false
    }))
    .then(() => store.get('coffee'))
    .then(coffee => {
        console.assert(coffee.isNotEssential === false);
        console.assert(coffee.isAwesome === true);
        return store.delete('coffee');
    })
    .then(() => store.get('coffee'))
    .then(coffee => {
        console.assert(coffee === null);
    })
    .catch(error => {
        console.error(error.message);
    });

// using the .push method for storing arrays
store
    .save('coffeeTraits', ['rich'])
    .then(store.push('coffeeTraits', 'smooth'))
    .then(store.get('coffeeTraits'))
    .then(console.log) // ['rich', 'smooth']