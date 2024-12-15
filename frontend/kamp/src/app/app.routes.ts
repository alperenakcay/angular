import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { YonetimComponent } from './components/yonetim/yonetim.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { KampIslemleriComponent } from './components/kamp-islemleri/kamp-islemleri.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        
    }, 
    {
        path: "",
        component: LayoutsComponent,
        children:[
            {
                path: "home",
                component: HomeComponent,
                canActivate: [authGuard] 
            },
            {
                path: "contact",
                component: ContactComponent,
                canActivate: [authGuard] 
            },
            {
                path: "yonetim",
                component: KampIslemleriComponent,
                canActivate: [authGuard] 
            }
        ],
        canActivate: [authGuard] 
    }, 
    

];
