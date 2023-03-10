import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utility';

import FormInput from '../FormInput/FormInput.component';
import Button from '../Button/Button.component';

import './SignUpForm.styles.scss';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function handleSubmitSignUpForm(event) {
    event.preventDefault();

    if (password != confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(response.user, { displayName });
      resetFromFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Error creating user account');
      } else {
        console.log('error signing up', error);
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmitSignUpForm}>
        <FormInput
          labelOptions={{
            label: 'Display Name',
            htmlFor: 'displayName',
          }}
          inputOptions={{
            required: true,
            type: 'text',
            name: 'displayName',
            value: displayName,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Email',
            htmlFor: 'email',
          }}
          inputOptions={{
            required: true,
            type: 'email',
            name: 'email',
            value: email,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Password',
            htmlFor: 'password',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'password',
            value: password,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Confirm Password',
            htmlFor: 'confirmPassword',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'confirmPassword',
            value: confirmPassword,
            onChange: handleInputChange,
          }}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
