const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.volume=1;
    text_speak.pitch=1;

    window.speechSynthesis.speak(text_speak);
}


function wishme(){
    var day = new Date();
    var hours = day.getHours();
    if(hours>=0 && hours<=12){
        speak("Good morning Master")
    }
    else if(hours>=12 && hours<=17){
        speak("Good Afternoon Master")
    }else{
        speak("Good evening Master")
    }
    
}

window.addEventListener('load',()=>{
    speak("Initializing Jarvo...");
    wishme();
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Master How May i Help you ")
    }
    if(message.includes("open google")){
        window.open("https://google.com","_blank");
        speak("Opening Google for u Master");
    }
    if(message.includes("open facebook")){
        window.open("https://facebook.com","_blank");
        speak("Opening Facebook for u Master");
    }
    if(message.includes("open youtube")){
        window.open("https://youtube.com","_blank");
        speak("Opening Youtube for u Master");
    }
    else if(message.includes('what is ') || message.includes('who is ') || message.includes('what are') || message.includes('when')){
        window.open(`https://www.google.com/search?q=${message.replace(" ","+")}`,"_blank")
        const finalText = "This is what i found on the Internet regarding " + message;
        speak(finalText);
    }
    else if(message.includes('wikipedia ') ){
        window.open(`https://www.google.com/search?q=${message.replace("wikipedia","+")}`,"_blank")
        const finalText = "This is what i found on the Wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }
    else if(message.includes('date')){
        const date = new Date().toLocaleString(undefined , {month:"short" , day:"numeric"});
        const finalText = date;
        speak(finalText);
    }
    else if(message.includes('calculator')){
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if(message.includes('open Whatapp')){
        window.open('WhatsApp:///');
        const finalText = "Opening Whatsapp";
            speak(finalText);
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
    
    
}




