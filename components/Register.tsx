'use client'
import { Button, Callout, Flex } from "@radix-ui/themes";
import { Input } from "@heroui/react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
}

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterForm>();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axios.post('/api/newsletter', data);
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Subscribed successfully! 🎉');
        setError(null);
        reset();
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <Flex direction='column' gap='3' className="w-full">
      {/* Mesaje de stare cu animație simplă */}
      {error && (
        <Callout.Root color="red" variant="surface" size="1">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      {successMessage && (
        <Callout.Root color="green" variant="surface" size="1">
          <Callout.Text>{successMessage}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input
            size="sm"
            variant="bordered"
            placeholder="Your Name"
            {...register('name', { required: 'Name is required' })}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            classNames={{ inputWrapper: "bg-white" }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            size="sm"
            variant="bordered"
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            classNames={{ inputWrapper: "bg-white" }}
          />
        </div>

        <Button
          variant="classic"
          color="grass"
          highContrast
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer shadow-md hover:shadow-lg transition-all"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
        </Button>
      </form>
    </Flex>
  );
}

export default Register;