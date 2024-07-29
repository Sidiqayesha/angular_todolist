import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoService } from '../service/to-do.service';

@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})
export class AddTodosComponent {
  task = {title:'',description:''}
 
  constructor(
    public dialogRef: MatDialogRef<AddTodosComponent>,
    private toDoService: ToDoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = data;
  }
 
  onNoClick():void{
    this.dialogRef.close();
  }
 
  addTask():void{
    this.toDoService.addTodo(this.task.title,this.task.description).subscribe(
      (task)=>{
      if(task.title===this.task.title){
        alert('Task added successfully');
        this.dialogRef.close(true);
      }else{
        alert('something went wrong');
        this.dialogRef.close(false);
      }
    },
    ()=>{
      alert('something went wrong:ACCESS DENIED');
      this.dialogRef.close(false);
    })
  }
}

