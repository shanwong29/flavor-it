let allowedFormats = ["image/png", "image/jpeg"];
let wrongFormatWarningMsg = `* Image format should be jpeg or png`;

let limitinByte = 5000000;
let limitInMb = limitinByte / 1000000; //5MB
let fileSizeTooBigWarningMsg = `* Image size should be less than ${limitInMb}MB`;

let formatChecker = function(chosenFile) {
  let isFormatMatched = false;
  allowedFormats.forEach(format => {
    if (format === chosenFile.type) {
      isFormatMatched = true;
      return;
    }
  });
  return isFormatMatched;
};

let userImgCheck = function() {
  function addElement(parentClass, newEl, attrObj) {
    let child = document.createElement(newEl);
    for (const key in attrObj) {
      child.setAttribute(key, attrObj[key]);
    }
    parentClass.appendChild(child);
  }

  let chosenFile = event.target.files[0];
  let originalImg = event.target.getAttribute("data-arg1");

  let parent = document.querySelector("#image-input-div");
  let warningParent = document.querySelector("#image-input-form");
  let warning = document.getElementById("image-warning");
  let uploadProfileImgBtn = document.getElementById("upload-user-image-btn");
  let imageInput = document.getElementById("image");
  let imgOutput = document.querySelector("#imgOutput");

  if (!chosenFile) {
    imgOutput.setAttribute("src", originalImg);
    imgOutput.setAttribute("style", "border-radius: 50%");
    uploadProfileImgBtn.style.visibility = "hidden";
    return;
  }

  let warningAttr = {
    id: "image-warning",
    style: "color:red; ",
    class: "mb-0 pb-1"
  };

  let inputAttr = {
    id: "image",
    type: "file",
    name: "imagePath",
    "data-arg1": originalImg,
    style: "font-size: 13px; margin-top: 10px; width: 60%",
    onchange: "userImgCheck()"
  };

  let isFormatMatched = formatChecker(chosenFile);

  if (isFormatMatched === false) {
    uploadProfileImgBtn.style.visibility = "hidden";

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    addElement(warningParent, "p", warningAttr);
    document.getElementById("image-warning").innerText = wrongFormatWarningMsg;

    imgOutput.setAttribute("src", originalImg);
    imgOutput.setAttribute("style", "border-radius: 50%");

    return;
  }

  if (chosenFile.size > limitinByte) {
    uploadProfileImgBtn.style.visibility = "hidden";

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    addElement(warningParent, "p", warningAttr);
    document.getElementById(
      "image-warning"
    ).innerText = fileSizeTooBigWarningMsg;

    imgOutput.setAttribute("src", originalImg);
    imgOutput.setAttribute("style", "border-radius: 50%");

    return;
  }

  if (warning) {
    warning.parentNode.removeChild(warning);
  }

  imgOutput.src = URL.createObjectURL(chosenFile);
  imgOutput.setAttribute("style", "border-radius: 0");
  uploadProfileImgBtn.style.visibility = "visible";
};

let previewImg = function() {
  let chosenFile = event.target.files[0];
  let originalImg = event.target.getAttribute("data-arg1");

  let parent = document.querySelector("#image-input-div");
  let imageInput = document.getElementById("image");
  let imgOutput = document.querySelector(".imgOutput");
  let warning = document.getElementById("image-warning");

  if (!chosenFile) {
    imgOutput.setAttribute("src", originalImg);
    return;
  }

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

  let isFormatMatched = formatChecker(chosenFile);

  if (isFormatMatched === false) {
    addElement(parent, "p", warningAttr);
    document.getElementById("image-warning").innerText = wrongFormatWarningMsg;

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    imgOutput.setAttribute("src", originalImg);

    return;
  }

  if (chosenFile.size > limitinByte) {
    addElement(parent, "p", warningAttr);
    document.getElementById(
      "image-warning"
    ).innerText = fileSizeTooBigWarningMsg;

    imageInput.parentNode.removeChild(imageInput);
    addElement(parent, "input", inputAttr);

    imgOutput.setAttribute("src", originalImg);

    return;
  }

  if (warning) {
    warning.parentNode.removeChild(warning);
  }

  imgOutput.src = URL.createObjectURL(chosenFile);
};
