$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyBqR8KakGEHCMGPPMCwza5wwc5vYz-7xSo",
    authDomain: "heck-yea-brother.firebaseapp.com",
    databaseURL: "https://heck-yea-brother.firebaseio.com",
    projectId: "heck-yea-brother",
    storageBucket: "heck-yea-brother.appspot.com",
    messagingSenderId: "240010210048"
  };
  firebase.initializeApp(config);

  console.log("initialized firebase");

  var dataBase = firebase.database();

  console.log("got the database aww yea");

  //adding trains into database
  $("#insert-train").on("click", function(){
      //event.preventDefault();
      console.log("u clicked ");

    //collect the inputs for the train data
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var originalTime = $("#original-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    console.log("bro bro bro bro bro");
    console.log(trainName);


    //send that stuff to firebase brother
    dataBase.ref().push({

      name: trainName,
      destination: destination,
      firstTime: originalTime,
      frequency: trainFrequency

  });

  });


  console.log("button listener done");
  //callback for displaying all the trains on load as well as new trains tht are added
  dataBase.ref().on("child_added",function(dataSnapshot){

    var trainName = dataSnapshot.val().name;
    var destination = dataSnapshot.val().destination;
    var originalTime = dataSnapshot.val().firstTime;
    var trainFrequency = dataSnapshot.val().frequency;

    console.log("\n Train name: " + trainName + "\n Destination: " + destination + "\n First Time: " + originalTime + "\n Frequency: " + trainFrequency);

    //creating the elements to append
    var trainToAdd = $("<li></li>");
    var nameText = $("<p>").text("Name: " + trainName);
    var destText = $("<p>").text("Destination: " + destination);
    //var timeText = $("<p>").text("First Time: "  + originalTime);
    var nextArrival = calculateNextArrival(originalTime,parseInt(trainFrequency));
   // var frequencyText = $("<p>").text("Frequency: " + trainFrequency);
    var arrivalText = $("<p>").text("Arrival Time: " + nextArrival);

    //putting it all together like a bionicle
    trainToAdd.append(nameText, destText, arrivalText);

    //adding it to the page
    $("#train-list").append(trainToAdd);


  });

  console.log("data listener done");

  function calculateNextArrival(firstTime, frequency){

    //come before the current time for when we calculate
    var firstArrival = moment(firstTime,"HH:mm").subtract(1,"years");

    //moment gives the currentTime, need the difference in minutes between current and first arrival
    var timeDifference = moment().diff(moment(firstArrival),"minutes");

    //retrieve the remainder between now and the next arrival using modulus
    var minuteRemainder = timeDifference % frequency;

    //now just get how many minutes until arrival with our newfound data
    var arrivalDifference = frequency - minuteRemainder;

    //now use moment to use this data and convert it into a time for the client to see
    var arrivalTime = moment().add(arrivalDifference,"minutes");

    //send it back all formatted and nice
    return moment(arrivalTime).format("HH:mm");



  }

});