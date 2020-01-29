const checkifLoggedIn = () =>{
    let token = localStorage.getItem('x-auth')
    if(!token){
        window.location.href = "../front/login.html"
    }
    else{
        pullItems()
    }
}

const pullItems = () =>{
    let token = localStorage.getItem('x-auth')
    fetch('http://localhost:3000/api/v1/todo/getAllItems',{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            "x-auth": token
        }
    })
    .then((header) =>{
        if(!header.ok){
            throw Error(header)
        }
        return header.json()
        })
    .then((res) =>{
        drawTodos(res)
    })
    .catch("error")   
}

const createItem = () =>{
    let todo = document.getElementById("newItem").value
    console.log(todo)
    if(todo.length != 0){
        let body = {
            title: todo
        }
        let token = localStorage.getItem('x-auth')
        fetch('http://localhost:3000/api/v1/todo/create',{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                "Content-Type": "application/json",
                "x-auth": token
            }
        })
        .then((header) =>{
            if(!header.ok){
                throw Error(header)
            }
            return header.json()
        }).then((res) =>{
            if(res){
                pullItems()
            }
        }).catch('Invalid todo Item')
    }
    else{
        alert('Ivesk kazka')
    }
}

const drawTodos = (data) => {
    let ul = document.getElementById("list")
    ul.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement('li')
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
        if (data[i].completed) {
            li.classList.add('list-group-item-success')
        }    
        p = document.createElement('p')
        p.textContent = data[i].title
        p.addEventListener('click', () => {
            toggleChecked(data[i]._id, li)
        })
        li.appendChild(p)
        let span = document.createElement('button')
        span.classList.add('badge', 'badge-danger', 'badge-pill')
        span.innerHTML = '<ion-icon name="close"></ion-icon>'
        span.addEventListener('click', () => {
            deleteItem(data[i]._id, li)
        })
        li.appendChild(span)
        ul.appendChild(li)
    }
  }

  const toggleChecked = (id, li) =>{
    let token = localStorage.getItem('x-auth')
    let toggleOption
    if(li.classList.value === "list-group-item d-flex justify-content-between list-group-item-success"){
        toggleOption = false
    }    
    else{
        toggleOption = true
    }
    let body = {
        completed: toggleOption
    }
    
    fetch(`http://localhost:3000/api/v1/todo/updateOneItem/${id}`,{
        method: 'PATCH',
        body: JSON.stringify(body),
        headers:{
            "Content-Type": "application/json",
            "x-auth": token
        }
    })
    .then((header) =>{
        if(!header.ok){
            throw Error(header)
        }
        return header.json()
    }).then((res) =>{
        pullItems()
    }).catch('ERROR')
  }

  const deleteItem = (id, li) => {
    let token = localStorage.getItem('x-auth')
    fetch(`http://localhost:3000/api/v1/todo/deleteOneItem/${id}`,{
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
            "x-auth": token
        }
    })
    .then((header) =>{
        if(!header.ok){
            throw Error(header)
        }
        return header.json()
    }).then((resp) =>{
        pullItems()
    }).catch('ERROR')
  }

 
  document.addEventListener("load", checkifLoggedIn())