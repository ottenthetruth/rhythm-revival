function uploadPDF() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const pdfData = JSON.stringify(event.target.result);
            const pdfName = JSON.stringify(file.name);
            let prevFiles = [];
            let prevFileNames = [];
            const prevFilesString = localStorage.getItem("myfiles");
            const prevFileNamesString = localStorage.getItem("myfilenames");
            if (prevFilesString && prevFileNamesString) {
                prevFiles = JSON.parse(prevFilesString);
                prevFileNames = JSON.parse(prevFileNamesString);
            }
            const existingFileIndex = prevFileNames.indexOf(pdfName);
            if (existingFileIndex !== -1) {
                prevFiles[existingFileIndex] = pdfData;
            } else {
                prevFiles.push(pdfData);
                prevFileNames.push(pdfName);
            }
            localStorage.setItem("myfiles", JSON.stringify(prevFiles));
            localStorage.setItem("myfilenames", JSON.stringify(prevFileNames));
        };
        reader.readAsDataURL(file);
    }
}

function displayPDF() {
  let myFileString = localStorage.getItem("myfiles");
  let myFileNamesString = localStorage.getItem("myfilenames");

  if (myFileString && myFileNamesString) {
    let myFiles = JSON.parse(myFileString);
    let myFileNames = JSON.parse(myFileNamesString);
    const myFileCount = myFiles.length;
    const myTabs = document.getElementById("mytabs");
    myTabs.innerHTML = '';

    for (let i = 0; i < myFileCount; i++) {
      const fileCard = document.createElement("div");
      fileCard.classList.add("tabcard");
      const nameParts = myFileNames[i].replace(/^"(.+(?="$))"$/, '$1').split(' - ');
      if (nameParts.length >= 2) {
        const songName = nameParts[0];
        const artistName = nameParts.slice(1).join(' - ').replace('.pdf', '');
        fileCard.innerHTML = `
          <h1>${songName}</h1>
          <h2>by ${artistName}</h2>
          <button onclick=`showPDF(${i})`>Show PDF</button>
        `;
        myTabs.appendChild(fileCard);
      } else {
        console.error(`File name "${myFileNames[i]}" doesn't match expected pattern`);
      }
    }
  } else {
    console.error("Values not found in localStorage");
  }
}

async function showPDF(myfile) {
const pdfString = localStorage.getItem('myfiles'); // Replace 'yourPDFKey' with your key
const myPDFFile = JSON.parse(pdfString);
myPDFFileIndex = myPDFFile[0];
// Creating a blob from the string data
const pdfBlob = new Blob([myPDFFileIndex], { type: 'application/pdf' });

// Creating a URL for the blob
const pdfUrl = URL.createObjectURL(pdfBlob);
const myParent = document.getElementById("tabviewer");
// Displaying the PDF using an <embed> or <iframe> tag
const embedElement = document.createElement('embed');
embedElement.src = pdfUrl;
embedElement.type = 'application/pdf';
embedElement.width = '100%';
embedElement.height = '600px'; // You can adjust the height as needed
myParent.appendChild(embedElement);
}
