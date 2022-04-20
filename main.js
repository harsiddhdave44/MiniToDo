// icons in SVG format
var removeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var editSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="24" height="24"viewBox="0 0 172 172"style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M131.96744,14.33333c-1.83467,0 -3.66956,0.70211 -5.06706,2.09961l-14.33333,14.33333l-10.13411,10.13411l-80.93294,80.93294v28.66667h28.66667l105.40039,-105.40039c2.80217,-2.80217 2.80217,-7.33911 0,-10.13412l-18.53255,-18.53255c-1.3975,-1.3975 -3.23239,-2.09961 -5.06706,-2.09961zM131.96744,31.63411l8.39844,8.39844l-9.26628,9.26628l-8.39844,-8.39844zM112.56706,51.03451l8.39844,8.39844l-76.73372,76.73372h-8.39844v-8.39844z"></path></g></g></svg>';

var tickSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="32" height="32"viewBox="0 0 32 32"style=" fill:#000000;"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 22.28125 11.28125 L 15 18.5625 L 10.71875 14.28125 L 9.28125 15.71875 L 14.28125 20.71875 L 15 21.40625 L 15.71875 20.71875 L 23.71875 12.71875 Z"></path></svg>';

populateList();

// If there is any text inside the item field, add that text to the todo list
document.getElementById("add").addEventListener("click", function () {
  var value = document.getElementById("item").value;
  if (value) {
    // Adding the data
    const addtodo =
      "http://todoapp-codemancers.us-west-2.elasticbeanstalk.com/api/ToDo/add";
    console.log("Clicked add");
    console.log(document.getElementById("item").value);
    var data = {
      // id: 1,
      todo: document.getElementById("item").value,
    };
    $.ajax({
      url: addtodo,
      type: "POST",
      crossDomain: true,
      contentType: "application/json",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (result) {
        console.log(JSON.stringify(result));
        addItem(result);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
});

function addItem(result) {
  addItemToDOM(result);
  document.getElementById("item").value = "";
}

function clearListItems() {
  var list = document.getElementById("todo");
  list.innerHTML = "";
}

function removeItem(result) {
  var deletetodourl = `http://todoapp-codemancers.us-west-2.elasticbeanstalk.com/api/ToDo/delete?id=${result["id"]}`;
  $.ajax({
    url: deletetodourl,
    type: "DELETE",
    crossDomain: true,
    contentType: "application/json",
    // data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      populateList();
      // console.log("Success" + result["id"] + "   " + result["todo"]);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function editItem(result) {
  var edittodourl = `http://todoapp-codemancers.us-west-2.elasticbeanstalk.com/api/ToDo/delete?id=${result["id"]}`;

  $.ajax({
    url: deletetodourl,
    type: "POST",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      populateList();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function populateList() {
  clearListItems();
  // Fetch the data
  const getalltotodurl =
    "http://todoapp-codemancers.us-west-2.elasticbeanstalk.com/api/ToDo/getall";
  $.ajax({
    url: getalltotodurl,
    type: "GET",
    crossDomain: true,
    contentType: "application/json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);
        addItemToDOM(result[i]);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// Adds a new item to the todo list
function addItemToDOM(result) {
  console.log(result["todo"]);
  var list = document.getElementById("todo");

  var item = document.createElement("li");
  item.id = result["id"];
  item.innerText = result["todo"];

  // Adding div element for edit input
  var div = document.createElement("div");
  div.id = `${result["id"]}-div`;

  var inputForTodo = document.createElement("input");
  inputForTodo.type = "text";
  inputForTodo.id = `${result["id"]}-input`;

  var inputSubmit = document.createElement("button");
  inputSubmit.id = `${result["id"]}-button`;
  inputSubmit.innerHTML = tickSVG;

  div.appendChild(inputForTodo);
  div.appendChild(inputSubmit);
  div.style.display = "none";
  // End of div

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  var edit = document.createElement("button");
  edit.classList.add("edit");
  edit.innerHTML = editSVG;

  // Add click event for removing the item
  remove.addEventListener("click", function () {
    removeItem(result);
  });
  edit.addEventListener("click", function () {
    editItem(result);
  });

  buttons.appendChild(edit);
  buttons.appendChild(remove);

  item.appendChild(buttons);
  item.prepend(div);

  list.insertBefore(item, list.childNodes[0]);
}
