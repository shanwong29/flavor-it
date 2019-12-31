function addElement(parentClass, newEl, attrObj) {
  let child = document.createElement(newEl);
  for (const key in attrObj) {
    child.setAttribute(key, attrObj[key]);
  }
  parentClass.appendChild(child);
}

function createIngredientNameFleidDiv(parent) {
  let attr = { class: "field-style form-group col-5" };
  addElement(parent, "div", attr);
}

function createQtyFieldDiv(parent) {
  let attr = { class: "field-style form-group col-3" };
  addElement(parent, "div", attr);
}

function createUnitFieldDiv(parent) {
  let attr = { class: "field-style form-group col-3" };
  addElement(parent, "div", attr);
}

function createIngredientNameInput(parent) {
  let newParent = parent.querySelectorAll("div")[0];
  let attr = {
    class: "form-control",
    type: "text",
    name: "name",
    required: "required"
  };
  addElement(newParent, "input", attr);
}

function createQtyFieldInput(parent) {
  let newParent = parent.querySelectorAll("div")[1];
  let attr = {
    class: "form-control",
    type: "number",
    name: "qty",
    placeholder: "qty",
    min: "1"
  };
  addElement(newParent, "input", attr);
}

function createUnitSelector(parent) {
  let newParent = parent.querySelectorAll("div")[2];
  let attr = { name: "unit", class: "form-control unit-selector" };
  addElement(newParent, "select", attr);
}

function createUnitOptions(parent) {
  let newParent = parent.querySelector("select");
  let optionAttr = {
    0: { value: "" },
    1: { value: "" },
    2: { value: "gram" },
    3: { value: "ml" },
    4: { value: "teaspoon" },
    5: { value: "tablespoon" }
  };

  for (let i = 0; i < Object.keys(optionAttr).length; i++) {
    addElement(newParent, "option", optionAttr[i]);
    if (i > 1) {
      newParent.getElementsByTagName("option")[i].innerText =
        optionAttr[i].value;
    }
  }
  newParent.getElementsByTagName("option")[0].innerText = "unit";
  newParent.getElementsByTagName("option")[1].innerText = "N/A";
}

function createDelBtn(parent) {
  addElement(parent, "div", { class: "field-style form-group col-1" });
  newParent = parent.querySelectorAll("div")[3];
  addElement(newParent, "button", { class: "del-btn", type: "button" });
  newParent.querySelector(".del-btn").innerText = `\u2715`;
  newParent.querySelector(".del-btn").onclick = deleteItem;
}

document.getElementById("add-ingredient-btn").onclick = () => {
  let eachRowDiv = document.createElement("div");
  eachRowDiv.setAttribute("class", "row");

  let parent = document.getElementById("the-great-div");
  createIngredientNameFleidDiv(eachRowDiv);
  createQtyFieldDiv(eachRowDiv);
  createUnitFieldDiv(eachRowDiv);
  createIngredientNameInput(eachRowDiv);
  createQtyFieldInput(eachRowDiv);
  createUnitSelector(eachRowDiv);
  createUnitOptions(eachRowDiv);
  createDelBtn(eachRowDiv);
  parent.appendChild(eachRowDiv);
};

function deleteItem(e) {
  document
    .getElementById("the-great-div")
    .removeChild(e.currentTarget.parentNode.parentNode);
}

let numOfOldIngredient = document.querySelectorAll(".old-gredient").length;

for (let i = 0; i < numOfOldIngredient; i++) {
  document
    .querySelectorAll(".old-gredient")
    [i].addEventListener("click", deleteItem, false);
}
