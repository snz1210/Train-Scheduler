// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCmFkn_Whqt0Yf7i1lighRYFJkZvOwTXoc',
  authDomain: 'train-schedule-26890.firebaseapp.com',
  databaseURL: 'https://train-schedule-26890.firebaseio.com',
  storageBucket: 'train-schedule-26890.appspot.com',
};

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

// Button for adding trains
$('#submit').on('click', function (event) {
  event.preventDefault();
  console.log("submit button clicked");

// Grabs user input (SHOULD THIS BE HH:mm?)
  var name = $('#name').val().trim();
  var destination = $('#destination').val().trim();
  var firstTrainTime = moment($('#time').val().trim(), 'HH:mm').subtract(10, "years").format('X');
  var frequency = parseInt($('#frequency').val().trim());

// Creates local "temporary" object for holding train data
  var train = {
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

// Uploads train data to the database
  database.ref().push(train);

// Logs everything to console
  console.log(train.name);
  console.log(train.destination);
  console.log(train.firstTrainTime);
  console.log(train.frequency);

// Alert
  alert('Train successfully added!');

// Clears fields
  $('#name').val().trim('');
  $('#destination').val().trim('');
  $('#time').val().trim('');
  $('#frequency').val().trim('');
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on('child_added', function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable. (SHOULD THE VAR NAMES BE DIFF THAN ABOVE?)
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().freqency;

  // Train Info
  console.log(name);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Prettify the train start
  var firstTrainTimePretty = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimePretty);

  // // Current time
  // var currentTime = moment();
  // console.log("Current time: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment.unix(firstTrainTimePretty), "minutes"); 
  console.log("Difference in time: " + diffTime);

  // Time apart
  var trainRemainder = diffTime % frequency;
  console.log(trainRemainder);

  // Minutes away
  var trainMinutesTill = frequency - trainRemainder;
  console.log("Minutes till train: " + trainMinutesTill);

  // Next Train calculated
  var nextTrain = moment().add(trainMinutesTill, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));
  nextTrain = moment(nextTrain).format("HH:mm");

  // Add each train's data into table
  $('#train-table > tbody').append('<tr><td>' + name + '</td><td>' + destination + '</td><td>' +
    frequency + '</td><td>' + nextTrain + '</td><td>' + trainMinutesTill + '</td></tr>');

});

