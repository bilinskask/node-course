const goToRegister = () => {
    window.location.href = "../front/register.html"
}

const login = () => {
    let username = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    if(username && password){
        let body = {
            username,
            password
        }
        fetch("http://localhost:3000/api/v1/user/login", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((header) =>{
            if(!header.ok){
                throw Error(header)
            }
            let token = header.headers.get('x-auth')
            //console.log(token)
            localStorage.setItem('x-auth', token)
            return header.json()
        }).then((res) =>{
            if(res){
                alert('Log in Successful')
                window.location.href = "../front/index.html"
            }
        }).catch('login failed')
    }
    else{
        alert("Fill in Mandatory fields")
    }
}