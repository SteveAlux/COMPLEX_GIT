let apiKey = '0hIZ1T0pIEhTQX85CTWoYgMaLy6OIEmUalUi7smm';
let url ='https://developer.nps.gov/api/v1/parks';







function formatParams(param){
    const list = Object.keys(param).map(key =>  `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
    return list.join('&');
}


function getData(search, limit){
    const param= {
        api_key : apiKey,
        q : search ,
        limit
    };

    const queryString = formatParams(param);
    const urldone = url + '?'+queryString;
    console.log(urldone);

    fetch (urldone)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err =>{
        alert('something is wrong');
    });
}

function displayResults(responseJson){
    $('#results-list').empty();
    console.log(responseJson.data);
    for (let i = 0;i< responseJson.data.length; i++){
       
        $('#results-list').append(`
            <li id='item'><h4>NAME: ${responseJson.data[i].fullName}</h5>
            <h5>Description:</h6>
            <p>${responseJson.data[i].description}</p>
            <br>
            <p>Park's site : <a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
            <p>Park's Direction : <a href=${responseJson.data[i].directionsUrl}>${responseJson.data[i].directionsUrl}</a></p>

        `)
    }
    $('#results').removeClass('hidden');
}

function handleSub(){
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const limit = 9;
        getData(searchTerm,limit);
    });
}






function loadscript(){
    handleSub();
}

$(loadscript);