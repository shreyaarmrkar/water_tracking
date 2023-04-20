const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('reminder/{id}').onUpdate(event => {

    const root = event.data.ref.root
    var messages = []
    console.log(event)
    //return the main promise
    // return root.child('/reminder').once('value').then(function (snapshot) {

    //     snapshot.forEach(function (childSnapshot) {

    //         var expoToken = childSnapshot.val().expoToken

    //         if (expoToken) {

    //             messages.push({
    //                 "to": expoToken,
    //                 "body": "New Note Added"
    //             })
    //         }
    //     })

    //     return Promise.all(messages)

    // }).then(messages => {

    //     fetch('https://exp.host/--/api/v2/push/send', {

    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(messages)
    //     })
    // })

})

