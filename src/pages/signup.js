import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUserNameExist } from '../services/firebase';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === '';
  const handleSignup = async (event) => {
    event.preventDefault();

    const userNameExists = await doesUserNameExist(userName);
    if (userNameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .CreatedUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.UpdateProfile({
          displayName: userName,
        });

        await firebase.firestore().Collection('users').Add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          dateCreated: Date.Now(),
        });

        history.push(Routes.Dashboard);
      } catch (error) {}
    }

    try {
      console.log('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = 'Instagram - Signup';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          className="w-200"
          alt="iphone with profile"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-2 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="enter your Username"
              type="text"
              placeholder="Username"
              className="text-small text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
            />
            <input
              aria-label="enter your Full Name"
              type="text"
              placeholder="Full name"
              className="text-small text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-small text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="enter your password"
              type="password"
              placeholder="password"
              className="text-small text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              aria-label="button for submitting"
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && 'opacity-50'}`}
            >
              Signup
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Do you have an account already?
            <Link to={ROUTES.Login} className="font-bold text-blue-medium">
              &nbsp;Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
