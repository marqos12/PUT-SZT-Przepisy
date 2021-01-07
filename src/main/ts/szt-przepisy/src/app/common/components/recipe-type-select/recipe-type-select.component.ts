import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import { RecipeTypeDto } from 'src/app/api/api';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';
import { NewRecipeTypeDialogComponent } from '../new-recipe-type-dialog/new-recipe-type-dialog.component';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RecipeTypeSelectComponent),
  multi: true,
};

@Component({
  selector: 'app-recipe-type-select',
  templateUrl: './recipe-type-select.component.html',
  styleUrls: ['./recipe-type-select.component.scss'],
  providers: [DialogService, CUSTOM_VALUE_ACCESSOR],
})
export class RecipeTypeSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() multiple: Boolean = false;
  @Input() allowAddNew: Boolean = false;

  @ViewChild(OverlayPanel) overlayPanel;

  recipeTypes: TreeNode[] = [];
  recipeType: RecipeTypeDto;
  selected;
  private recipeTypesSubscription: Subscription;
  private onChange: Function;
  private onTouched: Function;
  private isDisabled: Boolean;

  constructor(
    private recipeTypesService: RecipeTypesService,
    public dialogService: DialogService
  ) {
    this.onChange = (_: any) => { };
    this.onTouched = () => { };
    this.isDisabled = false;
  }

  writeValue(recipeType: any): void {
    this.recipeType = recipeType;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.registerRecipeTypesListener()
  }

  registerRecipeTypesListener() {
    this.recipeTypesSubscription = this.recipeTypesService.registerListener(this.onRecipeTypesReceive.bind(this));
  }

  onRecipeTypesReceive(types: RecipeTypeDto[]) {
    this.recipeTypes = types.map(this.recipeTypesService.mapRecipeTypeToNodeFcn());
  }

  ngOnDestroy(): void {
    this.recipeTypesSubscription.unsubscribe();
  }

  addNew() {
    const ref = this.dialogService.open(NewRecipeTypeDialogComponent, {
      header: 'Dodaj rodzaj przepisu',
      width: '1000px',
    });
    ref.onClose.subscribe((recipeType: RecipeTypeDto) => {
      if (recipeType) {
        this.recipeType = recipeType;
        this.onChange(this.recipeType);
      }
    });
  }

  onRecipeSelect(event) {
    this.recipeType = event.node.data;
    if (!this.multiple) {
      this.overlayPanel.hide();
      this.onChange(this.recipeType);
    } else {
      this.onChange(this.selected.map(selected => selected.data));
    }
  }

  onRecipeUnselect(event) {
    this.recipeType = event.node.data;
    if (!this.multiple) {
      this.onChange(this.recipeType);
    } else {
      this.onChange(this.selected.map(selected => selected.data));
    }
  }
}
