import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '../assets/icons/ArrowIcon';
import AppointmentsIcon from '../assets/icons/AppointmentsIcon';
import MessagesIcon from '../assets/icons/MessagesIcon';
import BulletinIcon from '../assets/icons/BulletinIcon';
import FlowerIcon from '../assets/icons/FlowerIcon';
import routes from '../routes/routes';
import cn from 'classnames';

const HomePage: React.FC = () => {
  return (
    <div className={cn('page', 'home')}>
      <div className="container">
        <div className="home__content">
          <h2 className={cn('title_1', 'home__title')}>Welcome back Joshua!</h2>
          <ul className="home__options">
            <li className={cn('home__option', 'home__option_findCenter')}>
              <Link
                to={routes.SEARCH_PAGE.path}
                className={cn(
                  'home__optionLink',
                  'home__optionLink_findCenter',
                )}
              >
                Find a local COVID-19 testing center
              </Link>
              <ArrowIcon direction="right" fill="#ffffff" />
            </li>
            <li className={cn('home__option', 'home__option_userOption')}>
              <AppointmentsIcon className="home__userOptionIcon" />
              <div className="home__textWrap">
                <Link
                  to={routes.SEARCH_PAGE.path}
                  className={cn(
                    'home__optionLink',
                    'home__optionLink_userOption',
                  )}
                >
                  Appointments
                </Link>
                <p className="home__optionText">Scheduled or Walk-in</p>
              </div>
            </li>
            <li className={cn('home__option', 'home__option_userOption')}>
              <MessagesIcon className="home__userOptionIcon" />
              <div className="home__textWrap">
                <Link
                  to={routes.SEARCH_PAGE.path}
                  className={cn(
                    'home__optionLink',
                    'home__optionLink_userOption',
                  )}
                >
                  Messages
                </Link>
                <p className="home__optionText">You have two new messages</p>
              </div>
            </li>
            <li className={cn('home__option', 'home__option_userOption')}>
              <BulletinIcon className="home__userOptionIcon" />
              <div className="home__textWrap">
                <Link
                  to={routes.SEARCH_PAGE.path}
                  className={cn(
                    'home__optionLink',
                    'home__optionLink_userOption',
                  )}
                >
                  Bulletin
                </Link>
                <p className="home__optionText">
                  Latest updates from your offices
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="home__balloonImg"></div>
      <FlowerIcon className="home__flowerIcon" />
    </div>
  );
};

export default HomePage;
