import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDR-jtulaDhR51G_qFdwC9Vb0SRA1Yzwqo",
    authDomain: "law-firm-3c1b4.firebaseapp.com",
    databaseURL: "https://law-firm-3c1b4.firebaseio.com",
    projectId: "law-firm-3c1b4",
    storageBucket: "law-firm-3c1b4.appspot.com",
    messagingSenderId: "670659664082"
};

firebase.initializeApp(config);

let dbStore = firebase.firestore();

dbStore.settings({
    timestampsInSnapshots: true
});

export const db = dbStore;