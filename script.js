import Tasks from "./main.js";

let listItems = document.querySelectorAll(".item");
let bannerHead = document.querySelector(".banner-head");
let newProjectBtn = document.querySelector("#project-submit-btn");
let allItems = document.querySelector(".all-items");
let burgerBtn = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");

let selectedDiv = document.querySelector(".upper-sidebar").children[1];
let tempDiv = selectedDiv;
let dropboxDiv;
let addBtn, cancelBtn;
let newProjectBtnCount = 1;

let projects = ["Personal", "Work"];
let tasksArr = [];
let count = 0;

selectingTheListItemsFunc(selectedDiv.textContent);
fillingTheLowerSidebar(projects);

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    selectedDiv = item;
    tempDiv.style.backgroundColor = "";
    selectingTheListItemsFunc(selectedDiv.textContent);
  });
});

function handleMoreOptions() {
  document.querySelectorAll(".lower-item").forEach((listItem) => {
    listItem.lastElementChild.addEventListener("click", (e) => {
      let temp = listItem;
      if (dropboxDiv) dropboxDiv.remove();
      dropboxDiv = document.createElement("div");
      dropboxDiv.classList.add("dropbox");
      dropboxDiv.innerHTML = `<div class="edit-btn">Rename</div>
      <div class="delete-btn">Delete</div>`;
      listItem.prepend(dropboxDiv);

      let projectName = listItem.querySelector(".item-name").innerHTML;
      let dropBoxDeleteBtn = dropboxDiv.querySelector(".delete-btn");
      let dropBoxRenameBtn = dropboxDiv.querySelector(".edit-btn");

      dropBoxDeleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedDiv = document.querySelector(".upper-sidebar").children[1];
        projects = projects.filter((name) => name !== projectName);
        resetLowerSidebar();
        fillingTheLowerSidebar(projects);
        selectingTheListItemsFunc();
        clearResults();
        let tempArr = tasksArr.filter(
          (t) => t.project == selectedDiv.querySelector(".item-name").innerHTML
        );
        generateTasks(tempArr);
      });

      dropBoxRenameBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let renameBox = document.createElement("div");
        renameBox.classList.add("rename-inputbox-section");
        renameBox.innerHTML = `<div class="rename-inputbox-section-above">
          <img src="images/burger-bar.png" alt="icon not found" class="more-options"/>
          <input type="text" id="rename-project-inputbox" value="${projectName}" />
        </div>
        <div class="rename-inputbox-section-below">
          <button class="btn1 rename-btn">Rename</button>
          <button class="btn2 cancel-btn">Cancel</button>
        </div>`;
        listItem.replaceWith(renameBox);

        renameBox.querySelector(".rename-btn").addEventListener("click", () => {
          let newName = document.querySelector(
            "#rename-project-inputbox"
          ).value;
          let idx = projects.indexOf(projectName);
          projects[idx] = newName;
          resetLowerSidebar();
          fillingTheLowerSidebar(projects);
        });

        renameBox.querySelector(".cancel-btn").addEventListener("click", () => {
          renameBox.replaceWith(temp);
        });
      });
    });
  });
}

function addProjectBox() {
  let div = document.createElement("div");
  div.innerHTML = `<div class="new-project-inputbox-section">
    <div class="new-project-inputbox-section-above">
      <img src="images/burger-bar.png" alt="icon not found" class="more-options"/>
      <input type="text" placeholder="Enter Project Name" id="new-project-inputbox"/>
    </div>
    <div class="new-project-inputbox-section-below">
      <button class="btn1">Add</button>
      <button class="btn2">Cancel</button>
    </div>
  </div>`;
  allItems.append(div);
  addBtn = document.querySelector(".btn1");
  cancelBtn = document.querySelector(".btn2");
  handleNewProjectBtns(div);
}

