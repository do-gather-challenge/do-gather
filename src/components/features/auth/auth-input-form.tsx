import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// type InPutFormProps = {
//   control: Control<{
//     email: string;
//     password: string;
//   }>;
//   label: string;
//   type: string;
//   placeholder: string;
// };

const AuthInputForm = ({ control, label, type, placeholder, name }: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthInputForm;
