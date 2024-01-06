function uploadPDF() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const pdfData = event.target.result;
            const fileName = file.name;

            const currentPDFCount = localStorage.getItem("currentPDFCount");
            if(currentPDFCount) {} else { localStorage.setItem('currentPDFCount', 1);
                                          currentPDFCount = 1; }
            localStorage.setItem(`myFile${currentPDFCount}`, pdfData);
            localStorage.setItem('currentPDFCount', currentPDFCount + 1);
            displayUserFiles();
        };
        reader.readAsDataURL(file);
    }
}

function displayUserFiles() {
  const fileCount = localStorage.getItem("currentPDFCount");
  const filesContainer = document.getElementById("mytabs");
  filesContainer.innerHTML = '';
  for (let i = 0; i < fileCount; i++) {
    const currentFile = localStorage.getItem(`myFile${i}`);
    displayPDF(currentFile);
  }
}

function displayPDF(pdfData) {
    const pdfList = document.getElementById('pdfList');
    const embed = document.createElement('embed');
    embed.setAttribute('src', pdfData);
    embed.setAttribute('type', 'application/pdf');
    embed.setAttribute('width', '100%');
    embed.setAttribute('height', '500px');
    pdfList.innerHTML = '';
    pdfList.appendChild(embed);
}
