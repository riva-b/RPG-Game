import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app-game-logic',                                                    // Weiterleitung zur Startseite, wenn keine spezifische Route angegeben ist
        pathMatch: 'full'
    },
    {
        path: 'app-root',                                                                // Routenkonfiguration für die Root-Komponente der Anwendung
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
    },
    {
        path: 'app-game-logic',                                                          // Routenkonfiguration für die Startseite-Komponente      
        loadComponent: () => import('./game-logic/game-logic.component').then(m => m.GameLogicComponent),
    },
    
];
