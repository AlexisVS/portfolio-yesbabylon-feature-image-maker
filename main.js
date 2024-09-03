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
    const inputs = ['pc', 'tablet', 'phone', 'watermark'];
    inputs.forEach(input => {
        document.getElementById('upload-' + input).addEventListener('change', function (event) {
            handleFileSelect(event, input + '-image');
        });
    });

    // Add checkbox developpement border reaction
    document.getElementById('borderCheckbox').addEventListener('change', function (event) {
        const checkbox = event.target;
        const body = document.querySelector('body');

        if (checkbox.checked) {
            body.classList.add('dev');
        } else {
            body.classList.remove('dev');
        }
    });

    // Add checkbox tablet reaction
    // Default values are checked
    document.getElementById('tabletCheckbox').addEventListener('change', function (event) {
        const checkbox = event.target;
        const tabletLayer = document.getElementById('tablet-layer');
        const phoneLayer = document.getElementById('phone-layer');
        const tabletField = document.getElementById('tablet-field');

        if (checkbox.checked) {
            tabletLayer.style.display = 'block';
            phoneLayer.classList.remove('only-phone');
            tabletField.style.visibility = 'visible';
        } else {
            tabletLayer.style.display = 'none';
            tabletField.style.visibility = 'hidden';
            phoneLayer.classList.add('only-phone');
        }
    });

    // Add checkbox watermark reaction
    document.getElementById('watermarkCheckbox').addEventListener('change', function (event) {
        const checkbox = event.target;
        const watermarkLayer = document.getElementById('watermark-layer');
        const watermarkField = document.getElementById('watermark-field');

        if (checkbox.checked) {
            watermarkLayer.style.display = 'flex';
            watermarkField.style.visibility = 'visible';
        } else {
            watermarkLayer.style.display = 'none';
            watermarkField.style.visibility = 'hidden';
        }
    });

    // Fonction pour capturer l'image de l'écran
    document.getElementById('capture').addEventListener('click', () => {

        const modal = document.getElementById('modal');
        const canvas = document.getElementById('canvas');
        let exportedFilename = prompt('Nom du project', 'project');
        exportedFilename = exportedFilename + '_feature-image.png';

        modal.style.display = 'none';

        html2canvas(canvas, {useCORS: true, backgroundColor: null}).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');

            // Créer un lien de téléchargement pour l'image
            const link = document.createElement('a');

            link.href = dataURL;
            link.download = exportedFilename;
            link.click();
        }).catch(err => {
            console.error('Erreur lors de la capture :', err);
        });

        modal.style.display = 'flex';
    });
});
