browser.storage.local.get("phone").then(result => {
    const phone = result['phone'];
    console.log(phone);
    browser.storage.local.get("token").then(result => {
        const token = result['token'];
        if (token != null){
            if (phone != null){
                window.location.href = "./index.html";
            }
        }
    
    })
})
let prev_btt = document.getElementById("submit")
prev_btt.addEventListener('click', function(event) {
    let loader = document.querySelector(".loading")
    loader.style.display = "block"
    let section = document.querySelector(".container-login100")
    section.style.display = "none"
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    user = email.value
    pass = password.value
    console.log(user)
    login(user,pass)
    

})
function login(user,pass){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://omniscapp.slt.lk/mobitelint/slt/api/Account/Login', true);
    xhr.setRequestHeader('X-IBM-Client-Id', '41aed706-8fdf-4b1e-883e-91e44d7f379b');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    console.log("hehe")
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        token = response['accessToken']
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://omniscapp.slt.lk/mobitelint/slt/api/AccountOMNI/GetAccountDetailRequest?username='+user, true);
        xhr2.setRequestHeader('X-IBM-Client-Id', '41aed706-8fdf-4b1e-883e-91e44d7f379b');
        //xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr2.setRequestHeader('Authorization', 'bearer '+token);
        console.log("hehe")
        xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            var response = JSON.parse(xhr2.responseText);
            phone = response['dataBundle'][0]['telephoneno']
            save({"token":token})
            save({"phone":phone})
            window.location.href = "./index.html";
        }else{
            let loader = document.querySelector(".loading")
            loader.style.display = "none"
            let section = document.querySelector(".container-login100")
            section.style.display = "block"

        }
        };
        var requestBody = 'username='+user+'&password='+encodeURIComponent(pass)+'&channelID=WEB'
        xhr2.send(requestBody);
    }else{
        let loader = document.querySelector(".loading")
        loader.style.display = "none"
        let section = document.querySelector(".container-login100")
        section.style.display = "block"

    }
    };
    var requestBody = 'username='+user+'&password='+encodeURIComponent(pass)+'&channelID=WEB'
    xhr.send(requestBody);

    

}

function save(data){
    browser.storage.local.set(data)
    .then(() => {
        console.log('Data stored successfully.');
    })
    .catch(error => {
        console.error('Error storing data:', error);
    });
}