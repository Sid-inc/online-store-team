import { createNode } from '../utils/createNode';

export class OrderModal {
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
        ['type', 'text'],
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
    createNode({
      tag: 'img',
      classes: ['form-group__image'],
      atributesAndValues: [
        ['src', 'assets/images/visa.svg'],
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
    createNode({
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
    createNode({
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
    createNode({
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

    submitBtn.addEventListener('click', () => {
      nameField.classList.remove('field--error');
      const errorNameMsg = nameField.nextSibling;
      if (errorNameMsg instanceof HTMLElement && errorNameMsg.classList.contains('field-group__error'))
        errorNameMsg.remove();
      const name = (nameField as HTMLInputElement).value.trim();
      const valueWords = name.split(' ');
      if (valueWords.length < 2) {
        nameField.classList.add('field--error');
        nameField.after(
          createNode({ tag: 'span', classes: ['field-group__error'], text: 'Name has less than 2 words' })
        );
        return;
      }
      for (const word of valueWords) {
        if (word.length < 3) {
          nameField.classList.add('field--error');
          nameField.after(
            createNode({ tag: 'span', classes: ['field-group__error'], text: 'To short name or surname' })
          );
          return;
        }
      }

      phoneField.classList.remove('field--error');
      const errorPhoneMsg = phoneField.nextSibling;
      if (errorPhoneMsg instanceof HTMLElement && errorPhoneMsg.classList.contains('field-group__error'))
        errorPhoneMsg.remove();
      const phone = (phoneField as HTMLInputElement).value.trim();
      if (phone.length < 9) {
        phoneField.classList.add('field--error');
        phoneField.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'To short phone number' }));
        return;
      }
      if (phone[0] !== '+') {
        phoneField.classList.add('field--error');
        phoneField.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Number must start by +' }));
        return;
      }

      for (let i = 1; i < phone.length; i++) {
        if (typeof +phone[i] !== 'number' && isNaN(+phone[i])) {
          phoneField.classList.add('field--error');
          phoneField.after(
            createNode({ tag: 'span', classes: ['field-group__error'], text: 'Number must only digits' })
          );
          return;
        }
      }

      addressField.classList.remove('field--error');
      const errorAddresslMsg = addressField.nextSibling;
      if (errorAddresslMsg instanceof HTMLElement && errorAddresslMsg.classList.contains('field-group__error'))
        errorAddresslMsg.remove();
      const address = (addressField as HTMLInputElement).value.trim();
      const addressWords = address.split(' ');
      if (addressWords.length < 3) {
        addressField.classList.add('field--error');
        addressField.after(
          createNode({ tag: 'span', classes: ['field-group__error'], text: 'Address less than 3 words' })
        );
        return;
      }
      for (const word of addressWords) {
        if (word.length < 5) {
          addressField.classList.add('field--error');
          addressField.after(
            createNode({ tag: 'span', classes: ['field-group__error'], text: 'To short address values' })
          );
          return;
        }
      }

      emailField.classList.remove('field--error');
      const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      const errorEmaillMsg = emailField.nextSibling;
      if (errorEmaillMsg instanceof HTMLElement && errorEmaillMsg.classList.contains('field-group__error'))
        errorEmaillMsg.remove();
      const email = (emailField as HTMLInputElement).value.trim();
      if (!EMAIL_REGEXP.test(email)) {
        emailField.classList.add('field--error');
        emailField.after(createNode({ tag: 'span', classes: ['field-group__error'], text: 'Incorrect email' }));
        return;
      }
    });
    document.body.after(modal);
  }
}
