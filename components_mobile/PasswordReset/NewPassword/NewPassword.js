import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./NewPassword.module.scss";
import { passwordVisibilitySvg } from "./svg";
import { arrowNextSvg } from "../../SearchFlightForm/svg";

import { i18n } from "../../../i18n";

export default function NewPassword_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`newPassword:${key}`);
  };

  const router = useRouter();
  const [password, setPassword] = useState("");

  const [isValidPassword, setIsValidPassword] = useState(false);
  const submitForm = (evt) => {
    evt.preventDefault();
  };

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);

    const target = evt.target.value;
    const len = target.length;

    if (len === 0) {
      hideNextBtn();
    } else {
      showNextBtn();
    }

    if (len > 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }

    // Indicate strength password
    const passwordWeak = document.querySelector(`.${styles.passwordWeak}`);
    const passwordStrong = document.querySelector(`.${styles.passwordStrong}`);
    if (len < 10) {
      passwordWeak.classList.add(styles.passwordWeakShow);
      passwordStrong.classList.remove(styles.passwordStrongShow);
    } else {
      passwordStrong.classList.add(styles.passwordStrongShow);
      passwordWeak.classList.remove(styles.passwordWeakShow);
    }

    // Toggle display for `Show password` icon
    const passIcon = document.querySelector(
      `.${styles.passwordVisibilityIcon}`
    );
    if (len !== 0) {
      passIcon.style.display = "block";
    } else {
      passIcon.style.display = "none";
    }
  };
  const togglePasswordVisibility = () => {
    const passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const showNextBtn = () => {
    const next = document.querySelector(`.${styles.next}`);
    next.classList.remove(styles.displayNone);
    next.classList.add(styles.displayFlex);
  };
  const hideNextBtn = () => {
    const next = document.querySelector(`.${styles.next}`);
    next.classList.add(styles.displayNone);
    next.classList.remove(styles.displayFlex);
  };

  const toAuthorization = () => {
    if (isValidPassword) {
      router.push("/auth");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {getLanguageSpecificContent("title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("subtitle")}
        </div>
      </div>

      <form noValidate onSubmit={submitForm}>
        <div className={styles.passwordC}>
          <label>
            <input
              name='password'
              type='password'
              id='password'
              minLength='6'
              required
              spellCheck='false'
              autoComplete='off'
              value={password}
              onChange={(evt) => onChangePassword(evt)}
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.passwordVisibilityIcon}
            >
              {passwordVisibilitySvg}
            </span>
            <span className={styles.passwordPlaceholder}>
              {getLanguageSpecificContent("passwordPlaceholder")}
            </span>
          </label>

          <div className={styles.passworIndicatorC}>
            <span>{getLanguageSpecificContent("passwordIndicator-1")}</span>
            <span className={styles.passwordWeak}>
              {getLanguageSpecificContent("passwordIndicator-2")}
            </span>
            <span className={styles.passwordStrong}>
              {getLanguageSpecificContent("passwordIndicator-3")}
            </span>
          </div>
        </div>
        <div className={`${styles.next} ${styles.displayNone}`}>
          <a>{getLanguageSpecificContent("cancel")} </a>

          <button onClick={toAuthorization} type='submit'>
            <span>{getLanguageSpecificContent("continue")}</span>
            <span>{arrowNextSvg}</span>
          </button>
        </div>
      </form>
      <div className={styles.actionsGroup}>
        <a>
          <span>{getLanguageSpecificContent("cancel")}</span>
        </a>
      </div>
      <div className={styles.bottomMessage}>
        {getLanguageSpecificContent("bottomMessage")}
      </div>
    </div>
  );
}
