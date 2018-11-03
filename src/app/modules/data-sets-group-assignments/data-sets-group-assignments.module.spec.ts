import { DataSetsGroupAssignmentsModule } from './data-sets-group-assignments.module';

describe('DataSetsGroupAssignmentsModule', () => {
  let dataSetsGroupAssignmentsModule: DataSetsGroupAssignmentsModule;

  beforeEach(() => {
    dataSetsGroupAssignmentsModule = new DataSetsGroupAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(dataSetsGroupAssignmentsModule).toBeTruthy();
  });
});
