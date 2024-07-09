import { Component, inject } from '@angular/core';
import { GeniminewService } from '../../Services/Gemininew.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rightside',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.scss']
})
export class RightsideComponent {
  prompt: string = '';
  loading: boolean = false;
  chatHistory: any[] = [];

  geminiService: GeniminewService = inject(GeniminewService);

  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.chatHistory.push(res);
      }
    });
  }

  async sendData() {
    if (this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      try {
        await this.geminiService.generateText(data);
      } catch (error) {
        console.error('Error sending data:', error);
      }
      this.loading = false;
    }
  }

  formatText(text: string): string {
    // Replace asterisks with spaces
    let result = text.replaceAll('*', ' ');
  
    const titleTagRegex = /Title Tag:\s*(.*?)(?=\n|$)/;
    const metaDescriptionRegex = /Meta Description:\s*(.*?)(?=\n|$)/;
    const keyWordsRegex = /Key Words:\s*(.*?)(?=\n|$)/;
  
    const titleTagMatch = result.match(titleTagRegex);
    const metaDescriptionMatch = result.match(metaDescriptionRegex);
    const keyWordsMatch = result.match(keyWordsRegex);
  
    const titleTag = titleTagMatch ? `<strong>Title Tag:</strong> ${titleTagMatch[1]}` : '';
    const metaDescription = metaDescriptionMatch ? `<strong>Meta Description:</strong> ${metaDescriptionMatch[1]}` : '';
    const keyWords = keyWordsMatch ? `<strong>Key Words:</strong> ${keyWordsMatch[1]}` : '';
  
    return `${titleTag}<br>${metaDescription}<br>${keyWords}`;
  }
  
}
