import { Variable } from 'resource:///com/github/Aylur/ags/variable.js'

export default function(revealer: Variable<boolean>, revealersToHide: Variable<boolean>[]) {
  const hide = () => {
    revealersToHide.forEach((variable) => {
      if (revealer === variable) return;
      variable.value = false;
    });
  }
  return {
    toggle: () => {
      hide();
      revealer.value = !revealer.value;
    },
    open: () => {
      hide();
      revealer.value = true;
    },
    close: () => {
      revealer.value = false;
    },
  }
}

