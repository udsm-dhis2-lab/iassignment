import { ChartsAccessAssignmentsModule } from './charts-access-assignments.module';

describe('ChartsAccessAssignmentsModule', () => {
  let chartsAccessAssignmentsModule: ChartsAccessAssignmentsModule;

  beforeEach(() => {
    chartsAccessAssignmentsModule = new ChartsAccessAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(chartsAccessAssignmentsModule).toBeTruthy();
  });
});
