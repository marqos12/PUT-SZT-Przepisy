import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipeTypeDto } from '../api/api';
import { TypeService } from '../common/services/typesService';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeTypesService extends TypeService<RecipeTypeDto> {

  constructor(rest: RestService) {
    super("/api/recipeTypes", rest)
  }

  private mapRecipeTypeToNode(recipeType: RecipeTypeDto): TreeNode {
    return {
      data: recipeType,
      label: recipeType.name,
      children: recipeType.children.map(this.mapRecipeTypeToNodeFcn()),
    };
  }

  public mapRecipeTypeToNodeFcn() {
    return this.mapRecipeTypeToNode.bind(this)
  }

  public addRecipeType(recipeType: RecipeTypeDto): Observable<RecipeTypeDto> {
    return this.rest.post(this.url, recipeType).pipe(tap(this.getAllRequest.bind(this)));
  }

}
