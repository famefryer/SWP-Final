// const {BigQuery} = require('@google-cloud/bigquery');

var Twit = require('twit')
var config = require('../config') 
var T = new Twit(config)
var db = require('./db.js')
const moment = require("moment");
var firebase = require('firebase');
//Streaming

var firebaseConfig = {
    apiKey: "AIzaSyDk8PwAjgNogtozX72KumFbyAvGWmE3ISA",
    authDomain: "swp-dataflow.firebaseapp.com",
    databaseURL: "https://swp-dataflow.firebaseio.com",
    projectId: "swp-dataflow",
    storageBucket: "swp-dataflow.appspot.com",
    messagingSenderId: "578374115472",
    appId: "1:578374115472:web:75de0578e4a40439"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const addFilterCount = async () => {
    const currentDB = await db.read();
    const currenttime = moment()
      .startOf("minute")
      .toISOString();
    const time = currentDB[currenttime] || 0;
    //Up to firebase
    firebase.database().ref('tweet').push({
        currenttime,count:time+1 
    })
    const output = await db.write(currenttime, time + 1);
    return output;
  };

var streamingTweets = (tweetList,filter) => {
    var num = 1
    var stream = T.stream('statuses/filter', { track: filter })
     
    stream.on('tweet', async function (tweet) {
        try{
        await addFilterCount();
        // console.log(num+'('+lang+') '+name +' : '+text)
        // console.log('==============================');
        }catch(err){
            console.log(err);
        }
    })
}

// Get
var getTweet = function getTweet(){
    var params = {
        q: '#ท่านก้อง',
        count: 10
    }
    T.get('search/tweets',params, gotData)

    function gotData(err,data,res){
        var tweets = data.statuses
        for(var i =0;i<tweets.length;i++){
            console.log(tweets[i].text);
        }
    }
}

// Post
function tweetIt(){
    var rand = Math.floor(Math.random()*100)
    var tweet = {
        status: '#ท่านก้อง อิอิซ่า'+rand+rand +'+'
    }
    T.post('statuses/update',tweet,tweeted)
    function tweeted(err,data,res){
        if(err){
            console.log('something bad happens');
        }
        else {
            console.log('ท่านก้อง on fire');
        }
    }
}
// t = []
// streamingTweets(t,'rain')
module.exports = {streamingTweets,getTweet}
// const bigquery = new BigQuery({
//     projectId: 'swp-dataflow',
//   });
  
//   // Inserts data into a table
//   await bigquery
//     .dataset(datasetId)
//     .table(tableId)
//     .insert(rows);
//   console.log(`Inserted ${rows.length} rows`);

