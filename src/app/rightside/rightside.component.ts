import { Component, inject } from '@angular/core';
import { GenimiService } from '../../Services/gemini.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rightside',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './rightside.component.html',
  styleUrl: './rightside.component.scss'
})
export class RightsideComponent {
  prompt: string = '';

  geminiService: GenimiService = inject(GenimiService);

  loading: boolean = false;

  chatHistory: any[] = [];
  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }
}
