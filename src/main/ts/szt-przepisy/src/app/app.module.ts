import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { RecipeFormComponent } from './components/content/recipe-form/recipe-form.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';
import { FieldsetModule } from 'primeng/fieldset';
import { RecipeDetailsFormComponent } from './components/content/recipe-form/recipe-details-form/recipe-details-form.component';
import { RecipeImageComponent } from './components/content/recipe-form/recipe-image/recipe-image.component';
import { RecipeStepsComponent } from './components/content/recipe-form/recipe-steps/recipe-steps.component';
import { RecipeIngredientsComponent } from './components/content/recipe-form/recipe-ingredients/recipe-ingredients.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NewIngredientFormComponent } from './components/content/recipe-form/recipe-ingredients/new-ingredient-form/new-ingredient-form.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { RecipeIngredientComponent } from './components/content/recipe-form/recipe-ingredients/recipe-ingredient/recipe-ingredient.component';
import { RecipeStepComponent } from './components/content/recipe-form/recipe-steps/recipe-step/recipe-step.component';
import { RecipeStepFormComponent } from './components/content/recipe-form/recipe-steps/recipe-step-form/recipe-step-form.component';
import { EditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { RecipesListFiltersComponent } from './components/content/recipes-list/recipes-list-filters/recipes-list-filters.component';
import { RecipesGalleryComponent } from './components/content/recipes-list/recipes-gallery/recipes-gallery.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { RecipeListItemComponent } from './components/content/recipes-list/recipes-gallery/recipe-list-item/recipe-list-item.component';
import { RecipeGridItemComponent } from './components/content/recipes-list/recipes-gallery/recipe-grid-item/recipe-grid-item.component';
import { RatingModule } from 'primeng/rating';
import { RecipeTypeSelectComponent } from './common/components/recipe-type-select/recipe-type-select.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NewRecipeTypeDialogComponent } from './common/components/new-recipe-type-dialog/new-recipe-type-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { RecipeViewComponent } from './components/content/recipe-view/recipe-view.component';
import { RecipeDetailsViewComponent } from './components/content/recipe-view/recipe-details-view/recipe-details-view.component';
import { RecipeIngredientsViewComponent } from './components/content/recipe-view/recipe-ingredients-view/recipe-ingredients-view.component';
import { RecipeStepsViewComponent } from './components/content/recipe-view/recipe-steps-view/recipe-steps-view.component';
import { RecipeImageViewComponent } from './components/content/recipe-view/recipe-image-view/recipe-image-view.component';
import { LoginFormComponent } from './components/content/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/content/auth/register-form/register-form.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { RecipeComplexityNamePipe } from './common/pipes/recipe-complexity-name.pipe';
import { FileUploadModule } from 'primeng/fileupload';
import { ImagePreviewComponent } from './components/content/recipe-form/recipe-image/image-preview/image-preview.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeFormComponent,
    RecipesListComponent,
    RecipeDetailsFormComponent,
    RecipeImageComponent,
    RecipeStepsComponent,
    RecipeIngredientsComponent,
    NewIngredientFormComponent,
    RecipeIngredientComponent,
    RecipeStepComponent,
    RecipeStepFormComponent,
    RecipesListFiltersComponent,
    RecipesGalleryComponent,
    RecipeListItemComponent,
    RecipeGridItemComponent,
    RecipeTypeSelectComponent,
    NewRecipeTypeDialogComponent,
    RecipeViewComponent,
    RecipeDetailsViewComponent,
    RecipeIngredientsViewComponent,
    RecipeStepsViewComponent,
    RecipeImageViewComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RecipeComplexityNamePipe,
    ImagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    FieldsetModule,
    EditorModule,
    ButtonModule,
    ToggleButtonModule,
    InputTextareaModule,
    DropdownModule,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelMenuModule,
    PanelModule,
    SliderModule,
    MultiSelectModule,
    DataViewModule,
    FormsModule,
    RatingModule,
    OverlayPanelModule,
    TreeModule,
    DynamicDialogModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    SidebarModule,
    FileUploadModule,
    GalleriaModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewRecipeTypeDialogComponent
  ]
})
export class AppModule { }
