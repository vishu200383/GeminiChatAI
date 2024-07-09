import { Injectable } from "@angular/core";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeoApiKey } from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GeniminewService {
  private generativeAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  private GeminiApikey = SeoApiKey; // Use the API key from environment

  constructor() {
    this.generativeAI = new GoogleGenerativeAI(this.GeminiApikey); // Ensure the environment file contains the API key
  }

  async generateText(userInput: string): Promise<string> {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const parts = [
      {text: "I am directly addressing to SeoChat,our chatbot is designed to consistently respond to my inputs in the format of \"Title Tag:\",\"Meta Description:\"and \"Key Words:\".Seo Chat,when i provide any input please first give it's \"Title Tag:\"then it's \"Meta Description:\" and then \"Key Words:\"."},
      {text: `input: ${userInput}`},
      {text: "output: "},
    ];

    this.messageHistory.next({ from: 'user', message: userInput });
    console.warn(userInput);

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: 'text/plain',
        },
      });

      const response = await result.response.text();
      console.warn(response);
      this.messageHistory.next({ from: 'bot', message: response });

      return response;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }

}
