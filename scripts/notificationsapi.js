var intervalvariable;
const img='../assets/pwa-assets/android/android-launchericon-144-144.png';
const healthdata = [  'Clean your hands often. Use soap and water, or an alcohol-based hand rub.'
                ,'Maintain a safe distance from anyone who is coughing or sneezing.'
                ,'Wear a mask when physical distancing is not possible.'
                ,'Don’t touch your eyes, nose or mouth.'
                ,'Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.'
                ,'Stay home if you feel unwell.'
                ,'If you have a fever, cough and difficulty breathing, seek medical attention.'];


  function displayNotification() {
    if (window.Notification && Notification.permission === "granted") {
      notification();
    }
    // If the user hasn't told if he wants to be notified or not
    // Note: because of Chrome, we are not sure the permission property
    // is set, therefore it's unsafe to check for the "default" value.
    else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(status => {
        if (status === "granted") {
          notification();
        } else {
          alert("You denied or dismissed permissions to notifications.");
        }
      });
    } else {
      // If the user refuses to get notified
      alert(
        "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
      );
    }
  }
  function disablenotifications(){
      clearInterval(intervalvariable);
  }
  function notification() {
    // const options = {
    //     body: "Testing Our Notification",
    //     icon: "../assets/pwa-assets/android/android-launchericon-144-144.png"
    //   };
      intervalvariable=setInterval(() => {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
           registrations[0].showNotification("Health Notifications",{body: healthdata[Math.floor(Math.random()* healthdata.length)], icon: img} );

          });
      }, 5000);
}