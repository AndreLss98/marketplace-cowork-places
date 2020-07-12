import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

import { MenuService } from 'src/app/shared/service/menu.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { HighlightService } from 'src/app/shared/service/highlight.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {

  public tiposServico = [];

  public searchInputs = {
    location: '',
    minValue: '',
    maxValue: '',
    minArea: '',
    maxArea: '',
  }

  public searchForm: FormGroup;
  tipo = new FormControl(null, []);
  minArea = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  maxArea = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  minValue = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  maxValue = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  location = new FormControl('', [Validators.pattern(/([a-z]|[A-Z])/g)]);

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private alugaveisService: AlugaveisService,
    private highlightService: HighlightService
  ) {
    // Inicia o formulario
    this.searchForm = this.formBuilder.group({
      location: this.location,
      tipo: this.tipo,
      minValue: this.minValue,
      maxValue: this.maxValue,
      minArea: this.minArea,
      maxArea: this.maxArea,
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.location.valueChanges.pipe(
      startWith(''),
      map(value => this.locationFilter(value))
    );

    this.alugaveisService.getBairros().subscribe(response => {
      this.options = response.map(resp => resp.bairro);
    })

    this.menuService.getAllHome().subscribe((response: any) => {
      this.tiposServico = response.filter(tipo => tipo.disponivel);
    });
  }

  private locationFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  checkText(element) {
    this.searchInputs[element] = this.searchInputs[element].replace(/\D/g, '');
  }

  clearForm() {
    this.searchForm.reset({
      location: '',
      tipo: null,
      minValue: '',
      maxValue: '',
      minArea: '',
      maxArea: ''
    })
  }

  clearFilters() {
    this.clearForm();
    this.onSubmit();
  }

  onSubmit() {
    if (!this.searchForm.valid) return;

    let { location, tipo, minValue, maxValue, minArea, maxArea } = this.searchForm.value;
    let filters = {
      bairro: location, tipo_id: tipo, minValue: Number(minValue), maxValue: Number(maxValue), minArea: Number(minArea), maxArea: Number(maxArea)
    };
    this.highlightService.fetch(filters);
  }

}
