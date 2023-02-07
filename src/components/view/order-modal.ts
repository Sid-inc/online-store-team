import { createNode } from '../utils/createNode';
import { BookStorage } from '../utils/storage';

export class OrderModal {
  private storage = new BookStorage();

  draw(): void {
    const modal = createNode({ tag: 'section', classes: ['modal'] });
    const modalInner = createNode({ tag: 'div', classes: ['modal__inner'], parent: modal });
    createNode({ tag: 'h2', classes: ['modal__title', 'visually-hidden'], text: 'Order', parent: modalInner });
    const closeBtn = createNode({
      tag: 'button',
      classes: ['modal__close', 'button', 'button--small', 'button--close'],
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'Close'],
      ],
      parent: modalInner,
    });
    const modalForm = createNode({ tag: 'form', classes: ['modal__form', 'form'], parent: modalInner });
    const formInfo = createNode({ tag: 'fieldset', classes: ['form__group', 'form-group'], parent: modalForm });
    createNode({ tag: 'legend', classes: ['form-group__title'], text: 'Personal information', parent: formInfo });
    const nameField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Name and Surname'],
        ['required', ''],
      ],
      parent: formInfo,
    });
    const phoneField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'tel'],
        ['placeholder', 'Phone'],
        ['required', ''],
      ],
      parent: formInfo,
    });
    const addressField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Address'],
        ['required', ''],
      ],
      parent: formInfo,
    });
    const emailField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'email'],
        ['placeholder', 'Email'],
        ['required', ''],
      ],
      parent: formInfo,
    });
    const formPay = createNode({
      tag: 'fieldset',
      classes: ['form__group', 'form-group', 'form-group--card'],
      parent: modalForm,
    });
    createNode({ tag: 'legend', classes: ['form-group__title'], text: 'Payments information', parent: formPay });
    const formPayInner = createNode({ tag: 'div', classes: ['form-group__inner'], parent: formPay });
    const payImage = createNode({
      tag: 'img',
      classes: ['form-group__image'],
      atributesAndValues: [
        ['src', 'assets/images/paysystem.webp'],
        ['alt', 'Pay system image'],
        ['width', '40'],
        ['height', '20'],
      ],
      parent: formPayInner,
    });
    const cartNumber = createNode({
      tag: 'label',
      classes: ['form-group__label'],
      text: 'Card number',
      parent: formPayInner,
    });
    const cartNumberField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', '0000 0000 0000 0000'],
        ['required', ''],
      ],
      parent: cartNumber,
    });
    const formPayBottom = createNode({ tag: 'div', classes: ['form-group__bottom'], parent: formPayInner });
    const cartDate = createNode({
      tag: 'label',
      classes: ['form-group__label'],
      text: 'Expiry date',
      parent: formPayBottom,
    });
    const cardDateField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'MM/YY'],
        ['required', ''],
      ],
      parent: cartDate,
    });
    const cartCvv = createNode({
      tag: 'label',
      classes: ['form-group__label'],
      text: 'CVV',
      parent: formPayBottom,
    });
    const cartCvvField = createNode({
      tag: 'input',
      classes: ['form-group__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', '000'],
        ['required', ''],
      ],
      parent: cartCvv,
    });
    const submitBtn = createNode({
      tag: 'button',
      classes: ['form__submit', 'button', 'button--primary'],
      atributesAndValues: [['type', 'submit']],
      text: 'Order',
      parent: modalForm,
    });

    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    phoneField.addEventListener('input', () => {
      const value = (phoneField as HTMLInputElement).value.replace(/[^\d\+]/g, '');
      (phoneField as HTMLInputElement).value = value;
    });

    cartNumberField.addEventListener('input', () => {
      const value = (cartNumberField as HTMLInputElement).value;
      if (value[0] === '4') {
        payImage.setAttribute('src', 'assets/images/visa.svg');
      }
      if (value[0] === '5') {
        payImage.setAttribute('src', 'assets/images/mastercard.svg');
      }
      if (value[0] === '2') {
        payImage.setAttribute('src', 'assets/images/mir.svg');
      }
    });

    cardDateField.addEventListener('input', () => {
      const value = (cardDateField as HTMLInputElement).value.replace(/[^\d\/]/g, '');
      (cardDateField as HTMLInputElement).value = value;
      if (value.length > 5) {
        (cardDateField as HTMLInputElement).value = value.slice(0, 5);
      }
      if (value.length === 2 && value[2] !== '/') (cardDateField as HTMLInputElement).value += '/';
    });

    submitBtn.addEventListener('click', () => {
      const validName = this.validation(nameField as HTMLInputElement, 2, 3);
      const validPhone = this.validation(phoneField as HTMLInputElement, undefined, undefined, 9, true, true);
      const validAddress = this.validation(addressField as HTMLInputElement, 3, 5);
      const validEmail = this.validationEmail(emailField as HTMLInputElement);
      const validCardNumber = this.validationCard(cartNumberField as HTMLInputElement, 16);
      const validCardCvvNumber = this.validationCard(cartCvvField as HTMLInputElement, 3);
      const validcardDate = this.validationDate(cardDateField as HTMLInputElement);

      if (
        !validName ||
        !validPhone ||
        !validAddress ||
        !validEmail ||
        !validCardNumber ||
        !validCardCvvNumber ||
        !validcardDate
      )
        return;

      submitBtn.after(createNode({ tag: 'span', text: 'Order confirmed' }));
      setTimeout(() => {
        this.storage.clean();
        window.location.href = './';
      }, 2000);
    });
    document.body.after(modal);
  }

  validation(
    element: HTMLInputElement,
    minWords?: number,
    minWordLength?: number,
    minLength?: number,
    firstPlus?: boolean,
    numbersOnly?: boolean
  ): boolean {
    element.classList.remove('field--error');
    const errorMsg = element.nextSibling;
    if (errorMsg instanceof HTMLElement && errorMsg.classList.contains('field-group__error')) errorMsg.remove();
    if (minWords) {
      const name = element.value.trim();
      const valueWords = name.split(' ');
      if (valueWords.length < minWords) {
        element.classList.add('field--error');
        element.after(
          createNode({ tag: 'span', classes: ['field-group__error'], text: `Less than ${minWords} words` })
        );
        return false;
      }
    }
    if (minWordLength) {
      const words = element.value.trim();
      const listWords = words.split(' ');
      for (const word of listWords) {
        if (word.length < minWordLength) {
          element.classList.add('field--error');
          element.after(
            createNode({ tag: 'span', classes: ['field-group__error'], text: `Has words less ${minWordLength}` })
          );
          return false;
        }
      }
    }
    if (minLength) {
      const value = element.value.trim();
      if (value.length < minLength) {
        element.classList.add('field--error');
        element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: `Min length ${minLength}` }));
        return false;
      }
    }
    if (firstPlus) {
      const value = element.value.trim();
      if (value[0] !== '+') {
        element.classList.add('field--error');
        element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Number must start by +' }));
        return false;
      }
    }
    if (numbersOnly) {
      const value = element.value.trim();
      for (let i = 1; i < value.length; i++) {
        if (!Number(value[i])) {
          element.classList.add('field--error');
          element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Must be only digits' }));
          return false;
        }
      }
    }
    return true;
  }

  validationEmail(element: HTMLInputElement): boolean {
    element.classList.remove('field--error');
    const errorMsg = element.nextSibling;
    if (errorMsg instanceof HTMLElement && errorMsg.classList.contains('field-group__error')) errorMsg.remove();
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const email = element.value.trim();
    if (!EMAIL_REGEXP.test(email)) {
      element.classList.add('field--error');
      element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Incorrect email' }));
      return false;
    }
    return true;
  }

  validationCard(element: HTMLInputElement, numberLimit: number): boolean {
    element.classList.remove('field--error');
    const errorMsg = element.nextSibling;
    if (errorMsg instanceof HTMLElement && errorMsg.classList.contains('field-group__error')) errorMsg.remove();
    const value = element.value.trim();
    if (value.length !== numberLimit) {
      element.classList.add('field--error');
      element.after(
        createNode({ tag: 'span', classes: ['field-group__error'], text: `Not equal ${numberLimit} numbers` })
      );
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!Number(value[i]) && value[i] !== '0') {
        element.classList.add('field--error');
        element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Must be only digits' }));
        return false;
      }
    }
    return true;
  }

  validationDate(element: HTMLInputElement): boolean {
    element.classList.remove('field--error');
    const errorMsg = element.nextSibling;
    if (errorMsg instanceof HTMLElement && errorMsg.classList.contains('field-group__error')) errorMsg.remove();
    const value = element.value.trim();
    if (value.length !== 5) {
      element.classList.add('field--error');
      element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: `Not 4 symbol` }));
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!Number(value[i]) && value[i] !== '/' && value[i] !== '0') {
        element.classList.add('field--error');
        element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Must be only digits' }));
        return false;
      }
    }
    if (+(value[0] + value[1]) > 12) {
      element.classList.add('field--error');
      element.after(createNode({ tag: 'span', classes: ['field-group__error'], text: `Incorrect date` }));
      return false;
    }
    return true;
  }
}
