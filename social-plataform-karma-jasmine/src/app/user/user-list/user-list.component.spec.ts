import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);

    mockUserService.getUsers.and.returnValue(
      of([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Ana Doe' },
        { id: 3, name: 'Maria Doe' },
      ]),
    );

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers on init', () => {
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it('should display users', () => {
    expect(component.users.length).toBe(3);
    expect(component.users[0].name).toBe('John Doe');
    expect(component.users[1].name).toBe('Ana Doe');
    expect(component.users[2].name).toBe('Maria Doe');
  });
});
