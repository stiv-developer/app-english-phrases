document.addEventListener('DOMContentLoaded', function () {
    const accordion = document.getElementById('accordionPanelsStayOpenExample');

    // Verificar si hay un idioma guardado en localStorage (por defecto será español)
    let selectedLanguage = localStorage.getItem('selectedLanguage') || 'translation_spanish';

    // Función para actualizar el contenido en el idioma seleccionado
    function updateContent(jsonData, language) {
        accordion.innerHTML = ''; // Limpiar contenido previo
        jsonData['title-phrases'].forEach((item, index) => {
            const itemId = `panelsStayOpen-collapse${index}`;

            let accordionItemHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse"
                            data-bs-target="#${itemId}" aria-expanded="false" aria-controls="${itemId}">
                            ${item.phrases} (${item['phrases-translation']})
                        </button>
                    </h2>
                    <div id="${itemId}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
                        <div class="accordion-body">
                            <!-- Phrases will be injected here -->
                        </div>
                    </div>
                </div>
            `;

            // Agregar el item del acordeón
            accordion.innerHTML += accordionItemHTML;
            const bodyContainer = document.querySelector(`#${itemId} .accordion-body`);

            // Si existe 'type', recorrer sus elementos
            if (item.type) {
                item.type.forEach(typeItem => {
                    const typeContainer = document.createElement('div');
                    if (typeItem['color-card']) {
                        typeContainer.classList.add(typeItem['color-card']);
                    }
                    typeContainer.classList.add('group-type', typeItem['name-type'].toLowerCase().replace(/\s+/g, '-'));

                    const nameTypeTranslation = typeItem['name-type-translation'] ? `<span class="fs-6 text-success"> (${typeItem['name-type-translation']})</span>` : '';
                    const typeHeaderHTML = `<h5>${typeItem['name-type']}${nameTypeTranslation}</h5>`;
                    typeContainer.innerHTML += typeHeaderHTML;

                    typeItem.phrases.forEach(phraseItem => {
                        const phraseHTML = `
                            <div class="group-phrase">
                                <div class="phrase">
                                    <i class="bi bi-circle-fill"></i>
                                    <p class="p-phrase fw-semibold">${phraseItem.phrase}</p>
                                </div>
                                <p class="p-phrase-translate text-secondary-emphasis">${phraseItem[language]}</p>
                            </div>
                        `;
                        typeContainer.innerHTML += phraseHTML;
                    });

                    bodyContainer.appendChild(typeContainer);
                });
            }
        });
    }

    // Fetch del archivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            // Actualizar el contenido con el idioma seleccionado
            updateContent(jsonData, selectedLanguage);

            // Event listener para cambios de idioma desde la página de configuración
            window.addEventListener('storage', (event) => {
                if (event.key === 'selectedLanguage') {
                    selectedLanguage = event.newValue;
                    updateContent(jsonData, selectedLanguage);
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // MENU BAR 
    $(document).ready(function(){
        $('.toggle').click(function(){
            $('.menu').toggleClass('active');
        });
    });
});

// En setting.html
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el valor del idioma seleccionado desde localStorage
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    // Obtener el elemento del select
    const languageSelect = document.getElementById('language-select');

    // Si ya hay un idioma seleccionado, establecerlo como el valor seleccionado del select
    if (selectedLanguage) {
        if (selectedLanguage === 'translation_spanish') {
            languageSelect.value = 'spanish';
        } else if (selectedLanguage === 'translation_portuguese') {
            languageSelect.value = 'portuguese';
        }
    }

    // Escuchar el evento de cambio en el select para guardar el idioma seleccionado en localStorage
    languageSelect.addEventListener('change', function () {
        const selectedOption = this.value;
        const languageKey = selectedOption === 'spanish' ? 'translation_spanish' : 'translation_portuguese';
        localStorage.setItem('selectedLanguage', languageKey);

        // Disparar evento 'storage' para actualizar otras páginas que estén usando el idioma seleccionado
        window.dispatchEvent(new Event('storage'));
    });
});
