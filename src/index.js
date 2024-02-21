console.log('%c HI', 'color: firebrick');

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const breedList = document.getElementById('dog-breeds');
    let allBreeds = [];

    function fetchImages() {
        fetch(imgUrl)
            .then(res => res.json())
            .then(data => {
                const images = data.message;
                const container = document.getElementById('dog-image-container');
                images.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    container.appendChild(img);
                });
            })
    };

    function fetchBreeds() {
        fetch(breedUrl)
            .then(res => res.json())
            .then(data => {
                allBreeds = Object.keys(data.message); 
                allBreeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    breedList.appendChild(li);
                });
            })
    };

    function filterBreedsByLetter(letter) {
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));
        breedList.innerHTML = '';

        filteredBreeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            breedList.appendChild(li);
        });
    };

    function handleBreedClick(e) {
        e.target.style.color = 'red';
    };

    function handleDropdownChange(e) {
        const letter = e.target.value;
        filterBreedsByLetter(letter);
    };

    fetchImages();
    fetchBreeds();

    breedList.addEventListener('click', handleBreedClick);
    document.getElementById('breed-dropdown').addEventListener('change', handleDropdownChange);
});
