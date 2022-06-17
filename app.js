const openForm = document.getElementById("open"),
  closeForm = document.getElementById("close"),
  Form = document.querySelector(".pop-form"),
  layer = document.querySelector(".layer"),
  Labels = document.querySelectorAll("form .input-field label"),
  inputs = document.querySelectorAll("form .input-field input"),
  selctions = document.querySelectorAll("form select option"),
  radios = document.querySelectorAll(".rad"),
  save = document.querySelector(".save"),
  updated = document.getElementById("updated"),
  added = document.getElementById("added"),
  deletion = document.getElementById("notice"),
  cancel = document.getElementById("cancel"),
  delete_btn = document.getElementById("delete_btn"),
  continues = document.querySelectorAll(".continue"),
  closeAll = document.querySelectorAll(".close-all"),
  tbody = document.getElementById("Tbody");
let radioInput,
  options,
  Employees,
  mood = "add",
  indx;
//==============*start show-hide-form and Focusing inputs==================//
openForm.addEventListener("click", () => {
  layer.classList.remove("hide");
  Form.classList.remove("hide");
  for (let i = 0; i < Labels.length; i++) {
    Labels[i].classList.add("hide-label");
  }
  inputs[0].focus();
  Labels[0].classList.remove("hide-label");
});
closeForm.addEventListener("click", () => {
  layer.classList.add("hide");
  Form.classList.add("hide");
  clearInputs();
  save.innerHTML = "Save";
  mood = "add";
});
cancel.addEventListener("click", () => {
  layer.classList.add("hide");
  deletion.classList.add("hide");
});
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", () => {
    Labels[i].classList.remove("hide-label");
  });
}
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", () => {
    Labels[i].classList.add("hide-label");
  });
}
for (let index = 0; index < continues.length; index++) {
  continues[index].addEventListener("click", () => {
    Form.classList.remove("hide");
    updated.classList.add("hide");
    added.classList.add("hide");
    mood = "add";
  });
}
for (let j = 0; j < continues.length; j++) {
  closeAll[j].addEventListener("click", () => {
    Form.classList.add("hide");
    updated.classList.add("hide");
    added.classList.add("hide");
    layer.classList.add("hide");
  });
}
//==============*end show-hide-form and Focusing inputs=================//
//==============local Storage Check=======//
if (localStorage.Emp != null) {
  Employees = JSON.parse(localStorage.Emp);
} else {
  Employees = [];
}
//==============Saving and Udating=======//
save.addEventListener("click", () => {
  let Employee = {
    Pin: inputs[0].value,
    Name: inputs[1].value,
    Birth: inputs[2].value,
    Email: inputs[3].value,
    Phone: inputs[4].value,
    Dep: inputs[5].value,
    Salary: inputs[6].value,
    City: options,
    Gender: radioInput,
  };
  if (
    inputs[0].value != "" &&
    inputs[1].value != "" &&
    inputs[2].value != "" &&
    inputs[3].value != "" &&
    inputs[4].value != "" &&
    inputs[5].value != "" &&
    inputs[6].value != "" &&
    options != undefined &&
    radioInput != undefined
  ) {
    if (mood === "add") {
      Employees.push(Employee);
      Form.classList.add("hide");
      added.classList.remove("hide");
    } else {
      Employees[indx] = Employee;
      save.innerHTML = "Save";
      Form.classList.add("hide");
      updated.classList.remove("hide");
    }
    clearInputs();
    showData();
  } else {
    if (inputs[0].value == "") {
      inputs[0].focus();
    } else if (inputs[1].value == "") {
      inputs[1].focus();
    } else if (inputs[2].value == "") {
      inputs[2].focus();
    } else if (inputs[3].value == "") {
      inputs[3].focus();
    } else if (inputs[4].value == "") {
      inputs[4].focus();
    } else if (inputs[5].value == "") {
      inputs[5].focus();
    } else if (inputs[6].value == "") {
      inputs[6].focus();
    }
  }
  localStorage.setItem("Emp", JSON.stringify(Employees));
});
//==========displayer date function=========//
function showData() {
  let table = "";
  for (let i = 0; i < Employees.length; i++) {
    table += `
      <tr>
      <td>${Employees[i].Pin}</td>
      <td>${Employees[i].Name}</td>
      <td>${Employees[i].Birth}</td>
      <td>${Employees[i].Gender}</td>
      <td>${Employees[i].City}</td>
      <td>${Employees[i].Email}</td>
      <td>${Employees[i].Phone}</td>
      <td>${Employees[i].Dep}</td>
      <td>${Employees[i].Salary}</td>
      <td><button id="update" onclick="Update(${i})"><i class="fas fa-pencil"></i></button></td>
      <td><button id="delete" onclick="deleteEmp(${i})"><i class="fas fa-trash"></i></button></td>
      </tr>`;
  }
  tbody.innerHTML = table;
}
//=========Delete Employee========================//
let del_indx;
function deleteEmp(i) {
  layer.classList.remove("hide");
  deletion.classList.remove("hide");
  del_indx = i;
  document.querySelector(".delete-wrapper p span").innerHTML =
    Employees[i].Name;
}
delete_btn.addEventListener("click", deleted);
function deleted() {
  Employees.splice(del_indx, 1);
  localStorage.Emp = JSON.stringify(Employees);
  showData();
  layer.classList.add("hide");
  deletion.classList.add("hide");
}
//=========Update Employee Infromations=========//
function Update(i) {
  inputs[0].value = Employees[i].Pin;
  inputs[1].value = Employees[i].Name;
  inputs[2].value = Employees[i].Birth;
  inputs[3].value = Employees[i].Email;
  inputs[4].value = Employees[i].Phone;
  inputs[5].value = Employees[i].Dep;
  inputs[6].value = Employees[i].Salary;
  options = Employees[i].City;
  radioInput = Employees[i].Gender;
  document.getElementById("city").value = Employees[i].City;
  for (let j = 0; j < radios.length; j++) {
    if (radios[j].value === radioInput) {
      radios[j].checked = true;
    }
  }
  save.innerHTML = "Update Info";
  mood = "update";
  indx = i;
  layer.classList.remove("hide");
  Form.classList.remove("hide");
  for (let i = 0; i < Labels.length; i++) {
    Labels[i].classList.add("hide-label");
  }
  inputs[0].focus();
  Labels[0].classList.remove("hide-label");
}
//===========Clearing function=============//
function clearInputs() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  for (let j = 0; j < radios.length; j++) {
    if (radios[j].checked === true) {
      radios[j].checked = false;
    }
  }
  for (let i = 0; i < selctions.length; i++) {
    selctions[i].selected = selctions[i].defaultSelected;
  }
  options = undefined;
  radioInput = undefined;
}
function search(val) {
  let table = "";
  for (let i = 0; i < Employees.length; i++) {
    if (
      Employees[i].Pin.includes(val) ||
      Employees[i].Name.includes(val) ||
      Employees[i].Birth.includes(val) ||
      Employees[i].Dep.includes(val) ||
      Employees[i].City.includes(val)
    ) {
      table += `
      <tr>
      <td>${Employees[i].Pin}</td>
      <td>${Employees[i].Name}</td>
      <td>${Employees[i].Birth}</td>
      <td>${Employees[i].Gender}</td>
      <td>${Employees[i].City}</td>
      <td>${Employees[i].Email}</td>
      <td>${Employees[i].Phone}</td>
      <td>${Employees[i].Dep}</td>
      <td>${Employees[i].Salary}</td>
      <td><button id="update" onclick="Update(${i})"><i class="fas fa-pencil"></i></button></td>
      <td><button id="delete" onclick="deleteEmp(${i})"><i class="fas fa-trash"></i></button></td>
      </tr>`;
    }
  }
  tbody.innerHTML = table;
}
//======getting radio & option value=======//
function radio(value) {
  radioInput = value;
}
function getOptionValue() {
  options = document.getElementById("city").value;
}
showData();
