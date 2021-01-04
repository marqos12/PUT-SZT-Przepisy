import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { RecipeTypeDto } from 'src/app/api/api';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';

@Component({
  selector: 'app-new-recipe-type-dialog',
  templateUrl: './new-recipe-type-dialog.component.html',
  styleUrls: ['./new-recipe-type-dialog.component.scss']
})
export class NewRecipeTypeDialogComponent implements OnInit, OnDestroy {
  private recipeTypesSubscription: Subscription;
  recipeTypes: TreeNode[] = [];
  selectedRecipe: TreeNode;
  nameControl = new FormControl('');

  constructor(
    private recipeTypesService: RecipeTypesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.registerRecipeTypesListener()
  }

  registerRecipeTypesListener() {
    this.recipeTypesSubscription = this.recipeTypesService.registerListener(this.onRecipeTypesReceive.bind(this));
  }

  onRecipeTypesReceive(types: RecipeTypeDto[]) {
    this.recipeTypes = [{
      label: 'Wszystkie',
      children: types.map(this.recipeTypesService.mapRecipeTypeToNodeFcn())
    }];
  }

  ngOnDestroy(): void {
    this.recipeTypesSubscription.unsubscribe();
  }

  save() {
    if (this.selectedRecipe && this.nameControl.value.trim()) {
      const recipeType: RecipeTypeDto = {
        parent: this.selectedRecipe.data,
        name: this.nameControl.value,
        children: null,
        id: null
      }
      this.recipeTypesService.addRecipeType(recipeType).subscribe(savedRecipeType => {
        this.ref.close(savedRecipeType);
      })
    }
  }

  cancel() {
    this.ref.close();
  }

}