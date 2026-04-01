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

            <div className="mc-field-group mt-3 flex flex-col">
              <label htmlFor="mce-EMAIL">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                required
                placeholder=" "
                className="peer required email text-black rounded-lg border-2 border-transparent outline-none p-2 mt-1 focus:ring-2 focus:ring-[var(--var-rnbw5)] invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
              />
              <span className="mt-1 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid email address
              </span>
            </div>

            <div className="mc-field-group input-group mt-3">
              <strong>Email Format </strong>
              <ul className="flex flex-col gap-1 items-start text-sm">
                <li className="flex justify-center">
                  <input
                    type="radio"
                    name="EMAILTYPE"
                    id="mce-EMAILTYPE0"
                    value="html"
                    className="appearance-auto size-3"
                  />
                  <label htmlFor="mce-EMAILTYPE0">html</label>
                </li>
                <li className="flex justify-center gap-0">
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