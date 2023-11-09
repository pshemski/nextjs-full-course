// import { useState } from 'react';
import { useState, useRef, useEffect } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState(); // pending, success, error
  const [errorMessage, setErrorMessage] = useState();
  const formRef = useRef();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    try {
      await sendContactData({
        name: enteredName,
        email: enteredEmail,
        message: enteredMessage,
      });
      setRequestStatus('success');
      formRef.current.reset();
    } catch (error) {
      setErrorMessage(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Your message has been sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: errorMessage,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form
        className={classes.form}
        onSubmit={sendMessageHandler}
        ref={formRef}
      >
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='meassage'>Your Meassage</label>
          <textarea id='message' rows='5' ref={messageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
