import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  userForm: FormGroup;
  fields: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fields = {
      isRequired: true,
        parents: [
          {
            firstName: '',
            lastName: ''
          },
          {
            firstName: '',
            lastName: ''
          }
        ]
    };
    // this.userForm = this.fb.group({
    //   parents: this.fb.array([])
    // });

    this.userForm = this.fb.group({
      parents: this.fb.array([
        this.fb.group({
          firstName: [null],
          lastName: [null]
        }),
        this.fb.group({
          firstName: [null],
          lastName: [null]
        }),
      ])
    });
    //this.patch()
  }

  submit(value) {
    console.log(value);
  }

  patch() {
    const control = <FormArray>this.userForm.get('parents');
    this.fields.parents.forEach(x => {
      control.push(this.patchValues(x.label, x.value))
    })
  }

  patchValues(label, value) {
    return this.fb.group({
      firstName: [label],
      lastName: [value]
    })
  }
}
