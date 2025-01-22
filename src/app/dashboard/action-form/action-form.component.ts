import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { taskModel } from '../../model/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-action-form',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.scss'
})
export class ActionFormComponent implements OnInit {
  itemData = new taskModel()

  constructor(
    public dialogRef: MatDialogRef<ActionFormComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data){
      this.itemData = data
    }
   }

   ngOnInit(): void {
  }

   submitData = () => {
    const param: any = {
      id: this.itemData.id,
      title: this.itemData.title,
      description: this.itemData.description,
      status: this.itemData.status
    };
    if (this.itemData.id){
      param.id = this.itemData.id;
      this.taskService.Update(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.taskService.save(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }
}
