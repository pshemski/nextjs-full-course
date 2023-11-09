import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/przemek.jpeg'}
          alt='Image of Przemek'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Przemek</h1>
      <p>
        I am learning new technics in web development using React, NextJS and
        Typescript
      </p>
    </section>
  );
}

export default Hero;
