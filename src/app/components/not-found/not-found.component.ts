import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="flex flex-col justify-center items-center h-screen w-full">
      <div class="text-center text-4xl text-red-500 font-semibold mb-6">  
        404 Page not found
      </div>
      <a routerLink="/dashboard/list" class="border-b border-blue-400 text-blue-400 text-xl font-medium">Go back to home</a>
    </div>
  `,
  styles: [
  ]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
