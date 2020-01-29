const registerUser = () => {
    let email = document.getElementById("registerEmail").value
    let password = document.getElementById("registerPassword").value
    let rPassword = document.getElementById("registerRPassword").value
    console.log(email, password, rPassword)
    if(password === rPassword){
        let body = {
            username: email,
            password: password
        }
        fetch("http://localhost:3000/api/v1/user/register", {
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
            return header.json()
        }).then((res) =>{
            if(res){
                alert('Registration successful')
            }
        }).catch('login failed')
    }
}