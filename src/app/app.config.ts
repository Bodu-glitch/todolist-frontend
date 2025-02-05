import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';


// firebase config
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const config: SocketIoConfig = { url: 'http://localhost:80', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideFirebaseApp(() => initializeApp(
      { projectId: "todolist-246-25a",
        appId: "1:874799892031:web:fa30d86d48e86ee60c1a8a",
        storageBucket: "todolist-246-25a.firebasestorage.app",
        apiKey: "AIzaSyBpffYg2Pch19gBGONNAoNxkOvHPY0_fZw",
        authDomain: "todolist-246-25a.firebaseapp.com",
        messagingSenderId: "874799892031",
        measurementId: "G-QKN60571QH" }),),
    provideAuth(() => getAuth())],
};
