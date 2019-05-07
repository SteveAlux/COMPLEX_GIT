let apiKey = '0hIZ1T0pIEhTQX85CTWoYgMaLy6OIEmUalUi7smm';
let url ='https://developer.nps.gov/api/v1/parks';







function formatParams(param){
    const list = Object.keys(param).map(key =>  `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
    return list.join('&');
}


function getData(limit, state){
    const param= {
        api_key : apiKey,
        limit,
        stateCode: state
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
            <p>STATE: ${responseJson.data[i].states}</p>

        `)
    }
    $('#results').removeClass('hidden');
}

function handleSub(){
    $('#js-form').submit(event => {
        event.preventDefault();
        const newSearch = $('#js-search-term').val().replace(/\s/g,'')
        console.log(newSearch);
        // for (let i = 0 ; i<50 ; i++){
            
        //     if (searchTerm === stateCodes[i]  && i<50){

        //     }
        //     else if (searchTerm !== stateCodes[i] && i>50){

        //     }
        // }
        const limit = 9;
        getData(limit, newSearch);
    });
}






function loadscript(){
    handleSub();
}

$(loadscript);
