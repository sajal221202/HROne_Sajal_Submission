import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button, Input, Select, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import SchemaBuilder from './SchemaBuilder';

const fieldTypeOptions = [
  { value: 'String', label: 'String' },
  { value: 'Number', label: 'Number' },
  { value: 'Nested', label: 'Nested Object' },
];

const SchemaRow = ({ namePrefix, onRemove }) => {
  // eslint-disable-next-line no-unused-vars
  const { control, register } = useFormContext();

  const fieldTypeValue = useWatch({
    control,
    name: `${namePrefix}.type`,
  });

  return (
    <div style={{
      padding: '1rem',
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      background: '#fafafa'
    }}>
      <Space align="start" style={{ width: '100%' }}>
        <Controller
          name={`${namePrefix}.keyName`}
          control={control}
          rules={{ required: 'Key name is required' }}
          render={({ field }) => <Input {...field} placeholder="Field Name / Key" />}
        />

        <Controller
          name={`${namePrefix}.type`}
          control={control}
          render={({ field }) => (
            <Select {...field} options={fieldTypeOptions} style={{ width: 150 }} />
          )}
        />

        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={onRemove}
        />
      </Space>

      {fieldTypeValue === 'Nested' && (
        <div style={{ marginTop: '1rem', paddingLeft: '2rem', borderLeft: '2px solid #e8e8e8' }}>
          <SchemaBuilder name={`${namePrefix}.children`} />
        </div>
      )}
    </div>
  );
};

export default SchemaRow;