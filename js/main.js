const synth = window.speechSynthesis

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchvalue = document.querySelector('#pitch-value')
const body = document.querySelector('body')

let voices = []

const getVoices = () => {
    voices = synth.getVoices();
    
    voices.forEach(voice => {
        const option = document.createElement('option')

        option.textContent = voice.name + '('+ voice.lang + ')'

        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        console.log(option)

        voiceSelect.appendChild(option)

    })
}

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}

// function showAlert(message, className){
//     const div = document.createElement('div')
//     // div.className = `alert alert-${className}  alert-dismissible`
//     div.innerHTML= '<div class="alert alert-' + className + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    
//     // div.appendChild(document.createTextNode(message))
//     const container = document.querySelector('#div1')
//     const form = document.querySelector('#text-input')
//     container.insertBefore(div, form)

//     setTimeout(() => document.querySelector('.alert').remove(), 3000)
// }


const speak = () => {

    body.style.background = '#141414 url(img/wave.gif)'
    body.style.backgroundRepeat = 'repeat-x'
    body.style.backgroundSize = '100% 100%'

    console.log(textInput.value)
    if(synth.speaking) {
        console.error('Already Speaking...')
        // showAlert('Already Speaking', 'danger')
        return
    }
    if(textInput.value !== '')
    {
        
        const speakTest = new SpeechSynthesisUtterance(textInput.value)

        speakTest.onend = e =>{
            console.log('done speaking')
            console.log(textInput.value)
            body.style.background = '#141414'

        }

        speakTest.onerror = e => {
            console.log('Something went wrong')
        }

        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name')

        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakTest.voice = voice
            }
        })

        speakTest.rate = rate.value
        speakTest.pitch = pitch.value

        synth.speak(speakTest)

        

    }

    
    // else if(textInput.value === null){
    //     showAlert('Please type some text as input', 'danger')

    //     console.error('No text as input')
    // }
}

textForm.addEventListener('submit', e=> {
    e.preventDefault()
    
    speak()
    textInput.blur()
    
})

rate.addEventListener('change', e=> rateValue.textContent = rate.value)

pitch.addEventListener('change', e=> pitchvalue.textContent = pitch.value)

voiceSelect.addEventListener('change', e=> speak())