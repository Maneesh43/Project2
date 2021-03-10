firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("success");
      console.log(user.email);
    } else {
      // No user is signed in.
      alert("user not logged in");
      window.location.replace('../pages/login.html');
    }
  });
