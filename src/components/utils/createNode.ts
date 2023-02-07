export function createNode(obj: {
  tag: string;
  classes?: string[];
  text?: string;
  atributesAndValues?: [string, string][];
  parent?: HTMLElement;
}): HTMLElement | HTMLInputElement | HTMLOptionElement {
  const node: HTMLElement = document.createElement(obj.tag);
  if (obj.classes) {
    node.classList.add(...obj.classes);
  }
  if (obj.text) {
    node.innerHTML = obj.text;
  }
  if (obj.atributesAndValues) {
    obj.atributesAndValues.forEach((atributeAndValue) => node.setAttribute(atributeAndValue[0], atributeAndValue[1]));
  }
  if (obj.parent) {
    obj.parent.append(node);
  }
  return node;
}
