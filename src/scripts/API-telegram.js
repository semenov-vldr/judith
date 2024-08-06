// Отправка данных формы в Телеграм
const TOKEN = "6388509099:AAFIQyVlZ4MapEiXhH2vQJh8CyZFgFoJ_mA";
const CHAT_ID = "-1002008090284";
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

const forms = document.querySelectorAll("form.form");
if (forms) {
  forms.forEach(form => form.addEventListener("submit", sendMessageTelegram));
}

function sendMessageTelegram (evt) {
  evt.preventDefault();

  const typeConnection = this.querySelector(".form__connection-fieldset input[type='radio']:checked");
  const successFormMessage = this.querySelector('.form__message--success');
  const errorFormMessage = this.querySelector('.form__message--error');

  function formSuccess () {
    successFormMessage.classList.add('js-message-active');
  }

  function formError () {
    errorFormMessage.classList.add('js-message-active');
  }


  let message = `<b>Заявка с сайта ***:</b>\n`;
  message += `<b>Имя:</b> ${this.name.value}\n`;
  message += `<b>Телефон:</b> ${this.phone.value}\n`;
  message += `<b>Способ связи:</b> ${typeConnection.value}\n`;



  axios.post(URL_API, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message,
  })
    .then( () => {
      console.log("Заявка отправлена");
      //formSuccess();
    })
    .catch(err => {
      console.warn(err);
      //formError();
    })
    .finally(() => {
      console.log("Конец");
    });
  this.reset();

};