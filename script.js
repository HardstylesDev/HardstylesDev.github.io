// Define constants and variables
const textarea = $('.term');
let currentIndex = 0;
let dataIndex = 0;
const startScript = './welcome.sh';

$(".container").hide();

const scripts = [
    './start.sh',
    'tom',
    '*********',
    'Yes\n',
    'HardstylesDev',
    'arraylist',
    'hardstyles@proton.me\n\n',
    'sudo apt update',
    'sudo apt upgrade -y',
    'sudo systemctl restart networking',
];

const prompts = [
    "Please state the user you would like to add > ",
    "Please set the password for 'tom' > ",
    "Shall we create a home directory for 'tom' > ",
    "Directory Created, time for your socials!\n\nPlease state your GitHub username, if none put 'N/A' > ",
    "Please state your Discord username, if none put ' N/A ' > ",
    "Please state your Email, if none put ' N/A ' > ",
    "Running system updates and configurations...\n\n",
];

const output = [
    "\nInformation complete! Initializing database.",
    "debug: Creating user account 'tom'",
    "debug: Setting user account password",
    "debug: Creating user home directory, /home/tom",
    "debug: Granting sudo privileges to user 'tom'",
    "debug: Setting GitHub account name 'HardstylesDev'",
    "debug: Setting Discord username 'hardstylesdev'",
    "debug: Setting email address 'hardstyles@proton.me'",
    "debug: Updating package list...",
    "debug: Installing package upgrades...",
    "debug: Restarting networking services...",
    "debug: System configuration complete!",
    "debug: Account initialized successfully!",
];

const systemInfo = [
    "Linux Kernel: 5.15.0-73-generic",
    "OS: Ubuntu 20.04.6 LTS",
    "CPU: AMD Ryzen 9 5900X @ 3.7GHz",
    "Memory: 32GB DDR4 3600MHz",
    "Disk: 2TB NVMe SSD",
    "Uptime: 0 days, 0 hours, 1 minute",
    "Active Users: 1",
];

function displayText(text, callback) {
    if (currentIndex < text.length) {
        textarea.append(`<span style="color: #c2b0d5;">${text.charAt(currentIndex)}</span>`);
        currentIndex++;
        setTimeout(() => displayText(text, callback), Math.floor(Math.random() * 50) + 25); // Faster text display
    } else {
        currentIndex = 0;
        textarea.append("<br>");
        if (callback) callback();
    }
}

function displaySystemInfo(callback) {
    textarea.append("<br><span style='color: #7e6afd;'>System Information:</span><br>");
    systemInfo.forEach((info, idx) => {
        setTimeout(() => {
            textarea.append(`<span style="color: #cecece;">${info}</span><br>`);
        }, idx * 25); 
    });
    setTimeout(callback, systemInfo.length * 25 + 500);
}

function runScriptAndPrompt() {
    if (dataIndex < scripts.length) {
        displayText(scripts[dataIndex], () => {
            currentIndex = 0;
            if (prompts[dataIndex]) {
                textarea.append(`<span style="color: #ffffff;">${prompts[dataIndex]}</span>`);
            }
            dataIndex++;
            runScriptAndPrompt();
        });
    } else {
        currentIndex = 0;
        setTimeout(() => runFeedback(), 100);
    }
}

function runFeedback() {
    let feedbackIndex = 0;
    textarea.append("<br><span style='color: #7e6afd;'>[System Logs]</span><br>");
    const interval = setInterval(() => {
        if (feedbackIndex < output.length) {
            textarea.append(`<span style="color: #ffffff;">[${(feedbackIndex / 1000).toFixed(3)}] ${output[feedbackIndex]}<br></span>`);
            feedbackIndex++;
        } else {
            clearInterval(interval);
            currentIndex = 0;
            textarea.append("<br>Initialising...<br>");
            setTimeout(() => {
                displaySystemInfo(() => {
                    $(".load").fadeOut(500);
                    setTimeout(() => {
                        $(".container").fadeIn(500);
                    }, 600);
                });
            }, 500);
        }
    }, 75);
}

runScriptAndPrompt();
