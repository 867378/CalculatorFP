document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const btns = document.querySelectorAll("button");
    const themeToggleBtn = document.querySelector(".theme-toggler");
    const calculator = document.querySelector(".calculator");
    let outputPres = false;

    function clrAll(){
        output.innerText = "";
    }

    btns.forEach(button => {
        button.addEventListener("click", () => {
            if(outputPres === true){
                clrAll();
                handleButtonClick(button);
                outputPres = false;
            }
            else{
                handleButtonClick(button);
            }
        });
    });

    function handleButtonClick(button) {
        switch (button.id) {
            case 'clear':
                clrAll();
                break;
            case 'backspace':
                output.innerText = output.innerText.slice(0, -1);
                break;
            case 'equal':
                try {
                    output.innerText = math.evaluate(output.innerText);
                    outputPres = true;
                } catch {
                    output.innerText = "Error!";
                }
                break;
            default:
                output.innerText += button.id;
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        calculator.classList.toggle("dark");
        themeToggleBtn.classList.toggle("active");
    });

    document.addEventListener("keydown", function(event){
        if(event.ctrlKey && event.key === 'Backspace'){
            output.innerText = "";
            event.preventDefault();
        }
        else if(event.key === 'Backspace'){
            output.innerText = output.innerText.slice(0, -1);   
        }
    })

    document.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            try {
                output.innerText = math.evaluate(output.innerText);
                outputPres = true;
            } catch {
                output.innerText = "Error!";
            }
        }
    });
    
    document.addEventListener('keypress', function(event){
        if(outputPres){
            clrAll();
            output.innerText += event.key;
            outputPres = false;
        }
        else{
            output.innerText += event.key;
        }
    });
});