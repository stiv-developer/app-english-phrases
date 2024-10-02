document.addEventListener('DOMContentLoaded', function () {
    const accordion = document.getElementById('accordionPanelsStayOpenExample');
    const languageSelect = document.getElementById('language-select');
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'spanish'; // Usar 'spanish' o 'portuguese'

    // Aplicar idioma guardado al cargar la página
    if (selectedLanguage === 'portuguese') {
        languageSelect.value = 'portuguese';
    } else {
        languageSelect.value = 'spanish';
    }

    // Función para aplicar las traducciones
    function applyTranslations(language) {
        fetch('data.json')
            .then(response => response.json())
            .then(jsonData => {
                // Limpiar el contenido existente
                accordion.innerHTML = '';

                jsonData['title-phrases'].forEach((item, index) => {
                    const itemId = `panelsStayOpen-collapse${index}`;

                    // Obtener la traducción del título según el idioma seleccionado
                    const translatedTitle = language === 'spanish' ? item.phrases_translation_spanish : item.phrases_translation_portuguese;

                    let accordionItemHTML = `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse"
                                data-bs-target="#${itemId}" aria-expanded="false" aria-controls="${itemId}">
                                ${item.phrases} (${translatedTitle})
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill accordion-icon" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </button>
                        </h2>
                        <div id="${itemId}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
                            <div class="accordion-body"></div>
                        </div>
                    </div>
                `;

                    accordion.innerHTML += accordionItemHTML;
                    const bodyContainer = document.querySelector(`#${itemId} .accordion-body`);

                    if (item.type) {
                        item.type.forEach(typeItem => {
                            const typeContainer = document.createElement('div');
                            typeContainer.classList.add('group-type', typeItem['name-type'].toLowerCase().replace(/\s+/g, '-'));

                            // Obtener la traducción del nombre del tipo según el idioma seleccionado
                            const nameTypeTranslation = language === 'spanish' ? typeItem.phrases_translation_spanish : typeItem.name_type_translation_portuguese;
                            const typeHeaderHTML = `<h5>${typeItem['name-type']} <span class="fs-6 text-success">(${nameTypeTranslation})</span></h5>`;

                            typeContainer.innerHTML += typeHeaderHTML;

                            typeItem.phrases.forEach(phraseItem => {
                                const phraseHTML = `
                                <div class="group-phrase">
                                    <div class="phrase">
                                        <i class="bi bi-circle-fill"></i>
                                        <p class="p-phrase fw-semibold">${phraseItem.phrase}</p>
                                    </div>
                                    <p class="p-phrase-translate text-secondary-emphasis">${language === 'spanish' ? phraseItem.translation_spanish : phraseItem.translation_portuguese}</p>
                                </div>
                            `;
                                typeContainer.innerHTML += phraseHTML;
                            });

                            bodyContainer.appendChild(typeContainer);
                        });
                    }
                });
            })
            .catch(error => console.error('Error loading JSON data:', error));
    }

    // Aplicar las traducciones al cargar la página
    applyTranslations(selectedLanguage);

    // Escuchar cambios en el select de idioma
    languageSelect.addEventListener('change', function () {
        const selectedOption = this.value;
        localStorage.setItem('selectedLanguage', selectedOption);
        applyTranslations(selectedOption);  // Aplicar traducción inmediatamente
    });

    // Si se detecta un cambio en localStorage en otras pestañas
    window.addEventListener('storage', function () {
        const newLanguage = localStorage.getItem('selectedLanguage');
        applyTranslations(newLanguage);
    });
});



// FUNCION MODE DARK
document.addEventListener('DOMContentLoaded', function () {

    // Obtener el elemento del select
    const themeSelect = document.getElementById('theme-select');

    // Obtener el tema almacenado en localStorage si existe
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        document.body.classList.toggle('light-mode', savedTheme === 'light');
        themeSelect.value = savedTheme;
    }

    // Cambiar el tema según el valor del select
    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value;
        if (selectedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark'); // Almacenar tema en localStorage
        } else if (selectedTheme === 'light') {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});

// MENU BAR 
$(document).ready(function () {
    $('.toggle').click(function () {
        $('.menu').toggleClass('active');
    });
});