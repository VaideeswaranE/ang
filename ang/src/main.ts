// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Import the routes from your routing file
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';  // Import provideHttpClient and HTTP_INTERCEPTORS
import { MyInterceptor } from './interceptors/my-interceptor';  // Ensure the path is correct

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the routes directly
    provideHttpClient(),     // Provide the HttpClient
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: MyInterceptor, 
      multi: true 
    }, // Register the interceptor correctly
  ]
}).catch((err) => console.error(err));
