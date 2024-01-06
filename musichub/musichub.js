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
    displayPDF();
}

function displayPDF() {
  let myFileString = localStorage.getItem("myfiles");
  let myFileNamesString = localStorage.getItem("myfilenames");
  
  // Check if retrieved values are not null
  if (myFileString && myFileNamesString) {
    let myFiles = JSON.parse(myFileString);
    let myFileNames = JSON.parse(myFileNamesString);
    
    const myFileCount = myFiles.length;
    const myTabs = document.getElementById("mytabs"); // Make sure "mytabs" is the correct ID

    // Clear previous file cards from myTabs
    myTabs.innerHTML = '';

    for (let i = 0; i < myFileCount; i++) {
      const fileCard = document.createElement("div");
      fileCard.classList.add("tabcard");
      
      // Extract song name and artist name from the file name
      const [songName, artistName] = myFileNames[i].split(' - ');

      fileCard.innerHTML = `
        <h1>${songName}</h1>
        <h2>by ${artistName.replace('.pdf', '')}</h2>
      `;
      myTabs.appendChild(fileCard); // Append fileCard to myTabs
    }
  } else {
    // Handle the case when localStorage values are null or not set
    console.error("Values not found in localStorage");
    // You may want to implement a fallback or display a message to the user
  }
}
