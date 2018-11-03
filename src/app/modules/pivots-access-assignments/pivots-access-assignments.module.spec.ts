import { PivotsAccessAssignmentsModule } from './pivots-access-assignments.module';

describe('PivotsAccessAssignmentsModule', () => {
  let pivotsAccessAssignmentsModule: PivotsAccessAssignmentsModule;

  beforeEach(() => {
    pivotsAccessAssignmentsModule = new PivotsAccessAssignmentsModule();
  });

  it('should create an instance', () => {
    expect(pivotsAccessAssignmentsModule).toBeTruthy();
  });
});
