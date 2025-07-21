import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SchemaRow from './SchemaRow';

const SchemaBuilder = ({ name }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addField = () => {
    append({ keyName: '', type: 'String', children: [] });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {fields.map((field, index) => (
        <SchemaRow
          key={field.id}
          namePrefix={`${name}.${index}`}
          onRemove={() => remove(index)}
        />
      ))}
      <Button
        type="dashed"
        onClick={addField}
        icon={<PlusOutlined />}
      >
        Add Field
      </Button>
    </div>
  );
};

export default SchemaBuilder;