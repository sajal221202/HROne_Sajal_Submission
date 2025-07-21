export interface SchemaField {
  keyName: string;
  type: 'String' | 'Number' | 'Nested';
  children?: SchemaField[];
} 