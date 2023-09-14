    // Initialize a SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance();

      // Function to set the voice with the specified language and variant
      function setSpanishUSVoice() {
        const voices = window.speechSynthesis.getVoices();
        for (const voice of voices) {
          if (voice.lang === "es-US") {
            speech.voice = voice;
            break;
          }
        }
      }
  
    // Set Speech Language
    speech.lang = "es-US"; // Change to your desired language

    // Function to speak the text
    function speakText(text) {
      speech.text = text;
      window.speechSynthesis.speak(speech);
    }

    // Get all the buttons with the "speakButton" class
    const speakButtons = document.querySelectorAll(".speakButton");

    // Add a click event listener to each button
    speakButtons.forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const textToSpeak = card.querySelector(".card-text").textContent;
        speakText(textToSpeak);
      });
    });