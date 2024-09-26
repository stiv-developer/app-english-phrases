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
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#${itemId}" aria-expanded="true" aria-controls="${itemId}">
                                ${item.phrases}
                            </button>
                        </h2>
                        <div id="${itemId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}">
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
                    // Loop through 'formal' and 'informal'
                    item.type.forEach(typeItem => {
                        const typeHTML = `<h4>${typeItem['name-type']}</h4>`;
                        bodyContainer.innerHTML += typeHTML;

                        // Loop through each phrase and append it to the container
                        typeItem.phrases.forEach(phraseItem => {
                            const phraseHTML = `
                                <div class="group-phrase">
                                    <div class="phrase">
                                        <i class="bi bi-circle-fill"></i>
                                        <p class="p-phrase fw-semibold">${phraseItem.phrase}</p>
                                    </div>
                                    <p class="p-phrase-translate fw-lighter">${phraseItem.translation}</p>
                                </div>
                            `;
                            bodyContainer.innerHTML += phraseHTML;
                        });
                    });
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
