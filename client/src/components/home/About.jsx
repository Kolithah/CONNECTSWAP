import React from "react";

const About = () => {
  return (
    <div className="bg-primary 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="lg:w-10/12 w-full">
        <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
          {" "}
          Our mission is to empower individuals to explore new horizons through
          mutually agreed exchanges.
        </h2>
        <p className="font-normal text-base leading-6 text-primary-content mt-6">
        We are committed to providing a platform that facilitates connections, promotes transparency, and ensures a seamless exchange experience. Through our innovative features and dedicated support, we strive to create an environment where users can discover endless possibilities and achieve their academic and professional goals.
        </p>
      </div>

      <div className="lg:mt-14 sm:mt-10 mt-12">
        <img
          className="lg:block hidden w-full"
          src="https://i.ibb.co/GvwJnvn/Group-736.png"
          alt="Group of people Chilling"
        />
        <img
          className="lg:hidden sm:block hidden w-full"
          src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
          alt="Group of people Chilling"
        />
        <img
          className="sm:hidden block w-full"
          src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
          alt="Group of people Chilling"
        />
      </div>

      <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
        <div className="w-full xl:w-5/12 lg:w-6/12">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
            Our Story
          </h2>
          <p className="font-normal text-base leading-6 text-primary-content mt-4">
          CONNECTSWAP was born out of a shared vision to revolutionize the way people connect and exchange opportunities in Sri Lanka. We recognized the need for a dedicated platform that could facilitate mutually agreed exchanges for students, as well as government and private sector workers. Inspired by the transformative power of exchanges, we set out to create a space where individuals could find like-minded partners and embark on exciting new journeys.
          </p>
          <p className="font-normal text-base leading-6 text-primary-content mt-6">
          With a deep understanding of the challenges faced by students seeking university transfers and professionals looking for branch exchanges, we developed CONNECTSWAP as a solution to streamline the process. Our goal was to make exchanges more accessible, efficient, and secure, while fostering a supportive community of individuals who share the desire for growth and new experiences.
          </p>
        </div>
        <div className="lg:flex items-center w-full lg:w-1/2 ">
          <img
            className="lg:block hidden w-full"
            src="https://i.ibb.co/2kxWpNm/Group-740.png"
            alt="people discussing on board"
          />
          <img
            className="lg:hidden sm:block hidden w-full h-3/4"
            src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
            alt="people discussing on board"
          />
          <img
            className="sm:hidden block w-full"
            src="https://i.ibb.co/9g2R7Xr/Group-803.png"
            alt="people discussing on board"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
