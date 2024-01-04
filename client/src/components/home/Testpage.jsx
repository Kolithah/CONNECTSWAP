import React from "react";

const Testpage = () => {
  return (
    <div>
      <section className="bg-base-100">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-poppins font-semibold text-gray-800  lg:text-4xl dark:text-white">
          Empowering Exchanges with <br></br>
            <span className="underline decoration-primary">Innovative Features</span>
          </h1>

          <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
          Explore our range of innovative features designed to streamline the process, enhance security, and maximize your chances of finding the perfect exchange partner.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 space-y-3 border-2 border-primary rounded-xl">
              <span className="inline-block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </span>

              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                User friendly design
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
              Our platform is fully optimized for best experience, allowing you to connect, communicate, and explore exchange options wherever you are
              </p>

            
            </div>

            <div className="p-8 space-y-3 border-2 border-primary rounded-xl">
              <span className="inline-block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </span>

              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                Easy to customiztions
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
              Tailor your profile to showcase your unique preferences, requirements, and desired exchange options. Stand out from the crowd and attract compatible exchange partners who resonate with your goals and aspirations.
              </p>

              
            </div>

            <div className="p-8 space-y-3 border-2 border-primary rounded-xl">
              <span className="inline-block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </span>

              <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                Simple and Secure Communication
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
              We prioritize your privacy and security. Our platform provides a secure messaging system that allows you to communicate with potential exchange partners without compromising your personal information. Feel confident in building connections while keeping your data safe
              </p>

            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testpage;
