import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageDto, RecipeDto, RecipeTypeDto, UserDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-recipe-grid-item',
  templateUrl: './recipe-grid-item.component.html',
  styleUrls: ['./recipe-grid-item.component.scss']
})
export class RecipeGridItemComponent implements OnInit {
  @Input()
  recipe: RecipeDto

  user: UserDto;
  private userSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.registerUserChangeListener();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  registerUserChangeListener() {
    this.userSubscription = this.userAuthService.getLoggedUser().subscribe(this.onUserChanged.bind(this))
  }

  onUserChanged(user) {
    this.user = user;
  }

  getRecipeType(recipeType: RecipeTypeDto): string {
    let ancestors = "";
    if (recipeType.parent) {
      ancestors = this.getRecipeType(recipeType.parent);
      return ancestors + ' > ' + recipeType.name;
    }
    return recipeType.name
  }

  addToWishlist() {
    this.recipesService.addToWishlist(this.recipe);
  }

  removeFromWishlist() {
    this.recipesService.removeFromWishlist(this.recipe);
  }

}
