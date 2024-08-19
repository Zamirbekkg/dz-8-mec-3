let page = 1
async function getCharacters (){
    const container = document.querySelector('.container_characters') 
    const res= await fetch('https://rickandmortyapi.com/api/character?page='+page)
    const data =await res.json()
    console.log(data);
    
    data.results.forEach((item)=>{
        container.innerHTML+=`
        <div id="man" class="character_block">
            <img src="${item.image}">
            <div>
                <h2>${item.name}</h2>
                <h2 class="status">Status:${item.status}</h2>
                <h2 class="status">Species:${item.species}</h2>
                <h2 class="status">Gender:${item.gender}</h2>
            </div>
        </div>
        `
    });
}

getCharacters()

function nextPage(){
    page+=1
    document.querySelector('.container_characters').innerHTML = ''
    document.getElementById('currentPage').innerText = page
    getCharacters()
}
function prevPage(){
    page-=1
    document.querySelector('.container_characters').innerHTML = ''
    document.getElementById('currentPage').innerText = page
    getCharacters()
}




document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search');
    const result = document.getElementById('result');

    search.addEventListener('input', () => {
        const query = search.value.trim();
        if (query.length === 0) {
            resultsList.innerHTML = '';
            return;
        }

        fetch(`https://rickandmortyapi.com/api/character?page=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Ошибка при запросе данных:', error);
                resultsList.innerHTML = '<li>Ошибка при запросе данных</li>';
            });
    });

    function displayResults(data) {
        result.innerHTML = '';
        if (data && Array.isArray(data.result) && data.result.length > 0) {
            data.result.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name; // Предполагается, что имя содержится в поле 'name'
                resultsList.appendChild(li);
            });
        } else {
            resultsList.innerHTML = '<li>Нет результатов</li>';
        }
    }
});

