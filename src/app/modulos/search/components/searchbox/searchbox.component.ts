import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {

  public searchInputs = {
    location: '',
    minValue: '',
    maxValue: '',
    minArea: '',
    maxArea: '',
  }

  public searchForm: FormGroup;
  location = new FormControl('', [Validators.pattern(/([a-z]|[A-Z])/g)]);
  minValue = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  maxValue = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  minArea = new FormControl('', [Validators.pattern(/[^\D]/g)]);
  maxArea = new FormControl('', [Validators.pattern(/[^\D]/g)]);

  
  options: string[] = ['One', 'Two', 'Three'];

  constructor(
    private route: Router,
    private form: FormBuilder
    ) { 

     this.searchForm = this.form.group({
        location: this.location,
        minValue: this.minValue,
        maxValue: this.maxValue,
        minArea: this.minArea,
        maxArea: this.maxArea,
      })
    }
    
  ngOnInit(): void {

    this.jquery();
    this.location.valueChanges.subscribe(data=>{
      console.log(data)
    })
  }

  checkText(element){
    this.searchInputs[element] = this.searchInputs[element].replace(/\D/g, '');
  }

  clearFilters(){
    this.searchInputs = {
      location: '',
      minValue: '',
      maxValue: '',
      minArea: '',
      maxArea: '',
    }
  }

  onSubmit(){
    console.log(this.searchForm.valid, this.searchForm.get('minValue').errors, typeof this.searchForm.value.minValue)
    if(!this.searchForm.valid) return;
    let { location, minValue, maxValue, minArea, maxArea } = this.searchForm.controls
    this.route.navigate(['/search'], 
    {queryParams: 
      {
        location: location.value,
        minValue: minValue.value,
        maxValue: maxValue.value,
        minArea: minArea.value,
        maxArea: maxArea.value
      }, skipLocationChange: true},
      )
  }

  jquery(){
    $(document).ready(function() {

      $(window).scroll((event)=>{
        checkOffset();
      });

      function checkOffset() {
        if($('#searchBox').offset().top + $('#searchBox').height() >= $('#footer').offset().top - 275){
          console.log("entrei aqui")
          $('#searchBox').css('position', 'absolute');
          $('#searchBox').css('top', ($('#footer').offset().top - $('#searchBox').height() - 275) +'px');
        }
        if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top){
          
          console.log('entrei')
          $('#searchBox').css('position', 'fixed')
          $('#searchBox').css('top', 'auto')
        }
    }
    });
  }

}
