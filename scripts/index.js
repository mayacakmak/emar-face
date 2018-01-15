function handleLoadEvent() {
  /* Set up Firebase */
  myFirebaseRef = new Firebase("https://emar-face.firebaseio.com/");
  myFirebaseRef.on("value", updateParameters);

  drawFace();
}