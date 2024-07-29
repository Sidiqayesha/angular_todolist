import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoService } from '../service/to-do.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {
  oldTask = {id:0,title:'',description:''}
 
  constructor(
    public dialogRef: MatDialogRef<UpdateTodoComponent>,
    private toDoService: ToDoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.oldTask = {...data};
  }
 
  onNoClick():void{
    this.dialogRef.close();
  }
 
  updateTask():void{
    this.toDoService.updateTodo(this.oldTask.id,this.oldTask.title,this.oldTask.description).subscribe(
      (task)=>{
        console.log(task)
        alert('Task updated successfully');        
        this.dialogRef.close(true);
    },
    ()=>{
        alert('something went wrong:ACCESS DENIED');
        this.dialogRef.close(false);
      })
    }
  }

