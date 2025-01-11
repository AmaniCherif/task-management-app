import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  sortField: 'priority' | 'due_date' = 'priority';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.sortTasks();
      },
      error: (error) => {
        this.showMessage('Error loading tasks');
        console.error(error);
      }
    });
  }

  sortTasks(): void {
    this.tasks.sort((a, b) => {
      if (this.sortField === 'priority') {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
    });
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task?.id) {
          this.updateTask(task.id, result);
        } else {
          this.createTask(result);
        }
      }
    });
  }

  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.loadTasks();
        this.showMessage('Task created successfully');
      },
      error: (error) => {
        this.showMessage('Error creating task');
        console.error(error);
      }
    });
  }

  updateTask(id: number, task: Task): void {
    this.taskService.updateTask(id, task).subscribe({
      next: () => {
        this.loadTasks();
        this.showMessage('Task updated successfully');
      },
      error: (error) => {
        this.showMessage('Error updating task');
        console.error(error);
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
          this.showMessage('Task deleted successfully');
        },
        error: (error) => {
          this.showMessage('Error deleting task');
          console.error(error);
        }
      });
    }
  }

  toggleTaskCompletion(id: number): void {
    this.taskService.toggleTaskCompletion(id).subscribe({
      next: () => {
        this.loadTasks();
        this.showMessage('Task status updated');
      },
      error: (error) => {
        this.showMessage('Error updating task status');
        console.error(error);
      }
    });
  }

  changeSortField(field: 'priority' | 'due_date'): void {
    this.sortField = field;
    this.sortTasks();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
