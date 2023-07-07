import React from "react";
import "./AboutUs.css";
import About_img from "../../assets/37963.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="aboutUS">
        <div className="heading_about">
          <h1>about us</h1>
          <p>
            Welcome to our movie website! We are passionate about cinema and
            dedicated to bringing you the best movie-related content.
          </p>
        </div>
        <div className="container_about">
          <section className="about">
            <div className="about_img">
              <img src={About_img} alt="" />
            </div>
            <div className="about__contact">
              <h2>At Z-Movie</h2>
              <p>
                we believe that movies have the power to inspire, entertain, and
                provoke meaningful conversations. Our goal is to curate a
                diverse collection of films, spanning various genres, languages,
                and eras, so that every movie lover can find something that
                resonates with them. From critically acclaimed masterpieces to
                hidden gems, we strive to showcase a wide range of cinematic
                works that capture the essence of storytelling.
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
