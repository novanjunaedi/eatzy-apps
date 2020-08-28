import UrlParser from '../../routes/url-parser';
import DicodingRestaurantSource from '../../data/dicodingresto-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    const hero = document.querySelector('.hero');
    hero.style.display = 'none';
    return `
      <section class="content">
        <div class="loader"></div>
        <div class="post"></div>
        <h3 class="errorMessage">404 Not Found.</h3>
      </section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await DicodingRestaurantSource.detailRestaurant(url.id);
    if (detail.length === 0) {
      document.querySelector('.errorMessage').style.display = 'block';
    } else {
      document.querySelector('.errorMessage').style.display = 'none';
    }
    let categories = '';
    let foods = '';
    let drinks = '';
    let reviews = '';
    detail.restaurant.categories.forEach((category) => {
      categories += `
        <p>${category.name}</p>
      `;
    });
    detail.restaurant.menus.foods.forEach((food) => {
      foods += `
        <p class="restaurant__foods-item">${food.name}</p>
      `;
    });
    detail.restaurant.menus.drinks.forEach((drink) => {
      drinks += `
        <p class="restaurant__drinks-item">${drink.name}</p>
      `;
    });
    detail.restaurant.consumerReviews.forEach((review) => {
      reviews += `
      <div class="reviews-item">
        <div class="reviews-item__content">
          <h4 class="reviewer__name">${review.name}</h4>
          <p class="review__text">"${review.review}"</p>
          <p class="reviews-item__date">${review.date}</p>
        </div>
      </div>
      `;
    });
    const detailContainer = document.querySelector('.post');
    detailContainer.innerHTML = createRestaurantDetailTemplate(
      detail, categories, foods, drinks, reviews,
    );
    const enterName = document.querySelector('#enterName');
    const enterReview = document.querySelector('#enterReview');
    const btnSubmit = document.querySelector('.btnSubmit');
    btnSubmit.addEventListener('click', () => {
      const reviewJson = {
        id: url.id,
        name: enterName.value,
        review: enterReview.value,
      };
      if (reviewJson.name === '' || reviewJson.review === '') {
        return null;
      } else {
        DicodingRestaurantSource.review(reviewJson);
        location.reload();
      }
    });

    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: detail.restaurant.id,
        name: detail.restaurant.name,
        pictureId: detail.restaurant.pictureId,
        description: detail.restaurant.description,
        city: detail.restaurant.city,
        rating: detail.restaurant.rating,
        categories: detail.categories,
        foods: detail.foods,
        drinks: detail.drinks,
        reviews: detail.reviews,
      },
    });
  },
};

export default Detail;
