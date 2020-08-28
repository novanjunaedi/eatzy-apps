import DicodingRestaurantSource from '../../data/dicodingresto-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    const hero = document.querySelector('.hero');
    hero.style.display = 'flex';
    return `
      <section class="content">
          <div class="explore">
              <h1 class="explore__label">Explore Restaurant</h1>
              <div class="home-loader"></div>
              <div class="restaurants" id="restaurants">

              </div>
          </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingRestaurantSource.restaurantList();
    const restaurantContainer = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
