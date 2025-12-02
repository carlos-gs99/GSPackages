// ==========================================
// NAVIGATION UTILITIES
// ==========================================

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuItemType } from 'layout/nav/types';

/**
 * Encontra todos os pais de um item de menu
 * @param menuItems - Array de itens de menu
 * @param menuItem - Item de menu para encontrar pais
 * @returns Array de chaves dos pais
 */
const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: MenuItemType
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem['parentKey']);

  if (parent) {
    parents.push(parent['key']);
    if (parent['parentKey'])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

/**
 * Encontra um item de menu específico pela chave
 * @param menuItems - Array de itens de menu
 * @param menuItemKey - Chave do item a ser encontrado
 * @returns Item de menu encontrado ou null
 */
const findMenuItem = (
  menuItems: MenuItemType[] | undefined,
  menuItemKey: MenuItemType['key'] | undefined
): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Componente para fazer scroll automático ao topo da página
 * quando a rota muda
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ==========================================
// EXPORTS
// ==========================================

export { findAllParent, findMenuItem };
export default ScrollToTop;
