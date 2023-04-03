let apiLoaded = false;

const createMap = ({id, initials, placemark}) => {
  const map = new window.ymaps.Map(id, initials);
  map.geoObjects.add(new window.ymaps.Placemark(map.getCenter(), ...placemark));
};

export function initMap(mapData) {
  document.querySelector('.contact__map--image').style.display = 'none';
  if (apiLoaded) {
    createMap(mapData);

    return;
  }

  const scriptElement = document.createElement('script');
  scriptElement.async = true;
  scriptElement.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  scriptElement.addEventListener('load', () => {
    window.ymaps.ready(() => {
      createMap(mapData);
      apiLoaded = true;
    });
  });
  document.body.append(scriptElement);
}

// const map = document.getElementById('map');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    initMap({
      id: 'map',
      initials: {
        center: [59.938405, 30.322923],
        controls: [],
        zoom: 15,
      },
      placemark: [{
        hintContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8',
      },
      {
        iconImageHref: 'img/svg/icon-pin.svg',
        iconImageSize: [18, 22],
        iconLayout: 'default#image',
        iconShadow: false,
      }],
    });

    // observer.unobserve(map);
  }
}, {
  rootMargin: '0px',
  threshold: 0,
});

observer.observe(map);
