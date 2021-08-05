
const fetch = require("node-fetch");
const yargs=require("yargs").argv;
const { v4: uuidv4 } = require('uuid');
const result =require("dotenv").config();
const prompt = require("prompt-sync")();


if (result.error) {
  throw result.error
}

const TOKEN = process.env.TOKEN
const getAllProjects = async () => {
 
  const projects = await fetch(process.env.URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  }).then((res) => res.json());
  console.table(projects)
}

const getAllActiveTasks= async() =>{
  const tasks=await fetch('https://api.todoist.com/rest/v1/tasks ',{
    headers:{
      Authorization:`Bearer ${TOKEN}`
    },
  }).then((res)=>res.json());
  console.table(tasks)
}
const CreateTask= async() =>{
  var task=prompt("taskname?");
  var tasktime=prompt("tasktime?");
  var taskpriority=prompt();
  
  var rawData={
    "content": `${task}`,
    "due_string": `${tasktime}`,
    "due_lang": "en",
    "priority": parseInt(taskpriority)
};
var Data=JSON.stringify(rawData);
    fetch('https://api.todoist.com/rest/v1/tasks', {
      method: 'POST',
      body:  Data,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": uuidv4(),
        "Authorization": `Bearer ${TOKEN}`
    }
  }).then(res => res.json())
    .then(json => console.log(json));
}
const closeTask= async() =>{
console.log("task is closed")
  const URL = process.env.URL + "projects/my tasks";
  const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}/close`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${TOKEN}`
    },
  })
}
const updateTask= async() =>{
  var task=prompt("taskname?");
  var tasktime=prompt("tasktime?");
  var taskpriority=prompt();
  
  var rawData={
    "content": `${task}`,
     "due_string": `${tasktime}`,
     "due_lang": "en",
     "priority": parseInt(taskpriority)
};
var Data=JSON.stringify(rawData);
    fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}`, {
      method: 'POST',
      body:  Data,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": uuidv4(),
        "Authorization": `Bearer ${TOKEN}`
    }
  })
  }
const deleteTask= async() =>{
    const URL = process.env.URL + "projects/my tasks";
    const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${TOKEN}`
      },
    })
    console.log(tasks)
  }
if(process.argv[2]+" "+process.argv[3]=='ls project')
{
getAllProjects();
}
if((process.argv[2]+" "+process.argv[3])==='ls tasks')
{
getAllActiveTasks();
}
if(process.argv[2]=='createtask')
{
CreateTask();
}
if(process.argv[2]=='closetask')
{
closeTask();
}
if(process.argv[2]=='deletetask')
{
  deleteTask();
}
if(process.argv[2]=='updatetask')
{
  updateTask();
}


  