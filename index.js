const database = [
    {
        title: "coding",
        tasks: ["learn js", "learn css", "learn html"],
    },
    {
        title: "home",
        tasks: ["cleaning", "washing"],
    },
];

function loopDatabase() {
    var databaseText = "";

    database.forEach(function (value, index) {
        databaseText += `
            <div class="column">
              <button class="button close-column" onclick="deleteColumn(${index})">
                <i class="fas fa-times"></i>
              </button>
              <p class="title">${value.title}</p>
              ${loopTasks(value.tasks, index)}
              <div class="add-new-task-box">
                <input id="task-${index}" type="text" class="task-input" placeholder="add task" />
                <button onclick="addTask(${index})" class="button add-task button-${index}">
                  <i class="fas fa-plus fas-${index}"></i>
                </button>
              </div>
            </div>
              `;
    });

    databaseText += `
      <div class="column">
          <div class="add-new-task-box">
              <input id="title" type="text" class="task-input" placeholder="add title" autofocus />
              <button onclick="addTitle()" class="button add-task">
                  <i class="fas fa-plus"></i>
              </button>
          </div>
      </div>`;

    document.querySelector(".wrapper").innerHTML = databaseText;
};

loopDatabase();

function loopTasks(tasks, titleIndex) {
    var tasksText = "";
    tasks.forEach(function (value, index) {
        tasksText += `
              <div class="task-box">
                <p class="task-text">${value}</p>
                <div class="action-box">
                  <button class="button edit" onclick="editTask(${titleIndex},${index})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="button delete" onclick="deleteTask(${titleIndex},${index})">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              `;
    });

    return tasksText;
};

function addTitle() {
    const inputTitle = document.getElementById("title").value;

    if (inputTitle != "") {
        const columnObject = {
            title: inputTitle,
            tasks: [],
        };
        database.push(columnObject);

        loopDatabase();
    };
};

function addTask(index) {
    const task = document.getElementById(`task-${index}`).value;

    if (task != "") {
        database[index].tasks.push(task);

        loopDatabase();
    };
};

function deleteColumn(index) {
    database.splice(index, 1);
    loopDatabase();
};

function deleteTask(titleIndex, taskIndex) {
    database[titleIndex].tasks.splice(taskIndex, 1);

    loopDatabase();
};

function editTask(titleIndex, taskIndex) {
    const task = database[titleIndex].tasks[taskIndex];

    document.getElementById(`task-${titleIndex}`).value = task;
    document.querySelector(`.fas-${titleIndex}`).classList.replace("fa-plus", "fa-edit");

    document.querySelector(`.button-${titleIndex}`).onclick = function(){editTaskButton(titleIndex, taskIndex); };
};

function editTaskButton(titleIndex, taskIndex) {
    const editValue = document.getElementById(`task-${titleIndex}`).value;
    database[titleIndex].tasks.splice(taskIndex, 1, editValue);
    loopDatabase();
    console.log("edit button is working");
};
