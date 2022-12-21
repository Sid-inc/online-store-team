import { createNode } from '../utils/createNode';

export class Footer {
  draw() {
    const footer = createNode({ tag: 'footer', classes: ['footer'] });
    const footerContainer = createNode({ tag: 'div', classes: ['footer__inner', 'container'], parent: footer });
    const footerOwner = createNode({ tag: 'div', classes: ['footer__owner', 'owner'], parent: footerContainer });
    const ownerLink1 = createNode({
      tag: 'a',
      classes: ['owner__link'],
      atributesAndValues: [['href', 'https://github.com/Sid-inc']],
      parent: footerOwner,
    });
    const ownerIcon1 = createNode({
      tag: 'img',
      atributesAndValues: [
        ['src', 'assets/images/github.svg'],
        ['alt', 'GitHub'],
      ],
    });
    ownerIcon1.style.width = '24px';
    ownerIcon1.style.height = '24px';
    const ownerName1 = createNode({ tag: 'span', classes: ['owner__name'], text: 'Sid-inc' });
    ownerLink1.append(ownerIcon1, ownerName1);
    const ownerLink2 = createNode({
      tag: 'a',
      classes: ['owner__link'],
      atributesAndValues: [['href', 'https://github.com/szyrwel']],
      parent: footerOwner,
    });
    const ownerIcon2 = createNode({
      tag: 'img',
      atributesAndValues: [
        ['src', 'assets/images/github.svg'],
        ['alt', 'GitHub'],
      ],
    });
    ownerIcon2.style.width = '24px';
    ownerIcon2.style.height = '24px';
    const ownerName2 = createNode({ tag: 'span', classes: ['owner__name'], text: 'szyrwel' });
    ownerLink2.append(ownerIcon2, ownerName2);
    const footerText = createNode({ tag: 'span', classes: ['footer__text'], text: '2022' });
    footerContainer.append(footerText);
    const footerRs = createNode({ tag: 'div', classes: ['footer__rs', 'rs'], parent: footerContainer });
    const rsImage = createNode({
      tag: 'img',
      classes: ['rs__image'],
      atributesAndValues: [
        ['src', 'assets//images/rs_school_js.svg'],
        ['alt', 'rs school'],
      ],
    });
    rsImage.style.width = '80px';
    rsImage.style.height = '29px';
    const rsLink = createNode({
      tag: 'a',
      classes: ['rs__link'],
      atributesAndValues: [['href', 'https://rs.school/js/']],
      text: 'Click to learn',
    });
    footerRs.append(rsImage, rsLink);
    document.body.append(footer);
  }
}
