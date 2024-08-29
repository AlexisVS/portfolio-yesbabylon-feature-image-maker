window.addEventListener('DOMContentLoaded', function () {


    function handleFileSelect(event, imgId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(imgId).src = e.target.result;
                document.getElementById(imgId).style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    // Gestionnaires d'événements pour les inputs de fichiers
    document.getElementById('upload-pc').addEventListener('change', function (event) {
        handleFileSelect(event, 'pc-image');
    });
    document.getElementById('upload-tablet').addEventListener('change', function (event) {
        handleFileSelect(event, 'tablet-image');
    });
    document.getElementById('upload-phone').addEventListener('change', function (event) {
        handleFileSelect(event, 'phone-image');
    });

    // Fonction pour capturer l'image de l'écran
    document.getElementById('capture').addEventListener('click', () => {

        document.getElementById('modal').style.display = 'none';

        let exportedFilename = prompt('Nom du project', 'project');
        exportedFilename = exportedFilename + '_feature_image.png';

        html2canvas(document.getElementById('container'), {useCORS: true, backgroundColor: null}).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');

            // Créer un lien de téléchargement pour l'image
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = exportedFilename;
            link.click();
        }).catch(err => {
            console.error('Erreur lors de la capture :', err);
        });
    });
});
