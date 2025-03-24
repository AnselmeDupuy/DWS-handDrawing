import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { FreehandDrawingComponent } from './app/app.component';

bootstrapApplication(FreehandDrawingComponent, appConfig)
  .catch((err) => console.error(err));

const sidebar = document.getElementById("sidebar");

if (sidebar) {
  sidebar.addEventListener("mouseenter", () => {
    sidebar.classList.add("open");
  });

  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("open");
  });
}