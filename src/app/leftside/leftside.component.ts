import { Component, inject } from '@angular/core';
import { GeniminewService } from '../../Services/Gemininew.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-leftside',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule,],
  templateUrl: './leftside.component.html',
  styleUrl: './leftside.component.scss'
})
export class LeftsideComponent {
  prompt: string = '';

  geminiService: GeniminewService = inject(GeniminewService);

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
