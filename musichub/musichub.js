function uploadPDF() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          const pdfData = event.target.result;
          const fileName = file.name;
          localStorage.setItem("myTab", pdfData);
        };
        reader.readAsDataURL(file);
    }
}

function displayUserFiles() {
  const filesContainer = document.getElementById("mytabs");
  filesContainer.innerHTML = '';
    const currentFile = localStorage.getItem(`myTab`);
    displayPDF(currentFile);
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
