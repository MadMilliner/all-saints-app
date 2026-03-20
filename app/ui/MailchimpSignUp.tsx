'use client'

export default function MailchimpSignupForm()
{
  return (
    <div id="mc_embed_shell" className="w-fit mx-auto">
      {/* <link
        href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
        rel="stylesheet"
        type="text/css"
      /> */}
      <div id="mc_embed_signup" className="h-fit w-fit max-w-[95vw]">
        <form
          action="https://church.us8.list-manage.com/subscribe/post?u=aa847f2cf797cd81345254d24&amp;id=d05d9d807d&amp;f_id=003ae9e2f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2 className="text-left h-full w-full">Sign Up to stay in touch!</h2>
            <div className="mx-[4%] font-extralight text-xs overflow-hidden">
              <span className="text-red-400">*</span> indicates required
            </div>

            <div className="mc-field-group mt-3">
              <label htmlFor="mce-EMAIL">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className="required email text-black rounded-lg"
                id="mce-EMAIL"
                required
              />
            </div>

            <div className="mc-field-group input-group mt-3">
              <strong>Email Format </strong>
              <ul className="flex flex-wrap text-sm">
                <li>
                  <input
                    type="radio"
                    name="EMAILTYPE"
                    id="mce-EMAILTYPE0"
                    value="html"
                    className="appearance-auto size-3"
                  />
                  <label htmlFor="mce-EMAILTYPE0">html</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="EMAILTYPE"
                    id="mce-EMAILTYPE1"
                    value="text"
                    className="appearance-auto size-3"
                  />
                  <label htmlFor="mce-EMAILTYPE1">text</label>
                </li>
              </ul>
            </div>

            <div hidden>
              <input type="hidden" name="tags" value="5462987" />
            </div>

            <div id="mce-responses" className="clear">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: 'none' }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: 'none' }}
              ></div>
            </div>

            {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input
                type="text"
                name="b_aa847f2cf797cd81345254d24_d05d9d807d"
                tabIndex={-1}
                defaultValue=""
              />
            </div>

            <div className="clear">
              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button mt-3"
              >
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}