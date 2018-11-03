import { ReportsAccessAssignmentsModule } from './reports-access-assignments.module';

describe('ReportsAccessAssignmentsModule', () => {
  let reportsAccessAssignmentsModule: ReportsAccessAssignmentsModule;

  beforeEach(() => {
    reportsAccessAssignmentsModule = new ReportsAccessAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(reportsAccessAssignmentsModule).toBeTruthy();
  });
});
