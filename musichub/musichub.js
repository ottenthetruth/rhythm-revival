function uploadPDF() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const pdfData = event.target.result; // The data URL
            const pdfName = file.name; // The file name
            let prevFiles = [];
            const prevFilesString = localStorage.getItem("myfiles");

            if (prevFilesString) {
                prevFiles = JSON.parse(prevFilesString);
            }

            // Check if the file name already exists in the stored filenames
            const existingFileIndex = prevFiles.findIndex(entry => entry.name === pdfName);

            if (existingFileIndex !== -1) {
                // If the file already exists, update its data
                prevFiles[existingFileIndex].data = pdfData;
            } else {
                // If it's a new file, add it to the array
                prevFiles.push({ name: pdfName, data: pdfData });
            }

            // Store the updated files array in localStorage
            localStorage.setItem("myfiles", JSON.stringify(prevFiles));
        };
        reader.readAsDataURL(file);
    }
}

function showPDF() {
  // Get the stringified array from localStorage
  const storedFiles = localStorage.getItem('myfiles');

  if (storedFiles) {
    // Parse the stringified array back to a JavaScript array
    const filesArray = JSON.parse(storedFiles);

    // Assuming the first file in the array is a PDF
    const firstPDF = filesArray[0];

    // Create an embed element to display the PDF
    const embedPDF = document.createElement('embed');
    embedPDF.src = firstPDF; // Set the URL of the PDF
    embedPDF.type = 'application/pdf'; // Set the type of content

    // Set attributes for width and height if needed
    embedPDF.width = '100%';
    embedPDF.height = '500px'; // Set the height of the embedded PDF
    const myParent = document.getElementById("tabviewer");
    // Append the embed element to the body or any other HTML element
    myParent.appendChild(embedPDF);
  } else {
    console.log('No files found in localStorage');
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
          <button onclick="showPDF()">Show PDF</button>
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


