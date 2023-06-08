let standard = document.querySelector(".carousel-slider")
let check = function() {
    setTimeout(function () {
        standard = document.querySelector(".carousel-slider")
        if (standard === null){
            check();
        }else {
            let text = standard.querySelector(".used-of")
            const myArray = text.textContent.split(" ");
            limit =parseFloat( myArray[4])
            used = parseFloat(myArray[0])
            let remaing = limit - used
            text.textContent += "\n REMAINING "+remaing+" GB"
            let next = document.querySelectorAll(".slide")
            next = next[2]
            text = next.querySelector(".used-of")
            let peak_array = text.textContent.split(" ");
            peak_limit = peak_array[4]
            peak_used = peak_array[0]
            peak_limit = parseFloat(peak_limit)-limit
            peak_used = parseFloat(peak_used)-used
            peak_rem = peak_limit-peak_used
            text.textContent = peak_used + "GB USED OF "+peak_limit+`GB 
            REMAINING `+peak_rem+" GB"
            let dev = peak_rem/peak_limit
            let percentage = dev* 100
            percentage = parseInt(percentage)
            let pep = next.querySelector(".progress-count")
            pep.textContent = percentage+"%"
            let name= next.querySelector(".name")
            name.textContent = "Night time"
            let circle = next.querySelector(".RCP__progress")
            let offset = 630*(1-dev)
            circle.style.strokeDashoffset = offset

      }
    }, 500);
  };
check();


