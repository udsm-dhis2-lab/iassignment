
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

export function updateSelectedOrgunitdataAssigned(selectedOrgunits, currentAssignmentPayload, action) {
  const orgunitsCollections = getOrgunitsCollections(selectedOrgunits);

  if (action === 'add') {
    (orgunitsCollections.orgunitTodisplay || []).forEach((orgunit: any) => {
      if (orgunit.id === currentAssignmentPayload.orgunitId) {
        orgunit[currentAssignmentPayload.formType].push({id: currentAssignmentPayload.formId});
      }
    });
  } else if (action === 'remove') {
    (orgunitsCollections.orgunitTodisplay || []).forEach((orgunit: any) => {
      if (orgunit.id === currentAssignmentPayload.orgunitId) {
        orgunit[currentAssignmentPayload.formType] =
        removeArrayObjects(orgunit[currentAssignmentPayload.formType],
          [{id: currentAssignmentPayload.formId}], 'id');
      }
    });
  }
  return orgunitsCollections;
}

export function updateOrgunitsOnBulkAssignments(selectedOrgunits, currentAssignmentPayload, action) {
  // const orgunitsCollections = selectedOrgunits;
  if (action === 'addAll') {
    selectedOrgunits.forEach((orgunit: any) => {
        orgunit[currentAssignmentPayload.formType].push({id: currentAssignmentPayload.id});
    });
  } else if (action === 'removeAll') {
    selectedOrgunits.forEach((orgunit: any) => {
        orgunit[currentAssignmentPayload.formType] =
        removeArrayObjects(orgunit[currentAssignmentPayload.formType],
          [{id: currentAssignmentPayload.id}], 'id');
    });
  }
  return selectedOrgunits;
}

export function removeArrayObjects(sourceArray: any[], toRemoveObjects: any[], keyUsed: string) {
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



export function removeArrayObjectsInAnotherArray(sourceArray: any[], toRemoveObjects: any[], key1Used: string, key2Used: string) {
  for (var i = sourceArray.length - 1; i >= 0; i--) {
    for (var j = 0; j < toRemoveObjects.length; j++) {
      if (sourceArray[i] &&
        (sourceArray[i][key1Used] === toRemoveObjects[j][key1Used]) &&
        (sourceArray[i][key2Used] === toRemoveObjects[j][key2Used])) {
          sourceArray[i].description = '-TO-DELETE-';
        sourceArray.splice(i, 1);
      }
    }
  }
  return sourceArray;
}

export function getAnalyticsProperties(analytics) {
  const metaData = analytics.metaData.dimensions ? analytics.metaData.dimensions : analytics.metaData;
  const metaDataItems = analytics.metaData.items ? analytics.metaData.items : analytics.metaData.names;
  return {metaData, metaDataItems};
}

export function sortAlphabetical(sourceArray: any[], keyToSort: string) {
  sourceArray.sort(function(a, b) {
    return a[keyToSort].localeCompare(b[keyToSort]);
  });
  return sourceArray;
}
