import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageDto, RecipeDto, RecipeTypeDto, UserDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit, OnDestroy {

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