function handleNewProjectBtns(div) {
  addBtn.addEventListener("click", () => {
    newProjectBtnCount = 1;
    let val = document.querySelector("#new-project-inputbox").value;
    projects.push(val);
    resetLowerSidebar();
    fillingTheLowerSidebar(projects);
    div.remove();
    attachLowerSidebarEvents();
  });
  cancelBtn.addEventListener("click", () => {
    newProjectBtnCount = 1;
    div.remove();
  });
}

function fillingTheLowerSidebar(projects) {
  projects.forEach((name) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("lower-item", "lower-sidebar-item");
    projectDiv.innerHTML = `<img src="images/burger-bar.png" alt="icon not found" class="pencil"/>
    <div class="item-name">${name}</div>
    <img src="images/more options.png" alt="not found" class="more-options"/>`;

    projectDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedDiv = projectDiv;
      tempDiv.style.backgroundColor = "";
      selectingTheListItemsFunc(name);
    });
    allItems.append(projectDiv);
  });
  handleMoreOptions();
}

function resetLowerSidebar() {
  allItems.innerHTML = "";
}

function selectingTheListItemsFunc(name = selectedDiv.textContent) {
  selectedDiv.style.backgroundColor = "#F4A6C1";
  bannerHead.innerHTML = name;
  tempDiv = selectedDiv;
}

burgerBtn.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "none" ? "inline" : "none";
});

document.addEventListener("click", () => {
  if (dropboxDiv) dropboxDiv.remove();
});

newProjectBtn.addEventListener("click", () => {
  if (newProjectBtnCount === 1) {
    addProjectBox();
    newProjectBtnCount = 0;
  }
});

let addNewTaskBtn = document.querySelector(".add-new-task");
let formDiv = document.createElement("div");
let addNewTaskBtnFlag = 0;
let addTaskBtnReferenceNode = addNewTaskBtn;
let resultDiv = document.createElement("div");

function handleTaskBtn() {
  addNewTaskBtn.addEventListener("click", () => {
    if (addNewTaskBtnFlag === 0) {
      formDiv = document.createElement("div");
      formDiv.classList.add("task-section");
      formDiv.innerHTML = `<div class="task-input-form">
      <div class="div-task-title div-flex">
        <label for="task-title">Title:</label>
        <input type="text" id="task-title" required />
      </div>
      <label for="task-details">Details(optional):</label>
      <textarea class="div-task-details div-flex" rows="5"></textarea>
      <div class="div-task-deadline div-flex">
        <label for="task-deadline">Date:</label>
        <input type="date" id="task-deadline" />
      </div>
      <div class="button-section-task-input-form">
        <button class="btn1" id="add-button-task-input-form">Add</button>
        <button class="btn2" id="cancel-button-task-input-form">Cancel</button>
      </div>
      </div>`;
      addTaskBtnReferenceNode.before(formDiv);
      addNewTaskBtnFlag = 1;

      let addBtnTask = formDiv.querySelector("#add-button-task-input-form");
      let cancelBtnTask = formDiv.querySelector(
        "#cancel-button-task-input-form"
      );

      addBtnTask.addEventListener("click", () => {
        let title = formDiv.querySelector("#task-title").value;
        let details = formDiv.querySelector(".div-task-details").value;
        let date = formDiv.querySelector("#task-deadline").value;
        if (title || details) {
          let projectName = selectedDiv.querySelector(".item-name").innerHTML;
          let task = new Tasks(count, projectName, title, details, date);
          tasksArr.push(task);
          count++;
          formDiv.remove();
          clearResults();
          let tempArr = tasksArr.filter((t) => t.project == projectName);
          generateTasks(tempArr);
        }
      });

      cancelBtnTask.addEventListener("click", () => {
        formDiv.remove();
        addNewTaskBtnFlag = 0;
      });
    }
  });
}

function attachLowerSidebarEvents() {
  document.querySelectorAll(".lower-sidebar-item").forEach((item) => {
    item.addEventListener("click", () => {
      clearResults();
      addNewTaskBtn.style.display = "flex";
      formDiv.remove();
      addNewTaskBtnFlag = 0;
      let tempArr = tasksArr.filter(
        (t) => t.project == selectedDiv.querySelector(".item-name").innerHTML
      );
      generateTasks(tempArr);
      handleTaskBtn();
    });
  });
}

