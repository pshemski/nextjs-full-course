import Head from 'next/head';

import ContactForm from '@/components/contact/contact-form';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Form</title>
        <meta name='Contact form' content='Ask me a question' />
      </Head>
      <ContactForm />
    </>
  );
}

export default Contact;
