
// SETTINGS -------------------------
// Tweak the following to fit your preferences

var pauseTime = 10; // in seconds

var mainMessage = "take deep breaths.";

const websiteList = [
    "www.facebook.com",
    "www.youtube.com",
    "www.twitter.com",
    "www.pinterest.com",
    "www.ebay.com",
    "www.netflix.com"
];

let hostname = window.location.hostname.replace("www.", "");
let domainName = hostname.split('.')[0];
domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1);

// FUNCTION DEFINITIONS AND HELPERS -------------------------

function currentWebsiteInList(websiteList) {
    var currentUrl = window.location.hostname;

    // If URL doesn't include subdomain "www", add it
    if (currentUrl.indexOf("www.") === -1) {
        currentUrl = "www." + currentUrl
    };
    
    for (let i = 0; i < websiteList.length; i++) {
        if (currentUrl === websiteList[i]) {
            return true;
        }
    }
    return false;
};


function enableOverlay() {

    var overlayElement = document.createElement("div");

    overlayElement.id = "overlayElement";
    
    document.body.appendChild(overlayElement);

    overlayElement.innerHTML += `
        <p class="paddingHelper"></p>`;
    
    // Breathing animation
    overlayElement.innerHTML += `
    <div class="breathingContainer">
        <div class="circle"></div>
    </div>
    `;

    overlayElement.innerHTML += `
        <p class="paddingHelper"></p>
        <p class="mainMessage">${mainMessage}</p>
        <p class="intentionMessage">I am entering ${domainName} with the intention to</p>
    `;

    // Create a container for the text and textarea
    var textContainer = document.createElement("div");
    textContainer.className = "textContainer";
    overlayElement.appendChild(textContainer);

    // Add a text entry box
    var textArea = document.createElement("textarea");
    textArea.id = "textAreaInput";
    textArea.placeholder = "Enter intention here...";
    textArea.spellcheck="false"
    overlayElement.appendChild(textArea);


    // Add space between entry box and buttons
    let p = document.createElement("p");
    overlayElement.append(textArea, p, p)
    
    startCountdownTimer();
    
};

function startCountdownTimer() {
    overlayElement.innerHTML += `<p id="countdownMessage""></p>`

    let timeleft = pauseTime * 1000; // * 1000 to convert from milliseconds to seconds
    
    let countdownTimer = setInterval(function(){
        if(timeleft < 0) {
            clearInterval(countdownTimer);
            timeOver();
        } else {
            document.getElementById("countdownMessage").innerHTML = "resuming in " + timeleft/1000;
        }
        timeleft -= 1000;
    }, 1000);
};
 
function timeOver() {
    document.getElementById("countdownMessage").style.display = "none";

    // Create and set up the "close tab" button
    let closeButton = document.createElement("button");
    closeButton.id = "closeButton";
    closeButton.innerHTML = "exit this tab";
    closeButton.addEventListener("click", function() {
        window.close()
    });

    // Create and set up the "continue" button
    let hostname = window.location.hostname.replace("www.", "");
    let domainName = hostname.split('.')[0];
    domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    
    let continueButton = document.createElement("button");
    continueButton.innerHTML = `&#8594 enter ${domainName}`;
    continueButton.id = "continueButton";
    continueButton.addEventListener("click", function() {
        document.getElementById("overlayElement").style.display = "none";
    });

    // To add newline between buttons
    let p = document.createElement("p");

    overlayElement.append(closeButton, p, continueButton);
};

// MAIN -------------------------

if (currentWebsiteInList(websiteList)) {
    enableOverlay();
};


