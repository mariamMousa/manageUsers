import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userList!: User[];
  dataSource: any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthdate',
    'isActive',
    'actions',
  ];
  constructor(private service: ServiceService, private router: Router) {
    this.getAllUsers();
  }

  search(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  getAllUsers() {
    this.service.getUsers().subscribe((data) => {
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  delete(id: any) {
    this.service.deleteUser(id).subscribe((res) => {
      this.getAllUsers();
    });
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  }
  editUser(id: any) {
    this.router.navigate(['/userForm', { id: id }]);
  }
}
