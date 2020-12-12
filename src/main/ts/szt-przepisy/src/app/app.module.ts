import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { NewRecipeFormComponent } from './components/content/new-recipe-form/new-recipe-form.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewRecipeFormComponent,
    RecipesListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
