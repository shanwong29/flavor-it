let previewImg = function() {
  let limitinByte = 1000000;
  let limitInMb = limitinByte / 1000000;
  let allowedFormats = ["image/png", "image/jpeg"];
  let formatMatched = false;

  let chosenFile = event.target.files[0];
  let originalImg = event.target.getAttribute("data-arg1");

  let parent = document.querySelector("#image-input-div");
  let imageInput = document.getElementById("image");
  let output = document.querySelector(".output");
  let warning = document.getElementById("image-warning");

  let warningAttr = {
    id: "image-warning",
    style: "color:red; background-color: white",
    class: "mb-0 pb-1"
  };

  let inputAttr = {
    id: "image",
    type: "file",
    name: "imagePath",
    "data-arg1": originalImg,
    onchange: "previewImg()"
  };

  if (!chosenFile) {
    output.setAttribute("src", originalImg);
    return;
  }

  allowedFormats.forEach(format => {
    if (format === chosenFile.type) {
      formatMatched = true;
      return;
    }
  });

  if (formatMatched === false) {
    addElement(parent, "p", warningAttr);
    document.getElementById(
      "image-warning"
    ).innerText = `* Image format should be jpeg or png`;

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    output.setAttribute("src", originalImg);

    return;
  }

  if (chosenFile.size > limitinByte) {
    addElement(parent, "p", warningAttr);
    document.getElementById(
      "image-warning"
    ).innerText = `* Image size should be less than ${limitInMb}MB`;

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    output.setAttribute("src", originalImg);

    return;
  }

  if (warning) {
    warning.parentNode.removeChild(warning);
  }

  output.src = URL.createObjectURL(chosenFile);
};
