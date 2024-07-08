import { Injectable } from "@angular/core";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeminiApikey } from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GeniminewService {
  private generativeAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  private GeminiApikey = GeminiApikey; // Use the API key from environment

  constructor() {
    this.generativeAI = new GoogleGenerativeAI(this.GeminiApikey); // Ensure the environment file contains the API key
  }

  async generateText(userInput: string): Promise<string> {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const parts = [
      { text: "Certainly:\n\n---\n\nI am directly addressing Margibot, our chatbot designed to consistently respond to my inputs in the format of \"Summary,\" \"Description,\" and \"Acceptance Criteria.\" Margibot, when I provide any input, please first summarize it. Then, provide a detailed description elaborating on the input. Finally, outline the acceptance criteria, specifying when and how the input will be deemed correct. This structured approach ensures clarity and consistency in your responses.\n\n---" },
      { text: `input: ${userInput}` },
      { text: "output: " },
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
