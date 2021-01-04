import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PageDto, RecipeDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-gallery',
  templateUrl: './recipes-gallery.component.html',
  styleUrls: ['./recipes-gallery.component.scss']
})
export class RecipesGalleryComponent implements OnInit, OnDestroy {

  recipes: RecipeDto[] = [];
  recipesPage: PageDto<RecipeDto>;
  recipesSubscription: Subscription;
  sortOptions: SelectItem[];
  rowsPerPageOptions = [];
  isLoading = true;

  sortKey: string;
  pageable = {
    pageNo: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "desc"
  }

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.registerRecipesListener();
    this.initDataViewOptions();
  }

  initDataViewOptions() {
    this.sortOptions = [
      { label: 'Nazwa rosnąco', value: 'name' },
      { label: 'Nazwa malejąco', value: '!name' },
      { label: 'Czas przygotowania rosnąco', value: 'duration' },
      { label: 'Czas przygotowania malejąco', value: '!duration' }
    ];
    this.rowsPerPageOptions = [10, 25, 50, 100];
  }

  registerRecipesListener() {
    this.recipesSubscription = this.recipesService.getRecipes().subscribe(this.onRecipesListUpdate.bind(this));
  }

  onRecipesListUpdate(recipesPage: PageDto<RecipeDto>) {
    this.recipes = recipesPage.content;
    this.recipesPage = recipesPage;
    this.isLoading = false;
    this.pageable = this.recipesService.pageable;
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  onPaginationChange(event) {
    this.pageable.pageNo = Math.floor(event.first / event.rows);
    this.pageable.pageSize = event.rows;
    this.refresh();
  }

  refresh() {
    this.recipesService.refreshRecipesAfterPageableChanged(this.pageable);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.pageable.sortDirection = "desc";
      this.pageable.sortBy = value.substring(1, value.length);
    }
    else {
      this.pageable.sortDirection = "asc";
      this.pageable.sortBy = value;
    }
    this.pageable.pageNo = 0;

    this.refresh();
  }

}
