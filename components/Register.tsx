'use client'
import { Button, Callout, Container, Flex } from "@radix-ui/themes";
import { Form, Input } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from "axios";
import { useState } from "react";


interface Register {
  name: string;
  email: string;
}

const Register = () => {

  const { register, handleSubmit, reset,  formState: { errors }} = useForm<Register>();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: Register) => {
    try {
      const response = await axios.post('/api/register', data);
      if (response.status === 200) {
        setSuccessMessage('Registration successful! 🎉');
        setError(null); // Resetăm eroarea dacă totul a mers bine
        // Resetează formularul
        reset();
        // Ascunde mesajul de succes după 3 secunde
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError.response) {
          if (axiosError.response.data.error === "User already exists") {
            setError("Email already registered. Please try logging in.");
          } else {
            setError(axiosError.response.data.error || 'An unexpected error occurred.');
          }
        } else {
          setError('No response from server. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return(
    <Flex direction='column' gap='2'>

    {error && (
      <Callout.Root>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    )}
    {successMessage && (
      <Callout.Root>
        <Callout.Text>{successMessage}</Callout.Text>
      </Callout.Root>
    )}

      <Form
      onSubmit={handleSubmit(onSubmit)}>

      <Flex gap='4' align='end' direction={{ initial : "column", md: "row"}}>

      <Container>
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <Input
          isRequired
          placeholder="First Name"
          type="text"
          {...register('name', { required: 'First name is required' })}/>
        </Container>

       <Container>
       {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <Input
          isRequired
          placeholder="Email"
          type="email"
          {...register('email', { required : 'Email is required'})}
        />
        </Container>

          <Button variant="outline" color="bronze" type="submit">
            Sign Up
          </Button>

        </Flex>
    </Form>
    </Flex>
 )
}
export default Register