import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator as ApplicationActionCreator} from "../../reducers/application/application";
import {Error} from "../../api";
import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {Operation as UserOperation, ActionCreator} from "../../reducers/user/user";
import {PageType} from "../../types";
import {getLoginError} from "../../reducers/user/selectors";


interface Props {
  loginError?: {response: string};
  login: ({email, password}: {email: string; password: string}) => void;
  setLoginError: (error: object) => void;
  onOpenSignInPage: () => void;
}


const getErrorMessage = (loginError) => {
  switch (true) {
    case loginError === null:
      return null;

    case loginError.response === Error.VALIDATION:
      return `Please enter a valid email address`;

    case loginError.response && loginError.response.status === Error.BAD_REQUEST:
    default:
      return (`We can’t recognize this email
and password combination. Please try again.`);
  }
};


const getEmailValidation = (emailValue) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(emailValue).toLowerCase());
};


class SignInComponent extends React.PureComponent<Props, {}> {
  private emailRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onOpenSignInPage();
  }

  componentDidUpdate() {
    this.props.onOpenSignInPage();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (getEmailValidation(this.emailRef.current.value)) {
      this.props.login({
        email: this.emailRef.current.value,
        password: this.passwordRef.current.value,
      });
    } else {
      this.props.setLoginError({
        response: Error.VALIDATION,
      });
    }
  }

  render() {
    const {loginError} = this.props;

    const errorMessage = loginError ? getErrorMessage(loginError) : null;

    return (
      <div className="user-page">
        <Header />

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            onSubmit={this.handleSubmit}>

            {errorMessage &&
              <div className="sign-in__message">
                <p style={{whiteSpace: `pre-wrap`}}>{errorMessage}</p>
              </div>}

            <div className="sign-in__fields">
              <div className={`sign-in__field ${loginError && loginError.response === Error.VALIDATION && `sign-in__field--error`}`}>
                <input ref={this.emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={this.passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>

            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loginError: getLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  setLoginError(error) {
    dispatch(ActionCreator.setLoginError(error));
  },
  onOpenSignInPage() {
    dispatch(ApplicationActionCreator.changeActivePage(PageType.SIGN_IN));
  },
});

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInComponent);


export {
  SignInComponent,
  SignIn,
};
