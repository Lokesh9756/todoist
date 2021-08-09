const yargs=require("yargs");
const chalk=require("chalk");

const fn=require("./main")
var fnk=new fn.fn();
yargs
.command({
  command: "lstasks",
  describe: "list all the active tasks",
  handler: fnk.getAllActiveTasks,
})
.command({
  command: "showtask",
  describe: "list details of specific task",
  handler: fnk.getSpecificTask,
})
.command({
  command: "addtask",
  describe: "add/create a task",
  handler: fnk.createTask,
})
.command({
  command: "closetask",
  describe: "close a specific task",
  handler: fnk.closeTask,
})
.command({
  command: "deletetask",
  describe: "delete a specfic task",
  handler: fnk.deleteTask,
})
.command({
  command: "updatetask",
  describe: "update a specfic task",
  handler: fnk.updateTask,
})
.command({
  command: "lsprojects",
  describe: "list all the projects",
  handler: fnk.getAllProjects,
})
.command({
  command: "showprojecttasks",
  describe: "list all tasks of a specific project",
  handler: fnk.getProjectTasks,
})
.command({
  command: "addproject",
  describe: "create a projecct",
  handler: fnk.createProject,
})
.command({
  command: "addprojecttask",
  describe: "create a task inside projectc",
  handler: fnk. createProjectTask ,
})
.command({
  command: "deleteproject",
  describe: "delete a project",
  handler: fnk. deleteProject,
})
.command({
  command: "updateproject",
  describe: "update a project",
  handler: fnk. updateProject,
})
.command({
  command: "changeduedateofalltask",
  describe: "change due date of all  task",
  handler: fnk. changeDueDateOfAllTask,
})
.command({
  command: "showtaskbydate",
  describe: "show task by  date",
  handler: fnk. showDueTask,
})
.command({
  command: "showoverduetasks",
  describe: "show task by  date",
  handler: fnk. showOverDueTask,
})
.command({
  command: "addsubtask",
  describe: "add/create sub task in a task",
  handler: fnk. createSubTask,
})
.command({
  command: "deletealltasks",
  describe: "delete all tasks",
  handler: fnk. deleteAllTask,
})
.argv;
const cmd=[
  "lstasks",
  "showtask",
  "addtask",
  "closetask",
  "deletetask",
  "updatetask",
  "lsprojects",
  "addproject",
  "showproject",
  "updateproject",
  "deleteproject",
  "showprojecttasks",
  "addprojecttask",
  "deleteprojecttask",
  "changeduedateoftask",
  "showtaskbydate",
  "showoverduetasks",
  "addsubtask" ,
  "deletealltasks"
]
let flag=0;
for (var j=0; j<cmd.length; j++) {
  if (cmd[j]==process.argv[2])
  {
  flag=1;
  }
}

  if (flag==0) {
    console.log(chalk.yellowBright("Invalid command choose valid command from given:"));
    for(let i=0;i<cmd.length;i++){
      console.log(chalk.blue("index.js",cmd[i],"for",cmd[i]));
    }
    }

