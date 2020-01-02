let previewImg = function(event) {
  let limitinByte = 1000000;
  let limitInMb = limitinByte / 1000000;

  if (event.target.files[0].size > limitinByte) {
    let imageInput = document.getElementById("image");
    imageInput.parentNode.removeChild(imageInput);

    let parent = document.querySelector("#image-input-div");

    let warningAttr = {
      id: "image-warning",
      style: "color:red; background-color: white",
      class: "mb-0 pb-1"
    };

    let inputAttr = {
      id: "image",
      type: "file",
      name: "imagePath",
      onchange: "previewImg(event)"
    };

    addElement(parent, "p", warningAttr);
    document.getElementById(
      "image-warning"
    ).innerText = `* Image size should be less than ${limitInMb}MB`;

    addElement(parent, "input", inputAttr);

    return;
  }

  let warning = document.getElementById("image-warning");
  if (warning) {
    warning.parentNode.removeChild(warning);
  }
  let output = document.querySelector(".output");
  output.src = URL.createObjectURL(event.target.files[0]);
};
