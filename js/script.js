const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 3,
  centeredSlides: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1040: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 5
    },
    425: {
      slidesPerView: 4,
    },
  }
});



const menu = document.querySelector('.nav');
const menuBtn = document.querySelector('.header-burger');
const body = document.querySelector('body');

if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuBtn.classList.remove('active');
      body.classList.remove('lock');
    })
  })
};



// Плавный скролл до блоков
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Модальное окно
const modal = document.querySelector('.modal');

function openModal() {
  modal.classList.add('active');
  body.classList.add('lock');
}

function closeModal() {
  modal.classList.remove('active');
  body.classList.remove('lock');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    body.classList.remove('lock');
  }
});



// Вернуться наверх страницы
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTop = document.querySelector(".scroll-to-top");
 
  // Показать/скрыть кнопку при прокрутке страницы
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 200) {
      scrollToTop.classList.add('active');
    } else {
      scrollToTop.classList.remove('active');
    }
  });
 
  // Плавная прокрутка при клике на кнопку
  scrollToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});



// Маска для номера телефона
document.addEventListener("DOMContentLoaded", function () {
  let phoneInputs = document.querySelectorAll('input[data-tel-input]');

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  let onPhonePaste = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  let onPhoneInput = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
})
