
var img = '../assets/pwa-assets/android/android-launchericon-144-144.png';
var title = "Cherry";
var text = 'HEY! Your task "' + title + '" is now overdue.';
const array = ['Clean your hands often. Use soap and water, or an alcohol-based hand rub.'
    , 'Maintain a safe distance from anyone who is coughing or sneezing.'
    , 'Wear a mask when physical distancing is not possible.'
    , 'Don’t touch your eyes, nose or mouth.'
    , 'Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.'
    , 'Stay home if you feel unwell.'
    , 'If you have a fever, cough and difficulty breathing, seek medical attention.'];
var intervalIndex;
let notification;
// notificationBtn.addEventListener('click', askNotificationPermission);
function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
        // set the button to shown or hidden, depending on what the user answers
        if (Notification.permission === 'denied' || Notification.permission === 'default') {
            // notificationBtn.disabled = false;
            navigator.serviceWorker.register('../sw.js');
        } else {
            // notificationBtn.disabled = true;
        }
    }
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
        console.log("This browser does not support notifications.");
    } else {
        if (checkNotificationPromise()) {
            Notification.requestPermission()
                .then((permission) => {
                    handlePermission(permission);
                })
        } else {
            Notification.requestPermission(function (permission) {
                handlePermission(permission);
            });
        }
    }


}
function setnotifications() {
    intervalIndex = setInterval(() => {
        let randomNo = Math.floor(Math.random() * array.length);
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            registrations[0].showNotification('Health alerts', { body: array[randomNo], icon: img });
          });

    //     notification = new Notification('Health Notifications', { body: array[randomNo], icon: img });
    }, 1000);
    // navigator.serviceWorker.getRegistrations().then(function(registrations) {
    //     registrations[0].showNotification(title, options);
    //   });
    console.log(intervalIndex);
    if (notification) {
        notification.addEventListener("click", (event) => {
            // event.preventDefault();
            window.open("https://lifeline.wmdd.ca");
        })
    }
}
function disablenotifications() {
    // clearInterval=null;
    // console.log(intervalIndex);
    clearInterval(intervalIndex);
}
function checkNotificationPromise() {
    console.log('inside checkNotification promise block');
    try {
        Notification.requestPermission().then();
    } catch (e) {
        return false;
    }
    return true;
}








