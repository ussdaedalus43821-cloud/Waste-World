type Child = Node | string | null | undefined | false;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, unknown> = {},
  children: Child[] = []
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'className') {
      node.className = value as string;
    } else if (key === 'onclick') {
      node.addEventListener('click', value as EventListener);
    } else if (key.startsWith('data-')) {
      node.setAttribute(key, String(value));
    } else if (key === 'style' && typeof value === 'object' && value !== null) {
      Object.assign(node.style, value);
    } else {
      (node as unknown as Record<string, unknown>)[key] = value;
    }
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

export function clear(node: HTMLElement): void {
  node.replaceChildren();
}
