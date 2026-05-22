const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const copyBtn = document.querySelector(".fa-regular");
const fileUrlInput = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const code = document.querySelector(".code");
const link_section = document.querySelector(".link-section");
const code_processor = document.querySelector(".code-processor");
const share_file = document.querySelector(".share-file");
const share_text = document.querySelector(".share-text");
const qr_code = document.querySelector("#qr-code");
const generate = document.querySelector(".generate");
const input_code = document.querySelector(".input_code");
const show_text = document.querySelector(".show_text");
const textArea = document.querySelector(".text-area textarea");
const textAreaContainer = document.querySelector(".text-area");
const dropZoneContainer = document.querySelector(".drop-zone");


const emailForm = document.querySelector("#emailForm");

const host = "https://inshare-backend-05zd.onrender.com";
const uploadURL = `${host}/api/files`;
const emailURL = `${host}/api/files/send`;
const textEmailURL = `${host}/api/text/send`;
const maxAllowedSize = 100 * 1024 * 1024; //100 mb

let selectedFiles = [];
let activeShareType = "file";
let latestTextCode = "";
dropZone.addEventListener("dragover" , (e) => {
    console.log("dragging");
    e.preventDefault();

    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
})

dropZone.addEventListener("dragleave" , () =>{
    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop" , (e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged")
    const files = e.dataTransfer.files
    console.table(files);
    if(files.length){
        selectedFiles = files;
        uploadFile();
    }
})

browseBtn.addEventListener("click", ()=> {
    fileInput.click();
})
fileInput.addEventListener("change",() => {
    selectedFiles = fileInput.files;
    uploadFile();                       
})

function copyText(){
    navigator.clipboard.writeText(fileUrlInput.value);
    // copyBtn.className = "fa-solid fa-check";
    copyBtn.classList.remove("fa-copy");
    copyBtn.classList.remove("fa-regular");
    copyBtn.classList.add("fa-solid");
    copyBtn.classList.add("fa-check");

    setTimeout(() => {
        copyBtn.classList.add("fa-copy");
        copyBtn.classList.add("fa-regular");
        copyBtn.classList.remove("fa-solid");
        copyBtn.classList.remove("fa-check");
    }, 1500);
    showTost("copied to clipboard")
}

const uploadFile = () => {
    sharingContainer.style.display = "none";
    progressContainer.style.display = "none";
    fileUrlInput.value = "";
    if(selectedFiles.length > 1){
        fileInput.value = "";
        showTost("Upload only 1 file");
        return;
    }
    if(selectedFiles[0].size > maxAllowedSize){
        showTost("Can't upload more than 100MB");
        fileInput.value = "";
        return;
    }
    progressContainer.style.display = "block";
    let formData = new FormData();
    formData.append("myfile",selectedFiles[0]);
 
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
            try{
                const data = JSON.parse(xhr.response);
                showLink(data);
            }catch(err){
                showTost("Upload failed");
            }
        }
    }
    
    xhr.upload.onprogress = updateProgress;

    xhr.upload.onerror = () => {
        fileInput.value = "";
        showTost(`Error in upload : ${xhr.statusText}`);
    }
    xhr.open("POST", uploadURL);
    xhr.send(formData);
}
const updateProgress = (e) => {
    const percent = Math.round((e.loaded/e.total)*100);
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent / 100})`;
}

const showLink = ({file : url}) => {
    console.log(url); 
    fileInput.value = "";
    emailForm.querySelector("button").removeAttribute("disabled");
    progressContainer.style.display = "none";
    sharingContainer.style.display = "block";

    fileUrlInput.value = url;
}

emailForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    console.log("submit form");
    const url = fileUrlInput.value;
    const emailTo = emailForm.elements["to-email"].value;
    const emailFrom = emailForm.elements["from-email"].value;

    const isTextShare = activeShareType === "text";
    const formData = isTextShare
        ? {
            code: latestTextCode,
            emailTo,
            emailFrom
        }
        : {
            uuid : url.split("/").splice(-1,1)[0],
            emailTo,
            emailFrom
        };

    if (isTextShare && !latestTextCode) {
        showTost("Generate text code first");
        return;
    }
    emailForm[2].setAttribute("disabled" , "true");
    console.table(formData);

    fetch(isTextShare ? textEmailURL : emailURL, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(res => { if (!res.ok) throw new Error("Failed");
    return res.json();
    }).then(({success}) => {
        if(success){
            sharingContainer.style.display="none";
            showTost("Email Sent");
        }
        // console.log(data);
    })
})
let toastTimer;
const showTost = (msg) => {
    toast.innerText = msg;
    toast.style.transform = "translateY(0)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.transform = "translateY(70px)";
    },2000);
};

// New feature1 added

share_file.addEventListener("click", () => {
    activeShareType = "file";
    dropZoneContainer.classList.remove("hidden");
    textAreaContainer.classList.add("hidden");


    link_section.classList.remove("hidden");
    code_processor.classList.add("hidden");

    share_file.style.background = "#2563eb";
    share_text.style.background = "#79839a";
})
share_text.addEventListener("click" ,() => {
    activeShareType = "text";
    textAreaContainer.classList.remove("hidden");
    dropZoneContainer.classList.add("hidden");

    code_processor.classList.remove("hidden");
    link_section.classList.add("hidden");

    share_text.style.background = "#2563eb";
    share_file.style.background = "#79839a";
})

generate.addEventListener("click" , async () => {
    const text = textArea.value.trim();

    if(!text){
        showTost("Please enter some text");
        return;
    }

    try{
        generate.disabled = true;
        generate.innerText = "Generating...";

        const response = await fetch(`${host}/api/text` , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ text })
        });

        if(!response.ok){
            throw new Error("Failed");
        }
        const data = await response.json();
        showgeneratedData(data);
    }catch(err){
        console.log("Failed to generate");
        showTost("failed to generate");
    }finally{
        generate.disabled = false;
        generate.innerText = "Generate code";
    }
})

const showgeneratedData = (data) => {
    latestTextCode = data.code;
    code.innerHTML = data.code;
    fileUrlInput.value = `${host}/api/text/${data.code}`;
    sharingContainer.style.display = "block";
    emailForm.querySelector("button").removeAttribute("disabled");

    qrImage.src = data.qrCode;
}

show_text.addEventListener("click" , async () => {

    const enteredCode = input_code.value.trim();

    if(!enteredCode){
        showTost("Enter the code");
        return;
    }
    try{
        const resopnse = await fetch(`${host}/api/text/${enteredCode}`);
        if(!resopnse.ok){
            throw new Error("Invalid code");
        }

        const data = await  resopnse.json();
        textArea.value = data.text;
    }catch(err){
        showTost("Text not found");
    }
})