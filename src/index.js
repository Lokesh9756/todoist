
const fetch = require("node-fetch");
const yargs=require("yargs").argv;
const { v4: uuidv4 } = require('uuid');
const result =require("dotenv").config();
const prompt = require("prompt-sync")();


if (result.error) {
  throw result.error
}

const TOKEN = process.env.TOKEN


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
  let answer=prompt("Are you sure?(Y/N)")
  if(answer=='y'||answer=='Y')
  {
    const URL = process.env.URL + "projects/my tasks";
    const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}/close`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${TOKEN}`
      },
    })
    setTimeout(() => {
      console.log("task is closed")
    },2000);
  }
  else{
    console.log("Cancled")
  }

 
}
const updateTask= async() =>{
  var task=prompt("taskname?");
  var tasktime=prompt("tasktime?");
  var taskpriority=prompt();
  let answer=prompt("Are you sure?(Y/N)")
  if(answer=='y'||answer=='Y')
  {
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
  else{
    console.log("Cancled")
  }

  }
const deleteTask= async() =>{
  let answer=prompt("Are you sure?(Y/N)")
  if(answer=='y'||answer=='Y')
  {
    const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${TOKEN}`
      },
    })
    console.log(tasks)
  }
  else{
    console.log("Cancled")
  }
  }
  const getAllProjects = async () => {
 
    const projects = await fetch('https://api.todoist.com/rest/v1/projects', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json());
    console.table(projects)
  }
  const getTaskOfProject = async () => {
 let projectId=prompt("enter project id:");
 let taskId=prompt("enter task id");

    const projects = await fetch(`https://api.todoist.com/rest/v1/tasks/${taskId}?project_id=${projectId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json());
    console.table(projects)
  }
  const getProjectTasks = async () => {
 
    const projects = await fetch(`https://api.todoist.com/rest/v1/tasks?project_id=${process.argv[3]}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json());
    console.table(projects)
  }
  const getProject=async()=>{
    const projects = await fetch(`https://api.todoist.com/rest/v1/projects/${process.argv[3]}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json());
    console.table(projects) 
  }
  const CreateProject= async() =>{
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
      fetch('https://api.todoist.com/rest/v1/projects/', {
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
  // const closeProject= async() =>{
  //   let answer=prompt("Are you sure?(Y/N)")
  //   if(answer=='y'||answer=='Y')
  //   {
  //     const URL = process.env.URL + "projects/my tasks";
  //     const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}/close`,{
  //       method:"POST",
  //       headers:{
  //         Authorization:`Bearer ${TOKEN}`
  //       },
  //     })
  //     setTimeout(() => {
  //       console.log("task is closed")
  //     },2000);
  //   }
  //   else{
  //     console.log("Cancled")
  //   }
  
   
  // }
  const updateProject= async() =>{
    var task=prompt("taskname?");
    var tasktime=prompt("tasktime?");
    var taskpriority=prompt();
    let answer=prompt("Are you sure?(Y/N)")
    if(answer=='y'||answer=='Y')
    {
      var rawData={
        "content": `${task}`,
         "due_string": `${tasktime}`,
         "due_lang": "en",
         "priority": parseInt(taskpriority)
    };
    var Data=JSON.stringify(rawData);
        fetch(`https://api.todoist.com/rest/v1/projects/${process.argv[3]}`, {
          method: 'POST',
          body:  Data,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": uuidv4(),
            "Authorization": `Bearer ${TOKEN}`
        }
      })
    }
    else{
      console.log("Cancled")
    }
  
    }
  const deleteProject= async() =>{
    let answer=prompt("Are you sure?(Y/N)")
    if(answer=='y'||answer=='Y')
    {
      const tasks=await fetch(`https://api.todoist.com/rest/v1/projects/${process.argv[3]}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${TOKEN}`
        },
      })
      console.log(tasks)
    }
    else{
      console.log("Cancled")
    }
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
if(process.argv[2]+" "+process.argv[3]=='ls project')
{
getAllProjects();
}
if(process.argv[2]=='showproject')
{
  getProject();
}
if(process.argv[2]=='projecttasks')
{
  getProjectTasks();
}
if(process.argv[2]=='projecttask')
{
  getTaskOfProject();
}
if(process.argv[2]=='createproject')
{
CreateProject();
}
if(process.argv[2]=='closeproject')
{
closeProject();
}
if(process.argv[2]=='deleteprojrct')
{
  deleteProject();
}
if(process.argv[2]=='updateproject')
{
  updateProject();
}



  