import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const deleteEmptyRoom = functions.database.ref("/players/{gameCode}").onUpdate((snapshot, context) => {
    console.log(snapshot);
});
