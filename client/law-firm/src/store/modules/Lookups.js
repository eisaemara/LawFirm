import { db } from '../firebaseStore.js';
//let db = firebase.firestore();

const lookupsCollection = db.collection('lookups');

const state = {
    lookupTypes: []
}

const mutations = {
    SetLookupTypes(state, lookupTypes) {
        state.lookupTypes = lookupTypes;
    }
}

const actions = {
    initLookupsList: ({ commit }) => {
        lookupsCollection.get().then((querySnapshot) => {
            let loadedCollection = [];
            querySnapshot.forEach(doc => loadedCollection.push(doc.data()));
            commit('SetLookupTypes', loadedCollection);
        });
    },
    updateLookupType: ({ commit }, updatedLookup) => {
        return lookupsCollection.doc(updatedLookup.type).set(updatedLookup.data);
    }
}

const getters = {
    getLookupTypes: state => {
        return state.lookupTypes;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}