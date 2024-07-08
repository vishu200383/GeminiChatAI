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
    return text.replaceAll('*', '');
  }
}
