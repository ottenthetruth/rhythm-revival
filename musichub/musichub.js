function uploadPDF() {
    const fileInput = document.getElementById('fileinput');
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
