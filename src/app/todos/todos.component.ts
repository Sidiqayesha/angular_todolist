import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../service/to-do.service';
import{MatDialog} from '@angular/material/dialog';
import { AddTodosComponent } from '../add-todos/add-todos.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit{
  task={id:0 ,title:'',description:''}
  tasks:any[]=[]; 
  filteredTodos: any[] = [];
  searchText: string = '';
  noResultsFound: boolean = false;
  name=localStorage.getItem('username');

  constructor(private todoService:ToDoService,private dialog:MatDialog){

  }
  ngOnInit(): void {
    this.getTasks();
  }

  filterTodos() {
    if (this.searchText.trim() === '') {
      this.filteredTodos = this.tasks;
      this.noResultsFound = false;
    } else {
      this.filteredTodos = this.tasks.filter(todo =>
        todo.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        todo.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.noResultsFound = this.filteredTodos.length === 0;
    }
  }

  addTask(){
    this.todoService.addTodo(this.task.title,this.task.description).subscribe((task)=>{
      if(task.title===this.task.title){
        alert('task added');
      }
      else{
          alert('something went wrong');
        }
      })
    }
      

  getTasks() {
    this.todoService.tasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTodos=tasks; // Assuming you have a tasks property to hold the list of tasks
      },
      error => {
        console.error('Error fetching tasks:', error);
        alert('An error occurred while fetching tasks');
      }
    );
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTodosComponent, {
      width: '35%',
      height: '75vh',
      data: { title: '', description: '' },
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTasks();
      }
    });
  }

  openUpdateTaskDialog(task:any): void {
    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      width: '35%',
      height: '75vh',
      data:task,
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTasks();
      }
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure?')) {
      this.todoService.deleteTodo(id).subscribe(
        () => {
          this.getTasks(); // Refresh the task list after deletion
          alert('Task deleted successfully');
        },
        error => {
          console.error('Error deleting task:', error);
          alert('An error occurred while deleting the task: ACCESS DENIED');
        }
      );
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log('Logout clicked');
    alert('Logged out');
  }
}