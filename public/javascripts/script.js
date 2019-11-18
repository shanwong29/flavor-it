document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("JS imported successfully!");
  },
  false
);

function addElement(parentClass, newEl, attrObj) {
  let child = document.createElement(newEl);
  for (const key in attrObj) {
    child.setAttribute(key, attrObj[key]);
  }
  parentClass.appendChild(child);
}

const addIngredientBtn = document.getElementById("add-ingredient-btn");

addIngredientBtn.onclick = () => {
  delBtn();
  const ingredientBoxParent = document.getElementById("ingredient-box-parent");
  const qtyBoxParent = document.getElementById("qty-box-parent");
  const selectParent = document.getElementById("unit-box-parent");
  const delBtnParent = document.getElementById("add&del-btn");
  const ingredientBtnCollection = delBtnParent.getElementsByTagName("button");

  const NameInputAttr = {
    class: "form-control",
    type: "text",
    name: "name"
  };
  addElement(ingredientBoxParent, "input", NameInputAttr);

  const qtyInputAttr = {
    class: "form-control",
    type: "number",
    name: "qty"
  };
  addElement(qtyBoxParent, "input", qtyInputAttr);

  let selectAttr = {
    class: "form-control unit-selector",
    name: "unit"
  };
  addElement(selectParent, "select", selectAttr);

  let selectCollection = selectParent.getElementsByClassName("unit-selector");
  let lastSelectEl = selectCollection[selectCollection.length - 1];

  let optionAttr = {
    0: { value: "" },
    1: { value: "N/A" },
    2: { value: "gram" },
    3: { value: "ml" },
    4: { value: "teaspoon" },
    5: { value: "tablespoon" }
  };

  for (
    let numOfUnitOption = 0;
    numOfUnitOption < Object.keys(optionAttr).length;
    numOfUnitOption++
  ) {
    addElement(lastSelectEl, "option", optionAttr[numOfUnitOption]);
    if (numOfUnitOption > 0) {
      lastSelectEl.getElementsByTagName("option")[numOfUnitOption].innerText =
        optionAttr[numOfUnitOption].value;
    }
  }
  lastSelectEl.getElementsByTagName("option")[0].innerText = "unit";

  let delBtnAttr = {
    type: "button",
    class: "del-btn"
  };
  addElement(delBtnParent, "button", delBtnAttr);

  const lastDelBtn =
    ingredientBtnCollection[ingredientBtnCollection.length - 1];
  lastDelBtn.innerHTML = "&#10799";
};

// window.onload = function() {
//   for (var i = 1; i < ingredientBtnCollection.length; i++) {
//     ingredientBtnCollection[i].onclick = delIngredientFunc;
//   }
// };

// const delIngredients = [ingredientBoxParent, qtyBoxParent];
// const delIngredientFunc = delBtn(ingredientBtnCollection, delIngredients);

/*HERE******************** */

function delBtn() {
  // the first btn is the add btn
  // window.onload = () => {
  console.log("AAAAA");
  const ingredientBoxParent = document.getElementById("ingredient-box-parent");
  const delBtnParent = document.getElementById("add&del-btn");
  const ingredientBtnCollection = delBtnParent.getElementsByTagName("button");
  for (i = 1; i < ingredientBtnCollection.length; i++) {
    ingredientBtnCollection[i].addEventListener("click", function() {
      ingredientBoxParent.removeChild(ingredientBoxParent.childNodes[i]);
    });
  }
  // };
}

// function delBtn(ingredientBtnCollection, targetNodeArr) {
//   // the first btn is the add btn
//   for (i = 1; i < ingredientBtnCollection.length; i++) {
//     console.log("AAAAA");
//     ingredientBtnCollection[i].onclick = function() {
//       targetNodeArr.forEach(node => {
//         node.removeChild(node.childNodes[i]);
//       });
//     };
//   }
// }

// del btn function for ingredient list
