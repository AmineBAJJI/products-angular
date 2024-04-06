import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  //FormBuilder is provided by Angular's forms module (@angular/forms).

  //Angular's dependency injection system automatically recognizes that FormBuilder is needed and provides an instance of it when the component or service is created.
  //ProductsService is a custom service that you've created.
  //Assuming you've defined ProductsService as an @Injectable() class and provided it in a module or component's provider array or through the providedIn property of the @Injectable() decorator, Angular's dependency injection system will automatically inject an instance of ProductsService when it's requested.
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    //FormBuilder is a service provided by Angular that offers convenient methods for generating instances of FormGroup and FormControl.
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.productsService
      .save(this.productFormGroup?.value)
      .subscribe((data) => {
        alert('Success Saving product');
        console.log(data);
      });
  }
}
