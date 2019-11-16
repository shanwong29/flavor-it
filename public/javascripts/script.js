document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

{
  /* <div id="ingredient-display" class="col-md-6">
<li>Apple</li>
<li>Orange</li>
</div>
<div id="amount-display" class="col-md-3">
<p>12</p>
</div>
<div id="unit-display" class="col-md-2">
<p>--</p>
</div>
<div id="add-ingredient-btn" class="col-md-1">
<button>&#10799</button>
</div> */
}

// function addIngredient() {
//   let ingredientDisplay = document.getElementById("ingredient-display");
//   let li = document.createElement("li");

//   li.innerHTML = document.getElementById("ingredient-name").value;
//   ingredientDisplay.appendChild(li);
//   document.getElementById("ingredient-name").value = "";
// }

{
  /* <div id="ingredient-box" class="form-group col-md-6">
<input id="ingredient-name" class="form-control" type="text" name="ingredient-name" placeholder="e.g. Apple">
</div>

<div id="amount-box" class="form-group col-md-3">
<input id="ingredient-amount" class="form-control" type="number" name="ingredient-amount"
  placeholder="amount">
</div>

      <div id="unit-box-parent" class="form-group col-md-2">
          <select class="form-control" id="ingredient-unit">
            <option value="">unit</option>
            <option value="--">N/A</option>
            <option value="gram">gram</option>
            <option value="ml">ml</option>
            <option value="teaspoon">teaspoon</option>
            <option value="tablespoon">tablespoon</option>
          </select>
        </div>
}*/

  function addElement(parentClass, newEl, attribute, attName) {
    let child = document.createElement(newEl);
    child.setAttribute(attribute, attName);
    parentClass.appendChild(child);
  }
  let addIngredientBtn = document.getElementById("add-ingredient-btn");

  let ingredientBoxParent = document.getElementById("ingredient-box-parent");
  let amountBoxParent = document.getElementById("amount-box-parent");
  let selectParent = document.getElementById("unit-box-parent");
  let delBtnParent = document.getElementById("add-del-btn");

  console.log(selectParent);

  addIngredientBtn.onclick = () => {
    addElement(ingredientBoxParent, "input", "class", "form-control");
    addElement(amountBoxParent, "input", "class", "form-control");

    addElement(selectParent, "select", "class", "form-control");

    let selectCollection = selectParent.getElementsByTagName("select");
    let lastSelectEl = selectCollection[selectCollection.length - 1];

    addElement(lastSelectEl, "option", "value", "");
    lastSelectEl.getElementsByTagName("option")[0].innerText = "unit";

    addElement(lastSelectEl, "option", "value", "--");
    lastSelectEl.getElementsByTagName("option")[1].innerText = "N/A";

    addElement(lastSelectEl, "option", "value", "gram");
    lastSelectEl.getElementsByTagName("option")[2].innerText = "gram";

    addElement(lastSelectEl, "option", "value", "ml");
    lastSelectEl.getElementsByTagName("option")[3].innerText = "ml";

    addElement(lastSelectEl, "option", "value", "teaspoon");
    lastSelectEl.getElementsByTagName("option")[4].innerText = "teaspoon";

    addElement(lastSelectEl, "option", "value", "tablespoon");
    lastSelectEl.getElementsByTagName("option")[5].innerText = "tablespoon";

    addElement(delBtnParent, "button", "type", "button");

    let btnCollection = delBtnParent.getElementsByTagName("button");
    let lastDelBtn = btnCollection[btnCollection.length - 1];
    lastDelBtn.setAttribute("class", "del-btn");
    lastDelBtn.innerHTML = "&#10799";
  };

  // <button id="add-ingredient-btn" type="button">
  //
  // </button>;
}
