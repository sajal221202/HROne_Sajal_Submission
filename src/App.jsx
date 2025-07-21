import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Card, Col, Row, Tabs, Typography } from 'antd';
import { CodeOutlined, FormOutlined } from '@ant-design/icons';
import SchemaBuilder from './components/SchemaBuilder';

// Utility function to convert form data to the desired JSON output
const generateJson = (fields) => {
  const result = {};
  if (!fields) return result;

  fields.forEach(field => {
    if (!field.keyName) return; // Skip fields without a name
    switch (field.type) {
      case 'String':
        result[field.keyName] = 'String Value';
        break;
      case 'Number':
        result[field.keyName] = 123;
        break;
      case 'Nested':
        // Recurse for nested fields
        result[field.keyName] = generateJson(field.children || []);
        break;
      default:
        break;
    }
  });
  return result;
};


function App() {
  const [jsonOutput, setJsonOutput] = useState({});
  const methods = useForm({
    defaultValues: {
      fields: [{ keyName: 'name', type: 'String', children: [] }],
    },
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit = () => {
    const values = getValues('fields');
    const generated = generateJson(values);
    setJsonOutput(generated);
    console.log('Final Schema Data:', values);
    alert('JSON has been generated! Check the JSON Preview tab.');
  };
  
  // A quick way to update the JSON preview in real-time
  const handleValuesChange = () => {
    const values = getValues('fields');
    const generated = generateJson(values);
    setJsonOutput(generated);
  };

  const tabItems = [
    {
      key: '1',
      label: <><FormOutlined /> Builder</>,
      children: (
        <FormProvider {...methods}>
          <form onChange={handleValuesChange} onSubmit={handleSubmit(onSubmit)}>
            <SchemaBuilder name="fields" />
            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
              Save Schema
            </Button>
          </form>
        </FormProvider>
      ),
    },
    {
      key: '2',
      label: <><CodeOutlined /> JSON Preview</>,
      children: (
        <Card bordered={false} style={{ background: '#f0f2f5' }}>
          <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
        </Card>
      ),
    },
  ];


  return (
    <Row justify="center" style={{ padding: '2rem' }}>
      <Col xs={24} md={20} lg={16} xl={12}>
        <Card>
          <Typography.Title level={3}>HROne JSON Schema Builder</Typography.Title>
          <Tabs defaultActiveKey="1" items={tabItems} onTabClick={handleValuesChange}/>
        </Card>
      </Col>
    </Row>
  );
}

export default App;