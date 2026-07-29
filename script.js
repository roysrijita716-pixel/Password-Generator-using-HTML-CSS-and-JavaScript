const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/";

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
});

function generatePassword() {

    let characters = "";

    if (uppercase.checked)
        characters += upperChars;

    if (lowercase.checked)
        characters += lowerChars;

    if (numbers.checked)
        characters += numberChars;

    if (symbols.checked)
        characters += symbolChars;

    if (characters === "") {
        passwordField.value = "Select option!";
        return;
    }

    let password = "";

    for (let i = 0; i < lengthSlider.value; i++) {
        const randomIndex =
            Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    passwordField.value = password;

    checkStrength(password);
}

function checkStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;

    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    if(score <= 2){
        strengthBar.style.width = "33%";
        strengthBar.style.background = "#ff4d4d";
        strengthText.textContent = "Weak Password";
    }

    else if(score <= 4){
        strengthBar.style.width = "66%";
        strengthBar.style.background = "#ffaa00";
        strengthText.textContent = "Medium Password";
    }

    else{
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#00cc66";
        strengthText.textContent = "Strong Password";
    }
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(passwordField.value);

    copyBtn.innerHTML = "✔";

    setTimeout(() => {
        copyBtn.innerHTML = "📋";
    }, 1500);

});

[uppercase, lowercase, numbers, symbols]
.forEach(option => {
    option.addEventListener("change", generatePassword);
});

generatePassword();