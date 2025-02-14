import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDescriptionDialogComponent } from './task-description-dialog.component';

describe('TaskDescriptionDialogComponent', () => {
  let component: TaskDescriptionDialogComponent;
  let fixture: ComponentFixture<TaskDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDescriptionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
