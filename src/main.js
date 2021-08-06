const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');
const result =require("dotenv").config();
const prompt = require("prompt-sync")();
const TOKEN = process.env.TOKEN
 class fn{
 getAllActiveTasks= async() =>{
    const tasks=await fetch('https://api.todoist.com/rest/v1/tasks',{
      headers:{
        Authorization:`Bearer ${TOKEN}`
      },
    }).then((res)=>res.json()).catch(err=>{
        console.log("Error:",err)
    });
    console.table(tasks)
  }
  getSpecificTask= async() =>{
    let id=prompt("enter id of task")
    const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${id}`,{
      headers:{
        Authorization:`Bearer ${TOKEN}`
      },
    }).then((res)=>res.json()).catch(err=>{
      if(err)
      {
        console.log("Invalid id:")
      }
        
       
    });
    console.log(tasks)
  }
   createTask= async() =>{
    var task=prompt("taskname?");
    var tasktime=prompt("tasktime?");
    var taskpriority=prompt("priority?");
    
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
      .then(json => console.log(json)).catch(err=>{
          console.log("Error:",err)
      });
  }
   closeTask= async() =>{

    let answer=prompt("Are you sure?(Y/N)")
    if(answer=='y'||answer=='Y')
    {
        let id=prompt("enter id pf task:")
      const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/close`,{
        method:"POST",
        headers:{
          Authorization:`Bearer ${TOKEN}`
        },
      }).catch(err=>{
          console.log("Error",err);
      })
      setTimeout(() => {
        console.log("task is closed")
      },2000);
    }
    else{
      console.log("Cancled")
    }
  }
  
   
 updateTask= async() =>{
    var task=prompt("taskname?");
    var tasktime=prompt("tasktime?");
    var taskpriority=prompt("enter priority?");
    let answer=prompt("Are you sure?(Y/N)")
    if(answer=='y'||answer=='Y')
    {
        let id=prompt("enter task id:")
      var rawData={
        "content": `${task}`,
         "due_string": `${tasktime}`,
         "due_lang": "en",
         "priority": parseInt(taskpriority)
    };
    var Data=JSON.stringify(rawData);
        fetch(`https://api.todoist.com/rest/v1/tasks/${id}`, {
          method: 'POST',
          body:  Data,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": uuidv4(),
            "Authorization": `Bearer ${TOKEN}`
        }
      }).catch(err=>{
          console.log("Error",err)
      })
      setTimeout(() => {
        console.log("task is updated succesfully")
      },2000);
    }
    else{
      console.log("Cancled")
    }
  
    }
   deleteTask= async() =>{
    let answer=prompt("Are you sure?(Y/N)")
    if(answer=='y'||answer=='Y')
    {
        let id=prompt("enter task id:")
      const tasks=await fetch(`https://api.todoist.com/rest/v1/tasks/${process.argv[3]}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${TOKEN}`
        },
      }).catch(err=>{
          console.log("Error",err)
      })
      console.log(tasks)
    }
    else{
      console.log("Cancled")
    }
    }
     getAllProjects = async () => {
   
      const projects = await fetch('https://api.todoist.com/rest/v1/projects', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }).then((res) => res.json()).catch(err=>{
          console.log("Error",err)
      });
      console.table(projects)
    }
     getTaskOfProject = async () => {
   let projectId=prompt("enter project id:");
   let taskId=prompt("enter task id");
  
      const projects = await fetch(`https://api.todoist.com/rest/v1/tasks/${taskId}?project_id=${projectId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }).then((res) => res.json()).catch(err=>{
          console.log("Error",err)
      });
      console.table(projects)
    }
     getProjectTasks = async () => {
   let id=prompt("enter project id:");
      const projects = await fetch(`https://api.todoist.com/rest/v1/tasks?project_id=${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }).then((res) => res.json()).catch(err=>{
          console.log("Error:",err)
      });
      console.table(projects)
    }
    createProjectTask = async () => {
      let projectId=prompt("enter project id:");
          var task=prompt("taskname?");
          var tasktime=prompt("tasktime?");
          var taskpriority=prompt("priority?");
          
          var rawData={
            "content": `${task}`,
            "due_string": `${tasktime}`,
            "due_lang": "en",
            "priority": parseInt(taskpriority)
        };
        var Data=JSON.stringify(rawData);
            fetch(`https://api.todoist.com/rest/v1/tasks?project_id=${projectId}`, {
              method: 'POST',
              body:  Data,
              headers: {
                "Content-Type": "application/json",
                "X-Request-Id": uuidv4(),
                "Authorization": `Bearer ${TOKEN}`
            }
          }).then(res => res.json())
            .then(json => console.log(json)).catch(err=>{
                if(err)
                {
                  consolelog("invalid project id")
                }
            });
            setTimeout(() => {
              console.log("task in specific project created succesfully")
            },2000); 
       }
     getProject=async()=>{
         let id=prompt("enter project id:");
      const projects = await fetch(`https://api.todoist.com/rest/v1/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }).then((res) => res.json()).catch(err=>{
          console.log("Error:",err)
      });
      console.table(projects) 
    }
     createProject= async() =>{
      var task=prompt("projectname?");
      var tasktime=prompt("projecttime?");
      var taskpriority=prompt("priority");
      
      var rawData={
        "name": `${task}`,
         "due_string": `${tasktime}`,
         "due_lang": "en",
         "priority": parseInt(taskpriority)
    };
    var Data=JSON.stringify(rawData);
        fetch('https://api.todoist.com/rest/v1/projects', {
          method: 'POST',
          body:  Data,
          headers: {
            "Content-Type": "application/json",
            "X-Request-Id": uuidv4(),
            "Authorization": `Bearer ${TOKEN}`
        }
      }).then(res => res.json())
        .then(json => console.log(json)).catch(err=>{
            console.log("Error:",err)
        });
    }
     updateProject= async() =>{
      var task=prompt("taskname?");
      var tasktime=prompt("tasktime?");
      var taskpriority=prompt();
      let answer=prompt("Are you sure?(Y/N)")
      if(answer=='y'||answer=='Y')
      {
          let id=prompt("enter project id:")
        var rawData={
          "name": `${task}`,
           "due_string": `${tasktime}`,
           "due_lang": "en",
           "priority": parseInt(taskpriority)
      };
      var Data=JSON.stringify(rawData);
          fetch(`https://api.todoist.com/rest/v1/projects/${id}`, {
            method: 'POST',
            body:  Data,
            headers: {
              "Content-Type": "application/json",
              "X-Request-Id": uuidv4(),
              "Authorization": `Bearer ${TOKEN}`
          }
        }).catch(err=>{
            console.log("Error",err)
        })
      }
      else{
        console.log("Cancled")
      }
    
      }
     deleteProject= async() =>{
      let answer=prompt("Are you sure?(Y/N)")
      if(answer=='y'||answer=='Y')
      {
          let id=prompt("enter id of project:")
        const tasks=await fetch(`https://api.todoist.com/rest/v1/projects/${id}`,{
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
    }
    module.exports.fn=fn;