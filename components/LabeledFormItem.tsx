import { FC } from 'react';
import { FormItem, FormMessage } from './ui/form';
import { FormLabel } from '@mui/material';
import { subTitle } from '@/fonts/font';

interface LabeledFormItemProps {
  label: string;
  children: React.ReactNode;
}

const LabeledFormItem: FC<LabeledFormItemProps> = ({ label, children }) => {
  return (
    <FormItem>
      <FormLabel>
        <div className={`${subTitle.className} pb-2 md:p-4 rounded-lg text-lg`}>
          {label}
        </div>
      </FormLabel>
      {children}
      <FormMessage />
    </FormItem>
  );
};
export default LabeledFormItem