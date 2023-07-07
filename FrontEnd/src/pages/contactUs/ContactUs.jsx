import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <>
      <section className="contact_us">
        <div>
          <div class="landing_page">
            <div class="responsive-container-block big-container">
              <img
                class="bg-img"
                id="iq5bf"
                src="https://images.pexels.com/photos/5826828/pexels-photo-5826828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <div class="responsive-container-block container">
                <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
                  <div class="content-box">
                    <p class="text-blk section-head">Contact us Now </p>
                    <p class="text-blk section-subhead">
                      now you can contact us directly{" "}
                    </p>
                    <div class="icons-container">
                      <a
                        class="share-icon"
                        href="https://github.com/Movie-Project-G1"
                      >
                        <img
                          class="img"
                          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                        />
                      </a>
                      <a
                        class="share-icon"
                        href="https://github.com/Movie-Project-G1"
                      >
                        <img
                          class="img"
                          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                        />
                      </a>
                      <a
                        class="share-icon"
                        href="https://github.com/Movie-Project-G1"
                      >
                        <img
                          class="img"
                          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                        />
                      </a>
                      <a
                        class="share-icon"
                        href="https://github.com/Movie-Project-G1"
                      >
                        <img
                          class="img"
                          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
                  id="i1zj"
                >
                  <form class="form-box">
                    <div class="container-block form-wrapper">
                      <p class="text-blk contactus-head">
                        <a class="link" href=""></a>
                        Get a quote
                      </p>
                      <p class="text-blk contactus-subhead">
                        We will get back to you in 24 hours
                      </p>
                      <div class="responsive-container-block">
                        <div
                          class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                          id="i10mt-7"
                        >
                          <input
                            class="input"
                            id="ijowk-7"
                            name="FirstName"
                            placeholder="First Name"
                          />
                        </div>
                        <div
                          class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                          id="i1ro7"
                        >
                          <input
                            class="input"
                            id="indfi-5"
                            name="Last Name"
                            placeholder="Last Name"
                          />
                        </div>
                        <div
                          class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial"
                          id="ityct"
                        >
                          <input
                            class="input"
                            id="ipmgh-7"
                            name="Email"
                            placeholder="Email"
                          />
                        </div>
                        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                          <input
                            class="input"
                            id="imgis-6"
                            name="PhoneNumber"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div
                          class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                          id="i634i-7"
                        >
                          <textarea
                            aria-placeholder="Type message here"
                            class="textinput"
                            id="i5vyy-7"
                            placeholder="Type message here"
                          ></textarea>
                        </div>
                      </div>
                      <button class="submit-btn">Contact us</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
