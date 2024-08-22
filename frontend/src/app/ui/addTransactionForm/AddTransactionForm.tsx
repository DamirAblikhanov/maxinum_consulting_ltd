'use client';

import React, { useState } from 'react';
import { Button, Form, Typography, Input, Select, DatePicker, Modal } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

interface AddTransactionFormValues {
  author: string;
  sum: number | null;
  category: string;
  comment?: string;
  datetime: Date;
}

const selectOptions: { label: string; value: string }[] = [
  { label: 'Игрушки LEGO', value: 'LEGO' },
  { label: 'Футбол', value: 'Soccer' },
  { label: 'Сладости', value: 'Sweets' },
];

export const AddTransactionForm = () => {
  const [form] = Form.useForm<AddTransactionFormValues>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateForm = () => {
    const values = form.getFieldsValue();

    const isAuthorValid = values.author?.trim();
    const isCategoryValid = values.category;
    const isSumValid = values.sum && !isNaN(values.sum);
    const isDatetimeValid = values.datetime;
    const isCommentValid = !values.comment || values.comment.trim().length > 0;

    const isValid = isAuthorValid && isCategoryValid && isSumValid && isDatetimeValid && isCommentValid;
    setIsFormValid(!!isValid);
  };

  const transactionErrorModal = (errorText: string) => {
    const modal = Modal.error({
      title: errorText,
    });

    setTimeout(() => {
      modal.destroy();
    }, 3000);
  };

  const transactionSuccessModal = () => {
    const modal = Modal.success({
      title: 'Added successfully!',
    });

    setTimeout(() => {
      modal.destroy();
    }, 3000);
  };

  const formOnFinishHandler = async (values: AddTransactionFormValues) => {
    const myDatetime = values.datetime?.toISOString().slice(0, 19).replace('T', ' ') || '';

    const { author, sum, category, comment } = values;
    const newTransaction = {
      author,
      sum,
      category,
      comment,
      datetime: myDatetime,
    };

    try {
      await axios.post(`http://localhost:8000/transactions`, newTransaction);

      transactionSuccessModal();
      form.resetFields();
      setIsFormValid(false);
    } catch {
      transactionErrorModal('Something went wrong!');
    }
  };

  const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    form.setFieldsValue({ sum: numericValue ? Number(numericValue) : null });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Title level={3}>Добавить новую транзакцию</Title>
      <Form
        form={form}
        style={{ maxWidth: '600px', width: '100%' }}
        name='basic'
        autoComplete='off'
        onFinish={formOnFinishHandler}
        onValuesChange={validateForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
      >
        <div>
          <Form.Item name='author' label='Author' rules={[{ required: true, message: 'Please input author!' }]}>
            <Input onChange={(event) => form.setFieldsValue({ author: event.target.value })} maxLength={255} />
          </Form.Item>
          <Form.Item name='sum' label='Sum' rules={[{ required: true, message: 'Please input sum!' }]}>
            <Input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              onChange={(event) => handleSumChange(event)}
              maxLength={10}
              value={form.getFieldValue('sum')}
            />
          </Form.Item>
          <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please select category!' }]}>
            <Select options={selectOptions} onChange={(value) => form.setFieldsValue({ category: value })} />
          </Form.Item>
          <Form.Item name='datetime' label='Datetime' rules={[{ required: true, message: 'Please select date!' }]}>
            <DatePicker style={{ width: '100%' }} onChange={(value) => form.setFieldsValue({ datetime: value })} />
          </Form.Item>
          <Form.Item name='comment' label='Comment' required={false}>
            <TextArea
              showCount
              maxLength={255}
              style={{ resize: 'none' }}
              onChange={(event) => {
                const value = event.target?.value;
                if (value !== undefined) {
                  form.setFieldsValue({ comment: value });
                }
              }}
            />
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }} disabled={!isFormValid}>
            Добавить транзакцию
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
