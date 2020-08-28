import API_ENDPOINT from '../globals/api-endpoint';

class DicodingRestaurantSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    if (response) {
      document.querySelector('.home-loader').style.display = 'none';
      return responseJson.restaurants;
    } else {
      throw new Error('Sorry, this page is not working.');
    }
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    if (response) {
      document.querySelector('.loader').style.display = 'none';
      return response.json();
    } else {
      throw new Error('Sorry, page not found.');
    }
  }

  static async review(id) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(id),
    };

    const response = await fetch(API_ENDPOINT.REVIEW, options);
    const responseJson = await response.json();
    return responseJson.customerReviews;
  }
}

export default DicodingRestaurantSource;
