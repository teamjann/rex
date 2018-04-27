import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Auth from './Authentication/Auth';

class Landing extends Component {
  // state = {
  //   login: false,
  //   signup: false,

  handleLoginClick() {
    return <Auth handleAuth={this.props.handleAuth} />;
  }

  render() {
    return (
      <div className="landing">
        {/* {<!-- Page Wrapper -->} */}
        {/* <!-- Header --> */}
        <header id="header" className="alt">
          <h1>
            <a href="index.html">Rex</a>
          </h1>
          <nav id="nav">
            <ul>
              <li className="login">
                <Link to="/login" />
                <span>Login </span>
              </li>
            </ul>
          </nav>
        </header>

        {/* <!-- Banner --> */}
        <section id="banner">
          <div className="inner">
            <h2 className="title-font">Rex</h2>
            <p>The Ultimate List App</p>
            <ul className="actions">
              <li>
                <a href="#" className="button special">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          <a href="#one" className="more scrolly">
            Learn More
          </a>
        </section>

        {/* <!-- One --> */}
        <section id="one" className="wrapper style1 special">
          <div className="inner">
            <header className="major">
              <h2>
                Tired Of Losing Recommendations From Friends?
                <br /> Rex Is the solution you'd kill for!
              </h2>
              <p>
                Imagine a recommendation list driven by social media, Ai, Big Data, Machine
                Learning,
                <br /> Blockchain, and future tech you've never heard of! It keeps track of
                everything
                <br />in one convenient place so you'll never be a sad, friendless dino again!
              </p>
            </header>
            <ul className="icons major">
              <li>
                <span className="icon fas fa-list-ol major style1">
                  <span className="label" />
                </span>
              </li>
              <li>
                <span className="icon far fa-heart major style2">
                  <span className="label">Love</span>
                </span>
              </li>
              <li>
                <span className="icon fas fa-code major style3">
                  <span className="label">Broken</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* <!-- Two --> */}
        <section id="two" className="wrapper alt style2">
          <section className="spotlight">
            <div className="image">
              <img src="images/pic01.jpg" alt="" />
            </div>
            <div className="content">
              <h2>
                Listen to Millions of
                <br />Hours of Music
              </h2>
              <p>
                Every moment out of the house can now be spent with headphones on listening to all
                those songs your friends have recommended. Never interact with another human being
                in-person again!
              </p>
            </div>
          </section>
          <section className="spotlight">
            <div className="image image2">
              <img src="images/pic02.jpg" alt="" />
            </div>
            <div className="content">
              <h2>
                Watch Tv and Eat popcorn
                <br /> for the rest of your life
              </h2>
              <p>
                On second thought, why even leave the house!? Catch up on every Netflix, HBO, and
                Amazon Prime show or movie anyone has ever recommended to you! The remote is your
                real best friend.
              </p>
            </div>
          </section>
          <section className="spotlight">
            <div className="image">
              <img src="images/pic03.jpg" alt="" />
            </div>
            <div className="content">
              <h2>
                Explore Exotic Restaurants
                <br /> And Sexy Cocktail Bars
              </h2>
              <p>
                Who wants to eat or drink in front of other people? Gross! Instead you can sit by
                yourself next to an abandoned warehouse reading about all the amazing restaurants
                you can't afford to try!
              </p>
            </div>
          </section>
        </section>

        {/* <!-- Three --> */}
        <section id="three" className="wrapper style3 special">
          <div className="inner">
            <header className="major">
              <h2>Rex is your new best friend</h2>
              <p>
                Humans are obsolete. Let Rex track and manage any and every thing you do!
                <br /> This is the todo list the Sovie's didn't want you to have in the cold war.
              </p>
            </header>
            <ul className="features">
              <li className="icon fas fa-dove">
                <h3>Friends First</h3>
                <p>
                  Aggregate everything from current friends. Forget about scraps of paper, post-its,
                  emails, notes, messenger pigeons, and Memento tattoos.
                </p>
              </li>
              <li className="icon fas fa-cogs">
                <h3>Machine Driven</h3>
                <p>
                  After you ditch your friends for endless entertainment our algorithm will drive
                  your time. Remember when Netflix did that? This is better.
                </p>
              </li>
              <li className="icon fas fa-couch">
                <h3>Any Entertainment</h3>
                <p>
                  You can track literally <i>anything</i> with Rex. As long as it's a book, movie,
                  song, or restaurant.
                </p>
              </li>
              <li className="icon fas fa-hand-holding-heart">
                <h3>Share with friends</h3>
                <p>
                  You can show off how cultured, rich, and amazing you are by recommending all the
                  things to anyone who will talk to you.
                </p>
              </li>
              <li className="icon fas fa-ambulance">
                <h3>Solitary Confinement</h3>
                <p>
                  If you ever end up in prison confinement, you can spend every moment - that isn't
                  eating, pooping, or crying - optimizing your Rex experience!
                </p>
              </li>

              <li className="icon fab fa-hooli">
                <h3>Make The World Better</h3>
                <p>
                  By using Rex you'll be doing more for humanity than working with orphans, the
                  homeless, and every starving country combined.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* <!-- CTA --> */}
        <section id="cta" className="wrapper style4">
          <div className="inner">
            <header>
              <h2>The Future Is Now</h2>
              <p>
                Bring Rex home tonight, and don't forget to tell your partner, parents, friends, and
                strangers on the street about it. Rex is cooler than being vegan. Trust us!
              </p>
            </header>
            <ul className="actions vertical">
              <li>
                <Link to="/signup" className="button fit special">
                  Sign Up
                </Link>
              </li>
              <li>
                <a href="#" className="button fit">
                  Share
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* <!-- Footer --> */}
        <footer id="footer">
          <ul className="icons">
            <li>
              <a href="#" className="icon fab fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon fab fa-facebook">
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon fab fa-instagram">
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon far fa-envelope">
                <span className="label">Email</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>&copy; Rex</li>
            <li>Design: Tiny Arms Agency</li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default Landing;
