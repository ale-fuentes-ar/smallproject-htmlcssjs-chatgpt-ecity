// GLOBAL VARS WHERE HAS CONFIGURATION
const URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '<HERE-YOU-USE-YOUR-OPEN-AI-TOKEN>';
const PROMPT = 'Please, indicate 3 point touristic of [CITY], listing each point in json format with next structure: [{"name": "name of option", "location": "location of option", "description": "description of option" }] only response to JSON. Is high priority response only the json without saying anything before or giving clarifications';

// this function to start of project
hideLoading();


function showLoading() {
    document.getElementById("divloading").classList.remove('dohidden');
}
function hideLoading() {
    document.getElementById("divloading").classList.add('dohidden');
}

async function clickSearchSugestion() {
    showLoading();
    const myrequest = document.getElementById('txtrequest').value;
    let response = await consultingChatGpt(myrequest);

    hideLoading();

    let myresponse = document.getElementById('txtresponse');
    myresponse.innerHTML = `<ul>${makeValues(JSON.parse( response.choices[0].message.content))}</ul>`;
}

// function that create the layout to response
function makeValues(response){
    
    let layout = '';
    response.forEach(function (item) {
        console.log(item.name);
        layout += `<li><div><span>${item.name}</span><span>${item.description}</span><span>${item.location}</span></div></li>`;
    })

    return layout;
}

// core that use ChatGPT for get our answer
async function consultingChatGpt(myrequest) {

    // create my body request
    const bodyrequest = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: PROMPT.replace('[CITY]', myrequest) }
        ]
    }

    // create my config for request
    const myconfigrequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(bodyrequest)
    }

    return (await fetch(URL, myconfigrequest)).json();

}