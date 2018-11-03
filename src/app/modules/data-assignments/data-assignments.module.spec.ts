import { DataAssignmentsModule } from './data-assignments.module';

describe('DataAssignmentsModule', () => {
  let dataAssignmentsModule: DataAssignmentsModule;

  beforeEach(() => {
    dataAssignmentsModule = new DataAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(dataAssignmentsModule).toBeTruthy();
  });
});
