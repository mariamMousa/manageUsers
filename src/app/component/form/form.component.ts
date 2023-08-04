import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(
    private form: FormBuilder,
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.service.getUserById(userId).subscribe((data) => {
          this.userForm.patchValue({ id: userId, ...data });
        });
      }
    });
  }

  dataSource: any[] = [];
  userForm = this.form.group({
    id: this.form.control(null), // Add this line
    firstName: this.form.control('', Validators.required),
    lastName: this.form.control('', Validators.required),
    birthdate: this.form.control(new Date(2000, 3, 25)),
    isActive: this.form.control(true),
  });

  saveUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      if (formValue.id) {
        // Existing user, perform update
        this.service.UpdateUser(formValue.id, formValue).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title:
              'User(' + this.userForm.value.firstName + ')Updated Successfully',
            showConfirmButton: false,
            timer: 1700,
          });
          console.log(data);
          this.resetForm();
          this.router.navigate(['/users']); // Navigate back to the user list
        });
      } else {
        // New user, perform add
        this.service.AddUser(formValue).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title:
              'User(' + this.userForm.value.firstName + ')Saved Successfully',
            showConfirmButton: false,
            timer: 1700,
          });
          console.log(data);
          this.resetForm();
          this.router.navigate(['/users']); // Navigate back to the user list
        });
      }
    }
  }
  resetForm() {
    this.userForm.reset();
  }
}
