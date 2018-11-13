import {
    db
} from '../firebaseStore.js';
import {
    stat
} from 'fs';
//let db = firebase.firestore();

const lookupsCollection = db.collection('lookups');

const state = {
    lookupTypes: [],
    selectedLookup: null,
    items: []
}

const mutations = {
    create(state, newLookupType) {
        state.lookupTypes.push(newLookupType);
    },
    update(state, lookupType) {
        let updatedLookup = state.lookupTypes.find(nextType => {
            return nextType.type === lookupType.type;
        });
        if (updatedLookup)
            updatedLookup.data = lookupType.data;
    },
    delete(state, lookupTypeId) {
        state.lookupTypes.splice(state.lookupTypes.findIndex(e => e.type === lookupTypeId), 1);
    },
    read(state, lookupsList) {
        state.lookupTypes = lookupsList;
    },
    setCurrentRow(state, selectLookupType) {
        state.selectedLookup = selectLookupType;
    },
    createItem(state, newItem) {
        state.items.push(newItem);
    },
    updateItem(state, updatedItem) {
        let oldItem = state.items.find(e => {
            return e.itemId === updatedItem.itemId;
        });
        if (oldItem)
            oldItem.data = updatedItem.data;
    },
    deleteItem(state, itemId) {
        state.items.splice(state.items.findIndex(e => e.itemId === itemId), 1);
    },
    readItems(state, itemsList) {
        state.items = itemsList;
    }
}
const actions = {
    create: ({
        commit,
        dispatch
    }, newLookupType) => {
        return new Promise((resolve, reject) => {
            dispatch('update', newLookupType).then(res => {
                commit('create', newLookupType);
                resolve(res);
            }, err => reject(err));
        });
    },
    update: ({
        commit
    }, lookupType) => {
        return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            lookupType.data.lastAmendedDate = new Date();
            lookupType.data.createdBy = 'admin';
            lookupsCollection.doc(lookupType.type).set(lookupType.data).then(response => {
                resolve(response);
                commit('update', lookupType);
            }, error => {
                reject(error);
            })
        });
    },
    delete: ({ commit }, lookupTypeId) => {
        return new Promise((resolve, reject) => {
            lookupsCollection.doc(lookupTypeId).delete().then(response => {
                resolve(response);
                commit('delete', lookupTypeId);
            }, error => {
                reject(error);
            })
        });
    },
    read: ({
        commit
    }, searchKey) => {
        lookupsCollection.get().then((querySnapshot) => {
            let loadedCollection = [];

            querySnapshot.forEach(doc => {
                if (!searchKey || doc.data().name.search(searchKey) != -1) {
                    loadedCollection.push({
                        type: doc.id,
                        data: doc.data()
                    })
                }

            });
            commit('read', loadedCollection);
        });
    },
    readItems: ({
        commit
    }, type) => {
        console.log(type)
        lookupsCollection.doc(type).collection("items").get().then((querySnapshot) => {
            let itemsTemp = [];
            querySnapshot.forEach(item => itemsTemp.push({
                itemId: item.id,
                data: item.data()
            }));
            commit('readItems', itemsTemp);
        });
    },
    updateItem: ({ commit, dispatch, state }, updatedItem) => {
        return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            updatedItem.data.lastAmendedDate = new Date();
            updatedItem.data.createdBy = 'admin';
            lookupsCollection.doc(state.selectedLookup.type).collection("items").doc(updatedItem.itemId).set(updatedItem.data).then(response => {
                resolve(response);
                commit('updateItem', updatedItem);
            }, error => {
                reject(error);
            })
        });
    },
    createItem: ({
        commit,
        dispatch
    }, newItem) => {
        return new Promise((resolve, reject) => {
            dispatch('updateItem', newItem).then(res => {
                commit('createItem', newItem);
                resolve(res);
            }, err => reject(err));
        });
    },
    deleteItem: ({ commit, state }, itemId) => {
        return new Promise((resolve, reject) => {
            lookupsCollection.doc(state.selectedLookup.type).collection("items").doc(itemId).delete().then(response => {
                commit('deleteItem', itemId);
                resolve(response);
            }, error => {
                reject(error);
            })
        });
    },
    setCurrentRow: ({
        commit,
        dispatch
    }, selecteLookup) => {
        commit('setCurrentRow', selecteLookup);
        commit('readItems', null);
        dispatch('readItems', selecteLookup.type);
    }
}

const getters = {
    getLookupTypes: state => {
        return state.lookupTypes;
    },
    getSelectLookupType: state => state.selectedLookup,
    getItems: state => state.items

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}