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
.argv;
const cmd=[
  "lstasks",
  "showtask",
  "addtask",
  "closetask",
  "deletetask",
  "updatetask",
  "lsprojects",
  "addProject",
  "showProject",
  "updateproject",
  "deleteproject",
  "showprojecttasks",
  "addprojecttask",
  "deleteprojecttask"
]
let flag=0;
for (var j=0; j<cmd.length; j++) {
  if (cmd[j]==process.argv[2])
  {
  flag=1;
  }
}

  if (flag==0) {
    console.log(chalk.yellowBright("\n invalid command\n"));
    console.log(chalk.blue("{ --node index.js --help }"));
    }

