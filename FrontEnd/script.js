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
const toast = document.querySelector(".toast");


const emailForm = document.querySelector("#emailForm");

const host = "https://inshare.herokuapp.com/";
const uploadURL = `${host}api/files`;
const emailURL = `${host}api/files/send`;
const maxAllowedSize = 100 * 1024 * 1024; //100 mb

let selectedFiles = [];
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
        copyBtn.classList.add(" fa-regular");
        copyBtn.classList.remove("fa-solid");
        copyBtn.classList.remove("fa-check");
    }, 1500);
    showTost("copied to clipboard")
}

const uploadFile = () => {
    if(selectedFiles.length > 1){
        fileInput.value = "";
        showTost("Upload only 1 file");
        return;
    }
    if(selectedFiles[0].length > maxAllowedSize){
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
            showLink(JSON.parse(xhr.response));
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
    progressBar.style.trasform = `scaleX(${percent / 100})`;
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
    const formData = {
        uuid : url.split("/").splice(-1,1)[0],
        emailTo: emailForm.elements["to-email"].value,
        emailFrom: emailForm.elements["from-email"].value
    }
    emailForm[2].setAttribute("disabled" , "true");
    console.table(formData);

    fetch(emailURL, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(({success}) => {
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