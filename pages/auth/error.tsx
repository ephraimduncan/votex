import { Theme } from "next-auth"
import { InternalUrl } from "next-auth/utils/parse-url"

/**
 * The following errors are passed as error query parameters to the default or overridden error page.
 *
 * [Documentation](https://next-auth.js.org/configuration/pages#error-page) */
export type ErrorType =
  | "default"
  | "configuration"
  | "accessdenied"
  | "verification"

export interface ErrorProps {
  url?: InternalUrl
  theme?: Theme
  error?: ErrorType
}

export default function ErrorPage(props: ErrorProps) {
  const { url, theme } = props
  const signinPageUrl = `${url}/signin`

  return (
    <div className="error">
      {theme?.brandColor && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `,
          }}
        />
      )}
      {theme?.logo && <img src={theme.logo} alt="Logo" className="logo" />}
      <div className="card">
        <h1>Access Denied. You need a Student Email to vote</h1>
        <div className="message">
          <div>
            <p>You do not have permission to sign in.</p>
            <p>
              <a className="button" href={signinPageUrl}>
                Sign in with Student Email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
