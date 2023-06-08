
browser.storage.local.get("phone").then(result => {
    const phone = result['phone'];
    console.log(phone);
    browser.storage.local.get("token").then(result => {
        const token = result['token'];
        console.log(token);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://omniscapp.slt.lk/mobitelint/slt/api/BBVAS/UsageSummary?subscriberID='+phone, true);
        xhr.setRequestHeader('X-IBM-Client-Id', '41aed706-8fdf-4b1e-883e-91e44d7f379b');
        xhr.setRequestHeader('Authorization', 'bearer '+token);
        console.log("hehe")
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            let std = response['dataBundle']['my_package_info']['usageDetails'][0];
            let nstd = response['dataBundle']['my_package_info']['usageDetails'][1];
            std_limit = std['limit']
            std_percent = std['percentage']
            std_rem = std['remaining']
            std_used = std["used"]
            let std_percentage_element = document.querySelector(".std-remaining")
            std_percentage_element.textContent = std_percent + "%"
            let std_usage_element = document.querySelector(".std-usage")
            std_usage_element.textContent = std_used + " GB USED OF " + std_limit + "GB, "+std_rem +" GB REMAINING" 
            let circle = document.querySelector(".std_prg")
            let offset = 630*(1-(std_percent/100))
            circle.style.strokeDashoffset = offset

            nstd_limit = nstd['limit'] - std_limit
            nstd_rem = nstd['remaining'] - std_rem
            nstd_used = nstd["used"] - std_used
            nstd_used = roundTo1dp(nstd_used)
            nstd_percent = Math.floor((nstd_rem/nstd_limit)*100)

            let nstd_percentage_element = document.querySelector(".nt-remaining")
            nstd_percentage_element.textContent = nstd_percent + "%"
            let nstd_usage_element = document.querySelector(".nt-used")
            nstd_usage_element.textContent = nstd_used + " GB USED OF " + nstd_limit + "GB, "+nstd_rem +" GB REMAINING" 
            let ncircle = document.querySelector(".std_prg")
            let noffset = 630*(1-(nstd_percent/100))
            ncircle.style.strokeDashoffset = noffset


        }
        };
        xhr.send();
      })
  })


function roundTo1dp(number) {
    var roundedNumber = number.toFixed(1);
    return parseFloat(roundedNumber);
}

let prev_btt = document.getElementById("prev_btt")
prev_btt.addEventListener('click', function(event) {
    next()
})
let nxt_btt = document.getElementById("nxt_btt")
nxt_btt.addEventListener('click', function(event) {
    next()
})
function next(){
    let selected = document.querySelector(".selected")
    let hidden = document.querySelector(".hidden")
    hidden.classList.remove("hidden")
    hidden.classList.add("selected")
    selected.classList.add("hidden")
    selected.classList.remove("selected")
    let enabled = document.querySelector(".enabled")
    let disabled = document.querySelector(".disabled")
    enabled.classList.remove("enabled")
    enabled.classList.add("disabled")
    disabled.classList.add("enabled")
    disabled.classList.remove("disabled")
}
function load(name){
    browser.storage.local.get(name)
    .then(result => {
        const value =  result[name];
        console.log('Retrieved value:', value);
        return value
    })
    .catch(error => {
        console.error('Error retrieving data:', error);
    });
}


