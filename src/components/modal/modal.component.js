import React, { useState, useRef } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'

import { ModalBackDrop, ModalContainer, ModalHeader, InputField, InputSubmit, ModalText, ErrorText } from './modal.styles'

export const Modal = (props) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const email = useRef({})
  email.current = watch('email', '')

  const onSubmit = (data) => {
    setIsLoading(true)
    axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {'name': data.name, 'email': data.email})
    .then((res) => {
      setIsLoading(false)
      if (res.data === 'Registered') {
        setSubmitted(true)
      }
    })
    .catch((error) => {
      setIsLoading(false)
      setError(error.response.data.errorMessage)
    })
  }

  return (
    <ModalBackDrop aria-label='modal-backdrop' onClick={props.close}>
      <ModalContainer onClick={e => {e.stopPropagation()}}>
        {submitted ? 
        <>
          <ModalHeader>All Done</ModalHeader>
          <ModalText>You will be the first to experience Broccoli &amp; Co. when we launch.</ModalText>

          <InputSubmit type='submit' value='Ok' onClick={props.close} />
        </> :
        <>
          <ModalHeader>Request an Invite</ModalHeader>
          {error && <ErrorText>{error}</ErrorText>}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField 
              type='text' 
              name='name' 
              aria-label='name'
              placeholder='Full Name' 
              ref={register({ 
                required: 'Name is required', 
                minLength: {
                  value: 3,
                  message: 'Name must have at least 3 characters'
                }
              })} />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            <InputField 
              type='email' 
              name='email' 
              aria-label='email'
              placeholder='Email'
              ref={register({ 
                required: 'Email is required', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Must be a valid email address'
                }
              })} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <InputField 
              type='email' 
              name='emailConfirm' 
              aria-label='email confirm'
              placeholder='Confirm Email'
              ref={register({
                required: 'Confrimation email is required',
                validate: value => value === email.current || "Emails must match"
              })} />
              {errors.emailConfirm && <ErrorText>{errors.emailConfirm.message}</ErrorText>}

            <InputSubmit type='submit' value={isLoading ? 'Sending, please wait...' : 'Send'} disabled={isLoading} />
          </form>
        </>
        }

      </ModalContainer>
    </ModalBackDrop>
  )

}