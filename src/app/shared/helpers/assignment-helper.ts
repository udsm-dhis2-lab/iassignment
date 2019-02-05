
export function generateDataAssignments(selectedOrgunits, selectedData) {
  const assignmentArray = [];
  if (selectedOrgunits.length > 1) {
    selectedOrgunits.forEach((orgunit: any) => {
      selectedData.forEach((form: any) => {
        assignmentArray.push({
          id: orgunit.id + '-' + form.id,
          orgunitId: orgunit.id,
          orgunitName: orgunit.name,
          formName: form.name,
          formType: form.formType,
          formId: form.id,
          dataSetsCount: orgunit.dataSets ? orgunit.dataSets.length : 0,
          programsCount: orgunit.programs ? orgunit.programs.length : 0,
          isProcessing: false,
          isAssigned: (form.organisationUnits.filter(e => e.id === orgunit.id).length > 0) ? true : false
        });
      });
    });
  } else {
    if (selectedOrgunits[0].children) {
      selectedOrgunits[0].children.forEach((childOrgunit: any) => {
        selectedData.forEach((form: any) => {
          assignmentArray.push({
            id: childOrgunit.id + '-' + form.id,
            orgunitId: childOrgunit.id,
            orgunitName: childOrgunit.name,
            formName: form.name,
            formType: form.formType,
            formId: form.id,
            dataSetsCount: childOrgunit.dataSets ? childOrgunit.dataSets.length : 0,
            programsCount: childOrgunit.programs ? childOrgunit.programs.length : 0,
            isProcessing: false,
            isAssigned: (form.organisationUnits.filter(e => e.id === childOrgunit.id).length > 0) ? true : false
          });
        });
      });
    } else {
      selectedData.forEach((form: any) => {
        assignmentArray.push({
          id: selectedOrgunits[0].id + '-' + form.id,
          orgunitId: selectedOrgunits[0].id,
          orgunitName: selectedOrgunits[0].name,
          formName: form.name,
          formType: form.formType,
          formId: form.id,
          dataSetsCount: selectedOrgunits[0].dataSets ? selectedOrgunits[0].dataSets.length : 0,
          programsCount: selectedOrgunits[0].programs ? selectedOrgunits[0].programs.length : 0,
          isProcessing: false,
          isAssigned: (form.organisationUnits.filter(e => e.id === selectedOrgunits[0].id).length > 0) ? true : false
        });
      });
    }
  }
  return assignmentArray;
}

export function getOrgunitsCollections(selectedOrgunits: any[]) {
  return {
    selectedOrgunits: selectedOrgunits,
    orgunitTodisplay: (selectedOrgunits.length > 1) ?
    selectedOrgunits : selectedOrgunits[0].children
  };
}


export function removeArrayObjects(sourceArray, toRemoveObjects, keyUsed) {
  for (var i = sourceArray.length - 1; i >= 0; i--) {
    for (var j = 0; j < toRemoveObjects.length; j++) {
      if (sourceArray[i] && (sourceArray[i][keyUsed] === toRemoveObjects[j][keyUsed])) {
        sourceArray.splice(i, 1);
      }
    }
  }
  return sourceArray;
}

export function removeDuplicates(originalArray, key) {
  const newArray = [];
  const lookupObject  = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][key]] = originalArray[i];
  }
  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
