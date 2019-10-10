console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const form_results_panel = document.querySelector('.weather-results-panel')
const form_results_icon = document.getElementById('weather-results-icon')
const form_results_title = document.querySelector('.weather-results-title')
const form_results = document.querySelector('.weather-results')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formattedCityName = search.value.replace(' ','+')

    fetch('/weather?location=' + formattedCityName).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                form_results_panel.classList.remove('hide')
                form_results_panel.classList.add('show')
                form_results_icon.classList.add('hide')
                form_results.classList.add('hide')

                form_results_title.textContent = data.error + '. Please try again.'
            }
            else {
                form_results_panel.classList.remove('hide')
                form_results_panel.classList.add('show')
                form_results_icon.classList.remove('hide')
                form_results.classList.remove('hide')

                form_results_icon.innerHTML = '<div id="weather-icon-sprites"></div><h3 class="weather-icon-summary">' + data.currently.summary + '</h3>'
                

                document.getElementById('weather-icon-sprites').classList.add(data.currently.icon)

                form_results_title.textContent = 'In ' + data.location
                form_results.textContent = 'It is currently ' + data.currently.temperature + ' degrees out, and today will be ' + data.daily.toLowerCase()
            }
        })
    })
})