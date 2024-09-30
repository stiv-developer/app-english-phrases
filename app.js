document.addEventListener('DOMContentLoaded', function () {
    const accordion = document.getElementById('accordionPanelsStayOpenExample');

    // Fetch the external JSON file (data.json)
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            // Access the title-phrases
            jsonData['title-phrases'].forEach((item, index) => {
                // Create an accordion item for each category
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

                // Add the accordion item to the main accordion
                accordion.innerHTML += accordionItemHTML;
                const bodyContainer = document.querySelector(`#${itemId} .accordion-body`);

                // Check if the 'type' field exists (to handle categories without phrases)
                if (item.type) {
                    // Loop through each type dynamically
                    item.type.forEach(typeItem => {
                        // Create a wrapper for each type dynamically
                        const typeContainer = document.createElement('div');
                        
                        // Check if the 'color-card' exists, and apply the class if true
                        if (typeItem['color-card']) {
                            typeContainer.classList.add(typeItem['color-card']);
                        }
                        typeContainer.classList.add('group-type', typeItem['name-type'].toLowerCase().replace(/\s+/g, '-')); // Example: convert 'Muy Informal' -> 'muy-informal'

                        // Create the type header dynamically
                        const nameTypeTranslation = typeItem['name-type-translation'] ? `<span class="fs-6 text-success"> (${typeItem['name-type-translation']})</span>` : '';
                        const typeHeaderHTML = `<h5>${typeItem['name-type']}${nameTypeTranslation}</h5>`;

                        // Insert the header into the type container
                        typeContainer.innerHTML += typeHeaderHTML;

                        // Loop through each phrase and append it to the type container
                        typeItem.phrases.forEach(phraseItem => {
                            const phraseHTML = `
                                <div class="group-phrase">
                                    <div class="phrase">
                                        <i class="bi bi-circle-fill"></i>
                                        <p class="p-phrase fw-semibold">${phraseItem.phrase}</p>
                                    </div>
                                    <p class="p-phrase-translate text-secondary-emphasis">${phraseItem.translation}</p>
                                </div>
                            `;
                            typeContainer.innerHTML += phraseHTML;
                        });

                        // Append the dynamically created typeContainer to the bodyContainer
                        bodyContainer.appendChild(typeContainer);
                    });
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
