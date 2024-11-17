declare global {
    interface SpeechRecognitionEvent {
      results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionResultList {
      length: number;
      item(index: number): SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
      isFinal: boolean;
      length: number;
      item(index: number): SpeechRecognitionAlternative;
    }

    interface SpeechRecognitionAlternative {
      transcript: string;
      confidence: number;
    }

    var SpeechRecognition: typeof window.SpeechRecognition;
    var webkitSpeechRecognition: typeof window.webkitSpeechRecognition;
  }

  export {};
