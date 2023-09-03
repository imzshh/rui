import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionInstrumentCategory',
  name: '检验仪器类型',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
    {
      code: 'description',
      name: '描述',
      fieldType: 'string',
    },
  ],
} as PrEntity;