addNewTaskBtn.style.display = "none";

document.querySelectorAll(".upper-sidebar-item").forEach((item) => {
  item.addEventListener("click", () => {
    addNewTaskBtn.style.display = "none";
  });
});

function generateTasks(arr) {
  resultDiv.remove();
  arr.forEach((item) => {
    resultDiv = document.createElement("div");
    resultDiv.classList.add("form-output");
    if (!item.date) item.date = "No Due Date";
    resultDiv.innerHTML = `<div class="left-of-form-output">
      <input type="checkbox" id="task-checkbox"/>
      <div class="task-title-and-task-description-display">
        <p class="form-output-title-display ${
          item.completed ? "completed" : ""
        }">${item.title}</p>
        <p class="form-output-description-display ${
          item.completed ? "completed" : ""
        }">${item.details}</p>
      </div>
      </div>
      <div class="right-of-form-output">
        <div class="date">${item.date}</div>
        <img src="${item.flagImg}" alt="star not found" class="new-star"/>
        <img src="images/delete.png" alt="delete icon" class="more-options-form-output"/>
      </div>`;
    addTaskBtnReferenceNode.before(resultDiv);
    addNewTaskBtnFlag = 0;

    let checkbox = resultDiv.querySelector("#task-checkbox");
    let starBtn = resultDiv.querySelector(".new-star");
    let delBtn = resultDiv.querySelector(".more-options-form-output");
    let title = resultDiv.querySelector(".form-output-title-display");
    let desc = resultDiv.querySelector(".form-output-description-display");

    checkbox.addEventListener("click", () => {
      title.classList.toggle("completed");
      desc.classList.toggle("completed");
      tasksArr[item.id].completed = !tasksArr[item.id].completed;
      refreshTasks();
    });

    starBtn.addEventListener("click", () => {
      item.favFlag = !item.favFlag;
      item.flagImg = item.favFlag
        ? "images/glowing-star.png"
        : "images/new-star.png";
      refreshTasks();
    });

    delBtn.addEventListener("click", () => {
      tasksArr = tasksArr.filter((t) => t.id != item.id);
      refreshTasks();
    });
  });
}

function clearResults() {
  document.querySelectorAll(".form-output").forEach((item) => item.remove());
}

function refreshTasks() {
  clearResults();
  let name = selectedDiv.querySelector(".item-name").innerHTML;
  if (name === "All Tasks") generateTasks(tasksArr);
  else if (name === "Today") todayData();
  else if (name === "Next 7 Days") weekData();
  else if (name === "Important") favData();
  else {
    let tempArr = tasksArr.filter((t) => t.project == name);
    generateTasks(tempArr);
  }
}

function todayData() {
  let today = new Date().toISOString().split("T")[0];
  let arr = tasksArr.filter((t) => t.calculateDate() == today);
  generateTasks(arr);
}

function weekData() {
  let today = new Date().toISOString().split("T")[0];
  let arrToday = today.split("-");
  let arr = tasksArr.filter((t) => {
    let taskArr = t.calculateDate().split("-");
    if (arrToday[0] == taskArr[0]) {
      if (arrToday[1] == taskArr[1]) {
        return taskArr[2] - arrToday[2] >= 0 && taskArr[2] - arrToday[2] < 7;
      } else {
        return (
          taskArr[2] + 30 - arrToday[2] >= 0 &&
          taskArr[2] + 30 - arrToday[2] < 7
        );
      }
    } else {
      return (
        taskArr[2] + 395 - (arrToday[2] + 365) >= 0 &&
        taskArr[2] + 395 - (arrToday[2] + 365) < 7
      );
    }
  });
  generateTasks(arr);
}

function favData() {
  let arr = tasksArr.filter((t) => t.favFlag);
  generateTasks(arr);
}
