import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LogoDesktop from '../../assets/icons/LogoDesktop';
import LogoMobile from '../../assets/icons/LogoMobile';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import userImage from '../../assets/images/user-default.jpg';
import s from './Header.module.scss';
import appearTransition from '../../assets/styles/transitions/appear-transition.module.scss';

const Header: React.FC = () => {
  const [language, setLanguage] = useState<string>('ENG');
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState<boolean>(
    false,
  );

  const toggleIsLanguageSelectorOpen = () => {
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  };

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__content}>
          <LogoDesktop />
          <LogoMobile />
          {/* <div className={s.account}>
        <img src={userImage} alt="user" className={s.userImage} />
        <HamburgerIcon />
      </div> */}
          <div className={s.languageSelector}>
            <button
              className={s.languageSelector__btn}
              type="button"
              onClick={toggleIsLanguageSelectorOpen}
            >
              <span className={s.languageSelector__btnText}>{language}</span>
              <span>
                <ArrowIcon
                  direction="down"
                  fill="#38417c"
                  open={isLanguageSelectorOpen}
                />
              </span>
            </button>

            <CSSTransition
              in={isLanguageSelectorOpen}
              timeout={300}
              classNames={appearTransition}
              unmountOnExit
            >
              <ul className={s.languageSelector__list}>
                <li className={s.languageSelector__listItem}>
                  <button
                    className={s.languageSelector__listItemBtn}
                    onClick={() => {
                      setLanguage('ENG');
                      setIsLanguageSelectorOpen(false);
                    }}
                  >
                    ENG
                  </button>
                </li>
                <li className={s.languageSelector__listItem}>
                  <button
                    className={s.languageSelector__listItemBtn}
                    onClick={() => {
                      setLanguage('GER');
                      setIsLanguageSelectorOpen(false);
                    }}
                  >
                    GER
                  </button>
                </li>
                <li className={s.languageSelector__listItem}>
                  <button
                    className={s.languageSelector__listItemBtn}
                    onClick={() => {
                      setLanguage('RU');
                      setIsLanguageSelectorOpen(false);
                    }}
                  >
                    RU
                  </button>
                </li>
              </ul>
            </CSSTransition>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
