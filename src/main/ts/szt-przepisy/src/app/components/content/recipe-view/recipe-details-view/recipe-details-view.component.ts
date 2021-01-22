import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { RecipeDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-details-view',
  templateUrl: './recipe-details-view.component.html',
  styleUrls: ['./recipe-details-view.component.scss'],
  providers: [ConfirmationService]
})
export class RecipeDetailsViewComponent implements OnInit {

  @Input() recipe: RecipeDto;
  @Input() userIsAuthor: boolean;

  constructor(
    private confirmationService: ConfirmationService,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Czy chcesz skasować przepis?',
      accept: () => {
        this.recipesService.deleteRecipeById(this.recipe.id);
      }
    });
  }

}
