const dictionaryCodes = [
  'ActiveInactiveState',
  'ApprovalState',
  'BusinessActivityKind',
  'BusinessActivityState',
  'BusinessApplicationState',
  'BusinessTaskState',
  'DataDictionaryValueType',
  'DataSecretLevel',
  'DocumentType',
  'EmployeeState',
  'EnabledDisabledState',
  'EquipmentPowerState',
  'EquipmentProductionState',
  'DataDictionaryLevel',
  'PropertyType',
  'RouteHttpMethod',
  'RouteType',
  'ProductionOrderAssignmentState',
  'ProductionOrderExecutionState',
  'ProductionPlanExecutionState',
  'ProductionPlanScheduleState',
  'ProductionTaskAssignmentState',
  'ProductionTaskExecutionState',
  'PublishState',
  'QuantityType',
  'UndeletedDeletedState',
  'UnitType',
  'UserSecretLevel',
] as const;
export type TDictionaryCodes = typeof dictionaryCodes[number];