import { UserRoleAssignmentsModule } from './user-role-assignments.module';

describe('UserRoleAssignmentsModule', () => {
  let userRoleAssignmentsModule: UserRoleAssignmentsModule;

  beforeEach(() => {
    userRoleAssignmentsModule = new UserRoleAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(userRoleAssignmentsModule).toBeTruthy();
  });
});
