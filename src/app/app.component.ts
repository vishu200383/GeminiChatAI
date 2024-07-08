import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeminiService } from '../Services/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RightsideComponent } from "./rightside/rightside.component";
import { LeftsideComponent } from "./leftside/leftside.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FormsModule, CommonModule, RightsideComponent, LeftsideComponent]
})
export class AppComponent {
  title = 'GeminiChatAI';
  
  // prompt: string = '';

  // geminiService: GeminiService = inject(GeminiService);

  // loading: boolean = false;

  // chatHistory: any[] = [];
  // constructor() {
  //   this.geminiService.getMessageHistory().subscribe((res) => {
  //     if(res) {
  //       this.chatHistory.push(res);
  //     }
  //   })
  // }

  // async sendData() {
  //   if(this.prompt && !this.loading) {
  //     this.loading = true;
  //     const data = this.prompt;
  //     this.prompt = '';
  //     await this.geminiService.generateText(data);
  //     this.loading = false;
  //   }
  // }

  // formatText(text: string) {
  //   const result = text.replaceAll('*', '');
  //   return result;
  // }

  
}
