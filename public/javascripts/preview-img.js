let previewImg = function(event) {
  let output = document.querySelector(".output");
  output.src = URL.createObjectURL(event.target.files[0]);
};
